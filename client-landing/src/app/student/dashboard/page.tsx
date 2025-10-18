"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { Status } from "@/lib/global-types/type";
import { fetchStudentInfo } from "@/lib/store/student/student-slice";
import EditStudentModal from "./edit-student-info-modal";

const StudentProfilePage = () => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const instituteNumber = searchParams.get("instituteNumber");
  const studentId = Number(searchParams.get("studentId"));

  const { student, status } = useAppSelector((state) => state.student);
  //edit logic ko lagi
  const [showEditModal, setShowEditModal] = useState(false); // Modal state

  useEffect(() => {
    if (instituteNumber) {
      dispatch(fetchStudentInfo(instituteNumber));
    }
  }, [dispatch, instituteNumber]);

  if (status === Status.LOADING) {
    return <p className="text-center text-gray-500 mt-8 text-lg">Loading student profile...</p>;
  }


  if (!student) {
    return <p className="text-center text-red-500 mt-8 text-lg">No student data found.</p>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-1 bg-sky-100 rounded-xl shadow-lg overflow-hidden">
            {/* Render Edit Modal */}
      {showEditModal && (
        <EditStudentModal
          student={student}
          instituteNumber={instituteNumber!}
          onClose={() => setShowEditModal(false)}
        />
      )}
      {/* Cover Image */}
      <div className="relative h-52 md:h-64 bg-gray-200">
        <img
          src={student.studentInstituteImage}
          alt="Institute Banner"
          className="object-cover w-full h-full"
        />
        <div className="absolute bottom-3 left-4 bg-white bg-opacity-90 px-5 py-3 rounded-md shadow-md">
          <h2 className="text-xl font-bold text-gray-800">{student.studentInstituteName}</h2>
          <p className="text-sm text-gray-600">{student.studentInstituteAddress}</p>
        </div>
      </div>

      {/* Profile Info */}
      <div className="p-6 md:p-10 flex flex-col md:flex-row gap-8">
        {/* Avatar */}
        <div className="flex flex-col items-center md:items-start md:w-1/3">
          <img
            src={
              typeof student.studentImage === "string" && student.studentImage.trim() !== ""
                ? student.studentImage
                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            }
            alt={student.studentName}
            className="w-40 h-40 rounded-full border-4 border-blue-300 shadow-md object-cover"
          />
          <h3 className="mt-4 text-xl font-semibold text-gray-800">{student.studentName}</h3>
          <span className="text-sm text-gray-500">Student</span>
        </div>

        {/* Details */}
        <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 text-sm">
          <div>
            <span className="text-gray-500 font-medium">Email</span>
            <p className="text-gray-800">{student.studentEmail}</p>
          </div>
          <div>
            <span className="text-gray-500 font-medium">Phone</span>
            <p className="text-gray-800">{student.studentPhoneNo}</p>
          </div>
          <div>
            <span className="text-gray-500 font-medium">Enrolled On</span>
            <p className="text-gray-800">{new Date(student.enrolledDate).toLocaleDateString()}</p>
          </div>
          <div className="sm:col-span-2">
            <span className="text-gray-500 font-medium">Address</span>
            <p className="text-gray-800">{student.studentAddress}</p>
          </div>
          <div className="sm:col-span-2">
            <span className="text-gray-500 font-medium">About</span>
            <p className="text-gray-700 mt-1 leading-relaxed">{student.aboutStudent}</p>
          </div>
        </div>
      </div>
            {/* Edit Button */}
      <div className="text-right px-10 pb-8">
        <button
          onClick={() => setShowEditModal(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          ✏️ Edit Profile
        </button>
      </div>
    </div>
  );
};

export default StudentProfilePage;
