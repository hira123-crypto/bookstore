import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

function Login({ isOpen, onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const loginInfo = {
      email: data.email,
      password: data.password,
    };

    try {
      const response = await fetch("http://localhost:4001/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Logged in Successfully");

        // ✅ SAFE data only (NO password)
        const localUser = {
          name: result.user?.name || "User",
          email: result.user?.email || data.email,
        };

        localStorage.setItem("user", JSON.stringify(localUser));

        onClose(); // close modal

        setTimeout(() => {
          window.location.reload();
        }, 800);
      } else {
        toast.error(result.message || "Invalid email or password");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-md mx-4 p-6 z-10">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-2xl text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h3 className="font-bold text-2xl mb-6 dark:text-white">
          Login
        </h3>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div className="mb-4">
            <label className="block mb-1 dark:text-white">
              Email
            </label>
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
            <label className="block mb-1 dark:text-white">
              Password
            </label>
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
            Login
          </button>

          <p className="text-sm mt-4 text-center dark:text-white">
            Not registered?{" "}
            <Link
              to="/signup"
              onClick={onClose}
              className="text-blue-500 underline"
            >
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
