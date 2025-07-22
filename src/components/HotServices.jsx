import React from "react";
import { hotServices } from "../../data/services";
import { motion } from "framer-motion";
import { FaFireAlt } from "react-icons/fa";

function HotServices() {
  return (
    <div className="space-y-10 max-w-5xl mx-auto mb-14 px-4" id="hot-services">
      {hotServices.map((service) => (
        <motion.div
          key={service.id}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`relative bg-gradient-to-br from-[#1a1a1a] via-[#111] to-[#1a1a1a] border border-white/10 rounded-2xl overflow-hidden shadow-lg ${service.glowColor}`}
        >
          {/* 🔥 Badge */}
          <div className="absolute top-0 left-0 bg-red-600 text-white px-3 py-1 text-xs font-bold rounded-br-xl shadow-md z-10 animate-pulse">
            {service.label}
          </div>

          {/* 🧠 Content */}
          <div className="p-8 text-center max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white flex items-center justify-center gap-2">
              <FaFireAlt className="text-red-500" />
              {service.title}
            </h3>
            <p className="text-gray-400 text-sm mb-6">{service.description}</p>
            <a
              href={service.href}
              className="inline-block mt-2 px-5 py-2.5 bg-cyan-400 text-black text-sm rounded-full font-semibold hover:bg-cyan-300 transition duration-300"
            >
              {service.cta}
            </a>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default HotServices;
