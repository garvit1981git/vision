"use client";

import Image from 'next/image';
import React, { useState } from 'react';
import logo from "../Images/logo.png";

const Navbar = () => {
  // State to handle the mobile menu toggle
  const [isOpen, setIsOpen] = useState(false);

  return (
    // Added 'relative' to the nav so the mobile dropdown can position itself below it
    <nav className="relative flex items-center justify-between text-[#890620] font-['Mona_Sans_Variable'] ">
      
      {/* 1. MOBILE MENU ICON (Left on mobile, hidden on desktop) */}
      {/* order-1 keeps it on the far left on mobile screens */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden order-1 p-2 focus:outline-none z-50"
        aria-label="Toggle Menu"
      >
        {isOpen ? (
          // Close Icon (X)
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          // Hamburger Icon
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* 2. LOGO */}
      {/* order-2 on mobile pushes it to the right because justify-between separates the menu icon and logo */}
      {/* md:order-1 puts it back on the left for desktop */}
      <div className="order-2 md:order-1 z-50 cursor-pointer">
        <Image
          src={logo}
          alt="logo"
          width={50}
          height={20}
          className="object-cover w-full h-auto rounded-4xl"
        />
      </div>

      {/* 3. DESKTOP LINKS (Hidden on mobile) */}
      <div className="hidden md:flex gap-5 justify-center ml-[7%] items-center border px-2 text-lg bg-[#890620] text-[#FFCDB2] py-0.5 rounded-full order-2">
        <div className="capitalize hover:bg-white/15 hover:backdrop-blur-sm rounded-full px-2 py-0.5 cursor-pointer transition-colors">Categories</div>
        <div className="capitalize hover:bg-white/15 hover:backdrop-blur-sm rounded-full px-2 py-0.5 cursor-pointer transition-colors">culture</div>
        <div className="capitalize hover:bg-white/15 hover:backdrop-blur-sm rounded-full px-2 py-0.5 cursor-pointer transition-colors">artists</div>
      </div>

      {/* 4. DESKTOP AUTH BUTTONS (Hidden on mobile) */}
      <div className="hidden md:flex capitalize gap-2 order-3">
        <button className='bg-[#890620] text-[#FFCDB2] px-4 py-2 border border-[#890620] rounded-2xl hover:bg-[#a00827] transition-colors'>sign-up</button>
        <button className='bg-[#890620] text-[#FFCDB2] border px-4 py-2 rounded-2xl hover:bg-[#a00827] transition-colors'>sign-in</button>
      </div>

      {/* 5. MOBILE DROPDOWN MENU */}
      {/* Renders only when isOpen is true. Positioned absolutely just below the navbar */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[#faf9f6] border-b border-[#890620]/20 shadow-xl flex flex-col items-center gap-6 py-4 md:hidden z-40 order-4">
          
          {/* Mobile Navigation Links */}
          <div className="flex flex-col items-center gap-6 text-[#890620] text-xl font-semibold">
            <span className="capitalize cursor-pointer hover:opacity-70">Categories</span>
            <span className="capitalize cursor-pointer hover:opacity-70">Culture</span>
            <span className="capitalize cursor-pointer hover:opacity-70">Artists</span>
          </div>
          
          {/* Mobile Auth Buttons */}
          <div className="flex flex-col gap-4 w-full px-8 mt-4">
            <button className='w-full bg-[#890620] text-[#FFCDB2] px-4 py-3 rounded-2xl capitalize text-lg font-medium'>sign-up</button>
            <button className='w-full border-2 border-[#890620] text-[#890620] px-4 py-3 rounded-2xl capitalize text-lg font-medium'>sign-in</button>
          </div>

        </div>
      )}

    </nav>
  );
}

export default Navbar;