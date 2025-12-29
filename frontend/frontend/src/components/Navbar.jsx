import React, { useState } from "react";
import { Link } from "react-router-dom";
import Login from "./Login";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <>
      <nav className="bg-gray-100 dark:bg-slate-900 border-b border-gray-300 dark:border-slate-700 sticky top-0 z-50 shadow-md">
        {/* Main Navbar */}
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-black dark:text-white">
            bookStore
          </Link>

          {/* Hamburger (Mobile) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-black dark:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6">
            <Link to="/" className="hover:text-pink-500 dark:text-white">Home</Link>
            <Link to="/course" className="hover:text-pink-500 dark:text-white">Course</Link>

            {/* ✅ ContactUs route */}
            <Link to="/contact" className="hover:text-pink-500 dark:text-white">
              ContactUs
            </Link>

            <Link to="/about" className="hover:text-pink-500 dark:text-white">About</Link>

            {/* Search */}
            <div className="flex items-center border border-gray-300 dark:border-slate-600 rounded-md px-3 py-1 bg-white dark:bg-slate-800">
              <input
                type="text"
                placeholder="Search"
                className="outline-none text-sm w-32 bg-transparent dark:text-white"
              />
            </div>

            <button
              onClick={() => setIsLoginOpen(true)}
              className="bg-black dark:bg-pink-500 text-white px-6 py-2 rounded hover:bg-gray-800 dark:hover:bg-pink-700"
            >
              Login
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden px-4 pb-4 space-y-3">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="block py-2">Home</Link>
            <Link to="/course" onClick={() => setIsMenuOpen(false)} className="block py-2">Course</Link>

            {/* ✅ ContactUs mobile */}
            <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="block py-2">
              ContactUs
            </Link>

            <Link to="/about" onClick={() => setIsMenuOpen(false)} className="block py-2">About</Link>

            <button
              onClick={() => {
                setIsLoginOpen(true);
                setIsMenuOpen(false);
              }}
              className="w-full bg-black dark:bg-pink-500 text-white py-2 rounded"
            >
              Login
            </button>
          </div>
        )}
      </nav>

      {/* Login Modal */}
      <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}

export default Navbar;
