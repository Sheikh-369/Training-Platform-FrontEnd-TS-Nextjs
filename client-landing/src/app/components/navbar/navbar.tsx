// "use client";
// import { logoutUser } from "@/lib/store/auth/auth-slice";
// import { useAppDispatch, useAppSelector, useAuth } from "@/lib/store/hooks";
// import { clearUserInstituteRole } from "@/lib/store/user-institute-role/user-institute-role-slice";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { FaBars, FaTimes, FaGraduationCap, FaSearch } from "react-icons/fa";
// interface NavbarProps {
//   onSearchChange?: (value: string) => void;
// }

// const Navbar = ({ onSearchChange }: NavbarProps) => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const toggleMenu = () => setMenuOpen(!menuOpen);

//   //logout logic
//   const dispatch=useAppDispatch()
//   const router=useRouter()
//   const {isLoggedIn,user}=useAuth()
  
//   const handleLogout = () => {
//     dispatch(logoutUser());
//     dispatch(clearUserInstituteRole());
//     toast.success("Logged out successfully");
//     router.push("/");
//   };

//   //user institutes
//   const handleMyInstitutesClick = () => {
//     router.push('/my-institutes'); // or whatever route you assign to MyInstitutes page
//   };

//   //restricting user from creating institute without login
//     const handleCreateInstituteClick = () => {
//     if (!user) {
//       toast.error('You must be logged in to register an institute.');
//       router.push('/auth/global/login');
//       return;
//     }

//     router.push('/auth/register-institute');
//   };

//   //search logic
//   const [searchInput, setSearchInput] = useState("");

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setSearchInput(value);
//     if (onSearchChange) onSearchChange(value);
//   };


//   return (
//     <nav className="bg-sky-100 shadow-md fixed top-0 left-0 w-full z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Left: Logo */}
//           <div className="flex items-center space-x-2">
//             <FaGraduationCap className="text-blue-600 text-2xl" />
//             <span className="text-xl font-bold text-blue-600">EduPortal</span>
//           </div>

//           {/* Center: Nav Links + Search */}
//           <div className="hidden md:flex items-center space-x-6">
//             <Link
//               href="/institute"
//               className="text-gray-700 hover:text-blue-600 font-medium"
//             >
//               Institutes
//             </Link>
//             <Link
//               href="/about"
//               className="text-gray-700 hover:text-blue-600 font-medium"
//             >
//               About
//             </Link>
//             <Link
//               href="/contact"
//               className="text-gray-700 hover:text-blue-600 font-medium"
//             >
//               Contact
//             </Link>

//             {/* Search Input */}
//             <div className="relative">
//               <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//               <input
//                 type="text"
//                 value={searchInput}
//                 onChange={handleSearchChange}
//                 placeholder="Find institutes near you"
//                 className="pl-10 pr-4 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm w-64"
//               />
//             </div>
//           </div>

          
//           {/* Right: Login & Register Buttons */}
//           <div className="hidden md:flex items-center space-x-4">
//             {isLoggedIn ? (
//               <>
//               <button
//                 onClick={handleLogout}
//                 className="text-red-600 font-medium cursor-pointer"
//               >
//                 Logout
//               </button>
//                     <Link href="/my-institutes">
//                       <button onClick={handleMyInstitutesClick} className="text-gray-700 hover:text-blue-600 font-medium">
//                         My Institutes
//                       </button>
//                     </Link>
//               </>
//             ) : (
//               <Link href="/auth/global/login">
//                 <button className="text-blue-600 font-medium cursor-pointer">
//                   Login
//                 </button>
//               </Link>
//             )}

            
//               <button onClick={handleCreateInstituteClick} className=" text-gray-700 hover:text-blue-600 font-medium">
//                 Register Your Institute
//               </button>
        
//           </div>

//           {/* Mobile: Hamburger */}
//           <div className="md:hidden flex items-center">
//             <button onClick={toggleMenu}>
//               {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Dropdown Menu */}
//       {menuOpen && (
//         <div className="md:hidden bg-white shadow border-t">
//           <div className="flex flex-col p-4 space-y-3">
//             <Link
//               href="/institute"
//               className="text-gray-700 hover:text-blue-600 transition"
//             >
//               Institutes
//             </Link>
//             <Link
//               href="/about"
//               className="text-gray-700 hover:text-blue-600 transition"
//             >
//               About
//             </Link>
//             <Link
//               href="/contact"
//               className="text-gray-700 hover:text-blue-600 transition"
//             >
//               Contact
//             </Link>

//             {/* Mobile Search Input */}
//             <div className="relative mt-2">
//               <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Find institutes near you"
//                 className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
//               />
//             </div>
//                     {/* ✅ Add This: My Institutes (if logged in) */}
//                   {isLoggedIn && (
//                     <Link
//                       href="/my-institutes"
//                       className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition text-center"
//                     >
//                       My Institutes
//                     </Link>
//                   )}
            
//               <button onClick={handleCreateInstituteClick} className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
//                 Register Your Institute
//               </button>
            
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;


'use client';

import { logoutUser } from "@/lib/store/auth/auth-slice";
import { useAppDispatch, useAuth } from "@/lib/store/hooks";
import { clearUserInstituteRole } from "@/lib/store/user-institute-role/user-institute-role-slice";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  FaBars,
  FaTimes,
  FaGraduationCap,
  FaSearch,
  FaBuilding,
  FaUniversity,
  FaSignOutAlt,
} from "react-icons/fa";

interface NavbarProps {
  onSearchChange?: (value: string) => void;
}

const Navbar = ({ onSearchChange }: NavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const { isLoggedIn, user } = useAuth();

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(clearUserInstituteRole());
    toast.success("Logged out successfully");
    router.push("/");
  };

  const handleMyInstitutesClick = () => {
    router.push("/my-institutes");
  };

  const handleCreateInstituteClick = () => {
    if (!user) {
      toast.error("You must be logged in to register an institute.");
      router.push("/auth/global/login");
      return;
    }
    router.push("/auth/register-institute");
  };

  const [searchInput, setSearchInput] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);
    if (onSearchChange) onSearchChange(value);
  };

  return (
    <nav className="bg-sky-100 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Logo */}
          <div className="flex items-center space-x-2">
            <FaGraduationCap className="text-blue-600 text-2xl" />
            <span className="text-xl font-bold text-blue-600">EduPortal</span>
          </div>

          {/* Center: Nav Links + Search */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Institutes
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Contact
            </Link>

            {/* Search */}
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchInput}
                onChange={handleSearchChange}
                placeholder="Find institutes near you"
                className="pl-10 pr-4 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm w-64"
              />
            </div>
          </div>

          {/* Right: Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                {/* Logout with icon */}
                <button
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
                >
                  <FaSignOutAlt />
                  Logout
                </button>

                {/* My Institutes button - only show if NOT on that page */}
                {pathname !== "/my-institutes" && (
                  <button
                    onClick={handleMyInstitutesClick}
                    className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 transition font-medium"
                  >
                    <FaUniversity />
                    My Institutes
                  </button>
                )}
              </>
            ) : (
              <Link href="/auth/global/login">
                <button className="text-blue-600 font-medium cursor-pointer">
                  Login
                </button>
              </Link>
            )}

            {/* Register Your Institute - Styled with Icon */}
            <button
              onClick={handleCreateInstituteClick}
              className="flex items-center gap-2 bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition font-medium"
            >
              <FaBuilding />
              Register Your Institute
            </button>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu}>
              {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow border-t">
          <div className="flex flex-col p-4 space-y-3">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Institutes
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Contact
            </Link>

            {/* Search Input */}
            <div className="relative mt-2">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Find institutes near you"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>

            {/* Mobile: My Institutes */}
            {isLoggedIn && pathname !== "/my-institutes" && (
              <button
                onClick={handleMyInstitutesClick}
                className="flex items-center justify-center gap-2 w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                <FaUniversity />
                My Institutes
              </button>
            )}

            {/* Mobile: Register */}
            <button
              onClick={handleCreateInstituteClick}
              className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              <FaBuilding />
              Register Your Institute
            </button>

            {/* Mobile: Logout */}
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
              >
                <FaSignOutAlt />
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

