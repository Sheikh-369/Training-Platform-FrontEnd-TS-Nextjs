"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { IInstituteData } from "./instituteTypes";
import { useAppDispatch } from "@/lib/store/hooks";
import { createInstitute } from "@/lib/store/institute/instituteSlice";

const Institute = () => {
  const dispatch=useAppDispatch()
  const [instituteData, setInstituteData] = useState<IInstituteData>({
    instituteName: "",
    instituteEmail: "",
    institutePhoneNumber: "",
    instituteAddress: "",
    institutePanNumber: "",
    instituteVatNumber: "",
  });

  const [idType, setIdType] = useState(""); // Track PAN/VAT selection

  const handleInstituteDataChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInstituteData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const instituteDataSubmission = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createInstitute(instituteData))
    alert("Institute created successfully!")
    console.log("Submitted Institute Data:", instituteData);
    // You can add form submission logic here (e.g., API call)
  };

  return (
    <div
  className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 sm:px-6 lg:px-8"
  style={{
    backgroundImage: `url('/backgrounds/university2.jpg')`, // Make sure you have this image in /public/backgrounds/
  }}
>
  <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 sm:p-10">
    <h2 className="text-center text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
      Register Your Institute
    </h2>

    <form onSubmit={instituteDataSubmission} className="space-y-5">
      {/* Institute Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Institute Name
        </label>
        <input
          id="name"
          name="instituteName"
          type="text"
          value={instituteData.instituteName}
          onChange={handleInstituteDataChange}
          placeholder="Kathmandu National College"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Institute Email
        </label>
        <input
          id="email"
          name="instituteEmail"
          type="email"
          value={instituteData.instituteEmail}
          onChange={handleInstituteDataChange}
          placeholder="info@institute.com"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Phone Number */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number
        </label>
        <input
          id="phone"
          name="institutePhoneNumber"
          type="tel"
          value={instituteData.institutePhoneNumber}
          onChange={handleInstituteDataChange}
          placeholder="+977 1234567890"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Address */}
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
          Address
        </label>
        <input
          id="address"
          name="instituteAddress"
          type="text"
          value={instituteData.instituteAddress}
          onChange={handleInstituteDataChange}
          placeholder="Dillibazar, Kathmandu"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* ID Type Dropdown */}
      <div>
        <label htmlFor="idType" className="block text-sm font-medium text-gray-700 mb-1">
          Select ID Type
        </label>
        <select
          id="idType"
          value={idType}
          onChange={(e) => setIdType(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
        >
          <option value="">Select PAN / VAT</option>
          <option value="PAN">PAN Number</option>
          <option value="VAT">VAT Number</option>
        </select>
      </div>

      {/* Conditional PAN/VAT input */}
      {idType && (
        <div>
          <label htmlFor="idValue" className="block text-sm font-medium text-gray-700 mb-1">
            {idType} Number
          </label>
          <input
            id="idValue"
            name={idType === "PAN" ? "institutePanNumber" : "instituteVatNumber"}
            type="text"
            placeholder={`Enter your ${idType} number`}
            value={
              idType === "PAN"
                ? instituteData.institutePanNumber
                : instituteData.instituteVatNumber
            }
            onChange={handleInstituteDataChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      )}

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition-all duration-200"
        >
          Register
        </button>
      </div>
    </form>
  </div>
</div>


  );
};

export default Institute;
