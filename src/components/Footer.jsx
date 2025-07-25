import { motion } from "framer-motion";

function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0a0a0a] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 text-center md:text-left"
        >
          {/* Column 1: Branding (left-aligned) */}
          <div>
            <h3 className="text-xl font-bold text-white mb-2">T4 Solutions</h3>
            <p className="text-gray-400 text-sm max-w-xs">
              Turning ideas into digital excellence.
            </p>
          </div>

          {/* Column 2: Navigation (center-aligned) */}
          <div className="flex flex-col items-center">
            <h4 className="text-lg font-semibold mb-3 text-white">Explore</h4>
            <ul className="space-y-2 text-sm text-gray-400 text-center">
              <li>
                <a href="/" className="hover:text-cyan-400 transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/services" className="hover:text-cyan-400 transition">
                  services
                </a>
              </li>

              <li>
                <a href="/contact" className="hover:text-cyan-400 transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Stay Connected (left-aligned) */}
          <div>
            <h4 className="text-lg font-semibold mb-3 text-white">
              Stay Connected
            </h4>
            <p className="text-gray-400 text-sm max-w-xs">
              Follow us or get in touch — details coming soon.
            </p>
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-gray-500"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          &copy; {new Date().getFullYear()} T4 Solutions. All rights reserved.
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;
