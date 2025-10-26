// // 'use client';
// // import { useEffect } from "react";
// // import { useParams } from "next/navigation";
// // import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
// // import { fetchCourseById } from "@/lib/store/institute-course/institute-course-slice";
// // import { Status } from "@/lib/global-types/type";

// // const CourseDetailPage = () => {
// //   const { instituteId, id } = useParams() as { instituteId?: string; id?: string };
// //   const dispatch = useAppDispatch();
// //   const { selectedCourse, status } = useAppSelector((state) => state.course);

// //   useEffect(() => {
// //     if (instituteId && id && !isNaN(Number(instituteId)) && !isNaN(Number(id))) {
// //       dispatch(fetchCourseById(Number(instituteId), Number(id)));
// //     } else {
// //       console.error("Invalid params:", { instituteId, id });
// //     }
// //   }, [dispatch, instituteId, id]);

// //   if (status === Status.LOADING) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center text-gray-500 text-xl">
// //         Loading course details...
// //       </div>
// //     );
// //   }

// //   if (status === Status.ERROR) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center text-red-500 text-xl">
// //         Error loading course details.
// //       </div>
// //     );
// //   }

// //   if (!selectedCourse) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center text-gray-400 text-xl">
// //         No course details found.
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
// //       <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
// //         {selectedCourse.courseThumbnail ? (
// //           <img
// //             src={selectedCourse.courseThumbnail}
// //             alt={selectedCourse.courseName}
// //             className="w-full h-64 object-cover"
// //           />
// //         ) : (
// //           <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500 text-lg">
// //             No Thumbnail Available
// //           </div>
// //         )}

// //         <div className="p-8">
// //           <h1 className="text-4xl font-bold text-gray-900 mb-4">{selectedCourse.courseName}</h1>
// //           <p className="text-gray-700 text-base leading-relaxed mb-6">
// //             {selectedCourse.courseDescription || "No course description provided."}
// //           </p>

// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //             <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
// //               <h3 className="text-sm text-gray-500 uppercase mb-1">Category</h3>
// //               <p className="text-lg font-medium text-gray-800">{selectedCourse.categoryName}</p>
// //             </div>

// //             <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
// //               <h3 className="text-sm text-gray-500 uppercase mb-1">Duration</h3>
// //               <p className="text-lg font-medium text-gray-800">{selectedCourse.courseDuration}</p>
// //             </div>

// //             <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
// //               <h3 className="text-sm text-gray-500 uppercase mb-1">Price</h3>
// //               <p className="text-lg font-medium text-gray-800">Rs. {selectedCourse.coursePrice}</p>
// //             </div>

// //             {/* <div className="bg-gray-50 p-4 rounded-md border border-gray-200"> */}
// //               {/* <h3 className="text-sm text-gray-500 uppercase mb-1">Teacher</h3> */}
// //               {/* <p className="text-lg font-medium text-gray-800">{selectedCourse.teacherName || "Not Assigned"}</p> */}
// //             {/* </div> */}

// //             <div className="bg-gray-50 p-4 rounded-md border border-gray-200 col-span-full">
// //               <h3 className="text-sm text-gray-500 uppercase mb-1">Institute</h3>
// //               <p className="text-lg font-medium text-gray-800">{selectedCourse.instituteName}</p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CourseDetailPage;

//2nd
// 'use client';
// import { useEffect, useState, FormEvent } from "react";
// import { useParams } from "next/navigation";
// import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
// import { fetchCourseById } from "@/lib/store/institute-course/institute-course-slice";
// import { Status } from "@/lib/global-types/type";
// import { IOrderData } from "@/lib/store/student/order/order-slice-type";
// import { placeStudentOrder } from "@/lib/store/student/order/order-slice";

// const CourseDetailPage = () => {
//   const { instituteId, id } = useParams() as { instituteId?: string; id?: string };
//   const dispatch = useAppDispatch();
//   const { selectedCourse, status: courseStatus } = useAppSelector((state) => state.course);
//   const { status: orderStatus, orderResponse } = useAppSelector((state) => state.studentOrder);

//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState<IOrderData>({
//     studentName: "",
//     studentEmail: "",
//     studentPhoneNo: "",
//     studentAddress: "",
//     paymentMethod: "esewa",
//     totalAmount: 0,
//     remarks: "",
//     courseId: Number(id)
//   });

//   // Fetch course
//   useEffect(() => {
//     if (instituteId && id && !isNaN(Number(instituteId)) && !isNaN(Number(id))) {
//       dispatch(fetchCourseById(Number(instituteId), Number(id)));
//     }
//   }, [dispatch, instituteId, id]);

//   // Update total amount when course is loaded
//   useEffect(() => {
//     if (selectedCourse) {
//       setFormData((prev) => ({ ...prev, totalAmount: Number(selectedCourse.coursePrice) || 0 }));
//     }
//   }, [selectedCourse]);

//   // Redirect if payment gateway returns URL
//   useEffect(() => {
//     if (orderResponse?.redirectUrl) {
//       window.location.href = orderResponse.redirectUrl;
//     }
//     if (orderResponse?.data?.payment_url) {
//       window.location.href = orderResponse.data.payment_url;
//     }
//   }, [orderResponse]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e: FormEvent) => {
//     e.preventDefault();
//     if (!instituteId || !id) return;

//     dispatch(placeStudentOrder(instituteId, formData, Number(id)));
//   };

//   if (courseStatus === Status.LOADING) {
//     return <div className="min-h-screen flex items-center justify-center text-gray-500 text-xl">Loading course details...</div>;
//   }

//   if (courseStatus === Status.ERROR) {
//     return <div className="min-h-screen flex items-center justify-center text-red-500 text-xl">Error loading course details.</div>;
//   }

//   if (!selectedCourse) {
//     return <div className="min-h-screen flex items-center justify-center text-gray-400 text-xl">No course details found.</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
//         {selectedCourse.courseThumbnail ? (
//           <img
//             src={selectedCourse.courseThumbnail}
//             alt={selectedCourse.courseName}
//             className="w-full h-64 object-cover"
//           />
//         ) : (
//           <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500 text-lg">
//             No Thumbnail Available
//           </div>
//         )}

//         <div className="p-8">
//           <h1 className="text-4xl font-bold text-gray-900 mb-4">{selectedCourse.courseName}</h1>
//           <p className="text-gray-700 text-base leading-relaxed mb-6">
//             {selectedCourse.courseDescription || "No course description provided."}
//           </p>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
//               <h3 className="text-sm text-gray-500 uppercase mb-1">Category</h3>
//               <p className="text-lg font-medium text-gray-800">{selectedCourse.categoryName}</p>
//             </div>

//             <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
//               <h3 className="text-sm text-gray-500 uppercase mb-1">Duration</h3>
//               <p className="text-lg font-medium text-gray-800">{selectedCourse.courseDuration}</p>
//             </div>

//             <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
//               <h3 className="text-sm text-gray-500 uppercase mb-1">Price</h3>
//               <p className="text-lg font-medium text-gray-800">Rs. {selectedCourse.coursePrice}</p>
//             </div>

//             <div className="bg-gray-50 p-4 rounded-md border border-gray-200 col-span-full">
//               <h3 className="text-sm text-gray-500 uppercase mb-1">Institute</h3>
//               <p className="text-lg font-medium text-gray-800">{selectedCourse.instituteName}</p>
//             </div>
//           </div>

//           <button
//             onClick={() => setShowForm(true)}
//             className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//           >
//             Enroll Now
//           </button>

//           {/* ENROLL FORM MODAL */}
//           {showForm && (
//             <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//               <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
//                 <h2 className="text-2xl font-semibold mb-4">Enroll in {selectedCourse.courseName}</h2>

//                 <form onSubmit={handleSubmit} className="space-y-4">
//                   <input type="text" name="studentName" value={formData.studentName} onChange={handleChange} placeholder="Full Name" required className="w-full border px-3 py-2 rounded" />
//                   <input type="email" name="studentEmail" value={formData.studentEmail} onChange={handleChange} placeholder="Email" required className="w-full border px-3 py-2 rounded" />
//                   <input type="text" name="studentPhoneNo" value={formData.studentPhoneNo} onChange={handleChange} placeholder="Phone Number" required className="w-full border px-3 py-2 rounded" />
//                   <input type="text" name="studentAddress" value={formData.studentAddress} onChange={handleChange} placeholder="Address" required className="w-full border px-3 py-2 rounded" />
//                   <textarea name="remarks" value={formData.remarks} onChange={handleChange} placeholder="Remarks (optional)" className="w-full border px-3 py-2 rounded" />

//                   <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} className="w-full border px-3 py-2 rounded">
//                     <option value="esewa">eSewa</option>
//                     <option value="khalti">Khalti</option>
//                     <option value="qr">QR</option>
//                   </select>

//                   <div className="flex justify-between items-center mt-4">
//                     <button
//                       type="button"
//                       onClick={() => setShowForm(false)}
//                       className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       type="submit"
//                       disabled={orderStatus === Status.LOADING}
//                       className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//                     >
//                       {orderStatus === Status.LOADING ? "Processing..." : "Confirm Enroll"}
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseDetailPage;


//3rd
// 'use client';
// import { useEffect, useState, FormEvent } from "react";
// import { useParams } from "next/navigation";
// import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
// import { fetchCourseById } from "@/lib/store/institute-course/institute-course-slice";
// import { Status } from "@/lib/global-types/type";
// import { IOrderData } from "@/lib/store/student/order/order-slice-type";
// import { placeStudentOrder } from "@/lib/store/student/order/order-slice";

// const CourseDetailPage = () => {
//   const { instituteId, id } = useParams() as { instituteId?: string; id?: string };
//   const dispatch = useAppDispatch();
//   const { selectedCourse, status: courseStatus } = useAppSelector((state) => state.course);
//   const { status: orderStatus, orderResponse } = useAppSelector((state) => state.studentOrder);

//   const [formData, setFormData] = useState<IOrderData>({
//     studentName: "",
//     studentEmail: "",
//     studentPhoneNo: "",
//     studentAddress: "",
//     paymentMethod: "esewa",
//     totalAmount: 0,
//     remarks: "",
//     courseId: Number(id)
//   });

//   // Fetch course
//   useEffect(() => {
//     if (instituteId && id && !isNaN(Number(instituteId)) && !isNaN(Number(id))) {
//       dispatch(fetchCourseById(Number(instituteId), Number(id)));
//     }
//   }, [dispatch, instituteId, id]);

//   // Update total amount when course is loaded
//   useEffect(() => {
//     if (selectedCourse) {
//       setFormData((prev) => ({ ...prev, totalAmount: Number(selectedCourse.coursePrice) || 0 }));
//     }
//   }, [selectedCourse]);

//   // Redirect if payment gateway returns URL
//   useEffect(() => {
//     if (orderResponse?.redirectUrl) {
//       window.location.href = orderResponse.redirectUrl;
//     }
//     if (orderResponse?.data?.payment_url) {
//       window.location.href = orderResponse.data.payment_url;
//     }
//   }, [orderResponse]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e: FormEvent) => {
//     e.preventDefault();
//     if (!instituteId || !id) return;

//     dispatch(placeStudentOrder(instituteId, formData, Number(id)));
//   };

//   if (courseStatus === Status.LOADING) {
//     return <div className="min-h-screen flex items-center justify-center text-gray-500 text-xl">Loading course details...</div>;
//   }

//   if (courseStatus === Status.ERROR) {
//     return <div className="min-h-screen flex items-center justify-center text-red-500 text-xl">Error loading course details.</div>;
//   }

//   if (!selectedCourse) {
//     return <div className="min-h-screen flex items-center justify-center text-gray-400 text-xl">No course details found.</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
//         {selectedCourse.courseThumbnail ? (
//           <img
//             src={selectedCourse.courseThumbnail}
//             alt={selectedCourse.courseName}
//             className="w-full h-64 object-cover"
//           />
//         ) : (
//           <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500 text-lg">
//             No Thumbnail Available
//           </div>
//         )}

//         <div className="p-8">
//           <h1 className="text-4xl font-bold text-gray-900 mb-4">{selectedCourse.courseName}</h1>
//           <p className="text-gray-700 text-base leading-relaxed mb-6">
//             {selectedCourse.courseDescription || "No course description provided."}
//           </p>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
//               <h3 className="text-sm text-gray-500 uppercase mb-1">Category</h3>
//               <p className="text-lg font-medium text-gray-800">{selectedCourse.categoryName}</p>
//             </div>

//             <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
//               <h3 className="text-sm text-gray-500 uppercase mb-1">Duration</h3>
//               <p className="text-lg font-medium text-gray-800">{selectedCourse.courseDuration}</p>
//             </div>

//             <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
//               <h3 className="text-sm text-gray-500 uppercase mb-1">Price</h3>
//               <p className="text-lg font-medium text-gray-800">Rs. {selectedCourse.coursePrice}</p>
//             </div>

//             <div className="bg-gray-50 p-4 rounded-md border border-gray-200 col-span-full">
//               <h3 className="text-sm text-gray-500 uppercase mb-1">Institute</h3>
//               <p className="text-lg font-medium text-gray-800">{selectedCourse.instituteName}</p>
//             </div>
//           </div>

//           {/* Inline Enroll Form */}
//           <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow-md">
//             <h2 className="text-2xl font-semibold mb-4">Enroll in {selectedCourse.courseName}</h2>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               <input
//                 type="text"
//                 name="studentName"
//                 value={formData.studentName}
//                 onChange={handleChange}
//                 placeholder="Full Name"
//                 required
//                 className="w-full border px-3 py-2 rounded"
//               />
//               <input
//                 type="email"
//                 name="studentEmail"
//                 value={formData.studentEmail}
//                 onChange={handleChange}
//                 placeholder="Email"
//                 required
//                 className="w-full border px-3 py-2 rounded"
//               />
//               <input
//                 type="text"
//                 name="studentPhoneNo"
//                 value={formData.studentPhoneNo}
//                 onChange={handleChange}
//                 placeholder="Phone Number"
//                 required
//                 className="w-full border px-3 py-2 rounded"
//               />
//               <input
//                 type="text"
//                 name="studentAddress"
//                 value={formData.studentAddress}
//                 onChange={handleChange}
//                 placeholder="Address"
//                 required
//                 className="w-full border px-3 py-2 rounded"
//               />
//               <textarea
//                 name="remarks"
//                 value={formData.remarks}
//                 onChange={handleChange}
//                 placeholder="Remarks (optional)"
//                 className="w-full border px-3 py-2 rounded"
//               />

//               {/* PAYMENT OPTIONS */}
//               <div className="mt-4">
//                 <h3 className="text-sm text-gray-500 uppercase mb-2">Payment Method</h3>
//                 <div className="flex gap-4">
//                   {["esewa", "khalti", "qr"].map((method) => (
//                     <label
//                       key={method}
//                       className={`flex-1 cursor-pointer border rounded-lg p-2 flex flex-col items-center justify-center
//                         ${formData.paymentMethod === method ? "border-blue-600 shadow-md" : "border-gray-200"}`}
//                     >
//                       <input
//                         type="radio"
//                         name="paymentMethod"
//                         value={method}
//                         checked={formData.paymentMethod === method}
//                         onChange={handleChange}
//                         className="hidden"
//                       />
//                       <img
//                         src={`/payment-icons/${method}.png`}
//                         alt={method}
//                         className="h-12 mb-2"
//                       />
//                       <span className="capitalize text-gray-700">{method}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>

//               <button
//                 type="submit"
//                 disabled={orderStatus === Status.LOADING}
//                 className="mt-4 w-full px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//               >
//                 {orderStatus === Status.LOADING ? "Processing..." : "Confirm Enroll"}
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseDetailPage;


//4th
// 'use client';
// import { useEffect, useState, FormEvent } from "react";
// import { useParams } from "next/navigation";
// import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
// import { fetchCourseById } from "@/lib/store/institute-course/institute-course-slice";
// import { Status } from "@/lib/global-types/type";
// import { IOrderData } from "@/lib/store/student/order/order-slice-type";
// import { placeStudentOrder } from "@/lib/store/student/order/order-slice";

// const CourseDetailPage = () => {
//   const { instituteId, id } = useParams() as { instituteId?: string; id?: string };
//   const dispatch = useAppDispatch();
//   const { selectedCourse, status: courseStatus } = useAppSelector((state) => state.course);
//   const { status: orderStatus, orderResponse } = useAppSelector((state) => state.studentOrder);

//   const [formData, setFormData] = useState<IOrderData>({
//     studentName: "",
//     studentEmail: "",
//     studentPhoneNo: "",
//     studentAddress: "",
//     paymentMethod: "esewa",
//     totalAmount: 0,
//     remarks: "",
//     courseId: Number(id)
//   });

//   useEffect(() => {
//     if (instituteId && id && !isNaN(Number(instituteId)) && !isNaN(Number(id))) {
//       dispatch(fetchCourseById(Number(instituteId), Number(id)));
//     }
//   }, [dispatch, instituteId, id]);

//   useEffect(() => {
//     if (selectedCourse) {
//       setFormData((prev) => ({ ...prev, totalAmount: Number(selectedCourse.coursePrice) || 0 }));
//     }
//   }, [selectedCourse]);

//   useEffect(() => {
//     if (orderResponse?.redirectUrl) window.location.href = orderResponse.redirectUrl;
//     if (orderResponse?.data?.payment_url) window.location.href = orderResponse.data.payment_url;
//   }, [orderResponse]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handlePaymentSelect = (method: "esewa" | "khalti" | "qr") => {
//     setFormData({ ...formData, paymentMethod: method });
//   };

//   const handleSubmit = (e: FormEvent) => {
//     e.preventDefault();
//     if (!instituteId || !id) return;
//     dispatch(placeStudentOrder(instituteId, formData, Number(id)));
//   };

//   if (courseStatus === Status.LOADING)
//     return <div className="min-h-screen flex items-center justify-center text-gray-500 text-xl">Loading course details...</div>;
//   if (courseStatus === Status.ERROR)
//     return <div className="min-h-screen flex items-center justify-center text-red-500 text-xl">Error loading course details.</div>;
//   if (!selectedCourse)
//     return <div className="min-h-screen flex items-center justify-center text-gray-400 text-xl">No course details found.</div>;

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-slate-50 via-gray-100 to-slate-200 py-10 px-4 sm:px-6 lg:px-12">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
//         {/* LEFT: COURSE DETAILS */}
//         <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg overflow-hidden">
//           <div className="relative">
//             {selectedCourse.courseThumbnail ? (
//               <img
//                 src={selectedCourse.courseThumbnail}
//                 alt={selectedCourse.courseName}
//                 className="w-full h-72 object-cover"
//               />
//             ) : (
//               <div className="w-full h-72 bg-gray-200 flex items-center justify-center text-gray-500 text-lg">
//                 No Thumbnail Available
//               </div>
//             )}
//             <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-6">
//               <h1 className="text-3xl font-semibold text-white drop-shadow-md">{selectedCourse.courseName}</h1>
//             </div>
//           </div>

//           <div className="p-8">
//             <p className="text-gray-700 leading-relaxed mb-6">
//               {selectedCourse.courseDescription || "No course description provided."}
//             </p>

//             <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
//               <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-center shadow-sm">
//                 <p className="text-sm text-gray-500">Category</p>
//                 <h3 className="font-semibold text-gray-800 mt-1">{selectedCourse.categoryName}</h3>
//               </div>
//               <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-center shadow-sm">
//                 <p className="text-sm text-gray-500">Duration</p>
//                 <h3 className="font-semibold text-gray-800 mt-1">{selectedCourse.courseDuration}</h3>
//               </div>
//               <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-center shadow-sm">
//                 <p className="text-sm text-gray-500">Price</p>
//                 <h3 className="font-semibold text-blue-700 mt-1">Rs. {selectedCourse.coursePrice}</h3>
//               </div>
//             </div>

//             <div className="mt-8">
//               <h4 className="text-sm text-gray-500 uppercase mb-2">Institute</h4>
//               <p className="text-lg font-medium text-gray-800">{selectedCourse.instituteName}</p>
//             </div>
//           </div>
//         </div>

//         {/* RIGHT: ENROLLMENT FORM */}
//         <div className="bg-white rounded-2xl shadow-xl p-8 h-fit sticky top-8 border border-gray-100">
//           <h2 className="text-2xl font-semibold text-gray-800 mb-6">Enroll in this course</h2>

//           <form onSubmit={handleSubmit} className="space-y-5">
//             <input
//               type="text"
//               name="studentName"
//               value={formData.studentName}
//               onChange={handleChange}
//               placeholder="Full Name"
//               required
//               className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 px-4 py-3 rounded-lg outline-none"
//             />
//             <input
//               type="email"
//               name="studentEmail"
//               value={formData.studentEmail}
//               onChange={handleChange}
//               placeholder="Email Address"
//               required
//               className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 px-4 py-3 rounded-lg outline-none"
//             />
//             <input
//               type="text"
//               name="studentPhoneNo"
//               value={formData.studentPhoneNo}
//               onChange={handleChange}
//               placeholder="Phone Number"
//               required
//               className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 px-4 py-3 rounded-lg outline-none"
//             />
//             <input
//               type="text"
//               name="studentAddress"
//               value={formData.studentAddress}
//               onChange={handleChange}
//               placeholder="Full Address"
//               required
//               className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 px-4 py-3 rounded-lg outline-none"
//             />
//             <textarea
//               name="remarks"
//               value={formData.remarks}
//               onChange={handleChange}
//               placeholder="Remarks (optional)"
//               className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 px-4 py-3 rounded-lg outline-none"
//             />

//             {/* Payment Section */}
//             <div className="mt-6">
//               <h3 className="text-sm font-semibold text-gray-600 uppercase mb-3">Select Payment Method</h3>
//               <div className="flex gap-4">
//                 {(["esewa", "khalti", "qr"] as const).map((method) => (
//                   <div
//                     key={method}
//                     onClick={() => handlePaymentSelect(method)}
//                     className={`flex-1 cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center justify-center transition-all duration-300
//                       ${
//                         formData.paymentMethod === method
//                           ? "border-blue-600 bg-blue-50 shadow-md scale-105"
//                           : "border-gray-200 hover:border-blue-400 hover:bg-blue-50"
//                       }`}
//                   >
//                     <img src={`/payment-icons/${method}.png`} alt={method} className="h-10 mb-2 object-contain" />
//                     <span
//                       className={`capitalize text-sm font-medium ${
//                         formData.paymentMethod === method ? "text-blue-700" : "text-gray-600"
//                       }`}
//                     >
//                       {method}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <button
//               type="submit"
//               disabled={orderStatus === Status.LOADING}
//               className="mt-8 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all shadow-md disabled:opacity-70"
//             >
//               {orderStatus === Status.LOADING ? "Processing..." : "Confirm Enrollment"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseDetailPage;


//5th
'use client';
import { useEffect, useState, FormEvent } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchCourseById } from "@/lib/store/institute-course/institute-course-slice";
import { Status } from "@/lib/global-types/type";
import { IOrderData } from "@/lib/store/student/order/order-slice-type";
import { placeStudentOrder } from "@/lib/store/student/order/order-slice";

const CourseDetailPage = () => {
  const { instituteId, id } = useParams() as { instituteId?: string; id?: string };
  const dispatch = useAppDispatch();
  const { selectedCourse, status: courseStatus } = useAppSelector((state) => state.course);
  const { status: orderStatus, orderResponse } = useAppSelector((state) => state.studentOrder);

  const [formData, setFormData] = useState<IOrderData>({
    studentName: "",
    studentEmail: "",
    studentPhoneNo: "",
    studentAddress: "",
    paymentMethod: "esewa",
    totalAmount: 0,
    remarks: "",
    courseId: Number(id)
  });

  useEffect(() => {
    if (instituteId && id && !isNaN(Number(instituteId)) && !isNaN(Number(id))) {
      dispatch(fetchCourseById(Number(instituteId), Number(id)));
    }
  }, [dispatch, instituteId, id]);

  useEffect(() => {
    if (selectedCourse) {
      setFormData((prev) => ({ ...prev, totalAmount: Number(selectedCourse.coursePrice) || 0 }));
    }
  }, [selectedCourse]);

  useEffect(() => {
    if (orderResponse?.redirectUrl) window.location.href = orderResponse.redirectUrl;
    if (orderResponse?.data?.payment_url) window.location.href = orderResponse.data.payment_url;
  }, [orderResponse]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePaymentSelect = (method: "esewa" | "khalti" | "qr") => {
    setFormData({ ...formData, paymentMethod: method });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!instituteId || !id) return;
    dispatch(placeStudentOrder(instituteId, formData, Number(id)));
  };

  if (courseStatus === Status.LOADING)
    return <div className="min-h-screen flex items-center justify-center text-gray-500 text-xl">Loading course details...</div>;
  if (courseStatus === Status.ERROR)
    return <div className="min-h-screen flex items-center justify-center text-red-500 text-xl">Error loading course details.</div>;
  if (!selectedCourse)
    return <div className="min-h-screen flex items-center justify-center text-gray-400 text-xl">No course details found.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-gray-100 to-slate-200 py-10 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* LEFT: COURSE DETAILS */}
        <div className="lg:col-span-2 bg-blue-300 rounded-2xl shadow-lg overflow-hidden">

          {/* Institute Name */}
          <div className="bg-blue-600 text-white p-4 text-center text-2xl font-bold">
            {selectedCourse.instituteName}
          </div>

          {/* Course Thumbnail */}
          <div className="relative">
            {selectedCourse.courseThumbnail ? (
              <img
                src={selectedCourse.courseThumbnail}
                alt={selectedCourse.courseName}
                className="w-full h-72 object-cover"
              />
            ) : (
              <div className="w-full h-72 bg-gray-200 flex items-center justify-center text-gray-500 text-lg">
                No Thumbnail Available
              </div>
            )}
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-6">
              <h1 className="text-3xl font-semibold text-white drop-shadow-md">{selectedCourse.courseName}</h1>
            </div>
          </div>

          <div className="p-8">
            <p className="text-gray-700 leading-relaxed mb-6">
              {selectedCourse.courseDescription || "No course description provided."}
            </p>

            {/* Category / Duration / Price */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { label: "Category", value: selectedCourse.categoryName },
                { label: "Duration", value: selectedCourse.courseDuration },
                { label: "Fee", value: `Rs. ${selectedCourse.coursePrice}` },
              ].map((item) => (
                <div key={item.label} className="bg-blue-50 border border-blue-200 rounded-xl shadow-md p-6 text-center flex flex-col justify-center hover:scale-105 transition-transform">
                  <p className="text-sm text-blue-600 font-medium">{item.label}</p>
                  <h3 className="text-lg font-bold text-blue-800 mt-2">{item.value}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: ENROLLMENT FORM */}
        <div className="bg-green-100 rounded-2xl shadow-xl p-6 h-fit sticky top-8 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Enroll in this course</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {["studentName", "studentEmail", "studentPhoneNo", "studentAddress"].map((field) => (
              <input
                key={field}
                type={field === "studentEmail" ? "email" : "text"}
                name={field}
                value={formData[field as keyof IOrderData]}
                onChange={handleChange}
                placeholder={
                  field === "studentName" ? "Full Name" :
                  field === "studentEmail" ? "Email Address" :
                  field === "studentPhoneNo" ? "Phone Number" :
                  "Full Address"
                }
                required
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            ))}

            <textarea
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              placeholder="Remarks (optional)"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />

            {/* Payment Section */}
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-gray-600 uppercase mb-2">Select Payment Method</h3>
              <div className="flex gap-3">
                {(["esewa", "khalti", "qr"] as const).map((method) => (
                  <div
                    key={method}
                    onClick={() => handlePaymentSelect(method)}
                    className={`flex-1 cursor-pointer border-2 rounded-lg p-3 flex flex-col items-center justify-center transition-all duration-300
                      ${
                        formData.paymentMethod === method
                          ? "border-black-600 bg-white shadow-md scale-105"
                          : "border-gray-200 hover:border-blue-400 hover:bg-blue-50"
                      }`}
                  >
                    <img src={`/payment-icons/${method}.png`} alt={method} className="h-8 mb-1 object-contain" />
                    <span className={`capitalize text-sm font-medium ${formData.paymentMethod === method ? "text-blue-700" : "text-gray-600"}`}>
                      {method}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <button
              type="submit"
              disabled={orderStatus === Status.LOADING}
              className="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-all disabled:opacity-70"
            >
              {orderStatus === Status.LOADING ? "Processing..." : "Confirm Enrollment"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
