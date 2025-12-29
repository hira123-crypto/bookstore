import React from "react";
import { useNavigate } from "react-router-dom";

function ContactUs() {
  const navigate = useNavigate(); // 👈 hook

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="relative bg-white w-full max-w-md p-6 rounded-lg shadow-lg">

        {/* ❌ Cross Button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-center mb-6">
          Contact Us
        </h2>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border px-4 py-2 rounded outline-none focus:ring-2 focus:ring-pink-500"
          />

          <input
            type="email"
            placeholder="Your Email"
            className="w-full border px-4 py-2 rounded outline-none focus:ring-2 focus:ring-pink-500"
          />

          <textarea
            placeholder="Your Message"
            rows="4"
            className="w-full border px-4 py-2 rounded outline-none focus:ring-2 focus:ring-pink-500"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;
