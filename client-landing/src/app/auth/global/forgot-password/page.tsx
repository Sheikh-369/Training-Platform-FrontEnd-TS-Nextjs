'use client';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAppDispatch } from '@/lib/store/hooks';
import { forgotPassword } from '@/lib/store/auth/auth-slice'; 
import Link from 'next/link';

function ForgotPassword() {
    const dispatch = useAppDispatch();
    const router = useRouter();
  const [emailData, setEmailData] = useState({
    userEmail:""
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const{name,value}=e.target
    setEmailData({
        ...emailData,
        [name]:value
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!emailData.userEmail) {
      toast.error("Please enter your email.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailData.userEmail)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    try {
        const response = await dispatch(forgotPassword(emailData));

        if (response?.status === 200) {
            toast.success(response.data?.message || "OTP sent successfully.");
            router.push("/auth/global/reset-password"); 
        } else {
            toast.error(response?.data?.message || "Failed to send OTP.");
        }
        } catch (err: any) {
        if (err?.response?.data?.message) {
            toast.error(err.response.data.message);
        } else {
            toast.error("An unexpected error occurred.");
        }
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
              htmlFor="email"
              className="block mb-1 text-sm text-indigo-600 font-semibold"
            >
              Email
            </label>
            <input
              type="email"
              name="userEmail"
              id="email"
              value={emailData.userEmail}
              onChange={handleChange}
              placeholder="Enter your registered email"
              className="w-full p-1.5 text-sm text-indigo-700 border-b border-indigo-500 outline-none focus:bg-gray-100 transition"
              required
            />
          </div>

          <input
            type="submit"
            value="Send OTP"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold py-1.5 rounded cursor-pointer transition"
          />
        </form>

        <footer className="flex flex-col items-center text-xs mt-3 space-y-1">
          <Link
            href="/auth/global/login"
            className="text-indigo-700 hover:text-pink-700 transition"
          >
            Back to Login
          </Link>
          <Link
            href="/auth/global/register"
            className="text-indigo-700 hover:text-pink-700 transition"
          >
            Don't have an account? Sign Up
          </Link>
        </footer>
      </div>
    </div>
  );
}

export default ForgotPassword;
