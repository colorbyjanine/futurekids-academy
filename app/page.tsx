'use client';

import { useState, useEffect } from 'react';

// Types
interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  xp: number;
  content?: LessonContent;
}

interface LessonContent {
  intro: string;
  sections: {
    title: string;
    text: string;
    funFact?: string;
  }[];
  quiz?: {
    question: string;
    options: string[];
    correct: number;
  };
  activity?: string;
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

// =====================================================
// CURRICULUM DATA - Full Educational Content
// =====================================================

const worldsData: World[] = [
  // ========== MATH ==========
  {
    id: 'math', name: 'Math', emoji: '✨', accent: 'accent-blue',
    description: 'Numbers, shapes & problem solving',
    topics: [
      { id: 'counting', name: 'Counting', emoji: '🔢', lessons: [
        { id: 'm1', title: 'Counting 1-10', description: 'Learn to count with objects', duration: '5 min', xp: 10,
          content: {
            intro: "Let's learn to count from 1 to 10! Counting is one of the most important skills you'll ever learn.",
            sections: [
              { title: "What is Counting?", text: "Counting means saying numbers in order while pointing to things. When you count toys, you're figuring out how many there are!", funFact: "Humans have been counting for over 50,000 years!" },
              { title: "The Numbers 1-5", text: "1 (one) - Hold up 1 finger\n2 (two) - Hold up 2 fingers\n3 (three) - Hold up 3 fingers\n4 (four) - Hold up 4 fingers\n5 (five) - Hold up all 5 fingers on one hand!" },
              { title: "The Numbers 6-10", text: "6 (six) - 5 fingers + 1 more\n7 (seven) - 5 + 2\n8 (eight) - 5 + 3\n9 (nine) - 5 + 4\n10 (ten) - All 10 fingers!" }
            ],
            quiz: { question: "How many fingers do you have on both hands?", options: ["8", "10", "12"], correct: 1 },
            activity: "Walk around your room and count 10 things. Can you find 10 books? 10 toys?"
          }
        },
        { id: 'm2', title: 'Counting 11-20', description: 'Keep going higher', duration: '5 min', xp: 10,
          content: {
            intro: "You know 1-10, now let's go higher! The 'teens' are numbers 11-19, and then comes 20!",
            sections: [
              { title: "The Teens", text: "11 (eleven) - 10 + 1\n12 (twelve) - 10 + 2\n13 (thirteen) - 10 + 3\n14 (fourteen) - 10 + 4\n15 (fifteen) - 10 + 5", funFact: "Eleven and twelve have special names because they're very old words!" },
              { title: "More Teens", text: "16 (sixteen) - 10 + 6\n17 (seventeen) - 10 + 7\n18 (eighteen) - 10 + 8\n19 (nineteen) - 10 + 9\n20 (twenty) - Two groups of 10!" }
            ],
            quiz: { question: "What comes after 15?", options: ["14", "16", "17"], correct: 1 },
            activity: "Count your steps from your bedroom to the kitchen. Is it more than 20 steps?"
          }
        },
        { id: 'm3', title: 'Counting to 100', description: 'Count super high', duration: '8 min', xp: 15 },
        { id: 'm4', title: 'Skip Counting', description: 'By 2s, 5s, and 10s', duration: '10 min', xp: 20,
          content: {
            intro: "Skip counting is like taking big jumps instead of tiny steps. It's a faster way to count!",
            sections: [
              { title: "Counting by 2s", text: "2, 4, 6, 8, 10, 12, 14, 16, 18, 20!\nThis is great for counting pairs of things like shoes or socks!", funFact: "Counting by 2s is the beginning of multiplication!" },
              { title: "Counting by 5s", text: "5, 10, 15, 20, 25, 30!\nLook at your hand - 5 fingers! Two hands = 10. This helps you count nickels (5 cents each)!" },
              { title: "Counting by 10s", text: "10, 20, 30, 40, 50, 60, 70, 80, 90, 100!\nThis is the fastest way to count. Perfect for counting dimes!" }
            ],
            quiz: { question: "When counting by 5s, what comes after 15?", options: ["16", "18", "20"], correct: 2 },
            activity: "Count all your toes by 2s. Then count all fingers and toes by 5s!"
          }
        },
      ]},
      { id: 'addition', name: 'Addition', emoji: '➕', lessons: [
        { id: 'a1', title: 'Adding Pictures', description: 'Put things together', duration: '5 min', xp: 10,
          content: {
            intro: "Adding means putting things together to find out how many you have in total!",
            sections: [
              { title: "What is Addition?", text: "If you have 2 apples and get 3 more apples, how many do you have? You ADD them together! 2 + 3 = 5 apples!", funFact: "The + sign was invented in 1489 by a German math teacher!" },
              { title: "Picture Adding", text: "🍎🍎 + 🍎🍎🍎 = 🍎🍎🍎🍎🍎\nCount them all together: 5 apples!" }
            ],
            activity: "Get some small objects (like coins or blocks) and practice putting groups together and counting them all."
          }
        },
        { id: 'a2', title: 'Adding to 10', description: 'Single digits', duration: '8 min', xp: 15 },
        { id: 'a3', title: 'Adding to 20', description: 'Getting bigger', duration: '8 min', xp: 15 },
        { id: 'a4', title: 'Double Digits', description: 'Big numbers', duration: '10 min', xp: 20 },
      ]},
      { id: 'subtraction', name: 'Subtraction', emoji: '➖', lessons: [
        { id: 's1', title: 'Taking Away', description: "What's left", duration: '5 min', xp: 10,
          content: {
            intro: "Subtraction means taking some away and seeing what's left!",
            sections: [
              { title: "What is Subtraction?", text: "If you have 5 cookies and eat 2, how many are left? 5 - 2 = 3 cookies!", funFact: "The minus sign (-) was first used in a book from 1489!" },
              { title: "Picture Subtracting", text: "🍪🍪🍪🍪🍪 take away 🍪🍪 = 🍪🍪🍪\nYou have 3 cookies left!" }
            ],
            activity: "Put 10 toys in a row. Take 3 away. How many are left? Try different numbers!"
          }
        },
        { id: 's2', title: 'Subtract to 10', description: 'Single digits', duration: '8 min', xp: 15 },
        { id: 's3', title: 'Subtract to 20', description: 'Bigger numbers', duration: '8 min', xp: 15 },
      ]},
      { id: 'multiply', name: 'Multiplication', emoji: '✖️', lessons: [
        { id: 'x1', title: 'Groups', description: 'What is multiplication', duration: '8 min', xp: 15,
          content: {
            intro: "Multiplication is a fast way to add the same number over and over!",
            sections: [
              { title: "Groups of Things", text: "If you have 3 bags with 4 apples in each bag, you could count: 4 + 4 + 4 = 12. Or just say: 3 × 4 = 12!", funFact: "The × sign was invented in 1631 by William Oughtred!" },
              { title: "Why Multiply?", text: "Counting one by one takes forever! Multiplication is a shortcut. 5 groups of 10 = 5 × 10 = 50. Much faster than counting to 50!" }
            ],
            quiz: { question: "If you have 2 boxes with 3 toys in each, how many toys total?", options: ["5", "6", "7"], correct: 1 }
          }
        },
        { id: 'x2', title: 'Tables 1-5', description: 'The basics', duration: '10 min', xp: 20 },
        { id: 'x3', title: 'Tables 6-10', description: 'Keep going', duration: '10 min', xp: 20 },
        { id: 'x4', title: 'Tables 11-12', description: 'Almost done', duration: '10 min', xp: 20 },
      ]},
      { id: 'fractions', name: 'Fractions', emoji: '🍕', lessons: [
        { id: 'f1', title: 'What is a Fraction', description: 'Parts of a whole', duration: '8 min', xp: 15,
          content: {
            intro: "A fraction shows parts of something whole - like slices of pizza!",
            sections: [
              { title: "Whole and Parts", text: "A whole pizza has ALL the slices. If you cut it into 4 equal pieces and take 1 piece, you have 1/4 (one-fourth) of the pizza!", funFact: "Ancient Egyptians used fractions over 4,000 years ago!" },
              { title: "Reading Fractions", text: "1/2 = one-half (one out of two pieces)\n1/3 = one-third (one out of three pieces)\n1/4 = one-fourth (one out of four pieces)\nThe bottom number tells you how many equal parts. The top tells you how many you have!" }
            ],
            activity: "Draw a circle (pizza!) and divide it into 4 equal slices. Color in 2 slices. You colored 2/4!"
          }
        },
        { id: 'f2', title: 'Halves & Quarters', description: 'Cut it up', duration: '8 min', xp: 15 },
        { id: 'f3', title: 'Comparing', description: 'Which is bigger', duration: '10 min', xp: 20 },
      ]},
      { id: 'shapes', name: 'Shapes', emoji: '🔷', lessons: [
        { id: 'g1', title: 'Basic Shapes', description: 'Circles, squares, triangles', duration: '5 min', xp: 10,
          content: {
            intro: "Shapes are all around us! Let's learn to recognize them.",
            sections: [
              { title: "Circle ⭕", text: "A circle is perfectly round with no corners. Wheels, cookies, and the sun are circles!", funFact: "A circle has no beginning and no end!" },
              { title: "Square ⬜", text: "A square has 4 equal sides and 4 corners (we call them angles). Windows and crackers are often squares!" },
              { title: "Triangle 🔺", text: "A triangle has 3 sides and 3 corners. Pizza slices and yield signs are triangles!" },
              { title: "Rectangle 📱", text: "A rectangle has 4 sides and 4 corners, but only opposite sides are equal. Doors and phones are rectangles!" }
            ],
            activity: "Go on a shape hunt! Find 3 circles, 3 squares, and 3 triangles in your house."
          }
        },
        { id: 'g2', title: '3D Shapes', description: 'Cubes, spheres, cones', duration: '8 min', xp: 15 },
        { id: 'g3', title: 'Perimeter & Area', description: 'Measure shapes', duration: '10 min', xp: 20 },
      ]},
    ]
  },

  // ========== READING ==========
  {
    id: 'reading', name: 'Reading', emoji: '📖', accent: 'accent-pink',
    description: 'Words, stories & writing',
    topics: [
      { id: 'alphabet', name: 'ABCs', emoji: '🔤', lessons: [
        { id: 'r1', title: 'Letters A-M', description: 'First half', duration: '8 min', xp: 15,
          content: {
            intro: "Letters are the building blocks of words! Let's learn the first 13 letters.",
            sections: [
              { title: "A B C D E", text: "A - Apple, Ant, Amazing\nB - Ball, Bear, Big\nC - Cat, Cookie, Cool\nD - Dog, Door, Dance\nE - Elephant, Egg, Every", funFact: "The letter 'E' is the most used letter in English!" },
              { title: "F G H I J", text: "F - Fish, Fun, Friend\nG - Girl, Game, Great\nH - House, Happy, Hello\nI - Ice cream, Igloo, I\nJ - Jump, Juice, Joy" },
              { title: "K L M", text: "K - Kite, King, Kind\nL - Love, Lion, Learn\nM - Mom, Moon, Magic" }
            ],
            activity: "Write each letter 3 times. Then draw a picture of something that starts with each letter!"
          }
        },
        { id: 'r2', title: 'Letters N-Z', description: 'Second half', duration: '8 min', xp: 15 },
        { id: 'r3', title: 'Upper & Lower', description: 'Big and small', duration: '8 min', xp: 15 },
        { id: 'r4', title: 'Letter Sounds', description: 'Phonics basics', duration: '10 min', xp: 20 },
      ]},
      { id: 'phonics', name: 'Phonics', emoji: '🗣️', lessons: [
        { id: 'p1', title: 'Short Vowels', description: 'A, E, I, O, U', duration: '10 min', xp: 20,
          content: {
            intro: "Vowels are special letters that every word needs! A, E, I, O, U are the vowels.",
            sections: [
              { title: "Short A", text: "Short A sounds like 'ah' in: cat, bat, hat, mat, sat. Say it: aaaaaah!", funFact: "Every syllable in English needs at least one vowel!" },
              { title: "Short E, I, O, U", text: "Short E: bed, red, pet\nShort I: sit, bit, pig\nShort O: hot, pot, dog\nShort U: cup, bug, sun" }
            ],
            quiz: { question: "Which word has a short 'a' sound?", options: ["cake", "cat", "car"], correct: 1 },
            activity: "Say these words slowly and listen for the vowel: cat, bed, pig, dog, cup. Which vowel do you hear?"
          }
        },
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
        { id: 'w1', title: 'Sentences', description: 'Complete thoughts', duration: '10 min', xp: 20,
          content: {
            intro: "A sentence is a complete thought with a subject (who or what) and a predicate (what happens).",
            sections: [
              { title: "What Makes a Sentence?", text: "Every sentence needs:\n1. A subject (WHO is doing something)\n2. A verb (WHAT they're doing)\n3. To make sense!\n\nExample: 'The dog runs.' Dog = subject, runs = verb", funFact: "The longest sentence ever written has over 13,000 words!" },
              { title: "Capital Letters & Periods", text: "Start every sentence with a CAPITAL letter.\nEnd every sentence with a period (.)\n\nwrong: the cat is fluffy\nRight: The cat is fluffy." }
            ],
            activity: "Write 5 sentences about your favorite animal. Remember capitals and periods!"
          }
        },
        { id: 'w2', title: 'Paragraphs', description: 'Group ideas', duration: '12 min', xp: 25 },
        { id: 'w3', title: 'Stories', description: 'Beginning, middle, end', duration: '15 min', xp: 30 },
      ]},
    ]
  },

  // ========== SCIENCE ==========
  {
    id: 'science', name: 'Science', emoji: '🔬', accent: 'accent-green',
    description: 'How the world works',
    topics: [
      { id: 'life', name: 'Living Things', emoji: '🌱', lessons: [
        { id: 'ls1', title: 'Plants', description: 'How they grow', duration: '8 min', xp: 15,
          content: {
            intro: "Plants are living things that grow from seeds and make their own food!",
            sections: [
              { title: "Parts of a Plant", text: "🌱 Roots - drink water from soil\n🌿 Stem - holds the plant up\n🍃 Leaves - make food from sunlight\n🌸 Flower - makes seeds for new plants", funFact: "The tallest tree ever measured was 380 feet tall - taller than the Statue of Liberty!" },
              { title: "What Plants Need", text: "1. Water 💧\n2. Sunlight ☀️\n3. Air 💨\n4. Soil with nutrients 🪴\n\nWithout these, plants can't survive!" },
              { title: "Photosynthesis", text: "Big word alert! Plants make their own food using sunlight, water, and air. This is called photosynthesis. They're like little food factories!" }
            ],
            activity: "Plant a seed in a cup with soil. Water it and put it by a window. Draw pictures of it each week to see it grow!"
          }
        },
        { id: 'ls2', title: 'Animals', description: 'Different types', duration: '8 min', xp: 15,
          content: {
            intro: "Animals are living things that move, eat, and grow - just like you!",
            sections: [
              { title: "Animal Groups", text: "🐟 Fish - live in water, have scales\n🐸 Amphibians - live in water AND land (frogs!)\n🦎 Reptiles - have scales, lay eggs (snakes, lizards)\n🐦 Birds - have feathers, most can fly\n🐕 Mammals - have fur/hair, drink mom's milk", funFact: "There are over 8 million animal species on Earth!" },
              { title: "What Animals Need", text: "All animals need:\n1. Food (plants or other animals)\n2. Water\n3. Air (oxygen)\n4. Shelter (a safe home)" }
            ],
            quiz: { question: "What type of animal is a frog?", options: ["Fish", "Amphibian", "Reptile"], correct: 1 }
          }
        },
        { id: 'ls3', title: 'Human Body', description: 'How it works', duration: '10 min', xp: 20,
          content: {
            intro: "Your body is an amazing machine with many parts working together!",
            sections: [
              { title: "The Skeleton", text: "You have 206 bones! They hold your body up and protect your organs. Your skull protects your brain, and your ribs protect your heart and lungs.", funFact: "Babies are born with about 270 bones, but some fuse together as you grow!" },
              { title: "The Heart", text: "Your heart is a muscle that pumps blood all through your body. Put your hand on your chest - feel that beating? That's your heart working! It beats about 100,000 times every day." },
              { title: "The Brain", text: "Your brain controls EVERYTHING - thinking, moving, feeling, remembering. It's like the boss of your body! It weighs about 3 pounds and uses 20% of your body's energy." }
            ],
            activity: "Feel your pulse on your wrist. Count the beats for 15 seconds and multiply by 4. That's your heart rate!"
          }
        },
        { id: 'ls4', title: 'Food Chains', description: 'Who eats what', duration: '10 min', xp: 20 },
      ]},
      { id: 'earth', name: 'Earth', emoji: '🌍', lessons: [
        { id: 'es1', title: 'Weather', description: 'Sun, rain, snow', duration: '8 min', xp: 15 },
        { id: 'es2', title: 'Seasons', description: 'Four seasons', duration: '8 min', xp: 15 },
        { id: 'es3', title: 'Rocks', description: 'What Earth is made of', duration: '10 min', xp: 20 },
        { id: 'es4', title: 'Water Cycle', description: 'Where rain comes from', duration: '10 min', xp: 20,
          content: {
            intro: "Water goes round and round in a never-ending cycle!",
            sections: [
              { title: "Evaporation", text: "☀️ The sun heats water in oceans, lakes, and puddles. The water turns into invisible water vapor and rises up into the sky!", funFact: "The same water dinosaurs drank is still cycling around today!" },
              { title: "Condensation", text: "☁️ High up in the sky, water vapor cools down and turns back into tiny water droplets. Billions of these droplets form clouds!" },
              { title: "Precipitation", text: "🌧️ When clouds get too heavy with water droplets, the water falls back down as rain, snow, sleet, or hail. This is called precipitation!" },
              { title: "Collection", text: "💧 The water collects in oceans, lakes, rivers, and underground. Then the sun heats it again and... the cycle repeats forever!" }
            ],
            activity: "Put a bowl of water in the sun with plastic wrap on top. Watch water droplets form on the plastic - that's the water cycle in action!"
          }
        },
      ]},
      { id: 'space', name: 'Space', emoji: '🚀', lessons: [
        { id: 'sp1', title: 'Solar System', description: 'Planets and Sun', duration: '10 min', xp: 20,
          content: {
            intro: "Our solar system is our neighborhood in space!",
            sections: [
              { title: "The Sun", text: "☀️ The Sun is a giant ball of hot gas at the center of our solar system. It's so big that 1.3 million Earths could fit inside it!", funFact: "Light from the Sun takes 8 minutes to reach Earth!" },
              { title: "The Planets", text: "Memory trick: 'My Very Eager Mother Just Served Us Nachos'\n\n🪨 Mercury - Closest, super hot\n🧡 Venus - Hottest planet\n🌍 Earth - Our home!\n🔴 Mars - The red planet\n🟠 Jupiter - Biggest planet\n💫 Saturn - Has beautiful rings\n💙 Uranus - Tilted sideways\n💠 Neptune - Cold and windy" }
            ],
            quiz: { question: "Which planet is closest to the Sun?", options: ["Earth", "Mercury", "Mars"], correct: 1 }
          }
        },
        { id: 'sp2', title: 'Earth & Moon', description: 'Our neighbors', duration: '8 min', xp: 15 },
        { id: 'sp3', title: 'Stars', description: 'Billions of them', duration: '10 min', xp: 20 },
      ]},
    ]
  },

  // ========== HISTORY ==========
  {
    id: 'history', name: 'History', emoji: '🏛️', accent: 'accent-amber',
    description: 'Stories from the past',
    topics: [
      { id: 'usa', name: 'America', emoji: '🇺🇸', lessons: [
        { id: 'us1', title: 'Native Americans', description: 'First people', duration: '10 min', xp: 20,
          content: {
            intro: "Long before the United States existed, many different groups of people lived here for thousands of years!",
            sections: [
              { title: "The First Americans", text: "Native Americans (also called Indigenous peoples or American Indians) lived on this land for at least 15,000 years before Europeans arrived. They had hundreds of different nations, languages, and cultures!", funFact: "There were over 500 different Native American nations, each with their own traditions!" },
              { title: "How They Lived", text: "Different tribes lived in different ways:\n🏕️ Plains tribes followed buffalo herds and lived in tipis\n🏠 Pueblo people built adobe houses in the Southwest\n🏘️ Iroquois built longhouses in the Northeast\n🛶 Pacific Northwest tribes fished and carved totem poles" }
            ],
            activity: "Research one Native American nation. What did they eat? What kind of homes did they build? Draw a picture!"
          }
        },
        { id: 'us2', title: 'Explorers', description: 'New arrivals', duration: '10 min', xp: 20 },
        { id: 'us3', title: 'Revolution', description: 'America is born', duration: '12 min', xp: 25,
          content: {
            intro: "In 1776, the American colonies decided to break free from British rule and become their own country!",
            sections: [
              { title: "Why Revolution?", text: "The 13 colonies belonged to Britain. The King made them pay lots of taxes but didn't let them vote on the laws. Colonists said 'No taxation without representation!' and decided to fight for freedom.", funFact: "The Declaration of Independence was signed by 56 brave men who risked their lives!" },
              { title: "The War", text: "General George Washington led the American army against the British. The war lasted 8 years (1775-1783). France helped America win!" },
              { title: "A New Country", text: "America won! They created the Constitution - the rules for how the country works. George Washington became the first President. The United States was born!" }
            ],
            quiz: { question: "Who was the first President of the United States?", options: ["Abraham Lincoln", "George Washington", "Thomas Jefferson"], correct: 1 }
          }
        },
        { id: 'us4', title: 'Modern Times', description: 'Recent history', duration: '10 min', xp: 20 },
      ]},
      { id: 'world', name: 'World', emoji: '🌏', lessons: [
        { id: 'wh1', title: 'Ancient Egypt', description: 'Pyramids', duration: '10 min', xp: 20,
          content: {
            intro: "Over 5,000 years ago, one of the world's greatest civilizations rose along the Nile River!",
            sections: [
              { title: "The Land of the Nile", text: "Egypt is mostly desert, but the Nile River flooded every year, making the soil perfect for farming. Egyptians called their land 'Kemet' meaning 'black land' because of the rich dark soil!", funFact: "The Great Pyramid was the tallest building in the world for over 3,800 years!" },
              { title: "Pyramids & Pharaohs", text: "Pharaohs were the kings of Egypt. They built giant pyramids as tombs. The Great Pyramid of Giza took 20 years to build and has over 2 million stone blocks!" },
              { title: "Cool Inventions", text: "Egyptians invented:\n📜 Paper (papyrus)\n✍️ Hieroglyphics (picture writing)\n📅 365-day calendar\n🕐 First clocks (sundials & water clocks)" }
            ],
            activity: "Write your name using hieroglyphics! Look up an Egyptian alphabet chart online."
          }
        },
        { id: 'wh2', title: 'Ancient Greece', description: 'Olympics', duration: '10 min', xp: 20 },
        { id: 'wh3', title: 'Ancient Rome', description: 'Gladiators', duration: '10 min', xp: 20 },
        { id: 'wh4', title: 'Medieval', description: 'Knights & castles', duration: '10 min', xp: 20 },
      ]},
    ]
  },

  // ========== LAW (NEW!) ==========
  {
    id: 'law', name: 'Law', emoji: '⚖️', accent: 'accent-indigo',
    description: 'Rules that keep us safe & fair',
    topics: [
      { id: 'basics', name: 'Law Basics', emoji: '📜', lessons: [
        { id: 'lw1', title: 'What Are Laws?', description: 'Rules for everyone', duration: '8 min', xp: 20,
          content: {
            intro: "Laws are rules that everyone in a country must follow. They help keep people safe and make sure everyone is treated fairly!",
            sections: [
              { title: "Why Do We Need Laws?", text: "Imagine if there were no rules:\n❌ No traffic lights - cars would crash!\n❌ No rules against stealing - anyone could take your stuff!\n❌ No rules for safety - buildings might fall down!\n\nLaws protect people and make life fair.", funFact: "The oldest known written laws are from ancient Mesopotamia, over 4,000 years ago!" },
              { title: "Rules vs Laws", text: "🏠 Rules at home: Your parents make these (bedtime, chores)\n🏫 School rules: Your school makes these (no running in halls)\n⚖️ Laws: The government makes these, and police help enforce them" },
              { title: "What Happens If You Break a Law?", text: "Consequences depend on how serious it is:\n📋 Small violations: Pay a fine (like a parking ticket)\n⚠️ Bigger violations: Go to court, pay larger fine\n🔒 Serious crimes: Could go to jail\n\nThe punishment should fit the crime!" }
            ],
            quiz: { question: "Why do we have laws?", options: ["To make life boring", "To keep people safe and be fair", "Just because"], correct: 1 },
            activity: "Make a list of 5 rules in your home. Why does each rule exist? How does it help your family?"
          }
        },
        { id: 'lw2', title: 'Who Makes Laws?', description: 'The government', duration: '10 min', xp: 25,
          content: {
            intro: "In America, regular people choose leaders who make laws. This is called a democracy!",
            sections: [
              { title: "Three Branches of Government", text: "The founders were smart - they split power into THREE branches so no one person has too much control:\n\n🏛️ Legislative (Congress) - MAKES the laws\n🏠 Executive (President) - ENFORCES the laws\n⚖️ Judicial (Courts) - INTERPRETS the laws", funFact: "This is called 'separation of powers' - like checks and balances in a game!" },
              { title: "How a Bill Becomes a Law", text: "1️⃣ Someone has an idea for a law\n2️⃣ They write it down as a 'bill'\n3️⃣ Congress debates and votes on it\n4️⃣ If enough people vote yes, it goes to the President\n5️⃣ The President signs it - now it's a law!" },
              { title: "We the People", text: "In a democracy, the government works for THE PEOPLE. Citizens can:\n✅ Vote for leaders\n✅ Write to their representatives\n✅ Protest peacefully\n✅ Run for office themselves!" }
            ],
            activity: "If you could make one new law, what would it be? Write it down and explain why it would help people."
          }
        },
        { id: 'lw3', title: 'The Constitution', description: "America's rulebook", duration: '12 min', xp: 30,
          content: {
            intro: "The Constitution is the most important document in America - it's like the instruction manual for our whole country!",
            sections: [
              { title: "What Is the Constitution?", text: "Written in 1787, the Constitution explains:\n📋 How the government works\n⚖️ What powers each branch has\n🛡️ What rights every person has\n\nIt starts with 'We the People' - because the government belongs to us!", funFact: "The Constitution is kept in a special case filled with protective gas and can be lowered into a vault!" },
              { title: "The Bill of Rights", text: "The first 10 amendments (changes) are called the Bill of Rights. They protect YOUR freedoms:\n\n1️⃣ Freedom of speech, religion, press\n2️⃣ Right to own guns\n4️⃣ Protection from unfair searches\n5️⃣ Right to stay silent, not be tried twice\n6️⃣ Right to a lawyer and fast trial" },
              { title: "Amendments", text: "The Constitution can be changed (amended) if enough people agree. There have been 27 amendments:\n\n🔓 13th: Ended slavery\n✅ 15th: All races can vote\n🗳️ 19th: Women can vote\n🗓️ 26th: 18-year-olds can vote" }
            ],
            quiz: { question: "What do we call the first 10 amendments?", options: ["The Preamble", "The Bill of Rights", "The Constitution"], correct: 1 }
          }
        },
      ]},
      { id: 'rights', name: 'Your Rights', emoji: '✊', lessons: [
        { id: 'rt1', title: 'Freedom of Speech', description: 'Say what you think', duration: '8 min', xp: 20,
          content: {
            intro: "In America, you have the right to share your opinions! But with great power comes responsibility.",
            sections: [
              { title: "What Is Free Speech?", text: "The First Amendment says the government CAN'T stop you from:\n🗣️ Sharing your opinions\n📰 Writing articles or books\n📺 Making videos\n✊ Protesting peacefully\n🙏 Practicing your religion", funFact: "The USA is one of the few countries with such strong free speech protection!" },
              { title: "What Free Speech Is NOT", text: "Free speech doesn't mean you can say ANYTHING:\n❌ You can't threaten to hurt people\n❌ You can't yell 'FIRE!' in a crowded place if there's no fire\n❌ You can't spread lies that hurt someone's reputation\n\nFree speech means the GOVERNMENT can't punish you for opinions - but there are still consequences for harmful speech." },
              { title: "Why It Matters", text: "Without free speech:\n• People couldn't criticize bad leaders\n• Scientists couldn't share new ideas\n• Artists couldn't create freely\n• You couldn't speak up about unfair things\n\nFree speech helps make society better!" }
            ],
            activity: "Practice your free speech! Write a short paragraph about something you think should be different in the world."
          }
        },
        { id: 'rt2', title: 'Equal Protection', description: "Everyone's the same under law", duration: '10 min', xp: 25,
          content: {
            intro: "The law should treat everyone the same, no matter who they are. This is called equal protection.",
            sections: [
              { title: "What Is Equality?", text: "The 14th Amendment says states must give everyone 'equal protection of the laws.' This means:\n\n✅ Same rules for everyone\n✅ Same punishments for same crimes\n✅ Same rights regardless of race, religion, or gender", funFact: "The 14th Amendment was passed in 1868, right after the Civil War, to protect freed slaves." },
              { title: "History of Equality", text: "America didn't always treat everyone equally:\n\n😢 Slavery was legal until 1865\n😢 Women couldn't vote until 1920\n😢 Segregation was legal until 1954\n\nPeople had to fight hard to change these unfair laws!" },
              { title: "Still Fighting for Equality", text: "Even today, people work to make sure everyone is treated fairly:\n👨‍⚖️ Lawyers sue when laws discriminate\n✊ Activists protest unfair treatment\n📣 People vote for better leaders\n\nYou can help make the world more equal too!" }
            ]
          }
        },
        { id: 'rt3', title: 'Fair Trials', description: 'Innocent until proven guilty', duration: '10 min', xp: 25,
          content: {
            intro: "In America, if someone is accused of a crime, they get a fair chance to prove their innocence.",
            sections: [
              { title: "Innocent Until Proven Guilty", text: "This is HUGE! The government must PROVE you did something wrong - you don't have to prove you didn't!\n\nThis protects people from being punished for things they didn't do.", funFact: "This idea comes from ancient Rome! They said 'Ei incumbit probatio qui dicit, non qui negat.'" },
              { title: "Your Trial Rights", text: "The Constitution guarantees:\n\n👨‍⚖️ Right to a lawyer (even if you can't afford one)\n👥 Right to a jury of regular people\n🚀 Right to a speedy trial (no waiting in jail forever)\n🔍 Right to see the evidence against you\n🗣️ Right to question witnesses" },
              { title: "Beyond Reasonable Doubt", text: "To convict someone, the jury must be VERY sure - 'beyond reasonable doubt.'\n\nThis is a HIGH standard! If there's reasonable doubt, the person must go free.\n\nIt's better to let a guilty person go free than to punish an innocent person." }
            ],
            quiz: { question: "In American law, accused people are...", options: ["Guilty until proven innocent", "Innocent until proven guilty", "Always guilty"], correct: 1 }
          }
        },
        { id: 'rt4', title: 'Right to Privacy', description: 'Your business is yours', duration: '8 min', xp: 20 },
      ]},
      { id: 'courts', name: 'Courts & Trials', emoji: '🏛️', lessons: [
        { id: 'ct1', title: 'What Is a Court?', description: 'Where laws are enforced', duration: '8 min', xp: 20,
          content: {
            intro: "Courts are places where judges and juries decide if someone broke the law, and what should happen.",
            sections: [
              { title: "Parts of a Court", text: "👨‍⚖️ Judge - The boss of the court, makes sure everything is fair\n👥 Jury - Regular people who decide if someone is guilty\n⚖️ Lawyers - One side argues guilty, one argues innocent\n🧑 Defendant - The person accused of breaking a law\n📝 Court Reporter - Types everything that's said", funFact: "The word 'verdict' comes from Latin and means 'to speak the truth.'" },
              { title: "Types of Courts", text: "🏪 Small Claims Court - For small money disagreements\n👨‍👩‍👧 Family Court - Divorce, custody of children\n⚖️ Criminal Court - When someone breaks a law\n💼 Civil Court - When people sue each other\n🏛️ Supreme Court - The highest court in the land!" }
            ],
            activity: "Draw a picture of a courtroom. Label the judge, jury, lawyers, and defendant!"
          }
        },
        { id: 'ct2', title: 'How Trials Work', description: 'Step by step', duration: '12 min', xp: 30,
          content: {
            intro: "A trial is like a formal argument where both sides present their case, and the jury decides who's right.",
            sections: [
              { title: "Before Trial", text: "1️⃣ Someone is arrested and charged\n2️⃣ They appear in court for arraignment (told the charges)\n3️⃣ They plead guilty or not guilty\n4️⃣ If not guilty, a trial is scheduled\n5️⃣ Both sides prepare their arguments", funFact: "About 90% of cases never go to trial - most end in plea bargains!" },
              { title: "During Trial", text: "1️⃣ Opening statements - Each side tells their story\n2️⃣ Prosecution presents evidence and witnesses\n3️⃣ Defense cross-examines (asks questions)\n4️⃣ Defense presents their evidence\n5️⃣ Prosecution cross-examines\n6️⃣ Closing arguments - Each side summarizes" },
              { title: "The Verdict", text: "The jury goes to a private room to 'deliberate' (talk it over). They must ALL agree on guilty or not guilty.\n\nIf guilty: Judge decides the punishment\nIf not guilty: Defendant goes free!\nIf they can't agree: 'Hung jury' - trial starts over" }
            ]
          }
        },
        { id: 'ct3', title: 'Supreme Court', description: 'The highest court', duration: '10 min', xp: 25,
          content: {
            intro: "The Supreme Court is the most powerful court in America. What they say goes!",
            sections: [
              { title: "What Is the Supreme Court?", text: "The Supreme Court has 9 justices (judges) who serve FOR LIFE. They decide:\n\n🤔 What the Constitution means\n⚖️ If laws are constitutional (allowed)\n🔍 The final answer on legal questions\n\nThere is NO appeal after the Supreme Court decides!", funFact: "The youngest Supreme Court Justice ever was Joseph Story, appointed at age 32!" },
              { title: "Famous Cases", text: "The Supreme Court has made history:\n\n📚 Brown v. Board of Education (1954) - Ended school segregation\n⚠️ Miranda v. Arizona (1966) - Police must read you your rights\n🗳️ Bush v. Gore (2000) - Decided a presidential election" },
              { title: "How Cases Get There", text: "Not every case goes to the Supreme Court:\n\n1️⃣ Start at local/state court\n2️⃣ If you lose, appeal to higher court\n3️⃣ Keep appealing up the ladder\n4️⃣ Supreme Court picks only about 100 cases per year from thousands of requests" }
            ]
          }
        },
        { id: 'ct4', title: 'Judges & Juries', description: 'Who decides', duration: '8 min', xp: 20 },
      ]},
      { id: 'types', name: 'Types of Law', emoji: '📚', lessons: [
        { id: 'ty1', title: 'Criminal Law', description: 'Breaking the rules', duration: '10 min', xp: 25,
          content: {
            intro: "Criminal law is about actions that hurt society - things so bad that the government says they're crimes.",
            sections: [
              { title: "What Is a Crime?", text: "A crime is breaking a law that protects society:\n\n🚨 Felonies (serious): Murder, robbery, kidnapping\n⚠️ Misdemeanors (less serious): Shoplifting small items, minor fights\n📋 Infractions (minor): Speeding, jaywalking", funFact: "In medieval England, stealing a loaf of bread could get you hanged! Today we have more proportional punishments." },
              { title: "The Prosecution", text: "In criminal cases, it's the GOVERNMENT vs. the person accused:\n\n👨‍⚖️ Prosecutor - Government's lawyer, tries to prove guilt\n👮 Police - Gather evidence\n⚖️ The government must prove guilt 'beyond reasonable doubt'" },
              { title: "Punishments", text: "If found guilty, punishments can include:\n\n💵 Fines - Pay money\n🧹 Community service - Help the community\n📋 Probation - Follow rules, stay out of trouble\n🔒 Jail/Prison - Lose your freedom\n\nThe punishment should fit the crime!" }
            ]
          }
        },
        { id: 'ty2', title: 'Civil Law', description: 'Settling disagreements', duration: '10 min', xp: 25,
          content: {
            intro: "Civil law is about disagreements between people, not crimes. Nobody goes to jail!",
            sections: [
              { title: "What Is Civil Law?", text: "Civil cases are when one person sues another:\n\n🤕 Personal injury - You got hurt because of someone\n📝 Contracts - Someone broke a deal\n💔 Divorce - Splitting up marriage and property\n💰 Property - Disagreements about who owns what", funFact: "The famous McDonald's hot coffee case resulted in a $2.86 million verdict!" },
              { title: "How It's Different", text: "Criminal vs Civil:\n\n⚖️ Criminal: Government vs. person\n⚖️ Civil: Person vs. person\n\n📏 Criminal: Must prove 'beyond reasonable doubt'\n📏 Civil: Must prove 'more likely than not'\n\n🔒 Criminal: Can go to jail\n💰 Civil: Usually just money" },
              { title: "Winning a Civil Case", text: "If you win, the other person might have to:\n\n💵 Pay you money (damages)\n🛑 Stop doing something\n✅ Do something they promised" }
            ]
          }
        },
        { id: 'ty3', title: 'Family Law', description: 'Marriage & kids', duration: '8 min', xp: 20 },
        { id: 'ty4', title: 'Contract Law', description: 'Keeping promises', duration: '10 min', xp: 25,
          content: {
            intro: "A contract is a promise that the law will enforce. If you break it, you can get in trouble!",
            sections: [
              { title: "What Is a Contract?", text: "A contract is an agreement where:\n\n✅ Both sides agree to something\n✅ Both sides give or do something\n✅ Both sides can legally agree (adults, mentally capable)\n✅ The agreement is for something legal", funFact: "Kids usually can't make legally binding contracts - that's why parents sign things for you!" },
              { title: "Examples of Contracts", text: "📱 Cell phone plan - You pay, they provide service\n🏠 Lease - You pay rent, landlord provides housing\n💼 Employment - You work, employer pays you\n🛒 Buying things - You pay, seller gives you the item\n\nEven clicking 'I Agree' online is a contract!" },
              { title: "Breaking a Contract", text: "If someone breaks a contract:\n\n📝 The other person can sue\n💰 They might have to pay damages\n⚖️ A judge decides what's fair\n\nThis is why you should READ before you sign!" }
            ]
          }
        },
      ]},
      { id: 'careers', name: 'Legal Careers', emoji: '💼', lessons: [
        { id: 'cr1', title: 'Being a Lawyer', description: 'Fighting for justice', duration: '10 min', xp: 25,
          content: {
            intro: "Lawyers are professionals who know the law and help people navigate the legal system!",
            sections: [
              { title: "What Lawyers Do", text: "Lawyers have many jobs:\n\n📝 Give legal advice\n⚖️ Represent people in court\n📄 Write contracts and legal documents\n🔍 Research laws and past cases\n🤝 Negotiate deals and settlements", funFact: "There are over 1.3 million lawyers in the United States!" },
              { title: "Types of Lawyers", text: "👔 Criminal Defense - Defends people accused of crimes\n👨‍⚖️ Prosecutor - Represents the government against criminals\n💼 Corporate - Helps businesses\n👨‍👩‍👧 Family - Divorce and custody\n🏥 Personal Injury - Helps injured people get money\n🌍 Immigration - Helps people become citizens" },
              { title: "How to Become a Lawyer", text: "1️⃣ Graduate high school\n2️⃣ Get a bachelor's degree (4 years of college)\n3️⃣ Go to law school (3 more years)\n4️⃣ Pass the bar exam (a VERY hard test)\n5️⃣ Get licensed in your state\n\nThat's 7+ years of school after high school!" }
            ],
            quiz: { question: "How many years of school after high school to become a lawyer?", options: ["4 years", "7+ years", "2 years"], correct: 1 }
          }
        },
        { id: 'cr2', title: 'Being a Judge', description: 'Keeping courts fair', duration: '8 min', xp: 20,
          content: {
            intro: "Judges are the leaders of the courtroom. They make sure everyone follows the rules and that trials are fair.",
            sections: [
              { title: "What Judges Do", text: "👨‍⚖️ Run the courtroom (everyone must follow their rules!)\n⚖️ Decide what evidence can be shown\n📋 Explain the law to the jury\n🔨 Decide punishments after guilty verdicts\n📝 Make decisions in cases without juries", funFact: "The judge's wooden hammer is called a 'gavel' - not all judges actually use them!" },
              { title: "How to Become a Judge", text: "1️⃣ First, become a lawyer\n2️⃣ Practice law for many years\n3️⃣ Build a great reputation\n4️⃣ Get appointed or elected\n\nFederal judges are appointed by the President!\nState judges are often elected by the people." },
              { title: "Judicial Ethics", text: "Judges must be:\n\n⚖️ Fair - No picking favorites\n🤐 Impartial - No personal opinions in rulings\n📚 Knowledgeable - Know the law inside and out\n👀 Respectable - Be a role model" }
            ]
          }
        },
        { id: 'cr3', title: 'Police & Detectives', description: 'Protecting people', duration: '8 min', xp: 20 },
        { id: 'cr4', title: 'Paralegals', description: 'Helping lawyers', duration: '8 min', xp: 20 },
        { id: 'cr5', title: 'Courtroom Jobs', description: 'Many ways to help', duration: '8 min', xp: 20 },
      ]},
      { id: 'famous', name: 'Famous Cases', emoji: '📖', lessons: [
        { id: 'fc1', title: 'Brown v Board of Education', description: 'Ending segregation', duration: '10 min', xp: 30,
          content: {
            intro: "In 1954, the Supreme Court made a decision that changed America forever - schools could no longer be separated by race!",
            sections: [
              { title: "The Problem", text: "Before 1954, many states had 'separate but equal' laws:\n\n🏫 White kids went to one school\n🏫 Black kids went to another school\n\nBut they were NOT equal! Black schools often had:\n❌ Old, broken books\n❌ Crowded classrooms\n❌ Crumbling buildings", funFact: "Linda Brown, the girl in the case, was only 9 years old when the lawsuit started!" },
              { title: "The Case", text: "Oliver Brown wanted his daughter Linda to go to the good school near their house - but it was 'whites only.'\n\nLawyer Thurgood Marshall argued that separate schools were harmful to Black children.\n\nThe Supreme Court agreed!" },
              { title: "The Decision", text: "Chief Justice Earl Warren announced the unanimous (9-0) decision:\n\n'Separate educational facilities are inherently unequal.'\n\nThis meant segregation in schools was UNCONSTITUTIONAL! All schools had to integrate (mix Black and white students together)." }
            ],
            activity: "Research Ruby Bridges - she was one of the first Black children to integrate a white school in the South. Draw a picture honoring her bravery!"
          }
        },
        { id: 'fc2', title: 'Miranda v Arizona', description: 'You have the right...', duration: '10 min', xp: 30,
          content: {
            intro: "'You have the right to remain silent...' - These famous words exist because of one case!",
            sections: [
              { title: "What Happened", text: "In 1963, Ernesto Miranda was arrested in Arizona. Police questioned him for 2 hours without telling him:\n\n🤐 He didn't have to answer questions\n👨‍⚖️ He could have a lawyer present\n\nHe confessed - but was it fair?", funFact: "Now police carry 'Miranda cards' to read the rights correctly every time!" },
              { title: "The Supreme Court Decision", text: "In 1966, the Supreme Court ruled that police MUST tell arrested people:\n\n1️⃣ You have the right to remain silent\n2️⃣ Anything you say can be used against you in court\n3️⃣ You have the right to an attorney\n4️⃣ If you cannot afford an attorney, one will be appointed\n\nIf police don't read these rights, confessions can't be used in court!" },
              { title: "Why It Matters", text: "Miranda rights protect everyone:\n\n✅ You can't be tricked into confessing\n✅ You always have the right to a lawyer\n✅ Police must be fair\n\nThis protects innocent people from wrongful convictions!" }
            ]
          }
        },
        { id: 'fc3', title: "Gideon v Wainwright", description: 'Right to a lawyer', duration: '10 min', xp: 30 },
        { id: 'fc4', title: 'Kid-Friendly Cases', description: 'Cases about young people', duration: '10 min', xp: 30 },
      ]},
    ]
  },

  // ========== ENGINEERING (EXPANDED!) ==========
  {
    id: 'engineering', name: 'Engineering', emoji: '⚙️', accent: 'accent-teal',
    description: 'Build, create & solve problems',
    topics: [
      { id: 'what', name: 'What is Engineering?', emoji: '🔧', lessons: [
        { id: 'eng1', title: 'Engineers Solve Problems', description: 'Making life better', duration: '8 min', xp: 20,
          content: {
            intro: "Engineers are creative problem-solvers who design things that make our lives easier, safer, and more fun!",
            sections: [
              { title: "What Engineers Do", text: "Engineers use math, science, and creativity to:\n\n🏗️ Design buildings and bridges\n🚗 Create cars, planes, and rockets\n💊 Invent medical devices\n📱 Build phones and computers\n🌍 Solve environmental problems", funFact: "Engineers designed everything around you - your house, your phone, even the toilet!" },
              { title: "The Engineering Process", text: "1️⃣ Find a problem\n2️⃣ Imagine solutions\n3️⃣ Plan your design\n4️⃣ Build a prototype (test version)\n5️⃣ Test it and improve\n6️⃣ Share your solution!" },
              { title: "Why Engineering Matters", text: "Without engineers, we wouldn't have:\n❌ Safe bridges to cross rivers\n❌ Clean water to drink\n❌ Electricity in our homes\n❌ Medicine to make us healthy\n❌ The internet to learn and connect\n\nEngineers make the impossible possible!" }
            ],
            quiz: { question: "What do engineers do?", options: ["Drive trains", "Solve problems", "Fix cars only"], correct: 1 },
            activity: "Look around your room. Pick 3 things and think: 'What problem does this solve? What engineer designed it?'"
          }
        },
        { id: 'eng2', title: 'Types of Engineers', description: 'So many specialties!', duration: '10 min', xp: 25,
          content: {
            intro: "There are many different kinds of engineers - each focusing on different types of problems!",
            sections: [
              { title: "Building & Physical World", text: "🏗️ Civil Engineers - Roads, bridges, buildings\n⚡ Electrical Engineers - Power and electronics\n🔧 Mechanical Engineers - Machines and vehicles\n🏭 Chemical Engineers - Materials and reactions\n🌍 Environmental Engineers - Protect nature", funFact: "There are over 40 different types of engineering!" },
              { title: "Technology & Computers", text: "💻 Computer Engineers - Computer hardware\n👨‍💻 Software Engineers - Apps and programs\n🤖 Robotics Engineers - Build robots\n🎮 Game Engineers - Video games\n🛡️ Cybersecurity Engineers - Protect data" },
              { title: "Cutting Edge", text: "🚀 Aerospace Engineers - Planes and spacecraft\n🧬 Biomedical Engineers - Medical devices\n🧠 AI Engineers - Artificial intelligence\n🔬 Nanotechnology - Tiny, tiny things\n♻️ Sustainability - Clean energy" }
            ]
          }
        },
      ]},
      { id: 'civil', name: 'Civil Engineering', emoji: '🏗️', lessons: [
        { id: 'cv1', title: 'Buildings', description: 'Where we live and work', duration: '10 min', xp: 25,
          content: {
            intro: "Civil engineers design the buildings where we live, work, learn, and play!",
            sections: [
              { title: "Types of Buildings", text: "🏠 Houses - Where families live\n🏢 Office buildings - Where people work\n🏫 Schools - Where you learn\n🏥 Hospitals - Where people get healthy\n🏛️ Government buildings - Where leaders work", funFact: "The tallest building in the world is the Burj Khalifa in Dubai at 2,717 feet!" },
              { title: "What Makes Buildings Stand?", text: "Buildings need:\n\n🏗️ Foundation - Strong base underground\n🦴 Frame - The skeleton that holds it up\n🧱 Walls - Protection from weather\n🏠 Roof - Keeps rain out\n\nEngineers calculate exactly how strong each part needs to be!" },
              { title: "Safety First", text: "Civil engineers make buildings safe:\n\n🌪️ Withstand storms and earthquakes\n🔥 Resist fire\n💪 Support heavy loads\n🚪 Have emergency exits\n\nBuilding codes are rules that all buildings must follow!" }
            ],
            activity: "Build the tallest tower you can using only paper and tape. How can you make it stronger?"
          }
        },
        { id: 'cv2', title: 'Bridges', description: 'Crossing rivers and valleys', duration: '10 min', xp: 25,
          content: {
            intro: "Bridges let us cross rivers, valleys, and even oceans without getting wet!",
            sections: [
              { title: "Types of Bridges", text: "🌉 Beam Bridge - Simple and straight (like a log across a stream)\n🌁 Suspension Bridge - Hangs from cables (Golden Gate Bridge!)\n🏛️ Arch Bridge - Curved underneath for strength\n🔗 Truss Bridge - Uses triangles for support", funFact: "The longest bridge in the world is in China - it's 102 miles long!" },
              { title: "Forces on Bridges", text: "Engineers must balance forces:\n\n⬇️ Compression - Pushing/squeezing force\n➡️⬅️ Tension - Pulling/stretching force\n🚗 Load - Weight of vehicles and people\n🌬️ Wind - Can shake the bridge\n\nGood bridge design handles all these forces!" },
              { title: "Famous Bridge Failures", text: "Engineers learn from failures:\n\n🌉 Tacoma Narrows Bridge (1940) - Wind made it wobble until it collapsed\n💡 Lesson: Account for wind vibrations!\n\nNow bridges are tested in wind tunnels before being built." }
            ],
            activity: "Build a bridge using popsicle sticks and glue. Test how much weight it can hold before breaking!"
          }
        },
        { id: 'cv3', title: 'Roads & Highways', description: 'Getting places', duration: '8 min', xp: 20 },
        { id: 'cv4', title: 'Water Systems', description: 'Clean water for everyone', duration: '10 min', xp: 25 },
      ]},
      { id: 'mechanical', name: 'Mechanical Engineering', emoji: '⚙️', lessons: [
        { id: 'me1', title: 'Simple Machines', description: 'Make work easier', duration: '10 min', xp: 25,
          content: {
            intro: "Machines help us do work with less effort. There are 6 simple machines that all other machines are made from!",
            sections: [
              { title: "The 6 Simple Machines", text: "1️⃣ Lever - Seesaw, crowbar, scissors\n2️⃣ Wheel & Axle - Cars, doorknobs, ferris wheels\n3️⃣ Pulley - Flagpoles, blinds, cranes\n4️⃣ Inclined Plane - Ramps, slides\n5️⃣ Wedge - Knives, axes, doorstops\n6️⃣ Screw - Screws, jar lids, drills", funFact: "Ancient Egyptians used simple machines to build the pyramids!" },
              { title: "How Levers Work", text: "A lever has:\n🔵 Fulcrum - The pivot point\n💪 Effort - Where you push\n📦 Load - What you're moving\n\nMove the fulcrum closer to the load to lift heavier things with less effort!" },
              { title: "Compound Machines", text: "When you combine simple machines, you get compound machines:\n\n✂️ Scissors = Two levers + two wedges\n🚲 Bicycle = Wheels + levers + screws\n⏰ Clock = Many gears and levers\n\nAll complex machines are just simple machines combined!" }
            ],
            activity: "Find all 6 simple machines in your house. Hint: Look in the kitchen, bathroom, and garage!"
          }
        },
        { id: 'me2', title: 'How Engines Work', description: 'Power and motion', duration: '12 min', xp: 30 },
        { id: 'me3', title: 'Gears & Pulleys', description: 'Transfer power', duration: '10 min', xp: 25 },
        { id: 'me4', title: 'Cars & Vehicles', description: 'Getting around', duration: '10 min', xp: 25 },
      ]},
      { id: 'electrical', name: 'Electrical Engineering', emoji: '⚡', lessons: [
        { id: 'ee1', title: 'What is Electricity?', description: 'The flow of electrons', duration: '10 min', xp: 25,
          content: {
            intro: "Electricity powers almost everything in our modern world - let's learn how it works!",
            sections: [
              { title: "Atoms and Electrons", text: "Everything is made of tiny atoms. Atoms have even tinier particles called electrons.\n\n⚡ When electrons flow through a wire, that's electricity!\n\nIt's like water flowing through a pipe.", funFact: "Electricity travels at nearly the speed of light - 186,000 miles per second!" },
              { title: "Circuits", text: "Electricity needs a complete path (circuit) to flow:\n\n🔋 Power source (battery or outlet)\n🔌 Wires (path for electricity)\n💡 Load (light bulb, motor, etc.)\n🔘 Switch (controls the flow)\n\nIf there's a break anywhere, electricity stops!" },
              { title: "Safety!", text: "Electricity can be DANGEROUS:\n\n⚡ Never stick things in outlets\n💧 Keep electronics away from water\n🔌 Don't touch frayed wires\n⚠️ Never touch power lines\n\nRespect electricity and stay safe!" }
            ],
            activity: "With an adult's help, look at a flashlight. Find the battery (power), wires (path), switch, and bulb (load)!"
          }
        },
        { id: 'ee2', title: 'Circuits', description: 'Complete the path', duration: '10 min', xp: 25 },
        { id: 'ee3', title: 'Power Plants', description: 'Where electricity comes from', duration: '10 min', xp: 25 },
        { id: 'ee4', title: 'Electronics', description: 'Phones and computers', duration: '12 min', xp: 30 },
      ]},
      { id: 'coding', name: 'Computer Science', emoji: '💻', lessons: [
        { id: 'cs1', title: 'What is Code?', description: 'Talking to computers', duration: '8 min', xp: 20,
          content: {
            intro: "Code is how we tell computers what to do. Computers follow instructions exactly!",
            sections: [
              { title: "Computers Are Dumb", text: "Wait, what? Computers are dumb?!\n\nYes! Computers can only follow instructions EXACTLY as written. They can't guess what you mean.\n\nThat's why code has to be VERY specific!", funFact: "The first computer programmer was Ada Lovelace, in the 1840s!" },
              { title: "Programming Languages", text: "Just like humans speak different languages, there are different coding languages:\n\n🐍 Python - Easy to learn\n☕ Java - Used for Android apps\n🎨 Scratch - Visual blocks for kids\n🌐 JavaScript - Makes websites interactive\n🎮 C++ - Used for video games" },
              { title: "How Code Works", text: "Code is just instructions:\n\n1️⃣ IF something happens\n2️⃣ THEN do this\n3️⃣ ELSE do that\n4️⃣ REPEAT until done\n\nThat's it! All code is just variations of these ideas." }
            ],
            quiz: { question: "What is code?", options: ["A secret spy message", "Instructions for computers", "A type of puzzle"], correct: 1 },
            activity: "Write instructions for making a peanut butter sandwich. Be SUPER specific - pretend the reader is a robot who knows nothing!"
          }
        },
        { id: 'cs2', title: 'Sequences', description: 'Step by step', duration: '10 min', xp: 25 },
        { id: 'cs3', title: 'Loops', description: 'Repeat, repeat, repeat', duration: '10 min', xp: 25,
          content: {
            intro: "Loops let computers do the same thing over and over without writing the same code multiple times!",
            sections: [
              { title: "Why Loops?", text: "Without loops, drawing 100 circles would need 100 lines of code!\n\nWith a loop:\n🔄 'Draw a circle, repeat 100 times'\n\nOne line does the work of 100!", funFact: "Video games use loops to check your controls 60+ times per second!" },
              { title: "Types of Loops", text: "🔢 FOR loop - Do something a specific number of times\n'Do this 10 times'\n\n🔄 WHILE loop - Do something until a condition changes\n'Keep walking WHILE there's ground ahead'\n\n♾️ INFINITE loop - Goes forever (usually a bug!)\n'Keep doing this... forever!'" },
              { title: "Real Life Loops", text: "You use loops every day!\n\n🍽️ 'Eat food WHILE hungry'\n🚶 'Walk forward UNTIL you reach the door'\n🎵 'Repeat the chorus 3 times'\n🧹 'Clean dishes WHILE there are dirty ones'" }
            ],
            activity: "Write loop instructions for brushing your teeth. What repeats? When does it stop?"
          }
        },
        { id: 'cs4', title: 'Conditionals', description: 'If this, then that', duration: '10 min', xp: 25 },
        { id: 'cs5', title: 'Build a Game', description: 'Your first program', duration: '15 min', xp: 40 },
      ]},
      { id: 'robots', name: 'Robotics', emoji: '🤖', lessons: [
        { id: 'rb1', title: 'What is a Robot?', description: 'Helpful machines', duration: '8 min', xp: 20,
          content: {
            intro: "Robots are machines that can do tasks automatically - some look like humans, but most don't!",
            sections: [
              { title: "Robot Definition", text: "A robot is a machine that can:\n\n🔍 Sense its environment\n🧠 Process information (think)\n🦾 Take action\n\nRobots range from simple (Roomba) to super complex (Mars rovers)!", funFact: "The word 'robot' comes from a Czech word meaning 'forced labor'!" },
              { title: "Types of Robots", text: "🏭 Factory robots - Build cars, make products\n🏥 Medical robots - Help with surgery\n🚀 Space robots - Explore other planets\n🏠 Home robots - Vacuum, mow lawns\n🤖 Humanoid robots - Look like people" },
              { title: "Parts of a Robot", text: "🔌 Power source - Battery or electricity\n🧠 Controller/Computer - The brain\n👀 Sensors - Eyes, ears, touch\n🦾 Actuators - Motors that move things\n📡 Communication - Talks to humans or other robots" }
            ],
            activity: "Design a robot helper for your room. What would it do? What sensors would it need? Draw it!"
          }
        },
        { id: 'rb2', title: 'Sensors', description: 'How robots sense', duration: '10 min', xp: 25 },
        { id: 'rb3', title: 'Robot Movement', description: 'Motors and mechanisms', duration: '10 min', xp: 25 },
        { id: 'rb4', title: 'AI & Machine Learning', description: 'Smart robots', duration: '12 min', xp: 30 },
      ]},
      { id: 'aerospace', name: 'Aerospace', emoji: '🚀', lessons: [
        { id: 'ae1', title: 'How Planes Fly', description: 'Up, up, and away!', duration: '10 min', xp: 25,
          content: {
            intro: "Planes weigh thousands of pounds but soar through the sky - how is this possible?!",
            sections: [
              { title: "The 4 Forces of Flight", text: "Every flying object deals with 4 forces:\n\n⬆️ LIFT - Pushes up (wings create this)\n⬇️ GRAVITY - Pulls down (weight)\n➡️ THRUST - Pushes forward (engines)\n⬅️ DRAG - Pushes backward (air resistance)\n\nTo fly: Lift > Gravity, Thrust > Drag!", funFact: "The fastest plane ever (X-43) went over 7,000 miles per hour!" },
              { title: "How Wings Create Lift", text: "Wings are curved on top and flat on bottom.\n\nAir flows FASTER over the curved top\nAir flows SLOWER under the flat bottom\n\nFaster air = less pressure\nSlower air = more pressure\n\nHigher pressure pushes UP = LIFT!" },
              { title: "Controlling a Plane", text: "Pilots use movable parts:\n\n✈️ Ailerons (on wings) - Roll left/right\n✈️ Elevator (on tail) - Go up/down\n✈️ Rudder (on tail) - Turn left/right" }
            ],
            activity: "Make a paper airplane. Experiment with different wing shapes. Which flies best?"
          }
        },
        { id: 'ae2', title: 'Rockets', description: 'To space and beyond', duration: '12 min', xp: 30,
          content: {
            intro: "Rockets blast off into space using the power of explosions! They're the only way to escape Earth's gravity.",
            sections: [
              { title: "How Rockets Work", text: "Rockets push gases DOWN to go UP!\n\n💥 Fuel burns inside the rocket\n💨 Hot gases shoot out the bottom\n🚀 Rocket pushes in opposite direction\n\nThis is Newton's Third Law: For every action, there's an equal and opposite reaction!", funFact: "The Saturn V rocket burned 20 TONS of fuel per second during liftoff!" },
              { title: "Rocket Parts", text: "🔥 Engines - Create thrust\n⛽ Fuel tanks - Hold fuel and oxygen\n🎛️ Guidance - Computer controls direction\n🚀 Payload - Astronauts or cargo\n🛡️ Heat shield - Protects from atmosphere" },
              { title: "Getting to Space", text: "To reach space, a rocket must:\n\n🚀 Go faster than 17,500 mph!\n🌍 Escape Earth's gravity pull\n🔥 Use multiple 'stages' (sections that fall away)\n\nMost of a rocket is fuel - only a tiny part is payload!" }
            ]
          }
        },
        { id: 'ae3', title: 'Satellites', description: 'Eyes in the sky', duration: '10 min', xp: 25 },
        { id: 'ae4', title: 'Mars Exploration', description: 'The next frontier', duration: '12 min', xp: 30 },
      ]},
      { id: 'bio', name: 'Biomedical Engineering', emoji: '🧬', lessons: [
        { id: 'bio1', title: 'Medical Devices', description: 'Technology that heals', duration: '10 min', xp: 25,
          content: {
            intro: "Biomedical engineers create technology that helps doctors heal people and improve lives!",
            sections: [
              { title: "What is Biomedical Engineering?", text: "Biomedical engineering combines:\n\n🧬 Biology - How bodies work\n⚙️ Engineering - Building things\n🏥 Medicine - Healing people\n\nBiomedical engineers create tools that save lives!", funFact: "The first artificial heart was implanted in 1982!" },
              { title: "Medical Devices", text: "💓 Pacemakers - Keep hearts beating regularly\n👂 Hearing aids - Help people hear\n🦿 Prosthetics - Replace missing limbs\n🔬 MRI machines - See inside bodies\n💉 Insulin pumps - Help diabetics" },
              { title: "Future of Medicine", text: "Engineers are working on:\n\n🦾 Mind-controlled prosthetics\n🧬 Gene therapy to fix DNA\n🤖 Tiny robots that deliver medicine\n👁️ Bionic eyes for the blind\n🖨️ 3D-printed organs!" }
            ]
          }
        },
        { id: 'bio2', title: 'Prosthetics', description: 'Replacement body parts', duration: '10 min', xp: 25 },
        { id: 'bio3', title: 'Medical Imaging', description: 'See inside bodies', duration: '10 min', xp: 25 },
      ]},
      { id: 'env', name: 'Environmental Engineering', emoji: '🌍', lessons: [
        { id: 'ev1', title: 'Clean Water', description: 'Safe water for everyone', duration: '10 min', xp: 25,
          content: {
            intro: "Environmental engineers work to keep our water, air, and land clean and safe for everyone!",
            sections: [
              { title: "Why Clean Water Matters", text: "Clean water is essential for:\n\n💧 Drinking and cooking\n🧼 Bathing and cleaning\n🌱 Growing food\n🐟 Wildlife survival\n\nBut only 1% of Earth's water is fresh and accessible!", funFact: "The average American uses 80-100 gallons of water per day!" },
              { title: "Water Treatment", text: "How dirty water becomes clean:\n\n1️⃣ Screening - Remove large debris\n2️⃣ Settling - Let particles sink\n3️⃣ Filtering - Through sand and gravel\n4️⃣ Disinfection - Kill germs (chlorine, UV light)\n5️⃣ Testing - Make sure it's safe" },
              { title: "Environmental Engineers", text: "These engineers:\n\n🏭 Design water treatment plants\n🌊 Prevent water pollution\n♻️ Create recycling systems\n💨 Monitor air quality\n🌱 Restore damaged ecosystems" }
            ]
          }
        },
        { id: 'ev2', title: 'Clean Energy', description: 'Power without pollution', duration: '10 min', xp: 25 },
        { id: 'ev3', title: 'Recycling', description: 'Reduce, reuse, recycle', duration: '8 min', xp: 20 },
        { id: 'ev4', title: 'Climate Solutions', description: 'Saving our planet', duration: '12 min', xp: 30 },
      ]},
    ]
  },

  // ========== MONEY ==========
  {
    id: 'money', name: 'Money', emoji: '💰', accent: 'accent-green',
    description: 'How money works',
    topics: [
      { id: 'basics', name: 'Basics', emoji: '🪙', lessons: [
        { id: 'mb1', title: 'Coins & Bills', description: 'Know your money', duration: '8 min', xp: 15,
          content: {
            intro: "Money comes in coins (metal) and bills (paper). Let's learn what each one is worth!",
            sections: [
              { title: "Coins", text: "🪙 Penny = 1 cent (copper colored)\n🪙 Nickel = 5 cents (bigger than penny)\n🪙 Dime = 10 cents (smallest coin!)\n🪙 Quarter = 25 cents (has ridges)\n🪙 Half Dollar = 50 cents (rare!)\n🪙 Dollar Coin = 100 cents", funFact: "The penny costs more to make (2.4 cents) than it's worth!" },
              { title: "Bills", text: "💵 $1 - George Washington\n💵 $5 - Abraham Lincoln\n💵 $10 - Alexander Hamilton\n💵 $20 - Andrew Jackson (changing to Harriet Tubman!)\n💵 $50 - Ulysses S. Grant\n💵 $100 - Benjamin Franklin (not a president!)" }
            ],
            activity: "Get some real coins. Sort them by type and count how much you have total!"
          }
        },
        { id: 'mb2', title: 'Counting Money', description: 'Add it up', duration: '8 min', xp: 15 },
        { id: 'mb3', title: 'Making Change', description: "What's left over", duration: '10 min', xp: 20 },
        { id: 'mb4', title: 'Needs vs Wants', description: 'What you need', duration: '8 min', xp: 15,
          content: {
            intro: "Understanding the difference between what you NEED and what you WANT is the first step to being smart with money!",
            sections: [
              { title: "Needs", text: "Things you MUST have to survive and be healthy:\n\n🏠 Shelter (home)\n🍎 Food\n💧 Water\n👕 Basic clothing\n🏥 Healthcare\n📚 Education", funFact: "Humans can survive about 3 weeks without food but only 3 days without water!" },
              { title: "Wants", text: "Things that are nice to have but you could live without:\n\n🎮 Video games\n🍕 Pizza delivery\n👟 Cool sneakers (you need shoes, but not fancy ones)\n📱 Latest phone\n🎢 Theme park trips" },
              { title: "The Tricky Ones", text: "Some things feel like needs but are actually wants:\n\n📱 You NEED communication, but don't NEED the newest iPhone\n👕 You NEED clothes, but don't NEED designer brands\n🍔 You NEED food, but don't NEED restaurant meals\n\nAlways ask: 'Can I survive without this?'" }
            ],
            activity: "Make two lists: 5 things you NEED and 5 things you WANT. Could any of your 'needs' actually be 'wants'?"
          }
        },
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

  // ========== INVESTING ==========
  {
    id: 'investing', name: 'Investing', emoji: '📈', accent: 'accent-purple',
    description: 'Make money grow',
    topics: [
      { id: 'intro', name: 'Basics', emoji: '🌱', lessons: [
        { id: 'ib1', title: 'What is Investing', description: 'Grow your money', duration: '8 min', xp: 25 },
        { id: 'ib2', title: 'Compound Interest', description: 'Magic of growth', duration: '10 min', xp: 30,
          content: {
            intro: "Compound interest is like a snowball rolling downhill - it starts small but gets HUGE over time!",
            sections: [
              { title: "Simple Interest", text: "Simple interest: You only earn interest on your original money.\n\n$100 at 10% = $10 each year\nAfter 10 years: $100 + (10 × $10) = $200", funFact: "Albert Einstein reportedly called compound interest 'the most powerful force in the universe!'" },
              { title: "Compound Interest", text: "Compound interest: You earn interest on your interest too!\n\nYear 1: $100 + $10 = $110\nYear 2: $110 + $11 = $121\nYear 3: $121 + $12.10 = $133.10\n...\nAfter 10 years: $259.37!\n\nThat's $59 more than simple interest!" },
              { title: "The Power of Time", text: "Start early! $100 at 10% compounded:\n\n📅 After 10 years: $259\n📅 After 20 years: $673\n📅 After 30 years: $1,745\n📅 After 40 years: $4,526\n\nYour money grows itself!" }
            ],
            activity: "Use a calculator: If you save $1 and double it every day, how much would you have after 30 days? (Hint: It's more than a million!)"
          }
        },
        { id: 'ib3', title: 'Start Early', description: 'Time is power', duration: '8 min', xp: 25 },
        { id: 'ib4', title: 'Risk & Reward', description: 'Balance', duration: '10 min', xp: 30 },
      ]},
      { id: 'stocks', name: 'Stocks', emoji: '📊', lessons: [
        { id: 'st1', title: 'What is a Stock', description: 'Own a company', duration: '10 min', xp: 30,
          content: {
            intro: "When you buy a stock, you become a part-owner of a company! Yes, even as a kid!",
            sections: [
              { title: "Ownership", text: "A stock (or share) is a tiny piece of a company.\n\n🏪 If a company is a pizza, a stock is one slice\n📊 More stocks = bigger ownership\n💰 As the company grows, your stocks grow in value!", funFact: "If you bought 1 share of Apple in 1980 for $22, it would be worth over $15,000 today!" },
              { title: "How Stocks Make Money", text: "Two ways to make money:\n\n📈 Price goes up - Buy low, sell high\n💵 Dividends - Some companies share profits with owners\n\nExample: Buy a stock for $10, sell later for $20 = $10 profit!" },
              { title: "The Stock Market", text: "🏛️ Stocks are bought/sold on stock exchanges\n📊 NYSE and NASDAQ are the biggest\n📉 Prices change every second based on supply/demand\n🔔 Markets open at 9:30 AM and close at 4:00 PM (Eastern)" }
            ]
          }
        },
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

  // ========== BUSINESS ==========
  {
    id: 'business', name: 'Business', emoji: '🏪', accent: 'accent-pink',
    description: 'Start your empire',
    topics: [
      { id: 'entrepreneur', name: 'Entrepreneur', emoji: '🚀', lessons: [
        { id: 'en1', title: 'What is One', description: 'People who start things', duration: '8 min', xp: 25,
          content: {
            intro: "An entrepreneur is someone who starts a business to solve a problem and make money doing it!",
            sections: [
              { title: "What Entrepreneurs Do", text: "Entrepreneurs:\n\n💡 See problems others miss\n🛠️ Create solutions\n💼 Start businesses\n😰 Take risks\n🏆 Get rewards if they succeed", funFact: "The word 'entrepreneur' comes from French and means 'one who undertakes'!" },
              { title: "Famous Young Entrepreneurs", text: "🧒 Moziah Bridges - Started a bow tie company at age 9, made millions!\n👧 Mikaila Ulmer - Started lemonade company at 4, sold to Whole Foods\n🧑 Farrhad Acidwalla - Started tech company at 13, became millionaire\n\nYOU could be next!" },
              { title: "The Entrepreneurial Mindset", text: "To be an entrepreneur, think like one:\n\n❓ Always ask 'How can this be better?'\n🔄 Learn from failures - they're just lessons\n💪 Be persistent - don't give up\n📚 Keep learning new things\n🤝 Help people solve problems" }
            ]
          }
        },
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

  // ========== LIFE SKILLS ==========
  {
    id: 'lifeskills', name: 'Life Skills', emoji: '🏆', accent: 'accent-amber',
    description: 'Skills for success',
    topics: [
      { id: 'goals', name: 'Goals', emoji: '🎯', lessons: [
        { id: 'gl1', title: 'Dream Big', description: 'What do you want', duration: '8 min', xp: 20 },
        { id: 'gl2', title: 'SMART Goals', description: 'Goals that work', duration: '10 min', xp: 25,
          content: {
            intro: "Not all goals are created equal! SMART goals are much more likely to succeed.",
            sections: [
              { title: "What is SMART?", text: "SMART is an acronym:\n\n✅ S - Specific (exact, not vague)\n✅ M - Measurable (you can track it)\n✅ A - Achievable (possible to do)\n✅ R - Relevant (matters to you)\n✅ T - Time-bound (has a deadline)", funFact: "People who write down their goals are 42% more likely to achieve them!" },
              { title: "Bad vs Good Goals", text: "❌ 'I want to get better at math'\n✅ 'I will practice math for 20 minutes every day for one month and improve my test score by 10 points'\n\n❌ 'I want to save money'\n✅ 'I will save $50 by putting $5 in my piggy bank every week for 10 weeks'" },
              { title: "Making Your SMART Goal", text: "Write your goal, then check:\n\n📋 Is it SPECIFIC? (What exactly?)\n📊 Is it MEASURABLE? (How will you know you did it?)\n🎯 Is it ACHIEVABLE? (Can you actually do it?)\n💭 Is it RELEVANT? (Do you care about it?)\n⏰ Is it TIME-BOUND? (When will you finish?)" }
            ],
            activity: "Take a goal you have and rewrite it as a SMART goal. Make it specific, measurable, achievable, relevant, and time-bound!"
          }
        },
        { id: 'gl3', title: 'Break It Down', description: 'Small steps', duration: '10 min', xp: 25 },
        { id: 'gl4', title: 'Stay Motivated', description: 'Keep going', duration: '10 min', xp: 25 },
      ]},
      { id: 'problems', name: 'Problem Solving', emoji: '🧩', lessons: [
        { id: 'ps1', title: 'Identify', description: "What's wrong", duration: '8 min', xp: 20 },
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

// =====================================================
// COMPONENT
// =====================================================

export default function FutureKidsAcademy() {
  const [selectedWorld, setSelectedWorld] = useState<World | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [streak, setStreak] = useState(3);
  const [showCelebration, setShowCelebration] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

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

  const resetQuiz = () => {
    setQuizAnswer(null);
    setQuizSubmitted(false);
  };

  // Celebration
  if (showCelebration) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-6">
        <div className="text-center animate-fade-in">
          <div className="text-7xl mb-6">🎉</div>
          <h1 className="font-display text-4xl text-[#3D3935] mb-4">Level Up!</h1>
          <p className="text-xl text-[#9A9086]">You&apos;re now Level {level}</p>
          <p className="text-[#9A9086] mt-4">Keep going, superstar!</p>
        </div>
      </div>
    );
  }

  // Lesson View (with content!)
  if (selectedLesson && selectedTopic && selectedWorld) {
    const isComplete = completedLessons.includes(selectedLesson.id);
    const content = selectedLesson.content;
    
    return (
      <div className="min-h-screen bg-[#FAF7F2] texture">
        <header className="px-6 py-5 border-b border-[#E8DDD4] sticky top-0 bg-[#FAF7F2]/95 backdrop-blur z-10">
          <button onClick={() => { setSelectedLesson(null); resetQuiz(); }} className="text-[#9A9086] hover:text-[#3D3935] font-medium flex items-center gap-2">
            <span>←</span> Back
          </button>
        </header>
        <main className="max-w-lg mx-auto px-6 py-8">
          {/* Header */}
          <div className={`${selectedWorld.accent} rounded-2xl p-8 text-center mb-6`}>
            <span className="text-5xl block mb-4">{selectedTopic.emoji}</span>
            <h1 className="font-display text-2xl text-[#3D3935] mb-2">{selectedLesson.title}</h1>
            <p className="text-[#9A9086]">{selectedLesson.description}</p>
            <div className="flex justify-center gap-4 mt-4 text-sm text-[#9A9086]">
              <span>⏱ {selectedLesson.duration}</span>
              <span>+{selectedLesson.xp} XP</span>
            </div>
          </div>

          {/* Content */}
          {content ? (
            <div className="space-y-6">
              {/* Intro */}
              <div className="card p-6">
                <p className="text-[#3D3935] text-lg leading-relaxed">{content.intro}</p>
              </div>

              {/* Sections */}
              {content.sections.map((section, idx) => (
                <div key={idx} className="card p-6">
                  <h2 className="font-display text-xl text-[#3D3935] mb-4">{section.title}</h2>
                  <p className="text-[#3D3935] leading-relaxed whitespace-pre-line">{section.text}</p>
                  {section.funFact && (
                    <div className="mt-4 p-4 bg-[#FFF9E6] rounded-xl border border-[#FFE4A0]">
                      <p className="text-sm">
                        <span className="font-bold">🌟 Fun Fact:</span> {section.funFact}
                      </p>
                    </div>
                  )}
                </div>
              ))}

              {/* Quiz */}
              {content.quiz && (
                <div className="card p-6">
                  <h2 className="font-display text-xl text-[#3D3935] mb-4">🧠 Quick Quiz!</h2>
                  <p className="text-[#3D3935] mb-4 font-medium">{content.quiz.question}</p>
                  <div className="space-y-2">
                    {content.quiz.options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => !quizSubmitted && setQuizAnswer(idx)}
                        className={`w-full p-4 rounded-xl text-left transition-all ${
                          quizSubmitted
                            ? idx === content.quiz!.correct
                              ? 'bg-[#E8F5E9] border-2 border-[#4CAF50]'
                              : idx === quizAnswer
                                ? 'bg-[#FFEBEE] border-2 border-[#EF5350]'
                                : 'bg-[#F5F0EB] border-2 border-transparent'
                            : quizAnswer === idx
                              ? 'bg-[#E3F2FD] border-2 border-[#2196F3]'
                              : 'bg-[#F5F0EB] border-2 border-transparent hover:border-[#D4A574]'
                        }`}
                      >
                        {option}
                        {quizSubmitted && idx === content.quiz!.correct && ' ✓'}
                      </button>
                    ))}
                  </div>
                  {!quizSubmitted && quizAnswer !== null && (
                    <button
                      onClick={() => setQuizSubmitted(true)}
                      className="btn-primary w-full mt-4"
                    >
                      Check Answer
                    </button>
                  )}
                  {quizSubmitted && (
                    <p className={`mt-4 text-center font-medium ${quizAnswer === content.quiz.correct ? 'text-[#4CAF50]' : 'text-[#EF5350]'}`}>
                      {quizAnswer === content.quiz.correct ? '🎉 Correct! Great job!' : '😅 Not quite! The correct answer is highlighted.'}
                    </p>
                  )}
                </div>
              )}

              {/* Activity */}
              {content.activity && (
                <div className="card p-6 bg-[#E8F5E9]">
                  <h2 className="font-display text-xl text-[#2E7D32] mb-4">🎯 Try This!</h2>
                  <p className="text-[#3D3935]">{content.activity}</p>
                </div>
              )}
            </div>
          ) : (
            /* Placeholder for lessons without content yet */
            <div className="card p-6 mb-6">
              <div className="aspect-video bg-[#E8DDD4] rounded-xl flex items-center justify-center mb-4">
                <div className="text-center">
                  <span className="text-4xl block mb-2">📚</span>
                  <p className="text-[#9A9086] text-sm">Full lesson content coming soon!</p>
                </div>
              </div>
            </div>
          )}

          {/* Complete Button */}
          <div className="mt-8">
            {isComplete ? (
              <div className="card p-6 text-center bg-[#E8F5E9]">
                <span className="text-3xl block mb-2">✓</span>
                <p className="font-medium text-[#2E7D32]">Lesson Complete!</p>
              </div>
            ) : (
              <button onClick={() => completeLesson(selectedLesson)} className="btn-primary w-full text-center">
                {content ? "I Learned This! ✨" : "Complete Lesson"}
              </button>
            )}
          </div>
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
        <header className="px-6 py-5 border-b border-[#E8DDD4] sticky top-0 bg-[#FAF7F2]/95 backdrop-blur z-10">
          <button onClick={() => setSelectedTopic(null)} className="text-[#9A9086] hover:text-[#3D3935] font-medium flex items-center gap-2">
            <span>←</span> Back
          </button>
        </header>
        <main className="max-w-lg mx-auto px-6 py-8">
          <div className={`${selectedWorld.accent} rounded-2xl p-6 text-center mb-6`}>
            <span className="text-4xl block mb-3">{selectedTopic.emoji}</span>
            <h1 className="font-display text-2xl text-[#3D3935]">{selectedTopic.name}</h1>
            <p className="text-[#9A9086] text-sm mt-2">{done} of {total} complete</p>
            <div className="progress-track h-2 mt-4">
              <div className="progress-fill h-2" style={{ width: `${(done/total)*100}%` }} />
            </div>
          </div>
          <div className="space-y-3">
            {selectedTopic.lessons.map((lesson, idx) => {
              const isDone = completedLessons.includes(lesson.id);
              const isLocked = idx > 0 && !completedLessons.includes(selectedTopic.lessons[idx-1].id);
              const hasContent = !!lesson.content;
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
                    <p className={`font-medium ${isDone ? 'text-[#2E7D32]' : 'text-[#3D3935]'}`}>
                      {lesson.title}
                      {hasContent && !isDone && <span className="ml-2 text-xs text-[#D4A574]">✨ Full lesson!</span>}
                    </p>
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
        <header className="px-6 py-5 border-b border-[#E8DDD4] sticky top-0 bg-[#FAF7F2]/95 backdrop-blur z-10">
          <button onClick={() => setSelectedWorld(null)} className="text-[#9A9086] hover:text-[#3D3935] font-medium flex items-center gap-2">
            <span>←</span> All Subjects
          </button>
        </header>
        <main className="max-w-lg mx-auto px-6 py-8">
          <div className={`${selectedWorld.accent} rounded-2xl p-8 text-center mb-8`}>
            <span className="text-5xl block mb-4">{selectedWorld.emoji}</span>
            <h1 className="font-display text-3xl text-[#3D3935]">{selectedWorld.name}</h1>
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
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FFB6C1] via-[#98D8C8] to-[#87CEEB] flex items-center justify-center shadow-lg">
              <span className="text-2xl">🚀</span>
            </div>
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-[#9A9086]">Learning Academy</p>
              <h1 className="font-display text-3xl text-[#3D3935]">FutureKids</h1>
            </div>
          </div>
          
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
                  <p className="font-display text-lg text-[#3D3935]">{world.name}</p>
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
                  <p className="font-display text-lg text-[#3D3935]">{world.name}</p>
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
