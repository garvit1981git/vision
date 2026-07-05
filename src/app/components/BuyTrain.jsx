"use client";
import React, { useRef } from "react";
import art1 from "../Images/art1.webp";
import art2 from "../Images/art2.jpg";
import art3 from "../Images/art3.webp";
import art4 from "../Images/hero-3.jpg";
import art5 from "../Images/art-5.jpg";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
// THIS IS CALLED SEEMELESS LOOP ILLUSION
const BuyTrain = () => {
  const CoachImages = [
    { src: art1, name: "veil" },
    { src: art2, name: "veil" },
    { src: art3, name: "veil" },
    { src: art4, name: "veil" },
    { src: art5, name: "veil" },
    { src: art1, name: "veil" },
    { src: art2, name: "veil" },
    { src: art3, name: "veil" },
    { src: art4, name: "veil" },
    { src: art5, name: "veil" },
    { src: art1, name: "veil" },
    { src: art2, name: "veil" },
    { src: art3, name: "veil" },
    { src: art4, name: "veil" },
    { src: art5, name: "veil" },
  ];
  let ParentRef = useRef(null);
  let TrainRef = useRef(null);
  let [isAnimating, setIsAnimating] = React.useState(false);
  let [isJumping, setIsJumping] = React.useState(false);
  let [move, setMove] = React.useState(0);
  useGSAP(
    // console.log(move),
    () => {
      let firstCoach = TrainRef.current.children[0];
      const firstCoachWidth = firstCoach.offsetWidth;
      let gap = 20;
      let movex = (firstCoachWidth + gap) * move;
      if (isJumping) {
        // Teleport instantly! (Duration 0)
        gsap.set(TrainRef.current, { x: movex });
        setIsJumping(false); // Reset so the next click animates normally
        setIsAnimating(false); // Re-enable buttons
      } else {
        // STEP 3: ANIMATE NORMALLY
        gsap.to(TrainRef.current, {
          x: movex,
          duration: 0.3,
          ease: "power2.inOut",
          onComplete: () => {
            if (move >= 5) {
              // We slid too far RIGHT into the fakes. Teleport to the real first image.
              setIsJumping(true);
              setMove(0);
            } else if (move <= -5) {
              // We slid too far LEFT into the fakes. Teleport to the real last image.
              setIsJumping(true);
              setMove(0);
            } else {
              // We are safely in the middle. Just re-enable buttons.
              setIsAnimating(false);
            }
          },
        });
      }
    },

    {
      dependencies: [move, isJumping],
    },
  );
  let HandleRight = () => {
    if (isAnimating) return; // Prevent clicking while moving
    setIsAnimating(true);
    setMove((prev) => (prev > -CoachImages.length ? prev - 1 : prev));
  };
  let HandleLeft = () => {
    if (isAnimating) return; // Prevent clicking while moving
    setIsAnimating(true);
    setMove((prev) => (prev < CoachImages.length - 1 ? prev + 1 : prev));
  };
  return (
    <>
      <div className="flex flex-col">
        <div ref={ParentRef} className="relative w-full overflow-hidden">
          <button
            onClick={HandleLeft}
            className="absolute left-[5%] hidden md:flex  border-2 border-[#890620] text-[#890620] rounded-full  hover:bg-[#890620] hover:text-white transition-all duration-300 group z-10 flex-row-reverse justify-between items-center capitalize font-['Mona_Sans_Variable'] px-2 py-2  top-[50%]  whitespace-nowrap"
            aria-label="Next slide"
          >
            <svg
              xmlns="http://www.w2.org/1999/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={4}
              stroke="currentColor"
              className="w-8 h-8  transform transition-transform group-hover:-translate-x-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
          </button>
          <div
            ref={TrainRef}
            className="train   text-[#890620]  justify-center gap-5 flex items-center"
          >
            {CoachImages.map((img, index) => {
              return (
                <React.Fragment key={index}>
                  {/* 
        Card Container 
        - Adjusted clamp: 280px minimum (good for mobile), 
        - 30vw preferred (scales nicely on tablets/laptops), 
        - 420px max (large and bright on big screens).
      */}
                  <div
                    // ref={CoachRef}
                    className="coach w-[clamp(280px,30vw,420px)] flex flex-col shrink-0 bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl group"
                  >
                    {/* Image Wrapper */}
                    <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-100">
                      <Image
                        src={img.src}
                        alt={img.name || `Coach Image ${index + 1}`}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Card Content (Name & Button) */}
                    <div className="p-5 flex flex-col gap-4">
                      <h3 className="text-xl font-bold text-gray-900 truncate">
                        {img.name || "Special Edition Coach"}
                      </h3>

                      <button
                        type="button"
                        className="w-full bg-black text-white font-semibold py-3 px-4 rounded-xl hover:bg-gray-800 transition-colors active:scale-95 flex items-center justify-center"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
          <button
            onClick={HandleRight}
            className="absolute right-[5%] hidden md:flex   border-2 border-[#890620] text-[#890620] rounded-full  hover:bg-[#890620] hover:text-white transition-all duration-300 group z-10 flex-row-reverse justify-between items-center capitalize font-['Mona_Sans_Variable'] px-2 py-2  top-[50%]   flex whitespace-nowrap"
            aria-label="Next slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={4}
              stroke="currentColor"
              className="w-8 h-8  transform transition-transform group-hover:translate-x-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </button>
        </div>

        <div className="flex gap-5 justify-center items-center md:hidden">
          <button
            onClick={HandleLeft}
            className=" border border-[#890620] text-[#890620] rounded-full  hover:bg-[#890620] hover:text-white transition-all duration-300 group z-10 flex-row-reverse justify-between items-center capitalize font-['Mona_Sans_Variable'] px-2 py-2  top-[50%] left-0   whitespace-nowrap"
            aria-label="Next slide"
          >
            <svg
              xmlns="http://www.w2.org/1999/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4 sm:w-6 sm:h-6 transform transition-transform group-hover:-translate-x-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
          </button>
          <button
            onClick={HandleRight}
            className="border border-[#890620] text-[#890620] rounded-full  hover:bg-[#890620] hover:text-white transition-all duration-300 group z-10 flex-row-reverse justify-between items-center capitalize font-['Mona_Sans_Variable'] px-2 py-2  top-[50%] right-0  flex whitespace-nowrap"
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
      </div>
    </>
  );
};

export default BuyTrain;
