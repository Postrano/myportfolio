"use client";
import React, { useState } from "react";
import { FaIdBadge } from "react-icons/fa";
import { IoMdContacts } from "react-icons/io";
import { AiOutlineProject } from "react-icons/ai";
import { GiGraduateCap } from "react-icons/gi";
import { FaHome } from "react-icons/fa";

const Sidenav = () => {
  const [active, setActive] = useState(1); // Track the active link
  const [menuOpen, setMenuOpen] = useState(false); // Track burger menu state

  const handleNavClick = (index) => {
    setActive(index);
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      {/* Burger Menu for Mobile (Left Side) */}
      <div className="md:hidden absolute top-4 left-4 flex justify-between items-center p-4">
        <button
          onClick={toggleMenu}
          className="text-4xl z-50 text-white"
          style={{ backgroundColor: "transparent", border: "none" }}
        >
          <div
            className={`w-6 h-1 bg-white mb-2 transform transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></div>
          <div
            className={`w-6 h-1 bg-white mb-2 transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          ></div>
          <div
            className={`w-6 h-1 bg-white transition-all duration-300 ${
              menuOpen ? "-rotate-45 translate-y-[-2px]" : ""
            }`}
          ></div>
        </button>
      </div>

     {/* Sidenav for Desktop */}
<div
  className={`absolute top-0 left-0 z-0 w-64 h-full z-100 ${
    menuOpen ? "block bg-[rgba(0,0,0,0.8)]" : "hidden"
  } md:block`}
>
  <div className="absolute top-25 left-5 text-4xl cursor-pointer flex items-center text-white">
    <a href="/" className="flex items-center hover:text-[#FFD700] transition-colors duration-300">
      <FaHome className="mr-2" />
      <span className="text-sm">Home</span>
    </a>
  </div>

  <div className="absolute top-38 left-5 text-4xl cursor-pointer flex items-center text-white">
    <a href="/contacts" className="flex items-center hover:text-[#FFD700] transition-colors duration-300">
      <IoMdContacts className="mr-2" />
      <span className="text-sm">Contacts</span>
    </a>
  </div>

  <div className="absolute top-50 left-5 text-4xl cursor-pointer flex items-center text-white">
    <a href="/projects" className="flex items-center hover:text-[#FFD700] transition-colors duration-300">
      <AiOutlineProject className="mr-2" />
      <span className="text-sm">Projects</span>
    </a>
  </div>

  {/* <div className="absolute top-62 left-5 text-4xl cursor-pointer flex items-center text-white">
    <a href="/educations" className="flex items-center hover:text-[#FFD700] transition-colors duration-300">
      <GiGraduateCap className="mr-2" />
      <span className="text-sm">Education</span>
    </a>
  </div> */}
</div>


      {/* Overlay for mobile */}
      {menuOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-30 "
          onClick={toggleMenu}
        ></div>
      )}
    </div>
  );
};

export default Sidenav;
