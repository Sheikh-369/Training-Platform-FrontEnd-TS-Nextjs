'use client';

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchCourseById } from "@/lib/store/institute-course/institute-course-slice";
import { Status } from "@/lib/global-types/type";

const CourseDetailPage = () => {
  const { instituteId, courseId } = useParams() as { instituteId?: string; courseId?: string };
  const dispatch = useAppDispatch();
  const { selectedCourse, status } = useAppSelector((state) => state.course);

  useEffect(() => {
    if (instituteId && courseId && !isNaN(Number(instituteId)) && !isNaN(Number(courseId))) {
      dispatch(fetchCourseById(Number(instituteId), Number(courseId)));
    } else {
      console.error("Invalid params:", { instituteId, courseId });
    }
  }, [dispatch, instituteId, courseId]);

  if (status === Status.LOADING) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-xl">
        Loading course details...
      </div>
    );
  }

  if (status === Status.ERROR) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-xl">
        Error loading course details.
      </div>
    );
  }

  if (!selectedCourse) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400 text-xl">
        No course details found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        {/* Hero Thumbnail */}
        {selectedCourse.courseThumbnail ? (
          <img
            src={selectedCourse.courseThumbnail}
            alt={selectedCourse.courseName}
            className="w-full h-64 object-cover"
          />
        ) : (
          <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500 text-lg">
            No Thumbnail Available
          </div>
        )}

        {/* Course Content */}
        <div className="p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{selectedCourse.courseName}</h1>
          <p className="text-gray-700 text-base leading-relaxed mb-6">
            {selectedCourse.courseDescription || "No course description provided."}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <h3 className="text-sm text-gray-500 uppercase mb-1">Category</h3>
              <p className="text-lg font-medium text-gray-800">{selectedCourse.categoryName}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <h3 className="text-sm text-gray-500 uppercase mb-1">Duration</h3>
              <p className="text-lg font-medium text-gray-800">{selectedCourse.courseDuration}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <h3 className="text-sm text-gray-500 uppercase mb-1">Price</h3>
              <p className="text-lg font-medium text-gray-800">Rs. {selectedCourse.coursePrice}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <h3 className="text-sm text-gray-500 uppercase mb-1">Teacher</h3>
              {/* <p className="text-lg font-medium text-gray-800">{selectedCourse.teacherName || "Not Assigned"}</p> */}
            </div>

            <div className="bg-gray-50 p-4 rounded-md border border-gray-200 col-span-full">
              <h3 className="text-sm text-gray-500 uppercase mb-1">Institute</h3>
              <p className="text-lg font-medium text-gray-800">{selectedCourse.instituteName}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
