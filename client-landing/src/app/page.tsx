"use client";
import { Status } from "@/lib/global-types/type";
import { homePage } from "@/lib/store/home/home-slice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import Carousel from "./components/home/carousal/carousel";

const HomePage = () => {
  const dispatch = useAppDispatch();
  //search logic
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
    <div className="min-h-screen">
      <Carousel/>
      <div className="container mx-auto p-4">
        <Navbar onSearchChange={setSearchTerm} />
        <h1 className="text-3xl font-bold mb-8 mt-15 text-center md:text-left">
          Our Institutes
        </h1>

        {/* Grid of Institutes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
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
                  className="group no-underline bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer border border-transparent hover:border-indigo-400"
                >
                  <div>
                    {/* Smaller Image */}
                    <div className="h-28 w-full relative overflow-hidden rounded-t-xl">
                      <img
                        src={instituteImage}
                        alt={`${instituteName} cover`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    {/* Compact Text Area */}
                    <div className="p-3 flex flex-col items-center text-center">
                      <h2 className="text-sm font-semibold mb-1 text-gray-900 line-clamp-1">
                        {instituteName}
                      </h2>
                      <p className="text-gray-700 text-sm mb-1 line-clamp-1">
                        {instituteAddress}
                      </p>
                      <p className="text-gray-600 text-sm flex items-center justify-center gap-1">
                        <span className="text-indigo-500">📞</span> {institutePhoneNumber}
                      </p>

                      <button className="mt-3 px-3 py-1.5 bg-indigo-500 text-white rounded-md text-xs font-medium hover:bg-indigo-600 transition w-full">
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

