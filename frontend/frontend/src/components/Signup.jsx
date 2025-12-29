import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Login from "./Login";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

function Signup() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
    };

    try {
      // Mock signup - replace with real API later
      console.log("User Info:", userInfo);
      toast.success("Signup Successfully");
      localStorage.setItem("Users", JSON.stringify(userInfo));
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      toast.error("Error: Something went wrong");
    }
  };

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-slate-900 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-8 relative">
            {/* Close Button */}
            <Link
              to="/"
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
            >
              ✕
            </Link>

            <h3 className="font-bold text-2xl mb-6 dark:text-white">Signup</h3>

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Name */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your fullname"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                  {...register("fullname", { required: true })}
                />
                {errors.fullname && (
                  <span className="text-sm text-red-500 mt-1 block">
                    This field is required
                  </span>
                )}
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-sm text-red-500 mt-1 block">
                    This field is required
                  </span>
                )}
              </div>

              {/* Password */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <span className="text-sm text-red-500 mt-1 block">
                    This field is required
                  </span>
                )}
              </div>

              {/* Button */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-pink-500 text-white rounded-md px-6 py-2 hover:bg-pink-700 transition duration-200 font-medium"
                >
                  Signup
                </button>
                <p className="text-sm dark:text-gray-300">
                  Have account?{" "}
                  <button
                    type="button"
                    className="underline text-blue-500 hover:text-blue-700 font-medium"
                    onClick={() => setIsLoginOpen(true)}
                  >
                    Login
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}

export default Signup;