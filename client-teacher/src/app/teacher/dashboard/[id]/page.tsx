'use client';
// import { useRouter } from "next/router";

import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchTeacherData } from "@/lib/store/teacher/teacherSlice";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

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
  <h1 className="text-2xl font-semibold text-white mb-6">Personal Information</h1>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {/* Profile Picture */}
    <div className="md:col-span-1 flex justify-center">
      <img
        className="h-40 w-40 rounded-full object-cover border-4 border-indigo-600 shadow-md"
        src={teacher?.teacherImage}
        alt="Teacher"
      />
    </div>

    {/* Personal Info */}
    <div className="md:col-span-2 bg-slate-700 p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-slate-300">Full Name</p>
          <p className="font-medium text-white">{teacher?.teacherName}</p>
        </div>
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
        <div>
          <p className="text-sm text-slate-300">Join Date</p>
          <p className="font-medium text-white">{teacher?.teacherJoinDate}</p>
        </div>
        <div>
          <p className="text-sm text-slate-300">Institute</p>
          <p className="font-medium text-white">{teacher?.teacherInstituteName}</p>
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
          Passionate educator with over 10 years of experience in teaching advanced mathematics. I believe in interactive and student-centered learning environments.
        </p>
      </div>

      {/* Edit Profile Button */}
      <div className="mt-6">
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
