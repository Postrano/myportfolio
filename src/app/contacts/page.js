"use client";


import React, { useState, useEffect } from "react";
import { FaHome, FaTelegram,FaSms, FaVoicemail, FaMailBulk  } from 'react-icons/fa'; // FaTelegram is the icon for Telegram
import { Facebook, Instagram, Phone, Mail, MessageCircle } from 'lucide-react'; // Use MessageCircle instead of Viber
import Sidenav from '../components/sidenav';
import { motion, AnimatePresence } from "framer-motion";
import emailjs from 'emailjs-com';


const Page = () => {
    const [time, setTime] = useState(new Date());
    const [customTime, setCustomTime] = useState("");
    const [isDay, setIsDay] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [showInput, setShowInput] = useState(false);
    const [resetTimeout, setResetTimeout] = useState(null);
    const [greeting, setGreeting] = useState(""); 
      const [isOpen, setIsOpen] = useState(false); // ✅ declare this early
      const [sendSuccess, setSendSuccess] = useState(false);

   

      useEffect(() => {
  if (sendSuccess) {
    const timer = setTimeout(() => {
      setSendSuccess(false);
      setIsOpen(false); // close modal if needed
    }, 10000); // 10 seconds

    return () => clearTimeout(timer); // cleanup
  }
}, [sendSuccess]);


    useEffect(() => {
      console.log("Modal state changed:", isOpen);
    }, [isOpen]);
    
  


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


 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    subject: '',
    message: '',
  });

  const handleOpen = () => setIsOpen(true);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSend = () => {
const templateParams = {
  name: formData.name,
  email: formData.email,
  number: formData.number,
  subject: formData.subject,
  message: formData.message,
};



  emailjs
     .send('service_ow105uz', 'template_ms1ekgh', templateParams, '7ngof_LvMBjUNBQ1A')
    .then(() => {
      setSendSuccess(true);       // Show success message
      // Optionally clear form or keep it
      setFormData({ name: '', email: '', number: '', subject: '', message: '' });
    })
    .catch((error) => {
      console.error('EmailJS Error:', error?.text || error);
      alert('Failed to send message. Please try again.');
    });
};


  
  return (
    <div
    className={`flex flex-col items-center justify-center h-screen relative overflow-hidden transition-colors duration-1000 ${
      isDay ? "bg-blue-300 text-gray-900" : "bg-gray-900 text-white"
    }`}
  >
      <p className="text-center text-xl font-bold mt-10"></p>
      <Sidenav />

     

      {/* Social Icons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10 mt-10 z-50">
        {/* Facebook */}
        <a href="https://www.facebook.com/dhon.e.p" target="_blank" rel="noopener noreferrer" className="text-center flex flex-col items-center">
          <Facebook className="w-16 h-16 text-blue-600 mb-2" />
          <span className="text-sm">Facebook</span>
          <div className="text-xs text-gray-500 mt-1">Denmark Esclamado Postrano</div> {/* Account name or number */}
        </a>

        {/* Instagram */}
        <a href="https://www.instagram.com/dhon.e.p/" target="_blank" rel="noopener noreferrer" className="text-center flex flex-col items-center">
          <Instagram className="w-16 h-16 text-pink-600 mb-2" />
          <span className="text-sm">Instagram</span>
          <div className="text-xs text-gray-500 mt-1">@dhon.e.p</div> {/* Account name or number */}
        </a>

        {/* Telegram Icon (from react-icons) */}
        <a href="09557204955" target="_blank" rel="noopener noreferrer" className="text-center flex flex-col items-center">
          <FaTelegram className="w-16 h-16 text-blue-500 mb-2" />
          <span className="text-sm">Telegram</span>
          <div className="text-xs text-gray-500 mt-1">09557204955 </div> {/* Phone number */}
        </a>

        {/* Viber Fallback (MessageCircle) */}
        <a href="09557204955" target="_blank" rel="noopener noreferrer" className="text-center flex flex-col items-center">
          <MessageCircle className="w-16 h-16 text-purple-600 mb-2" />
          <span className="text-sm">Viber</span>
          <div className="text-xs text-gray-500 mt-1">09557204955 </div> {/* Phone number */}
        </a>

        {/* Email */}
        <a href="denmarkpostrano@gmail.com.com" className="text-center flex flex-col items-center">
          <Mail className="w-16 h-16 text-gray-700 mb-2" />
          <span className="text-sm">Email</span>
          <div className="text-xs text-gray-500 mt-1">denmarkpostrano@gmail.com</div> {/* Email address */}
        </a>

        {/* Phone */}
        <a href="tel:+1234567890" className="text-center flex flex-col items-center">
          <Phone className="w-16 h-16 text-green-600 mb-2" />
          <span className="text-sm">Phone</span>
          <div className="text-xs text-gray-500 mt-1">None</div> {/* Phone number */}
        </a>
      </div>



       {/* 🔹 SMS Button */}
       <div
  className="absolute top-4 right-4 flex items-center gap-2 bg-white p-2 rounded-lg shadow-md cursor-pointer hover:bg-gray-200 transition z-100"
  onClick={handleOpen}
>
  <FaMailBulk
   className="text-blue-500 w-6 h-6" />
  <span className="text-black text-sm font-semibold">Message me Now!</span>
</div>

      {/* 🔹 Modal */}
   {isOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-md text-black z-90">
    <div className="bg-white p-6 rounded-lg shadow-lg w-96">

      <h2 className="text-lg font-semibold text-center mb-4">Send a Message</h2>

      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded mb-2"
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded mb-2"
      />
      <input
        type="text"
        name="number"
        placeholder="Your Number"
        value={formData.number}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded mb-2"
      />
      <input
        type="text"
        name="subject"
        placeholder="Subject"
        value={formData.subject}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded mb-2"
      />
      <textarea
        name="message"
        placeholder="Your Message"
        value={formData.message}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded mb-2 h-24"
      ></textarea>

      <div className="flex justify-between mt-4">
        <button
          onClick={() => setIsOpen(false)}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-red-600 active:bg-red-600 focus:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          Cancel
        </button>
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 active:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Send
        </button>
      </div>

      {/* ✅ Conditional Success Message */}
      {sendSuccess && (
        <p className="text-green-600 font-semibold text-lg mb-4 text-center mt-7">
          Message sent successfully!
        </p>
      )}
    </div>
  </div>
)}



      
      
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
  );
};

export default Page;
