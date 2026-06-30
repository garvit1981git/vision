"use client";
import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { usePathname } from "next/navigation";

export default function InitialReveal({ children }) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const wrapperRef = useRef(null);
const [isAnimating, setIsAnimating] = useState(isHomePage);
  useGSAP(
    () => {
      // If it's not the home page, skip the animation entirely
      if (!isHomePage || !wrapperRef.current) return;

      gsap.fromTo(
        wrapperRef.current,
        {
          // Start as an invisible dot in the dead center
          clipPath: "circle(10px at 50vw 50vh)",
        },
        {
          // Expand well beyond 100% so the corners aren't cut off
          clipPath: "circle(150vmax at 50vw 50vh)",
          duration: 3, // Adjust speed here (2 seconds is usually a good smooth reveal)
          ease: "power3.inOut",
          onComplete: () => {
            setIsAnimating(false);
            // Remove the clip-path after animation so fixed elements (navbars, modals) don't break
            gsap.set(wrapperRef.current, { clearProps: "clipPath" });
          },
        },
      );
    },
    { dependencies: [isHomePage] },
  );

  // GATEKEEPER: If on /about, /contact, etc., render normally without the wrapper
  if (!isHomePage) {
    return <>{children}</>;
  }

  // HOME PAGE: Render the wrapper with the initial inline style set to 0%
  // to prevent a "flash" of the full page before GSAP kicks in.
  return (
    <div
      ref={wrapperRef}
      className={`w-full  page-wrapper bg-[#FFCDB2] p-1 sm:p-3 md:p-6 ${
        isAnimating ? "h-screen overflow-hidden" : "min-h-screen"
      }`}
      style={isAnimating ? { clipPath: "circle(0px at 50vw 50vh)" } : {}}
    >
      {children}
    </div>
  );
}
