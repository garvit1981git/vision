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
      // 1. Create a matchMedia instance
      let mm = gsap.matchMedia();

      // 2. Add your breakpoints (matching Tailwind's default breakpoints)
      mm.add(
        {
          isMobile: "(max-width: 639px)", // default (under sm)
          isTablet: "(min-width: 640px) and (max-width: 767px)", // sm to md
          isDesktop: "(min-width: 768px)", // md and up
        },
        (context) => {
          // 3. Extract the active conditions
          let { isMobile, isTablet, isDesktop } = context.conditions;

          // 4. Set your variable based on the screen size
          let responsiveX = isMobile ? "18vw" : isTablet ? "23vw" : "26vw";

          // 5. Run your animations using the new variable!
          gsap.set(".animation-text", { x: "50vw", opacity: 0 }); // Starting position
          gsap.set(".animation-img", { scale: 0.9, opacity: 0 });

          gsap.to(".animation-text", {
            x: responsiveX, // Passes "22vw", "23vw", or "25vw" to GSAP
            opacity: 0.88,
            duration: 1.5,
            stagger: 0.3,
            ease: "power4.out",
          });

          gsap.to(".animation-img", {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "power3.out",
          });
        },
      );
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
    "animation-text translate-x-[25vw]  uppercase font-['Instrument_Serif'] text-[#890620]";
  let size = "text-5xl sm:text-6xl md:text-7xl ";

  return (
    <div
      ref={container}
      className="mt-4 max-h-350px w-full  relative flex flex-col  "
    >
      {/* ── Row 1: line1 (left) · line2 (right) ── */}
      <span
        className={`${txt} ${size} 
           opacity-88 w-auto `}
      >
        {currentSlide.line1}
      </span>
      <span
        className={`${txt} ${size} 
          opacity-88`}
      >
        {currentSlide.line2}
      </span>

      {/* ── Center image — scales with viewport ── */}
      <Image
        src={currentSlide.imgsrc}
        alt="hero image"
        className="rounded-4xl animation-img object-cover w-[clamp(150px,16vw,200px)] h-auto my-4 md:my-0 absolute left-1/2 sm:w-[clamp(200px,16vw,280px)] sm:-translate-x-1/2 -z-10   "
      />

      {/* ── Row 2: line3 (left) · line4 (right) ── */}
      <h1 className={`${txt} ${size}  opacity-88`}>{currentSlide.line3}</h1>
      <h1
        className={`${txt} ${size}
          opacity-88`}
      >
        {currentSlide.line4}
      </h1>

      {/* ── Row 3: line5 (center-ish) ── */}
      <h1
        className={`${txt} ${size} 
          opacity-88`}
      >
        {currentSlide.line5}
      </h1>

      {/* ── Next button ── */}
      {/* <button
        onClick={handleManualNext}
        className=" sm:mr-4
                   p-2.5 sm:p-4 border border-[#890620] text-[#890620]
                   rounded-full hover:bg-[#890620] hover:text-white
                   transition-all duration-300 group "
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
      </button> */}
    </div>
  );
};

export default HeroSection;
