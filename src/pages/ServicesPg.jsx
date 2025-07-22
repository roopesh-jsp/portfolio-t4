import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { services as tabs } from "../../data/services";
import { useSearchParams } from "react-router-dom";

function ServicesPg() {
  const [activeTab, setActiveTab] = useState(0);
  const [searchParams] = useSearchParams();

  // Set initial tab based on query param
  useEffect(() => {
    const tabSlug = searchParams.get("tab");
    if (tabSlug) {
      const index = tabs.findIndex((tab) => tab.slug === tabSlug);
      if (index !== -1) setActiveTab(index);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [searchParams]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <section className="bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0a0a0a] text-white py-16 px-6 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Our <span className="text-cyan-400">Core Services</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore how T4 Solutions brings your ideas to life — with tailored
            digital experiences.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {tabs.map((tab, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`px-4 py-2 rounded-full border text-sm md:text-base font-medium transition-all duration-300 
                ${
                  activeTab === idx
                    ? "bg-cyan-400 text-black border-cyan-400"
                    : "border-white/20 text-white hover:border-cyan-400 hover:text-cyan-400"
                }`}
            >
              {tab.title}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
            className="bg-[#1a1a1a] p-8 rounded-xl shadow-md border border-white/10 max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-3 mb-4">
              {tabs[activeTab].icon}
              <h3 className="text-2xl font-semibold">
                {tabs[activeTab].title}
              </h3>
            </div>
            <p className="text-gray-400 mb-6">{tabs[activeTab].description}</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              {tabs[activeTab].focus.map((feat, i) => (
                <li key={i} className="hover:text-cyan-400 transition">
                  {feat}
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

export default ServicesPg;
