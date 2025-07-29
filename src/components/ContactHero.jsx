import { FaInstagram, FaPhoneAlt } from "react-icons/fa";

export default function ContactHero() {
  return (
    <section className="w-full bg-[#0d0d0d] text-white px-6 py-20 flex flex-col items-center">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4tracking-wide drop-shadow">
          Contact <span className="text-cyan-400">T4 Solutions</span>
        </h1>
        <p className="mb-6 text-md text-gray-200">
          Feel free to call us or enquire about your project needs — we’re
          always here to help!
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center gap-5 mt-8">
          <a
            target="_blank"
            href="https://wa.me/918897502339?text=Hi!%20I%E2%80%99d%20like%20to%20book%20a%20free%20call%20about%20building%20a%20website%20for%20my%20business."
            className="flex items-center gap-3 text-cyan-300 font-semibold bg-[#23243e]/60 px-5 py-3 rounded-lg hover:bg-[#23243e]/90 transition shadow-lg"
          >
            <FaPhoneAlt className="text-purple-500" />
            <span>8897502339</span>
          </a>
          <a
            href="https://www.instagram.com/t4_element?igsh=Y3k2bjhnNW1rbGMy"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-pink-300 font-semibold bg-[#20152b]/60 px-5 py-3 rounded-lg hover:bg-pink-600/80 transition shadow-lg"
          >
            <FaInstagram className="text-pink-400" />
            <span>@t4solutions</span>
          </a>
        </div>
      </div>
    </section>
  );
}
