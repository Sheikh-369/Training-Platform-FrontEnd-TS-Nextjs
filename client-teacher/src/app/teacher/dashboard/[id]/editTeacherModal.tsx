'use client'
import { useAppDispatch } from "@/lib/store/hooks";
import { editTeacherData } from "@/lib/store/teacher/teacherSlice";
import { ITeacher } from "@/lib/store/teacher/teacherSliceType";
import { ChangeEvent, useState } from "react";

interface IEditTeacherModalProps {
  teacher: ITeacher;
  closeModal: () => void;
  teacherId: string;
  instituteNumber: string; // ✅ New prop added
}

export const EditTeacherModal = ({
  teacher,
  closeModal,
  teacherId,
  instituteNumber, // ✅ Destructure it
}: IEditTeacherModalProps) => {
  const dispatch = useAppDispatch();

  const [editedTeacher, setEditedTeacher] = useState<ITeacher>({
    teacherName: teacher.teacherName,
    teacherEmail: teacher.teacherEmail,
    teacherPhoneNumber: teacher.teacherPhoneNumber,
    teacherExpertise: teacher.teacherExpertise,
    teacherImage: teacher.teacherImage,
    teacherAddress: teacher.teacherAddress,
    aboutTeacher: teacher.aboutTeacher,
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (
      name === "teacherImage" &&
      e.target instanceof HTMLInputElement &&
      e.target.files
    ) {
      setEditedTeacher({
        ...editedTeacher,
        teacherImage: e.target.files[0], // File upload
      });
    } else {
      setEditedTeacher({
        ...editedTeacher,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Call the updated thunk with all 3 arguments
    dispatch(editTeacherData(teacherId, instituteNumber, editedTeacher));
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">Edit Teacher Information</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              name="teacherName"
              type="text"
              value={editedTeacher.teacherName}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              name="teacherEmail"
              type="email"
              value={editedTeacher.teacherEmail}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              name="teacherPhoneNumber"
              type="text"
              value={editedTeacher.teacherPhoneNumber}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          {/* Expertise */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Expertise</label>
            <input
              name="teacherExpertise"
              type="text"
              value={editedTeacher.teacherExpertise}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          {/* About */}
          <div>
            <label className="block text-sm font-medium text-gray-700">About</label>
            <textarea
              name="aboutTeacher"
              value={editedTeacher.aboutTeacher}
              onChange={handleInputChange}
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              name="teacherAddress"
              type="text"
              value={editedTeacher.teacherAddress}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          {/* Profile Image Upload */}
          <div className="mb-2">
            <label className="block text-sm font-medium mb-1">Teacher Image</label>
            <input
              name="teacherImage"
              type="file"
              accept="image/*"
              onChange={handleInputChange}
              className="block w-full p-2 border rounded"
            />
            {typeof editedTeacher.teacherImage === "string" &&
              editedTeacher.teacherImage && (
                <img
                  src={editedTeacher.teacherImage}
                  alt="Current"
                  className="w-20 h-20 mt-2 object-cover rounded"
                />
              )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={closeModal}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
