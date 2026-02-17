'use client';

import { useState, useEffect } from 'react';

// ============================================================================
// FUTUREKIDS ACADEMY - Organic Pastel Design v2
// ============================================================================

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
  gradient: string;
  bgClass: string;
  description: string;
  topics: Topic[];
}

// ============================================================================
// CURRICULUM DATA
// ============================================================================

const worldsData: World[] = [
  // SCHOOL ESSENTIALS
  {
    id: 'math',
    name: 'Math World',
    emoji: '🔢',
    gradient: 'from-sky-200 via-blue-200 to-indigo-200',
    bgClass: 'bg-gradient-to-br from-sky-100 to-blue-100',
    description: 'Numbers, shapes & problem solving!',
    topics: [
      {
        id: 'counting', name: 'Counting & Numbers', emoji: '1️⃣',
        lessons: [
          { id: 'm1', title: 'Counting 1-10', description: 'Learn to count with fun objects!', duration: '5 min', xp: 10 },
          { id: 'm2', title: 'Counting 11-20', description: 'Keep going higher!', duration: '5 min', xp: 10 },
          { id: 'm3', title: 'Counting to 100', description: 'You can count super high!', duration: '8 min', xp: 15 },
          { id: 'm4', title: 'Skip Counting', description: 'Count by 2s, 5s, and 10s', duration: '10 min', xp: 20 },
        ]
      },
      {
        id: 'addition', name: 'Addition Fun', emoji: '➕',
        lessons: [
          { id: 'a1', title: 'Adding with Pictures', description: 'Put things together!', duration: '5 min', xp: 10 },
          { id: 'a2', title: 'Adding to 10', description: 'Master single digits!', duration: '8 min', xp: 15 },
          { id: 'a3', title: 'Adding to 20', description: 'Getting bigger!', duration: '8 min', xp: 15 },
          { id: 'a4', title: 'Double Digits', description: 'Add bigger numbers!', duration: '10 min', xp: 20 },
        ]
      },
      {
        id: 'subtraction', name: 'Subtraction', emoji: '➖',
        lessons: [
          { id: 's1', title: 'Taking Away', description: 'Learn what\'s left!', duration: '5 min', xp: 10 },
          { id: 's2', title: 'Subtracting to 10', description: 'Single digit subtraction', duration: '8 min', xp: 15 },
          { id: 's3', title: 'Subtracting to 20', description: 'Bigger numbers!', duration: '8 min', xp: 15 },
        ]
      },
      {
        id: 'multiplication', name: 'Multiplication', emoji: '✖️',
        lessons: [
          { id: 'x1', title: 'Groups of Things', description: 'What is multiplication?', duration: '8 min', xp: 15 },
          { id: 'x2', title: 'Times Tables 1-5', description: 'Memorize the basics!', duration: '10 min', xp: 20 },
          { id: 'x3', title: 'Times Tables 6-10', description: 'Keep going!', duration: '10 min', xp: 20 },
          { id: 'x4', title: 'Times Tables 11-12', description: 'Almost done!', duration: '10 min', xp: 20 },
        ]
      },
      {
        id: 'fractions', name: 'Fractions', emoji: '🍕',
        lessons: [
          { id: 'f1', title: 'What is a Fraction?', description: 'Parts of a whole!', duration: '8 min', xp: 15 },
          { id: 'f2', title: 'Halves & Quarters', description: 'Cut it up!', duration: '8 min', xp: 15 },
          { id: 'f3', title: 'Comparing Fractions', description: 'Which is bigger?', duration: '10 min', xp: 20 },
        ]
      },
      {
        id: 'shapes', name: 'Shapes', emoji: '🔷',
        lessons: [
          { id: 'g1', title: 'Basic Shapes', description: 'Circles, squares, triangles!', duration: '5 min', xp: 10 },
          { id: 'g2', title: '3D Shapes', description: 'Cubes, spheres, cones!', duration: '8 min', xp: 15 },
          { id: 'g3', title: 'Perimeter & Area', description: 'Measure shapes!', duration: '10 min', xp: 20 },
        ]
      },
    ]
  },
  {
    id: 'reading',
    name: 'Reading Land',
    emoji: '📚',
    gradient: 'from-pink-200 via-rose-200 to-red-200',
    bgClass: 'bg-gradient-to-br from-pink-100 to-rose-100',
    description: 'Words, stories & writing!',
    topics: [
      {
        id: 'alphabet', name: 'ABCs', emoji: '🔤',
        lessons: [
          { id: 'r1', title: 'Letters A-M', description: 'First half of the alphabet!', duration: '8 min', xp: 15 },
          { id: 'r2', title: 'Letters N-Z', description: 'Second half!', duration: '8 min', xp: 15 },
          { id: 'r3', title: 'Upper & Lowercase', description: 'Big and small letters', duration: '8 min', xp: 15 },
          { id: 'r4', title: 'Letter Sounds', description: 'What sound does each make?', duration: '10 min', xp: 20 },
        ]
      },
      {
        id: 'phonics', name: 'Phonics', emoji: '🗣️',
        lessons: [
          { id: 'p1', title: 'Short Vowels', description: 'A, E, I, O, U sounds!', duration: '10 min', xp: 20 },
          { id: 'p2', title: 'Long Vowels', description: 'When vowels say their name!', duration: '10 min', xp: 20 },
          { id: 'p3', title: 'Blends', description: 'Letters that stick together!', duration: '10 min', xp: 20 },
          { id: 'p4', title: 'Sight Words', description: 'Words to know by heart!', duration: '10 min', xp: 20 },
        ]
      },
      {
        id: 'vocabulary', name: 'Word Power', emoji: '💬',
        lessons: [
          { id: 'v1', title: 'Action Words', description: 'Words that DO things!', duration: '8 min', xp: 15 },
          { id: 'v2', title: 'Describing Words', description: 'Make things colorful!', duration: '8 min', xp: 15 },
          { id: 'v3', title: 'Opposites', description: 'Hot and cold, big and small!', duration: '8 min', xp: 15 },
        ]
      },
      {
        id: 'writing', name: 'Writing', emoji: '✏️',
        lessons: [
          { id: 'w1', title: 'Sentences', description: 'Complete thoughts!', duration: '10 min', xp: 20 },
          { id: 'w2', title: 'Paragraphs', description: 'Group your ideas!', duration: '12 min', xp: 25 },
          { id: 'w3', title: 'Story Writing', description: 'Beginning, middle, end!', duration: '15 min', xp: 30 },
        ]
      },
    ]
  },
  {
    id: 'science',
    name: 'Science Lab',
    emoji: '🔬',
    gradient: 'from-green-200 via-emerald-200 to-teal-200',
    bgClass: 'bg-gradient-to-br from-green-100 to-emerald-100',
    description: 'Discover how the world works!',
    topics: [
      {
        id: 'life', name: 'Living Things', emoji: '🌱',
        lessons: [
          { id: 'ls1', title: 'Plants', description: 'How do plants grow?', duration: '8 min', xp: 15 },
          { id: 'ls2', title: 'Animals', description: 'Different types of animals!', duration: '8 min', xp: 15 },
          { id: 'ls3', title: 'Human Body', description: 'How your body works!', duration: '10 min', xp: 20 },
          { id: 'ls4', title: 'Food Chains', description: 'Who eats what?', duration: '10 min', xp: 20 },
        ]
      },
      {
        id: 'earth', name: 'Planet Earth', emoji: '🌍',
        lessons: [
          { id: 'es1', title: 'Weather', description: 'Sun, rain, snow!', duration: '8 min', xp: 15 },
          { id: 'es2', title: 'Seasons', description: 'Spring, summer, fall, winter!', duration: '8 min', xp: 15 },
          { id: 'es3', title: 'Rocks', description: 'What is Earth made of?', duration: '10 min', xp: 20 },
          { id: 'es4', title: 'Water Cycle', description: 'Where does rain come from?', duration: '10 min', xp: 20 },
        ]
      },
      {
        id: 'space', name: 'Space', emoji: '🚀',
        lessons: [
          { id: 'sp1', title: 'Solar System', description: 'Planets and the Sun!', duration: '10 min', xp: 20 },
          { id: 'sp2', title: 'Earth & Moon', description: 'Our home and neighbor!', duration: '8 min', xp: 15 },
          { id: 'sp3', title: 'Stars', description: 'Billions of stars!', duration: '10 min', xp: 20 },
        ]
      },
    ]
  },
  {
    id: 'history',
    name: 'Time Travel',
    emoji: '🏛️',
    gradient: 'from-amber-200 via-yellow-200 to-orange-200',
    bgClass: 'bg-gradient-to-br from-amber-100 to-yellow-100',
    description: 'Explore the past!',
    topics: [
      {
        id: 'usa', name: 'American Story', emoji: '🇺🇸',
        lessons: [
          { id: 'us1', title: 'Native Americans', description: 'The first people here!', duration: '10 min', xp: 20 },
          { id: 'us2', title: 'Explorers', description: 'New people arrive!', duration: '10 min', xp: 20 },
          { id: 'us3', title: 'America is Born', description: 'The Revolution!', duration: '12 min', xp: 25 },
          { id: 'us4', title: 'Modern Times', description: 'Recent history!', duration: '10 min', xp: 20 },
        ]
      },
      {
        id: 'world', name: 'World History', emoji: '🌏',
        lessons: [
          { id: 'wh1', title: 'Ancient Egypt', description: 'Pyramids and pharaohs!', duration: '10 min', xp: 20 },
          { id: 'wh2', title: 'Ancient Greece', description: 'Olympics and democracy!', duration: '10 min', xp: 20 },
          { id: 'wh3', title: 'Ancient Rome', description: 'Gladiators and roads!', duration: '10 min', xp: 20 },
          { id: 'wh4', title: 'Knights & Castles', description: 'Medieval times!', duration: '10 min', xp: 20 },
        ]
      },
    ]
  },
  // FUTURE SKILLS
  {
    id: 'engineering',
    name: 'Build It!',
    emoji: '⚙️',
    gradient: 'from-cyan-200 via-sky-200 to-blue-200',
    bgClass: 'bg-gradient-to-br from-cyan-100 to-sky-100',
    description: 'Create, design & solve problems!',
    topics: [
      {
        id: 'machines', name: 'Simple Machines', emoji: '🔧',
        lessons: [
          { id: 'sm1', title: 'Levers', description: 'Lift heavy things easily!', duration: '8 min', xp: 20 },
          { id: 'sm2', title: 'Wheels', description: 'Make things roll!', duration: '8 min', xp: 20 },
          { id: 'sm3', title: 'Pulleys', description: 'Pull things up!', duration: '8 min', xp: 20 },
          { id: 'sm4', title: 'Ramps', description: 'Inclined planes!', duration: '8 min', xp: 20 },
        ]
      },
      {
        id: 'design', name: 'Design Thinking', emoji: '💡',
        lessons: [
          { id: 'dt1', title: 'Find Problems', description: 'What needs fixing?', duration: '10 min', xp: 25 },
          { id: 'dt2', title: 'Brainstorm', description: 'Think of solutions!', duration: '10 min', xp: 25 },
          { id: 'dt3', title: 'Build & Test', description: 'Try it out!', duration: '12 min', xp: 30 },
          { id: 'dt4', title: 'Make It Better', description: 'Improve your design!', duration: '12 min', xp: 30 },
        ]
      },
      {
        id: 'coding', name: 'Coding Basics', emoji: '💻',
        lessons: [
          { id: 'cd1', title: 'What is Code?', description: 'Talk to computers!', duration: '8 min', xp: 20 },
          { id: 'cd2', title: 'Step by Step', description: 'Sequences!', duration: '10 min', xp: 25 },
          { id: 'cd3', title: 'Loops', description: 'Repeat things!', duration: '10 min', xp: 25 },
          { id: 'cd4', title: 'If-Then', description: 'Make decisions!', duration: '12 min', xp: 30 },
        ]
      },
      {
        id: 'robots', name: 'Robotics', emoji: '🤖',
        lessons: [
          { id: 'rb1', title: 'What is a Robot?', description: 'Machines that help us!', duration: '8 min', xp: 20 },
          { id: 'rb2', title: 'Sensors', description: 'How robots see and feel!', duration: '10 min', xp: 25 },
          { id: 'rb3', title: 'Movement', description: 'How robots move!', duration: '10 min', xp: 25 },
        ]
      },
    ]
  },
  {
    id: 'money',
    name: 'Money Smart',
    emoji: '💰',
    gradient: 'from-emerald-200 via-green-200 to-lime-200',
    bgClass: 'bg-gradient-to-br from-emerald-100 to-green-100',
    description: 'Learn how money really works!',
    topics: [
      {
        id: 'basics', name: 'Money Basics', emoji: '🪙',
        lessons: [
          { id: 'mb1', title: 'Coins & Bills', description: 'Know your money!', duration: '8 min', xp: 15 },
          { id: 'mb2', title: 'Counting Money', description: 'Add it up!', duration: '8 min', xp: 15 },
          { id: 'mb3', title: 'Making Change', description: 'What\'s left over?', duration: '10 min', xp: 20 },
          { id: 'mb4', title: 'Needs vs Wants', description: 'What do you really need?', duration: '8 min', xp: 15 },
        ]
      },
      {
        id: 'saving', name: 'Saving Money', emoji: '🐷',
        lessons: [
          { id: 'sv1', title: 'Why Save?', description: 'Future you will thank you!', duration: '8 min', xp: 20 },
          { id: 'sv2', title: 'Setting Goals', description: 'What are you saving for?', duration: '8 min', xp: 20 },
          { id: 'sv3', title: 'Piggy Bank Power', description: 'Start small, grow big!', duration: '8 min', xp: 20 },
          { id: 'sv4', title: 'Bank Accounts', description: 'Where grown-ups keep money!', duration: '10 min', xp: 25 },
        ]
      },
      {
        id: 'earning', name: 'Earning Money', emoji: '💵',
        lessons: [
          { id: 'er1', title: 'Jobs & Work', description: 'How people earn money!', duration: '8 min', xp: 20 },
          { id: 'er2', title: 'Allowance Ideas', description: 'Earn money at home!', duration: '8 min', xp: 20 },
          { id: 'er3', title: 'Kid Businesses', description: 'Make your own money!', duration: '10 min', xp: 25 },
        ]
      },
      {
        id: 'budget', name: 'Budgeting', emoji: '📊',
        lessons: [
          { id: 'bg1', title: 'What is a Budget?', description: 'Plan your money!', duration: '8 min', xp: 20 },
          { id: 'bg2', title: 'Save, Spend, Give', description: 'The 3 jars!', duration: '10 min', xp: 25 },
          { id: 'bg3', title: 'Track Spending', description: 'Where does money go?', duration: '10 min', xp: 25 },
        ]
      },
    ]
  },
  {
    id: 'investing',
    name: 'Grow Money',
    emoji: '📈',
    gradient: 'from-violet-200 via-purple-200 to-fuchsia-200',
    bgClass: 'bg-gradient-to-br from-violet-100 to-purple-100',
    description: 'Make your money grow!',
    topics: [
      {
        id: 'intro', name: 'Investing 101', emoji: '🌱',
        lessons: [
          { id: 'ib1', title: 'What is Investing?', description: 'Make money grow!', duration: '8 min', xp: 25 },
          { id: 'ib2', title: 'Compound Interest', description: 'The magic of growth!', duration: '10 min', xp: 30 },
          { id: 'ib3', title: 'Start Early!', description: 'Time is your superpower!', duration: '8 min', xp: 25 },
          { id: 'ib4', title: 'Risk & Reward', description: 'More risk = more reward!', duration: '10 min', xp: 30 },
        ]
      },
      {
        id: 'stocks', name: 'Stock Market', emoji: '📊',
        lessons: [
          { id: 'st1', title: 'What is a Stock?', description: 'Own a piece of a company!', duration: '10 min', xp: 30 },
          { id: 'st2', title: 'How Stocks Work', description: 'Buy low, sell high!', duration: '10 min', xp: 30 },
          { id: 'st3', title: 'Pick Good Companies', description: 'What makes a company great?', duration: '12 min', xp: 35 },
          { id: 'st4', title: 'Dividends', description: 'Get paid to own stocks!', duration: '10 min', xp: 30 },
        ]
      },
      {
        id: 'other', name: 'Other Investments', emoji: '🏠',
        lessons: [
          { id: 'oi1', title: 'Real Estate', description: 'Owning buildings!', duration: '10 min', xp: 30 },
          { id: 'oi2', title: 'Index Funds', description: 'Own the whole market!', duration: '10 min', xp: 30 },
          { id: 'oi3', title: 'Starting a Business', description: 'The best investment!', duration: '12 min', xp: 35 },
        ]
      },
    ]
  },
  {
    id: 'business',
    name: 'Boss Kid',
    emoji: '🏪',
    gradient: 'from-rose-200 via-pink-200 to-red-200',
    bgClass: 'bg-gradient-to-br from-rose-100 to-pink-100',
    description: 'Start your own empire!',
    topics: [
      {
        id: 'entrepreneur', name: 'Be an Entrepreneur', emoji: '🚀',
        lessons: [
          { id: 'en1', title: 'What is an Entrepreneur?', description: 'People who start things!', duration: '8 min', xp: 25 },
          { id: 'en2', title: 'Famous Kid Bosses', description: 'Kids who made it big!', duration: '10 min', xp: 30 },
          { id: 'en3', title: 'Find Problems', description: 'Every business solves a problem!', duration: '10 min', xp: 30 },
          { id: 'en4', title: 'Your Big Idea', description: 'What will YOU create?', duration: '12 min', xp: 35 },
        ]
      },
      {
        id: 'start', name: 'Start a Business', emoji: '🎬',
        lessons: [
          { id: 'sb1', title: 'Lemonade Stand', description: 'Your first business!', duration: '10 min', xp: 30 },
          { id: 'sb2', title: 'Products vs Services', description: 'Sell things or do things!', duration: '10 min', xp: 30 },
          { id: 'sb3', title: 'Know Your Customer', description: 'Who will buy from you?', duration: '10 min', xp: 30 },
          { id: 'sb4', title: 'Setting Prices', description: 'How much should you charge?', duration: '12 min', xp: 35 },
        ]
      },
      {
        id: 'ideas', name: 'Kid Business Ideas', emoji: '💡',
        lessons: [
          { id: 'bi1', title: 'Pet Sitting', description: 'Help with animals!', duration: '8 min', xp: 25 },
          { id: 'bi2', title: 'Yard Work', description: 'Help neighbors!', duration: '8 min', xp: 25 },
          { id: 'bi3', title: 'Arts & Crafts', description: 'Sell what you make!', duration: '8 min', xp: 25 },
          { id: 'bi4', title: 'Online Business', description: 'Sell on the internet!', duration: '10 min', xp: 30 },
        ]
      },
    ]
  },
  {
    id: 'lifeskills',
    name: 'Life Winner',
    emoji: '🏆',
    gradient: 'from-yellow-200 via-amber-200 to-orange-200',
    bgClass: 'bg-gradient-to-br from-yellow-100 to-amber-100',
    description: 'Skills for a great life!',
    topics: [
      {
        id: 'goals', name: 'Setting Goals', emoji: '🎯',
        lessons: [
          { id: 'gl1', title: 'Dream Big', description: 'What do you want?', duration: '8 min', xp: 20 },
          { id: 'gl2', title: 'SMART Goals', description: 'Goals that work!', duration: '10 min', xp: 25 },
          { id: 'gl3', title: 'Break It Down', description: 'Small steps, big dreams!', duration: '10 min', xp: 25 },
          { id: 'gl4', title: 'Stay Motivated', description: 'Keep going!', duration: '10 min', xp: 25 },
        ]
      },
      {
        id: 'problems', name: 'Problem Solving', emoji: '🧩',
        lessons: [
          { id: 'ps1', title: 'Identify Problems', description: 'What\'s really wrong?', duration: '8 min', xp: 20 },
          { id: 'ps2', title: 'Find Solutions', description: 'Many ways to fix it!', duration: '10 min', xp: 25 },
          { id: 'ps3', title: 'Pick the Best', description: 'Choose wisely!', duration: '10 min', xp: 25 },
          { id: 'ps4', title: 'Learn from Mistakes', description: 'Fail forward!', duration: '10 min', xp: 25 },
        ]
      },
      {
        id: 'communicate', name: 'Communication', emoji: '🗣️',
        lessons: [
          { id: 'cm1', title: 'Listening', description: 'Really hear people!', duration: '8 min', xp: 20 },
          { id: 'cm2', title: 'Speaking Up', description: 'Say what you mean!', duration: '8 min', xp: 20 },
          { id: 'cm3', title: 'Being Kind', description: 'Kind words matter!', duration: '8 min', xp: 20 },
        ]
      },
      {
        id: 'time', name: 'Time Management', emoji: '⏰',
        lessons: [
          { id: 'tm1', title: 'Plan Your Day', description: 'Be organized!', duration: '10 min', xp: 25 },
          { id: 'tm2', title: 'First Things First', description: 'Important stuff first!', duration: '10 min', xp: 25 },
          { id: 'tm3', title: 'Stay Focused', description: 'Avoid distractions!', duration: '10 min', xp: 25 },
        ]
      },
    ]
  },
];

// ============================================================================
// APP COMPONENT
// ============================================================================

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

  const xpForLevel = (lvl: number) => lvl * 100;
  const progress = Math.min((xp % 100) / 100 * 100, 100);

  const completeLesson = (lesson: Lesson) => {
    if (completedLessons.includes(lesson.id)) return;
    const newXp = xp + lesson.xp;
    setXp(newXp);
    setCompletedLessons([...completedLessons, lesson.id]);
    if (newXp >= xpForLevel(level) * level) {
      setLevel(level + 1);
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    }
  };

  // Celebration
  if (showCelebration) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-8xl mb-6 animate-bounce">🎉</div>
          <h1 className="font-display text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500 mb-4">
            LEVEL UP!
          </h1>
          <p className="text-2xl text-gray-600 font-bold">You are now Level {level}!</p>
          <p className="text-lg text-gray-400 mt-4">Amazing work, superstar! ⭐</p>
        </div>
      </div>
    );
  }

  // Lesson View
  if (selectedLesson && selectedTopic && selectedWorld) {
    const isComplete = completedLessons.includes(selectedLesson.id);
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFF9F5] via-[#FFF0E8] to-[#F5F0FF]">
        <header className="p-4">
          <button 
            onClick={() => setSelectedLesson(null)}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-700 font-bold text-lg"
          >
            <span className="text-2xl">←</span> Back
          </button>
        </header>
        
        <main className="max-w-md mx-auto px-5 py-4">
          <div className={`bubble ${selectedWorld.bgClass} p-8 text-center mb-6`}>
            <span className="text-7xl block mb-4 animate-float">{selectedTopic.emoji}</span>
            <h1 className="font-display text-2xl font-black text-gray-800 mb-2">{selectedLesson.title}</h1>
            <p className="text-gray-600 font-semibold">{selectedLesson.description}</p>
          </div>

          <div className="bubble bg-white p-6 mb-6">
            <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl flex items-center justify-center mb-4">
              <div className="text-center">
                <span className="text-6xl block mb-2">🎬</span>
                <p className="text-gray-400 font-semibold">Video lesson coming soon!</p>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-500 font-bold">
              <span>⏱️ {selectedLesson.duration}</span>
              <span>⭐ +{selectedLesson.xp} XP</span>
            </div>
          </div>

          {isComplete ? (
            <div className="bubble bg-gradient-to-r from-green-100 to-emerald-100 p-6 text-center">
              <span className="text-5xl block mb-2">✅</span>
              <p className="font-display font-black text-green-700 text-xl">All Done!</p>
              <p className="text-green-600 font-bold">You earned {selectedLesson.xp} XP!</p>
            </div>
          ) : (
            <button
              onClick={() => completeLesson(selectedLesson)}
              className={`w-full bubble bg-gradient-to-r ${selectedWorld.gradient} p-6 text-center`}
            >
              <span className="font-display font-black text-gray-800 text-xl">Complete Lesson ✨</span>
              <p className="text-gray-600 font-bold mt-1">Earn {selectedLesson.xp} XP!</p>
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
      <div className="min-h-screen bg-gradient-to-br from-[#FFF9F5] via-[#FFF0E8] to-[#F5F0FF]">
        <header className="p-4">
          <button 
            onClick={() => setSelectedTopic(null)}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-700 font-bold text-lg"
          >
            <span className="text-2xl">←</span> Back
          </button>
        </header>
        
        <main className="max-w-md mx-auto px-5 py-4">
          <div className={`bubble ${selectedWorld.bgClass} p-6 text-center mb-6`}>
            <span className="text-6xl block mb-3">{selectedTopic.emoji}</span>
            <h1 className="font-display text-2xl font-black text-gray-800">{selectedTopic.name}</h1>
            <p className="text-gray-600 font-bold mt-2">{done} of {total} lessons done</p>
            <div className="w-full bg-white/50 rounded-full h-4 mt-4">
              <div 
                className="h-4 rounded-full bg-white/80 progress-fill"
                style={{ width: `${(done / total) * 100}%` }}
              />
            </div>
          </div>

          <div className="space-y-3">
            {selectedTopic.lessons.map((lesson, idx) => {
              const isDone = completedLessons.includes(lesson.id);
              const isLocked = idx > 0 && !completedLessons.includes(selectedTopic.lessons[idx - 1].id);
              
              return (
                <button
                  key={lesson.id}
                  onClick={() => !isLocked && setSelectedLesson(lesson)}
                  disabled={isLocked}
                  className={`w-full bubble p-5 flex items-center gap-4 text-center ${
                    isLocked ? 'bg-gray-100 opacity-60' : 
                    isDone ? 'bg-gradient-to-r from-green-100 to-emerald-100' : 
                    'bg-white'
                  }`}
                >
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-black ${
                    isLocked ? 'bg-gray-200 text-gray-400' :
                    isDone ? 'bg-green-400 text-white' :
                    `bg-gradient-to-br ${selectedWorld.gradient} text-gray-700`
                  }`}>
                    {isLocked ? '🔒' : isDone ? '✓' : idx + 1}
                  </div>
                  <div className="flex-1 text-left">
                    <p className={`font-bold text-lg ${isDone ? 'text-green-700' : 'text-gray-800'}`}>
                      {lesson.title}
                    </p>
                    <p className="text-gray-500 font-semibold text-sm">{lesson.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400 font-bold">{lesson.duration}</p>
                    <p className={`font-black ${isDone ? 'text-green-500' : 'text-amber-500'}`}>
                      {isDone ? '✓ Done' : `+${lesson.xp}`}
                    </p>
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
      <div className="min-h-screen bg-gradient-to-br from-[#FFF9F5] via-[#FFF0E8] to-[#F5F0FF]">
        <header className="p-4">
          <button 
            onClick={() => setSelectedWorld(null)}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-700 font-bold text-lg"
          >
            <span className="text-2xl">←</span> All Worlds
          </button>
        </header>
        
        <main className="max-w-md mx-auto px-5 py-4">
          <div className={`world-bubble bg-gradient-to-br ${selectedWorld.gradient} p-10 text-center mb-8`}>
            <span className="text-7xl block mb-4 animate-float">{selectedWorld.emoji}</span>
            <h1 className="font-display text-3xl font-black text-gray-800">{selectedWorld.name}</h1>
            <p className="text-gray-600 font-bold mt-2">{selectedWorld.description}</p>
          </div>

          <div className="space-y-3">
            {selectedWorld.topics.map(topic => {
              const done = topic.lessons.filter(l => completedLessons.includes(l.id)).length;
              const total = topic.lessons.length;
              const pct = Math.round((done / total) * 100);
              
              return (
                <button
                  key={topic.id}
                  onClick={() => setSelectedTopic(topic)}
                  className="w-full bubble bg-white p-5 flex items-center gap-4 text-center"
                >
                  <span className="text-4xl">{topic.emoji}</span>
                  <div className="flex-1 text-left">
                    <p className="font-bold text-lg text-gray-800">{topic.name}</p>
                    <p className="text-gray-500 font-semibold">{done}/{total} lessons</p>
                  </div>
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center font-black ${
                    pct === 100 ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {pct === 100 ? '✓' : `${pct}%`}
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
  const schoolWorlds = worldsData.filter(w => ['math', 'reading', 'science', 'history'].includes(w.id));
  const futureWorlds = worldsData.filter(w => !['math', 'reading', 'science', 'history'].includes(w.id));

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF9F5] via-[#FFF0E8] to-[#F5F0FF]">
      {/* Cool Header with Logo */}
      <header className="px-5 pt-8 pb-6">
        <div className="max-w-md mx-auto">
          {/* Logo & Title */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-violet-400 via-pink-400 to-orange-400 shadow-xl mb-4">
              <span className="text-4xl">🚀</span>
            </div>
            <h1 className="font-display text-4xl font-black bg-gradient-to-r from-violet-600 via-pink-500 to-orange-500 bg-clip-text text-transparent">
              FutureKids
            </h1>
            <p className="text-gray-500 font-bold mt-1">Learn. Grow. Succeed! ✨</p>
          </div>

          {/* Stats Row */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="bubble bg-gradient-to-r from-orange-100 to-amber-100 px-5 py-3 flex items-center gap-2">
              <span className="text-2xl">🔥</span>
              <span className="font-black text-orange-600 text-lg">{streak} day streak</span>
            </div>
            <div className="bubble bg-gradient-to-r from-yellow-100 to-amber-100 px-5 py-3 flex items-center gap-2">
              <span className="text-2xl">⭐</span>
              <span className="font-black text-amber-600 text-lg">{xp} XP</span>
            </div>
          </div>

          {/* Level Card */}
          <div className="bubble bg-white p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-300 via-orange-400 to-pink-500 flex items-center justify-center text-3xl font-black text-white shadow-lg">
                  {level}
                </div>
                <div>
                  <p className="font-display font-black text-gray-800 text-xl">Level {level}</p>
                  <p className="text-gray-500 font-bold">Keep going! 💪</p>
                </div>
              </div>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-5">
              <div 
                className="h-5 rounded-full bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-gray-400 font-bold text-sm mt-2 text-center">{100 - (xp % 100)} XP to Level {level + 1}</p>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-5 pb-12">
        {/* School Essentials */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px flex-1 bg-gradient-to-r from-blue-300 to-transparent" />
            <h2 className="font-display font-black text-blue-600 text-lg">🎓 School Stuff</h2>
            <div className="h-px flex-1 bg-gradient-to-l from-blue-300 to-transparent" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {schoolWorlds.map(world => {
              const total = world.topics.reduce((a, t) => a + t.lessons.length, 0);
              const done = world.topics.reduce((a, t) => a + t.lessons.filter(l => completedLessons.includes(l.id)).length, 0);
              return (
                <button
                  key={world.id}
                  onClick={() => setSelectedWorld(world)}
                  className={`world-bubble bg-gradient-to-br ${world.gradient} p-6 text-center`}
                >
                  <span className="text-5xl block mb-3">{world.emoji}</span>
                  <p className="font-display font-black text-gray-800 text-lg">{world.name}</p>
                  <p className="text-gray-600 font-bold text-sm mt-1">{done}/{total} lessons</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Future Skills */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px flex-1 bg-gradient-to-r from-purple-300 to-transparent" />
            <h2 className="font-display font-black text-purple-600 text-lg">🚀 Future Skills</h2>
            <div className="h-px flex-1 bg-gradient-to-l from-purple-300 to-transparent" />
          </div>
          <p className="text-center text-gray-500 font-bold mb-5">What school won&apos;t teach you! 💡</p>
          <div className="grid grid-cols-2 gap-4">
            {futureWorlds.map(world => {
              const total = world.topics.reduce((a, t) => a + t.lessons.length, 0);
              const done = world.topics.reduce((a, t) => a + t.lessons.filter(l => completedLessons.includes(l.id)).length, 0);
              return (
                <button
                  key={world.id}
                  onClick={() => setSelectedWorld(world)}
                  className={`world-bubble bg-gradient-to-br ${world.gradient} p-6 text-center`}
                >
                  <span className="text-5xl block mb-3">{world.emoji}</span>
                  <p className="font-display font-black text-gray-800 text-lg">{world.name}</p>
                  <p className="text-gray-600 font-bold text-sm mt-1">{done}/{total} lessons</p>
                </button>
              );
            })}
          </div>
        </div>
      </main>

      <footer className="text-center py-8 text-gray-400 font-bold">
        Made with 💜 for Carter, Kingston & Sister
      </footer>
    </div>
  );
}
