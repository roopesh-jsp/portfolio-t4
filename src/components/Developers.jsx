import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { developers } from "../../data/contacts";

// Animations for cards
const cardVariants = {
  hidden: { opacity: 0, scale: 0.93, filter: "blur(4px)" },
  faded: {
    opacity: 0.45,
    scale: 0.93,
    filter: "blur(2px)",
    transition: { duration: 0.18, type: "tween" },
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "none",
    transition: { duration: 0.22, type: "tween" },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    filter: "blur(4px)",
    transition: { duration: 0.13 },
  },
};

export default function DevelopersCarousel() {
  const [active, setActive] = useState(0);
  const [showAllSkills, setShowAllSkills] = useState(false);

  const motionButtonProps = {
    whileTap: { scale: 0.92 },
    whileHover: {
      scale: 1.12,
      backgroundColor: "#232040",
      boxShadow: "0 2px 12px #7f5fff2c",
    },
    transition: { type: "tween", duration: 0.14 },
  };

  const leftIdx = active > 0 ? active - 1 : null;
  const rightIdx = active < developers.length - 1 ? active + 1 : null;

  const getCardState = (idx) => {
    if (idx === active) return "visible";
    if (idx === leftIdx || idx === rightIdx) return "faded";
    return "hidden";
  };

  // Handle viewing all skills in the active card only
  const handleViewAll = () => setShowAllSkills((prev) => !prev);

  return (
    <section className="w-full flex flex-col items-center py-12 bg-[#0d0d0d] relative">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-10">
        <span className="text-white">Our </span>
        <span className="bg-gradient-to-r from-cyan-400 to-cyan-200 bg-clip-text text-transparent">
          developers.
        </span>
      </h1>

      <div className="relative w-full flex justify-center items-center mb-4 select-none">
        <motion.button
          {...motionButtonProps}
          onClick={() => {
            setShowAllSkills(false);
            setActive((prev) => (prev === 0 ? prev : prev - 1));
          }}
          disabled={active === 0}
          className="mr-2 p-2 rounded-full bg-[#232322] text-cyan-400 cursor-pointer disabled:opacity-30 outline-none z-20
          shadow-sm border border-[#363655]"
          aria-label="Previous"
        >
          <FaChevronLeft size={18} />
        </motion.button>
        {/* Cards Row */}
        <div className="relative flex items-center justify-center w-[340px] md:w-[460px] h-[390px] md:h-[350px]">
          {developers.map((dev, idx) => {
            if (![leftIdx, active, rightIdx].includes(idx)) return null;
            const RoleIcon = dev.roleIcon;
            // Skills display logic
            const skillsToShow =
              showAllSkills && idx === active
                ? dev.skills
                : dev.skills.slice(0, 3);
            const showViewAllButton = dev.skills.length > 3;

            return (
              <AnimatePresence key={dev.name + idx}>
                <motion.div
                  key={dev.name + idx}
                  variants={cardVariants}
                  initial="hidden"
                  animate={getCardState(idx)}
                  exit="exit"
                  className={`absolute left-1/2 top-0 w-[92%] md:w-[340px] ${
                    idx === active ? "z-20" : "z-10"
                  }
                  ${idx === leftIdx ? "-translate-x-[109%]" : ""}
                  ${idx === rightIdx ? "-translate-x-[5%]" : ""}
                  ${idx === active ? "-translate-x-1/2" : ""}
                  pointer-events-${idx === active ? "auto" : "none"}
                  `}
                  style={{
                    filter: idx === active ? "none" : "blur(2px)",
                    opacity: idx === active ? 1 : 0.44,
                    marginLeft: idx === leftIdx ? "-2rem" : undefined,
                    marginRight: idx === rightIdx ? "-2rem" : undefined,
                  }}
                >
                  {/* CARD CONTENT */}
                  <div className="bg-gradient-to-br from-[#121212] via-[#171720] to-[#1a1a22] border border-cyan-700/20 rounded-2xl shadow-xl px-5 py-6 text-white relative flex flex-col items-center">
                    <h2 className="text-lg font-bold text-cyan-400 tracking-wide mb-1">
                      {dev.name}
                    </h2>
                    <div className="flex items-center gap-2 mb-2">
                      <RoleIcon className="text-lg text-purple-400" />
                      <span className="text-md text-purple-400 font-semibold">
                        {dev.role}
                      </span>
                    </div>

                    <p className="mb-5 text-gray-300 text-xs md:text-sm text-center">
                      {dev.bio}
                    </p>

                    {/* Skills Section */}
                    <div className="flex flex-col items-center w-full mb-2">
                      {/* Skills - default view */}
                      {!showAllSkills && (
                        <>
                          <div className="flex mb-2 cursor-pointer flex-nowrap gap-1 justify-center w-full">
                            {dev.skills.slice(0, 3).map((skill) => (
                              <span
                                key={skill}
                                className="bg-cyan-900/40 border border-cyan-400/40 px-2 py-0.5 rounded-full text-xs text-cyan-200 font-medium whitespace-nowrap"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                          {dev.skills.length > 3 && (
                            <button
                              onClick={handleViewAll}
                              className="mt-1 px-2 py-1 rounded-full text-xs font-medium bg-purple-600 text-white hover:bg-purple-500 transition focus:outline-none"
                            >
                              View all
                            </button>
                          )}
                        </>
                      )}
                      {/* Skills - expanded view */}
                      {showAllSkills && (
                        <>
                          <div className="flex flex-wrap gap-1 justify-center w-full mt-1 mb-2">
                            {dev.skills.map((skill) => (
                              <span
                                key={skill}
                                className="bg-cyan-900/40 border border-cyan-400/40 px-2 py-0.5 rounded-full text-xs text-cyan-200 font-medium"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                          <button
                            onClick={handleViewAll}
                            className="mt-2 px-2 py-1 rounded-full cursor-pointer text-xs font-medium bg-purple-600 text-white hover:bg-purple-500 transition focus:outline-none"
                          >
                            Hide
                          </button>
                        </>
                      )}
                    </div>

                    {/* Centered Links */}
                    <div className="flex gap-4 mt-5 items-center justify-center">
                      {dev.links.map((link) => {
                        const Icon = link.icon;
                        return (
                          <a
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={link.name}
                            className="transition group"
                          >
                            <Icon className="text-xl text-purple-400 group-hover:text-cyan-400 transition duration-200" />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            );
          })}
        </div>
        <motion.button
          {...motionButtonProps}
          onClick={() => {
            setShowAllSkills(false);
            setActive((prev) =>
              prev === developers.length - 1 ? prev : prev + 1
            );
          }}
          disabled={active === developers.length - 1}
          className="ml-2 p-2 rounded-full bg-[#232322] cursor-pointer text-cyan-400 disabled:opacity-30 outline-none z-20
          shadow-sm border border-[#363655]"
          aria-label="Next"
        >
          <FaChevronRight size={18} />
        </motion.button>
      </div>

      {/* Dots Navigation */}
      <div className="flex gap-1.5 mt-4">
        {developers.map((_, idx) => (
          <span
            key={idx}
            className={`inline-block rounded-full w-2 h-2 duration-150 transition
              ${
                idx === active
                  ? "bg-purple-500 shadow-lg scale-100"
                  : "bg-gray-600/40"
              }`}
          ></span>
        ))}
      </div>
    </section>
  );
}
