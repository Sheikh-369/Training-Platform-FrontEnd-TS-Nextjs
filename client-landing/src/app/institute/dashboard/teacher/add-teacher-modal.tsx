'use client'

import { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch } from "@/lib/store/hooks";
import { IInstituteTeacherData } from "@/lib/store/owner/teacher/teacher-slice-type";
import { createTeacher } from "@/lib/store/owner/teacher/teacher-slice";

interface AddTeacherModalProps {
  closeModal: () => void;
  instituteNumber:string;
}

export default function AddTeacherModal({ closeModal,instituteNumber }: AddTeacherModalProps) {
  const dispatch = useAppDispatch();

  const [teacherData, setTeacherData] = useState<IInstituteTeacherData>({
    teacherName: "",
    teacherEmail: "",
    teacherPhoneNumber: "",
    teacherExpertise: "",
    teacherJoinDate: "",
    teacherSalary: "",
    teacherImage: null,
    teacherAddress: "",
  });

  const handleTeacherDataChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    setTeacherData({
      ...teacherData,
      [name]: name === "teacherImage" ? (files ? files[0] : null) : value,
    });
  };

  const handleTeacherDataSubmission = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(createTeacher(instituteNumber,teacherData));
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50"
        onClick={closeModal}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative w-full max-w-sm p-6 bg-blue-50 rounded-lg shadow-xl z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Add Teacher</h3>
          <button
            onClick={closeModal}
            aria-label="Close modal"
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleTeacherDataSubmission} className="space-y-4">
          {/* Name */}
          <div>
            <label
              htmlFor="teacherName"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="teacherName"
              name="teacherName"
              type="text"
              value={teacherData.teacherName}
              onChange={handleTeacherDataChange}
              required
              className="mt-1 w-full border border-gray-300 rounded-md p-2"
              placeholder="Zehan Sheikh"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="teacherEmail"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="teacherEmail"
              name="teacherEmail"
              type="email"
              value={teacherData.teacherEmail}
              onChange={handleTeacherDataChange}
              required
              className="mt-1 w-full border border-gray-300 rounded-md p-2"
              placeholder="malik@gmail.com"
            />
          </div>

          {/* Address */}
          <div>
            <label
              htmlFor="teacherAddress"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <input
              id="teacherAddress"
              name="teacherAddress"
              type="text"
              value={teacherData.teacherAddress}
              onChange={handleTeacherDataChange}
              required
              className="mt-1 w-full border border-gray-300 rounded-md p-2"
              placeholder="123 Main St"
            />
          </div>

          {/* Image */}
          <div>
            <label
              htmlFor="teacherImage"
              className="block text-sm font-medium text-gray-700"
            >
              Teacher Image
            </label>
            <input
              id="teacherImage"
              name="teacherImage"
              type="file"
              accept="image/*"
              onChange={handleTeacherDataChange}
              required
              className="mt-1 w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          {/* Grid with 4 inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Phone */}
            <div>
              <label
                htmlFor="teacherPhoneNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Phone
              </label>
              <input
                id="teacherPhoneNumber"
                name="teacherPhoneNumber"
                type="text"
                value={teacherData.teacherPhoneNumber}
                onChange={handleTeacherDataChange}
                required
                className="mt-1 w-full border border-gray-300 rounded-md p-2"
                placeholder="980XXXXXXX"
              />
            </div>

            {/* Join Date */}
            <div>
              <label
                htmlFor="teacherJoinDate"
                className="block text-sm font-medium text-gray-700"
              >
                Join Date
              </label>
              <input
                id="teacherJoinDate"
                name="teacherJoinDate"
                type="date"
                value={teacherData.teacherJoinDate}
                onChange={handleTeacherDataChange}
                required
                className="mt-1 w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            {/* Expertise */}
            <div>
              <label
                htmlFor="teacherExpertise"
                className="block text-sm font-medium text-gray-700"
              >
                Expertise
              </label>
              <input
                id="teacherExpertise"
                name="teacherExpertise"
                type="text"
                value={teacherData.teacherExpertise}
                onChange={handleTeacherDataChange}
                required
                className="mt-1 w-full border border-gray-300 rounded-md p-2"
                placeholder="JS / Python / Math"
              />
            </div>

            {/* Salary */}
            <div>
              <label
                htmlFor="teacherSalary"
                className="block text-sm font-medium text-gray-700"
              >
                Salary
              </label>
              <input
                id="teacherSalary"
                name="teacherSalary"
                type="text"
                value={teacherData.teacherSalary}
                onChange={handleTeacherDataChange}
                required
                className="mt-1 w-full border border-gray-300 rounded-md p-2"
                placeholder="Rs. xxxx"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700"
            >
              Create Teacher
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
