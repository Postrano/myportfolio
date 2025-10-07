
"use client";


import React, { useState, useEffect } from "react";
import Sidenav from '../components/sidenav';
import { motion, AnimatePresence } from "framer-motion";
import ProjectShowcase from "../components/projects";

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
    <div>
  

     <Sidenav/>

  
    <ProjectShowcase/>
    </div>
  );
}

export default page;
