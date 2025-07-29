import React from "react";
import { hotServices } from "../../data/services";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function MiniHotServices() {
  return (
    <section className="bg-[#0d0d0d] py-12 px-6 text-white">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-bold text-center mb-8 text-white tracking-wide"
      >
        Our <span className="text-cyan-400">Popular Picks</span>
      </motion.h2>

      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {hotServices.map((service, idx) => (
          <Link key={service.id} to="/services">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{
                scale: 1.03,
                boxShadow: "0px 0px 20px rgba(0, 255, 255, 0.15)",
                transition: { duration: 0.25 },
              }}
              className={`relative bg-[#1a1a1a] p-6 rounded-xl border border-white/10 cursor-pointer hover:bg-[#1f1f1f] transition duration-300 ${service.glowColor}`}
            >
              {/* 🔥 Ribbon */}
              <div className="absolute top-0 left-0 bg-red-600 text-white px-3 py-1 text-xs font-bold rounded-br-xl shadow-md z-10">
                {service.label}
              </div>

              <h3 className="text-lg font-semibold mb-2 text-white">
                {service.title}
              </h3>

              <p className="text-gray-400 text-sm line-clamp-2">
                {service.description}
              </p>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default MiniHotServices;
