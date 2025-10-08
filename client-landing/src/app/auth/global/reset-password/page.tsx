'use client';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useAppDispatch } from '@/lib/store/hooks';
import { useRouter } from 'next/navigation';
import { resetPassword } from '@/lib/store/auth/auth-slice';
import { IUserData } from '@/lib/store/auth/auth-slice-type';
import toast from 'react-hot-toast';
import Link from 'next/link';

function ResetPassword() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [resetPasswordData, setResetPasswordData] = useState<IUserData>({
    userEmail: '',
    OTP: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setResetPasswordData({
      ...resetPasswordData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { userEmail, OTP, newPassword, confirmNewPassword } = resetPasswordData;

    if (!userEmail || !OTP || !newPassword || !confirmNewPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      toast.error("Please enter a valid email.");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      toast.error("Passwords do not match.");
      return;
    }

        try {
    const response = await dispatch(resetPassword(resetPasswordData));

    if (response?.status === 200) {
        toast.success(response.data?.message || "Password reset successful!");
        router.push('/auth/global/login');
    } else {
        toast.error(response?.data?.message || "Password reset failed.");
    }
    } catch (err) {
    toast.error("An unexpected error occurred.");
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
          <div className="mb-3">
            <label className="block text-sm font-semibold text-indigo-600 mb-1" htmlFor="userEmail">
              Email
            </label>
            <input
              type="email"
              name="userEmail"
              id="userEmail"
              value={resetPasswordData.userEmail}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full p-1.5 text-sm text-indigo-700 border-b border-indigo-500 outline-none focus:bg-gray-100 transition"
              required
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-semibold text-indigo-600 mb-1" htmlFor="OTP">
              OTP
            </label>
            <input
              type="text"
              name="OTP"
              id="OTP"
              value={resetPasswordData.OTP}
              onChange={handleChange}
              placeholder="Enter OTP"
              className="w-full p-1.5 text-sm text-indigo-700 border-b border-indigo-500 outline-none focus:bg-gray-100 transition"
              required
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-semibold text-indigo-600 mb-1" htmlFor="newPassword">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              id="newPassword"
              value={resetPasswordData.newPassword}
              onChange={handleChange}
              placeholder="New password"
              className="w-full p-1.5 text-sm text-indigo-700 border-b border-indigo-500 outline-none focus:bg-gray-100 transition"
              required
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-semibold text-indigo-600 mb-1" htmlFor="confirmNewPassword">
              Confirm New Password
            </label>
            <input
              type="password"
              name="confirmNewPassword"
              id="confirmNewPassword"
              value={resetPasswordData.confirmNewPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              className="w-full p-1.5 text-sm text-indigo-700 border-b border-indigo-500 outline-none focus:bg-gray-100 transition"
              required
            />
          </div>

          <input
            type="submit"
            value="Reset Password"
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
        </footer>
      </div>
    </div>
  );
}

export default ResetPassword;
