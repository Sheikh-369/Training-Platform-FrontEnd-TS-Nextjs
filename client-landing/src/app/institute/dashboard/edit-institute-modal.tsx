// 'use client';

// import React, { useState, ChangeEvent, FormEvent } from 'react';
// import { IOwnerData } from '@/lib/store/owner/owner-slice-type';
// import { useAppDispatch } from '@/lib/store/hooks';
// import { editInstituteInfo } from '@/lib/store/owner/owner-slice';

// interface EditInstituteModalProps {
//   owner: IOwnerData;
//   closeModal: () => void;
// }

// const EditInstituteModal: React.FC<EditInstituteModalProps> = ({ owner, closeModal }) => {
//   const dispatch = useAppDispatch();

//   const [formData, setFormData] = useState<Omit<IOwnerData, 'id' | 'createdAt'>>({
//     instituteName: owner.instituteName,
//     instituteEmail: owner.instituteEmail,
//     institutePhoneNumber: owner.institutePhoneNumber,
//     instituteAddress: owner.instituteAddress,
//     instituteVatNumber: owner.instituteVatNumber || '',
//     institutePanNumber: owner.institutePanNumber || '',
//     instituteNumber: owner.instituteNumber,
//     instituteImage: owner.instituteImage,
//   });

//   const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value, files } = e.target as HTMLInputElement;

//     if (name === 'instituteImage' && files && files.length > 0) {
//       setFormData((prev) => ({
//         ...prev,
//         instituteImage: files[0], // handle file upload
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();

//     const body = new FormData();

//     // Append all keys from formData to FormData object
//     for (const key in formData) {
//       const value = formData[key as keyof typeof formData];
//       if (value !== null && value !== undefined) {
//         // If the value is an object (like File), append it as is, else convert to string
//         if (value instanceof File) {
//           body.append(key, value);
//         } else {
//           body.append(key, value.toString());
//         }
//       }
//     }

//     dispatch(editInstituteInfo(body));
//     closeModal();
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
//       <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
//         <h2 className="text-xl font-semibold mb-4 text-center">Edit Institute Info</h2>

//         <form onSubmit={handleSubmit} className="space-y-3">
//           <input
//             type="text"
//             name="instituteName"
//             value={formData.instituteName}
//             onChange={handleChange}
//             placeholder="Institute Name"
//             className="w-full border p-2 rounded"
//             required
//           />

//           <input
//             type="email"
//             name="instituteEmail"
//             value={formData.instituteEmail}
//             onChange={handleChange}
//             placeholder="Email"
//             className="w-full border p-2 rounded"
//             required
//           />

//           <input
//             type="text"
//             name="institutePhoneNumber"
//             value={formData.institutePhoneNumber}
//             onChange={handleChange}
//             placeholder="Phone Number"
//             className="w-full border p-2 rounded"
//             required
//           />

//           <textarea
//             name="instituteAddress"
//             value={formData.instituteAddress}
//             onChange={handleChange}
//             placeholder="Address"
//             className="w-full border p-2 rounded"
//             rows={3}
//             required
//           />

//           <input
//             type="text"
//             name="institutePanNumber"
//             value={formData.institutePanNumber || ''}
//             onChange={handleChange}
//             placeholder="PAN Number (Optional)"
//             className="w-full border p-2 rounded"
//           />

//           <input
//             type="text"
//             name="instituteVatNumber"
//             value={formData.instituteVatNumber || ''}
//             onChange={handleChange}
//             placeholder="VAT Number (Optional)"
//             className="w-full border p-2 rounded"
//           />

//           {/* Image preview */}
//           {typeof formData.instituteImage === 'string' && formData.instituteImage && (
//             <img
//               src={formData.instituteImage}
//               alt="Current institute"
//               className="w-20 h-20 object-cover rounded mb-2"
//             />
//           )}

//           {/* Image Upload */}
//           <input
//             type="file"
//             name="instituteImage"
//             accept="image/*"
//             onChange={handleChange}
//             className="w-full"
//           />

//           <div className="flex justify-end gap-3 mt-4">
//             <button
//               onClick={closeModal}
//               type="button"
//               className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//             >
//               Update
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditInstituteModal;
