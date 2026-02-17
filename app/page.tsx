'use client';

import { useState, useEffect } from 'react';

// ============================================================================
// FUTUREKIDS ACADEMY - Teaching Kids What School Won't
// ============================================================================

interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  xp: number;
  completed?: boolean;
  locked?: boolean;
}

interface Topic {
  id: string;
  name: string;
  emoji: string;
  lessons: Lesson[];
  progress?: number;
}

interface World {
  id: string;
  name: string;
  emoji: string;
  color: string;
  gradient: string;
  description: string;
  topics: Topic[];
  unlockLevel?: number;
}

// ============================================================================
// COMPREHENSIVE CURRICULUM DATA
// ============================================================================

const worldsData: World[] = [
  // ============================================================================
  // 🎓 SCHOOL ESSENTIALS - What you need to pass school
  // ============================================================================
  {
    id: 'math',
    name: 'Math Mountain',
    emoji: '🔢',
    color: 'blue',
    gradient: 'from-blue-500 to-indigo-600',
    description: 'Numbers, shapes & problem solving!',
    topics: [
      {
        id: 'counting',
        name: 'Counting & Numbers',
        emoji: '1️⃣',
        lessons: [
          { id: 'm1', title: 'Counting 1-10', description: 'Learn to count with fun objects!', duration: '5 min', xp: 10 },
          { id: 'm2', title: 'Counting 11-20', description: 'Keep going higher!', duration: '5 min', xp: 10 },
          { id: 'm3', title: 'Counting to 100', description: 'You can count super high!', duration: '8 min', xp: 15 },
          { id: 'm4', title: 'Skip Counting', description: 'Count by 2s, 5s, and 10s', duration: '10 min', xp: 20 },
        ]
      },
      {
        id: 'addition',
        name: 'Addition Adventures',
        emoji: '➕',
        lessons: [
          { id: 'a1', title: 'Adding with Pictures', description: 'Put things together!', duration: '5 min', xp: 10 },
          { id: 'a2', title: 'Adding to 10', description: 'Master single digits!', duration: '8 min', xp: 15 },
          { id: 'a3', title: 'Adding to 20', description: 'Getting bigger!', duration: '8 min', xp: 15 },
          { id: 'a4', title: 'Adding Double Digits', description: 'Add bigger numbers!', duration: '10 min', xp: 20 },
        ]
      },
      {
        id: 'subtraction',
        name: 'Subtraction Station',
        emoji: '➖',
        lessons: [
          { id: 's1', title: 'Taking Away', description: 'Learn what\'s left!', duration: '5 min', xp: 10 },
          { id: 's2', title: 'Subtracting to 10', description: 'Single digit subtraction', duration: '8 min', xp: 15 },
          { id: 's3', title: 'Subtracting to 20', description: 'Bigger numbers!', duration: '8 min', xp: 15 },
        ]
      },
      {
        id: 'multiplication',
        name: 'Multiplication Magic',
        emoji: '✖️',
        lessons: [
          { id: 'x1', title: 'Groups of Things', description: 'What is multiplication?', duration: '8 min', xp: 15 },
          { id: 'x2', title: 'Times Tables 1-5', description: 'Memorize the basics!', duration: '10 min', xp: 20 },
          { id: 'x3', title: 'Times Tables 6-10', description: 'Keep going!', duration: '10 min', xp: 20 },
          { id: 'x4', title: 'Times Tables 11-12', description: 'Almost done!', duration: '10 min', xp: 20 },
        ]
      },
      {
        id: 'division',
        name: 'Division Discovery',
        emoji: '➗',
        lessons: [
          { id: 'd1', title: 'Fair Sharing', description: 'Split things equally!', duration: '8 min', xp: 15 },
          { id: 'd2', title: 'Basic Division', description: 'Divide small numbers', duration: '10 min', xp: 20 },
          { id: 'd3', title: 'Division with Remainders', description: 'What\'s left over?', duration: '10 min', xp: 20 },
        ]
      },
      {
        id: 'fractions',
        name: 'Fraction Friends',
        emoji: '🍕',
        lessons: [
          { id: 'f1', title: 'What is a Fraction?', description: 'Parts of a whole!', duration: '8 min', xp: 15 },
          { id: 'f2', title: 'Halves & Quarters', description: 'Cut it up!', duration: '8 min', xp: 15 },
          { id: 'f3', title: 'Comparing Fractions', description: 'Which is bigger?', duration: '10 min', xp: 20 },
          { id: 'f4', title: 'Adding Fractions', description: 'Put fractions together!', duration: '12 min', xp: 25 },
        ]
      },
      {
        id: 'geometry',
        name: 'Shape Shifters',
        emoji: '🔷',
        lessons: [
          { id: 'g1', title: 'Basic Shapes', description: 'Circles, squares, triangles!', duration: '5 min', xp: 10 },
          { id: 'g2', title: '3D Shapes', description: 'Cubes, spheres, cones!', duration: '8 min', xp: 15 },
          { id: 'g3', title: 'Perimeter', description: 'Around the outside!', duration: '10 min', xp: 20 },
          { id: 'g4', title: 'Area', description: 'How much space inside?', duration: '10 min', xp: 20 },
        ]
      },
    ]
  },
  {
    id: 'reading',
    name: 'Reading Rainbow',
    emoji: '📚',
    color: 'purple',
    gradient: 'from-purple-500 to-pink-600',
    description: 'Words, stories & writing!',
    topics: [
      {
        id: 'alphabet',
        name: 'ABC Basics',
        emoji: '🔤',
        lessons: [
          { id: 'r1', title: 'Letters A-M', description: 'First half of the alphabet!', duration: '8 min', xp: 15 },
          { id: 'r2', title: 'Letters N-Z', description: 'Second half!', duration: '8 min', xp: 15 },
          { id: 'r3', title: 'Upper & Lowercase', description: 'Big and small letters', duration: '8 min', xp: 15 },
          { id: 'r4', title: 'Letter Sounds', description: 'What sound does each make?', duration: '10 min', xp: 20 },
        ]
      },
      {
        id: 'phonics',
        name: 'Phonics Fun',
        emoji: '🗣️',
        lessons: [
          { id: 'p1', title: 'Short Vowels', description: 'A, E, I, O, U sounds!', duration: '10 min', xp: 20 },
          { id: 'p2', title: 'Long Vowels', description: 'When vowels say their name!', duration: '10 min', xp: 20 },
          { id: 'p3', title: 'Blends', description: 'Letters that stick together!', duration: '10 min', xp: 20 },
          { id: 'p4', title: 'Sight Words', description: 'Words to know by heart!', duration: '10 min', xp: 20 },
        ]
      },
      {
        id: 'vocabulary',
        name: 'Word Power',
        emoji: '💬',
        lessons: [
          { id: 'v1', title: 'Action Words (Verbs)', description: 'Words that DO things!', duration: '8 min', xp: 15 },
          { id: 'v2', title: 'Describing Words (Adjectives)', description: 'Make things colorful!', duration: '8 min', xp: 15 },
          { id: 'v3', title: 'Opposites', description: 'Hot and cold, big and small!', duration: '8 min', xp: 15 },
          { id: 'v4', title: 'Synonyms', description: 'Words that mean the same!', duration: '10 min', xp: 20 },
        ]
      },
      {
        id: 'writing',
        name: 'Writing Workshop',
        emoji: '✏️',
        lessons: [
          { id: 'w1', title: 'Writing Sentences', description: 'Complete thoughts!', duration: '10 min', xp: 20 },
          { id: 'w2', title: 'Writing Paragraphs', description: 'Group your ideas!', duration: '12 min', xp: 25 },
          { id: 'w3', title: 'Story Writing', description: 'Beginning, middle, end!', duration: '15 min', xp: 30 },
          { id: 'w4', title: 'Persuasive Writing', description: 'Convince someone!', duration: '15 min', xp: 30 },
        ]
      },
    ]
  },
  {
    id: 'science',
    name: 'Science Lab',
    emoji: '🔬',
    color: 'green',
    gradient: 'from-green-500 to-teal-600',
    description: 'Discover how the world works!',
    topics: [
      {
        id: 'life-science',
        name: 'Living Things',
        emoji: '🌱',
        lessons: [
          { id: 'ls1', title: 'Plants', description: 'How do plants grow?', duration: '8 min', xp: 15 },
          { id: 'ls2', title: 'Animals', description: 'Different types of animals!', duration: '8 min', xp: 15 },
          { id: 'ls3', title: 'Human Body', description: 'How your body works!', duration: '10 min', xp: 20 },
          { id: 'ls4', title: 'Food Chains', description: 'Who eats what?', duration: '10 min', xp: 20 },
        ]
      },
      {
        id: 'earth-science',
        name: 'Planet Earth',
        emoji: '🌍',
        lessons: [
          { id: 'es1', title: 'Weather', description: 'Sun, rain, snow!', duration: '8 min', xp: 15 },
          { id: 'es2', title: 'Seasons', description: 'Spring, summer, fall, winter!', duration: '8 min', xp: 15 },
          { id: 'es3', title: 'Rocks & Minerals', description: 'What is Earth made of?', duration: '10 min', xp: 20 },
          { id: 'es4', title: 'Water Cycle', description: 'Where does rain come from?', duration: '10 min', xp: 20 },
        ]
      },
      {
        id: 'physical-science',
        name: 'Forces & Energy',
        emoji: '⚡',
        lessons: [
          { id: 'ps1', title: 'Push & Pull', description: 'Forces that move things!', duration: '8 min', xp: 15 },
          { id: 'ps2', title: 'Magnets', description: 'Attract and repel!', duration: '8 min', xp: 15 },
          { id: 'ps3', title: 'Light & Sound', description: 'Energy you see and hear!', duration: '10 min', xp: 20 },
          { id: 'ps4', title: 'Electricity', description: 'Power everything!', duration: '10 min', xp: 20 },
        ]
      },
      {
        id: 'space',
        name: 'Space Explorer',
        emoji: '🚀',
        lessons: [
          { id: 'sp1', title: 'Our Solar System', description: 'Planets and the Sun!', duration: '10 min', xp: 20 },
          { id: 'sp2', title: 'Earth & Moon', description: 'Our home and neighbor!', duration: '8 min', xp: 15 },
          { id: 'sp3', title: 'Stars & Galaxies', description: 'Billions of stars!', duration: '10 min', xp: 20 },
          { id: 'sp4', title: 'Astronauts', description: 'People in space!', duration: '8 min', xp: 15 },
        ]
      },
    ]
  },
  {
    id: 'history',
    name: 'Time Travelers',
    emoji: '🏛️',
    color: 'amber',
    gradient: 'from-amber-500 to-orange-600',
    description: 'Explore the past!',
    topics: [
      {
        id: 'us-history',
        name: 'American Story',
        emoji: '🇺🇸',
        lessons: [
          { id: 'us1', title: 'Native Americans', description: 'The first people here!', duration: '10 min', xp: 20 },
          { id: 'us2', title: 'Explorers & Colonies', description: 'New people arrive!', duration: '10 min', xp: 20 },
          { id: 'us3', title: 'The Revolution', description: 'America is born!', duration: '12 min', xp: 25 },
          { id: 'us4', title: 'Civil War', description: 'A divided nation heals', duration: '12 min', xp: 25 },
          { id: 'us5', title: 'Modern America', description: 'Recent history!', duration: '10 min', xp: 20 },
        ]
      },
      {
        id: 'world-history',
        name: 'World Adventure',
        emoji: '🌏',
        lessons: [
          { id: 'wh1', title: 'Ancient Egypt', description: 'Pyramids and pharaohs!', duration: '10 min', xp: 20 },
          { id: 'wh2', title: 'Ancient Greece', description: 'Olympics and democracy!', duration: '10 min', xp: 20 },
          { id: 'wh3', title: 'Ancient Rome', description: 'Gladiators and roads!', duration: '10 min', xp: 20 },
          { id: 'wh4', title: 'Middle Ages', description: 'Knights and castles!', duration: '10 min', xp: 20 },
        ]
      },
    ]
  },
  // ============================================================================
  // 🚀 FUTURE SKILLS - What school WON'T teach you!
  // ============================================================================
  {
    id: 'engineering',
    name: 'Engineering Lab',
    emoji: '⚙️',
    color: 'cyan',
    gradient: 'from-cyan-500 to-blue-600',
    description: 'Build, create & solve problems!',
    topics: [
      {
        id: 'simple-machines',
        name: 'Simple Machines',
        emoji: '🔧',
        lessons: [
          { id: 'sm1', title: 'Levers', description: 'Lift heavy things easily!', duration: '8 min', xp: 20 },
          { id: 'sm2', title: 'Wheels & Axles', description: 'Make things roll!', duration: '8 min', xp: 20 },
          { id: 'sm3', title: 'Pulleys', description: 'Pull things up!', duration: '8 min', xp: 20 },
          { id: 'sm4', title: 'Inclined Planes', description: 'Ramps make work easier!', duration: '8 min', xp: 20 },
          { id: 'sm5', title: 'Screws & Wedges', description: 'Twist and split!', duration: '8 min', xp: 20 },
        ]
      },
      {
        id: 'design-thinking',
        name: 'Design Thinking',
        emoji: '💡',
        lessons: [
          { id: 'dt1', title: 'Identify Problems', description: 'What needs fixing?', duration: '10 min', xp: 25 },
          { id: 'dt2', title: 'Brainstorm Ideas', description: 'Think of solutions!', duration: '10 min', xp: 25 },
          { id: 'dt3', title: 'Prototype', description: 'Build a test version!', duration: '12 min', xp: 30 },
          { id: 'dt4', title: 'Test & Improve', description: 'Make it better!', duration: '12 min', xp: 30 },
        ]
      },
      {
        id: 'building',
        name: 'Building & Structures',
        emoji: '🏗️',
        lessons: [
          { id: 'bd1', title: 'Strong Shapes', description: 'Triangles are super strong!', duration: '8 min', xp: 20 },
          { id: 'bd2', title: 'Bridges', description: 'Connect two places!', duration: '10 min', xp: 25 },
          { id: 'bd3', title: 'Towers', description: 'Build up high!', duration: '10 min', xp: 25 },
          { id: 'bd4', title: 'Earthquake Safe', description: 'Buildings that don\'t fall!', duration: '12 min', xp: 30 },
        ]
      },
      {
        id: 'coding',
        name: 'Coding Basics',
        emoji: '💻',
        lessons: [
          { id: 'cd1', title: 'What is Code?', description: 'Instructions for computers!', duration: '8 min', xp: 20 },
          { id: 'cd2', title: 'Sequences', description: 'Step by step!', duration: '10 min', xp: 25 },
          { id: 'cd3', title: 'Loops', description: 'Repeat things!', duration: '10 min', xp: 25 },
          { id: 'cd4', title: 'If-Then', description: 'Making decisions!', duration: '12 min', xp: 30 },
          { id: 'cd5', title: 'Debug It!', description: 'Fix mistakes!', duration: '10 min', xp: 25 },
        ]
      },
      {
        id: 'robotics',
        name: 'Robotics',
        emoji: '🤖',
        lessons: [
          { id: 'rb1', title: 'What is a Robot?', description: 'Machines that help us!', duration: '8 min', xp: 20 },
          { id: 'rb2', title: 'Sensors', description: 'How robots see and feel!', duration: '10 min', xp: 25 },
          { id: 'rb3', title: 'Motors & Movement', description: 'How robots move!', duration: '10 min', xp: 25 },
          { id: 'rb4', title: 'Programming Robots', description: 'Tell robots what to do!', duration: '12 min', xp: 30 },
        ]
      },
    ]
  },
  {
    id: 'money',
    name: 'Money Masters',
    emoji: '💰',
    color: 'emerald',
    gradient: 'from-emerald-500 to-green-600',
    description: 'Learn how money really works!',
    topics: [
      {
        id: 'money-basics',
        name: 'Money Basics',
        emoji: '🪙',
        lessons: [
          { id: 'mb1', title: 'Coins & Bills', description: 'Know your money!', duration: '8 min', xp: 15 },
          { id: 'mb2', title: 'Counting Money', description: 'Add it up!', duration: '8 min', xp: 15 },
          { id: 'mb3', title: 'Making Change', description: 'What\'s left over?', duration: '10 min', xp: 20 },
          { id: 'mb4', title: 'Needs vs Wants', description: 'What do you really need?', duration: '8 min', xp: 15 },
        ]
      },
      {
        id: 'saving',
        name: 'Super Savers',
        emoji: '🐷',
        lessons: [
          { id: 'sv1', title: 'Why Save Money?', description: 'Future you will thank you!', duration: '8 min', xp: 20 },
          { id: 'sv2', title: 'Setting Goals', description: 'What are you saving for?', duration: '8 min', xp: 20 },
          { id: 'sv3', title: 'Piggy Bank Power', description: 'Start small, grow big!', duration: '8 min', xp: 20 },
          { id: 'sv4', title: 'Bank Accounts', description: 'Where grown-ups keep money!', duration: '10 min', xp: 25 },
        ]
      },
      {
        id: 'earning',
        name: 'Earning Money',
        emoji: '💵',
        lessons: [
          { id: 'er1', title: 'Jobs & Work', description: 'How people earn money!', duration: '8 min', xp: 20 },
          { id: 'er2', title: 'Allowance Ideas', description: 'Earn money at home!', duration: '8 min', xp: 20 },
          { id: 'er3', title: 'Kid Businesses', description: 'Make your own money!', duration: '10 min', xp: 25 },
          { id: 'er4', title: 'Passive Income', description: 'Money while you sleep!', duration: '12 min', xp: 30 },
        ]
      },
      {
        id: 'budgeting',
        name: 'Budget Boss',
        emoji: '📊',
        lessons: [
          { id: 'bg1', title: 'What is a Budget?', description: 'Plan your money!', duration: '8 min', xp: 20 },
          { id: 'bg2', title: 'The 3 Jars', description: 'Save, Spend, Give!', duration: '10 min', xp: 25 },
          { id: 'bg3', title: 'Tracking Spending', description: 'Where does money go?', duration: '10 min', xp: 25 },
          { id: 'bg4', title: 'Making Choices', description: 'You can\'t buy everything!', duration: '10 min', xp: 25 },
        ]
      },
    ]
  },
  {
    id: 'investing',
    name: 'Investment Island',
    emoji: '📈',
    color: 'violet',
    gradient: 'from-violet-500 to-purple-600',
    description: 'Make your money grow!',
    topics: [
      {
        id: 'invest-basics',
        name: 'Investing 101',
        emoji: '🌱',
        lessons: [
          { id: 'ib1', title: 'What is Investing?', description: 'Make money grow!', duration: '8 min', xp: 25 },
          { id: 'ib2', title: 'Compound Interest', description: 'The 8th wonder of the world!', duration: '10 min', xp: 30 },
          { id: 'ib3', title: 'Time is Your Friend', description: 'Start early, win big!', duration: '8 min', xp: 25 },
          { id: 'ib4', title: 'Risk & Reward', description: 'No risk, no reward!', duration: '10 min', xp: 30 },
        ]
      },
      {
        id: 'stocks',
        name: 'Stock Market',
        emoji: '📊',
        lessons: [
          { id: 'st1', title: 'What is a Stock?', description: 'Own a piece of a company!', duration: '10 min', xp: 30 },
          { id: 'st2', title: 'How Stocks Work', description: 'Buy low, sell high!', duration: '10 min', xp: 30 },
          { id: 'st3', title: 'Picking Good Companies', description: 'What makes a company great?', duration: '12 min', xp: 35 },
          { id: 'st4', title: 'Reading Stock Charts', description: 'Lines that tell stories!', duration: '12 min', xp: 35 },
          { id: 'st5', title: 'Dividends', description: 'Get paid to own stocks!', duration: '10 min', xp: 30 },
        ]
      },
      {
        id: 'other-investments',
        name: 'Beyond Stocks',
        emoji: '🏠',
        lessons: [
          { id: 'oi1', title: 'Real Estate', description: 'Owning buildings!', duration: '10 min', xp: 30 },
          { id: 'oi2', title: 'Index Funds', description: 'Own the whole market!', duration: '10 min', xp: 30 },
          { id: 'oi3', title: 'Bonds', description: 'Loan money, get paid!', duration: '10 min', xp: 30 },
          { id: 'oi4', title: 'Starting a Business', description: 'The best investment!', duration: '12 min', xp: 35 },
        ]
      },
    ]
  },
  {
    id: 'business',
    name: 'Business Builders',
    emoji: '🏪',
    color: 'rose',
    gradient: 'from-rose-500 to-pink-600',
    description: 'Start your own empire!',
    topics: [
      {
        id: 'entrepreneur',
        name: 'Being an Entrepreneur',
        emoji: '🚀',
        lessons: [
          { id: 'en1', title: 'What is an Entrepreneur?', description: 'People who start things!', duration: '8 min', xp: 25 },
          { id: 'en2', title: 'Famous Kid Entrepreneurs', description: 'Kids who made it big!', duration: '10 min', xp: 30 },
          { id: 'en3', title: 'Finding Problems to Solve', description: 'Every business solves a problem!', duration: '10 min', xp: 30 },
          { id: 'en4', title: 'Your First Idea', description: 'What will YOU create?', duration: '12 min', xp: 35 },
        ]
      },
      {
        id: 'starting',
        name: 'Starting a Business',
        emoji: '🎬',
        lessons: [
          { id: 'sb1', title: 'Lemonade Stand 101', description: 'Your first business!', duration: '10 min', xp: 30 },
          { id: 'sb2', title: 'Products vs Services', description: 'Sell things or do things!', duration: '10 min', xp: 30 },
          { id: 'sb3', title: 'Know Your Customer', description: 'Who will buy from you?', duration: '10 min', xp: 30 },
          { id: 'sb4', title: 'Setting Prices', description: 'How much should you charge?', duration: '12 min', xp: 35 },
        ]
      },
      {
        id: 'running',
        name: 'Running a Business',
        emoji: '⚡',
        lessons: [
          { id: 'rb1', title: 'Costs & Profit', description: 'Make more than you spend!', duration: '10 min', xp: 30 },
          { id: 'rb2', title: 'Marketing', description: 'Tell people about you!', duration: '10 min', xp: 30 },
          { id: 'rb3', title: 'Customer Service', description: 'Keep people happy!', duration: '10 min', xp: 30 },
          { id: 'rb4', title: 'Growing Bigger', description: 'Scale up your business!', duration: '12 min', xp: 35 },
        ]
      },
      {
        id: 'business-ideas',
        name: 'Kid Business Ideas',
        emoji: '💡',
        lessons: [
          { id: 'bi1', title: 'Pet Sitting & Dog Walking', description: 'Help with animals!', duration: '8 min', xp: 25 },
          { id: 'bi2', title: 'Yard Work & Chores', description: 'Help neighbors!', duration: '8 min', xp: 25 },
          { id: 'bi3', title: 'Arts & Crafts', description: 'Sell what you make!', duration: '8 min', xp: 25 },
          { id: 'bi4', title: 'Online Businesses', description: 'Sell on the internet!', duration: '10 min', xp: 30 },
          { id: 'bi5', title: 'Teaching Others', description: 'Share what you know!', duration: '8 min', xp: 25 },
        ]
      },
    ]
  },
  {
    id: 'life-skills',
    name: 'Life Winners',
    emoji: '🏆',
    color: 'yellow',
    gradient: 'from-yellow-500 to-amber-600',
    description: 'Skills for a successful life!',
    topics: [
      {
        id: 'goal-setting',
        name: 'Setting Goals',
        emoji: '🎯',
        lessons: [
          { id: 'gl1', title: 'Dream Big', description: 'What do you want?', duration: '8 min', xp: 20 },
          { id: 'gl2', title: 'SMART Goals', description: 'Goals that work!', duration: '10 min', xp: 25 },
          { id: 'gl3', title: 'Breaking it Down', description: 'Small steps, big dreams!', duration: '10 min', xp: 25 },
          { id: 'gl4', title: 'Staying Motivated', description: 'Keep going!', duration: '10 min', xp: 25 },
        ]
      },
      {
        id: 'problem-solving',
        name: 'Problem Solving',
        emoji: '🧩',
        lessons: [
          { id: 'ps1', title: 'Identify the Problem', description: 'What\'s really wrong?', duration: '8 min', xp: 20 },
          { id: 'ps2', title: 'Think of Solutions', description: 'Many ways to fix it!', duration: '10 min', xp: 25 },
          { id: 'ps3', title: 'Pick the Best One', description: 'Choose wisely!', duration: '10 min', xp: 25 },
          { id: 'ps4', title: 'Learn from Mistakes', description: 'Fail forward!', duration: '10 min', xp: 25 },
        ]
      },
      {
        id: 'communication',
        name: 'Communication',
        emoji: '🗣️',
        lessons: [
          { id: 'cm1', title: 'Listening Skills', description: 'Hear what people say!', duration: '8 min', xp: 20 },
          { id: 'cm2', title: 'Speaking Clearly', description: 'Say what you mean!', duration: '8 min', xp: 20 },
          { id: 'cm3', title: 'Being Respectful', description: 'Kind words matter!', duration: '8 min', xp: 20 },
          { id: 'cm4', title: 'Presenting Ideas', description: 'Share with confidence!', duration: '10 min', xp: 25 },
        ]
      },
      {
        id: 'time-management',
        name: 'Time Management',
        emoji: '⏰',
        lessons: [
          { id: 'tm1', title: 'Telling Time', description: 'Know what time it is!', duration: '8 min', xp: 15 },
          { id: 'tm2', title: 'Planning Your Day', description: 'Be organized!', duration: '10 min', xp: 25 },
          { id: 'tm3', title: 'Prioritizing', description: 'Important stuff first!', duration: '10 min', xp: 25 },
          { id: 'tm4', title: 'Avoiding Distractions', description: 'Stay focused!', duration: '10 min', xp: 25 },
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
  const [streak, setStreak] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('futurekids-progress');
    if (saved) {
      const data = JSON.parse(saved);
      setXp(data.xp || 0);
      setLevel(data.level || 1);
      setCompletedLessons(data.completedLessons || []);
      setStreak(data.streak || 0);
    }
  }, []);

  // Save progress
  useEffect(() => {
    localStorage.setItem('futurekids-progress', JSON.stringify({
      xp, level, completedLessons, streak
    }));
  }, [xp, level, completedLessons, streak]);

  // Calculate level from XP
  const xpForLevel = (lvl: number) => lvl * 100;
  const currentLevelXp = xp - (level > 1 ? xpForLevel(level - 1) * level / 2 : 0);
  const xpNeeded = xpForLevel(level);
  const progress = Math.min((currentLevelXp / xpNeeded) * 100, 100);

  // Complete a lesson
  const completeLesson = (lesson: Lesson) => {
    if (completedLessons.includes(lesson.id)) return;
    
    const newXp = xp + lesson.xp;
    setXp(newXp);
    setCompletedLessons([...completedLessons, lesson.id]);
    
    // Level up check
    if (newXp >= xpForLevel(level)) {
      setLevel(level + 1);
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    }
  };

  // Celebration overlay
  if (showCelebration) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center">
        <div className="text-center animate-bounce">
          <span className="text-8xl block mb-4">🎉</span>
          <h1 className="text-4xl font-bold text-white mb-2">LEVEL UP!</h1>
          <p className="text-2xl text-white/80">You are now Level {level}!</p>
          <p className="text-xl text-white/60 mt-4">Keep learning, future genius!</p>
        </div>
      </div>
    );
  }

  // Lesson View
  if (selectedLesson && selectedTopic && selectedWorld) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <header className="p-4 border-b border-white/10">
          <button 
            onClick={() => setSelectedLesson(null)}
            className="text-white/60 flex items-center gap-2 hover:text-white"
          >
            ← Back to {selectedTopic.name}
          </button>
        </header>
        
        <main className="max-w-lg mx-auto px-5 py-8">
          <div className="text-center mb-8">
            <span className="text-6xl mb-4 block">{selectedTopic.emoji}</span>
            <h1 className="text-2xl font-bold text-white mb-2">{selectedLesson.title}</h1>
            <p className="text-white/60">{selectedLesson.description}</p>
          </div>

          {/* Placeholder lesson content */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
            <div className="aspect-video bg-gradient-to-br from-white/10 to-white/5 rounded-xl flex items-center justify-center mb-6">
              <span className="text-6xl">🎬</span>
            </div>
            <p className="text-white/70 text-center">
              Interactive lesson content coming soon!<br/>
              Videos, games, and quizzes!
            </p>
          </div>

          {/* Complete button */}
          {completedLessons.includes(selectedLesson.id) ? (
            <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4 text-center">
              <span className="text-2xl">✅</span>
              <p className="text-green-400 font-medium mt-2">Completed!</p>
            </div>
          ) : (
            <button
              onClick={() => completeLesson(selectedLesson)}
              className={`w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r ${selectedWorld.gradient} text-white hover:opacity-90 transition flex items-center justify-center gap-2`}
            >
              Complete Lesson
              <span className="bg-white/20 px-2 py-1 rounded text-sm">+{selectedLesson.xp} XP</span>
            </button>
          )}
        </main>
      </div>
    );
  }

  // Topic View (lessons list)
  if (selectedTopic && selectedWorld) {
    const topicProgress = selectedTopic.lessons.filter(l => completedLessons.includes(l.id)).length;
    const topicTotal = selectedTopic.lessons.length;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <header className="p-4 border-b border-white/10">
          <button 
            onClick={() => setSelectedTopic(null)}
            className="text-white/60 flex items-center gap-2 hover:text-white"
          >
            ← Back to {selectedWorld.name}
          </button>
        </header>
        
        <main className="max-w-lg mx-auto px-5 py-6">
          <div className="text-center mb-6">
            <span className="text-5xl mb-3 block">{selectedTopic.emoji}</span>
            <h1 className="text-2xl font-bold text-white">{selectedTopic.name}</h1>
            <p className="text-white/50 text-sm mt-2">{topicProgress}/{topicTotal} lessons complete</p>
            <div className="w-full bg-white/10 rounded-full h-2 mt-3">
              <div 
                className={`h-2 rounded-full bg-gradient-to-r ${selectedWorld.gradient}`}
                style={{ width: `${(topicProgress / topicTotal) * 100}%` }}
              />
            </div>
          </div>

          <div className="space-y-3">
            {selectedTopic.lessons.map((lesson, index) => {
              const isCompleted = completedLessons.includes(lesson.id);
              const isLocked = index > 0 && !completedLessons.includes(selectedTopic.lessons[index - 1].id);
              
              return (
                <button
                  key={lesson.id}
                  onClick={() => !isLocked && setSelectedLesson(lesson)}
                  disabled={isLocked}
                  className={`w-full p-4 rounded-xl text-left transition-all flex items-center gap-4 ${
                    isLocked 
                      ? 'bg-white/5 opacity-50 cursor-not-allowed' 
                      : isCompleted
                        ? 'bg-green-500/10 border border-green-500/30'
                        : 'bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                    isCompleted ? 'bg-green-500' : isLocked ? 'bg-white/10' : `bg-gradient-to-br ${selectedWorld.gradient}`
                  }`}>
                    {isLocked ? '🔒' : isCompleted ? '✓' : index + 1}
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${isCompleted ? 'text-green-400' : 'text-white'}`}>
                      {lesson.title}
                    </p>
                    <p className="text-white/50 text-sm">{lesson.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/30 text-xs">{lesson.duration}</p>
                    <p className={`text-sm font-medium ${isCompleted ? 'text-green-400' : 'text-yellow-400'}`}>
                      {isCompleted ? '✓' : `+${lesson.xp} XP`}
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

  // World View (topics list)
  if (selectedWorld) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <header className="p-4 border-b border-white/10">
          <button 
            onClick={() => setSelectedWorld(null)}
            className="text-white/60 flex items-center gap-2 hover:text-white"
          >
            ← Back to Worlds
          </button>
        </header>
        
        <main className="max-w-lg mx-auto px-5 py-6">
          <div className={`text-center mb-8 p-6 rounded-2xl bg-gradient-to-br ${selectedWorld.gradient}`}>
            <span className="text-6xl mb-3 block">{selectedWorld.emoji}</span>
            <h1 className="text-2xl font-bold text-white">{selectedWorld.name}</h1>
            <p className="text-white/70 mt-2">{selectedWorld.description}</p>
          </div>

          <div className="space-y-3">
            {selectedWorld.topics.map(topic => {
              const completed = topic.lessons.filter(l => completedLessons.includes(l.id)).length;
              const total = topic.lessons.length;
              
              return (
                <button
                  key={topic.id}
                  onClick={() => setSelectedTopic(topic)}
                  className="w-full bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 rounded-xl p-4 text-left transition-all flex items-center gap-4"
                >
                  <span className="text-3xl">{topic.emoji}</span>
                  <div className="flex-1">
                    <p className="font-medium text-white">{topic.name}</p>
                    <p className="text-white/50 text-sm">{completed}/{total} lessons</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    {completed === total ? (
                      <span className="text-green-400 text-xl">✓</span>
                    ) : (
                      <span className="text-white/60 text-sm">{Math.round((completed/total)*100)}%</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </main>
      </div>
    );
  }

  // Home View (worlds list)
  const schoolWorlds = worldsData.filter(w => ['math', 'reading', 'science', 'history'].includes(w.id));
  const futureWorlds = worldsData.filter(w => ['engineering', 'money', 'investing', 'business', 'life-skills'].includes(w.id));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="px-5 pt-8 pb-4">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/50 text-sm">Welcome back!</p>
              <h1 className="text-2xl font-bold text-white">FutureKids Academy</h1>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-orange-500/20 border border-orange-500/30 px-3 py-1 rounded-full flex items-center gap-1">
                <span>🔥</span>
                <span className="text-orange-400 font-bold">{streak}</span>
              </div>
            </div>
          </div>

          {/* XP Bar */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center font-bold text-white">
                  {level}
                </div>
                <div>
                  <p className="text-white font-medium">Level {level}</p>
                  <p className="text-white/50 text-xs">{xp} XP total</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-yellow-400 font-bold">⭐ {xp}</p>
                <p className="text-white/40 text-xs">{Math.round(progress)}% to Level {level + 1}</p>
              </div>
            </div>
            <div className="w-full bg-white/10 rounded-full h-3">
              <div 
                className="h-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-5 pb-12">
        {/* School Essentials */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 bg-gradient-to-r from-blue-500/50 to-transparent" />
            <h2 className="text-sm font-medium text-blue-400 uppercase tracking-wider">🎓 School Essentials</h2>
            <div className="h-px flex-1 bg-gradient-to-l from-blue-500/50 to-transparent" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {schoolWorlds.map(world => {
              const totalLessons = world.topics.reduce((acc, t) => acc + t.lessons.length, 0);
              const completedCount = world.topics.reduce((acc, t) => 
                acc + t.lessons.filter(l => completedLessons.includes(l.id)).length, 0);
              
              return (
                <button
                  key={world.id}
                  onClick={() => setSelectedWorld(world)}
                  className={`bg-gradient-to-br ${world.gradient} p-4 rounded-2xl text-left hover:scale-105 transition-transform`}
                >
                  <span className="text-4xl block mb-2">{world.emoji}</span>
                  <p className="font-bold text-white">{world.name}</p>
                  <p className="text-white/60 text-xs mt-1">{completedCount}/{totalLessons} lessons</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Future Skills */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 bg-gradient-to-r from-purple-500/50 to-transparent" />
            <h2 className="text-sm font-medium text-purple-400 uppercase tracking-wider">🚀 Future Skills</h2>
            <div className="h-px flex-1 bg-gradient-to-l from-purple-500/50 to-transparent" />
          </div>
          <p className="text-white/40 text-sm text-center mb-4">What school WON'T teach you!</p>
          <div className="grid grid-cols-2 gap-3">
            {futureWorlds.map(world => {
              const totalLessons = world.topics.reduce((acc, t) => acc + t.lessons.length, 0);
              const completedCount = world.topics.reduce((acc, t) => 
                acc + t.lessons.filter(l => completedLessons.includes(l.id)).length, 0);
              
              return (
                <button
                  key={world.id}
                  onClick={() => setSelectedWorld(world)}
                  className={`bg-gradient-to-br ${world.gradient} p-4 rounded-2xl text-left hover:scale-105 transition-transform`}
                >
                  <span className="text-4xl block mb-2">{world.emoji}</span>
                  <p className="font-bold text-white">{world.name}</p>
                  <p className="text-white/60 text-xs mt-1">{completedCount}/{totalLessons} lessons</p>
                </button>
              );
            })}
          </div>
        </div>
      </main>

      <footer className="text-center py-6 text-white/20 text-xs">
        Made with ❤️ for Carter, Kingston & Sister
      </footer>
    </div>
  );
}
