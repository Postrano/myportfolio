"use client";
import React, { useState, useEffect } from "react";

import { FaIdBadge } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdContacts } from "react-icons/io";
import { AiOutlineProject } from "react-icons/ai";
import { GiGraduateCap } from "react-icons/gi";


const Introduction = () => {
  const [time, setTime] = useState(new Date());
  const [customTime, setCustomTime] = useState("");
  const [isDay, setIsDay] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showInput, setShowInput] = useState(false);
  const [resetTimeout, setResetTimeout] = useState(null);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showID, setShowID] = useState(false);
  const [greeting, setGreeting] = useState(""); // New state for greeting message

  useEffect(() => {
    const updateTime = () => {
      const now = customTime
        ? new Date(`2024-01-01T${customTime}:00`)
        : new Date().toLocaleString("en-US", { timeZone: "Asia/Manila" });
      const currentTime = new Date(now);
      setTime(currentTime);

      const hour = currentTime.getHours();
      setIsDay(hour >= 6 && hour < 18);

      const progress = (hour % 24) / 24;
      const xPos = -40 + progress * 80;
      const yPos = Math.sin(progress * Math.PI) * -30;
      setPosition({ x: `${xPos}vw`, y: `${yPos}vh` });

      // Set greeting based on the time of day
      if (hour >= 6 && hour < 12) {
        setGreeting("Good Morning");
      } else if (hour >= 12 && hour < 18) {
        setGreeting("Good Afternoon");
      } else {
        setGreeting("Good Evening");
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [customTime]);

  const handleTimeChange = (e) => {
    setCustomTime(e.target.value);
    if (resetTimeout) clearTimeout(resetTimeout);
    setResetTimeout(setTimeout(() => setCustomTime(""), 20000));
  };

  const toggleIDCard = () => {
    setShowID(!showID);
  };

  
  return (
    <div
    className={`flex flex-col items-center justify-center h-screen relative overflow-hidden transition-colors duration-1000 ${
      isDay ? "bg-blue-300" : "bg-gray-900"
    }`}
  >
    <div 
      className={`absolute top-25 left-5 text-4xl cursor-pointer z-50 flex items-center  hover:text-[#FFD700] transition-colors duration-300 ${isDay ? "text-blue-900" : "text-white"}`} // Added conditional color for text
      onClick={toggleIDCard}
    >
      <FaIdBadge className="mr-2 " />
      <span className="text-sm ">ID Card</span>
    </div>

    <div className={`absolute top-38 left-5 text-4xl cursor-pointer z-50 flex items-center  hover:text-[#FFD700] transition-colors duration-300 ${isDay ? "text-[#191970]" : "text-white"}`}>
      <a href="/contacts" className="flex items-center">
        <IoMdContacts className="mr-2" />
        <span className="text-sm">Contacts</span>
      </a>
    </div>

    <div className={`absolute top-50 left-5 text-4xl cursor-pointer z-50 flex items-center  hover:text-[#FFD700] transition-colors duration-300 ${isDay ? "text-[#191970]" : "text-white"}`}>
      <a href="/projects" className="flex items-center">
        <AiOutlineProject className="mr-2" />
        <span className="text-sm">Projects</span>
      </a>
    </div>

    <div className={`absolute top-62 left-5 text-4xl cursor-pointer z-50 flex items-center  hover:text-[#FFD700] transition-colors duration-300 ${isDay ? "text-[#191970]" : "text-white"}`}>
      <a href="/educations" className="flex items-center">
        <GiGraduateCap className="mr-2" />
        <span className="text-sm">Education</span>
      </a>
    </div>

    <div className="z-50 w-full absolute bottom-20 left-5 p-4 rounded-lg shadow-lg max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
      <h1 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 animate-type ${isDay ? "text-[#191970]" : "text-white"}`}>
        There is Nothing possible when you do it with Passion.
      </h1>

      {/* Play/Pause Button */}
      <button 
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-full transition duration-300 ease-in-out hover:bg-blue-600 hover:scale-105"
        onClick={() => {
          const audio = document.getElementById('audioPlayer');
          if (audio.paused) {
            audio.play();
          } else {
            audio.pause();
          }
        }}
      >
        Play/Pause Music
      </button>

      <audio id="audioPlayer" loop>
        <source src="/music/Daniel Bedingfield - If You're Not The One.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>











      {/* Background animations */}
      {!isDay && (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(50)].map((_, index) => (
            <motion.div
              key={index}
              className="absolute bg-white rounded-full"
              style={{
                width: `${Math.random() * 3}px`,
                height: `${Math.random() * 3}px`,
                top: `${Math.random() * 100}vh`,
                left: `${Math.random() * 100}vw`,
                opacity: Math.random(),
              }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: Math.random() * 5 + 2, repeat: Infinity }}
            />
          ))}
        </div>
      )}

      {isDay && (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(10)].map((_, index) => (
            <motion.div
              key={index}
              className="absolute bg-blue-200 opacity-70 rounded-full"
              style={{
                width: `${30 + Math.random() * 50}px`,
                height: `${20 + Math.random() * 30}px`,
                top: `${Math.random() * 40}vh`,
                left: `${Math.random() * 100}vw`,
              }}
              animate={{ x: ["-100vw", "100vw"] }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            />
          ))}
        </div>
      )}

      {/* Time input */}
      {showInput && (
        <div className="absolute top-10 flex flex-col items-center">
          <label className="text-white mb-2">Set Time:</label>
          <input
            type="time"
            className="p-2 rounded bg-white text-black shadow-lg"
            onChange={handleTimeChange}
          />
        </div>
      )}

      <motion.div
        className={`w-16 h-16 rounded-full absolute cursor-pointer ${
          isDay
            ? "bg-gradient-to-r from-yellow-500 to-white shadow-[0_0_40px_15px_rgba(255,255,255,0.8)]"
            : "bg-gray-200 shadow-[0_0_30px_10px_rgba(255,255,255,0.5)]"
        }`}
        animate={{ x: position.x, y: position.y }}
        transition={{ duration: 2, ease: "easeInOut" }}
        onClick={() => setShowInput(!showInput)}
      />

      <div className="absolute bottom-4 right-4 text-white text-2xl font-bold">
        {time.toLocaleTimeString("en-US", { timeZone: "Asia/Manila" })}
      </div>

      <div className="absolute top-4 right-4 text-white text-2xl font-bold">
        <p>{greeting}!</p>
        <p className="text-sm ml-30">-denmark</p>
      </div>

      {/* Animated ID Card & Lanyard */}
      <AnimatePresence>
    {showID && (
      <motion.div
        className="absolute flex flex-col items-center"
        style={{ left: "10%", top: "10%" }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        {/* Lanyard Animation */}
        <motion.div
          className="lanyard w-4 h-40 bg-black text-yellow-400 text-center font-bold border-4 border-yellow-400 flex items-center justify-center rounded-t-full"
          animate={{ rotate: [5, -5, 5] }}
          transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
          style={{ transformOrigin: "top center" }}
        >
          <div className="w-4 h-4 bg-gray-700 rounded-full absolute bottom-0"></div>
        </motion.div>

        {/* ID Card */}
        <motion.div
          className="id-card w-68 h-90 bg-blue-600 rounded-lg shadow-2xl flex flex-col items-center p-5 text-white cursor-pointer relative z-100"
          animate={{ rotate: [5, -5, 5] }}
          transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
          style={{ transformOrigin: "top center" }}
        >
          <div className="header bg-yellow-400 w-full text-center py-2 font-bold rounded-t-lg text-black">
            STUDENT ID
          </div>
          <img
            src="/images/profile1.jpg"
            alt="ID"
            className="w-24 h-24 rounded-full mt-2 border-4 border-white object-cover"
          />
          <h2 className="text-xl font-bold text-center mt-2">
            Denmark Esclamado Postrano
          </h2>
          <p className="text-center">Bachelor of Science in Information Technology</p>
          <p className="text-center">Birthday: March 28, 2001</p>
          <p className="text-center">Age: {new Date().getFullYear() - 2001}</p>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
    </div>
  );
};

export default Introduction;
