"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { IInstituteData } from "./instituteTypes";



const Institute = () => {
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
    console.log("Submitted Institute Data:", instituteData);
    // You can add form submission logic here (e.g., API call)
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase">
        Register Your Institute
      </div>

      <form className="py-4 px-6" method="POST" onSubmit={instituteDataSubmission}>
        {/* Institute Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            Institute Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            name="instituteName"
            type="text"
            placeholder="Enter your institute name"
            value={instituteData.instituteName}
            onChange={handleInstituteDataChange}
          />
        </div>

        {/* Institute Email */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Institute Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            name="instituteEmail"
            type="email"
            placeholder="Enter your institute email"
            value={instituteData.instituteEmail}
            onChange={handleInstituteDataChange}
          />
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="phone">
            Institute Phone Number
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="phone"
            name="institutePhoneNumber"
            type="tel"
            placeholder="Enter your institute phone number"
            value={instituteData.institutePhoneNumber}
            onChange={handleInstituteDataChange}
          />
        </div>

        {/* Address */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="address">
            Institute Address
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="address"
            name="instituteAddress"
            type="text"
            placeholder="Enter your institute address"
            value={instituteData.instituteAddress}
            onChange={handleInstituteDataChange}
          />
        </div>

        {/* Dropdown to select PAN/VAT */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="idType">
            Select ID Type
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="idType"
            value={idType}
            onChange={(e) => setIdType(e.target.value)}
          >
            <option value="">Select PAN / VAT</option>
            <option value="PAN">PAN Number</option>
            <option value="VAT">VAT Number</option>
          </select>
        </div>

        {/* Conditionally show input based on selected type */}
        {idType && (
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="idValue">
              {idType} Number
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            />
          </div>
        )}

        {/* Submit button */}
        <div className="flex items-center justify-center mb-4">
          <button
            className="bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Institute;
