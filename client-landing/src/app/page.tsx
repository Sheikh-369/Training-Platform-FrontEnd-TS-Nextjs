'use client'

import { Status } from "@/lib/global-types/type";
import { homePage } from "@/lib/store/home-slice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import React, { useEffect } from "react";

const HomePage = () => {
  const dispatch = useAppDispatch();

  // Select institute data and status from redux state
  const { institute, status } = useAppSelector((store) => store.home);

  useEffect(() => {
    dispatch(homePage());
  }, [dispatch]);

  if (status === Status.LOADING) return <p>Loading institutes...</p>;
  if (status === Status.ERROR) return <p>Failed to load institutes. Please try again.</p>;

  // Log instituteNumber instead of id (id doesn't exist)
  console.log("Institute IDs:", institute.map(i => i.instituteNumber));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Our Institutes</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {institute.length === 0 ? (
          <p>No institutes found.</p>
        ) : (
          institute.map(({ instituteNumber, instituteName, instituteAddress, institutePhoneNumber, instituteImage }) => (
            <div
              key={instituteNumber}  // use instituteNumber as unique key
              className="border rounded shadow hover:shadow-lg p-4 flex flex-col items-center"
            >
              <img
                src={instituteImage}
                alt={`${instituteName} cover`}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">{instituteName}</h2>
              <p className="text-gray-600 mb-1">{instituteAddress}</p>
              <p className="text-gray-600">📞 {institutePhoneNumber}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;
