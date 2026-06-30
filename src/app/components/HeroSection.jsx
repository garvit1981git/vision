"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// Import your images here
import hero1 from "../Images/hero-1.jpg";
import hero2 from "../Images/hero-2.webp";
import hero3 from "../Images/hero-3.jpg";
import hero4 from "../Images/hero-4.jpg";
import hero5 from "../Images/hero-5.webp";
import hero6 from "../Images/hero-6.jpg";

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
  let isAnimating = useRef(false); // Prevents spam-clicking while swiping
  let [CurrentSlideIndex, SetCurrentSlideIndex] = useState(0);

  // 1. Calculate the Previous, Current, and Next indices
  const nextIndex = (CurrentSlideIndex + 1) % SlideData.length;
  const prevIndex =
    (CurrentSlideIndex - 1 + SlideData.length) % SlideData.length;

  const currentSlide = SlideData[CurrentSlideIndex];
  const nextSlideData = SlideData[nextIndex];
  const prevSlideData = SlideData[prevIndex];

  // 2. The Swipe-Out Animation (Fires before state changes)
  const triggerSwipeNext = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    // Toss the current card off-screen to the left
    gsap.to(".active-card", {
      x: -window.innerWidth * 0.5, // Swipe left
      y: 80, // Dip slightly down
      rotation: -18, // Spin out
      opacity: 0,
      duration: 0.35,
      ease: "power3.in",
      onComplete: () => {
        // Once the card is gone, update the React state
        SetCurrentSlideIndex((prev) =>
          prev === SlideData.length - 1 ? 0 : prev + 1,
        );
      },
    });

    // Softly fade text out
    gsap.to(".text-content", {
      y: -15,
      opacity: 0,
      duration: 0.25,
      ease: "power2.inOut",
    });
  };

  // 3. The Pull-Forward Animation (Fires after state changes)
  useGSAP(
    () => {
      // We grab the card from the "Next" position (rotated right, scaled down)
      // and animate it into the center position
      gsap.fromTo(
        ".active-card",
        { x: 50, y: 15, rotation: 12, scale: 0.85, opacity: 0.5 },
        {
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(1.4)",
          onComplete: () => {
            isAnimating.current = false; // Unlock clicking
          },
        },
      );

      // Animate the text sliding back up
      gsap.fromTo(
        ".text-content",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, delay: 0.15, ease: "power3.out" },
      );
    },
    { dependencies: [CurrentSlideIndex], scope: container },
  );

  useEffect(() => {
    timerId.current = setInterval(triggerSwipeNext, 4000);
    return () => clearInterval(timerId.current);
  }, []);

  let handleManualNext = () => {
    if (isAnimating.current) return;
    clearInterval(timerId.current);
    triggerSwipeNext(); // Trigger the swipe out
    timerId.current = setInterval(triggerSwipeNext, 4000); // Restart timer
  };

  const baseCardStyles =
    "absolute top-0 w-full h-full rounded-2xl overflow-hidden shadow-xl transition-all duration-500 ease-in-out cursor-pointer";

  return (
    <div
      ref={container}
      className={[
        "w-full min-h-[85vh] md:min-h-screen relative overflow-hidden",
        "flex flex-col items-center justify-center pt-24 pb-12 px-4 ",
      ].join(" ")}
    >
      {/* ── Visual Card Stack ── */}
      <div
        onClick={handleManualNext}
        className="relative w-[65vw] sm:w-[40vw] md:w-[25vw] max-w-[320px] aspect-[3/4] z-20 group"
      >
        {/* Previous Card (Back Left) */}
        <div
          className={[
            baseCardStyles,
            "z-10 opacity-50 -rotate-6 -translate-x-6 sm:-translate-x-12 scale-95",
            "group-hover:-translate-x-8 sm:group-hover:-translate-x-16",
          ].join(" ")}
        >
          <Image
            src={prevSlideData.imgsrc}
            alt="Previous Slide"
            fill
            className="object-cover"
          />
        </div>

        {/* Next Card (Back Right) */}
        <div
          className={[
            baseCardStyles,
            "z-10 opacity-50 rotate-6 translate-x-6 sm:translate-x-12 scale-95",
            "group-hover:translate-x-8 sm:group-hover:translate-x-16",
          ].join(" ")}
        >
          <Image
            src={nextSlideData.imgsrc}
            alt="Next Slide"
            fill
            className="object-cover"
          />
        </div>

        {/* Current Card (Front Center) */}
        <div
          className={[
            baseCardStyles,
            "active-card z-30 opacity-100 rotate-0 translate-x-0 scale-100",
            "border-4 border-white shadow-2xl",
          ].join(" ")}
        >
          <Image
            src={currentSlide.imgsrc}
            alt="Current Slide"
            fill
            priority
            className="object-cover"
          />
        </div>
      </div>

      {/* ── Minimalist 1-Column Text ── */}
      <div className="text-content mt-16 md:mt-20 z-40 flex flex-col items-center text-center px-4">
        <h3 className="uppercase tracking-widest text-xs sm:text-sm font-semibold text-gray-500 mb-2 md:mb-4">
          {`${currentSlide.line1} ${currentSlide.line2} ${currentSlide.line3} ${currentSlide.line4}`}
        </h3>

        <h1
          className={[
            "uppercase font-['Instrument_Serif'] text-[#890620] leading-none",
            "text-6xl sm:text-7xl md:text-8xl lg:text-[7rem]",
          ].join(" ")}
        >
          {currentSlide.line5}
        </h1>
      </div>
    </div>
  );
};

export default HeroSection;
