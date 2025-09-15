'use client';
// import { useRouter } from "next/router";

import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchTeacherData } from "@/lib/store/teacher/teacherSlice";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const TeacherPersonPage = () => {
    const dispatch = useAppDispatch();

    //single teacher backend bata tanne tarika
    const {teacher}= useAppSelector((store) => store.teacher)
    const params = useParams();
    const id = params.id; // this is undefined on first render until router ready

   useEffect(() => {
  if (id) {
    dispatch(fetchTeacherData(id as string));
  }
  console.log(teacher);
}, [dispatch, id]);

  return (
    <div className="p-6 bg-slate-800 rounded-lg shadow-md">
  {/* Header */}
  <div className="flex flex-row justify-between items-center mb-6">
    <h1 className="text-2xl font-semibold text-white">{teacher?.teacherInstituteName}</h1>
    <h1 className="text-2xl font-semibold text-white">Personal Information</h1>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {/* Profile Picture */}
    <div className="md:col-span-1 flex justify-center">
      <div className="flex flex-col items-center">
        <img
          className="h-80 w-80 rounded-full object-cover border-4 border-indigo-600 shadow-md"
          src={teacher?.teacherImage}
          alt="Teacher"
        />
        <p className="font-medium text-white text-4xl mt-4">{teacher?.teacherName}</p>
      </div>
    </div>

    {/* Personal Info Card (includes info + about + button) */}
    <div className="md:col-span-2 bg-slate-700 p-6 rounded-lg shadow-md flex flex-col h-full">
      {/* Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-slate-300">Email</p>
          <p className="font-medium text-white">{teacher?.teacherEmail}</p>
        </div>
        <div>
          <p className="text-sm text-slate-300">Phone</p>
          <p className="font-medium text-white">{teacher?.teacherPhoneNumber}</p>
        </div>
        <div>
          <p className="text-sm text-slate-300">Department</p>
          <p className="font-medium text-white">{teacher?.teacherExpertise}</p>
        </div>
        <div className="sm:col-span-2">
          <p className="text-sm text-slate-300">Address</p>
          <p className="font-medium text-white">{teacher?.teacherAddress}</p>
        </div>
      </div>

      {/* About Section */}
      <div className="mt-6">
        <p className="text-sm text-slate-300 mb-1">About Me</p>
        <p className="text-slate-200 leading-relaxed">
          {teacher?.aboutTeacher}
        </p>
      </div>

      {/* Edit Profile Button aligned to bottom-right */}
      <div className="mt-6 flex justify-end">
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded">
          Edit Profile
        </button>
      </div>
    </div>
  </div>
</div>



  );
};

export default TeacherPersonPage;
