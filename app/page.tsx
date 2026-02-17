'use client';

import { useState, useEffect } from 'react';

// Types
interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  xp: number;
}

interface Topic {
  id: string;
  name: string;
  emoji: string;
  lessons: Lesson[];
}

interface World {
  id: string;
  name: string;
  emoji: string;
  accent: string;
  description: string;
  topics: Topic[];
}

// Curriculum Data
const worldsData: World[] = [
  {
    id: 'math', name: 'Math', emoji: '✨', accent: 'accent-blue',
    description: 'Numbers, shapes & problem solving',
    topics: [
      { id: 'counting', name: 'Counting', emoji: '🔢', lessons: [
        { id: 'm1', title: 'Counting 1-10', description: 'Learn to count with objects', duration: '5 min', xp: 10 },
        { id: 'm2', title: 'Counting 11-20', description: 'Keep going higher', duration: '5 min', xp: 10 },
        { id: 'm3', title: 'Counting to 100', description: 'Count super high', duration: '8 min', xp: 15 },
        { id: 'm4', title: 'Skip Counting', description: 'By 2s, 5s, and 10s', duration: '10 min', xp: 20 },
      ]},
      { id: 'addition', name: 'Addition', emoji: '➕', lessons: [
        { id: 'a1', title: 'Adding Pictures', description: 'Put things together', duration: '5 min', xp: 10 },
        { id: 'a2', title: 'Adding to 10', description: 'Single digits', duration: '8 min', xp: 15 },
        { id: 'a3', title: 'Adding to 20', description: 'Getting bigger', duration: '8 min', xp: 15 },
        { id: 'a4', title: 'Double Digits', description: 'Big numbers', duration: '10 min', xp: 20 },
      ]},
      { id: 'subtraction', name: 'Subtraction', emoji: '➖', lessons: [
        { id: 's1', title: 'Taking Away', description: 'What\'s left', duration: '5 min', xp: 10 },
        { id: 's2', title: 'Subtract to 10', description: 'Single digits', duration: '8 min', xp: 15 },
        { id: 's3', title: 'Subtract to 20', description: 'Bigger numbers', duration: '8 min', xp: 15 },
      ]},
      { id: 'multiply', name: 'Multiplication', emoji: '✖️', lessons: [
        { id: 'x1', title: 'Groups', description: 'What is multiplication', duration: '8 min', xp: 15 },
        { id: 'x2', title: 'Tables 1-5', description: 'The basics', duration: '10 min', xp: 20 },
        { id: 'x3', title: 'Tables 6-10', description: 'Keep going', duration: '10 min', xp: 20 },
        { id: 'x4', title: 'Tables 11-12', description: 'Almost done', duration: '10 min', xp: 20 },
      ]},
      { id: 'fractions', name: 'Fractions', emoji: '🍕', lessons: [
        { id: 'f1', title: 'What is a Fraction', description: 'Parts of a whole', duration: '8 min', xp: 15 },
        { id: 'f2', title: 'Halves & Quarters', description: 'Cut it up', duration: '8 min', xp: 15 },
        { id: 'f3', title: 'Comparing', description: 'Which is bigger', duration: '10 min', xp: 20 },
      ]},
      { id: 'shapes', name: 'Shapes', emoji: '🔷', lessons: [
        { id: 'g1', title: 'Basic Shapes', description: 'Circles, squares, triangles', duration: '5 min', xp: 10 },
        { id: 'g2', title: '3D Shapes', description: 'Cubes, spheres, cones', duration: '8 min', xp: 15 },
        { id: 'g3', title: 'Perimeter & Area', description: 'Measure shapes', duration: '10 min', xp: 20 },
      ]},
    ]
  },
  {
    id: 'reading', name: 'Reading', emoji: '📖', accent: 'accent-pink',
    description: 'Words, stories & writing',
    topics: [
      { id: 'alphabet', name: 'ABCs', emoji: '🔤', lessons: [
        { id: 'r1', title: 'Letters A-M', description: 'First half', duration: '8 min', xp: 15 },
        { id: 'r2', title: 'Letters N-Z', description: 'Second half', duration: '8 min', xp: 15 },
        { id: 'r3', title: 'Upper & Lower', description: 'Big and small', duration: '8 min', xp: 15 },
        { id: 'r4', title: 'Letter Sounds', description: 'Phonics basics', duration: '10 min', xp: 20 },
      ]},
      { id: 'phonics', name: 'Phonics', emoji: '🗣️', lessons: [
        { id: 'p1', title: 'Short Vowels', description: 'A, E, I, O, U', duration: '10 min', xp: 20 },
        { id: 'p2', title: 'Long Vowels', description: 'Say their name', duration: '10 min', xp: 20 },
        { id: 'p3', title: 'Blends', description: 'Letters together', duration: '10 min', xp: 20 },
        { id: 'p4', title: 'Sight Words', description: 'Know by heart', duration: '10 min', xp: 20 },
      ]},
      { id: 'vocabulary', name: 'Vocabulary', emoji: '💬', lessons: [
        { id: 'v1', title: 'Action Words', description: 'Verbs', duration: '8 min', xp: 15 },
        { id: 'v2', title: 'Describing Words', description: 'Adjectives', duration: '8 min', xp: 15 },
        { id: 'v3', title: 'Opposites', description: 'Antonyms', duration: '8 min', xp: 15 },
      ]},
      { id: 'writing', name: 'Writing', emoji: '✏️', lessons: [
        { id: 'w1', title: 'Sentences', description: 'Complete thoughts', duration: '10 min', xp: 20 },
        { id: 'w2', title: 'Paragraphs', description: 'Group ideas', duration: '12 min', xp: 25 },
        { id: 'w3', title: 'Stories', description: 'Beginning, middle, end', duration: '15 min', xp: 30 },
      ]},
    ]
  },
  {
    id: 'science', name: 'Science', emoji: '🔬', accent: 'accent-green',
    description: 'How the world works',
    topics: [
      { id: 'life', name: 'Living Things', emoji: '🌱', lessons: [
        { id: 'ls1', title: 'Plants', description: 'How they grow', duration: '8 min', xp: 15 },
        { id: 'ls2', title: 'Animals', description: 'Different types', duration: '8 min', xp: 15 },
        { id: 'ls3', title: 'Human Body', description: 'How it works', duration: '10 min', xp: 20 },
        { id: 'ls4', title: 'Food Chains', description: 'Who eats what', duration: '10 min', xp: 20 },
      ]},
      { id: 'earth', name: 'Earth', emoji: '🌍', lessons: [
        { id: 'es1', title: 'Weather', description: 'Sun, rain, snow', duration: '8 min', xp: 15 },
        { id: 'es2', title: 'Seasons', description: 'Four seasons', duration: '8 min', xp: 15 },
        { id: 'es3', title: 'Rocks', description: 'What Earth is made of', duration: '10 min', xp: 20 },
        { id: 'es4', title: 'Water Cycle', description: 'Where rain comes from', duration: '10 min', xp: 20 },
      ]},
      { id: 'space', name: 'Space', emoji: '🚀', lessons: [
        { id: 'sp1', title: 'Solar System', description: 'Planets and Sun', duration: '10 min', xp: 20 },
        { id: 'sp2', title: 'Earth & Moon', description: 'Our neighbors', duration: '8 min', xp: 15 },
        { id: 'sp3', title: 'Stars', description: 'Billions of them', duration: '10 min', xp: 20 },
      ]},
    ]
  },
  {
    id: 'history', name: 'History', emoji: '🏛️', accent: 'accent-amber',
    description: 'Stories from the past',
    topics: [
      { id: 'usa', name: 'America', emoji: '🇺🇸', lessons: [
        { id: 'us1', title: 'Native Americans', description: 'First people', duration: '10 min', xp: 20 },
        { id: 'us2', title: 'Explorers', description: 'New arrivals', duration: '10 min', xp: 20 },
        { id: 'us3', title: 'Revolution', description: 'America is born', duration: '12 min', xp: 25 },
        { id: 'us4', title: 'Modern Times', description: 'Recent history', duration: '10 min', xp: 20 },
      ]},
      { id: 'world', name: 'World', emoji: '🌏', lessons: [
        { id: 'wh1', title: 'Ancient Egypt', description: 'Pyramids', duration: '10 min', xp: 20 },
        { id: 'wh2', title: 'Ancient Greece', description: 'Olympics', duration: '10 min', xp: 20 },
        { id: 'wh3', title: 'Ancient Rome', description: 'Gladiators', duration: '10 min', xp: 20 },
        { id: 'wh4', title: 'Medieval', description: 'Knights & castles', duration: '10 min', xp: 20 },
      ]},
    ]
  },
  {
    id: 'engineering', name: 'Engineering', emoji: '⚙️', accent: 'accent-teal',
    description: 'Build, create & solve',
    topics: [
      { id: 'machines', name: 'Machines', emoji: '🔧', lessons: [
        { id: 'sm1', title: 'Levers', description: 'Lift heavy things', duration: '8 min', xp: 20 },
        { id: 'sm2', title: 'Wheels', description: 'Make things roll', duration: '8 min', xp: 20 },
        { id: 'sm3', title: 'Pulleys', description: 'Pull things up', duration: '8 min', xp: 20 },
        { id: 'sm4', title: 'Ramps', description: 'Inclined planes', duration: '8 min', xp: 20 },
      ]},
      { id: 'design', name: 'Design', emoji: '💡', lessons: [
        { id: 'dt1', title: 'Find Problems', description: 'What needs fixing', duration: '10 min', xp: 25 },
        { id: 'dt2', title: 'Brainstorm', description: 'Think of solutions', duration: '10 min', xp: 25 },
        { id: 'dt3', title: 'Build & Test', description: 'Try it out', duration: '12 min', xp: 30 },
        { id: 'dt4', title: 'Improve', description: 'Make it better', duration: '12 min', xp: 30 },
      ]},
      { id: 'coding', name: 'Coding', emoji: '💻', lessons: [
        { id: 'cd1', title: 'What is Code', description: 'Talk to computers', duration: '8 min', xp: 20 },
        { id: 'cd2', title: 'Sequences', description: 'Step by step', duration: '10 min', xp: 25 },
        { id: 'cd3', title: 'Loops', description: 'Repeat things', duration: '10 min', xp: 25 },
        { id: 'cd4', title: 'If-Then', description: 'Make decisions', duration: '12 min', xp: 30 },
      ]},
      { id: 'robots', name: 'Robotics', emoji: '🤖', lessons: [
        { id: 'rb1', title: 'What is a Robot', description: 'Helpful machines', duration: '8 min', xp: 20 },
        { id: 'rb2', title: 'Sensors', description: 'How robots sense', duration: '10 min', xp: 25 },
        { id: 'rb3', title: 'Movement', description: 'How robots move', duration: '10 min', xp: 25 },
      ]},
    ]
  },
  {
    id: 'money', name: 'Money', emoji: '💰', accent: 'accent-green',
    description: 'How money works',
    topics: [
      { id: 'basics', name: 'Basics', emoji: '🪙', lessons: [
        { id: 'mb1', title: 'Coins & Bills', description: 'Know your money', duration: '8 min', xp: 15 },
        { id: 'mb2', title: 'Counting Money', description: 'Add it up', duration: '8 min', xp: 15 },
        { id: 'mb3', title: 'Making Change', description: 'What\'s left over', duration: '10 min', xp: 20 },
        { id: 'mb4', title: 'Needs vs Wants', description: 'What you need', duration: '8 min', xp: 15 },
      ]},
      { id: 'saving', name: 'Saving', emoji: '🐷', lessons: [
        { id: 'sv1', title: 'Why Save', description: 'For the future', duration: '8 min', xp: 20 },
        { id: 'sv2', title: 'Goals', description: 'What to save for', duration: '8 min', xp: 20 },
        { id: 'sv3', title: 'Piggy Bank', description: 'Start small', duration: '8 min', xp: 20 },
        { id: 'sv4', title: 'Bank Accounts', description: 'Where adults save', duration: '10 min', xp: 25 },
      ]},
      { id: 'earning', name: 'Earning', emoji: '💵', lessons: [
        { id: 'er1', title: 'Jobs', description: 'How to earn', duration: '8 min', xp: 20 },
        { id: 'er2', title: 'Allowance', description: 'Earn at home', duration: '8 min', xp: 20 },
        { id: 'er3', title: 'Kid Business', description: 'Make your own', duration: '10 min', xp: 25 },
      ]},
      { id: 'budget', name: 'Budgeting', emoji: '📊', lessons: [
        { id: 'bg1', title: 'What is a Budget', description: 'Plan your money', duration: '8 min', xp: 20 },
        { id: 'bg2', title: 'Three Jars', description: 'Save, Spend, Give', duration: '10 min', xp: 25 },
        { id: 'bg3', title: 'Tracking', description: 'Where money goes', duration: '10 min', xp: 25 },
      ]},
    ]
  },
  {
    id: 'investing', name: 'Investing', emoji: '📈', accent: 'accent-purple',
    description: 'Make money grow',
    topics: [
      { id: 'intro', name: 'Basics', emoji: '🌱', lessons: [
        { id: 'ib1', title: 'What is Investing', description: 'Grow your money', duration: '8 min', xp: 25 },
        { id: 'ib2', title: 'Compound Interest', description: 'Magic of growth', duration: '10 min', xp: 30 },
        { id: 'ib3', title: 'Start Early', description: 'Time is power', duration: '8 min', xp: 25 },
        { id: 'ib4', title: 'Risk & Reward', description: 'Balance', duration: '10 min', xp: 30 },
      ]},
      { id: 'stocks', name: 'Stocks', emoji: '📊', lessons: [
        { id: 'st1', title: 'What is a Stock', description: 'Own a company', duration: '10 min', xp: 30 },
        { id: 'st2', title: 'How Stocks Work', description: 'Buy low, sell high', duration: '10 min', xp: 30 },
        { id: 'st3', title: 'Good Companies', description: 'What makes them great', duration: '12 min', xp: 35 },
        { id: 'st4', title: 'Dividends', description: 'Get paid to own', duration: '10 min', xp: 30 },
      ]},
      { id: 'other', name: 'Other', emoji: '🏠', lessons: [
        { id: 'oi1', title: 'Real Estate', description: 'Own buildings', duration: '10 min', xp: 30 },
        { id: 'oi2', title: 'Index Funds', description: 'Own the market', duration: '10 min', xp: 30 },
        { id: 'oi3', title: 'Business', description: 'Best investment', duration: '12 min', xp: 35 },
      ]},
    ]
  },
  {
    id: 'business', name: 'Business', emoji: '🏪', accent: 'accent-pink',
    description: 'Start your empire',
    topics: [
      { id: 'entrepreneur', name: 'Entrepreneur', emoji: '🚀', lessons: [
        { id: 'en1', title: 'What is One', description: 'People who start things', duration: '8 min', xp: 25 },
        { id: 'en2', title: 'Kid Bosses', description: 'Kids who made it', duration: '10 min', xp: 30 },
        { id: 'en3', title: 'Find Problems', description: 'Business solves problems', duration: '10 min', xp: 30 },
        { id: 'en4', title: 'Your Idea', description: 'What will you create', duration: '12 min', xp: 35 },
      ]},
      { id: 'start', name: 'Starting', emoji: '🎬', lessons: [
        { id: 'sb1', title: 'Lemonade Stand', description: 'First business', duration: '10 min', xp: 30 },
        { id: 'sb2', title: 'Products vs Services', description: 'Sell or do', duration: '10 min', xp: 30 },
        { id: 'sb3', title: 'Customers', description: 'Who will buy', duration: '10 min', xp: 30 },
        { id: 'sb4', title: 'Pricing', description: 'How much to charge', duration: '12 min', xp: 35 },
      ]},
      { id: 'ideas', name: 'Ideas', emoji: '💡', lessons: [
        { id: 'bi1', title: 'Pet Sitting', description: 'Help with animals', duration: '8 min', xp: 25 },
        { id: 'bi2', title: 'Yard Work', description: 'Help neighbors', duration: '8 min', xp: 25 },
        { id: 'bi3', title: 'Crafts', description: 'Sell what you make', duration: '8 min', xp: 25 },
        { id: 'bi4', title: 'Online', description: 'Sell on internet', duration: '10 min', xp: 30 },
      ]},
    ]
  },
  {
    id: 'lifeskills', name: 'Life Skills', emoji: '🏆', accent: 'accent-amber',
    description: 'Skills for success',
    topics: [
      { id: 'goals', name: 'Goals', emoji: '🎯', lessons: [
        { id: 'gl1', title: 'Dream Big', description: 'What do you want', duration: '8 min', xp: 20 },
        { id: 'gl2', title: 'SMART Goals', description: 'Goals that work', duration: '10 min', xp: 25 },
        { id: 'gl3', title: 'Break It Down', description: 'Small steps', duration: '10 min', xp: 25 },
        { id: 'gl4', title: 'Stay Motivated', description: 'Keep going', duration: '10 min', xp: 25 },
      ]},
      { id: 'problems', name: 'Problem Solving', emoji: '🧩', lessons: [
        { id: 'ps1', title: 'Identify', description: 'What\'s wrong', duration: '8 min', xp: 20 },
        { id: 'ps2', title: 'Solutions', description: 'Many ways to fix', duration: '10 min', xp: 25 },
        { id: 'ps3', title: 'Pick Best', description: 'Choose wisely', duration: '10 min', xp: 25 },
        { id: 'ps4', title: 'Learn', description: 'From mistakes', duration: '10 min', xp: 25 },
      ]},
      { id: 'communicate', name: 'Communication', emoji: '🗣️', lessons: [
        { id: 'cm1', title: 'Listening', description: 'Really hear', duration: '8 min', xp: 20 },
        { id: 'cm2', title: 'Speaking', description: 'Say what you mean', duration: '8 min', xp: 20 },
        { id: 'cm3', title: 'Kindness', description: 'Kind words matter', duration: '8 min', xp: 20 },
      ]},
      { id: 'time', name: 'Time', emoji: '⏰', lessons: [
        { id: 'tm1', title: 'Plan Your Day', description: 'Be organized', duration: '10 min', xp: 25 },
        { id: 'tm2', title: 'Prioritize', description: 'Important first', duration: '10 min', xp: 25 },
        { id: 'tm3', title: 'Focus', description: 'Avoid distractions', duration: '10 min', xp: 25 },
      ]},
    ]
  },
];

export default function FutureKidsAcademy() {
  const [selectedWorld, setSelectedWorld] = useState<World | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [streak, setStreak] = useState(3);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('futurekids-progress');
    if (saved) {
      const data = JSON.parse(saved);
      setXp(data.xp || 0);
      setLevel(data.level || 1);
      setCompletedLessons(data.completedLessons || []);
      setStreak(data.streak || 3);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('futurekids-progress', JSON.stringify({ xp, level, completedLessons, streak }));
  }, [xp, level, completedLessons, streak]);

  const progress = Math.min((xp % 100) / 100 * 100, 100);

  const completeLesson = (lesson: Lesson) => {
    if (completedLessons.includes(lesson.id)) return;
    const newXp = xp + lesson.xp;
    setXp(newXp);
    setCompletedLessons([...completedLessons, lesson.id]);
    if (newXp >= level * 100) {
      setLevel(level + 1);
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    }
  };

  // Celebration
  if (showCelebration) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-6">
        <div className="text-center animate-fade-in">
          <div className="text-7xl mb-6">🎉</div>
          <h1 className="font-serif text-4xl text-[#3D3935] mb-4">Level Up!</h1>
          <p className="text-xl text-[#9A9086]">You&apos;re now Level {level}</p>
          <p className="text-[#9A9086] mt-4">Keep going, superstar!</p>
        </div>
      </div>
    );
  }

  // Lesson View
  if (selectedLesson && selectedTopic && selectedWorld) {
    const isComplete = completedLessons.includes(selectedLesson.id);
    return (
      <div className="min-h-screen bg-[#FAF7F2] texture">
        <header className="px-6 py-5 border-b border-[#E8DDD4]">
          <button onClick={() => setSelectedLesson(null)} className="text-[#9A9086] hover:text-[#3D3935] font-medium flex items-center gap-2">
            <span>←</span> Back
          </button>
        </header>
        <main className="max-w-lg mx-auto px-6 py-8">
          <div className={`${selectedWorld.accent} rounded-2xl p-8 text-center mb-6`}>
            <span className="text-5xl block mb-4">{selectedTopic.emoji}</span>
            <h1 className="font-serif text-2xl text-[#3D3935] mb-2">{selectedLesson.title}</h1>
            <p className="text-[#9A9086]">{selectedLesson.description}</p>
          </div>
          <div className="card p-6 mb-6">
            <div className="aspect-video bg-[#E8DDD4] rounded-xl flex items-center justify-center mb-4">
              <div className="text-center">
                <span className="text-4xl block mb-2">🎬</span>
                <p className="text-[#9A9086] text-sm">Video coming soon</p>
              </div>
            </div>
            <div className="flex justify-between text-sm text-[#9A9086]">
              <span>⏱ {selectedLesson.duration}</span>
              <span>+{selectedLesson.xp} XP</span>
            </div>
          </div>
          {isComplete ? (
            <div className="card p-6 text-center bg-[#E8F5E9]">
              <span className="text-3xl block mb-2">✓</span>
              <p className="font-medium text-[#2E7D32]">Completed</p>
            </div>
          ) : (
            <button onClick={() => completeLesson(selectedLesson)} className="btn-primary w-full text-center">
              Complete Lesson
            </button>
          )}
        </main>
      </div>
    );
  }

  // Topic View
  if (selectedTopic && selectedWorld) {
    const done = selectedTopic.lessons.filter(l => completedLessons.includes(l.id)).length;
    const total = selectedTopic.lessons.length;
    return (
      <div className="min-h-screen bg-[#FAF7F2] texture">
        <header className="px-6 py-5 border-b border-[#E8DDD4]">
          <button onClick={() => setSelectedTopic(null)} className="text-[#9A9086] hover:text-[#3D3935] font-medium flex items-center gap-2">
            <span>←</span> Back
          </button>
        </header>
        <main className="max-w-lg mx-auto px-6 py-8">
          <div className={`${selectedWorld.accent} rounded-2xl p-6 text-center mb-6`}>
            <span className="text-4xl block mb-3">{selectedTopic.emoji}</span>
            <h1 className="font-serif text-2xl text-[#3D3935]">{selectedTopic.name}</h1>
            <p className="text-[#9A9086] text-sm mt-2">{done} of {total} complete</p>
            <div className="progress-track h-2 mt-4">
              <div className="progress-fill h-2" style={{ width: `${(done/total)*100}%` }} />
            </div>
          </div>
          <div className="space-y-3">
            {selectedTopic.lessons.map((lesson, idx) => {
              const isDone = completedLessons.includes(lesson.id);
              const isLocked = idx > 0 && !completedLessons.includes(selectedTopic.lessons[idx-1].id);
              return (
                <button
                  key={lesson.id}
                  onClick={() => !isLocked && setSelectedLesson(lesson)}
                  disabled={isLocked}
                  className={`card w-full p-4 flex items-center gap-4 text-left ${isLocked ? 'opacity-50' : ''} ${isDone ? 'bg-[#E8F5E9] border-[#C8E6C9]' : ''}`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                    isDone ? 'bg-[#4CAF50] text-white' : isLocked ? 'bg-[#E8DDD4] text-[#9A9086]' : 'bg-[#E8DDD4] text-[#3D3935]'
                  }`}>
                    {isLocked ? '🔒' : isDone ? '✓' : idx + 1}
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${isDone ? 'text-[#2E7D32]' : 'text-[#3D3935]'}`}>{lesson.title}</p>
                    <p className="text-[#9A9086] text-sm">{lesson.description}</p>
                  </div>
                  <div className="text-right text-sm">
                    <p className="text-[#9A9086]">{lesson.duration}</p>
                    <p className={isDone ? 'text-[#4CAF50]' : 'text-[#D4A574]'}>+{lesson.xp}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </main>
      </div>
    );
  }

  // World View
  if (selectedWorld) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] texture">
        <header className="px-6 py-5 border-b border-[#E8DDD4]">
          <button onClick={() => setSelectedWorld(null)} className="text-[#9A9086] hover:text-[#3D3935] font-medium flex items-center gap-2">
            <span>←</span> All Subjects
          </button>
        </header>
        <main className="max-w-lg mx-auto px-6 py-8">
          <div className={`${selectedWorld.accent} rounded-2xl p-8 text-center mb-8`}>
            <span className="text-5xl block mb-4">{selectedWorld.emoji}</span>
            <h1 className="font-serif text-3xl text-[#3D3935]">{selectedWorld.name}</h1>
            <p className="text-[#9A9086] mt-2">{selectedWorld.description}</p>
          </div>
          <div className="space-y-3">
            {selectedWorld.topics.map(topic => {
              const done = topic.lessons.filter(l => completedLessons.includes(l.id)).length;
              const total = topic.lessons.length;
              return (
                <button key={topic.id} onClick={() => setSelectedTopic(topic)} className="card w-full p-5 flex items-center gap-4 text-left">
                  <span className="text-3xl">{topic.emoji}</span>
                  <div className="flex-1">
                    <p className="font-medium text-[#3D3935]">{topic.name}</p>
                    <p className="text-[#9A9086] text-sm">{done}/{total} lessons</p>
                  </div>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium ${
                    done === total ? 'bg-[#E8F5E9] text-[#4CAF50]' : 'bg-[#E8DDD4] text-[#9A9086]'
                  }`}>
                    {done === total ? '✓' : `${Math.round((done/total)*100)}%`}
                  </div>
                </button>
              );
            })}
          </div>
        </main>
      </div>
    );
  }

  // Home View
  const school = worldsData.filter(w => ['math','reading','science','history'].includes(w.id));
  const future = worldsData.filter(w => !['math','reading','science','history'].includes(w.id));

  return (
    <div className="min-h-screen bg-[#FAF7F2] texture">
      {/* Header */}
      <header className="px-6 pt-12 pb-8 border-b border-[#E8DDD4]">
        <div className="max-w-lg mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#9A9086] mb-2">Learning Academy</p>
          <h1 className="font-serif text-4xl text-[#3D3935]">FutureKids</h1>
          
          {/* Stats */}
          <div className="flex gap-3 mt-6">
            <div className="streak-badge px-4 py-2 rounded-full">
              <span className="text-sm font-medium text-[#B8856C]">🔥 {streak} days</span>
            </div>
            <div className="xp-badge px-4 py-2 rounded-full">
              <span className="text-sm font-medium text-[#B89F6C]">⭐ {xp} XP</span>
            </div>
          </div>
          
          {/* Level */}
          <div className="card mt-6 p-5">
            <div className="flex items-center gap-4 mb-4">
              <div className="level-badge w-14 h-14 rounded-full flex items-center justify-center">
                <span className="text-xl font-semibold text-[#8B7355]">{level}</span>
              </div>
              <div>
                <p className="font-medium text-[#3D3935]">Level {level}</p>
                <p className="text-sm text-[#9A9086]">{100 - (xp % 100)} XP to next level</p>
              </div>
            </div>
            <div className="progress-track h-3">
              <div className="progress-fill h-3" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-6 py-8">
        {/* School */}
        <div className="mb-10">
          <div className="section-divider">
            <span className="text-xs tracking-[0.2em] uppercase text-[#9A9086]">School Essentials</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {school.map(world => {
              const total = world.topics.reduce((a,t) => a + t.lessons.length, 0);
              const done = world.topics.reduce((a,t) => a + t.lessons.filter(l => completedLessons.includes(l.id)).length, 0);
              return (
                <button key={world.id} onClick={() => setSelectedWorld(world)} className={`world-card ${world.accent} p-6 text-center`}>
                  <span className="text-4xl block mb-3">{world.emoji}</span>
                  <p className="font-serif text-lg text-[#3D3935]">{world.name}</p>
                  <p className="text-xs text-[#9A9086] mt-1">{done}/{total} lessons</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Future */}
        <div>
          <div className="section-divider">
            <span className="text-xs tracking-[0.2em] uppercase text-[#9A9086]">Future Skills</span>
          </div>
          <p className="text-center text-sm text-[#9A9086] mb-6">What school doesn&apos;t teach you</p>
          <div className="grid grid-cols-2 gap-4">
            {future.map(world => {
              const total = world.topics.reduce((a,t) => a + t.lessons.length, 0);
              const done = world.topics.reduce((a,t) => a + t.lessons.filter(l => completedLessons.includes(l.id)).length, 0);
              return (
                <button key={world.id} onClick={() => setSelectedWorld(world)} className={`world-card ${world.accent} p-6 text-center`}>
                  <span className="text-4xl block mb-3">{world.emoji}</span>
                  <p className="font-serif text-lg text-[#3D3935]">{world.name}</p>
                  <p className="text-xs text-[#9A9086] mt-1">{done}/{total} lessons</p>
                </button>
              );
            })}
          </div>
        </div>
      </main>

      <footer className="text-center py-8 border-t border-[#E8DDD4]">
        <p className="text-xs text-[#9A9086]">Made with love for Carter, Kingston & Sister</p>
      </footer>
    </div>
  );
}
