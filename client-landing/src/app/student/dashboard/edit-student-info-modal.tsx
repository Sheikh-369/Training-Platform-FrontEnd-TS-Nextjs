'use client';

import React, { useState } from 'react';
import { useAppDispatch } from '@/lib/store/hooks';
import { editStudentInfo } from '@/lib/store/student/student-slice';

type Props = {
  student: any;
  instituteNumber: string;
  onClose: () => void;
};

const EditStudentModal: React.FC<Props> = ({ student, instituteNumber, onClose }) => {
  const dispatch = useAppDispatch();

  const [studentData, setFormData] = useState({
    studentName: student.studentName || '',
    studentEmail: student.studentEmail || '',
    studentPhoneNo: student.studentPhoneNo || '',
    studentAddress: student.studentAddress || '',
    enrolledDate: student.enrolledDate?.slice(0, 10) || '', // for input[type="date"]
    aboutStudent: student.aboutStudent || '',
    studentImage: null as File | null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, studentImage: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();

      data.append('id', student.id); // Required by backend
      data.append('studentName', studentData.studentName);
      data.append('studentEmail', studentData.studentEmail);
      data.append('studentPhoneNo', studentData.studentPhoneNo);
      data.append('studentAddress', studentData.studentAddress);
      data.append('enrolledDate', studentData.enrolledDate);
      data.append('aboutStudent', studentData.aboutStudent || '');

      if (studentData.studentImage) {
        data.append('studentImage', studentData.studentImage);
      }

      // Use your thunk here
      await dispatch(editStudentInfo(instituteNumber, data));

      onClose(); // Close modal after update
    } catch (err: any) {
      console.error('Failed to edit student:', err.message);
      alert('Something went wrong while updating student.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4">Edit Student</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="studentName"
            placeholder="Name"
            className="border p-2 rounded"
            value={studentData.studentName}
            onChange={handleChange}
            required
          />
          <input
            name="studentEmail"
            placeholder="Email"
            type="email"
            className="border p-2 rounded"
            value={studentData.studentEmail}
            onChange={handleChange}
            required
          />
          <input
            name="studentPhoneNo"
            placeholder="Phone"
            className="border p-2 rounded"
            value={studentData.studentPhoneNo}
            onChange={handleChange}
            required
          />
          <input
            name="enrolledDate"
            type="date"
            className="border p-2 rounded"
            value={studentData.enrolledDate}
            onChange={handleChange}
            required
          />
          <input
            name="studentAddress"
            placeholder="Address"
            className="border p-2 rounded col-span-full"
            value={studentData.studentAddress}
            onChange={handleChange}
            required
          />
          <textarea
            name="aboutStudent"
            placeholder="About Student"
            className="border p-2 rounded col-span-full"
            value={studentData.aboutStudent}
            onChange={handleChange}
          />
          <input
            type="file"
            name="studentImage"
            accept="image/*"
            className="col-span-full"
            onChange={handleImageChange}
          />
          <div className="flex gap-2 mt-4 col-span-full">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStudentModal;
