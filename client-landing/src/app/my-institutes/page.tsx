"use client";

import React, { useEffect } from "react";
import { Status } from "@/lib/global-types/type";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchUserInstitutes } from "@/lib/store/user-institute-role/user-institute-role-slice";
import Link from "next/link";

export default function MyInstitutes() {
  const dispatch = useAppDispatch();
  const { institutes, status } = useAppSelector((state) => state.userRole);

  useEffect(() => {
    dispatch(fetchUserInstitutes());
  }, [dispatch]);

  if (status === Status.LOADING) {
    return <div className="text-center mt-10">Loading your institutes...</div>;
  }

  if (status === Status.ERROR) {
    return (
      <div className="text-center mt-10 text-red-600">
        Failed to load institutes. Please try again later.
      </div>
    );
  }

  if (institutes.length === 0) {
    return (
      <div className="text-center mt-10">
        You are not linked to any institutes yet.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto mt-10 px-6 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">My Institutes</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {institutes.map(
          ({ instituteNumber, instituteName, instituteAddress, instituteImage, role }) => {
            // role badge styles
            const roleClass =
              role === "institute"
                ? "bg-blue-100 text-blue-700"
                : role === "teacher"
                ? "bg-green-100 text-green-700"
                : role === "student"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-gray-100 text-gray-700";

            return (
              <Link
                href={`/institutes/${instituteNumber}`}
                key={`${instituteNumber}-${role}`}
                className="bg-white border rounded-lg shadow hover:shadow-xl transition-shadow duration-200 overflow-hidden group"
              >
                <div className="h-40 overflow-hidden">
                  <img
                    src={instituteImage}
                    alt={instituteName}
                    className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800 mb-1 truncate">
                    {instituteName}
                  </h2>
                  <p className="text-sm text-gray-600 mb-2 truncate">
                    {instituteAddress}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500">
                      <strong>ID:</strong> {instituteNumber}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${roleClass}`}
                    >
                      {role}
                    </span>
                  </div>
                </div>
              </Link>
            );
          }
        )}
      </div>
    </div>
  );
}
