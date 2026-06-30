import React from "react";
import wall1 from "../Images/wall1.jpg";
import wall2 from "../Images/wall2.jpg";
import wall3 from "../Images/wall3.jpg";
import wall4 from "../Images/wall4.jpg";
import wall5 from "../Images/wall5.jpg";
import wall6 from "../Images/wall6.jpg";
import wall7 from "../Images/wall7.jpg";
import wall8 from "../Images/wall8.jpg";
import wall9 from "../Images/wall9.jpg";
import wall10 from "../Images/wall10.jpg";
import wall11 from "../Images/wall11.jpg";
import hero1 from "../Images/hero-1.jpg";
import bg2 from "../Images/bg2.avif";
import Image from "next/image";


const Artwall = () => {
  // 1. Updated styles: Smaller base widths for mobile (e.g., w-[90px]), 
  // standard rotations (-rotate-6, rotate-12), and adjusted mobile coordinates.
const wallImages = [
    {
      src: wall1,
      styles: "top-[10%] md:top-[5%] left-[2%] w-[clamp(140px,25vw,240px)]",
    },
    {
      src: wall9, 
      styles: "top-[22%] md:top-[25%] left-[12%] md:left-[22%] w-[clamp(110px,20vw,190px)]",
    },
    {
      src: wall2, 
      styles: "bottom-[8%] md:bottom-[5%] left-[2%] md:left-[5%] w-[clamp(110px,28vw,260px)]",
    },
    {
      src: wall8, 
      styles: "bottom-[22%] md:bottom-[25%] left-[18%] md:left-[30%] w-[clamp(110px,22vw,240px)]",
    },
    {
      src: wall5, 
      styles: "top-[42%] md:top-[45%] left-[-5%] md:left-[1%] w-[clamp(110px,20vw,200px)]",
    },
    {
      src: wall6, 
      styles: "top-[40%] md:top-[42%] right-[-5%] md:right-[1%] w-[clamp(110px,22vw,210px)]",
    },
    {
      src: wall3, 
      styles: "top-[10%] md:top-[8%] right-[2%] md:right-[4%] w-[clamp(110px,24vw,220px)]",
    },
    {
      src: wall10, 
      styles: "top-[22%] md:top-[20%] right-[15%] md:right-[26%] w-[clamp(110px,26vw,280px)]",
    },
    {
      src: wall4, 
      styles: "bottom-[10%] md:bottom-[8%] right-[2%] md:right-[5%] w-[clamp(110px,25vw,250px)]",
    },
    {
      src: wall11, 
      styles: "bottom-[25%] md:bottom-[22%] right-[15%] md:right-[24%] w-[clamp(110px,23vw,230px)]",
    },
    {
      src: wall7, 
      styles: "top-[5%] md:top-[4%] left-[35%] md:left-[35%] w-[clamp(110px,22vw,230px)]",
    },
    {
      src: hero1, 
      styles: "bottom-[8%] md:bottom-[8%] left-[40%] md:left-[50%] w-[clamp(100px,20vw,200px)]",
    },
  ];

  return (
    // Reduced minimum height on mobile so there isn't massive empty scrolling space
    <div className="mt-20 flex h-[60vh] sm:h-[80vh] justify-center items-center w-full relative overflow-hidden">
      
      {/* Background Image: Fixed for Next.js responsiveness */}
      <div className="absolute inset-0 z-2">
        <Image
          src={bg2}
          alt="Art Wall Background"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Central Text */}
      <div className="relative z-50 pointer-events-none px-4">
        {/* Adjusted text sizing (text-4xl for mobile) and added a subtle glass backdrop so it's always readable */}
        <h1 className="capitalize text-[#890620] text-3xl sm:text-5xl md:text-6xl font-['Instrument_Serif'] text-center font-bold px-3 py-2  bg-white/20 backdrop-blur-xs rounded-r-2xl  shadow-xl whitespace-nowrap">
          "something that inspires you"
        </h1>
      </div>

      {/* Scattered Images */}
      {wallImages.map((img, index) => (
        <div
          key={index}
          className={`absolute z-3 shadow-xl rounded-2xl overflow-hidden hover:scale-110 hover:z-40 hover:shadow-2xl transition-all duration-500 ease-out cursor-pointer opacity-100 hover:opacity-100 ${img.styles}`}
        >
          <Image
            src={img.src}
            alt={`Gallery Art ${index + 1}`}
            width={400}
            height={400} // Give generous base pixel constraints for Next.js calculation
            className="object-cover opacity-87 w-full h-auto"
          />
        </div>
      ))}
    </div>
  );
};

export default Artwall;
