'use client'
import React from "react";
import { useAppDispatch } from "@/lib/store/hooks";
import { deleteCourse } from "@/lib/store/owner/course/course-slice";
import { ICourseData } from "@/lib/store/owner/course/course-slice-type";

interface DeleteCourseModalProps {
  course: ICourseData;
  closeModal: () => void;
  instituteNumber: string;
}

const DeleteCourseModal: React.FC<DeleteCourseModalProps> = ({ course, closeModal, instituteNumber }) => {
  const dispatch = useAppDispatch();
  
  const handleDelete = () => {
    dispatch(deleteCourse(instituteNumber, course.id.toString()));
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50" />

      {/* Modal content */}
      <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Delete Course</h3>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close modal"
          >
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <p className="text-gray-700 mb-6">
          Are you sure you want to delete the course "<strong>{course.courseName}</strong>"? This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={closeModal}
            className="px-4 py-2 text-sm font-medium text-gray-800 bg-gray-200 border border-gray-300 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCourseModal;
