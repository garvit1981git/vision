"use client";
import React, { use, useEffect, useRef } from "react";

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
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Observer, ScrollTrigger } from "gsap/all";
const clamp = (min, max, value) => Math.min(Math.max(value, min), max);

// This is the wrapping function
const wrap = (min, max, value) => {
  const rangeSize = max - min;
  return ((((value - min) % rangeSize) + rangeSize) % rangeSize) + min;
};
// THIS IS CALLED FANNING ouT EFFECT
// Awwwards curved carousel,
gsap.registerPlugin(Observer);
gsap.registerPlugin(ScrollTrigger);
const ImageDisplay = () => {
  const wallImages = [
    {
      src: wall1,
    },
    {
      src: wall9,
    },
    {
      src: wall2,
    },
    {
      src: wall8,
    },
    {
      src: wall5,
    },
    {
      src: wall6,
    },
    {
      src: wall3,
    },
    {
      src: wall10,
    },
    {
      src: wall4,
    },
    {
      src: wall11,
    },
    {
      src: wall7,
    },
    {
      src: hero1,
    },
    {
      src: wall1,
    },
    {
      src: wall9,
    },
    {
      src: wall2,
    },
    {
      src: wall8,
    },
    {
      src: wall5,
    },
    {
      src: wall6,
    },
    {
      src: wall3,
    },
    {
      src: wall10,
    },
    {
      src: wall4,
    },
    {
      src: wall11,
    },
    {
      src: wall7,
    },
    {
      src: hero1,
    },
  ];
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  // We don't move a track anymore, we just track a math value.
  const targetX = useRef(0);
  const currentX = useRef(0);

  // useGSAP(

  //   () => {
  //     const cards = gsap.utils.toArray(".wheel-card");

  //     // 1. Set up the Treadmill size
  //     // 300 is the width of the card PLUS the gap between them.
  //     const gap = 300;
  //     const totalWidth = gap * cards.length;

  //     // 2. Center the first image on load
  //     targetX.current = window.innerWidth / 2 - gap / 2;
  //     currentX.current = targetX.current;

  //     Observer.create({
  //       target: sectionRef.current,
  //       type: "wheel,touch",
  //       onChange: (self) => {
  //         if (Math.abs(self.deltaX) > Math.abs(self.deltaY)) {
  //           // NO CLAMPING! We allow targetX to grow to infinity or negative infinity.
  //           targetX.current -= self.deltaX * 3;
  //         }
  //       },
  //     });

  //     const updateLoop = () => {
  //       // Smooth momentum math
  //       currentX.current = gsap.utils.interpolate(
  //         currentX.current,
  //         targetX.current,
  //         0.08,
  //       );

  //       cards.forEach((card, index) => {
  //         // Where this specific card belongs mathematically
  //         const baseX = index * gap;
  //         const rawX = baseX + currentX.current;

  //         // 🚨 THE MAGIC TELEPORTER (gsap.utils.wrap)
  //         // If the card goes further left than -gap, it teleports to the back of the line.
  //         // If it goes further right than totalWidth, it teleports to the front!
  //         const wrappedX = gsap.utils.wrap(-gap, totalWidth - gap, rawX);

  //         // Find the absolute center of this specific card
  //         const cardCenter = wrappedX + card.offsetWidth / 2;
  //         const screenCenter = window.innerWidth / 2;

  //         // Find distance from center
  //         const dist = cardCenter - screenCenter;
  //         const maxDist = window.innerWidth / 2;
  //         const normalized = gsap.utils.clamp(-1, 1, dist / maxDist);

  //         // Physics applied:
  //         const rotation = normalized * 45; // Tilt intensity
  //         const y = Math.pow(normalized, 2) * 250; // Hump height

  //         // Apply it directly to the card
  //         gsap.set(card, {
  //           x: wrappedX,
  //           y: y,
  //           rotation: rotation,
  //         });
  //       });
  //     };

  //     gsap.ticker.add(updateLoop);
  //     return () => gsap.ticker.remove(updateLoop);
  //   },
  //   { scope: sectionRef },
  // );

  useEffect(() => {
    const cards = gsap.utils.toArray(".wheel-card"); // or cardsRef.current

    // 1. Convert our constants to "let" so they can change
    let gap = 300;
    let totalWidth = 0;
    let maxHump = 250;
    let maxRotation = 45;

    // 2. Create a function that calculates the values based on screen size
    const calculateResponsiveValues = () => {
      const width = window.innerWidth;
if (width < 600) {
        // MOBILE SETTINGS
        gap = 170; // Cards are closer together
        maxHump = 120; // The hill is much flatter so it fits on screen
        maxRotation = 15; // Less tilt
      } else if (width < 768) {
        // MOBILE SETTINGS
        gap = 200; // Cards are closer together
        maxHump = 120; // The hill is much flatter so it fits on screen
        maxRotation = 25; // Less tilt
      } else if (width < 1024) {
        // TABLET SETTINGS
        gap = 250;
        maxHump = 180;
        maxRotation = 35;
      } else {
        // DESKTOP SETTINGS
        gap = 300;
        maxHump = 250;
        maxRotation = 45;
      }

      // Always recalculate the total treadmill width when the gap changes!
      totalWidth = gap * cards.length;
    };

    // 3. Run it once immediately when the component loads
    calculateResponsiveValues();
    window.addEventListener("resize", calculateResponsiveValues);
    // Center the first image on mount
    targetX.current = window.innerWidth / 2 - gap / 2;
    currentX.current = targetX.current;

    let animationFrameId;
    let touchStartX = 0;
    let touchStartY = 0;
    let lastTouchX = 0;

    // 1. THE PHYSICS LOOP (Replaces GSAP Ticker)
    const updateLoop = () => {
      // Calculate momentum distance
      let distanceToMove = (targetX.current - currentX.current) * 0.08;

      // Speed limit (max pixels per frame)
      const maxSpeed = 60;
      distanceToMove = clamp(-maxSpeed, maxSpeed, distanceToMove);

      currentX.current += distanceToMove;

      // Update every card
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        const baseX = index * gap;
        const rawX = baseX + currentX.current;

        // Teleportation logic (Replaces gsap.utils.wrap)
        const wrappedX = wrap(-gap, totalWidth - gap, rawX);

        // Find distance from screen center
        const cardCenter = wrappedX + card.offsetWidth / 2;
        const screenCenter = window.innerWidth / 2;

        const dist = cardCenter - screenCenter;
        const maxDist = window.innerWidth / 2;
        const normalized = clamp(-1, 1, dist / maxDist);

        // Apply physics
        const rotation = normalized * maxRotation;

        // Use the dynamic maxHump variable instead of 250
        const y = Math.pow(normalized, 2) * maxHump;

        // Apply CSS Transforms directly
        card.style.transform = `translate(${wrappedX}px, calc(-50% + ${y}px)) rotate(${rotation}deg)`;
      });

      animationFrameId = requestAnimationFrame(updateLoop);
    };

    // Start the loop
    animationFrameId = requestAnimationFrame(updateLoop);

    // 2. INPUT OBSERVERS (Replaces GSAP Observer)
    const handleWheel = (e) => {
      // Check if scrolling horizontally
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault(); // Prevent browser back/forward swipe gestures

        // Clamp user swipe input
        let safeDelta = clamp(-100, 100, e.deltaX);
        targetX.current -= safeDelta * 1.5;
      }
    };

    const handleTouchStart = (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      lastTouchX = touchStartX;
    };

    const handleTouchMove = (e) => {
      const touchX = e.touches[0].clientX;
      const touchY = e.touches[0].clientY;
      const deltaX = touchStartX - touchX;
      const deltaY = touchStartY - touchY;

      // If swiping horizontally more than vertically
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // We do not preventDefault here so vertical scrolling still works if needed
        const moveDelta = lastTouchX - touchX;
        let safeDelta = clamp(-100, 100, moveDelta);
        targetX.current -= safeDelta * 2.0;
        lastTouchX = touchX;
      }
    };

    // Attach native event listeners
    const section = sectionRef.current;
    if (section) {
      section.addEventListener("wheel", handleWheel, { passive: false });
      section.addEventListener("touchstart", handleTouchStart, {
        passive: true,
      });
      section.addEventListener("touchmove", handleTouchMove, { passive: true });
    }

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      if (section) {
        section.removeEventListener("wheel", handleWheel);
        section.removeEventListener("touchstart", handleTouchStart);
        section.removeEventListener("touchmove", handleTouchMove);
      }
    };
  }, [wallImages.length]);
  return (
    <>
      <section
        ref={sectionRef}
        className="relative w-full h-screen overflow-hidden  flex items-center cursor-grab active:cursor-grabbing"
      >
        {wallImages.map((img, index) => {
          return (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              // Absolute positioning anchored to the center of the spinning Hub
              className="wheel-card absolute top-[50%] -translate-y-1/2 left-0 w-[clamp(160px,18vw,260px)] aspect-[3/4] origin-bottom z-10"
            >
              <Image
                src={img.src}
                alt={`Wall Image ${index + 1}`}
                fill
                className="object-cover rounded-xl shadow-2xl"
              />
            </div>
          );
        })}
      </section>
    </>
  );
};

export default ImageDisplay;
