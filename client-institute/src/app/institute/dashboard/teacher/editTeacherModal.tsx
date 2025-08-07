import React, { useState, ChangeEvent, FormEvent } from "react";
import { useAppDispatch } from "@/lib/store/hooks";
import {
  ITeacherData,
  ITeacherDataModal,
} from "@/lib/store/institute/teacher/teacherSliceTypes";
import { updateTeacher } from "@/lib/store/institute/teacher/teacherSlice";

interface Props {
  teacher: ITeacherData;
  closeModal: () => void;
}

const TeacherEditModal: React.FC<Props> = ({ teacher, closeModal }) => {
  const dispatch = useAppDispatch();

  const [teacherForm, setTeacherForm] = useState<ITeacherDataModal>({
    teacherName: teacher.teacherName,
    teacherEmail: teacher.teacherEmail,
    teacherPhoneNumber: teacher.teacherPhoneNumber,
    teacherExpertise: teacher.teacherExpertise,
    teacherJoinDate: teacher.teacherJoinDate,
    teacherSalary: teacher.teacherSalary,
    teacherImage: teacher.teacherImage, // could be string or null initially
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (
      name === "teacherImage" &&
      e.target instanceof HTMLInputElement &&
      e.target.files
    ) {
      setTeacherForm({
        ...teacherForm,
        teacherImage: e.target.files[0], // File upload
      });
    } else {
      setTeacherForm({
        ...teacherForm,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in teacherForm) {
      const value = (teacherForm as any)[key];
      if (value !== null) {
        formData.append(key, value);
      }
    }

    dispatch(updateTeacher(teacher.id, formData as unknown as ITeacherDataModal));
    closeModal();
  };

  return (
    <div className="modal fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" />
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-lg bg-white p-6 rounded shadow-lg z-10"
      >
        <h2 className="text-xl font-bold mb-4">Edit Teacher</h2>

        <input
          name="teacherName"
          value={teacherForm.teacherName}
          onChange={handleChange}
          placeholder="Name"
          className="block w-full mb-2 p-2 border rounded"
          required
        />

        <input
          name="teacherEmail"
          value={teacherForm.teacherEmail}
          onChange={handleChange}
          placeholder="Email"
          type="email"
          className="block w-full mb-2 p-2 border rounded"
          required
        />

        <input
          name="teacherPhoneNumber"
          value={teacherForm.teacherPhoneNumber}
          onChange={handleChange}
          placeholder="Phone"
          className="block w-full mb-2 p-2 border rounded"
          required
        />

        <input
          name="teacherExpertise"
          value={teacherForm.teacherExpertise}
          onChange={handleChange}
          placeholder="Expertise"
          className="block w-full mb-2 p-2 border rounded"
          required
        />

        <input
          name="teacherJoinDate"
          value={teacherForm.teacherJoinDate}
          onChange={handleChange}
          type="date"
          className="block w-full mb-2 p-2 border rounded"
          required
        />

        <input
          name="teacherSalary"
          value={teacherForm.teacherSalary}
          onChange={handleChange}
          placeholder="Salary"
          className="block w-full mb-2 p-2 border rounded"
          required
        />

        {/* Optional File Upload */}
        <div className="mb-2">
          <label className="block text-sm font-medium mb-1">Teacher Image</label>
          <input
            name="teacherImage"
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="block w-full p-2 border rounded"
          />
          {typeof teacherForm.teacherImage === "string" && teacherForm.teacherImage && (
            <img
              src={teacherForm.teacherImage as string}
              alt="Current"
              className="w-20 h-20 mt-2 object-cover rounded"
            />
          )}
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={closeModal}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default TeacherEditModal;
