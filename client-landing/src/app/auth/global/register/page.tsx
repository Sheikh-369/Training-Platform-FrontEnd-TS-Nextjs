'use client';

import { userRegister } from "@/lib/store/auth/auth-slice";
import { IUserData } from "@/lib/store/auth/auth-slice-type";
import { useAppDispatch } from "@/lib/store/hooks";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

function Register() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [userData, setUserData] = useState<IUserData>({
    userName: "",
    userEmail: "",
    userPassword: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  // --- Frontend Validation ---
  if (!userData.userName || !userData.userEmail || !userData.userPassword) {
    toast.error("All fields are mandatory!");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(userData.userEmail)) {
    toast.error("Please enter a valid email address.");
    return;
  }

  if (userData.userPassword.length < 6) {
    toast.error("Password must be at least 6 characters long.");
    return;
  }

  // --- Submit ---
  try {
    const result = await dispatch(userRegister(userData));

    if (result?.success) {
      toast.success(result.message || "Registered successfully!");
      router.push("/auth/global/login");
    } else {
      toast.error(result.message || "Registration failed.");
    }
  } catch (err) {
    toast.error("Something went wrong!");
  }
};


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-[260px] bg-white rounded-lg p-4 shadow-md border border-gray-200">
        <header className="text-center">
          <img
            className="w-12 mx-auto mb-3"
            src="https://img.icons8.com/fluent/48/user-male-circle.png"
            alt="Logo"
          />
        </header>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              className="block mb-1 text-sm text-indigo-600 font-semibold"
              htmlFor="userName"
            >
              Username
            </label>
            <input
              className="w-full p-1.5 text-sm text-indigo-700 border-b border-indigo-500 outline-none focus:bg-gray-100 transition"
              type="text"
              name="userName"
              id="userName"
              value={userData.userName}
              onChange={handleChange}
              required
              placeholder="Enter username"
            />
          </div>

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
              value={userData.userEmail}
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
              value={userData.userPassword}
              onChange={handleChange}
              required
              placeholder="Enter password"
            />
          </div>

          <input
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold py-1.5 rounded cursor-pointer transition"
            type="submit"
            value="Register"
          />
        </form>

        <footer className="flex justify-center text-xs mt-3">
          <Link
            className="text-indigo-700 hover:text-pink-700 transition"
            href="/auth/global/login"
          >
            Already have an account? Login
          </Link>
        </footer>
      </div>
    </div>
  );
}

export default Register;
