"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidenav from '../components/sidenav';


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
      <p className="text-center mt-50">educations</p>

      <div>hello hello</div>


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

    </div>
  )
}

export default page
