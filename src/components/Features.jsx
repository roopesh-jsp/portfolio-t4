import { features } from "../../data/features";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

function FeatureSection() {
  return (
    <section className="bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0a0a0a] text-white py-16 px-6">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-4 text-white tracking-wide"
        >
          What We Offer at <span className="text-cyan-400">T4 Solutions</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-gray-300 max-w-3xl mx-auto"
        >
          From strategy to support, we deliver full-cycle digital solutions
          tailored to your vision.
        </motion.p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.03,
              boxShadow: "0px 0px 20px rgba(0, 255, 255, 0.15)",
              transition: { duration: 0.25 }, // instant hover response
            }}
            className="bg-[#1a1a1a] p-6 rounded-xl shadow-md border border-white/10 cursor-default transition duration-300 hover:bg-[#1f1f1f]"
          >
            <div className="flex items-center gap-3 mb-4">
              <FaCheckCircle className="text-green-400 text-xl" />
              <h3 className="text-lg font-semibold text-white">
                {feature.title}
              </h3>
            </div>
            <p className="text-gray-400 text-sm">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default FeatureSection;
