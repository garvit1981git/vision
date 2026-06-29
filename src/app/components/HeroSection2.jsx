"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import hero1 from "../Images/hero-1.jpg";
import hero2 from "../Images/hero-2.webp";
import hero3 from "../Images/hero-3.jpg";
import hero4 from "../Images/hero-4.jpg";
import hero5 from "../Images/hero-5.webp";
import hero6 from "../Images/hero-6.jpg";
import hero2img from "../Images/heroimg6  .jpg";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const HeroSection2 = () => {
  let SlideData = [
    {
      id: 1,
      imgsrc: hero1,
      line1: "the",
      line2: "art",
      line3: "that",
      line4: "keeps",
      line5: "speaking",
    },
    {
      id: 2,
      imgsrc: hero3,
      line1: "the",
      line2: "art",
      line3: "from",
      line4: "quiet",
      line5: "CHARCOAL",
    },
    {
      id: 3,
      imgsrc: hero4,
      line1: "RAW",
      line2: "art",
      line3: "from",
      line4: "quiet",
      line5: "WOODLAND",
    },
    {
      id: 4,
      imgsrc: hero5,
      line1: "THE",
      line2: "sun",
      line3: "that",
      line4: "draws",
      line5: "DAYLIGHT",
    },
    {
      id: 5,
      imgsrc: hero6,
      line1: "THE",
      line2: "art",
      line3: "that",
      line4: "holds",
      line5: "DARKNESS",
    },
  ];

  return (
    <>
    <div className="w-full h-[85vh] flex justify-center items-center ">
      <Image
        src={hero2img}
        alt="hero image"
        sizes="90vw"
        quality={100}
        className=" mx-auto w-full h-[85vh] -z-10 absolute inset-0 object-cover"
        // 1. I deleted the width and height props! Let Next.js do it automatically.
      />
   <h1 className="capitalize text-[#890620] text-3xl sm:text-5xl md:text-6xl font-['Instrument_Serif'] text-center font-bold px-3 py-2  bg-white/20 backdrop-blur-xs rounded-r-2xl  shadow-xl whitespace-nowrap">
          "something that inspires you"
        </h1>

    </div>
    </>
  );
};

export default HeroSection2;
