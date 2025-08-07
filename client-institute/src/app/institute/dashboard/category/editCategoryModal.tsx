import React, { useState } from "react";
import { IStudentDataModal } from "@/lib/store/institute/student/studentSliceTypes";
import { useAppDispatch } from "@/lib/store/hooks";
import { updateStudent } from "@/lib/store/institute/student/studentSlice";
import { ICategoryData, ICategoryDataModal } from "@/lib/store/institute/category/categorySliceTypes";
import { updateCategory } from "@/lib/store/institute/category/categorySlice";

interface Props {
  category: ICategoryData;
  closeModal: () => void;
}

const CategoryEditModal: React.FC<Props> = ({ category, closeModal }) => {
  const dispatch = useAppDispatch();

  const [categoryForm, setCategoryForm] = useState<ICategoryDataModal>({
    categoryName: category.categoryName,
    categoryDescription:category.categoryDescription
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCategoryForm({
      ...categoryForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    dispatch(updateCategory(category.id, categoryForm));
    closeModal();
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
      <div className="modal-content p-4 bg-white shadow-lg rounded">
        <h2 className="text-xl font-bold mb-4">Edit Student</h2>
        <input name="categoryName" value={categoryForm.categoryName} onChange={handleChange} placeholder="Name" />
        <textarea name="categoryDescription" value={categoryForm.categoryDescription} onChange={handleChange} placeholder="Phone" />
        <div className="flex justify-end gap-2 mt-4">
          <button onClick={closeModal} className="bg-gray-300 px-3 py-1">Cancel</button>
          <button type="submit" className="bg-blue-500 text-white px-3 py-1">Update</button>
        </div>
      </div>
      </form>
    </div>
  );
};

export default CategoryEditModal;
