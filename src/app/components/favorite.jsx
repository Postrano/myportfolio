"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const favorites = {
  manga: [
    {
      title: "Solo Leveling",
      description: "The show follows Sung Jin-woo, the weakest in a society of monster-fighting hunters. He one day gains the mysterious power of the System, which turns his life into a JRPG and allows him to gain EXP and ``level up'' from fighting monsters, hence the name ``Solo Leveling''.",
      image: "/images/sololeveling.jpg"
    },
      {
      title: "Noblesse",
      description: "a Korean manhwa (webtoon) series created by Son Jae-ho. It tells the story of Cadis Etrama Di Raizel (Rai), a powerful noble who awakens after 820 years and tries to adjust to the modern world. He attends high school and is helped by his former servant, Frankenstein, who is also still alive. ",
      image: "/images/Noblesse-Anime-Blog-Banner.jpg"
    },
    
  ],
  novels: [
  
    {
      title: "i have a mansion in the post-apocalyptic world",
      description: "Jiang Chen crossed into the judgment day after the nuclear war, and there was a mess everywhere. In order to survive, Jiang Chen led the refugees to establish a base area and set up a federation.",
      image: "/images/ihmapo1.jpg"
    },
    {
      title: "I am really not a Big shot",
      description: "It is unknown how many years it has existed, and few people know it, but it affects the transformation of civilizations, the pattern of the heavens, and permeates all aspects of the multiverse.",
      image: "/images/bog.jpg"
    }
  ],
  music: [
    {
      title: "Bohemian Rhapsody",
      description: "A classic rock song by Queen with a unique and dynamic structure.",
      image: "/images/bohemian-rhapsody.jpg"
    },
    {
      title: "Blinding Lights",
      description: "A synth-heavy pop song by The Weeknd that blends 80s nostalgia with modern production.",
      image: "/images/blinding-lights.jpg"
    }
  ],
  movies: [
    {
      title: "The Matrix",
      description: "A sci-fi classic about a hacker who learns about the truth behind the simulated reality he lives in.",
      image: "/images/the-matrix.jpg"
    },
    {
      title: "Inception",
      description: "A mind-bending thriller by Christopher Nolan that explores dreams within dreams.",
      image: "/images/inception.jpg"
    }
  ],
  food: [
    {
      title: "Sushi",
      description: "A traditional Japanese dish consisting of vinegared rice accompanied by various ingredients like seafood, vegetables, and sometimes tropical fruits.",
      image: "/images/sushi.jpg"
    },
    {
      title: "Pizza",
      description: "A delicious Italian dish made with a flatbread base, topped with tomato sauce, cheese, and various toppings.",
      image: "/images/pizza.jpg"
    }
  ]
};

const categories = ['manga', 'novels', 'music', 'movies', 'food'];

export default function FavoriteThings() {
  const [selectedCategory, setSelectedCategory] = useState('manga');

  // Function to automatically cycle through categories
  useEffect(() => {
    const categoryInterval = setInterval(() => {
      const currentIndex = categories.indexOf(selectedCategory);
      const nextIndex = (currentIndex + 1) % categories.length;
      setSelectedCategory(categories[nextIndex]);
    }, 5000); // Change category every 5 seconds

    return () => clearInterval(categoryInterval); // Cleanup interval on component unmount
  }, [selectedCategory]);

  return (
    <div className="min-h-screen font-mono flex flex-col items-center justify-center p-6 transition-colors duration-500 bg-[#36454F] text-black">
      <motion.h1
        className="text-4xl font-bold mb-10 text-amber-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        🎉 My Favorite Things
      </motion.h1>

      <div className="flex gap-8 mb-6 text-black">
        <motion.button
          onClick={() => setSelectedCategory('manga')}
          className="text-lg font-semibold hover:text-blue-500 transition duration-300"
          whileHover={{ scale: 1.1 }}
        >
          Manga
        </motion.button>
        <motion.button
          onClick={() => setSelectedCategory('novels')}
          className="text-lg font-semibold hover:text-blue-500 transition duration-300"
          whileHover={{ scale: 1.1 }}
        >
          Novels
        </motion.button>
        <motion.button
          onClick={() => setSelectedCategory('music')}
          className="text-lg font-semibold hover:text-blue-500 transition duration-300"
          whileHover={{ scale: 1.1 }}
        >
          Music
        </motion.button>
        <motion.button
          onClick={() => setSelectedCategory('movies')}
          className="text-lg font-semibold hover:text-blue-500 transition duration-300"
          whileHover={{ scale: 1.1 }}
        >
          Movies
        </motion.button>
        <motion.button
          onClick={() => setSelectedCategory('food')}
          className="text-lg font-semibold hover:text-blue-500 transition duration-300"
          whileHover={{ scale: 1.1 }}
        >
          Food
        </motion.button>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {favorites[selectedCategory].map((item, idx) => (
          <motion.div
            key={idx}
            className="rounded-2xl p-6 shadow-lg bg-white border-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover rounded-xl mb-4"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            />
            <motion.h2
              className="text-xl font-bold mb-2"
              whileHover={{ color: '#FF6347' }} // Change color on hover
              transition={{ duration: 0.3 }}
            >
              {item.title}
            </motion.h2>
            <p className="mb-2">{item.description}</p>
          </motion.div>
        ))}
      </motion.div>

      
    </div>
  );
}
