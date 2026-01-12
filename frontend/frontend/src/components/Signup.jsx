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
    // ✅ Data sent to backend
    const userInfo = {
      name: data.fullname,
      email: data.email,
      password: data.password,
    };

    try {
      const response = await fetch("http://localhost:4001/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Signup Successfully");

        // ✅ SAFE data stored in localStorage (NO password)
        const localUser = {
          name: result.user?.name || data.fullname,
          email: result.user?.email || data.email,
        };

        localStorage.setItem("user", JSON.stringify(localUser));

        navigate(from, { replace: true });
      } else {
        toast.error(result.message || "Signup failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error. Please try again later.");
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
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 text-2xl"
            >
              ✕
            </Link>

            <h3 className="font-bold text-2xl mb-6 dark:text-white">
              Signup
            </h3>

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Name */}
              <div className="mb-4">
                <label className="block mb-1 dark:text-white">Name</label>
                <input
                  type="text"
                  placeholder="Enter your fullname"
                  className="w-full px-4 py-2 border rounded-md"
                  {...register("fullname", { required: true })}
                />
                {errors.fullname && (
                  <p className="text-red-500 text-sm">
                    Name is required
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="block mb-1 dark:text-white">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border rounded-md"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">
                    Email is required
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="mb-6">
                <label className="block mb-1 dark:text-white">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border rounded-md"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    Password is required
                  </p>
                )}
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-700"
              >
                Signup
              </button>

              <p className="text-sm mt-4 text-center dark:text-white">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setIsLoginOpen(true)}
                  className="text-blue-500 underline"
                >
                  Login
                </button>
              </p>
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
