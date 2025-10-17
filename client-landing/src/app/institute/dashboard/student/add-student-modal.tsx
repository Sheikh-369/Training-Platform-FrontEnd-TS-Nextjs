'use client';

import { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch } from "@/lib/store/hooks";
import { IInstituteStudentData } from "@/lib/store/owner/student/student-slice-type";
import { addStudent } from "@/lib/store/owner/student/student-slice";

interface AddStudentModalProps {
  closeModal: () => void;
  instituteNumber: string;
}

export default function AddStudentModal({ closeModal, instituteNumber }: AddStudentModalProps) {
  const dispatch = useAppDispatch();

  const [studentData, setStudentData] = useState<IInstituteStudentData>({
    studentName: "",
    studentEmail: "",
    studentPhoneNo: "",
    studentAddress: "",
    studentImage: "", // leave empty, will be set later by student
    enrolledDate: "",
  });

  const handleStudentDataChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setStudentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStudentDataSubmission = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await dispatch(addStudent(instituteNumber, studentData));
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
          <h3 className="text-lg font-semibold text-gray-900">Add Student</h3>
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleStudentDataSubmission} className="space-y-4">
          {/* Name */}
          <div>
            <label htmlFor="studentName" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="studentName"
              name="studentName"
              type="text"
              value={studentData.studentName}
              onChange={handleStudentDataChange}
              required
              className="mt-1 w-full border border-gray-300 rounded-md p-2"
              placeholder="John Doe"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="studentEmail" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="studentEmail"
              name="studentEmail"
              type="email"
              value={studentData.studentEmail}
              onChange={handleStudentDataChange}
              required
              className="mt-1 w-full border border-gray-300 rounded-md p-2"
              placeholder="john@example.com"
            />
          </div>

          {/* Address */}
          <div>
            <label htmlFor="studentAddress" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              id="studentAddress"
              name="studentAddress"
              type="text"
              value={studentData.studentAddress}
              onChange={handleStudentDataChange}
              required
              className="mt-1 w-full border border-gray-300 rounded-md p-2"
              placeholder="123 Main St"
            />
          </div>

          {/* Grid with 2 inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Phone */}
            <div>
              <label htmlFor="studentPhoneNo" className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                id="studentPhoneNo"
                name="studentPhoneNo"
                type="text"
                value={studentData.studentPhoneNo}
                onChange={handleStudentDataChange}
                required
                className="mt-1 w-full border border-gray-300 rounded-md p-2"
                placeholder="123-456-7890"
              />
            </div>

            {/* Enrolled Date */}
            <div>
              <label htmlFor="enrolledDate" className="block text-sm font-medium text-gray-700">
                Enrolled Date
              </label>
              <input
                id="enrolledDate"
                name="enrolledDate"
                type="date"
                value={studentData.enrolledDate}
                onChange={handleStudentDataChange}
                required
                className="mt-1 w-full border border-gray-300 rounded-md p-2"
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
              Create Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
