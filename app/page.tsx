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

interface TopicQuiz {
  questions: {
    question: string;
    options: string[];
    correct: number;
  }[];
  passingScore: number; // How many correct to pass (e.g., 8 out of 10)
}

interface Topic {
  id: string;
  name: string;
  emoji: string;
  lessons: Lesson[];
  topicQuiz?: TopicQuiz; // 10-question quiz to master the topic
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
      { id: 'basics', name: 'Basics', emoji: '🪙', 
        topicQuiz: {
          passingScore: 8,
          questions: [
            { question: "How many cents is a nickel worth?", options: ["1 cent", "5 cents", "10 cents", "25 cents"], correct: 1 },
            { question: "Which coin is the smallest in size?", options: ["Penny", "Nickel", "Dime", "Quarter"], correct: 2 },
            { question: "Who is on the $100 bill?", options: ["George Washington", "Abraham Lincoln", "Benjamin Franklin", "Alexander Hamilton"], correct: 2 },
            { question: "How many cents equal one dollar?", options: ["10 cents", "50 cents", "100 cents", "200 cents"], correct: 2 },
            { question: "3 quarters + 2 dimes = ?", options: ["75 cents", "85 cents", "95 cents", "$1.05"], correct: 2 },
            { question: "Which is a NEED, not a WANT?", options: ["Video games", "Food", "Designer clothes", "Theme park trip"], correct: 1 },
            { question: "You pay $5 for a $3.50 item. Your change is:", options: ["$1.00", "$1.50", "$2.00", "$2.50"], correct: 1 },
            { question: "What does saving money mean?", options: ["Spending it all now", "Keeping some for later", "Giving it away", "Hiding it"], correct: 1 },
            { question: "The 'counting up' method helps you:", options: ["Count coins", "Make change", "Save money", "Earn money"], correct: 1 },
            { question: "Which costs more to make than it's worth?", options: ["Quarter", "Dime", "Nickel", "Penny"], correct: 3 }
          ]
        },
        lessons: [
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
        { id: 'mb2', title: 'Counting Money', description: 'Add it up', duration: '8 min', xp: 15,
          content: {
            intro: "Knowing how to count money is a superpower! Let's learn to add up coins and bills.",
            sections: [
              { title: "Counting Coins", text: "Start with the biggest coins first:\n\n1️⃣ Count quarters: 25, 50, 75, 100...\n2️⃣ Add dimes: +10 each\n3️⃣ Add nickels: +5 each\n4️⃣ Add pennies: +1 each\n\nExample: 2 quarters + 1 dime + 3 pennies = 50 + 10 + 3 = 63¢", funFact: "There are 293 ways to make change for a dollar using coins!" },
              { title: "Counting Bills", text: "Bills are easier - they're already labeled!\n\n$20 + $10 + $5 + $1 = $36\n\nTip: Group same bills together first, then add." },
              { title: "Dollars and Cents", text: "The dot separates dollars from cents:\n\n$3.75 = 3 dollars and 75 cents\n$10.50 = 10 dollars and 50 cents\n\nRemember: 100 cents = 1 dollar" }
            ],
            quiz: { question: "How much is 3 quarters and 2 dimes?", options: ["85 cents", "95 cents", "75 cents"], correct: 1 },
            activity: "Empty your piggy bank and count everything! Group coins by type first."
          }
        },
        { id: 'mb3', title: 'Making Change', description: "What's left over", duration: '10 min', xp: 20,
          content: {
            intro: "When you pay more than something costs, you get change back. Let's learn how!",
            sections: [
              { title: "What is Change?", text: "Change = What you paid - What it costs\n\nYou give: $5.00\nItem costs: $3.25\nChange: $5.00 - $3.25 = $1.75", funFact: "Cashiers are trained to count change UP from the price to the amount paid!" },
              { title: "Counting Up Method", text: "Start at the price, count up to what you paid:\n\nPrice: $3.25, Paid: $5.00\n\n$3.25 → $3.50 (add quarter)\n$3.50 → $4.00 (add 2 quarters)\n$4.00 → $5.00 (add $1)\n\nChange: 25¢ + 50¢ + $1 = $1.75" },
              { title: "Quick Tips", text: "🧠 Round to easy numbers\n🧮 Use mental math\n✅ Always count your change\n💡 If price ends in 99¢, change is easy!" }
            ],
            quiz: { question: "You buy a $2.50 item with $5. What's your change?", options: ["$2.00", "$2.50", "$3.50"], correct: 1 },
            activity: "Play store! Price items, 'buy' them, and practice making change."
          }
        },
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
      { id: 'saving', name: 'Saving', emoji: '🐷',
        topicQuiz: {
          passingScore: 8,
          questions: [
            { question: "What should you do FIRST when you get money?", options: ["Spend it", "Save some", "Count it twice", "Give it away"], correct: 1 },
            { question: "What is 'paying yourself first'?", options: ["Getting paid for work", "Saving before spending", "Buying treats", "Borrowing money"], correct: 1 },
            { question: "A short-term goal might take:", options: ["10 years", "A few weeks or months", "Your whole life", "One day"], correct: 1 },
            { question: "Interest is:", options: ["A fee you pay", "Money the bank pays YOU", "A type of coin", "A savings goal"], correct: 1 },
            { question: "Why do piggy banks work well?", options: ["They're cute", "They make saving harder to spend", "They earn interest", "Banks give them free"], correct: 1 },
            { question: "What does a savings account do that a piggy bank doesn't?", options: ["Hold coins", "Look pretty", "Earn interest", "Keep money safe"], correct: 2 },
            { question: "People who write down their goals are:", options: ["Less likely to achieve them", "42% more likely to achieve them", "Wasting time", "Being silly"], correct: 1 },
            { question: "Emergency savings are for:", options: ["Buying toys", "Unexpected problems", "Fun trips", "Snacks"], correct: 1 },
            { question: "If you save $1 a day for a year, you'll have:", options: ["$100", "$265", "$365", "$500"], correct: 2 },
            { question: "A long-term goal might be:", options: ["Buying candy", "College fund", "This week's game", "Tomorrow's lunch"], correct: 1 }
          ]
        },
        lessons: [
        { id: 'sv1', title: 'Why Save', description: 'For the future', duration: '8 min', xp: 20,
          content: {
            intro: "Saving money means keeping some for later instead of spending it all now. It's one of the most important money skills!",
            sections: [
              { title: "What is Saving?", text: "Saving = Not spending money now so you have it later\n\n🎮 Want a $60 video game? Save $10/week for 6 weeks!\n🚗 Want a car someday? Start saving now!", funFact: "If you save just $1 a day, you'll have $365 at the end of the year!" },
              { title: "Why Save?", text: "People save for:\n\n🎯 Goals - Big things you want to buy\n🆘 Emergencies - Unexpected problems\n🔮 Future - College, car, house someday\n😌 Peace of mind - Less stress about money" },
              { title: "The Secret", text: "Pay yourself FIRST!\n\nWhen you get money:\n1️⃣ Save some immediately\n2️⃣ THEN spend what's left\n\nNot the other way around!" }
            ],
            quiz: { question: "What should you do FIRST when you get money?", options: ["Spend it", "Save some", "Give it away"], correct: 1 },
            activity: "Decide on ONE thing you want to save for. How much does it cost? How long will it take?"
          }
        },
        { id: 'sv2', title: 'Goals', description: 'What to save for', duration: '8 min', xp: 20,
          content: {
            intro: "Having a savings GOAL makes saving way easier. Let's set one!",
            sections: [
              { title: "Short-Term Goals", text: "Things you can save for in weeks or months:\n\n🎮 Video game ($60) - 6 weeks at $10/week\n📚 Book ($15) - 3 weeks at $5/week\n🎁 Gift for someone ($25) - 5 weeks at $5/week", funFact: "People who write down their goals are 42% more likely to achieve them!" },
              { title: "Long-Term Goals", text: "Things that take months or years:\n\n📱 Phone ($200) - 10 months at $20/month\n🚲 Bike ($300) - Save birthday money for 2 years\n🎓 College fund - Start now, use later!" },
              { title: "Make a Plan", text: "For any goal:\n\n1️⃣ What do you want? (Be specific!)\n2️⃣ How much does it cost?\n3️⃣ When do you want it?\n4️⃣ How much per week/month?\n\nGoal ÷ Time = Weekly savings needed" }
            ],
            activity: "Pick something you want. Write down: What, Cost, When, and how much you'll save each week."
          }
        },
        { id: 'sv3', title: 'Piggy Bank', description: 'Start small', duration: '8 min', xp: 20,
          content: {
            intro: "A piggy bank is your first savings tool. It's simple but powerful!",
            sections: [
              { title: "Why Piggy Banks Work", text: "🐷 They're always there\n👀 You can SEE your money grow\n🔒 Harder to spend on impulse\n🎯 Visual reminder of your goal", funFact: "Piggy banks got their name from 'pygg' - a type of clay used to make jars in the Middle Ages!" },
              { title: "Piggy Bank Tips", text: "Make your piggy bank work better:\n\n📍 Put it where you'll see it daily\n🏷️ Label it with your goal\n📅 Add money on a schedule\n🎨 Decorate it to make it special\n❌ Don't open it until you reach your goal!" },
              { title: "Beyond the Piggy Bank", text: "Other ways to save:\n\n🫙 Clear jar - watch money pile up!\n📦 Savings box with slots\n✉️ Envelopes for different goals\n🏦 Bank account (when you're older)" }
            ],
            activity: "Make your own piggy bank! Use a jar, label it with your goal, and decorate it."
          }
        },
        { id: 'sv4', title: 'Bank Accounts', description: 'Where adults save', duration: '10 min', xp: 25,
          content: {
            intro: "Banks are like super-safe piggy banks that can actually make your money grow!",
            sections: [
              { title: "What is a Bank?", text: "A bank is a place that:\n\n🏦 Keeps your money safe\n💰 Pays you interest (free money!)\n💳 Lets you access money when needed\n📱 You can check online anytime", funFact: "Banks have been around for over 4,000 years - ancient temples stored grain and gold!" },
              { title: "Types of Accounts", text: "🏦 Savings Account - For money you're saving (earns interest)\n✅ Checking Account - For money you spend often (easy access)\n👶 Kids' Savings - Special accounts for young savers", funFact: "Your money in the bank is insured up to $250,000 by the government!" },
              { title: "Interest - Free Money!", text: "Interest is money the bank PAYS YOU for keeping your money there!\n\nExample: $100 at 2% interest = $2 per year\n\nIt's not much at first, but it adds up over time!" }
            ],
            quiz: { question: "What does a savings account give you that a piggy bank doesn't?", options: ["Safety", "Interest", "Colors"], correct: 1 },
            activity: "Ask a parent about opening a savings account together!"
          }
        },
      ]},
      { id: 'earning', name: 'Earning', emoji: '💵',
        topicQuiz: {
          passingScore: 8,
          questions: [
            { question: "What does 'trading time for money' mean?", options: ["Selling clocks", "Working a job", "Saving time", "Borrowing money"], correct: 1 },
            { question: "Which is a way kids can earn money?", options: ["Asking for more allowance", "Dog walking", "Taking from others", "Finding it on the ground"], correct: 1 },
            { question: "What's a benefit of doing chores for allowance?", options: ["It's free money", "You learn responsibility", "You don't have to work", "Parents do it for you"], correct: 1 },
            { question: "A kid business is:", options: ["Illegal for kids", "A way to create income", "Only for adults", "Too hard"], correct: 1 },
            { question: "What skill do you learn from earning money?", options: ["How to spend faster", "Work ethic", "How to be lazy", "Nothing"], correct: 1 },
            { question: "Why is earning better than just getting money?", options: ["It's easier", "You appreciate it more", "It's faster", "You get more"], correct: 1 },
            { question: "What's one way to earn money from neighbors?", options: ["Borrow without asking", "Yard work or pet sitting", "Take their stuff", "Do nothing"], correct: 1 },
            { question: "Starting a business teaches you:", options: ["To be greedy", "Problem-solving and responsibility", "To quit easily", "Nothing useful"], correct: 1 },
            { question: "What should you do with money you earn?", options: ["Spend it all immediately", "Save some, spend some wisely", "Hide it and forget", "Give it all away"], correct: 1 },
            { question: "The best earners are people who:", options: ["Wait for money to appear", "Create value for others", "Only think about themselves", "Never work hard"], correct: 1 }
          ]
        },
        lessons: [
        { id: 'er1', title: 'Jobs', description: 'How to earn', duration: '8 min', xp: 20,
          content: {
            intro: "Money doesn't grow on trees - you have to EARN it! Let's learn how.",
            sections: [
              { title: "Trading Time for Money", text: "Most people earn money by working:\n\n⏰ You give your TIME\n💪 You use your SKILLS\n💵 You get paid MONEY\n\nThis is called 'trading time for money' - the most common way to earn.", funFact: "The word 'salary' comes from 'salt' - Roman soldiers were sometimes paid in salt!" },
              { title: "Types of Work", text: "👔 Employee - Work for a company, get paid regularly\n🛠️ Freelancer - Work for yourself, different clients\n🏪 Business owner - Create a company, earn from sales\n💰 Investor - Make money work for you", funFact: "Some jobs pay hourly, some pay yearly salary, some pay per project!" },
              { title: "Getting Paid More", text: "Want to earn more? Build valuable skills:\n\n📚 Learn things others can't do\n💻 Technology skills pay well\n🗣️ Communication matters\n🎯 Solve big problems = big money" }
            ],
            quiz: { question: "What do you trade for money at a job?", options: ["Toys", "Time and skills", "Food"], correct: 1 },
            activity: "Ask a parent about their job. What do they do? How did they learn to do it?"
          }
        },
        { id: 'er2', title: 'Allowance', description: 'Earn at home', duration: '8 min', xp: 20,
          content: {
            intro: "An allowance is money you earn regularly, usually for helping around the house!",
            sections: [
              { title: "What is Allowance?", text: "Allowance is regular money you get, usually weekly:\n\n🏠 Some families give it for chores\n📅 Some give it just for being in the family\n💰 Amount varies - $5 to $20+ per week is common", funFact: "The average allowance in America is about $10-15 per week!" },
              { title: "Earning More", text: "Want more than your regular allowance?\n\n🧹 Extra chores = Extra money\n🚗 Wash the car\n🌿 Yard work\n🐕 Pet care\n📦 Help organize\n\nAsk your parents what jobs they'd pay for!" },
              { title: "Making it Work", text: "Tips for allowance success:\n\n📋 Know what's expected of you\n⏰ Do chores without being asked\n💰 Save some, spend some\n📈 Ask for a raise after showing responsibility" }
            ],
            activity: "Make a list of chores you could do to earn extra money. Ask your parents which ones they'd pay for!"
          }
        },
        { id: 'er3', title: 'Kid Business', description: 'Make your own', duration: '10 min', xp: 25,
          content: {
            intro: "Why wait to grow up? Kids can start businesses too - and make real money!",
            sections: [
              { title: "Kid Business Ideas", text: "Easy businesses to start NOW:\n\n🍋 Lemonade stand\n🐕 Dog walking/Pet sitting\n🌿 Lawn care/Yard work\n🧹 Car washing\n🎨 Selling crafts\n👶 Mother's helper\n💻 Tech help for neighbors", funFact: "Warren Buffett (billionaire investor) started selling gum door-to-door at age 6!" },
              { title: "Steps to Start", text: "1️⃣ Pick something you enjoy\n2️⃣ Figure out what to charge\n3️⃣ Get supplies you need\n4️⃣ Tell people about it\n5️⃣ Do GREAT work\n6️⃣ Save your profits!" },
              { title: "Be Professional", text: "Even as a kid, be professional:\n\n✅ Show up on time\n✅ Do what you promised\n✅ Be polite and friendly\n✅ Ask for feedback\n✅ Thank your customers\n\nHappy customers = More business!" }
            ],
            quiz: { question: "What's the most important thing in business?", options: ["Having fun", "Happy customers", "Working alone"], correct: 1 },
            activity: "Think of 3 business ideas you could start. Pick your favorite and write a simple plan!"
          }
        },
      ]},
      { id: 'budget', name: 'Budgeting', emoji: '📊', lessons: [
        { id: 'bg1', title: 'What is a Budget', description: 'Plan your money', duration: '8 min', xp: 20,
          content: {
            intro: "A budget is a plan for your money. It tells your money where to go instead of wondering where it went!",
            sections: [
              { title: "What is a Budget?", text: "Budget = Money In vs Money Out\n\n💵 Income: Money you get\n💸 Expenses: Money you spend\n\nGoal: Spend LESS than you earn!", funFact: "Only about 1 in 3 people use a budget. The ones who do are much better with money!" },
              { title: "Why Budget?", text: "Budgets help you:\n\n🎯 Reach your savings goals\n🚫 Avoid running out of money\n😌 Feel less stressed\n🧠 Make smarter choices\n📈 Build wealth over time" },
              { title: "Simple Budget", text: "A simple budget:\n\n1️⃣ Write down how much you get\n2️⃣ Write down what you want to buy\n3️⃣ Make sure #2 isn't bigger than #1!\n\nIf you want more stuff, earn more or wait longer." }
            ],
            quiz: { question: "What should your budget make sure of?", options: ["Spend more than you earn", "Spend less than you earn", "Spend exactly what you earn"], correct: 1 },
            activity: "Create a simple budget: Write down money you'll get this month and what you want to spend it on."
          }
        },
        { id: 'bg2', title: 'Three Jars', description: 'Save, Spend, Give', duration: '10 min', xp: 25,
          content: {
            intro: "The Three Jar system is the easiest way to manage your money like a pro!",
            sections: [
              { title: "The Three Jars", text: "Every time you get money, split it:\n\n🐷 SAVE Jar (40%) - For goals and future\n🎮 SPEND Jar (50%) - For fun stuff now\n❤️ GIVE Jar (10%) - To help others\n\nThis teaches balance!", funFact: "Many millionaires started with a system just like this when they were kids!" },
              { title: "Why It Works", text: "This system teaches:\n\n💰 Delayed gratification (saving)\n🎉 Enjoying life (spending)\n🤝 Generosity (giving)\n\nAll three are important for a happy life!" },
              { title: "Making It Work", text: "Example: You get $10\n\n🐷 SAVE: $4 (40%)\n🎮 SPEND: $5 (50%)\n❤️ GIVE: $1 (10%)\n\nYou can adjust percentages as you learn what works for you!" }
            ],
            activity: "Set up three jars (or envelopes). Label them SAVE, SPEND, GIVE. Split your next allowance!"
          }
        },
        { id: 'bg3', title: 'Tracking', description: 'Where money goes', duration: '10 min', xp: 25,
          content: {
            intro: "Do you ever wonder where all your money went? Tracking helps you find out!",
            sections: [
              { title: "Why Track?", text: "Tracking shows you:\n\n📊 Where money actually goes\n🔍 Sneaky spending you didn't notice\n📈 Progress toward goals\n💡 Where you can do better", funFact: "People who track spending save an average of 15% more money!" },
              { title: "How to Track", text: "Simple tracking method:\n\n📓 Notebook - Write every purchase\n📱 App - Use a money tracking app\n📋 Spreadsheet - For older kids\n🧾 Save receipts - Review weekly" },
              { title: "Review Your Spending", text: "Once a week, look at what you spent:\n\n❓ Did I need all of this?\n💭 Any surprises?\n🎯 Am I on track for my goals?\n✅ What can I do better?\n\nNo judgment - just learning!" }
            ],
            quiz: { question: "Why should you track your spending?", options: ["To feel bad", "To see where money goes", "To spend more"], correct: 1 },
            activity: "Track every penny you spend this week. At the end, add it up. Surprised?"
          }
        },
      ]},
    ]
  },

  // ========== INVESTING ==========
  {
    id: 'investing', name: 'Investing', emoji: '📈', accent: 'accent-purple',
    description: 'Make money grow',
    topics: [
      { id: 'intro', name: 'Basics', emoji: '🌱', lessons: [
        { id: 'ib1', title: 'What is Investing', description: 'Grow your money', duration: '8 min', xp: 25,
          content: {
            intro: "Investing means making your money work FOR you, so it grows even while you sleep!",
            sections: [
              { title: "Saving vs Investing", text: "💰 Saving = Keeping money safe (slow growth)\n📈 Investing = Putting money to work (faster growth, some risk)\n\nSaving is like walking. Investing is like taking a car - faster but you need to learn how!", funFact: "If you invested $1,000 at age 10 and earned 10% yearly, you'd have over $117,000 by age 60!" },
              { title: "How Investing Works", text: "When you invest, you buy something that can grow:\n\n📊 Stocks - Own part of a company\n🏠 Real Estate - Own property\n🏢 Businesses - Own or start one\n\nAs these grow, your money grows!" },
              { title: "Why Start Young?", text: "TIME is your superpower!\n\n⏰ Start at 10 = LOTS of time to grow\n⏰ Start at 40 = Less time\n\nEven small amounts become huge with enough time. Start NOW!" }
            ],
            quiz: { question: "What's the difference between saving and investing?", options: ["Nothing", "Investing grows faster but has risk", "Saving is better"], correct: 1 },
            activity: "Ask a parent: Do they invest? In what? Why did they choose it?"
          }
        },
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
        { id: 'ib3', title: 'Start Early', description: 'Time is power', duration: '8 min', xp: 25,
          content: {
            intro: "The earlier you start investing, the more your money can grow. Time is your secret weapon!",
            sections: [
              { title: "The Power of Time", text: "Meet two investors:\n\n👧 Early Emma starts at 20, invests $100/month for 10 years, then STOPS\n👦 Late Larry starts at 30, invests $100/month for 30 years\n\nWho has more at 60? EMMA! Even though she invested less total!", funFact: "Emma invested $12,000 total. Larry invested $36,000. But Emma ends up with MORE because she started earlier!" },
              { title: "Why Time Wins", text: "🧮 Compound interest needs TIME to work its magic\n📈 More years = More doubling periods\n💤 Your money grows while you sleep\n⏰ You can't get time back - start NOW" },
              { title: "Even Small Amounts", text: "Starting with just $1/day:\n\n📅 In 10 years: ~$6,000\n📅 In 20 years: ~$20,000\n📅 In 40 years: ~$180,000!\n\nSmall amounts + lots of time = BIG results" }
            ],
            quiz: { question: "Who usually has more money: early starter or late starter?", options: ["Late starter", "Early starter", "Same"], correct: 1 },
            activity: "Use an online compound interest calculator. See how much $100/month would grow over 40 years!"
          }
        },
        { id: 'ib4', title: 'Risk & Reward', description: 'Balance', duration: '10 min', xp: 30,
          content: {
            intro: "In investing, higher rewards usually come with higher risks. Learning to balance them is key!",
            sections: [
              { title: "What is Risk?", text: "Risk = Chance of losing money\n\n🟢 Low risk: Savings account (safe but grows slow)\n🟡 Medium risk: Bonds, index funds (balanced)\n🔴 High risk: Individual stocks, crypto (could win big or lose big)", funFact: "The stock market goes UP most years, but some years it goes down. That's the risk!" },
              { title: "Risk vs Reward", text: "Generally:\n\n😴 Low risk = Low reward\n⚖️ Medium risk = Medium reward\n🎢 High risk = High reward (or loss!)\n\nYou have to accept some risk to grow your money faster than inflation." },
              { title: "Managing Risk", text: "Smart investors reduce risk by:\n\n🥚 Not putting all eggs in one basket (diversification)\n⏰ Investing for the long term\n📚 Learning before investing\n😌 Not panicking when markets drop\n💰 Only investing what they can afford to lose" }
            ],
            quiz: { question: "Higher potential reward usually means...", options: ["Lower risk", "Higher risk", "No risk"], correct: 1 },
            activity: "If you had $100 to invest, how would you split it between safe and risky investments? Why?"
          }
        },
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
        { id: 'st2', title: 'How Stocks Work', description: 'Buy low, sell high', duration: '10 min', xp: 30,
          content: {
            intro: "The basic idea of stocks is simple: buy low, sell high. Let's learn how!",
            sections: [
              { title: "Supply and Demand", text: "Stock prices change based on:\n\n📈 More buyers = Price goes UP\n📉 More sellers = Price goes DOWN\n\nPrices change every second during trading hours!", funFact: "Some stocks have moved 10% in a single day based on news!" },
              { title: "Buy Low, Sell High", text: "The goal:\n\n💵 Buy a stock at $10\n📈 Wait for it to grow\n💰 Sell it at $20\n🎉 You made $10 profit!\n\nBut if it drops to $5 and you sell, you LOSE $5." },
              { title: "Long-Term Thinking", text: "Smart investors:\n\n⏰ Hold stocks for years, not days\n📉 Don't panic when prices drop\n📈 Trust that good companies grow over time\n💡 Buy quality, not hype" }
            ],
            quiz: { question: "To make money on stocks, you want to...", options: ["Buy high, sell low", "Buy low, sell high", "Never sell"], correct: 1 },
            activity: "Pick a company you like. Look up its stock price today. Check again in a week. Did it go up or down?"
          }
        },
        { id: 'st3', title: 'Good Companies', description: 'What makes them great', duration: '12 min', xp: 35,
          content: {
            intro: "Not all companies are good investments. Let's learn what makes some companies better than others!",
            sections: [
              { title: "Signs of Good Companies", text: "Look for:\n\n💰 Makes money (profitable)\n📈 Growing every year\n🏆 Leader in their industry\n😊 Customers love them\n🧠 Smart management\n💪 Strong brand name", funFact: "Warren Buffett says: 'Buy companies a fool could run, because eventually one will.'" },
              { title: "Products You Know", text: "Good place to start:\n\n🍎 Apple - iPhones, MacBooks\n🎮 Nintendo - Video games\n👟 Nike - Shoes, sports\n🍔 McDonald's - Fast food\n🎬 Disney - Movies, parks\n\nCompanies you use and love!" },
              { title: "What to Avoid", text: "Red flags:\n\n📉 Losing money every year\n💸 Too much debt\n😡 Bad reputation\n🆕 Too new (unproven)\n🎰 'Get rich quick' promises" }
            ],
            quiz: { question: "Good companies to invest in usually...", options: ["Lose money", "Make money and grow", "Are brand new"], correct: 1 },
            activity: "List 5 products you use every day. Research who makes them. Are those good companies?"
          }
        },
        { id: 'st4', title: 'Dividends', description: 'Get paid to own', duration: '10 min', xp: 30,
          content: {
            intro: "Some companies PAY you just for owning their stock. This is called a dividend!",
            sections: [
              { title: "What are Dividends?", text: "Dividends = Cash payments to stock owners\n\n🏢 Company makes profit\n💰 They share some with owners\n📅 Usually paid every 3 months\n🔄 You can reinvest or spend it", funFact: "Some companies have paid dividends for over 100 years straight!" },
              { title: "Dividend Examples", text: "If you own stock paying $1/share yearly:\n\n📊 100 shares = $100/year\n📊 1,000 shares = $1,000/year\n📊 10,000 shares = $10,000/year\n\nFree money just for owning!" },
              { title: "The Power of Reinvesting", text: "When you reinvest dividends:\n\n💵 Get dividend → Buy more shares\n📈 More shares → Bigger dividend next time\n🔄 Repeat forever\n💰 Snowball effect!\n\nThis is how wealth builds passively." }
            ],
            quiz: { question: "What is a dividend?", options: ["A stock price", "Payment to stock owners", "A type of bond"], correct: 1 },
            activity: "Look up 'dividend aristocrats' - companies that have raised dividends for 25+ years!"
          }
        },
      ]},
      { id: 'other', name: 'Other', emoji: '🏠', lessons: [
        { id: 'oi1', title: 'Real Estate', description: 'Own buildings', duration: '10 min', xp: 30,
          content: {
            intro: "Real estate means owning land and buildings. It's one of the oldest ways to build wealth!",
            sections: [
              { title: "Types of Real Estate", text: "You can own:\n\n🏠 Houses - Rent them out\n🏢 Apartments - Multiple units\n🏪 Commercial - Stores, offices\n🏭 Industrial - Warehouses\n🌳 Land - Wait for it to grow in value", funFact: "About 90% of millionaires have invested in real estate!" },
              { title: "How You Make Money", text: "Two ways to profit:\n\n🏠 Rental income - Tenants pay you monthly\n📈 Appreciation - Property value goes up\n\nYou can get BOTH at the same time!" },
              { title: "Starting Without Buying", text: "Can't buy a building yet? Try:\n\n📊 REITs - Real estate investment trusts (buy like stocks)\n👥 Crowdfunding - Pool money with others\n🏦 Real estate funds\n\nOwn real estate with just $100!" }
            ],
            quiz: { question: "How do real estate investors usually make money?", options: ["Rent and appreciation", "Just luck", "Selling quickly"], correct: 0 },
            activity: "Look at houses for sale in your area online. What do they cost? How much would rent be?"
          }
        },
        { id: 'oi2', title: 'Index Funds', description: 'Own the market', duration: '10 min', xp: 30,
          content: {
            intro: "Index funds let you own hundreds of companies at once! It's the easiest way to invest.",
            sections: [
              { title: "What is an Index Fund?", text: "An index fund:\n\n📊 Buys ALL companies in an index (like S&P 500)\n🎯 Matches the market's performance\n💰 Low fees\n🧘 Less stress than picking stocks", funFact: "The S&P 500 index fund has returned about 10% per year on average since 1926!" },
              { title: "Why Index Funds Win", text: "Most professional stock pickers LOSE to index funds!\n\n📈 Diversification - Own 500+ companies\n💸 Low costs - Fees under 0.1%\n⏰ No research needed\n😴 Set it and forget it" },
              { title: "Popular Index Funds", text: "Common ones to know:\n\n🇺🇸 S&P 500 - 500 biggest US companies\n🌍 Total World - All companies globally\n💻 Nasdaq - Tech-heavy\n📊 Total Market - Entire US market" }
            ],
            quiz: { question: "What do index funds do?", options: ["Pick the best stocks", "Buy all stocks in an index", "Only buy one company"], correct: 1 },
            activity: "Look up the S&P 500. What companies are in it? Do you recognize any?"
          }
        },
        { id: 'oi3', title: 'Business', description: 'Best investment', duration: '12 min', xp: 35,
          content: {
            intro: "The best investment might be starting your own business. You control it, you keep the profits!",
            sections: [
              { title: "Why Business is #1", text: "Owning a business can:\n\n💰 Make unlimited income\n🎮 You control everything\n📈 Build real value\n💼 Create jobs for others\n🏆 Leave a legacy", funFact: "Most billionaires got rich by owning businesses, not by working for someone else!" },
              { title: "Business vs Job", text: "Job: Trade time for money (limited)\nBusiness: Build something that makes money (unlimited)\n\n⏰ A job pays you once for your work\n🔄 A business can pay you forever" },
              { title: "Starting Young", text: "Start learning business NOW:\n\n🍋 Lemonade stand basics\n🐕 Pet sitting/dog walking\n💻 Online business\n🎨 Sell crafts or art\n\nEvery big business started small!" }
            ],
            quiz: { question: "Why can business be the best investment?", options: ["It's easy", "Unlimited potential", "No work required"], correct: 1 },
            activity: "Imagine you could start any business. What would it be? Who would your customers be?"
          }
        },
      ]},
    ]
  },

  // ========== BUSINESS ==========
  {
    id: 'business', name: 'Business', emoji: '🏪', accent: 'accent-pink',
    description: 'Start your empire',
    topics: [
      { id: 'entrepreneur', name: 'Entrepreneur', emoji: '🚀',
        topicQuiz: {
          passingScore: 8,
          questions: [
            { question: "What is an entrepreneur?", options: ["Someone who works a regular job", "Someone who creates businesses to solve problems", "Someone who avoids work", "A type of worker"], correct: 1 },
            { question: "Mikaila Ulmer started her lemonade business at age:", options: ["4", "18", "25", "30"], correct: 0 },
            { question: "Every business starts by solving a:", options: ["Game", "Problem", "Puzzle", "Nothing"], correct: 1 },
            { question: "Where do business ideas come from?", options: ["Only adults have them", "Problems you notice in daily life", "They fall from the sky", "You can't have ideas"], correct: 1 },
            { question: "What did Moziah Bridges sell?", options: ["Lemonade", "Bow ties", "Cookies", "Apps"], correct: 1 },
            { question: "Why is failing important for entrepreneurs?", options: ["It's not important", "You learn what doesn't work", "It means you should quit", "Successful people never fail"], correct: 1 },
            { question: "A good business idea should:", options: ["Help no one", "Solve a problem people have", "Be too expensive", "Copy others exactly"], correct: 1 },
            { question: "Kid entrepreneurs prove that:", options: ["Only adults can start businesses", "Age doesn't limit your potential", "Kids should just play", "Business is boring"], correct: 1 },
            { question: "To find a business idea, you should:", options: ["Wait for it to appear", "Look for problems around you", "Copy someone else completely", "Give up"], correct: 1 },
            { question: "The entrepreneurial mindset includes:", options: ["Giving up quickly", "Seeing problems as opportunities", "Avoiding all risk", "Never trying anything new"], correct: 1 }
          ]
        },
        lessons: [
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
        { id: 'en2', title: 'Kid Bosses', description: 'Kids who made it', duration: '10 min', xp: 30,
          content: {
            intro: "Think you're too young to start a business? These kids proved everyone wrong!",
            sections: [
              { title: "Amazing Kid Entrepreneurs", text: "🎀 Moziah Bridges - Age 9: Started Mo's Bows, makes custom bow ties. Now a millionaire with deals on Shark Tank!\n\n🍋 Mikaila Ulmer - Age 4: Started Me & the Bees Lemonade. Sold to Whole Foods nationwide!\n\n📚 Cory Nieves - Age 6: Started Mr. Cory's Cookies. Featured on TV, supplies major stores!", funFact: "There are over 8 million kid entrepreneurs in the world!" },
              { title: "What They Have in Common", text: "All successful kid bosses:\n\n💡 Found a problem to solve\n❤️ Were passionate about it\n💪 Worked hard\n🔄 Learned from mistakes\n🙏 Had supportive family" },
              { title: "You Can Do It Too", text: "Your advantages as a kid:\n\n⏰ Time to learn and fail\n🧠 Fresh ideas adults miss\n😊 People want to support kids\n💸 Low costs to start\n🌟 It's impressive for your future!" }
            ],
            activity: "Research one kid entrepreneur online. What did they start? What can you learn from them?"
          }
        },
        { id: 'en3', title: 'Find Problems', description: 'Business solves problems', duration: '10 min', xp: 30,
          content: {
            intro: "Every successful business solves a PROBLEM. Find a problem, and you've found a business idea!",
            sections: [
              { title: "Problems = Opportunities", text: "When someone says 'I wish...' that's a business!\n\n😫 'I wish someone would walk my dog' → Dog walking business\n😫 'I wish I could find a good tutor' → Tutoring business\n😫 'I wish lawns mowed themselves' → Lawn care business", funFact: "Uber was started because the founders couldn't get a taxi on a snowy night!" },
              { title: "How to Find Problems", text: "Look for:\n\n😤 What annoys people?\n⏰ What takes too long?\n💰 What costs too much?\n🤷 What's confusing?\n🔧 What's broken?\n\nEvery complaint is a business waiting to happen!" },
              { title: "Validating Your Idea", text: "Before starting, ask:\n\n❓ Do enough people have this problem?\n💵 Will they pay to solve it?\n🤔 Can I actually solve it?\n🏃 Am I excited to do this?\n\nTalk to potential customers FIRST!" }
            ],
            quiz: { question: "What does every good business do?", options: ["Makes money fast", "Solves a problem", "Copies others"], correct: 1 },
            activity: "List 5 problems you see around you. Which one could YOU solve?"
          }
        },
        { id: 'en4', title: 'Your Idea', description: 'What will you create', duration: '12 min', xp: 35,
          content: {
            intro: "Time to create YOUR business idea! Let's use everything you've learned.",
            sections: [
              { title: "Brainstorming", text: "Answer these:\n\n🎯 What are you good at?\n❤️ What do you enjoy?\n🔍 What problems do you see?\n👥 Who could you help?\n💪 What would you work on for free?", funFact: "The best businesses combine what you're good at with what people need!" },
              { title: "Your Business Plan", text: "Fill in the blanks:\n\n🎯 My business will: _______\n👥 My customers are: _______\n💡 The problem I solve: _______\n💰 I'll charge: $_______\n🚀 I'll start by: _______" },
              { title: "Taking Action", text: "Don't just plan - DO!\n\n1️⃣ Start SMALL\n2️⃣ Test with friends/family\n3️⃣ Get feedback\n4️⃣ Improve and repeat\n5️⃣ Grow gradually\n\nEvery expert was once a beginner!" }
            ],
            activity: "Complete your business plan above. Share it with a parent. Could you start this week?"
          }
        },
      ]},
      { id: 'start', name: 'Starting', emoji: '🎬',
        topicQuiz: {
          passingScore: 8,
          questions: [
            { question: "What's the first step to starting a business?", options: ["Quit school", "Have an idea that solves a problem", "Get rich first", "Wait until you're old"], correct: 1 },
            { question: "A lemonade stand teaches you about:", options: ["Nothing", "Costs, pricing, and profit", "Just making lemonade", "Being thirsty"], correct: 1 },
            { question: "Profit is:", options: ["How much you spend", "Revenue minus costs", "The price you charge", "Free money"], correct: 1 },
            { question: "Products are things you:", options: ["Borrow", "Sell (physical items)", "Throw away", "Ignore"], correct: 1 },
            { question: "Services are things you:", options: ["Make and keep", "Do for others (actions)", "Buy for yourself", "Don't need"], correct: 1 },
            { question: "Where can you find customers?", options: ["They find themselves", "Neighbors, family, online, local events", "Nowhere", "Only in stores"], correct: 1 },
            { question: "Pricing should cover:", options: ["Just your costs", "Your costs plus profit", "Nothing", "Random amounts"], correct: 1 },
            { question: "The 'Rule of 3' in pricing means:", options: ["Always charge $3", "Charge 3x your costs", "Give 3 free items", "Work 3 hours"], correct: 1 },
            { question: "When starting, you should:", options: ["Start huge", "Start small and learn", "Never start", "Borrow lots of money"], correct: 1 },
            { question: "The best way to learn business is:", options: ["Read only", "Try it and learn from mistakes", "Wait until perfect", "Don't try"], correct: 1 }
          ]
        },
        lessons: [
        { id: 'sb1', title: 'Lemonade Stand', description: 'First business', duration: '10 min', xp: 30,
          content: {
            intro: "The lemonade stand is the perfect first business. Let's learn how to run one profitably!",
            sections: [
              { title: "Why Lemonade?", text: "Perfect starter business because:\n\n💰 Low cost to start ($10-20)\n🍋 Simple product\n☀️ Everyone wants it on hot days\n📍 No special location needed\n👶 Any age can do it", funFact: "Lemonade stands have been a kid business tradition for over 100 years!" },
              { title: "The Numbers", text: "Let's do the math:\n\n🍋 Supplies cost: $10\n🥤 Makes 20 cups\n💰 Cost per cup: 50 cents\n💵 Sell for: $2 per cup\n📈 Profit per cup: $1.50\n🎉 Total profit: $30!", funFact: "That's a 300% markup - way more than most businesses!" },
              { title: "Pro Tips", text: "Make your stand successful:\n\n📍 Busy location (near park, sports)\n🎨 Eye-catching sign\n😊 Be friendly and smile\n☀️ Pick hot days\n🍪 Offer add-ons (cookies!)\n💳 Maybe accept Venmo?" }
            ],
            activity: "Plan a lemonade stand: When? Where? How much will you charge? Make a list of supplies!"
          }
        },
        { id: 'sb2', title: 'Products vs Services', description: 'Sell or do', duration: '10 min', xp: 30,
          content: {
            intro: "Businesses sell PRODUCTS (things) or SERVICES (doing stuff). What's the difference?",
            sections: [
              { title: "Products", text: "Products are THINGS you sell:\n\n🍋 Lemonade\n🎨 Art/Crafts\n🍪 Baked goods\n🧸 Toys you make\n📿 Jewelry\n\n✅ Can sell while you sleep\n❌ Need materials/inventory", funFact: "Digital products (like ebooks or apps) can be sold unlimited times with no extra cost!" },
              { title: "Services", text: "Services are WORK you do:\n\n🐕 Dog walking\n🌿 Lawn mowing\n🧹 Cleaning\n📚 Tutoring\n👶 Babysitting\n\n✅ Start with no money\n❌ Trade time for money" },
              { title: "Which is Better?", text: "Neither! Choose based on:\n\n🎯 Your skills\n⏰ Your available time\n💰 Your startup money\n❤️ What you enjoy\n\nMany businesses do BOTH!" }
            ],
            quiz: { question: "What is a service?", options: ["A thing you sell", "Work you do for someone", "A type of product"], correct: 1 },
            activity: "List 3 products you could make and 3 services you could offer. Which excites you more?"
          }
        },
        { id: 'sb3', title: 'Customers', description: 'Who will buy', duration: '10 min', xp: 30,
          content: {
            intro: "Not everyone will buy your product. The key is finding YOUR people - your target customers!",
            sections: [
              { title: "Who is Your Customer?", text: "Think about:\n\n👤 How old are they?\n📍 Where do they live?\n💰 How much money do they have?\n🤔 What problems do they have?\n❤️ What do they care about?", funFact: "A business that tries to sell to everyone usually sells to no one!" },
              { title: "Finding Customers", text: "Where are your customers?\n\n🏘️ Neighbors - Yard work, pet care\n👨‍👩‍👧 Parents' friends - Babysitting\n🏫 School - Tutoring, crafts\n💻 Online - Worldwide!\n⛪ Community - Events, fairs" },
              { title: "Keeping Customers", text: "Getting new customers is hard. Keep the ones you have!\n\n😊 Do great work\n🙏 Say thank you\n🔄 Ask for repeat business\n📣 Ask for referrals\n💝 Surprise them sometimes" }
            ],
            quiz: { question: "Why should you know your target customer?", options: ["So you can avoid them", "To sell to them better", "For fun"], correct: 1 },
            activity: "For your business idea, describe your PERFECT customer in detail."
          }
        },
        { id: 'sb4', title: 'Pricing', description: 'How much to charge', duration: '12 min', xp: 35,
          content: {
            intro: "Pricing is tricky - too high and nobody buys. Too low and you don't make money!",
            sections: [
              { title: "The Basics", text: "Your price must cover:\n\n💸 Cost of materials/supplies\n⏰ Your time (you deserve pay!)\n📈 Profit (money left over)\n\nFormula: Cost + Time + Profit = Price", funFact: "Most people price too LOW! Don't undervalue yourself!" },
              { title: "Research Others", text: "See what others charge:\n\n🔍 Ask around\n💻 Search online\n📞 Call similar businesses\n\nYou can charge similar OR more if you're better!" },
              { title: "Pricing Psychology", text: "Tricks that work:\n\n💰 $9.99 feels cheaper than $10\n📦 Bundle deals (3 for $25!)\n⭐ Premium option makes others look reasonable\n🆓 Free bonus with purchase\n💵 Round numbers feel premium" }
            ],
            quiz: { question: "Your price should at least cover...", options: ["Just materials", "Materials, time, and profit", "Whatever feels right"], correct: 1 },
            activity: "Price your product/service: Materials + Your time + Profit. What's your final price?"
          }
        },
      ]},
      { id: 'ideas', name: 'Ideas', emoji: '💡',
        topicQuiz: {
          passingScore: 8,
          questions: [
            { question: "Pet sitting is a good kid business because:", options: ["Pets are dangerous", "People need help with their pets", "It pays nothing", "Nobody has pets"], correct: 1 },
            { question: "What skills do you learn from yard work business?", options: ["None", "Hard work, reliability, physical fitness", "How to be lazy", "Video game skills"], correct: 1 },
            { question: "Handmade crafts can be sold:", options: ["Nowhere", "At craft fairs, online, to neighbors", "Only in big stores", "Never"], correct: 1 },
            { question: "Online businesses for kids might include:", options: ["Nothing is possible", "Teaching, art commissions, content creation", "Only adults can do online work", "Hacking"], correct: 1 },
            { question: "What makes a craft business successful?", options: ["Making random things", "Creating something unique that people want", "Copying exactly what others make", "Using expensive materials only"], correct: 1 },
            { question: "Yard work services might include:", options: ["Only mowing", "Mowing, raking, weeding, snow shoveling", "Nothing", "Indoor cleaning only"], correct: 1 },
            { question: "Pet sitting responsibilities include:", options: ["Just playing", "Feeding, walking, keeping pets safe", "Nothing much", "Taking the pet home"], correct: 1 },
            { question: "The best business idea is one where you:", options: ["Hate the work", "Enjoy helping and can charge fairly", "Copy exactly what friends do", "Do something impossible"], correct: 1 },
            { question: "To grow a business, you should:", options: ["Stop working", "Get more customers and improve your service", "Do less work", "Charge nothing"], correct: 1 },
            { question: "Which is TRUE about kid businesses?", options: ["They never work", "They teach real-world skills", "Only rich kids can try", "You need a college degree"], correct: 1 }
          ]
        },
        lessons: [
        { id: 'bi1', title: 'Pet Sitting', description: 'Help with animals', duration: '8 min', xp: 25,
          content: {
            intro: "Love animals? Pet sitting is a great business - and you get paid to play with pets!",
            sections: [
              { title: "What You Can Offer", text: "🐕 Dog walking - Daily walks\n🏠 Pet sitting - Care while owners travel\n🐱 Cat visits - Check in, feed, play\n🧹 Poop scooping - Clean yards\n🛁 Basic grooming - Brushing", funFact: "Americans spend over $100 BILLION on pets each year!" },
              { title: "Getting Started", text: "Steps to start:\n\n1️⃣ Practice with family/friend pets\n2️⃣ Make flyers for neighbors\n3️⃣ Ask for references\n4️⃣ Set your prices\n5️⃣ Get supplies (bags, treats, leash)" },
              { title: "Safety First", text: "Be safe:\n\n👤 Only work with known pets at first\n👨‍👩‍👧 Tell parents where you are\n📱 Have emergency contacts\n🐕 Know basic dog safety\n❌ Don't take aggressive pets" }
            ],
            activity: "Create a pet sitting flyer with your services and prices!"
          }
        },
        { id: 'bi2', title: 'Yard Work', description: 'Help neighbors', duration: '8 min', xp: 25,
          content: {
            intro: "Yard work is one of the most reliable kid businesses. Neighbors always need help!",
            sections: [
              { title: "Services to Offer", text: "🌿 Lawn mowing\n🍂 Raking leaves\n🌸 Weeding gardens\n💧 Watering plants\n❄️ Shoveling snow\n🗑️ Taking out trash bins", funFact: "Lawn care is a $100+ billion industry. There's plenty of room for you!" },
              { title: "Pricing Ideas", text: "Common rates:\n\n🌿 Small lawn: $15-20\n🌿 Medium lawn: $25-35\n🍂 Leaf raking: $10-20/hour\n❄️ Snow shoveling: $20-40/driveway\n\nCharge more for bigger jobs!" },
              { title: "Build Regulars", text: "Best money comes from repeat customers:\n\n📅 Weekly mowing contracts\n🍂 Seasonal cleanup deals\n💰 Monthly billing\n⭐ Great work = referrals" }
            ],
            activity: "Go door to door on your street. Ask if anyone needs yard help. You might find customers today!"
          }
        },
        { id: 'bi3', title: 'Crafts', description: 'Sell what you make', duration: '8 min', xp: 25,
          content: {
            intro: "Are you creative? Turn your hobby into money by selling what you make!",
            sections: [
              { title: "Craft Ideas", text: "Things kids sell:\n\n📿 Jewelry (bracelets, necklaces)\n🎨 Art (paintings, drawings)\n🧶 Knitted/crocheted items\n🕯️ Candles or soap\n📔 Journals/notebooks\n🎄 Holiday decorations", funFact: "Etsy has over 7 million sellers - many started as kids!" },
              { title: "Where to Sell", text: "Selling spots:\n\n🏫 School (craft fairs, friends)\n⛪ Community events\n🏪 Local shops (consignment)\n💻 Online (Etsy, with parent help)\n🏠 Garage sales\n🎄 Holiday markets" },
              { title: "Making Profit", text: "Calculate carefully:\n\n💎 Materials cost: $2\n⏰ Your time: 30 min\n💰 Sell for: $10\n📈 Profit: $8!\n\nChoose crafts that don't take too long to make." }
            ],
            activity: "Pick a craft you can make. Calculate: supplies cost + time = what price should you charge?"
          }
        },
        { id: 'bi4', title: 'Online', description: 'Sell on internet', duration: '10 min', xp: 30,
          content: {
            intro: "The internet lets you reach customers ANYWHERE in the world. Here's how kids can sell online!",
            sections: [
              { title: "Online Business Ideas", text: "Digital businesses:\n\n🎮 Game streaming (YouTube/Twitch)\n📹 YouTube videos\n📚 Tutoring via Zoom\n🎨 Digital art commissions\n📝 Writing/blogging\n💻 Coding simple websites", funFact: "Ryan Kaji made $30 million on YouTube at age 9!" },
              { title: "Getting Started", text: "With parent help:\n\n📱 Start a social media (Instagram/TikTok)\n🛒 Open an Etsy shop\n💻 Make a simple website\n📧 Build an email list\n🎥 Start a YouTube channel" },
              { title: "Online Safety", text: "IMPORTANT rules:\n\n👨‍👩‍👧 Parents must help with accounts\n🚫 Never share personal info\n📍 Don't reveal your location\n💬 Be careful in comments\n🚨 Tell adults if something's wrong" }
            ],
            quiz: { question: "What's a key rule for kids online?", options: ["Share everything", "Get parent help", "Work alone"], correct: 1 },
            activity: "With a parent, explore one online platform. What could you create/sell there?"
          }
        },
      ]},
    ]
  },

  // ========== LIFE SKILLS ==========
  {
    id: 'lifeskills', name: 'Life Skills', emoji: '🏆', accent: 'accent-amber',
    description: 'Skills for success',
    topics: [
      { id: 'goals', name: 'Goals', emoji: '🎯',
        topicQuiz: {
          passingScore: 8,
          questions: [
            { question: "What does SMART stand for in goal-setting?", options: ["Super, Magical, Amazing, Real, True", "Specific, Measurable, Achievable, Relevant, Time-bound", "Small, Medium, Average, Regular, Tiny", "Start, Move, Act, Run, Try"], correct: 1 },
            { question: "Why should you write down your goals?", options: ["To waste paper", "You're more likely to achieve them", "It's required", "Goals don't need writing"], correct: 1 },
            { question: "How do you achieve big goals?", options: ["All at once", "Break them into small steps", "Just hope", "Wait for luck"], correct: 1 },
            { question: "What's a good daily habit for reaching goals?", options: ["Skip it when tired", "Take small action daily", "Only work on weekends", "Think about it but don't act"], correct: 1 },
            { question: "What should you do when you want to quit?", options: ["Give up immediately", "Remember your WHY and take one more step", "Blame others", "Start something new"], correct: 1 },
            { question: "A 'dream big' mindset means:", options: ["Being unrealistic", "Believing you can achieve amazing things", "Daydreaming all day", "Not setting goals"], correct: 1 },
            { question: "Progress tracking helps because:", options: ["It wastes time", "You can see how far you've come", "It's fun to draw", "Goals track themselves"], correct: 1 },
            { question: "The Ladder Method is:", options: ["Using actual ladders", "Creating stepping stones to your goal", "Climbing buildings", "A game"], correct: 1 },
            { question: "Who are accountability buddies?", options: ["People who judge you", "Friends who help you stay on track", "Strangers", "Nobody important"], correct: 1 },
            { question: "Growth mindset means believing:", options: ["You can't change", "Failure teaches you what to try next", "Smart people don't fail", "Give up when it's hard"], correct: 1 }
          ]
        },
        lessons: [
        { id: 'gl1', title: 'Dream Big', description: 'What do you want', duration: '8 min', xp: 20,
          content: {
            intro: "Before you can achieve great things, you have to DREAM great things! Let's unlock your imagination.",
            sections: [
              { title: "Why Dream Big?", text: "Big dreams:\n\n🚀 Push you to grow\n🔥 Give you motivation\n🧠 Change how you think\n🌟 Make life exciting\n💪 Help you reach higher", funFact: "Every amazing achievement started as someone's 'crazy' dream!" },
              { title: "What Do You Want?", text: "Dream about:\n\n🎯 What you want to BE\n🌍 Where you want to GO\n🏆 What you want to ACHIEVE\n💰 What you want to HAVE\n❤️ Who you want to HELP", funFact: "Astronaut Mae Jemison dreamed of space as a child - and became the first Black woman in space!" },
              { title: "No Limits... Yet", text: "When dreaming:\n\n🚫 Don't think about HOW\n🚫 Don't think about money\n🚫 Don't think about time\n\nJust DREAM. We'll figure out the 'how' later!" }
            ],
            activity: "Write down 10 dreams - big, small, wild, anything. Don't edit yourself. Just dream!"
          }
        },
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
        { id: 'gl3', title: 'Break It Down', description: 'Small steps', duration: '10 min', xp: 25,
          content: {
            intro: "Big goals can feel overwhelming. The secret? Break them into tiny, doable steps!",
            sections: [
              { title: "Chunk It Up", text: "Big Goal: Read 12 books this year\n\n📚 That's 1 book per month\n📖 That's about 10 pages per day\n👀 That's just 15 minutes of reading!\n\nSuddenly it's easy!", funFact: "You can eat an elephant one bite at a time! (Not really - elephants are friends)" },
              { title: "The Ladder Method", text: "Create stepping stones:\n\n🎯 GOAL: Learn guitar\n📌 Step 1: Get a guitar\n📌 Step 2: Learn 3 chords\n📌 Step 3: Play a simple song\n📌 Step 4: Learn more chords\n📌 Step 5: Play harder songs\n\nOne step at a time!" },
              { title: "Daily Actions", text: "Every goal needs DAILY habits:\n\n💪 Fitness goal → Exercise 10 min/day\n📚 Learning goal → Study 20 min/day\n💰 Savings goal → Save $1/day\n\nSmall daily actions = Big yearly results!" }
            ],
            quiz: { question: "How do you achieve big goals?", options: ["All at once", "Break into small steps", "Just wish for it"], correct: 1 },
            activity: "Take one of your big dreams. Break it into 5 smaller steps. What's step 1?"
          }
        },
        { id: 'gl4', title: 'Stay Motivated', description: 'Keep going', duration: '10 min', xp: 25,
          content: {
            intro: "Starting is easy. Finishing is hard. Here's how to stay motivated when it gets tough!",
            sections: [
              { title: "Why We Quit", text: "People give up because:\n\n😴 It gets boring\n😰 It gets hard\n⏰ Results take too long\n🎯 Goal seems too far\n💔 Fear of failure", funFact: "Most people quit just before they would have succeeded!" },
              { title: "Stay Motivated", text: "Tricks that work:\n\n📊 Track your progress visually\n🎉 Celebrate small wins\n👥 Find an accountability buddy\n📸 Remember your WHY\n🎁 Reward yourself at milestones" },
              { title: "When You Want to Quit", text: "Ask yourself:\n\n🤔 Why did I start?\n⏰ How far have I come?\n😢 How will I feel if I quit?\n🏆 How will I feel if I succeed?\n\nThen take ONE more small step." }
            ],
            activity: "Create a progress tracker for a goal. Put it where you'll see it every day!"
          }
        },
      ]},
      { id: 'problems', name: 'Problem Solving', emoji: '🧩',
        topicQuiz: {
          passingScore: 8,
          questions: [
            { question: "What should you do FIRST when facing a problem?", options: ["Panic", "Understand it clearly", "Ignore it", "Blame someone"], correct: 1 },
            { question: "How many solutions should you brainstorm?", options: ["Just 1", "At least 10", "None", "Only 2"], correct: 1 },
            { question: "What's the rule during brainstorming?", options: ["Judge every idea harshly", "No bad ideas - write them all", "Only accept perfect ideas", "Don't share ideas"], correct: 1 },
            { question: "How do you pick the best solution?", options: ["Random guess", "Evaluate and compare options", "Always pick the first one", "Ask a coin"], correct: 1 },
            { question: "After a mistake, you should:", options: ["Give up forever", "Learn from it", "Pretend it didn't happen", "Blame others"], correct: 1 },
            { question: "Growth mindset says failure is:", options: ["The end", "A learning opportunity", "Shameful", "Permanent"], correct: 1 },
            { question: "Einstein said he'd spend 55 minutes:", options: ["Solving the problem", "Understanding the problem", "Taking a break", "Giving up"], correct: 1 },
            { question: "The 'Learning Loop' includes:", options: ["What happened, why, what I learned", "Forget and move on", "Blame and complain", "Give up quickly"], correct: 0 },
            { question: "Why evaluate multiple solutions?", options: ["It's required by law", "Better chance of finding a great one", "To waste time", "Solutions are all the same"], correct: 1 },
            { question: "The best problem solvers:", options: ["Never make mistakes", "Learn from every attempt", "Work alone always", "Give up early"], correct: 1 }
          ]
        },
        lessons: [
        { id: 'ps1', title: 'Identify', description: "What's wrong", duration: '8 min', xp: 20,
          content: {
            intro: "You can't fix a problem until you really understand it. Let's learn to identify problems clearly!",
            sections: [
              { title: "Find the Real Problem", text: "Often what we THINK is the problem isn't the REAL problem:\n\n😡 'I'm bad at math' → Real problem: Need more practice\n😤 'My friend is mean' → Real problem: Miscommunication\n💸 'I never have money' → Real problem: Spending too fast", funFact: "Einstein said: 'If I had an hour to solve a problem, I'd spend 55 minutes understanding it.'" },
              { title: "Ask Questions", text: "Dig deeper by asking:\n\n❓ WHAT exactly is wrong?\n❓ WHEN did it start?\n❓ WHERE does it happen?\n❓ WHO is involved?\n❓ WHY is this a problem?\n❓ HOW bad is it really?" },
              { title: "Write It Down", text: "Put the problem in words:\n\n📝 'I struggle with ___ because ___'\n📝 'The problem is ___, which causes ___'\n📝 'I want ___ but ___ is in the way'\n\nClarity is power!" }
            ],
            quiz: { question: "What should you do first when solving a problem?", options: ["Act fast", "Understand it clearly", "Ignore it"], correct: 1 },
            activity: "Think of a problem you have. Write it down clearly using the questions above."
          }
        },
        { id: 'ps2', title: 'Solutions', description: 'Many ways to fix', duration: '10 min', xp: 25,
          content: {
            intro: "There's NEVER just one solution. The more options you create, the better your answer will be!",
            sections: [
              { title: "Brainstorm Freely", text: "Rules for brainstorming:\n\n🚫 No bad ideas\n🚫 Don't judge yet\n✅ Quantity over quality\n✅ Build on others' ideas\n✅ Get wild and creative\n\nAim for at least 10 possible solutions!", funFact: "The first idea is rarely the best idea. Keep going!" },
              { title: "Solution Types", text: "Think about different approaches:\n\n🔨 Direct fix - Attack the problem head-on\n🔄 Work around - Avoid the problem entirely\n✂️ Remove - Eliminate what causes it\n🤝 Get help - Ask someone who knows\n⏰ Wait - Sometimes time fixes things" },
              { title: "The More the Better", text: "With 10 solutions:\n\n📊 You have OPTIONS\n🎯 Better chance of finding great one\n🧠 You think more creatively\n💪 You feel more in control" }
            ],
            activity: "Take your problem from last lesson. Brainstorm 10 possible solutions. Don't judge - just list!"
          }
        },
        { id: 'ps3', title: 'Pick Best', description: 'Choose wisely', duration: '10 min', xp: 25,
          content: {
            intro: "Now you have solutions. But which one is BEST? Let's learn to choose wisely!",
            sections: [
              { title: "Evaluate Each Option", text: "For each solution, ask:\n\n✅ Will it actually work?\n⏰ How long will it take?\n💰 What does it cost?\n😰 What could go wrong?\n🎯 Does it solve the REAL problem?", funFact: "Smart people make pros and cons lists for big decisions!" },
              { title: "The Decision Matrix", text: "Rate each solution 1-10 on:\n\n🎯 Effectiveness\n⏰ Speed\n💰 Cost\n😊 Ease\n\nAdd up scores. Highest wins!", funFact: "Writing it down removes emotion and shows the logical choice." },
              { title: "Trust Your Gut", text: "After analysis, check your gut:\n\n😊 Does this feel right?\n💪 Am I excited to try it?\n😰 Am I avoiding something?\n\nSometimes intuition knows best!" }
            ],
            quiz: { question: "How do you pick the best solution?", options: ["Random guess", "First one you thought of", "Evaluate and compare"], correct: 2 },
            activity: "Rate your 10 solutions from before. Which one scores highest? That's your plan!"
          }
        },
        { id: 'ps4', title: 'Learn', description: 'From mistakes', duration: '10 min', xp: 25,
          content: {
            intro: "Mistakes aren't failures - they're lessons! The best problem solvers LEARN from what went wrong.",
            sections: [
              { title: "Mistakes Are Teachers", text: "Every mistake teaches:\n\n📚 What DOESN'T work\n🧠 New information\n💪 How to be stronger\n🔍 What to try differently\n\nNo successful person avoided all mistakes!", funFact: "Thomas Edison tried 10,000 ways to make a lightbulb. He said: 'I found 10,000 ways that don't work!'" },
              { title: "The Learning Loop", text: "After every attempt:\n\n1️⃣ What happened?\n2️⃣ Why did it happen?\n3️⃣ What did I learn?\n4️⃣ What will I do differently?\n5️⃣ Try again!" },
              { title: "Growth Mindset", text: "Two types of thinking:\n\n❌ Fixed: 'I failed. I'm not good at this.'\n✅ Growth: 'I failed. Now I know what to try next!'\n\nChoose growth. Always." }
            ],
            quiz: { question: "What should you do after a mistake?", options: ["Give up", "Learn from it", "Pretend it didn't happen"], correct: 1 },
            activity: "Think of a recent mistake. What did you learn? What will you do differently next time?"
          }
        },
      ]},
      { id: 'communicate', name: 'Communication', emoji: '🗣️',
        topicQuiz: {
          passingScore: 8,
          questions: [
            { question: "What's the difference between hearing and listening?", options: ["Same thing", "Listening means you understand and care", "Hearing is harder", "No difference"], correct: 1 },
            { question: "Active listening includes:", options: ["Interrupting often", "Making eye contact and asking questions", "Looking at your phone", "Thinking about other things"], correct: 1 },
            { question: "THINK before speaking means checking if it's:", options: ["Tall, Heavy, Itchy, Narrow, Kind", "True, Helpful, Inspiring, Necessary, Kind", "Tiny, Hard, Interesting, New, Cool", "None of these"], correct: 1 },
            { question: "Kind words can:", options: ["Only hurt people", "Lift someone up and give courage", "Don't matter at all", "Make you weak"], correct: 1 },
            { question: "When frustrated, you should:", options: ["Say whatever you feel", "Take a breath first and think", "Yell loudly", "Blame others"], correct: 1 },
            { question: "Good listeners:", options: ["Have fewer friends", "Have better relationships", "Don't need to practice", "Always interrupt"], correct: 1 },
            { question: "Clear speaking includes:", options: ["Mumbling quietly", "Knowing your main point and speaking clearly", "Using big confusing words", "Talking as fast as possible"], correct: 1 },
            { question: "Why practice speaking?", options: ["It's required", "You get better and more confident", "It doesn't help", "To annoy others"], correct: 1 },
            { question: "People remember how you made them:", options: ["Look", "Feel", "Smell", "Sound"], correct: 1 },
            { question: "Genuine compliments:", options: ["Are fake and useless", "Make people feel valued", "Should never be given", "Are always wrong"], correct: 1 }
          ]
        },
        lessons: [
        { id: 'cm1', title: 'Listening', description: 'Really hear', duration: '8 min', xp: 20,
          content: {
            intro: "Listening is a SUPERPOWER. People who listen well have better relationships and learn faster!",
            sections: [
              { title: "Hearing vs Listening", text: "🔊 Hearing: Sound goes in your ears\n👂 Listening: You understand and care\n\nBig difference!\n\nMost people hear but don't really LISTEN.", funFact: "We remember only about 25% of what we hear. Active listening improves this dramatically!" },
              { title: "Active Listening", text: "How to really listen:\n\n👀 Make eye contact\n📵 Put away distractions\n🤐 Don't interrupt\n🤔 Think about what they're saying\n❓ Ask follow-up questions\n🔄 Repeat back to confirm" },
              { title: "Why It Matters", text: "Good listeners:\n\n🤝 Have better friendships\n📚 Learn more in school\n💼 Succeed at work\n❤️ Make people feel valued\n🧠 Remember more information" }
            ],
            quiz: { question: "What's the difference between hearing and listening?", options: ["Same thing", "Listening means you understand and care", "Hearing is better"], correct: 1 },
            activity: "Next conversation, try active listening. Make eye contact, don't interrupt, and ask a question!"
          }
        },
        { id: 'cm2', title: 'Speaking', description: 'Say what you mean', duration: '8 min', xp: 20,
          content: {
            intro: "Clear speaking helps people understand you. It's a skill you can practice!",
            sections: [
              { title: "Be Clear", text: "Tips for clear speaking:\n\n🎯 Know your main point\n📝 Keep it simple\n🐌 Speak slowly enough\n🔊 Speak loudly enough\n👀 Make eye contact\n😊 Use friendly body language", funFact: "People judge confidence by how clearly and calmly you speak!" },
              { title: "THINK Before Speaking", text: "Ask yourself:\n\n✅ T - Is it TRUE?\n✅ H - Is it HELPFUL?\n✅ I - Is it INSPIRING?\n✅ N - Is it NECESSARY?\n✅ K - Is it KIND?\n\nIf not, maybe don't say it!" },
              { title: "Practice Makes Better", text: "Get better at speaking:\n\n🪞 Practice in front of mirror\n📹 Record yourself\n🎭 Join drama or debate club\n👥 Speak up in class\n📖 Read out loud daily" }
            ],
            activity: "Practice explaining your favorite game/show to a parent. Can you be clear in under 1 minute?"
          }
        },
        { id: 'cm3', title: 'Kindness', description: 'Kind words matter', duration: '8 min', xp: 20,
          content: {
            intro: "Your words have POWER. They can lift someone up or tear them down. Choose kindness!",
            sections: [
              { title: "Words Have Power", text: "Words can:\n\n😊 Make someone's day\n💪 Give courage to try\n❤️ Show love and care\n😢 Or... hurt deeply\n😰 Or... destroy confidence\n\nChoose wisely!", funFact: "People remember how you made them FEEL long after they forget what you said." },
              { title: "Kind Words to Use", text: "Powerful phrases:\n\n'Thank you for...'\n'I appreciate you because...'\n'You're really good at...'\n'I'm proud of you for...'\n'You inspire me when...'\n'I believe in you!'" },
              { title: "When It's Hard", text: "Even when frustrated:\n\n😤 Take a breath first\n🤔 Think before speaking\n💭 'How would I feel?'\n🔄 Find a kind way to say it\n❌ Never say something you can't take back" }
            ],
            quiz: { question: "Why should you choose kind words?", options: ["To be fake", "Words have power to help or hurt", "It doesn't matter"], correct: 1 },
            activity: "Give 3 genuine compliments today. Notice how people react!"
          }
        },
      ]},
      { id: 'time', name: 'Time', emoji: '⏰',
        topicQuiz: {
          passingScore: 8,
          questions: [
            { question: "When should you plan your day?", options: ["Never", "Morning or night before", "Only on birthdays", "After everything is done"], correct: 1 },
            { question: "People who plan their day are:", options: ["Wasting time", "2x more likely to reach their goals", "Less productive", "Boring"], correct: 1 },
            { question: "What's the difference between urgent and important?", options: ["Same thing", "Urgent needs attention now, important matters for goals", "Important is louder", "Urgent can wait forever"], correct: 1 },
            { question: "'Eat the frog' means:", options: ["Have breakfast first", "Do the hardest task first", "Eat actual frogs", "Skip hard work"], correct: 1 },
            { question: "What's the Pomodoro Technique?", options: ["Eating tomatoes", "25 min work, 5 min break cycles", "Working non-stop", "Taking only breaks"], correct: 1 },
            { question: "After a distraction, how long to fully refocus?", options: ["1 minute", "23 minutes", "5 seconds", "No time at all"], correct: 1 },
            { question: "To focus better, you should:", options: ["Keep phone nearby", "Put phone in another room", "Check it every minute", "Leave notifications on"], correct: 1 },
            { question: "What should you do FIRST with tasks?", options: ["Easy stuff", "Important stuff", "Fun stuff", "Nothing"], correct: 1 },
            { question: "Short work bursts help because:", options: ["They're lazy", "They improve focus", "They waste time", "They don't help"], correct: 1 },
            { question: "Planning helps you feel:", options: ["More stressed", "Less stressed and in control", "Confused", "Tired"], correct: 1 }
          ]
        },
        lessons: [
        { id: 'tm1', title: 'Plan Your Day', description: 'Be organized', duration: '10 min', xp: 25,
          content: {
            intro: "Planning your day helps you get MORE done and feel LESS stressed. Let's learn how!",
            sections: [
              { title: "Why Plan?", text: "Without a plan:\n\n😵 You forget things\n⏰ You waste time deciding\n😫 Important stuff doesn't get done\n😰 You feel stressed\n\nWith a plan: You're in control!", funFact: "People who plan their day are 2x more likely to reach their goals!" },
              { title: "Morning Planning", text: "Each morning (or night before):\n\n1️⃣ List what needs to be done\n2️⃣ Pick the TOP 3 most important\n3️⃣ Schedule time for each\n4️⃣ Leave buffer time for surprises\n5️⃣ Include fun too!" },
              { title: "Your Schedule", text: "Simple daily plan:\n\n🌅 Morning routine (7-8am)\n📚 School/Learning (8am-3pm)\n🏃 Activity/sports (3-5pm)\n📝 Homework (5-6pm)\n🍽️ Family time (6-8pm)\n🎮 Free time (8-9pm)\n😴 Sleep!" }
            ],
            quiz: { question: "When should you plan your day?", options: ["Never", "Morning or night before", "Only on weekends"], correct: 1 },
            activity: "Write out tomorrow's plan tonight. Follow it and see how it feels!"
          }
        },
        { id: 'tm2', title: 'Prioritize', description: 'Important first', duration: '10 min', xp: 25,
          content: {
            intro: "Not everything is equally important. Learn to do important things FIRST!",
            sections: [
              { title: "Urgent vs Important", text: "Two types of tasks:\n\n🚨 Urgent: Needs attention NOW (alarm, phone)\n⭐ Important: Matters for your goals (studying, health)\n\nUrgent isn't always important!\nImportant isn't always urgent!", funFact: "Most people spend all day on urgent things and never do important things!" },
              { title: "The Priority Matrix", text: "Four categories:\n\n1️⃣ Urgent + Important → Do FIRST\n2️⃣ Important not Urgent → Schedule it\n3️⃣ Urgent not Important → Can someone else do it?\n4️⃣ Neither → Don't do it!" },
              { title: "Eat the Frog", text: "Mark Twain said: 'Eat a live frog first thing in the morning and nothing worse will happen the rest of the day.'\n\n🐸 = Your hardest task\n\nDo the hard thing FIRST, when you have the most energy!" }
            ],
            quiz: { question: "What should you do first?", options: ["Easy stuff", "Important stuff", "Fun stuff"], correct: 1 },
            activity: "List everything you need to do. Star the 3 most important. Do those first tomorrow!"
          }
        },
        { id: 'tm3', title: 'Focus', description: 'Avoid distractions', duration: '10 min', xp: 25,
          content: {
            intro: "In a world of distractions, FOCUS is a superpower. Here's how to build it!",
            sections: [
              { title: "The Distraction Problem", text: "Modern distractions:\n\n📱 Phone notifications\n💻 Social media\n🎮 Video games\n📺 TV/YouTube\n👥 Friends/texting\n\nEvery distraction breaks your focus!", funFact: "After a distraction, it takes 23 minutes to fully refocus!" },
              { title: "Create Focus", text: "How to focus better:\n\n📱 Phone in another room\n🔕 Notifications OFF\n⏱️ Set a timer (25 min work, 5 min break)\n🎯 One thing at a time\n📍 Dedicated work spot\n🎵 Maybe focus music/white noise" },
              { title: "The Pomodoro Technique", text: "Popular focus method:\n\n🍅 Work for 25 minutes\n☕ Break for 5 minutes\n🔄 Repeat 4 times\n🎉 Take a longer 15-30 min break\n\nShort bursts = better focus!" }
            ],
            quiz: { question: "What should you do with your phone while working?", options: ["Keep it close", "Put it in another room", "Check it every 5 minutes"], correct: 1 },
            activity: "Try the Pomodoro technique! Set a timer for 25 min, work with no distractions, then take a break."
          }
        },
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
  const [masteredTopics, setMasteredTopics] = useState<string[]>([]);
  const [streak, setStreak] = useState(3);
  const [showCelebration, setShowCelebration] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  // Topic Quiz State
  const [showTopicQuiz, setShowTopicQuiz] = useState(false);
  const [topicQuizAnswers, setTopicQuizAnswers] = useState<(number | null)[]>([]);
  const [topicQuizCurrentQ, setTopicQuizCurrentQ] = useState(0);
  const [topicQuizComplete, setTopicQuizComplete] = useState(false);
  const [topicQuizScore, setTopicQuizScore] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('futurekids-progress');
    if (saved) {
      const data = JSON.parse(saved);
      setXp(data.xp || 0);
      setLevel(data.level || 1);
      setCompletedLessons(data.completedLessons || []);
      setMasteredTopics(data.masteredTopics || []);
      setStreak(data.streak || 3);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('futurekids-progress', JSON.stringify({ xp, level, completedLessons, masteredTopics, streak }));
  }, [xp, level, completedLessons, masteredTopics, streak]);

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

  // Start Topic Quiz
  const startTopicQuiz = () => {
    if (!selectedTopic?.topicQuiz) return;
    setTopicQuizAnswers(new Array(selectedTopic.topicQuiz.questions.length).fill(null));
    setTopicQuizCurrentQ(0);
    setTopicQuizComplete(false);
    setTopicQuizScore(0);
    setShowTopicQuiz(true);
  };

  // Submit Topic Quiz Answer
  const submitTopicQuizAnswer = (answerIdx: number) => {
    if (!selectedTopic?.topicQuiz) return;
    const newAnswers = [...topicQuizAnswers];
    newAnswers[topicQuizCurrentQ] = answerIdx;
    setTopicQuizAnswers(newAnswers);
  };

  // Next Question or Finish
  const nextTopicQuestion = () => {
    if (!selectedTopic?.topicQuiz) return;
    if (topicQuizCurrentQ < selectedTopic.topicQuiz.questions.length - 1) {
      setTopicQuizCurrentQ(topicQuizCurrentQ + 1);
    } else {
      // Calculate score
      let score = 0;
      selectedTopic.topicQuiz.questions.forEach((q, i) => {
        if (topicQuizAnswers[i] === q.correct) score++;
      });
      setTopicQuizScore(score);
      setTopicQuizComplete(true);
      
      // Check if passed
      if (score >= selectedTopic.topicQuiz.passingScore && !masteredTopics.includes(selectedTopic.id)) {
        setMasteredTopics([...masteredTopics, selectedTopic.id]);
        const bonusXp = 100;
        setXp(xp + bonusXp);
      }
    }
  };

  // Exit Topic Quiz
  const exitTopicQuiz = () => {
    setShowTopicQuiz(false);
    setTopicQuizAnswers([]);
    setTopicQuizCurrentQ(0);
    setTopicQuizComplete(false);
  };

  // Celebration - More fun!
  if (showCelebration) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
        <div className="stars">
          <span className="star" style={{top: '10%', left: '10%'}}>⭐</span>
          <span className="star" style={{top: '20%', left: '80%', animationDelay: '0.5s'}}>🌟</span>
          <span className="star" style={{top: '70%', left: '20%', animationDelay: '1s'}}>✨</span>
          <span className="star" style={{top: '60%', left: '70%', animationDelay: '0.3s'}}>⭐</span>
          <span className="star" style={{top: '40%', left: '50%', animationDelay: '0.8s'}}>🌟</span>
        </div>
        <div className="text-center celebrate">
          <div className="text-8xl mb-6 animate-bounce-slow">🎉</div>
          <h1 className="font-display text-5xl text-[#9B59B6] mb-4">LEVEL UP!</h1>
          <div className="level-badge mx-auto mb-6" style={{width: '100px', height: '100px', fontSize: '2.5rem'}}>
            {level}
          </div>
          <p className="text-xl text-[#7F8C8D]">You&apos;re now Level {level}!</p>
          <p className="text-[#7F8C8D] mt-4 text-lg">Keep going, superstar! 🌟</p>
        </div>
      </div>
    );
  }

  // Topic Quiz View - 10 Question Challenge!
  if (showTopicQuiz && selectedTopic?.topicQuiz) {
    const quiz = selectedTopic.topicQuiz;
    const currentQuestion = quiz.questions[topicQuizCurrentQ];
    const currentAnswer = topicQuizAnswers[topicQuizCurrentQ];
    const passed = topicQuizScore >= quiz.passingScore;

    if (topicQuizComplete) {
      return (
        <div className="min-h-screen pb-8">
          <header className="bg-gradient-to-r from-[#9B59B6] to-[#E74C3C] text-white px-6 py-4">
            <div className="max-w-lg mx-auto">
              <h1 className="font-display text-2xl text-center">Quiz Complete!</h1>
            </div>
          </header>
          <main className="max-w-lg mx-auto px-6 py-8">
            <div className={`fun-card p-8 text-center ${passed ? 'bg-gradient-to-br from-[#D5F4E6] to-[#A3E4BC]' : 'bg-gradient-to-br from-[#FADBD8] to-[#F5B7B1]'}`}>
              <span className="text-8xl block mb-4">{passed ? '🏆' : '📚'}</span>
              <h1 className="font-display text-4xl text-[#2C3E50] mb-4">
                {passed ? 'YOU PASSED!' : 'Keep Learning!'}
              </h1>
              <p className="text-2xl font-bold mb-4">
                Score: {topicQuizScore} / {quiz.questions.length}
              </p>
              <p className="text-lg text-[#7F8C8D] mb-6">
                {passed 
                  ? `Amazing! You've mastered ${selectedTopic.name}! +100 XP bonus!` 
                  : `You need ${quiz.passingScore} correct to pass. Review the lessons and try again!`}
              </p>
              <div className="space-y-3">
                {passed ? (
                  <button onClick={exitTopicQuiz} className="btn-fun btn-fun-green w-full">
                    Continue Learning 🚀
                  </button>
                ) : (
                  <>
                    <button onClick={() => { setTopicQuizComplete(false); setTopicQuizCurrentQ(0); setTopicQuizAnswers(new Array(quiz.questions.length).fill(null)); }} className="btn-fun w-full">
                      Try Again 🔄
                    </button>
                    <button onClick={exitTopicQuiz} className="btn-fun btn-fun-red w-full">
                      Back to Lessons 📖
                    </button>
                  </>
                )}
              </div>
            </div>
          </main>
        </div>
      );
    }

    return (
      <div className="min-h-screen pb-8">
        <header className="bg-gradient-to-r from-[#E74C3C] to-[#F39C12] text-white px-6 py-4">
          <div className="max-w-lg mx-auto flex items-center justify-between">
            <button onClick={exitTopicQuiz} className="flex items-center gap-2 font-bold">
              <span className="text-xl">✕</span>
            </button>
            <div className="text-center">
              <p className="font-bold text-lg">{selectedTopic.name} Quiz</p>
              <p className="text-sm opacity-80">Question {topicQuizCurrentQ + 1} of {quiz.questions.length}</p>
            </div>
            <div className="w-10" />
          </div>
        </header>

        {/* Progress dots */}
        <div className="bg-white py-4 shadow-sm">
          <div className="max-w-lg mx-auto px-6">
            <div className="flex justify-center gap-2">
              {quiz.questions.map((_, i) => (
                <div 
                  key={i} 
                  className={`w-4 h-4 rounded-full transition-all ${
                    i === topicQuizCurrentQ 
                      ? 'bg-[#E74C3C] scale-125' 
                      : topicQuizAnswers[i] !== null 
                        ? 'bg-[#2ECC71]' 
                        : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <main className="max-w-lg mx-auto px-6 py-6">
          <div className="fun-card p-6 mb-6">
            <div className="text-center mb-6">
              <span className="text-5xl block mb-4">🧠</span>
              <p className="text-xl font-bold text-[#2C3E50]">{currentQuestion.question}</p>
            </div>
            <div className="space-y-3">
              {currentQuestion.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => submitTopicQuizAnswer(idx)}
                  className={`quiz-option w-full text-lg ${currentAnswer === idx ? 'selected' : ''}`}
                >
                  <span className="inline-block w-8 h-8 rounded-full bg-[#3498DB] text-white font-bold mr-3 text-center leading-8">
                    {['A', 'B', 'C', 'D'][idx]}
                  </span>
                  {option}
                </button>
              ))}
            </div>
          </div>

          {currentAnswer !== null && (
            <button onClick={nextTopicQuestion} className="btn-fun btn-fun-green w-full text-xl">
              {topicQuizCurrentQ === quiz.questions.length - 1 ? 'Finish Quiz! 🎯' : 'Next Question →'}
            </button>
          )}
        </main>
      </div>
    );
  }

  // Lesson View (with content!) - Colorful & Fun!
  if (selectedLesson && selectedTopic && selectedWorld) {
    const isComplete = completedLessons.includes(selectedLesson.id);
    const content = selectedLesson.content;
    const colors = ['#E74C3C', '#3498DB', '#2ECC71', '#9B59B6', '#F39C12', '#1ABC9C'];
    
    return (
      <div className="min-h-screen pb-8">
        {/* Colorful Header */}
        <header className="bg-gradient-to-r from-[#3498DB] to-[#9B59B6] text-white px-6 py-4 sticky top-0 z-10 shadow-lg">
          <div className="max-w-lg mx-auto flex items-center justify-between">
            <button onClick={() => { setSelectedLesson(null); resetQuiz(); }} className="flex items-center gap-2 font-bold hover:scale-105 transition-transform">
              <span className="text-2xl">←</span> Back
            </button>
            <div className="xp-badge">+{selectedLesson.xp} XP</div>
          </div>
        </header>

        <main className="max-w-lg mx-auto px-6 py-6">
          {/* Lesson Title Card */}
          <div className="fun-card p-6 mb-6 text-center">
            <span className="emoji-visual block mb-4">{selectedTopic.emoji}</span>
            <h1 className="font-display text-3xl text-[#2C3E50] mb-2">{selectedLesson.title}</h1>
            <p className="text-[#7F8C8D] text-lg">{selectedLesson.description}</p>
          </div>

          {/* Content */}
          {content ? (
            <div className="space-y-6">
              {/* Intro Box */}
              <div className="info-box info-box-blue">
                <span className="info-box-title">📚 Let&apos;s Learn!</span>
                <p className="text-[#2C3E50] text-lg leading-relaxed pt-2">{content.intro}</p>
              </div>

              {/* Sections - Each with different color */}
              {content.sections.map((section, idx) => (
                <div key={idx} className={`info-box ${idx % 2 === 0 ? 'info-box-green' : 'info-box-purple'}`}>
                  <span className="info-box-title">{section.title}</span>
                  <div className="pt-4">
                    <p className="text-[#2C3E50] leading-relaxed whitespace-pre-line text-lg">{section.text}</p>
                    {section.funFact && (
                      <div className="fun-fact mt-4">
                        <p className="text-[#2C3E50] font-medium">
                          <span className="text-lg">Fun Fact: </span>{section.funFact}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Quiz - More colorful */}
              {content.quiz && (
                <div className="fun-card p-6">
                  <div className="text-center mb-6">
                    <span className="text-5xl block mb-2">🧠</span>
                    <h2 className="font-display text-2xl text-[#E74C3C]">Quiz Time!</h2>
                  </div>
                  <p className="text-[#2C3E50] mb-6 font-bold text-xl text-center">{content.quiz.question}</p>
                  <div className="space-y-3">
                    {content.quiz.options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => !quizSubmitted && setQuizAnswer(idx)}
                        className={`quiz-option w-full text-lg ${
                          quizSubmitted
                            ? idx === content.quiz!.correct
                              ? 'correct'
                              : idx === quizAnswer
                                ? 'incorrect'
                                : ''
                            : quizAnswer === idx
                              ? 'selected'
                              : ''
                        }`}
                      >
                        <span className="mr-3">{['A', 'B', 'C', 'D'][idx]}.</span>
                        {option}
                        {quizSubmitted && idx === content.quiz!.correct && ' ✅'}
                        {quizSubmitted && idx === quizAnswer && idx !== content.quiz!.correct && ' ❌'}
                      </button>
                    ))}
                  </div>
                  {!quizSubmitted && quizAnswer !== null && (
                    <button onClick={() => setQuizSubmitted(true)} className="btn-fun btn-fun-green w-full mt-6">
                      Check My Answer! 🎯
                    </button>
                  )}
                  {quizSubmitted && (
                    <div className={`mt-6 p-4 rounded-xl text-center text-xl font-bold ${
                      quizAnswer === content.quiz.correct 
                        ? 'bg-[#D5F4E6] text-[#27AE60]' 
                        : 'bg-[#FADBD8] text-[#E74C3C]'
                    }`}>
                      {quizAnswer === content.quiz.correct 
                        ? '🎉 AWESOME! You got it!' 
                        : '😅 Oops! Check the green answer!'}
                    </div>
                  )}
                </div>
              )}

              {/* Activity Box */}
              {content.activity && (
                <div className="activity-box">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl">🎯</span>
                    <h2 className="font-display text-2xl text-[#1ABC9C]">Try This Activity!</h2>
                  </div>
                  <p className="text-[#2C3E50] text-lg">{content.activity}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="fun-card p-8 text-center">
              <span className="text-6xl block mb-4">🚧</span>
              <h2 className="font-display text-2xl text-[#7F8C8D]">Coming Soon!</h2>
              <p className="text-[#7F8C8D] mt-2">We&apos;re creating awesome content for this lesson!</p>
            </div>
          )}

          {/* Complete Button */}
          <div className="mt-8">
            {isComplete ? (
              <div className="fun-card p-6 text-center bg-gradient-to-r from-[#D5F4E6] to-[#A3E4BC]">
                <span className="text-5xl block mb-2">🏆</span>
                <p className="font-display text-2xl text-[#27AE60]">Lesson Complete!</p>
              </div>
            ) : (
              <button onClick={() => completeLesson(selectedLesson)} className="btn-fun btn-fun-green w-full text-xl">
                {content ? "I Learned This! 🌟" : "Complete Lesson ✨"}
              </button>
            )}
          </div>
        </main>
      </div>
    );
  }

  // Topic View - Colorful!
  if (selectedTopic && selectedWorld) {
    const done = selectedTopic.lessons.filter(l => completedLessons.includes(l.id)).length;
    const total = selectedTopic.lessons.length;
    const allLessonsDone = done === total;
    const isMastered = masteredTopics.includes(selectedTopic.id);
    const hasQuiz = !!selectedTopic.topicQuiz;

    return (
      <div className="min-h-screen pb-8">
        <header className="bg-gradient-to-r from-[#3498DB] to-[#2ECC71] text-white px-6 py-4 sticky top-0 z-10 shadow-lg">
          <div className="max-w-lg mx-auto">
            <button onClick={() => setSelectedTopic(null)} className="flex items-center gap-2 font-bold hover:scale-105 transition-transform">
              <span className="text-2xl">←</span> Back
            </button>
          </div>
        </header>
        <main className="max-w-lg mx-auto px-6 py-6">
          {/* Topic Header */}
          <div className={`fun-card p-6 text-center mb-6 ${isMastered ? 'bg-gradient-to-br from-[#D5F4E6] to-[#A3E4BC]' : ''}`}>
            <span className="emoji-visual block mb-3">{selectedTopic.emoji}</span>
            <h1 className="font-display text-3xl text-[#2C3E50] mb-2">{selectedTopic.name}</h1>
            {isMastered && (
              <div className="mb-3">
                <span className="inline-block bg-[#27AE60] text-white px-4 py-2 rounded-full font-bold">🏆 MASTERED!</span>
              </div>
            )}
            <p className="text-[#7F8C8D] mb-4">{done} of {total} lessons complete</p>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${(done/total)*100}%` }} />
            </div>
          </div>

          {/* Topic Quiz Button - Shows when all lessons done */}
          {allLessonsDone && hasQuiz && !isMastered && (
            <div className="fun-card p-6 mb-6 text-center bg-gradient-to-r from-[#F39C12] to-[#E74C3C]">
              <span className="text-5xl block mb-3">🎯</span>
              <h2 className="font-display text-2xl text-white mb-2">Ready for the Challenge?</h2>
              <p className="text-white/80 mb-4">Pass the 10-question quiz to master this topic and earn +100 XP!</p>
              <button onClick={startTopicQuiz} className="btn-fun bg-white text-[#E74C3C] hover:bg-gray-100">
                Take the Quiz! 🧠
              </button>
            </div>
          )}

          {/* Already Mastered */}
          {isMastered && (
            <div className="fun-card p-6 mb-6 text-center bg-[#D5F4E6]">
              <span className="text-4xl block mb-2">🏆</span>
              <p className="font-bold text-[#27AE60]">You&apos;ve mastered this topic!</p>
              {hasQuiz && (
                <button onClick={startTopicQuiz} className="text-sm text-[#3498DB] underline mt-2">
                  Take quiz again for fun
                </button>
              )}
            </div>
          )}

          {/* Lessons List */}
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
                  className={`lesson-card w-full flex items-center gap-4 text-left ${isLocked ? 'locked' : ''} ${isDone ? 'completed' : ''}`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold shadow-md ${
                    isDone 
                      ? 'bg-gradient-to-br from-[#2ECC71] to-[#27AE60] text-white' 
                      : isLocked 
                        ? 'bg-gray-200 text-gray-400' 
                        : 'bg-gradient-to-br from-[#3498DB] to-[#2980B9] text-white'
                  }`}>
                    {isLocked ? '🔒' : isDone ? '✓' : idx + 1}
                  </div>
                  <div className="flex-1">
                    <p className={`font-bold text-lg ${isDone ? 'text-[#27AE60]' : 'text-[#2C3E50]'}`}>
                      {lesson.title}
                    </p>
                    <p className="text-[#7F8C8D] text-sm">{lesson.description}</p>
                    {hasContent && !isDone && (
                      <span className="inline-block mt-1 text-xs bg-[#FEF9E7] text-[#F39C12] px-2 py-1 rounded-full font-bold">✨ Full Lesson!</span>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="xp-badge text-sm py-1 px-3">+{lesson.xp}</div>
                    <p className="text-xs text-[#7F8C8D] mt-1">{lesson.duration}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </main>
      </div>
    );
  }

  // World View - Colorful!
  if (selectedWorld) {
    const totalLessons = selectedWorld.topics.reduce((a,t) => a + t.lessons.length, 0);
    const doneLessons = selectedWorld.topics.reduce((a,t) => a + t.lessons.filter(l => completedLessons.includes(l.id)).length, 0);
    
    return (
      <div className="min-h-screen pb-8">
        <header className="bg-gradient-to-r from-[#9B59B6] to-[#E74C3C] text-white px-6 py-4 sticky top-0 z-10 shadow-lg">
          <div className="max-w-lg mx-auto">
            <button onClick={() => setSelectedWorld(null)} className="flex items-center gap-2 font-bold hover:scale-105 transition-transform">
              <span className="text-2xl">←</span> All Subjects
            </button>
          </div>
        </header>
        <main className="max-w-lg mx-auto px-6 py-6">
          {/* World Header */}
          <div className="fun-card p-8 text-center mb-8">
            <span className="text-7xl block mb-4 animate-bounce-slow">{selectedWorld.emoji}</span>
            <h1 className="font-display text-4xl text-[#2C3E50] mb-2">{selectedWorld.name}</h1>
            <p className="text-[#7F8C8D] text-lg mb-4">{selectedWorld.description}</p>
            <div className="inline-block bg-[#EBF5FB] px-4 py-2 rounded-full">
              <span className="font-bold text-[#3498DB]">{doneLessons}/{totalLessons} lessons complete</span>
            </div>
          </div>

          {/* Topics Grid */}
          <h2 className="font-display text-2xl text-[#2C3E50] mb-4 text-center">Choose a Topic</h2>
          <div className="space-y-4">
            {selectedWorld.topics.map((topic, idx) => {
              const done = topic.lessons.filter(l => completedLessons.includes(l.id)).length;
              const total = topic.lessons.length;
              const colors = ['topic-card-red', 'topic-card-blue', 'topic-card-green', 'topic-card-yellow', 'topic-card-purple', 'topic-card-orange', 'topic-card-pink', 'topic-card-teal'];
              return (
                <button 
                  key={topic.id} 
                  onClick={() => setSelectedTopic(topic)} 
                  className={`fun-card ${colors[idx % colors.length]} w-full p-5 flex items-center gap-4 text-left`}
                >
                  <span className="text-4xl">{topic.emoji}</span>
                  <div className="flex-1">
                    <p className="font-display text-xl text-[#2C3E50]">{topic.name}</p>
                    <p className="text-[#7F8C8D] text-sm">{topic.lessons.length} lessons</p>
                  </div>
                  <div className="text-right">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold shadow-md ${
                      done === total 
                        ? 'bg-gradient-to-br from-[#2ECC71] to-[#27AE60] text-white' 
                        : 'bg-white text-[#3498DB] border-2 border-[#3498DB]'
                    }`}>
                      {done === total ? '✓' : `${Math.round((done/total)*100)}%`}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </main>
      </div>
    );
  }

  // Home View - Colorful & Animated!
  const school = worldsData.filter(w => ['math','reading','science','history'].includes(w.id));
  const future = worldsData.filter(w => !['math','reading','science','history'].includes(w.id));
  const worldColors: Record<string, string> = {
    math: 'world-bubble-math',
    reading: 'world-bubble-reading',
    science: 'world-bubble-science',
    history: 'world-bubble-history',
    law: 'world-bubble-law',
    engineering: 'world-bubble-engineering',
    money: 'world-bubble-money',
    investing: 'world-bubble-investing',
    business: 'world-bubble-business',
    lifeskills: 'world-bubble-lifeskills',
  };

  return (
    <div className="min-h-screen pb-8">
      {/* Fun Header */}
      <header className="bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white px-6 pt-8 pb-10 relative overflow-hidden">
        <div className="stars">
          <span className="star" style={{top: '10%', left: '5%'}}>⭐</span>
          <span className="star" style={{top: '30%', left: '90%', animationDelay: '0.5s'}}>🌟</span>
          <span className="star" style={{top: '60%', left: '15%', animationDelay: '1s'}}>✨</span>
        </div>
        <div className="max-w-lg mx-auto relative z-10">
          {/* Logo & Title */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center shadow-lg animate-bounce-slow">
              <span className="text-4xl">🚀</span>
            </div>
            <div>
              <h1 className="font-display text-4xl">FutureKids</h1>
              <p className="text-white/70 text-sm">Learning Academy</p>
            </div>
          </div>
          
          {/* Stats Row */}
          <div className="flex gap-3 mb-6">
            <div className="streak-badge">
              🔥 {streak} days
            </div>
            <div className="xp-badge">
              ⭐ {xp} XP
            </div>
          </div>
          
          {/* Level Progress */}
          <div className="bg-white/10 backdrop-blur rounded-2xl p-4">
            <div className="flex items-center gap-4 mb-3">
              <div className="level-badge">
                {level}
              </div>
              <div className="flex-1">
                <p className="font-bold text-lg">Level {level} Learner</p>
                <p className="text-white/70 text-sm">{100 - (xp % 100)} XP to Level {level + 1}</p>
              </div>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-6 py-8">
        {/* School Section */}
        <div className="mb-10">
          <div className="section-header mb-6">
            <h2 className="font-display text-2xl text-[#2C3E50]">📚 School Stuff</h2>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {school.map(world => {
              const total = world.topics.reduce((a,t) => a + t.lessons.length, 0);
              const done = world.topics.reduce((a,t) => a + t.lessons.filter(l => completedLessons.includes(l.id)).length, 0);
              return (
                <button key={world.id} onClick={() => setSelectedWorld(world)} className="flex flex-col items-center gap-3 group">
                  <div className={`world-bubble ${worldColors[world.id] || 'world-bubble-math'}`}>
                    <span className="text-3xl">{world.emoji}</span>
                  </div>
                  <div className="text-center">
                    <p className="font-display text-lg text-[#2C3E50] group-hover:text-[#3498DB] transition-colors">{world.name}</p>
                    <p className="text-xs text-[#7F8C8D]">{done}/{total} ✓</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Future Skills Section */}
        <div>
          <div className="section-header mb-2">
            <h2 className="font-display text-2xl text-[#2C3E50]">🌟 Future Skills</h2>
          </div>
          <p className="text-center text-[#7F8C8D] mb-6">What school doesn&apos;t teach you!</p>
          <div className="grid grid-cols-3 gap-4">
            {future.map(world => {
              const total = world.topics.reduce((a,t) => a + t.lessons.length, 0);
              const done = world.topics.reduce((a,t) => a + t.lessons.filter(l => completedLessons.includes(l.id)).length, 0);
              return (
                <button key={world.id} onClick={() => setSelectedWorld(world)} className="flex flex-col items-center gap-2 group">
                  <div className={`world-bubble ${worldColors[world.id] || 'world-bubble-money'}`} style={{width: '70px', height: '70px'}}>
                    <span className="text-2xl">{world.emoji}</span>
                  </div>
                  <div className="text-center">
                    <p className="font-display text-sm text-[#2C3E50] group-hover:text-[#9B59B6] transition-colors">{world.name}</p>
                    <p className="text-xs text-[#7F8C8D]">{done}/{total}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </main>

      <footer className="text-center py-8">
        <p className="text-sm text-[#7F8C8D]">Made with 💜 for Carter, Kingston & Sister</p>
      </footer>
    </div>
  );
}
