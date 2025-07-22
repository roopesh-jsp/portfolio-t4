import { motion } from "framer-motion";
import { IoMdCall } from "react-icons/io";
import { socialLinks } from "../../data/links.jsx";
import { Typewriter } from "react-simple-typewriter";

function Hero() {
  return (
    <section className="relative bg-[#0d0d0d] text-white overflow-hidden min-h-screen flex items-center justify-center px-4">
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
