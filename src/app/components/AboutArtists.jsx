"use client";
import React, { useState } from "react";
import artist1 from "../Images/artist1.webp";
import artist2 from "../Images/artist2.webp";
import artist3 from "../Images/artist3.jpg";
import artist4 from "../Images/artist4.webp";
import artist5 from "../Images/artist5.jpg";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

const AboutArtists = () => {
  let [openartist, setopenartist] = useState(null);
  let containerRef = React.useRef(null);
  let ArtistData = [
    {
      artist: "Eliza Mowery",
      img: artist1,
      desc: "Eliza Mowery has been a full-time artist in Indianapolis since January of 2022. Her studio is currently located at the Harrison Center and also out of her home. She primarily uses acrylic paint as her medium of choice, but enjoys playing with pastels and gauche as well Eliza’s inspiration comes from many places, but usually is found in the natural world.",
    },
    {
      artist: "Diana T Jahns",
      img: artist2,
      desc: 'Diana T Jahns is an artist and photographer based in Sacramento, California, known for her work in abstract, digital media, and minimalist genres.  She is a third-generation artist who utilizes traditional materials alongside digital photography and mixed media, explicitly stating that she does not use AI in her creative process. Her career includes numerous local, regional, and international exhibitions, such as "Through Lines" at the Epperson Gallery (2025) and "The First 10 Years" at the Verge Center for the Arts (2023)..',
    },
    {
      artist: "Angela Zybell",
      img: artist3,
      desc: "Angela Zybell is an award-winning artist specializing in plein air painting, particularly using acrylics for landscapes, wildlife, and portraits.  She is recognized as the first artist to receive a Professional Development Mini-grant from the MCACA (Michigan Council for Arts and Cultural Affairs). ]Her artistic style focuses on emotion, expression, and freedom, utilizing vibrant colors and dramatic lighting to convey her perspective of Michigan’s natural scenery.",
    },
    {
      artist: "Tessa Brown",
      img: artist4,
      desc: "Tessa Brown is an abstract and impressionist painter based in Kyle, Texas, just south of Austin. She is best known for creating moody, nostalgic landscapes and abstracts that evoke memories of nature, family, and faith.Brown works primarily in oils, acrylics, and gouache, often incorporating oil pastels and charcoal.  Her style is heavily influenced by the Impressionists, particularly Monet and Degas, whom she studied as a student. ",
    },

    {
      artist: "Eleanor Baker",
      img: artist5,
      desc: "Eleanor Baker is a self-taught, Austin-based artist known for her whimsical, mixed-media landscapes that capture the vibrant spirit of Texas. Originally trained as a mechanical engineer at The University of Texas at Austin, she transitioned to art full-time around 2020, initially creating dioramas from Amazon boxes during the pandemic before finding her signature style in acrylics, watercolors, and collage. Her work often features iconic local landmarks like Barton Springs Pool and Big Bend National Park, characterized by bold colors, playful forms, and a nostalgic, joyful atmosphere.",
    },
  ];
  let handeSeeArtwork = () => {
    console.log("hii");
  };
  let ShowDesc = (index) => {
    setopenartist((prev) => (prev == index ? null : index));
  };
  useGSAP(() => {
    // DO NOT use a timeline here. Keep them as separate standalone animations!
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "bottom bottom", // Activates when the bottom of this section hits the bottom of the viewport
      pin: true,
      pinSpacing: false, // CRITICAL: This allows the next component in the DOM (Footer) to scroll over it!
    });
    // 1. Entrance Animation
    gsap.from(".card", {
      y: 200, // (Note: you changed this from y: 200 to x: 200, which will slide them in from the side. Both look great!)
      opacity: 0,
      ease: "power4.out",
      stagger: 0.2,
      duration: 1,
      scrollTrigger: {
        trigger: ".holder",
        start: "top 80%",
        end: "bottom 60%",
        scrub: 3,
        // Ensures the animation is tied to the scroll position and doesn't "jump" when scrolling fast
      },
    });

    // 2. Seamless Exit Fade (Triggered securely by the .holder itself)
    gsap.to(".card", {
      opacity: 0,
      ease: "power4.out",
      duration: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".holder",
        // Starts fading EXACTLY as the bottom of .holder hits the bottom of the viewport
        start: "bottom bottom",
        // Fully fades out by the time the bottom of .holder reaches the center of the viewport
        end: "bottom top",
        scrub: 1,
        // I lowered this back to 1. Scrub: 5 will make the fade lag 5 seconds behind the user's scroll, feeling sluggish.
      },
    });
  });
  return (
    <div ref={containerRef} className="mt-10  px-4 md:px-20  ">
      <h1 className="capitalize text-[#890620] lg:text-[4vw] md:text-[5vw] text-[8vw] font-['Instrument_Serif'] text-center m-4 relative z-2">
        Meet the creatives behind these artworks.
      </h1>
      <div className="holder  gap-10  flex flex-col">
        {ArtistData.map((artist, index) => {
          let open = index === openartist;
          let isEven = index % 2 == 0;
          return (
            <React.Fragment key={artist.artist}>
              <div
                className={`card flex justify-between gap-10 items-center pb-10 border-b border-white flex-col  ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                <Image
                  src={artist.img}
                  alt="artist image"
                  className="rounded-lg shadow-xl object-cover h-auto w-[clamp(200px,20vw,280px)] animation-img"
                />
                <div className="t flex flex-col gap-3 w-full md:w-[50%]">
                  <h1 className="text-2xl md:text-4xl mb-3 capitalize text-[#890620] font-['Mona_Sans_Variable'] tracking-wide ">
                    {artist.artist}
                  </h1>
                  <p className="sm:block hidden text-[14.5px] font-['Mona_Sans_Variable'] leading-[25px] opacity-90">
                    {" "}
                    {artist.desc}
                  </p>
                  <button onClick={() => ShowDesc(index)}>
                    <div className="sm:hidden border-y border-[#890620] flex-col gap-3 whitespace-nowrap mx-5 text-[#890620] p-3  font-medium group transition-all  transform duration-300">
                      <div className=" flex justify-center items-center">
                        <span className="group-hover:scale-102">
                          About artist
                        </span>
                        <span>
                          {open ? (
                            <>
                              <ChevronUp className="w-5 h-5 text-gray-600 transition-transform group-hover:translate-y-1"></ChevronUp>
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-5 h-5 text-gray-600 transition-transform group-hover:translate-y-1"></ChevronDown>
                            </>
                          )}
                        </span>
                      </div>
                      <div
                        className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${
                          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="text-[14.5px] font-['Mona_Sans_Variable'] leading-[25px] opacity-90 w-full whitespace-normal pb-3 px-3">
                            {artist.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={handeSeeArtwork}
                    className="mt-[8%] sm:mr-4  border border-[#890620] text-[#890620] rounded-full  hover:bg-[#890620] hover:text-white transition-all duration-300 group z-10 flex-row-reverse justify-between items-center capitalize font-['Mona_Sans_Variable'] mx-auto px-4 py-2 gap-3 flex whitespace-nowrap"
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
                    <span>see artworks</span>
                  </button>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default AboutArtists;
