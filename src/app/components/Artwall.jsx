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
      styles: "top-[5%] left-[2%] -rotate-6 w-[30vw] sm:w-[150px] md:w-[200px]",
    },
    {
      src: wall2,
      styles: "bottom-[10%] left-[2%] md:left-[5%] -rotate-6 w-[30vw] sm:w-[150px] md:w-[280px]",
    },
    {
      src: wall3,
      styles: "top-[8%] right-[2%] md:right-[5%] rotate-6 w-[30vw] sm:w-[150px] md:w-[260px]",
    },
    {
      src: wall4,
      styles: "bottom-[5%] right-[2%] rotate-6 w-[30vw] sm:w-[150px] md:w-[250px]",
    },
    {
      src: wall5,
      styles: "top-[40%] left-[-2%] md:left-[2%] rotate-12 w-[30vw] sm:w-[150px] md:w-[220px]",
    },
    {
      src: wall6,
      styles: "top-[30%] right-[2%] -rotate-6 w-[100px] sm:w-[30vw] md:w-[240px]",
    },
    {
      src: wall7,
      styles: "top-[2%] left-[35%] md:left-[30%] rotate-6 w-[30vw] sm:w-[150px] md:w-[260px]",
    },
    {
      src: wall8,
      styles: "bottom-[2%] left-[35%] md:left-[40%] -rotate-6 w-[30vw] sm:w-[150px] md:w-[250px]",
    },
    {
      src: wall9,
      styles: "top-[25%] left-[15%] md:left-[20%] -rotate-12 w-[30vw] sm:w-[150px] md:w-[200px]",
    },
    {
      src: wall10,
      styles: "top-[12%] right-[15%] md:right-[25%] rotate-12 w-[30vw] sm: w-[150px] md:w-[330px]",
    },
    {
      src: wall11,
      styles: "bottom-[17%] right-[15%] md:right-[22%] -rotate-6 w-[30vw] sm:w-[150px] md:w-[280px]",
    },
    {
      src: hero1,
      styles: "bottom-[8%] left-[20%] md:left-[25%] rotate-12 w-[30vw] sm:w-[150px] md:w-[200px]",
    },
  ];

  return (
    // Reduced minimum height on mobile so there isn't massive empty scrolling space
    <div className="mt-20 flex h-[80vh]  justify-center items-center w-full relative overflow-hidden">
      
      {/* Background Image: Fixed for Next.js responsiveness */}
      <div className="absolute inset-0 -z-10">
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
        <h1 className="capitalize text-[#890620] lg:text-[4vw] md:text-[5vw] text-[8vw] font-['Instrument_Serif'] text-center font-bold px-3 py-2  border shadow-xl">
          "something that inspires you"
        </h1>
      </div>

      {/* Scattered Images */}
      {wallImages.map((img, index) => (
        <div
          key={index}
          className={`absolute shadow-xl rounded-2xl overflow-hidden hover:scale-110 hover:z-40 hover:shadow-2xl transition-all duration-500 ease-out cursor-pointer opacity-100 hover:opacity-100 ${img.styles}`}
        >
          <Image
            src={img.src}
            alt={`Gallery Art ${index + 1}`}
            width={400}
            height={400} // Give generous base pixel constraints for Next.js calculation
            className="object-cover w-full h-auto"
          />
        </div>
      ))}
    </div>
  );
};

export default Artwall;
