import React, { useState } from "react";
import { Link } from "react-router-dom";
import Login from "./Login";
import { useAuth } from "../context/authprovider";
import Logout from "./Logout";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [authUser] = useAuth(); // ✅ Get authUser from context

  return (
    <>
      <nav className="bg-gray-100 dark:bg-slate-900 border-b border-gray-300 dark:border-slate-700 sticky top-0 z-50 shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-black dark:text-white">
            bookStore
          </Link>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-black dark:text-white"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6">
            <Link to="/" className="hover:text-pink-500 dark:text-white">
              Home
            </Link>
            <Link to="/course" className="hover:text-pink-500 dark:text-white">
              Course
            </Link>
            <Link to="/contact" className="hover:text-pink-500 dark:text-white">
              ContactUs
            </Link>
            

            {authUser ? (
              <>
                <span className="dark:text-white">Hi, {authUser.name}</span>
                <Logout /> {/* ✅ Use Logout component */}
              </>
            ) : (
              <button
                onClick={() => setIsLoginOpen(true)}
                className="bg-black dark:bg-pink-500 text-white px-6 py-2 rounded"
              >
                Login
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden px-4 pb-4 space-y-3">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="block py-2"
            >
              Home
            </Link>
            <Link
              to="/course"
              onClick={() => setIsMenuOpen(false)}
              className="block py-2"
            >
              Course
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="block py-2"
            >
              ContactUs
            </Link>
            <Link
              to="/about"
              onClick={() => setIsMenuOpen(false)}
              className="block py-2"
            >
              About
            </Link>
            {authUser && <Logout />} {/* ✅ Show logout in mobile menu */}
          </div>
        )}
      </nav>

      {/* Login Modal */}
      <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}

export default Navbar;
