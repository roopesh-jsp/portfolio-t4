// Hero.jsx

import React, { useRef, useEffect, useState } from "react";
import {
  FaReact,
  FaHtml5,
  FaJs,
  FaPython,
  FaCss3Alt,
  FaNodeJs,
  FaGit,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import { SiMongodb, SiTailwindcss } from "react-icons/si";
import { IoMdCall } from "react-icons/io";
import { Typewriter } from "react-simple-typewriter";

// Dummy socials (replace with your real ones)
const socialLinks = [
  {
    id: 1,
    label: "GitHub",
    icon: <FaGit />,
    href: "https://github.com/roopesh-jsp",
  },
  {
    id: 2,
    label: "Twitter",
    icon: <FaInstagram />,
    href: "#",
  },
];

// Pick 6 unique icons to look good on small and large screens
const iconDefs = [
  { icon: <FaReact className="text-cyan-400" />, color: "#06b6d4" },
  { icon: <FaHtml5 className="text-orange-400" />, color: "#fb923c" },
  { icon: <SiMongodb className="text-green-500" />, color: "#22c55e" },
  { icon: <FaJs className="text-yellow-400" />, color: "#fde68a" },
  { icon: <FaPython className="text-blue-700" />, color: "#60a5fa" },
];

// Sweet spots: (vw, vh)
const sweetSpotsLarge = [
  { x: 30, y: 14 }, // upper left
  { x: 54, y: 11 }, // top center
  { x: 72, y: 18 }, // upper right
  { x: 23, y: 37 }, // left-mid
  { x: 80, y: 43 }, // right-mid
  { x: 40, y: 29 }, // center-left
];

// For mobile: 2 on top, 3 on bottom
const sweetSpotsMobile = [
  { x: 30, y: 14 }, // top left
  { x: 70, y: 15 }, // top right
  { x: 20, y: 75 }, // bottom left
  { x: 50, y: 85 }, // bottom center
  { x: 80, y: 75 }, // bottom right
];

// Helper: for a given icon box and others, does it overlap any?
function overlapsAny(box, otherBoxes, pad = 4) {
  return otherBoxes.some(
    (other) =>
      !(
        box.right + pad < other.left ||
        box.left - pad > other.right ||
        box.bottom + pad < other.top ||
        box.top - pad > other.bottom
      )
  );
}

// Generate random rotations, length=N
function randomRotations(count) {
  return Array(count)
    .fill(0)
    .map(() => (Math.random() - 0.5) * 36); // -18° to +18°
}

function IconGridDisplay({ contentRect }) {
  const [vw, setVw] = useState(window.innerWidth);
  const [vh, setVh] = useState(window.innerHeight);
  const [rotations, setRotations] = useState(randomRotations(iconDefs.length));

  useEffect(() => {
    function handle() {
      setVw(window.innerWidth);
      setVh(window.innerHeight);
      setRotations(randomRotations(iconDefs.length));
    }
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);

  // Responsive icon size (visible, and for collision)
  let ICON_SIZE, positions;
  if (vw < 600) {
    ICON_SIZE = 54; // Big and mobile-friendly!
    positions = sweetSpotsMobile;
  } else if (vw < 1024) {
    ICON_SIZE = 54;
    positions = sweetSpotsLarge;
  } else {
    ICON_SIZE = 66;
    positions = sweetSpotsLarge;
  }

  // For mobile, only 5 icons; for larger screens, all 6
  const iconCount = Math.min(iconDefs.length, positions.length);

  let iconBoxes = [];

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
      {positions.map((pos, i) => {
        if (i >= iconCount) return null;
        // px positions
        const px = (pos.x / 100) * vw;
        const py = (pos.y / 100) * vh;
        const box = {
          left: px - ICON_SIZE / 2,
          top: py - ICON_SIZE / 2,
          right: px + ICON_SIZE / 2,
          bottom: py + ICON_SIZE / 2,
        };

        // Hide if overlaps text, or overlaps prev icons
        let hide = false;
        if (contentRect) {
          // On mobile, upper 2 check content overlap, lower 3 do not
          if (!(vw < 600 && i > 1)) {
            const cl = contentRect.left,
              cr = contentRect.left + contentRect.width;
            const ct = contentRect.top,
              cb = contentRect.top + contentRect.height;
            const overlap = !(
              box.right < cl ||
              box.left > cr ||
              box.bottom < ct ||
              box.top > cb
            );
            if (overlap) hide = true;
          }
        }
        if (!hide && overlapsAny(box, iconBoxes, 10)) hide = true;
        if (!hide) iconBoxes.push(box);

        // Random rotation, fixed per-mount/resize
        const angle = rotations[i];

        return (
          <div
            key={i}
            style={{
              left: `${pos.x}vw`,
              top: `${pos.y}vh`,
              opacity: hide ? 0 : 0.65,
              width: ICON_SIZE,
              height: ICON_SIZE,
              transform: `translate(-50%,-50%) rotate(${angle}deg)`,
              transition: "opacity 0.18s",
            }}
            className="absolute flex items-center justify-center"
            aria-hidden="true"
          >
            {React.cloneElement(iconDefs[i].icon, {
              className: `w-full h-full drop-shadow-lg ${
                iconDefs[i].icon.props.className || ""
              }`,
              style: { minWidth: ICON_SIZE, minHeight: ICON_SIZE },
            })}
          </div>
        );
      })}
    </div>
  );
}

export default function Hero() {
  const contentRef = useRef(null);
  const [contentRect, setContentRect] = useState(null);

  useEffect(() => {
    function updateRect() {
      if (contentRef.current) {
        const r = contentRef.current.getBoundingClientRect();
        setContentRect({
          left: r.left,
          top: r.top,
          width: r.width,
          height: r.height,
        });
      }
    }
    updateRect();
    window.addEventListener("resize", updateRect);
    return () => window.removeEventListener("resize", updateRect);
  }, []);

  return (
    <section className="relative bg-[#0d0d0d] text-white overflow-hidden min-h-screen flex items-center justify-center px-4">
      <IconGridDisplay contentRect={contentRect} />
      <div
        ref={contentRef}
        className="relative z-10 text-center max-w-3xl mx-auto"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,255,255,0.15)]">
          <span className="relative inline-block">
            <span className="absolute inset-0 text-cyan-400 opacity-10 blur-sm">
              Stunning Websites
            </span>
            <span className="relative">{`Stunning Websites`}</span>
          </span>
          <br />
          <span className="relative inline-block">
            <span className="absolute inset-0 text-cyan-400 opacity-10 blur-sm">
              Surprisingly Affordable.
            </span>
            <span className="relative z-10">
              Surprisingly{" "}
              <span className="text-cyan-400">
                <Typewriter
                  words={["Affordable.", "Reliable.", "AI-Powered."]}
                  loop={true}
                  cursor
                  cursorStyle={
                    <span
                      style={{
                        display: "inline-block",
                        verticalAlign: "middle",
                        transform: "translateY(-2px)",
                        width: "1px",
                        height: "1.2em",
                        backgroundColor: "cyan",
                        animation: "blink 1s infinite",
                      }}
                    />
                  }
                  typeSpeed={90}
                  deleteSpeed={70}
                  delaySpeed={1900}
                />
              </span>
            </span>
          </span>
          <br />
        </h1>
        <p className="text-gray-400 text-base md:text-lg mb-8 max-w-xl mx-auto drop-shadow-[0_0_10px_rgba(0,255,255,0.15)]">
          <strong>
            Elevate your brand with modern, high-performing digital solutions —
            built fast, beautifully, and affordably.
          </strong>
        </p>
        <a
          href="https://wa.me/918897502339?text=Hi!%20I%E2%80%99d%20like%20to%20book%20a%20free%20call%20about%20building%20a%20website%20for%20my%20business."
          target="_blank"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-purple-600 to-purple-800 text-white font-semibold rounded-full shadow-md transition-all duration-300 hover:scale-105 active:scale-95"
        >
          Book A Free Call <IoMdCall size={20} />
        </a>
        <div className="flex justify-center gap-6 mt-10 text-xl">
          {socialLinks.map(({ id, icon, href, label }) => (
            <a
              key={id}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-gray-400 hover:text-cyan-400 transition"
            >
              {icon}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
