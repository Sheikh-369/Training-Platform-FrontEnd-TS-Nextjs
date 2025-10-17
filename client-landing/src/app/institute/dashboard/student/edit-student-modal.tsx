'use client'

import React, { useState, ChangeEvent, FormEvent } from "react";
import { useAppDispatch } from "@/lib/store/hooks";
import { IInstituteStudentData } from "@/lib/store/owner/student/student-slice-type";
import { updateStudent } from "@/lib/store/owner/student/student-slice";

interface EditStudentModalProps {
  student: IInstituteStudentData;
  closeModal: () => void;
  instituteNumber: string;
}

const EditStudentModal: React.FC<EditStudentModalProps> = ({ student, closeModal, instituteNumber }) => {
  const dispatch = useAppDispatch();

  const [studentData, setStudentData] = useState<IInstituteStudentData>({
    id: student.id,
    studentName: student.studentName,
    studentEmail: student.studentEmail,
    studentPhoneNo: student.studentPhoneNo,
    studentAddress: student.studentAddress,
    studentImage: student.studentImage, // We'll keep it read-only or editable later
    enrolledDate: student.enrolledDate,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setStudentData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateStudent(instituteNumber,Number(student.id),studentData));
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={closeModal}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-xl z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Edit Student</h3>
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
        <form onSubmit={handleSubmit} className="space-y-4">
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
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 rounded-md p-2"
              placeholder="Student name"
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
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 rounded-md p-2"
              placeholder="student@example.com"
            />
          </div>

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
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 rounded-md p-2"
              placeholder="980xxxxxxx"
            />
          </div>

          {/* Address */}
          <div>
            <label htmlFor="studentAddress" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <textarea
              id="studentAddress"
              name="studentAddress"
              value={studentData.studentAddress}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 rounded-md p-2"
              placeholder="Student address"
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
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 rounded-md p-2"
            />
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
              Update Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStudentModal;
