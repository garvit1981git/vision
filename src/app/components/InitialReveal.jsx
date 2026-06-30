"use client";
import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { usePathname } from "next/navigation"; // 1. Import the Next.js router hook

export default function InitialReveal({ children }) {
  const pathname = usePathname();
  const isHomePage = pathname === "/"; // 2. Check if the user is on the home page

  const [isLoading, setIsLoading] = useState(true);
  const container = useRef(null);

  useEffect(() => {
    // If they aren't on the home page, do nothing.
    if (!isHomePage) return;

    // Force the loading state back to true on every refresh/mount of the home page
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 2-second loading state

    // Cleanup the timer just in case they navigate away before it finishes
    return () => clearTimeout(timer);
  }, [isHomePage]);

  useGSAP(
    () => {
      // If it's not the home page, or it's still loading, skip the animation
      if (!isHomePage || isLoading) return;

      gsap.fromTo(
        ".page-wrapper",
        { clipPath: "circle(0% at 50% 50%)" },
        {
          clipPath: "circle(100% at 50% 50%)",
          duration: 2.5,
          ease: "power4.inOut",
          onComplete: () => {
            // Remove clip-path so fixed elements (like Navbars) don't break
            gsap.set(".page-wrapper", { clearProps: "clipPath" });
          },
        }
      );
    },
    { dependencies: [isLoading, isHomePage], scope: container }
  );

  // 3. THE GATEKEEPER: If they are on /about, /contact, etc., just render the page normally!
  if (!isHomePage) {
    return <>{children}</>;
  }

  // 4. If they ARE on the home page, render the wrapper with the animation
  return (
    <div ref={container} className="relative w-full min-h-screen">
      
      {/* ── The Loading Circle ── */}
      {isLoading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none">
          <div className="w-16 h-16 border-2 rounded-full animate-pulse"></div>
        </div>
      )}

      {/* ── The Hidden Website ── */}
      <div
        className="page-wrapper w-full h-full"
        style={{ clipPath: "circle(0% at 50% 50%)" }}
      >
        {children}
      </div>
      
    </div>
  );
}