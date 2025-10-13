"use client";
import { useEffect } from "react";
import { Status } from "@/lib/global-types/type";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchTeacherInfo } from "@/lib/store/teacher/teacher-slice";

const TeacherProfile = () => {
  const dispatch = useAppDispatch();
  const { teacher, status } = useAppSelector((state) => state.teacher);

  useEffect(() => {
    dispatch(fetchTeacherInfo());
  }, [dispatch]);

  if (status === Status.LOADING) {
    return (
      <p className="text-center text-gray-500">Loading teacher profile...</p>
    );
  }

  if (!teacher) {
    return (
      <p className="text-center text-red-500">No teacher data available.</p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-8 bg-white shadow-md rounded-lg overflow-hidden">
      <div className="h-48 bg-gray-100 relative">
        <img
          src={teacher.teacherInstituteImage}
          alt="Institute Cover"
          className="object-cover w-full h-full"
        />
        <div className="absolute bottom-2 left-4 bg-white px-4 py-1 rounded shadow">
          <h2 className="text-xl font-semibold">
            {teacher.teacherInstituteName}
          </h2>
          <p className="text-sm text-gray-600">
            {teacher.teacherInstituteAddress}
          </p>
        </div>
      </div>

      <div className="p-6 flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3 flex justify-center">
          <img
            src={teacher.teacherImage || "/placeholder-avatar.png"}
            alt={teacher.teacherName}
            className="w-40 h-40 rounded-full object-cover border-4 border-blue-100"
          />
        </div>

        <div className="w-full md:w-2/3 space-y-4">
          <h3 className="text-2xl font-bold text-gray-800">
            {teacher.teacherName}
          </h3>
          <p>
            <strong>Email:</strong> {teacher.teacherEmail}
          </p>
          <p>
            <strong>Phone:</strong> {teacher.teacherPhoneNumber}
          </p>
          <p>
            <strong>Expertise:</strong> {teacher.teacherExpertise}
          </p>
          <p>
            <strong>Salary:</strong> {teacher.teacherSalary}
          </p>
          <p>
            <strong>Joined:</strong>{" "}
            {new Date(teacher.teacherJoinDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Address:</strong> {teacher.teacherAddress}
          </p>
          <div>
            <strong>About:</strong>
            <p className="text-gray-700 mt-1">{teacher.aboutTeacher}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
