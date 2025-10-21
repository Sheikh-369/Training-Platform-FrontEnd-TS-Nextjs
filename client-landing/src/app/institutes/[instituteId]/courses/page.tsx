// "use client";
// import React, { useEffect } from "react";
// import { useParams } from "next/navigation";
// import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
// import {
//   fetchAllCourses,
//   resetInstituteCourse,
// } from "@/lib/store/institute-course/institute-course-slice";
// import { Status } from "@/lib/global-types/type";
// import { FaClock, FaTag, FaMoneyBillWave } from "react-icons/fa";
// import Link from "next/link";

// const InstituteCourses = () => {
//   const { instituteId } = useParams() as { instituteId?: string };
//   const dispatch = useAppDispatch();
//   const { instituteCourse, status } = useAppSelector((store) => store.course);

//   useEffect(() => {
//     if (instituteId && !isNaN(Number(instituteId))) {
//       dispatch(resetInstituteCourse());
//       dispatch(fetchAllCourses(Number(instituteId)));
//     } else {
//       console.error("Invalid instituteId:", instituteId);
//     }
//   }, [dispatch, instituteId]);

//   if (status === Status.LOADING) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-gray-600 text-xl">
//         Loading courses...
//       </div>
//     );
//   }

//   if (status === Status.ERROR) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-red-600 text-xl">
//         Failed to load courses. Please try again later.
//       </div>
//     );
//   }
// console.log("instituteCourse data →", instituteCourse);

//   if (status === Status.SUCCESS && instituteCourse.length === 0) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
//         <img
//           src="/no-courses.svg"
//           alt="No courses"
//           className="w-64 h-64 object-contain mb-6"
//         />
//         <h2 className="text-2xl font-semibold text-gray-700 mb-2">
//           No courses available yet
//         </h2>
//         <p className="text-gray-500 mb-6 max-w-md">
//           This institute hasn't added any courses at the moment. Please check
//           back later or explore other institutes.
//         </p>
//         <a
//           href="/"
//           className="inline-block px-6 py-2 bg-indigo-600 text-white text-sm font-semibold rounded hover:bg-indigo-700 transition"
//         >
//           🔍 Explore Other Institutes
//         </a>
//       </div>
//     );
//   }

//   if (status === Status.SUCCESS && instituteCourse.length > 0) {
//     const { instituteName, instituteImage } = instituteCourse[0] || {};
    
//     return (
//       <div className="min-h-screen bg-gray-50">
//         {/* Hero Section */}
//         <div className="bg-white shadow-md py-8 px-4 md:px-12 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
//           {instituteImage ? (
//             <img
//               src={instituteImage}
//               alt={`${instituteName} logo`}
//               className="w-40 h-40 object-cover rounded-lg shadow-md"
//             />
//           ) : (
//             <div className="w-24 h-24 bg-gray-300 rounded flex items-center justify-center text-gray-500">
//               No Image
//             </div>
//           )}
//           <div>
//             <h1 className="text-4xl font-bold text-gray-800">
//               {instituteName}
//             </h1>
//             <p className="text-gray-500 mt-1">Explore all available courses</p>
//           </div>
//         </div>

//         {/* Course Listing */}
//         <div className="container mx-auto px-4 py-10">
//           <h2 className="text-2xl font-semibold mb-6 text-gray-800">
//             Courses Offered
//           </h2>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             {instituteCourse.map((course) => (
//               <div
//                 key={course.id || `${course.courseName}-${course.categoryName}`}
//                 className="bg-white rounded-lg shadow hover:shadow-lg transition-all duration-200 p-4 flex flex-col"
//               >
//                 {/* Thumbnail Image */}
//                 <div className="w-full h-48 bg-gray-100 rounded-md overflow-hidden mb-4">
//                   {course.courseThumbnail ? (
//                     <img
//                       src={course.courseThumbnail}
//                       alt={course.courseName}
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <div className="w-full h-full flex items-center justify-center text-gray-400">
//                       No Image
//                     </div>
//                   )}
//                 </div>

//                 <div className="flex-grow">
//                   <h3 className="text-xl font-semibold text-gray-800 mb-2">
//                     {course.courseName}
//                   </h3>
//                   <p className="text-gray-600 mb-4 text-sm">
//                     {course.courseDescription?.substring(0, 120) ||
//                       "No description."}
//                   </p>

//                   <div className="space-y-2 text-sm text-gray-700">
//                     <div className="flex items-center space-x-2">
//                       <FaTag className="text-gray-500" />
//                       <span className="font-medium">Category:</span>
//                       <span>{course.categoryName}</span>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <FaClock className="text-gray-500" />
//                       <span className="font-medium">Duration:</span>
//                       <span>{course.courseDuration}</span>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <FaMoneyBillWave className="text-gray-500" />
//                       <span className="font-medium">Price:</span>
//                       <span>{course.coursePrice}</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* <Link
//                   href={`/institutes/${instituteId}/courses/${course.id}`}
//                   className="mt-6 w-full text-center bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
//                 >
//                   View Details
//                 </Link> */}

//               <Link
//                 href={`/institutes/${instituteId}/courses/${course.id}`}
//                 className="mt-6 w-full text-center bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
//               >
//                 View Details
//               </Link>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return null;
// };

// export default InstituteCourses;


//2nd
'use client';
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  fetchAllCourses,
  resetInstituteCourse,
} from "@/lib/store/institute-course/institute-course-slice";
import { Status } from "@/lib/global-types/type";
import { FaClock, FaTag, FaMoneyBillWave } from "react-icons/fa";
import Link from "next/link";

const InstituteCourses = () => {
  const { instituteId } = useParams() as { instituteId?: string };
  const dispatch = useAppDispatch();
  const { instituteCourse, status } = useAppSelector((store) => store.course);

  useEffect(() => {
    if (instituteId && !isNaN(Number(instituteId))) {
      dispatch(resetInstituteCourse());
      dispatch(fetchAllCourses(Number(instituteId)));
    } else {
      console.error("Invalid instituteId:", instituteId);
    }
  }, [dispatch, instituteId]);

  if (status === Status.LOADING) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-xl">
        Loading courses...
      </div>
    );
  }

  if (status === Status.ERROR) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-xl">
        Failed to load courses. Please try again later.
      </div>
    );
  }

  if (status === Status.SUCCESS && instituteCourse.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <img
          src="/no-courses.svg"
          alt="No courses"
          className="w-64 h-64 object-contain mb-6"
        />
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          No courses available yet
        </h2>
        <p className="text-gray-500 mb-6 max-w-md">
          This institute hasn't added any courses at the moment. Please check
          back later or explore other institutes.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-2 bg-indigo-600 text-white text-sm font-semibold rounded hover:bg-indigo-700 transition"
        >
          🔍 Explore Other Institutes
        </a>
      </div>
    );
  }

  if (status === Status.SUCCESS && instituteCourse.length > 0) {
    const { instituteName, instituteImage } = instituteCourse[0] || {};

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-white shadow-md py-8 px-4 md:px-12 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
          {instituteImage ? (
            <img
              src={instituteImage}
              alt={`${instituteName} logo`}
              className="w-40 h-40 object-cover rounded-lg shadow-md"
            />
          ) : (
            <div className="w-24 h-24 bg-gray-300 rounded flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}
          <div>
            <h1 className="text-4xl font-bold text-gray-800">{instituteName}</h1>
            <p className="text-gray-500 mt-1">Explore all available courses</p>
          </div>
        </div>

        {/* Course Listing */}
        <div className="container mx-auto px-4 py-10">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Courses Offered
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {instituteCourse.map((course) => (
              <div
                key={course.id || `${course.courseName}-${course.categoryName}`}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-all duration-200 p-4 flex flex-col"
              >
                {/* Thumbnail Image */}
                <div className="w-full h-48 bg-gray-100 rounded-md overflow-hidden mb-4">
                  {course.courseThumbnail ? (
                    <img
                      src={course.courseThumbnail}
                      alt={course.courseName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                </div>

                <div className="flex-grow">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {course.courseName}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    {course.courseDescription?.substring(0, 120) || "No description."}
                  </p>

                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex items-center space-x-2">
                      <FaTag className="text-gray-500" />
                      <span className="font-medium">Category:</span>
                      <span>{course.categoryName}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaClock className="text-gray-500" />
                      <span className="font-medium">Duration:</span>
                      <span>{course.courseDuration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaMoneyBillWave className="text-gray-500" />
                      <span className="font-medium">Price:</span>
                      <span>{course.coursePrice}</span>
                    </div>
                  </div>
                </div>

                <Link
                  href={`/institutes/${instituteId}/courses/${course.id}`}
                  className="mt-6 w-full text-center bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default InstituteCourses;
