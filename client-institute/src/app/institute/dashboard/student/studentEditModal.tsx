import React, { useState } from "react";
import { IStudentDataModal, IStudentData } from "@/lib/store/institute/student/studentSliceTypes";
import { useAppDispatch } from "@/lib/store/hooks";
import { updateStudent } from "@/lib/store/institute/student/studentSlice";

interface Props {
  student: IStudentData;
  closeModal: () => void;
}

const StudentEditModal: React.FC<Props> = ({ student, closeModal }) => {
  const dispatch = useAppDispatch();

  const [form, setForm] = useState<IStudentDataModal>({
    studentName: student.studentName,
    studentPhoneNo: student.studentPhoneNo,
    studentAddress: student.studentAddress,
    enrolledDate: student.enrolledDate,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    dispatch(updateStudent(student.id, form));
    closeModal();
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
      <div className="modal-content p-4 bg-white shadow-lg rounded">
        <h2 className="text-xl font-bold mb-4">Edit Student</h2>
        <input name="studentName" value={form.studentName} onChange={handleChange} placeholder="Name" />
        <input name="studentPhoneNo" value={form.studentPhoneNo} onChange={handleChange} placeholder="Phone" />
        <input name="studentAddress" value={form.studentAddress} onChange={handleChange} placeholder="Address" />
        <input name="enrolledDate" value={form.enrolledDate} onChange={handleChange} placeholder="Enroll Date" />
        <div className="flex justify-end gap-2 mt-4">
          <button onClick={closeModal} className="bg-gray-300 px-3 py-1">Cancel</button>
          <button type="submit" className="bg-blue-500 text-white px-3 py-1">Update</button>
        </div>
      </div>
      </form>
    </div>
  );
};

export default StudentEditModal;
