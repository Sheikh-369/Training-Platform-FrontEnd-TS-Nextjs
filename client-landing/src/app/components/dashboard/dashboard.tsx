// 'use client';
// import { useAppSelector } from "@/lib/store/hooks";
// import Link from "next/link";
// import React from "react";

// function Dashboard({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const { owner } = useAppSelector((state) => state.owner); // ✅ Use this

//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <aside className="w-64 bg-sky-100 shadow-md flex flex-col">
//         <div className="p-4 border-b">
//           <div className="flex items-center">
//             <img
//               src="https://tailwindflex.com/images/logo.svg"
//               alt="Logo"
//               className="h-8 w-auto"
//             />
//             <span className="ml-2 text-xl font-semibold text-gray-800">
//               Dashboard
//             </span>
//           </div>
//         </div>
//         <nav className="mt-5 px-2 flex-1">
//           <Link
//             // href={`/institute/dashboard`}
//             href={`/institute/dashboard?instituteNumber=${owner?.instituteNumber || ''}`}
//             className="group flex items-center px-2 py-2 text-base font-medium rounded-md bg-sky-200 text-indigo-700"
//           >
//             🏠 Dashboard
//           </Link>
//           <Link
//             // href={`/institute/dashboard/teacher`}
//             href={`/institute/dashboard/teacher?instituteNumber=${owner?.instituteNumber || ''}`}
//             className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
//           >
//             👨‍🏫 Teacher
//           </Link>
//           <Link
//             // href={`/institute/dashboard/student`}
//             href={`/institute/dashboard/stuudent?instituteNumber=${owner?.instituteNumber || ''}`}
//             className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
//           >
//             🎓 Student
//           </Link>
//           <Link
//             // href={`/institute/dashboard/course`}
//             href={`/institute/dashboard/course?instituteNumber=${owner?.instituteNumber || ''}`}
//             className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
//           >
//             📚 Course
//           </Link>
//           <Link
//             // href={`/institute/dashboard/category`}
//             href={`/institute/dashboard/category?instituteNumber=${owner?.instituteNumber || ''}`}
//             className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
//           >
//             🗂️ Category
//           </Link>
//         </nav>
//         <div className="p-4 border-t">
//           <div className="flex items-center">
//             <img
//               className="h-8 w-8 rounded-full"
//               src="https://plus.unsplash.com/premium_photo-1670088465712-2da547587a15?w=700&auto=format&fit=crop&q=60"
//               alt="User"
//             />
//             <div className="ml-3">
//               <p className="text-sm font-medium text-gray-700">Zunaid Sheikh</p>
//               <p className="text-xs font-medium text-gray-500">View Profile</p>
//             </div>
//           </div>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-6 bg-linear-gradient(to bottom right, #c4b5fd, #a5b4fc, #bfdbfe overflow-y-auto">
//         {children}
//       </main>
//     </div>
//   );
// }

// export default Dashboard;


//try2
 'use client';

import { useAppSelector } from '@/lib/store/hooks';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

function useHasMounted() {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  return hasMounted;
}

function Dashboard({ children }: { children: React.ReactNode }) {
  const { owner } = useAppSelector((state) => state.owner);
  const hasMounted = useHasMounted();

  // Optional: Show nothing until client is ready
  if (!hasMounted) {
    return null; // or return <div>Loading...</div>
  }

  const instituteNumber = owner?.instituteNumber;

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-sky-400 shadow-md flex flex-col">
        <div className="p-4 border-b">
          <div className="flex items-center">
            <img
              src="https://tailwindflex.com/images/logo.svg"
              alt="Logo"
              className="h-8 w-auto"
            />
            <span className="ml-2 text-xl font-semibold text-gray-800">
              Dashboard
            </span>
          </div>
        </div>

        <nav className="mt-5 px-2 flex-1 space-y-1">
          {instituteNumber ? (
            <>
              <Link
                href={`/institute/dashboard?instituteNumber=${instituteNumber}`}
                className="group flex items-center px-2 py-2 text-base font-medium rounded-md bg-sky-200 text-indigo-700"
              >
                🏠 Dashboard
              </Link>
              <Link
                href={`/institute/dashboard/teacher?instituteNumber=${instituteNumber}`}
                className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                👨‍🏫 Teacher
              </Link>
              <Link
                href={`/institute/dashboard/student?instituteNumber=${instituteNumber}`}
                className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                🎓 Student
              </Link>
              <Link
                href={`/institute/dashboard/course?instituteNumber=${instituteNumber}`}
                className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                📚 Course
              </Link>
              <Link
                href={`/institute/dashboard/category?instituteNumber=${instituteNumber}`}
                className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                🗂️ Category
              </Link>
            </>
          ) : (
            <div className="text-sm text-red-500 px-2 py-2">
              Institute not found.
            </div>
          )}
        </nav>

        <div className="p-4 border-t">
          <div className="flex items-center">
            <img
              className="h-8 w-8 rounded-full"
              src="https://plus.unsplash.com/premium_photo-1670088465712-2da547587a15?w=700&auto=format&fit=crop&q=60"
              alt="User"
            />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">Zunaid Sheikh</p>
              <p className="text-xs font-medium text-gray-500">View Profile</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto bg-gradient-to-br from-indigo-200 via-indigo-300 to-sky-200">
        {children}
      </main>
    </div>
  );
}

export default Dashboard;
