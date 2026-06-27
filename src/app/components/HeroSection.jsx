"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import hero1 from "../Images/hero-1.jpg";
import hero2 from "../Images/hero-2.webp";
import hero3 from "../Images/hero-3.jpg";
import hero4 from "../Images/hero-4.jpg";
import hero5 from "../Images/hero-5.webp";
import hero6 from "../Images/hero-6.jpg";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const HeroSection = () => {
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

  let container = useRef(null);
  let timerId = useRef(null);
  let [CurrentSlideIndex, SetCurrentSlideIndex] = useState(0);
  const currentSlide = SlideData[CurrentSlideIndex];

  useGSAP(
    () => {
      gsap.set(".animation-text", { x: 40, opacity: 0 });
      gsap.set(".animation-img", { scale: 0.9, opacity: 0 });
      gsap.to(".animation-text", {
        x: 0,
        opacity: 0.88,
        duration: 1.5,
        ease: "power4.out",
      });
      gsap.to(".animation-img", {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
      });
    },
    { dependencies: [CurrentSlideIndex], scope: container },
  );

  let nextSlide = () => {
    SetCurrentSlideIndex((prev) =>
      prev === SlideData.length - 1 ? 0 : prev + 1,
    );
  };

  useEffect(() => {
    timerId.current = setInterval(nextSlide, 4000);
    return () => clearInterval(timerId.current);
  }, []);

  let handleManualNext = () => {
    clearInterval(timerId.current);
    nextSlide();
    timerId.current = setInterval(nextSlide, 4000);
  };

  // Shared text classes — font scales up at each breakpoint
  // sm≈640px  md≈768px  lg≈1024px
  const txt =
    "animation-text uppercase font-['Instrument_Serif'] text-[#890620] absolute ";
  const size = "text-[4.2rem] sm:text-[5rem] md:text-[6rem] lg:text-[7.5rem]";

  return (
    <div
      ref={container}
      className="mt-4 flex h-[60vh] sm:h-[65vh] md:h-[70vh] w-full border items-center justify-end relative overflow-hidden"
    >
      {/* ── Row 1: line1 (left) · line2 (right) ── */}
      <h1
        className={`${txt} ${size} top-[6%] sm:top-[4%]
          left-[8%] sm:left-[27%] md:left-[28%]
          -z-10 opacity-88`}
      >
        {currentSlide.line1}
      </h1>
      <h1
        className={`${txt} ${size} top-[6%] sm:top-[4%]
          left-[60%] sm:left-[59%] md:left-[60%]
          opacity-88`}
      >
        {currentSlide.line2}
      </h1>

      {/* ── Center image — scales with viewport ── */}
      <Image
        src={currentSlide.imgsrc}
        alt="hero image"
        width={300}
        className="rounded-4xl animation-img absolute left-1/2 -translate-x-1/2
                   w-[clamp(200px,18vw,300px)] h-auto"
      />

      {/* ── Row 2: line3 (left) · line4 (right) ── */}
      <h1
        className={`${txt} ${size} top-[40%]
          left-[1%] sm:left-[24%] md:left-[25%]
          -z-10 opacity-88`}
      >
        {currentSlide.line3}
      </h1> 
      <h1
        className={`${txt} ${size} top-[40%]
          left-[50%] sm:left-[54%] md:left-[55%]
          opacity-88`}
      >
        {currentSlide.line4}
      </h1>

      {/* ── Row 3: line5 (center-ish) ── */}
      <h1
        className={`${txt} ${size} bottom-0
          left-[20%] sm:left-[32%] md:left-[34%]
          opacity-88`}
      >
        {currentSlide.line5}
      </h1>

      {/* ── Next button ── */}
      <button
        onClick={handleManualNext}
        className="absolute bottom-3 right-3 sm:static sm:mr-4
                   p-2.5 sm:p-4 border border-[#890620] text-[#890620]
                   rounded-full hover:bg-[#890620] hover:text-white
                   transition-all duration-300 group z-10"
        aria-label="Next slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-4 h-4 sm:w-6 sm:h-6 transform transition-transform group-hover:translate-x-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
          />
        </svg>
      </button>
    </div>
  );
};

export default HeroSection;
