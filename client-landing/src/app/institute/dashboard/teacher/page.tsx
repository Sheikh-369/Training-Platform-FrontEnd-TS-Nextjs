'use client'

import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {  fetchAllTeachers } from "@/lib/store/owner/teacher/teacher-slice";
import { IInstituteTeacherData } from "@/lib/store/owner/teacher/teacher-slice-type";
import { useEffect, useState } from "react";
import AddTeacherModal from "./add-teacher-modal";
import { useSearchParams } from "next/navigation";

export default function InstituteTeacher() {
  const dispatch = useAppDispatch();
  const instituteTeacher = useAppSelector((store) => store.instituteTeacher.instituteTeacher);
  //importing institute number
  // const searchParams = useSearchParams();
  // const instituteNumber = searchParams.get('instituteNumber');
  const owner = useAppSelector((state) => state.owner.owner);
  const instituteNumber = owner?.instituteNumber;

  const [searchedText, setSearchedText] = useState("");
  //add teacher
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    if(instituteNumber){
      dispatch(fetchAllTeachers(String(instituteNumber)));
    }  
  }, [instituteNumber,dispatch]);

  const filteredData = (instituteTeacher ?? []).filter((t) => {
    const searchLower = searchedText.toLowerCase();
    return (
      t.teacherName.toLowerCase().includes(searchLower) ||
      (t.id?.toString() ?? "").toLowerCase().includes(searchLower) ||
      t.teacherExpertise.toLowerCase().includes(searchLower) ||
      t.teacherPhoneNumber.toLowerCase().includes(searchLower) ||
      t.teacherSalary.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm">
        
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="relative w-80">
          <input
            type="text"
            placeholder="Search for teacher..."
            value={searchedText}
            onChange={(e) => setSearchedText(e.target.value)}
            className="w-full px-4 py-2 pl-10 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <svg
            className="w-5 h-5 absolute left-3 top-2.5 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <button
        onClick={() => setIsAddModalOpen(true)}
          className="bg-green-600 hover:bg-green-700 transition text-white px-4 py-2 rounded-full text-sm font-semibold"
          
        >
          + Add Teacher
        </button>
        {isAddModalOpen && instituteNumber && (<AddTeacherModal closeModal={() => setIsAddModalOpen(false)} instituteNumber={String(instituteNumber)} />)}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 font-semibold">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Expertise</th>
              <th className="px-4 py-3">Salary</th>
              <th className="px-4 py-3">Joined</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredData.length > 0 ? (
              filteredData.map((t: IInstituteTeacherData) => (
                <tr key={t.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3">{t.teacherName}</td>
                  <td className="px-4 py-3">{t.teacherEmail}</td>
                  <td className="px-4 py-3">{t.teacherPhoneNumber}</td>
                  <td className="px-4 py-3">{t.teacherExpertise}</td>
                  <td className="px-4 py-3">{t.teacherSalary}</td>
                  <td className="px-4 py-3">{t.teacherJoinDate}</td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-2">
                      <button
                        className="text-indigo-600 hover:text-indigo-800"
                        onClick={() => {/* open edit modal */}}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => {/* delete logic */}}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center text-gray-500 py-6">
                  No teacher data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
