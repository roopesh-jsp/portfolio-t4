import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const links = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-gradient-to-r from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] text-white font-[Poppins] fixed top-0 left-0 w-full z-50 shadow-[0_2px_10px_rgba(255,255,255,0.05)] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/">
          <motion.img
            src="t4.png"
            alt="logo"
            className="h-10 w-10 object-cover cursor-pointer rounded-full border border-white/20 shadow-inner"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        </NavLink>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 items-center">
          {links.map(({ name, path }) => (
            <NavLink
              key={name}
              to={path}
              className={({ isActive }) =>
                `group relative text-sm font-semibold uppercase tracking-wide px-1 transition duration-300 ${
                  isActive ? "text-white" : "text-gray-400 hover:text-white"
                }`
              }
            >
              {name}
              <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-gradient-to-r from-white via-gray-400 to-black scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full"></span>
            </NavLink>
          ))}
        </div>

        {/* Hamburger Icon */}
        <div className="md:hidden z-50" onClick={toggleMenu}>
          {isOpen ? (
            <FaTimes size={24} className="text-white" />
          ) : (
            <FaBars size={24} className="text-white" />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden absolute top-0 left-0 w-full h-screen bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] flex flex-col items-center justify-center gap-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {links.map(({ name, path }) => (
              <NavLink
                key={name}
                to={path}
                onClick={toggleMenu}
                className={({ isActive }) =>
                  `text-2xl font-semibold uppercase tracking-wider transition duration-300 ${
                    isActive
                      ? "text-white underline"
                      : "text-gray-400 hover:text-white"
                  }`
                }
              >
                {name}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
