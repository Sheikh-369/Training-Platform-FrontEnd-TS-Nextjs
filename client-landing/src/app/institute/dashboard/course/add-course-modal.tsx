'use client';

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { ICourseData } from "@/lib/store/owner/course/course-slice-type";
import { fetchAllTeachers } from "@/lib/store/owner/teacher/teacher-slice";
import { fetchCategory } from "@/lib/store/owner/category/category-slice";
import { addCourse } from "@/lib/store/owner/course/course-slice";

interface ICloseModal {
  closeModal: () => void;
  instituteNumber: string;
}

const AddCourseModal: React.FC<ICloseModal> = ({ closeModal, instituteNumber }) => {
  const dispatch = useAppDispatch();

  // Provide fallback empty arrays to avoid null errors
  const category = useAppSelector((state) => state.category.category || []);
  const instituteTeacher = useAppSelector((state) => state.instituteTeacher.instituteTeacher || []);

  const [courseData, setCourseData] = useState<ICourseData>({
    id: 0,
    courseName: "",
    coursePrice: "",
    courseDuration: "",
    courseDescription: "",
    courseLevel: "",
    teacherId: "",
    categoryId: "",
    courseThumbnail: null,
    teacherName: "",
    categoryName: "",
  });

  useEffect(() => {
    dispatch(fetchAllTeachers(instituteNumber));
    dispatch(fetchCategory(instituteNumber));
  }, [dispatch, instituteNumber]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "teacherId") {
      const selectedTeacher = instituteTeacher.find((t) => t.id?.toString() === value);
      setCourseData((prev) => ({
        ...prev,
        teacherId: value,
        teacherName: selectedTeacher?.teacherName || "",
      }));
    } else if (name === "categoryId") {
      const selectedCategory = category.find((c) => c.id.toString() === value);
      setCourseData((prev) => ({
        ...prev,
        categoryId: value,
        categoryName: selectedCategory?.categoryName || "",
      }));
    } else {
      setCourseData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setCourseData((prev) => ({
      ...prev,
      courseThumbnail: file,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("courseName", courseData.courseName);
    formData.append("coursePrice", courseData.coursePrice);
    formData.append("courseDuration", courseData.courseDuration);
    formData.append("courseDescription", courseData.courseDescription);
    formData.append("courseLevel", courseData.courseLevel);
    formData.append("teacherId", courseData.teacherId.toString());
    formData.append("teacherName", courseData.teacherName);
    formData.append("categoryId", courseData.categoryId.toString());
    formData.append("categoryName", courseData.categoryName);
    if (courseData.courseThumbnail) {
      formData.append("courseThumbnail", courseData.courseThumbnail);
    }

    await dispatch(addCourse(instituteNumber, formData as any));
    closeModal();
  };

  return (
    <div id="modal" className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" />
      <div className="relative w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add Course</h3>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg
              className="h-4 w-4 inline-block ml-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="space-y-4">
            <input
              type="text"
              name="courseName"
              placeholder="Course Name"
              value={courseData.courseName}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            />

            <input
              type="text"
              name="coursePrice"
              placeholder="Course Price"
              value={courseData.coursePrice}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />

            <input
              type="text"
              name="courseDuration"
              placeholder="Course Duration"
              value={courseData.courseDuration}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />

            <textarea
              name="courseDescription"
              placeholder="Course Description"
              value={courseData.courseDescription}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />

            <select
              name="courseLevel"
              value={courseData.courseLevel}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select Course Level</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advance">Advance</option>
            </select>

            <select
              name="categoryId"
              value={courseData.categoryId.toString()}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select Category</option>
              {category.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.categoryName}
                </option>
              ))}
            </select>

            <select
              name="teacherId"
              value={courseData.teacherId.toString()}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select Teacher</option>
              {instituteTeacher.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.teacherName}
                </option>
              ))}
            </select>

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-2 border rounded-md"
            />

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Add Course
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourseModal;
