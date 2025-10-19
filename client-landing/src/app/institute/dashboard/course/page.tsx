"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchCourse } from "@/lib/store/owner/course/course-slice";
import { ICourseData } from "@/lib/store/owner/course/course-slice-type";
import { Status } from "@/lib/global-types/type";
import AddCourseModal from "./add-course-modal";

function InstituteCourse() {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const instituteNumber = searchParams.get("instituteNumber");

  const { course, status } = useAppSelector((state) => state.courseOwner);
  //add course modal logic
  const [isAddCourseModalOpen, setIsAddCourseModalOpen] = useState(false);
  const openAddCourseModal = () => setIsAddCourseModalOpen(true);
  const closeAddCourseModal = () => setIsAddCourseModalOpen(false);

  //search logic
  const [searchText, setSearchText] = useState<string>("");

  // Fetch courses on mount
  useEffect(() => {
    if (instituteNumber) {
      dispatch(fetchCourse(instituteNumber));
    }
  }, [dispatch, instituteNumber]);

  // Filtered courses based on search
  const filteredCourses = course?.filter((c) => {
    const lower = searchText.toLowerCase();
    return (
      c.courseName.toLowerCase().includes(lower) ||
      c.teacherName.toLowerCase().includes(lower) ||
      c.categoryName.toLowerCase().includes(lower) ||
      c.courseLevel.toLowerCase().includes(lower)
    );
  });

  return (
    <div className="flex flex-col">
              {/* ✅ Conditionally render modal */}
      {isAddCourseModalOpen && (
        <AddCourseModal
          closeModal={closeAddCourseModal}
          instituteNumber={String(instituteNumber)}
        />
      )}
      <div className="overflow-x-auto">
        <div className="flex justify-between relative text-gray-500 focus-within:text-gray-900 mb-4">
          {/* Search input */}
          <div className="absolute inset-y-0 left-1 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M17 11A6 6 0 1 0 5 11a6 6 0 0 0 12 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search course by name, teacher, category..."
            className="block w-80 h-11 pr-5 pl-12 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
          />
          <button
        onClick={openAddCourseModal}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Add New Course
      </button>
        </div>

        {/* Loading and Error States */}
        {status === Status.LOADING && <p>Loading courses...</p>}
        {status === Status.ERROR && <p className="text-red-500">Failed to fetch courses.</p>}

        {/* Table */}
        {status === Status.SUCCESS && (
          <div className="overflow-hidden">
            <table className="min-w-full rounded-xl">
              <thead>
                <tr className="bg-sky-300">
                  <th className="p-5 text-left text-sm font-semibold text-gray-900"></th>
                  <th className="p-5 text-left text-sm font-semibold text-gray-900">Name</th>
                  <th className="p-5 text-left text-sm font-semibold text-gray-900">Price</th>
                  <th className="p-5 text-left text-sm font-semibold text-gray-900">Duration</th>
                  <th className="p-5 text-left text-sm font-semibold text-gray-900">Level</th>
                  <th className="p-5 text-left text-sm font-semibold text-gray-900">Category</th>
                  <th className="p-5 text-left text-sm font-semibold text-gray-900">Teacher</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {filteredCourses?.map((course: ICourseData) => (
                  <tr key={course.id} className="bg-white hover:bg-gray-50 transition-all">
                    <td>
                    {typeof course.courseThumbnail === "string" && course.courseThumbnail ? (
                        <img src={course.courseThumbnail} alt="Course Thumbnail" className="w-12 h-12 object-cover rounded-2xl" />
                    ) : (
                        "No thumbnail"
                    )}
                    </td>
                    <td className="p-5 text-sm text-gray-900">{course.courseName}</td>
                    <td className="p-5 text-sm text-gray-900">{course.coursePrice}</td>
                    <td className="p-5 text-sm text-gray-900">{course.courseDuration}</td>
                    <td className="p-5 text-sm text-gray-900">{course.courseLevel}</td>
                    <td className="p-5 text-sm text-gray-900">{course.categoryName}</td>
                    <td className="p-5 text-sm text-gray-900">{course.teacherName}</td>
                  </tr>
                ))}
                {filteredCourses?.length === 0 && (
                  <tr>
                    <td colSpan={7} className="p-5 text-center text-sm text-gray-500">
                      No courses found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default InstituteCourse;
