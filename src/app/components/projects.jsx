"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
  {
    title: "🖼️ Admin Sytem",
    description: "facilitate and monitor all order online . Provide and analystic report base on Sales",
    involvement: "I did the Dashboard,computing sales report, fetching all the data coming from the database",
    image: "/images/intshopadmin.jpg",
  },
  {
    title: "Informational Website/Profile website",
    description: "A website that show the services of the company ,News,Information,and structural.",
    involvement: "I did the whole project,company just provided me information to papulate.",
    image: "/images/asianbusiness.jpg",
  },
  {
    title: "🔐 Japanese Website",
    description: " A informational website aim to advertise the services of the company and provide platform for there agent, it can only access on japanese Ip address and its be translate into Korean,japanese, english and chinese",
    involvement: "participated on designing and layout of the website and manually did a translation using just a jason file,",
    image: "/images/inspiregroup.jpg",
  },
  {
    title: "📬 Eccomerce Website",
    description: "Its an Eccomerce Website both for beuty and technology that is planning to launch in the philippines",
    involvement: "I handle mostly the display of buety products, also the landing page or the first page before you login",
    image: "/images/insshop.jpg",
  },
  {
    title: "📊 Magazine and News Website",
    description: "A Website aims to provide information for the people",
    involvement: "This is my second project after my capstone, am involve on the layout and design of the website i also did the RSS part using api",
    image: "/images/rss.jpg",
  },
  {
    title: "Online Form for Subscription",
    description: "Its an online form send to the client inorder for them to input all details and also pay",
    involvement: "i did the whole process form, but for the payment i only put the bank details, the payment gateway is for future development",
    image: "/images/form.jpg",
  }
];

export default function ProjectShowcase() {
  const [hovered, setHovered] = useState(null);
  const [isDay, setIsDay] = useState(true);
  const [overrideHour, setOverrideHour] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const getPhilippinesHour = () => {
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const philippinesTime = new Date(utc + 3600000 * 8);
      const hour = overrideHour !== null ? overrideHour : philippinesTime.getHours();
      setIsDay(hour >= 6 && hour < 18);
    };

    getPhilippinesHour();
    const interval = setInterval(getPhilippinesHour, 60000);
    return () => clearInterval(interval);
  }, [overrideHour]);

  return (
    <div className={`min-h-screen font-mono flex flex-col items-center justify-center p-6 transition-colors duration-500 relative ${isDay ? 'bg-gradient-to-b from-blue-200 via-yellow-100 to-white text-gray-900' : 'bg-gradient-to-b from-gray-900 via-blue-950 to-black text-green-400'}`}>
      {/* Decorative Day/Night Elements */}
      {isDay ? (
        <div className="absolute top-4 left-4 flex gap-2 animate-pulse">
          <div className="w-6 h-6 rounded-full bg-yellow-400 shadow-lg"></div>
          <div className="w-3 h-3 rounded-full bg-white shadow-sm"></div>
          <div className="w-4 h-4 rounded-full bg-white shadow-sm"></div>
        </div>
      ) : (
        <div className="absolute top-4 left-4 flex gap-2 animate-fadeIn">
          <div className="w-6 h-6 rounded-full bg-gray-300 shadow-md"></div>
          <div className="w-2 h-2 rounded-full bg-blue-300 shadow-sm"></div>
          <div className="w-2 h-2 rounded-full bg-blue-100 shadow-sm"></div>
        </div>
      )}

      {/* <div className="mb-6 flex items-center gap-4 z-10">
        <label htmlFor="hour" className="font-semibold">Set Hour (PH time):</label>
        <input
          id="hour"
          type="number"
          min="0"
          max="23"
          value={overrideHour ?? ''}
          onChange={(e) => {
            const value = e.target.value;
            setOverrideHour(value === '' ? null : parseInt(value));
          }}
          className="px-3 py-1 rounded border border-gray-400 text-black"
        />
        <button
          onClick={() => setOverrideHour(null)}
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition"
        >
          Reset to Real Time
        </button>
      </div> */}

      <motion.h1
        className="text-4xl font-bold mb-10 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        💼 My Interactive Project Showcase
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl z-10">
        {projects.map((project, idx) => (
          <motion.div
            key={idx}
            className={`rounded-2xl p-6 shadow-lg transition-transform duration-300 cursor-pointer border-2 ${isDay ? 'bg-white/80 border-gray-300' : 'bg-gray-800/80 border-green-400'}`}
            onClick={() => setSelectedProject(project)}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-48  rounded-xl mb-4 border border-green-300 object-contain"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            />
            <h2 className="text-xl font-bold mb-2">{project.title}</h2>
            <p className="mb-2">{project.description}</p>
            <p className="italic">Click to learn more</p>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
           className="fixed inset-0  backdrop-blur-md flex items-center justify-center z-50 text-amber-50 object-contain"

            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
            className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md p-6 rounded-2xl max-w-lg w-full shadow-lg border border-amber-50 object-contain"

              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="text-sm text-red-500 float-right mb-2 hover:underline"
              >
                Close
              </button>
            <img 
              src={selectedProject.image} 
              alt={selectedProject.title} 
              className="w-full h-48  rounded-xl mb-4 border border-amber-300 object-contain"
            />

              <h2 className="text-2xl font-bold mb-2">{selectedProject.title}</h2>
              <p className="mb-2">{selectedProject.description}</p>
              <p className="italic text-gray-600 dark:text-gray-300">{selectedProject.involvement}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
