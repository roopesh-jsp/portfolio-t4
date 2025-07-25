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
import { FaTableList } from "react-icons/fa6"; // Assuming FaTableList is from fa6
import {
  SiExpress,
  SiTailwindcss,
  SiMongodb,
  SiFirebase,
  SiNextdotjs,
  SiMysql,
  SiPostgresql,
  SiFastapi,
  SiLangchain,
} from "react-icons/si";

// Import the CSS Module
import styles from "./IconGridDisplay.module.css";

// All available icons (for random selection)
const allAvailableIcons = [
  { icon: <FaReact className="text-cyan-400" /> },
  { icon: <FaHtml5 className="text-orange-400" /> },
  { icon: <SiMongodb className="text-green-500" /> },
  { icon: <SiExpress className="text-gray-300" /> },
  { icon: <FaCss3Alt className="text-blue-400" /> },

  { icon: <SiPostgresql className="text-blue-600" /> },

  { icon: <FaJs className="text-yellow-500" /> },
  { icon: <FaNodeJs className="text-green-600" /> },
  { icon: <FaPython className="text-blue-700" /> },
  { icon: <FaBootstrap className="text-purple-500" /> },
  { icon: <FaSass className="text-pink-400" /> },
  { icon: <SiTailwindcss className="text-teal-400" /> },
  { icon: <SiNextdotjs className="text-gray-200" /> },
];

// --- Constants for Icon Placement and Spacing ---
const MIN_ICON_SPACING_PX = 40; // Minimum center-to-center distance between icons in pixels (CHANGED from 80 to 40)
const MAX_PLACEMENT_ATTEMPTS = 50; // Max tries to find a non-overlapping spot for an icon

export default function IconGridDisplay({ contentRect = null }) {
  const [randomIconsData, setRandomIconsData] = useState([]); // Stores icon data including calculated positions
  const [isDesktop, setIsDesktop] = useState(false); // State to track if current view is desktop
  const containerRef = useRef(null); // Ref to get the dimensions of the icon wrapper

  // Helper function to generate a random point within specified bounds, avoiding an exclusion zone
  const getRandomPointInBounds = (
    minAllowedX,
    maxAllowedX,
    minAllowedY,
    maxAllowedY, // Area to place the icon in
    excludeRect = null, // Central content rectangle to avoid
    attemptsLeft // To prevent infinite loops
  ) => {
    while (attemptsLeft > 0) {
      const testX = minAllowedX + Math.random() * (maxAllowedX - minAllowedX);
      const testY = minAllowedY + Math.random() * (maxAllowedY - minAllowedY);

      if (
        excludeRect &&
        testX > excludeRect.left &&
        testX < excludeRect.left + excludeRect.width &&
        testY > excludeRect.top &&
        testY < excludeRect.top + excludeRect.height
      ) {
        attemptsLeft--;
        continue; // Point is in the central exclusion zone, try again
      }
      return { x: testX, y: testY }; // Valid point found
    }
    return null; // Could not find a valid point within allowed attempts
  };

  // Helper function to calculate a random position that avoids overlap and exclusion zones
  const getNonOverlappingPosition = (
    allPlacedIcons, // All icons placed so far (for global overlap check)
    containerWidth,
    containerHeight,
    iconEffectiveSize, // Approximate size of the icon including padding/margin for spacing
    contentExclusionRect, // {left, top, width, height} of the content div to exclude
    // New: Specific area bounds for placement (e.g., a quadrant or a strip)
    targetAreaMinX,
    targetAreaMaxX,
    targetAreaMinY,
    targetAreaMaxY
  ) => {
    let newPosition = null;
    let attempts = 0;

    // Define the boundaries within which icons can be placed within the target area
    const boundaryPadding = iconEffectiveSize / 2;
    const actualMinX = Math.max(targetAreaMinX, boundaryPadding);
    const actualMinY = Math.max(targetAreaMinY, boundaryPadding);
    const actualMaxX = Math.min(
      targetAreaMaxX,
      containerWidth - boundaryPadding
    );
    const actualMaxY = Math.min(
      targetAreaMaxY,
      containerHeight - boundaryPadding
    );

    // If the target area is too small after accounting for padding, return null
    if (actualMaxX <= actualMinX || actualMaxY <= actualMinY) {
      console.warn(
        "Target placement area too small or invalid after padding/bounds adjustment."
      );
      return null;
    }

    while (attempts < MAX_PLACEMENT_ATTEMPTS) {
      // Get a random point within the current target area and avoiding the content exclusion
      const testPoint = getRandomPointInBounds(
        actualMinX,
        actualMaxX,
        actualMinY,
        actualMaxY,
        contentExclusionRect,
        MAX_PLACEMENT_ATTEMPTS - attempts
      );
      if (!testPoint) {
        attempts = MAX_PLACEMENT_ATTEMPTS; // Couldn't find a suitable point, force exit
        continue;
      }

      let overlaps = false;
      // Check for overlap with every already placed icon
      for (const existing of allPlacedIcons) {
        const distance = Math.sqrt(
          Math.pow(testPoint.x - existing.left, 2) +
            Math.pow(testPoint.y - existing.top, 2)
        );
        if (distance < MIN_ICON_SPACING_PX) {
          // Check against the new MIN_ICON_SPACING_PX
          overlaps = true;
          break; // Overlap found, try a new position
        }
      }

      // If no overlaps, this is a valid position
      if (!overlaps) {
        newPosition = {
          left: testPoint.x,
          top: testPoint.y,
          rotate: Math.random() * 360, // Initial random rotation
          scale: 0.8 + Math.random() * 0.4, // Random scale (0.8 to 1.2)
          duration: 5 + Math.random() * 5, // Faster, varied animation duration (5 to 10 seconds)
        };
        break; // Valid position found, exit loop
      }
      attempts++;
    }

    return newPosition; // Returns null if no valid position found after max attempts
  };

  // Effect to update icon count and positions on mount and window resize
  useEffect(() => {
    const updateIconsAndPositions = () => {
      // Ensure containerRef.current exists before proceeding with calculations
      if (!containerRef.current) return;

      const currentWidth = window.innerWidth;
      let count;
      let iconEffectiveSize;
      let currentIsDesktop = false;

      if (currentWidth < 768) {
        // Mobile
        count = 7; // Still 7 for mobile
        iconEffectiveSize = 60;
      } else if (currentWidth >= 768 && currentWidth < 1024) {
        // Tablet
        count = 9; // Still 9 for tablet
        iconEffectiveSize = 90;
      } else {
        // Desktop (>= 1024px)
        // Total icons for desktop will now be 2 * 6 = 12
        count = 12; // Adjust total count based on 2 icons per zone
        iconEffectiveSize = 120;
        currentIsDesktop = true;
      }
      setIsDesktop(currentIsDesktop); // Update desktop state

      const shuffledIcons = [...allAvailableIcons].sort(
        () => 0.5 - Math.random()
      );
      const newRandomIconsWithPositions = [];
      const containerRect = containerRef.current.getBoundingClientRect();

      // Adjust contentRect coordinates to be relative to iconContainerWrapper
      const adjustedContentRect = contentRect
        ? {
            left: contentRect.left - containerRect.left,
            top: contentRect.top - containerRect.top,
            width: contentRect.width,
            height: contentRect.height,
          }
        : null;

      // Logic for desktop (16 icons in specific zones) or mobile/tablet (scattered)
      if (currentIsDesktop) {
        // Define an offset for corner elements
        const cornerOffset = 50; // Adjust this value as needed

        const desktopPlacementZones = [
          // { minX, maxX, minY, maxY, count }
          // Upper-Left (2 icons) - Shifted down slightly (minY increased)
          {
            minX: 0,
            maxX: containerRect.width / 3,
            minY: cornerOffset,
            maxY: containerRect.height / 3 + cornerOffset,
            count: 2,
          },
          // Upper-Right (2 icons) - Shifted down slightly (minY increased)
          {
            minX: (containerRect.width * 2) / 3,
            maxX: containerRect.width,
            minY: cornerOffset,
            maxY: containerRect.height / 3 + cornerOffset,
            count: 2,
          },
          // Lower-Left (2 icons) - Shifted up slightly (maxY decreased)
          {
            minX: 0,
            maxX: containerRect.width / 3,
            minY: (containerRect.height * 2) / 3 - cornerOffset,
            maxY: containerRect.height - cornerOffset,
            count: 2,
          },
          // Lower-Right (2 icons) - Shifted up slightly (maxY decreased)
          {
            minX: (containerRect.width * 2) / 3,
            maxX: containerRect.width,
            minY: (containerRect.height * 2) / 3 - cornerOffset,
            maxY: containerRect.height - cornerOffset,
            count: 2,
          },
          // Upper-Center (2 icons)
          {
            minX: containerRect.width / 3,
            maxX: (containerRect.width * 2) / 3,
            minY: 0,
            maxY: containerRect.height / 4,
            count: 2,
          },
          // Lower-Center (2 icons)
          {
            minX: containerRect.width / 3,
            maxX: (containerRect.width * 2) / 3,
            minY: (containerRect.height * 3) / 4,
            maxY: containerRect.height,
            count: 2,
          },
        ];

        let iconIndex = 0;
        for (const zone of desktopPlacementZones) {
          for (let i = 0; i < zone.count; i++) {
            if (iconIndex >= shuffledIcons.length) break; // Ensure we don't go out of bounds of available icons

            const newPos = getNonOverlappingPosition(
              newRandomIconsWithPositions, // Check against all icons placed so far
              containerRect.width,
              containerRect.height,
              iconEffectiveSize,
              adjustedContentRect, // Exclude content area
              zone.minX,
              zone.maxX,
              zone.minY,
              zone.maxY // Target specific zone
            );

            if (newPos) {
              newRandomIconsWithPositions.push({
                id: `${shuffledIcons[iconIndex].icon.props.className}-${
                  zone.minX
                }-${zone.minY}-${i}-${new Date().getTime()}`,
                icon: shuffledIcons[iconIndex].icon,
                ...newPos,
              });
              iconIndex++;
            } else {
              console.warn(
                `Could not place icon in zone (${zone.minX}, ${zone.minY}) after ${MAX_PLACEMENT_ATTEMPTS} attempts.`
              );
            }
          }
        }
      } else {
        // Mobile & Tablet: random scatter across entire screen
        const selectedIcons = shuffledIcons.slice(0, count); // Use 'count' for mobile/tablet

        for (let i = 0; i < selectedIcons.length; i++) {
          const newPos = getNonOverlappingPosition(
            newRandomIconsWithPositions,
            containerRect.width,
            containerRect.height,
            iconEffectiveSize,
            adjustedContentRect, // Still exclude content area
            0,
            containerRect.width,
            0,
            containerRect.height // Target entire container
          );

          if (newPos) {
            newRandomIconsWithPositions.push({
              id: `${
                selectedIcons[i].icon.props.className
              }-${i}-${new Date().getTime()}`,
              icon: selectedIcons[i].icon,
              ...newPos,
            });
          } else {
            console.warn(`Could not place icon ${i + 1}. Space too crowded.`);
          }
        }
      }
      setRandomIconsData(newRandomIconsWithPositions);
    };

    // Set up event listener for window resize
    window.addEventListener("resize", updateIconsAndPositions);
    // Call it once immediately after mount, with a slight delay for ref to be ready
    const timeoutId = setTimeout(updateIconsAndPositions, 100);

    // Clean up
    return () => {
      window.removeEventListener("resize", updateIconsAndPositions);
      clearTimeout(timeoutId);
    };
  }, [contentRect]); // Re-run effect if contentRect changes (i.e., content moves/resizes)

  return (
    <div ref={containerRef} className={styles.iconContainerWrapper}>
      {randomIconsData.map((item) => {
        return (
          <motion.div
            key={item.id} // Use the unique ID for each icon
            className={styles.iconItem}
            // Set initial absolute position from the calculated data
            style={{
              left: `${item.left}px`,
              top: `${item.top}px`,
            }}
            initial={{
              opacity: 0, // Start completely transparent for a smooth fade-in
              scale: item.scale * 0.8, // Start slightly smaller for subtle scale-in
              rotate: item.rotate,
            }}
            animate={{
              opacity: 0.7, // Target base opacity: 70%
              scale: item.scale, // Animate to its random scale
              // Subtle random drift animation around its initial position
              x: [0, Math.random() * 20 - 10, 0], // Drifts horizontally by -10 to +10px
              y: [0, Math.random() * 20 - 10, 0], // Drifts vertically by -10 to +10px
              rotate: [
                item.rotate,
                item.rotate + (Math.random() * 10 - 5),
                item.rotate,
              ], // Rotates by -5 to +5 degrees
            }}
            transition={{
              duration: item.duration, // Use the random duration calculated for each icon
              repeat: Infinity, // Loop the animation indefinitely
              repeatType: "reverse", // Makes the animation play forward then backward smoothly
              ease: "easeInOut", // Smooth acceleration and deceleration
            }}
            whileHover={{ opacity: 1, scale: 1.2 }} // On hover, become fully opaque and slightly larger
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
