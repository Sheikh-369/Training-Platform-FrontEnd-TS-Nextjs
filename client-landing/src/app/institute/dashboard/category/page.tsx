"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchCategory } from "@/lib/store/owner/category/category-slice";
import { ICategoryData } from "@/lib/store/owner/category/category-slice-type";

import AddCategoryModal from "./add-category-modal";
import EditCategoryModal from "./edit-category-modal";
import DeleteCategoryModal from "./delete-category-modal";

function InstituteCategory() {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const instituteNumber = searchParams.get("instituteNumber");

  const { category } = useAppSelector((store) => store.category);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ICategoryData | null>(null);

  const [searchedText, setSearchedText] = useState("");

  useEffect(() => {
    if (instituteNumber) {
      dispatch(fetchCategory(instituteNumber));
    }
  }, [dispatch, instituteNumber]);

  const handleOpenEditModal = (category: ICategoryData) => {
    setSelectedCategory(category);
    setIsEditModalOpen(true);
  };

  const handleOpenDeleteModal = (category: ICategoryData) => {
    setSelectedCategory(category);
    setIsDeleteModalOpen(true);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedText(e.target.value);
  };

  const filteredCategories = category.filter((c) => {
    const search = searchedText.toLowerCase();
    return (
      c.categoryName.toLowerCase().includes(search) ||
      c.categoryDescription.toLowerCase().includes(search) ||
      (c.id?.toString() ?? "").includes(search)
    );
  });

  return (
    <>
      {/* Modals */}
      {isAddModalOpen && instituteNumber && (
        <AddCategoryModal closeModal={() => setIsAddModalOpen(false)} instituteNumber={instituteNumber} />
      )}

      {isEditModalOpen && selectedCategory && instituteNumber && (
        <EditCategoryModal
          category={selectedCategory}
          closeModal={() => {
            setIsEditModalOpen(false);
            setSelectedCategory(null);
          }}
          instituteNumber={instituteNumber}
        />
      )}

      {isDeleteModalOpen && selectedCategory && instituteNumber && (
        <DeleteCategoryModal
          category={selectedCategory}
          closeModal={() => {
            setIsDeleteModalOpen(false);
            setSelectedCategory(null);
          }}
          instituteNumber={instituteNumber}
        />
      )}

      {/* Table & Search */}
      <div className="flex flex-col gap-4">
        {/* Search + Add Button */}
        <div className="flex justify-between items-center">
          <div className="relative w-80">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="none">
                <path
                  d="M17.5 17.5L15.4167 15.4167M15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333C11.0005 15.8333 12.6614 15.0929 13.8667 13.8947C15.0814 12.6872 15.8333 11.0147 15.8333 9.16667Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <input
              type="text"
              value={searchedText}
              onChange={handleSearchChange}
              placeholder="Search for category"
              className="block w-full h-11 pl-10 pr-4 py-2 text-sm rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-5 py-2.5 rounded-full transition"
          >
            + Category
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white shadow rounded-xl">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-6 py-4 font-semibold">Name</th>
                <th className="px-6 py-4 font-semibold">Description</th>
                <th className="px-6 py-4 font-semibold">Created At</th>
                <th className="px-6 py-4 font-semibold rounded-tr-xl">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCategories.length > 0 ? (
                filteredCategories.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-gray-900">{c.categoryName}</td>
                    <td className="px-6 py-4 text-gray-900">{c.categoryDescription}</td>
                    <td className="px-6 py-4 text-gray-900">
                      {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleOpenEditModal(c)}
                          title="Edit"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleOpenDeleteModal(c)}
                          title="Delete"
                          className="text-red-600 hover:text-red-800"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-6 text-center text-gray-500">
                    No categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default InstituteCategory;
