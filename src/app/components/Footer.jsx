"use client";
import React, { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger (Good practice when working in Next.js/React)
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Footer = () => {
  const footerRef = useRef(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useGSAP(
    () => {
      // 1. Animate the giant text and email (sliding up and fading in)
      gsap.from(".footer-header-item", {
        y: 200,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 75%", // Starts animating when the footer is 75% up the screen
          toggleActions: "play none none reverse", // Plays on enter, reverses if they scroll back up
        },
      });

      // 2. Animate the columns of links (a subtle cascading fade)
      gsap.from(".footer-column", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15, // Cascades from left to right
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 50%", // Waits until the footer is pulled higher up to animate links
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: footerRef }, // Scoping ensures GSAP only selects classes inside this specific footer
  );

  return (
    <footer
      ref={footerRef}
      className="w-full px-4 md:px-20 py-16 flex flex-col justify-between border-t border-[#890620]/30 text-[#890620] bg-black min-h-[50vh] relative z-10 "
    >
      {/* Top Section: Scaled-down Typography & Intro */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 border-b border-[#890620]/20 pb-12 overflow-hidden">
        <h1 className="footer-header-item font-['Instrument_Serif'] text-[12vw] md:text-[6vw] leading-[0.9] tracking-tight">
          Let's create <br /> together.
        </h1>
        <div className="footer-header-item flex flex-col gap-4 md:text-right mt-2 md:mt-0">
          <p className="font-['Mona_Sans_Variable'] text-sm md:text-base max-w-xs opacity-80">
            Discover unique artworks, meet the creatives, and bring a piece of
            their world into yours.
          </p>
          <a
            href="mailto:contact@artgallery.com"
            className="font-['Mona_Sans_Variable'] text-lg hover:opacity-70 transition-opacity underline decoration-[#890620]/50 underline-offset-4"
          >
            contact@artgallery.com
          </a>
        </div>
      </div>

      {/* Middle Section: Distributed Links Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12 font-['Mona_Sans_Variable'] w-full py-12 text-lg">
        {/* Menu Links */}
        <div className="footer-column flex flex-col gap-4">
          <span className="text-xs uppercase tracking-widest font-bold opacity-50 mb-1">
            Menu
          </span>
          <a
            href="#art-wall"
            className="hover:opacity-60 transition-opacity flex items-center gap-1 group w-fit"
          >
            Art Wall
            <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all" />
          </a>
          <a
            href="#explore"
            className="hover:opacity-60 transition-opacity flex items-center gap-1 group w-fit"
          >
            Explore
            <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all" />
          </a>
          <a
            href="#buy"
            className="hover:opacity-60 transition-opacity flex items-center gap-1 group w-fit"
          >
            Buy Products
            <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all" />
          </a>
        </div>

        {/* Info Links */}
        <div className="footer-column flex flex-col gap-4">
          <span className="text-xs uppercase tracking-widest font-bold opacity-50 mb-1">
            Info
          </span>
          <a
            href="#about"
            className="hover:opacity-60 transition-opacity flex items-center gap-1 group w-fit"
          >
            About Artists
            <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all" />
          </a>
          <a
            href="#contact"
            className="hover:opacity-60 transition-opacity flex items-center gap-1 group w-fit"
          >
            Contact Us
            <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all" />
          </a>
        </div>

        {/* Socials */}
        <div className="footer-column flex flex-col gap-4">
          <span className="text-xs uppercase tracking-widest font-bold opacity-50 mb-1">
            Socials
          </span>
          <a href="#" className="hover:opacity-60 transition-opacity">
            Instagram
          </a>
          <a href="#" className="hover:opacity-60 transition-opacity">
            Facebook
          </a>
        </div>

        {/* Legal */}
        <div className="footer-column flex flex-col gap-4">
          <span className="text-xs uppercase tracking-widest font-bold opacity-50 mb-1">
            Legal
          </span>
          <a href="#" className="hover:opacity-60 transition-opacity text-base">
            Privacy Policy
          </a>
          <a href="#" className="hover:opacity-60 transition-opacity text-base">
            Terms of Service
          </a>
        </div>
      </div>

      {/* Bottom Section: Copyright & Back to Top */}
      <div className="footer-column flex flex-col-reverse sm:flex-row justify-between items-center pt-6 gap-6 border-t border-[#890620]/20 font-['Mona_Sans_Variable'] text-sm">
        <p className="opacity-70 text-center sm:text-left">
          © {new Date().getFullYear()} Art Gallery. All rights reserved.
        </p>
        <button
          onClick={scrollToTop}
          className="hover:opacity-60 transition-opacity uppercase tracking-widest text-xs font-bold flex items-center gap-2"
        >
          Back to top
          <svg
            className="w-4 h-4 rotate-180"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </button>
      </div>
    </footer>
  );
};

export default Footer;
