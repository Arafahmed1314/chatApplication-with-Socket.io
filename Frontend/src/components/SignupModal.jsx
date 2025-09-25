import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthProvider";
import API_BASE_URL from "../config/api.js";

export default function SignupModal({ isOpen, onClose, onSwitchToLogin }) {
  const { setAuthUser } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({
    mode: "onBlur",
  });

  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const password = watch("password");

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullName,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };

    setApiError("");
    setSuccessMessage("");

    try {
      const response = await axios.post(
        `${API_BASE_URL}/users/signup`,
        userInfo
      );
      console.log(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      setAuthUser(response.data);

      toast.success("Account created successfully! Welcome to the chat!", {
        icon: "🎉",
      });

      setTimeout(() => {
        navigate("/chat");
        onClose();
      }, 1500);
    } catch (error) {
      const errorMessage =
        error.response?.data?.error ||
        "An unexpected error occurred. Please try again.";
      setApiError(errorMessage);
      toast.error(errorMessage, {
        icon: "❌",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-lg border border-white/20 relative max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10"
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
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-purple-400 to-blue-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Join Us</h2>
          <p className="text-purple-200">Create your account to get started</p>
        </div>

        {/* Success/Error Messages */}
        {successMessage && (
          <div className="bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-xl p-3 mb-4">
            <p className="text-green-200 text-sm text-center">
              {successMessage}
            </p>
          </div>
        )}
        {apiError && (
          <div className="bg-red-500/20 backdrop-blur-sm border border-red-400/30 rounded-xl p-3 mb-4">
            <p className="text-red-200 text-sm text-center">{apiError}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Full Name"
              {...register("fullName", {
                required: "Full name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              })}
              className={`w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 transition-all duration-300 ${
                errors.fullName
                  ? "focus:ring-red-400 border-red-400/50"
                  : "focus:ring-purple-400 focus:border-transparent"
              }`}
            />
            {errors.fullName && (
              <p className="text-red-300 text-sm mt-1 ml-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="email"
              placeholder="Email Address"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className={`w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 transition-all duration-300 ${
                errors.email
                  ? "focus:ring-red-400 border-red-400/50"
                  : "focus:ring-purple-400 focus:border-transparent"
              }`}
            />
            {errors.email && (
              <p className="text-red-300 text-sm mt-1 ml-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 4,
                  message: "Password must be at least 4 characters",
                },
              })}
              className={`w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 transition-all duration-300 ${
                errors.password
                  ? "focus:ring-red-400 border-red-400/50"
                  : "focus:ring-purple-400 focus:border-transparent"
              }`}
            />
            {errors.password && (
              <p className="text-red-300 text-sm mt-1 ml-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className={`w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 transition-all duration-300 ${
                errors.confirmPassword
                  ? "focus:ring-red-400 border-red-400/50"
                  : "focus:ring-purple-400 focus:border-transparent"
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-300 text-sm mt-1 ml-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:scale-105"
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Creating Account...
              </span>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-purple-200 text-sm">
            Already have an account?{" "}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-purple-300 hover:text-white font-medium transition-colors duration-300 underline hover:no-underline px-1 py-1 rounded hover:bg-white/10"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
