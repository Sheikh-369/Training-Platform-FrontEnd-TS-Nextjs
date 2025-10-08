"use client";

import { Status } from "@/lib/global-types/type";
import { homePage } from "@/lib/store/home/home-slice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const { institute, status } = useAppSelector((store) => store.home);

  useEffect(() => {
    dispatch(homePage());
  }, [dispatch]);

  const filteredInstitutes = institute.filter(
    (inst) =>
      inst.instituteName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inst.instituteAddress.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (status === Status.LOADING) return <p>Loading institutes...</p>;
  if (status === Status.ERROR)
    return <p>Failed to load institutes. Please try again.</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-indigo-200 to-blue-200">
      <div className="container mx-auto p-4">
        <Navbar onSearchChange={setSearchTerm} />
        <h1 className="text-3xl font-bold mb-8 mt-15 text-center md:text-left">
          Our Institutes
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredInstitutes.length === 0 ? (
            <p className="text-center text-gray-700">No institutes found.</p>
          ) : (
            filteredInstitutes.map(
              ({
                instituteNumber,
                instituteName,
                instituteAddress,
                institutePhoneNumber,
                instituteImage,
              }) => (
                <Link
                  key={instituteNumber}
                  href={`/institutes/${instituteNumber}/courses`}
                  passHref
                  className="group"
                >
                  <div
                    key={instituteNumber}
                    className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer border border-transparent hover:border-indigo-400"
                  >
                    <div className="h-48 w-full relative overflow-hidden rounded-t-xl">
                      <img
                        src={instituteImage}
                        alt={`${instituteName} cover`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-5">
                      <h2 className="text-2xl font-semibold mb-2 text-gray-900">
                        {instituteName}
                      </h2>
                      <p className="text-gray-700 mb-1">{instituteAddress}</p>
                      <p className="text-gray-600 flex items-center gap-2">
                        <span className="text-indigo-500">📞</span> {institutePhoneNumber}
                      </p>
                      {/* Optional button for CTA */}
                      <button className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-md text-sm font-medium hover:bg-indigo-600 transition">
                        View Courses
                      </button>
                    </div>
                  </div>
                </Link>
              )
            )
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
