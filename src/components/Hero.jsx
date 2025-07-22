import { motion } from "framer-motion";
import { IoMdCall } from "react-icons/io";
import { socialLinks } from "../../data/links.jsx";
import { Typewriter } from "react-simple-typewriter";
import { FaHtml5, FaCss3Alt, FaReact } from "react-icons/fa";
import { SiExpress, SiMongodb } from "react-icons/si";

// Floating icons scattered near the heading
const floatingIcons = [
  {
    icon: <FaReact className="text-cyan-400" />,
    style: "top-[6%] left-[8%]",
  },
  {
    icon: <SiExpress className="text-gray-300" />,
    style: "top-[9%] right-[10%]",
  },
  {
    icon: <SiMongodb className="text-green-500" />,
    style: "top-[7%] right-[28%]",
  },
  {
    icon: <FaHtml5 className="text-orange-400" />,
    style: "top-[10%] left-[38%]",
  },
  {
    icon: <FaCss3Alt className="text-blue-400" />,
    style: "top-[5%] right-[42%]",
  },
];

function Hero() {
  return (
    <section className="relative bg-[#0d0d0d] text-white overflow-hidden min-h-screen flex items-center justify-center px-4">
      {floatingIcons.map((item, idx) => {
        const rotateDeg = [10, -15, 5, -8, 12][idx % 5];
        return (
          <motion.div
            key={idx}
            className={`absolute text-[3.5rem] sm:text-[4rem] opacity-40 pointer-events-none z-0 ${item.style}`}
            initial={{ rotate: rotateDeg }}
            animate={{
              y: [0, -10, 0],
              rotate: [rotateDeg, rotateDeg + 10, rotateDeg],
            }}
            transition={{
              duration: 12 + idx,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          >
            {item.icon}
          </motion.div>
        );
      })}

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center max-w-3xl"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,255,255,0.15)]">
          <span className="relative inline-block">
            <span className="absolute inset-0 text-cyan-400 opacity-10 blur-sm">
              Stunning Websites
            </span>
            <span className="relative z-10">Stunning Websites</span>
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
                        transform: "translateY(-2px)", // Lift it up slightly
                        width: "1px", // Thin vertical bar
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
          Elevate your brand with modern, high-performing digital solutions —
          built fast, beautifully, and affordably.
        </p>

        {/* 🚀 Call Button */}
        <motion.a
          href="#book"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-purple-600 to-purple-800 text-white font-semibold rounded-full shadow-md transition-all duration-300"
        >
          Book A Free Call <IoMdCall size={20} />
        </motion.a>

        {/* 🌐 Social Icons */}
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
      </motion.div>
    </section>
  );
}

export default Hero;
