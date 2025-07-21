import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaExclamationTriangle } from "react-icons/fa";

function NotFound() {
  return (
    <div className="bg-black min-h-screen flex items-center justify-center text-white px-6">
      <motion.div
        className="text-center max-w-xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <FaExclamationTriangle
          size={80}
          className="text-red-500 mx-auto mb-6 animate-pulse"
        />

        <h1 className="text-5xl font-extra bold mb-4">404</h1>
        <p className="text-xl text-gray-300 mb-6">
          Oops! The page you're looking for doesn't exist.
        </p>

        <Link
          to="/"
          className="inline-block mt-4 px-6 py-3 bg-white text-black rounded-full text-lg font-semibold hover:bg-gray-200 transition duration-300"
        >
          Go back home
        </Link>
      </motion.div>
    </div>
  );
}

export default NotFound;
