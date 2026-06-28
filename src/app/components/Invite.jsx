import React from "react";
// Make sure to uncomment your actual imports
import art1 from "../Images/art1.webp";
import art2 from "../Images/art2.jpg";
import art3 from "../Images/art3.webp";
import art4 from "../Images/hero-3.jpg";
import art5 from "../Images/art-5.jpg";
import Image from "next/image";

// Placeholder data (Replace with your actual imported variables)

const Invite = () => {
  let CardInfo = [
    {
      img: art1,
      artname: "Rainbow Veil ",
      artist: "Mark Spowart",
      desc: "Experience the raw beauty of the Whitesand River flowing through Rainbow Falls Provincial Park. This long-exposure fine art photograph transforms rushing water into a silky, ethereal cascade against the dark granite of the Canadian Shield, bringing the calming energy of Northern Ontario's wilderness into any space.",
    },
    {
      img: art2,
      artname: "Apple Hill  ",
      artist: "Whitner Carlin",
      desc: "An original landscape of a countryside scene of a river flowing down valley, fading into mountains.",
    },
    {
      img: art3,
      artname: "Pink sky landscape ",
      artist: "Sonia Brittain",
      desc: "Loose gouache landscape.",
    },
    {
      img: art4,
      artname: "Yellow Submarine - Burano style ",
      artist: "Moon Bunny",
      desc: "The village of Burano, near Venice, Italy, is one of the most beautiful villages I have ever been. Every new wall has a new color, every house a different shade. This yellow corner was a sunny dream home.",
    },
    {
      img: art5,
      artname: "Climbing ",
      artist: "Vitor Costa",
      desc: "Minimalist art with organic shapes in earth-colored watercolor that represents a climb.",
    },
  ];

  return (
    // Added px-4 for mobile, px-20 for desktop to match your structure
    <div className="mt-20 w-full flex flex-col gap-16 px-4 md:px-20">
      {CardInfo.map((c, index) => {
        const isEven = index % 2 === 0;

        return (
          <div
            key={c.artist}
            // justify-between pushes the image and text apart, creating negative space in the middle
            className={`w-full flex flex-col gap-10 items-center justify-between border-b border-gray-200 pb-12 ${
              isEven ? "sm:flex-row" : "sm:flex-row-reverse"
            }`}
          >
            {/* Image Container */}
            <div className="flex justify-center items-center">
              <Image
                src={c.img}
                alt={c.artname}
                // Removed the fixed width from Next Image and put it here for better styling control
                className="object-cover w-[clamp(200px,20vw,280px)] h-auto rounded-lg shadow-md"
              />
            </div>

            {/* Text Container */}
            {/* Kept md:w-1/2 so the text doesn't stretch completely across the screen */}
            <div className="w-full md:w-1/2 flex flex-col gap-6 justify-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-['Instrument_Serif'] text-[#890620] mb-2">
                  {c.artname}
                </h2>
                <h4 className="text-lg uppercase  font-['Mona_Sans_Variable'] text-gray-500 font-semibold">
                  by {c.artist}
                </h4>
              </div>

              <p className="text-gray-700 font-['Mona_Sans_Variable'] leading-[27px] text-lg">
                {c.desc}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Invite;
