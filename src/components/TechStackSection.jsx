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
import { motion } from "framer-motion";

const techRows = [
  [
    { name: "HTML", icon: <FaHtml5 className="text-orange-500" /> },
    { name: "CSS", icon: <FaCss3Alt className="text-blue-400" /> },
    { name: "Sass", icon: <FaSass className="text-pink-400" /> },
    { name: "JavaScript", icon: <FaJs className="text-yellow-400" /> },
    { name: "React", icon: <FaReact className="text-cyan-400" /> },
    { name: "Next.js", icon: <SiNextdotjs className="text-white" /> },
    { name: "Node.js", icon: <FaNodeJs className="text-green-500" /> },
    { name: "Express", icon: <SiExpress className="text-white" /> },
    { name: "Python", icon: <FaPython className="text-blue-300" /> },
  ],
  [
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-400" /> },
    { name: "Bootstrap", icon: <FaBootstrap className="text-purple-400" /> },
    { name: "MongoDB", icon: <SiMongodb className="text-green-400" /> },
    { name: "SQL", icon: <FaDatabase className="text-gray-400" /> },
    { name: "Firebase", icon: <SiFirebase className="text-yellow-400" /> },
    { name: "FastAPI", icon: <SiFastapi className="text-green-300" /> },
    { name: "LangChain", icon: <SiLangchain className="text-indigo-300" /> },
  ],
];

function TechStackSection() {
  return (
    <section className="bg-[#0d0d0d] text-white py-24 px-6 relative min-h-[650px] sm:min-h-[550px] overflow-hidden">
      {/* Heading */}
      <div className="max-w-5xl mx-auto text-center mb-16 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Our <span className="text-cyan-400">Tech Stack</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-gray-300 max-w-3xl mx-auto"
        >
          Tools and technologies we use to build world-class digital
          experiences.
        </motion.p>
      </div>

      {/* Scrolling Rows */}
      {techRows.map((row, index) => (
        <div
          key={index}
          className="relative w-[90%] sm:w-[75%] mx-auto overflow-hidden mb-12 z-10"
        >
          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 h-full w-12 sm:w-16 bg-gradient-to-r from-[#0d0d0d] to-transparent z-20" />
          <div className="absolute right-0 top-0 h-full w-12 sm:w-16 bg-gradient-to-l from-[#0d0d0d] to-transparent z-20" />

          {/* Animated Row */}
          <div
            className={`flex w-fit whitespace-nowrap ${
              index % 2 === 0 ? "animate-slide-left" : "animate-slide-right"
            } gap-[3vw] sm:gap-3 md:gap-4 lg:gap-6`}
          >
            {/* Repeat for loop for infinite scrolling effect */}
            {[...row, ...row].map((tech, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center w-16 sm:w-20 md:w-24 shrink-0"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl">
                  {tech.icon}
                </div>
                <p className="text-xs sm:text-sm mt-2 text-gray-400">
                  {tech.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Torchlight effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-40 sm:h-48 pointer-events-none z-10">
        <div className="w-full h-full bg-gradient-to-t from-white/15 via-white/5 to-transparent blur-2xl animate-torch rounded-full" />
      </div>
    </section>
  );
}

export default TechStackSection;
