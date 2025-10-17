"use client";
import { useEffect } from "react";
import { Status } from "@/lib/global-types/type";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchTeacherInfo } from "@/lib/store/teacher/teacher-slice";
import { useSearchParams } from "next/navigation";

const TeacherProfile = () => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const instituteNumber = searchParams.get("instituteNumber");
  const { teacher, status } = useAppSelector((state) => state.teacher);

  useEffect(() => {
    if (instituteNumber) {
      dispatch(fetchTeacherInfo(instituteNumber));
    }
  }, [dispatch, instituteNumber]);

  if (status === Status.LOADING) {
    return (
      <p className="text-center text-gray-500 mt-8 text-lg">Loading profile...</p>
    );
  }

  if (!teacher) {
    return (
      <p className="text-center text-red-500 mt-8 text-lg">No teacher data found.</p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-1 bg-sky-200 rounded-xl shadow-lg overflow-hidden">
      {/* Cover Image */}
      <div className="relative h-52 md:h-64 bg-gray-200">
        <img
          src={teacher.teacherInstituteImage}
          alt="Institute Banner"
          className="object-cover w-full h-full"
        />
        <div className="absolute bottom-3 left-4 bg-white bg-opacity-90 px-5 py-3 rounded-md shadow-md">
          <h2 className="text-xl font-bold text-gray-800">
            {teacher.teacherInstituteName}
          </h2>
          <p className="text-sm text-gray-600">{teacher.teacherInstituteAddress}</p>
        </div>
      </div>

      {/* Profile Info */}
      <div className="p-6 md:p-10 flex flex-col md:flex-row gap-8">
        {/* Left - Avatar */}
        <div className="flex flex-col items-center md:items-start md:w-1/3">
          <img
            src={teacher.teacherImage || "/placeholder-avatar.png"}
            alt={teacher.teacherName}
            className="w-40 h-40 rounded-full border-4 border-blue-200 shadow-md object-cover"
          />
          <h3 className="mt-4 text-xl font-semibold text-gray-800">{teacher.teacherName}</h3>
          <span className="text-sm text-gray-500">{teacher.teacherExpertise}</span>
        </div>

        {/* Right - Details */}
        <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 text-sm">
          <div>
            <span className="text-gray-500 font-medium">Email</span>
            <p className="text-gray-800">{teacher.teacherEmail}</p>
          </div>
          <div>
            <span className="text-gray-500 font-medium">Phone</span>
            <p className="text-gray-800">{teacher.teacherPhoneNumber}</p>
          </div>
          <div>
            <span className="text-gray-500 font-medium">Salary</span>
            <p className="text-gray-800">{teacher.teacherSalary}</p>
          </div>
          <div>
            <span className="text-gray-500 font-medium">Joined On</span>
            <p className="text-gray-800">
              {new Date(teacher.teacherJoinDate).toLocaleDateString()}
            </p>
          </div>
          <div className="sm:col-span-2">
            <span className="text-gray-500 font-medium">Address</span>
            <p className="text-gray-800">{teacher.teacherAddress}</p>
          </div>
          <div className="sm:col-span-2">
            <span className="text-gray-500 font-medium">About</span>
            <p className="text-gray-700 mt-1 leading-relaxed">{teacher.aboutTeacher}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
