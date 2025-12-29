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
    const userInfo = {
      email: data.email,
      password: data.password,
    };

    try {
      // Mock login - Replace with your axios call when backend is ready
      // await axios.post("http://localhost:4001/user/login", userInfo)
      
      console.log("Login data:", userInfo);
      
      // Simulate successful login
      const mockResponse = {
        user: {
          fullname: "Test User",
          email: userInfo.email,
        }
      };
      
      if (mockResponse) {
        toast.success("Logged in Successfully");
        localStorage.setItem("Users", JSON.stringify(mockResponse.user));
        
        onClose(); // Close modal
        
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (err) {
      console.error(err);
      toast.error("Error: " + (err.response?.data?.message || "Something went wrong"));
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
          type="button"
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
          onClick={onClose}
        >
          ✕
        </button>

        <h3 className="font-bold text-2xl mb-6 dark:text-white">Login</h3>

        <form onSubmit={handleSubmit(onSubmit)}>
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
              Login
            </button>
            <p className="text-sm dark:text-gray-300">
              Not registered?{" "}
              <Link
                to="/signup"
                className="underline text-blue-500 hover:text-blue-700 font-medium"
                onClick={onClose}
              >
                Signup
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;