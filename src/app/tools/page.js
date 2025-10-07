
"use client";


import React, { useState, useEffect } from "react";
import Sidenav from '../components/sidenav';
import { motion, AnimatePresence } from "framer-motion";
  import { FaFileArchive } from "react-icons/fa";


const page = () => {
   const [time, setTime] = useState(new Date());
      const [customTime, setCustomTime] = useState("");
      const [isDay, setIsDay] = useState(false);
      const [position, setPosition] = useState({ x: 0, y: 0 });
      const [showInput, setShowInput] = useState(false);
      const [resetTimeout, setResetTimeout] = useState(null);
      const [greeting, setGreeting] = useState("");

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
   return (
     <div
       className={`flex flex-col items-center justify-center h-screen relative overflow-hidden transition-colors duration-1000 ${
         isDay ? "bg-blue-300" : "bg-gray-900"
       }`}
     >
       <Sidenav/>

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
           {[...Array(12)].map((_, index) => (
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

       {/* Sun/Moon */}
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

       {/* Clock & greeting */}
       <div className="absolute bottom-4 right-4 text-white text-2xl font-bold">
         {time.toLocaleTimeString("en-US", { timeZone: "Asia/Manila" })}
       </div>
       <div className="absolute top-4 right-4 p-4 rounded-xl text-white">
         <p className="text-2xl font-bold">{greeting}!</p>
         <p className="text-sm text-left italic">— Denmark</p>
       </div>

       {/* Headline */}
       <div className="z-50 w-full absolute bottom-20 left-5 p-4 rounded-lg max-w-xl">
         <h1 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-3 ${isDay ? "text-[#191970]" : "text-white"}`}>
           Tools
         </h1>
         <p className="text-white/80">A collection of utilities I use day-to-day.</p>
       </div>

       {/* Floating File Compressor button */}
       <a
         href="/compressor"
         aria-label="Open File Compressor"
         className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
       >
         <motion.div
           className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg cursor-pointer bg-gradient-to-br from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500"
           animate={{ y: [0, -6, 0] }}
           transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
           whileTap={{ scale: 0.95 }}
         >
           <FaFileArchive className="text-white text-2xl" />
         </motion.div>
         <span className="absolute top-16 left-1/2 -translate-x-1/2 text-xs bg-black/70 text-white px-2 py-1 rounded opacity-80 whitespace-nowrap">
           File Compressor
         </span>
       </a>
     </div>
   );
}

export default page;
