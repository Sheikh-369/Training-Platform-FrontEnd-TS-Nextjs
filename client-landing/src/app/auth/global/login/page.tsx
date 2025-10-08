'use client'
import { userLogin } from "@/lib/store/auth/auth-slice"; // Make sure this exists
import { IUserData } from "@/lib/store/auth/auth-slice-type";
import { useAppDispatch } from "@/lib/store/hooks";
import React, { useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link"; // For Next.js routing
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function Login() {
  const dispatch = useAppDispatch();
  const router=useRouter()

  const [loginData, setLoginData] = useState<IUserData>({
    userEmail: "",
    userPassword: ""
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  // --- Frontend Validation ---
  if (!loginData.userEmail || !loginData.userPassword) {
    toast.error("Email and password are required!");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(loginData.userEmail)) {
    toast.error("Please enter a valid email address.");
    return;
  }

  if (loginData.userPassword.length < 6) {
    toast.error("Password must be at least 6 characters long.");
    return;
  }

  // --- Submit login ---
  try {
    const result = await dispatch(userLogin(loginData));

    if (result?.success) {
      toast.success(result.message || "Login successful!");
      router.push("/");
    } else {
      toast.error(result.message || "Invalid email or password.");
    }
  } catch (err) {
    toast.error("Something went wrong during login.");
  }
};

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-[260px] bg-white rounded-lg p-4 shadow-md border border-gray-200">
        <header className="text-center">
          <img
            className="w-12 mx-auto mb-3"
            src="https://img.icons8.com/fluent/344/year-of-tiger.png"
            alt="Logo"
          />
        </header>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block mb-1 text-sm text-indigo-600 font-semibold"
              htmlFor="userEmail"
            >
              Email
            </label>
            <input
              className="w-full p-1.5 text-sm text-indigo-700 border-b border-indigo-500 outline-none focus:bg-gray-100 transition"
              type="email"
              name="userEmail"
              id="userEmail"
              value={loginData.userEmail}
              onChange={handleChange}
              required
              placeholder="Enter email"
            />
          </div>

          <div className="mb-4">
  <label
    className="block mb-1 text-sm text-indigo-600 font-semibold"
    htmlFor="userPassword"
  >
    Password
  </label>
  <input
    className="w-full p-1.5 text-sm text-indigo-700 border-b border-indigo-500 outline-none focus:bg-gray-100 transition"
    type="password"
    name="userPassword"
    id="userPassword"
    value={loginData.userPassword}
    onChange={handleChange}
    required
    placeholder="Enter password"
  />
</div>

{/* 🔗 Forgot Password link just below password input */}
<div className="mb-4 text-right">
  <Link
    className="text-xs text-indigo-600 hover:text-pink-700 transition"
    href="/auth/global/forgot-password"
  >
    Forgot Password?
  </Link>
</div>

<input
  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold py-1.5 rounded cursor-pointer transition"
  type="submit"
  value="Login"
/>

        </form>

        <footer className="flex justify-center text-xs mt-3">
  <Link
    className="text-indigo-700 hover:text-pink-700 transition"
    href="/auth/global/register"
  >
    Don't have an account? Sign Up
  </Link>
</footer>

      </div>
    </div>
  );
}

export default Login;
