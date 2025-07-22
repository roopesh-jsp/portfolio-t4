import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { services } from "../../data/services.jsx";

function ServicesSection() {
  return (
    <section className="bg-[#0d0d0d] text-white px-6 py-20">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 text-white">What We Do</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          We transform concepts into compelling digital realities. Our core
          services are designed to elevate your online presence and drive
          tangible results.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {services.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            whileHover={{
              scale: 1.03,
              transition: { duration: 0.3 }, // quick responsive hover
            }}
            className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 shadow-[0_0_12px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(0,255,255,0.2)] transition-shadow duration-300"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                {item.icon}
                <h3 className="text-xl font-semibold">{item.title}</h3>
              </div>
              <p className="text-gray-400 text-sm mb-6">{item.description}</p>
              <ul className="text-sm space-y-2">
                {item.focus.map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-300">
                    <span className="text-green-400">✔</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Link
              to={`/services?tab=${item.slug}`}
              className="mt-6 inline-block text-sm text-cyan-400 underline cursor-pointer hover:text-cyan-300"
            >
              See full details
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default ServicesSection;
