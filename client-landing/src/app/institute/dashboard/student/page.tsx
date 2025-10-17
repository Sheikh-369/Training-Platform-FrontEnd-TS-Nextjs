'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { IInstituteStudentData } from '@/lib/store/owner/student/student-slice-type';
import { fetchAllStudents } from '@/lib/store/owner/student/student-slice';
import AddStudentModal from './add-student-modal';
import EditStudentModal from './edit-student-modal';
import DeleteStudentModal from './delete-student-modal';


export default function InstituteStudent() {
  const dispatch = useAppDispatch();
  const owner = useAppSelector((state) => state.owner.owner);
  const instituteNumber = owner?.instituteNumber;
  const students = useAppSelector((state) => state.instituteStudent.instituteStudent);
  //add student
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  //delete student
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  //edit student
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

const openEditModal = (student: IInstituteStudentData) => {
  setSelectedStudent(student);
  setIsEditModalOpen(true);
};

const closeEditModal = () => {
  setSelectedStudent(null);
  setIsEditModalOpen(false);
};

const openDeleteModal = (student: IInstituteStudentData) => {
  setSelectedStudent(student);
  setIsDeleteModalOpen(true);
};

const closeDeleteModal = () => {
  setSelectedStudent(null);
  setIsDeleteModalOpen(false);
};


  //search logic
  const [searchedText, setSearchedText] = useState(''); 
  const [selectedStudent, setSelectedStudent] = useState<IInstituteStudentData | null>(null);

  useEffect(() => {
    if (instituteNumber) {
      dispatch(fetchAllStudents(String(instituteNumber)));
    }
  }, [dispatch, instituteNumber]);

  const filteredStudents = (students ?? []).filter((student) => {
    const search = searchedText.toLowerCase();
    return (
      student.studentName.toLowerCase().includes(search) ||
      student.studentEmail.toLowerCase().includes(search) ||
      student.studentPhoneNo.toLowerCase().includes(search) ||
      student.studentAddress.toLowerCase().includes(search)
    );
  });

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm">
{/* Delete Modal */}
{isDeleteModalOpen && selectedStudent && (
  <DeleteStudentModal
    student={selectedStudent}
    closeModal={closeDeleteModal}
    instituteNumber={String(instituteNumber)}
  />
)}

{/* Edit Student Modal */}
{isEditModalOpen && selectedStudent && instituteNumber && (
  <EditStudentModal
    student={selectedStudent}
    instituteNumber={String(instituteNumber)}
    closeModal={closeEditModal}
  />
)}


      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="relative w-80">
          <input
            type="text"
            placeholder="Search students..."
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
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-green-600 hover:bg-green-700 transition text-white px-4 py-2 rounded-full text-sm font-semibold"
        >
          + Add Student
        </button>
        {/* Add Student Modal */}
        {isAddModalOpen && instituteNumber && (
          <AddStudentModal
            closeModal={() => setIsAddModalOpen(false)}
            instituteNumber={String(instituteNumber)}
          />
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
          <thead className="bg-sky-300 text-gray-700 font-semibold">
            <tr>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Address</th>
              <th className="px-4 py-3">Enrolled</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student: IInstituteStudentData) => (
                <tr key={student.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3">
                    <img
                      src={student.studentImage || '/default-profile.png'}
                      alt={student.studentName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-4 py-3">{student.studentName}</td>
                  <td className="px-4 py-3">{student.studentEmail}</td>
                  <td className="px-4 py-3">{student.studentPhoneNo}</td>
                  <td className="px-4 py-3">{student.studentAddress}</td>
                  <td className="px-4 py-3">{student.enrolledDate}</td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-2 gap-1.5">
                      <button
                        className="text-indigo-600 hover:text-indigo-800 cursor-pointer"
                        onClick={() => openEditModal(student)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800 cursor-pointer"
                        onClick={() => openDeleteModal(student)}
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
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
