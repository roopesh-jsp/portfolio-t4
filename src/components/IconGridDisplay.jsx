// src/components/IconGridDisplay.jsx

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
// Ensure all necessary icon imports are present
import {
  FaHtml5,
  FaCss3Alt,
  FaSass,
  FaJs,
  FaReact,
  FaNodeJs,
  FaPython,
  FaBootstrap,
  FaDatabase,
} from "react-icons/fa";
import { FaTableList } from "react-icons/fa6";
import {
  SiExpress,
  SiTailwindcss,
  SiFirebase,
  SiMysql,
  SiPostgresql,
  SiFastapi,
  SiLangchain,
} from "react-icons/si";

// Import the CSS Module
import styles from "./IconGridDisplay.module.css";

// All available icons (DEFINED ORDER)
// The order here directly determines which icon appears at which fixed position.
const allAvailableIcons = [
  { icon: <FaReact className="text-cyan-400" /> }, // Index 0: React
  { icon: <FaHtml5 className="text-orange-400" /> }, // Index 1: HTML5
  { icon: <SiExpress className="text-gray-300" /> }, // Index 2: Express
  { icon: <FaCss3Alt className="text-blue-400" /> }, // Index 3: CSS3Alt
  { icon: <SiPostgresql className="text-blue-600" /> }, // Index 4: PostgreSQL
  { icon: <FaJs className="text-yellow-500" /> }, // Index 5: JavaScript
  { icon: <FaNodeJs className="text-green-600" /> }, // Index 6: NodeJS
  { icon: <FaPython className="text-yellow-700" /> }, // Index 7: Python
  { icon: <FaBootstrap className="text-purple-500" /> }, // Index 8: Bootstrap
  { icon: <FaSass className="text-pink-400" /> }, // Index 9: Sass
  { icon: <SiTailwindcss className="text-teal-400" /> }, // Index 10: TailwindCSS
  { icon: <SiFirebase className="text-amber-500" /> }, // Index 11: Firebase
  { icon: <SiMysql className="text-blue-500" /> }, // Index 12: MySQL
  { icon: <SiFastapi className="text-green-400" /> }, // Index 13: FastAPI
  { icon: <SiLangchain className="text-lime-400" /> }, // Index 14: Langchain
  { icon: <FaDatabase className="text-gray-400" /> }, // Index 15: Database
  { icon: <FaTableList className="text-fuchsia-400" /> }, // Index 16: FaTableList
];

// --- HARDCODED ICON POSITIONS FOR DESKTOP (Based on image_0c6007.png, 1920px wide reference) ---
const fixedIconPositionsDesktop = [
  // Top Row (Spread out horizontally)
  { x: 160, y: 280 }, // Pos for React (Index 0)
  { x: 450, y: 150 }, // Pos for HTML5 (Index 1)
  { x: 750, y: 90 }, // Pos for Express (Index 2)
  { x: 1100, y: 80 }, // Pos for CSS3Alt (Index 3)
  { x: 1450, y: 120 }, // Pos for PostgreSQL (Index 4)
  { x: 1750, y: 180 }, // Pos for JavaScript (Index 5)

  // Mid-Left / Upper-Mid-Left
  { x: 1500, y: 600 }, // Pos for NodeJS (Index 6)
  { x: 450, y: 580 }, // Pos for Python (Index 7)
  { x: 60, y: 600 }, // Pos for Bootstrap (Index 8)

  // Mid-Right / Upper-Mid-Right
  { x: 1800, y: 450 }, // Pos for Sass (Index 9)
  { x: 1700, y: 750 }, // Pos for TailwindCSS (Index 10)

  // Bottom Row (Spread out horizontally)
  { x: 200, y: 800 }, // Pos for Firebase (Index 11)
  { x: 650, y: 830 }, // Pos for MySQL (Index 12)
  { x: 1250, y: 870 }, // Pos for FastAPI (Index 13)
  { x: 1780, y: 920 }, // Pos for Langchain (Index 14)
  { x: 1550, y: 600 }, // Pos for FaDatabase (Index 15)
  { x: 950, y: 950 }, // Pos for FaTableList (Index 16)
];

// --- HARDCODED ICON POSITIONS FOR TABLET (768px to 1023px width, estimated) ---
const fixedIconPositionsTablet = [
  // Upper-Left Quadrant (keeping clear of central vertical strip)
  { x: 50, y: 100 }, // Pos for React (Index 0)
  { x: 200, y: 200 }, // Pos for HTML5 (Index 1)
  { x: 40, y: 300 }, // Pos for Express (Index 2)

  // Upper-Right Quadrant (keeping clear of central vertical strip)
  { x: 718, y: 100 }, // Pos for CSS3Alt (Index 3)
  { x: 588, y: 250 }, // Pos for PostgreSQL (Index 4)
  { x: 690, y: 500 }, // Pos for JavaScript (Index 5)

  // Lower Left Quadrant
  { x: 50, y: 700 }, // Pos for NodeJS (Index 6)
  { x: 180, y: 850 }, // Pos for Python (Index 7)

  // Lower Right Quadrant
  { x: 718, y: 700 }, // Pos for Bootstrap (Index 8)
  { x: 588, y: 850 }, // Pos for Sass (Index 9)

  // Explicitly top/bottom center to fill space, avoiding horizontal middle
  { x: 384, y: 50 }, // Pos for TailwindCSS (Index 10)
  { x: 384, y: 950 }, // Pos for Firebase (Index 11)
];

// --- HARDCODED ICON POSITIONS FOR TALL TABLET (1024px to 1199px width) ---
const fixedIconPositionsTallTablet = [
  // Top Row (Spread out horizontally for wider screen)
  { x: 80, y: 120 }, // Pos for React (Index 0)
  { x: 300, y: 80 }, // Pos for HTML5 (Index 1)
  { x: 700, y: 80 }, // Pos for Express (Index 2)
  { x: 944, y: 120 }, // Pos for CSS3Alt (Index 3)

  // Mid-Left Column (wider spread, avoiding central title area)
  { x: 50, y: 350 }, // Pos for PostgreSQL (Index 4)
  { x: 150, y: 550 }, // Pos for JavaScript (Index 5)

  // Mid-Right Column (wider spread, avoiding central title area)
  { x: 974, y: 350 }, // Pos for NodeJS (Index 6)
  { x: 874, y: 550 }, // Pos for Python (Index 7)

  // Bottom Row (Spread out horizontally for wider screen)
  { x: 100, y: 900 }, // Pos for Bootstrap (Index 8)
  { x: 350, y: 980 }, // Pos for Sass (Index 9)
  { x: 674, y: 980 }, // Pos for TailwindCSS (Index 10)
  { x: 924, y: 900 }, // Pos for Firebase (Index 11)

  // Extra icons for 14 total
  { x: 512, y: 30 }, // Pos for MySQL (Index 12) - Very Top-Center
  { x: 512, y: 1300 }, // Pos for FastAPI (Index 13) - Very Bottom-Center
];

// --- Specific Icon Positions for 375px x 667px resolution (iPhone 6/7/8 Standard Portrait) ---
const fixedIconPositionsiPhoneStandard = [
  { x: 187, y: 50 },  // React (Index 0) - Top-center
  { x: 50, y: 120 },  // HTML5 (Index 1) - Top-left
  { x: 300, y: 120 }, // Express (Index 2) - Top-right (slightly lower)

   // PostgreSQL (Index 4) - Mid-right (slightly lower)

  { x: 50, y: 450 },  // JavaScript (Index 5) - Lower-mid-left
  { x: 300, y: 480 }, // NodeJS (Index 6) - Lower-mid-right (slightly lower)
  { x: 187, y: 580 }, // Python (Index 7) - Bottom-center
];

// --- GENERAL MOBILE PORTRAIT (<450px width, <=932px height) ---
// This acts as a fallback for other tall/narrow mobiles not exactly 375x667
const fixedIconPositionsMobilePortrait = [
  { x: 215, y: 60 },  // React (Index 0) - Top-center (based on 430/2)
  { x: 80, y: 90 },  // HTML5 (Index 1) - Top-left
  { x: 350, y: 220 }, // Express (Index 2) - Top-right (slightly lower)
  { x: 60, y: 580 },  // CSS3Alt (Index 3) - Mid-left
  { x: 370, y: 450 }, // PostgreSQL (Index 4) - Mid-right (slightly lower)
  { x: 315, y: 650 }, // JavaScript (Index 5) - Lower-mid-center
  { x: 90, y: 680 },  // NodeJS (Index 6) - Bottom-left
  { x: 5, y: 210 }, // Python (Index 7) - Bottom-right
];


export default function IconGridDisplay({ contentRect = null }) {
  const [fixedIconsData, setFixedIconsData] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const assignFixedPositions = () => {
      const currentWidth = window.innerWidth;
      const currentHeight = window.innerHeight; // Get the current window height
      let totalIconCount;
      let positionsArrayToUse;

      // New: Exact match for 375x667 resolution. This must be the FIRST condition.
      if (currentWidth === 375 && currentHeight === 667) {
        totalIconCount = fixedIconPositionsiPhoneStandard.length; // 8 icons
        positionsArrayToUse = fixedIconPositionsiPhoneStandard;
      }
      // General Mobile Portrait (<450px width, <=932px height) - acts as fallback for other tall phones
      else if (currentWidth < 450 && currentHeight <= 932) {
        totalIconCount = fixedIconPositionsMobilePortrait.length; // 8 icons
        positionsArrayToUse = fixedIconPositionsMobilePortrait;
      }
      // Very small widths not covered by specific tall mobile rules (e.g., very short screens, or non-portrait)
      else if (currentWidth < 480) {
        totalIconCount = 0; // Display 0 icons
        positionsArrayToUse = [];
      } else if (currentWidth >= 480 && currentWidth < 768) {
        totalIconCount = 9; // Mobile (480px to 767px)
        positionsArrayToUse = fixedIconPositionsTablet;
      } else if (currentWidth >= 768 && currentWidth < 1024) {
        totalIconCount = 12; // Standard Tablet (768px to 1023px)
        positionsArrayToUse = fixedIconPositionsTablet;
      }
      // Breakpoint for 1024px wide devices (e.g., larger tablets in portrait, or smaller desktops)
      else if (currentWidth >= 1024 && currentWidth < 1200) {
        totalIconCount = 14; // Tall Tablet: Display 14 icons
        positionsArrayToUse = fixedIconPositionsTallTablet;
      } else {
        totalIconCount = 14; // Desktop (1200px and above)
        positionsArrayToUse = fixedIconPositionsDesktop;
      }

      const numPositionsToUse = Math.min(totalIconCount, positionsArrayToUse.length);

      const newFixedIconsData = [];
      for (let i = 0; i < numPositionsToUse; i++) {
        const position = positionsArrayToUse[i];
        // Ensure we don't go out of bounds if totalIconCount is less than allAvailableIcons.length
        const iconData = allAvailableIcons[i % allAvailableIcons.length];

        // Determine rotation direction based on index or any other logic
        const baseRotate = i % 2 === 0 ? 5 : -15;
        const initialRotate = baseRotate + Math.random() * 20 - 10;
        const finalRotate = baseRotate + (Math.random() * 10 - 5);

        newFixedIconsData.push({
          id: `${iconData.icon.props.className}-${i}`,
          icon: iconData.icon,
          left: position.x,
          top: position.y,
          scale: 0.8 + Math.random() * 0.4,
          duration: 5 + Math.random() * 5,
          rotate: initialRotate,
          rotateFinal: finalRotate,
        });
      }

      setFixedIconsData(newFixedIconsData);
    };

    assignFixedPositions();
    window.addEventListener("resize", assignFixedPositions);

    return () => {
      window.removeEventListener("resize", assignFixedPositions);
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.iconContainerWrapper}>
      {fixedIconsData.map((item) => {
        return (
          <motion.div
            key={item.id}
            className={styles.iconItem}
            style={{
              left: `${item.left}px`,
              top: `${item.top}px`,
            }}
            initial={{
              opacity: 0,
              scale: item.scale * 0.8,
              rotate: item.rotate,
            }}
            animate={{
              opacity: 0.6,
              scale: item.scale,
              rotate: [
                item.rotate,
                item.rotateFinal,
                item.rotate,
              ],
            }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            whileHover={{ opacity: 1, scale: 1.2 }}
          >
            {/* Clone the icon element to apply responsive sizing from CSS Module */}
            {React.cloneElement(item.icon, {
              className: `${item.icon.props.className} ${styles.iconSize}`,
            })}
          </motion.div>
        );
      })}
    </div>
  );
}