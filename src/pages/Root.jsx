import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

function Root() {
  return (
    <div className="bg-slate-900 text-gray-200">
      <Navbar />
      <div className="mt-[72px]">
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}

export default Root;
