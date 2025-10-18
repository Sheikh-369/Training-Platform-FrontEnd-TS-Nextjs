// 'use client';

// import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
// import Link from 'next/link';
// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation'; // Next.js v13+ useRouter hook for navigation
// import { logoutUser } from '@/lib/store/auth/auth-slice';

// function useHasMounted() {
//   const [hasMounted, setHasMounted] = useState(false);
//   useEffect(() => {
//     setHasMounted(true);
//   }, []);
//   return hasMounted;
// }

// function Dashboard({ children }: { children: React.ReactNode }) {
//   const { owner } = useAppSelector((state) => state.owner);
//   const dispatch = useAppDispatch();
//   const router = useRouter();
//   const hasMounted = useHasMounted();

//   if (!hasMounted) {
//     return null;
//   }

//   const instituteNumber = owner?.instituteNumber;

//   // Logout handler
//   const handleLogout = () => {
//     dispatch(logoutUser());
//     router.push('/login'); // or wherever you want to send user after logout
//   };

//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <aside className="w-64 bg-sky-400 shadow-md flex flex-col">
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

//         <nav className="mt-5 px-2 flex-1 space-y-1">
//           {instituteNumber ? (
//             <>
//               <Link
//                 href={`/institute/dashboard?instituteNumber=${instituteNumber}`}
//                 className="group flex items-center px-2 py-2 text-base font-medium rounded-md bg-sky-200 text-indigo-700"
//               >
//                 🏠 Dashboard
//               </Link>
//               <Link
//                 href={`/institute/dashboard/teacher?instituteNumber=${instituteNumber}`}
//                 className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
//               >
//                 👨‍🏫 Teacher
//               </Link>
//               <Link
//                 href={`/institute/dashboard/student?instituteNumber=${instituteNumber}`}
//                 className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
//               >
//                 🎓 Student
//               </Link>
//               <Link
//                 href={`/institute/dashboard/course?instituteNumber=${instituteNumber}`}
//                 className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
//               >
//                 📚 Course
//               </Link>
//               <Link
//                 href={`/institute/dashboard/category?instituteNumber=${instituteNumber}`}
//                 className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
//               >
//                 🗂️ Category
//               </Link>
//             </>
//           ) : (
//             <div className="text-sm text-red-500 px-2 py-2">
//               Institute not found.
//             </div>
//           )}

//           {/* New Buttons */}

//           <button
//             onClick={() => router.push('/my-institutes')}
//             className="w-full text-left mt-4 px-2 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
//           >
//             🏫 My Institutes
//           </button>

//           <button
//             onClick={handleLogout}
//             className="w-full text-left mt-2 px-2 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
//           >
//             🔒 Logout
//           </button>
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
//       <main className="flex-1 p-6 overflow-y-auto bg-gradient-to-br from-indigo-200 via-indigo-300 to-sky-200">
//         {children}
//       </main>
//     </div>
//   );
// }

// export default Dashboard;


'use client';

import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { logoutUser } from '@/lib/store/auth/auth-slice';
import { FaSignOutAlt, FaUniversity } from 'react-icons/fa'; // import icons
import { clearUserInstituteRole } from '@/lib/store/user-institute-role/user-institute-role-slice';
import toast from 'react-hot-toast';

function useHasMounted() {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  return hasMounted;
}

function Dashboard({ children }: { children: React.ReactNode }) {
  const { owner } = useAppSelector((state) => state.owner);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const hasMounted = useHasMounted();

  if (!hasMounted) {
    return null;
  }

  const instituteNumber = owner?.instituteNumber;

  // Logout handler
  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(clearUserInstituteRole());
    toast.success("Logged out successfully");
    router.push("/");
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-sky-200 shadow-md flex flex-col">
        <div className="p-4 border-b">
          <div className="flex items-center">
            <img
              src="https://img.icons8.com/fluent/344/university.png"
              alt="Logo"
              className="h-8 w-auto"
            />
            <span className="ml-2 text-sm font-semibold text-gray-800">
              {owner?.instituteName || "Dashboard"}
            </span>
          </div>
        </div>

        <nav className="mt-5 px-2 flex-1 flex flex-col">
          <div className="space-y-1">
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
          </div>

          {/* Spacer to push logout down */}
          <div className="mt-auto space-y-2">
            {/* My Institutes button styled like links */}
            <button
              onClick={() => router.push('/my-institutes')}
              className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 w-full"
            >
              <FaUniversity className="mr-3 text-lg" />
              My Institutes
            </button>

            {/* Logout button with icon */}
            <button
              onClick={handleLogout}
              className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-red-600 hover:bg-red-100 w-full"
            >
              <FaSignOutAlt className="mr-3 text-lg" />
              Logout
            </button>
          </div>
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
              <p className="text-xs font-medium text-gray-500 cursor-pointer hover:underline">
                View Profile
              </p>
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
