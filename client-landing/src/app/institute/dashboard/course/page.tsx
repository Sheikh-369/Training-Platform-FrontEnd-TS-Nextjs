"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchCourse } from "@/lib/store/owner/course/course-slice";
import { ICourseData } from "@/lib/store/owner/course/course-slice-type";
import { Status } from "@/lib/global-types/type";
import AddCourseModal from "./add-course-modal";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import EditCourseModal from "./edit-course-modal";
import DeleteCourseModal from "./delete-course-modal";

function InstituteCourse() {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const instituteNumber = searchParams.get("instituteNumber");
  const { course, status } = useAppSelector((state) => state.courseOwner);
  //for add modal
  const [isAddCourseModalOpen, setIsAddCourseModalOpen] = useState(false);
  //for edit course modal
  const [isEditCourseModalOpen, setIsEditCourseModalOpen] = useState(false);
  const [courseToEdit, setCourseToEdit] = useState<ICourseData | null>(null);
  //for delete course modal
  const [isDeleteCourseModalOpen, setIsDeleteCourseModalOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<ICourseData | null>(null); 
  //for search logic
  const [searchText, setSearchText] = useState<string>("");
  //for add course modal
  const openAddCourseModal = () => setIsAddCourseModalOpen(true);
  const closeAddCourseModal = () => setIsAddCourseModalOpen(false);
  //for edit course modal
  const openEditCourseModal = (course: ICourseData) => {
    setCourseToEdit(course);
    setIsEditCourseModalOpen(true);
  };

  const closeEditCourseModal = () => {
    setCourseToEdit(null);
    setIsEditCourseModalOpen(false);
  };

  //for delete course modal
    const openDeleteCourseModal = (course: ICourseData) => {
    setCourseToDelete(course);
    setIsDeleteCourseModalOpen(true);
  };

  const closeDeleteCourseModal = () => {
    setCourseToDelete(null);
    setIsDeleteCourseModalOpen(false);
  };

  useEffect(() => {
    if (instituteNumber) {
      dispatch(fetchCourse(instituteNumber));
    }
  }, [dispatch, instituteNumber]);

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
    <div className="p-6 bg-white rounded-xl shadow-sm">
      {/* ✅ Add Modal */}
      {isAddCourseModalOpen && (
        <AddCourseModal
          closeModal={closeAddCourseModal}
          instituteNumber={String(instituteNumber)}
        />
      )}
            {/* Edit Modal */}
      {isEditCourseModalOpen && courseToEdit && (
        <EditCourseModal
          closeModal={closeEditCourseModal}
          instituteNumber={String(instituteNumber)}
          courseToEdit={courseToEdit}
        />
      )}
      
      {/* Delete Course Modal */}
      {isDeleteCourseModalOpen && courseToDelete && (
        <DeleteCourseModal closeModal={closeDeleteCourseModal} instituteNumber={String(instituteNumber)} course={courseToDelete} />
      )}

      {/* ✅ Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="relative w-80">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full px-4 py-2 pl-10 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <svg
            className="w-5 h-5 absolute left-3 top-2.5 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M17 11A6 6 0 1 0 5 11a6 6 0 0 0 12 0z"
            />
          </svg>
        </div>

        <button
          onClick={openAddCourseModal}
          className="bg-green-600 hover:bg-green-700 transition text-white px-4 py-2 rounded-full text-sm font-semibold"
        >
          + Add Course
        </button>
      </div>

      {/* ✅ Content */}
      {status === Status.LOADING && (
        <p className="text-gray-500 text-center py-6">Loading courses...</p>
      )}

      {status === Status.ERROR && (
        <p className="text-red-500 text-center py-6">Failed to fetch courses.</p>
      )}

      {status === Status.SUCCESS && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
            <thead className="bg-sky-300 text-gray-700 font-semibold">
              <tr>
                <th className="px-4 py-3">Thumbnail</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Duration</th>
                <th className="px-4 py-3">Level</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Teacher</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCourses && filteredCourses.length > 0 ? (
                filteredCourses.map((course: ICourseData) => (
                  <tr key={course.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3">
                      {typeof course.courseThumbnail === "string" && course.courseThumbnail ? (
                        <img
                          src={course.courseThumbnail}
                          alt="Thumbnail"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-gray-400 text-xs">No image</span>
                      )}
                    </td>
                    <td className="px-4 py-3">{course.courseName}</td>
                    <td className="px-4 py-3">{course.coursePrice}</td>
                    <td className="px-4 py-3">{course.courseDuration}</td>
                    <td className="px-4 py-3">{course.courseLevel}</td>
                    <td className="px-4 py-3">{course.categoryName}</td>
                    <td className="px-4 py-3">{course.teacherName}</td>
                            {/* Actions column */}
                    <td className="px-4 py-3 flex space-x-3">
                      <button
                        onClick={() => openEditCourseModal(course)}
                        aria-label="Edit course"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FiEdit size={18} />
                      </button>
                      <button
                        onClick={() => openDeleteCourseModal(course)}
                        aria-label="Delete course"
                        className="text-red-600 hover:text-red-800">
                        <FiTrash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center text-gray-500 py-6">
                    No courses found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default InstituteCourse;
