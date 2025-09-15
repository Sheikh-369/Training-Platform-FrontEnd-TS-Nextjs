'use client';

import { useAppSelector } from "@/lib/store/hooks";
import Link from "next/link";

function TeacherDashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const teacherId = useAppSelector(state => state.teacher.teacher?.id);
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-800 text-white shadow-md flex flex-col">
        <div className="p-4 border-b border-slate-700">
          <div className="flex items-center">
            <img
              src="https://tailwindflex.com/images/logo.svg"
              alt="Logo"
              className="h-8 w-auto"
            />
            <span className="ml-2 text-xl font-semibold text-white">
              Dashboard
            </span>
          </div>
        </div>

        <nav className="mt-5 px-2 flex-1">
          {/* Dashboard Link */}
          <Link
            href={`/teacher/dashboard/${teacherId}`}
            className="group flex items-center px-2 py-2 text-base font-medium rounded-md bg-slate-700 text-white hover:bg-slate-600"
          >
            {/* SVG omitted for brevity */}
            Dashboard
          </Link>

          {/* Student Link */}
          <Link
            href={`/teacher/dashboard/${teacherId}/student`}
            className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-white hover:bg-slate-700 hover:text-white"
          >
            Student
          </Link>

          {/* Course Parent */}
          <div className="mt-1">
            <div className="flex items-center px-2 py-2 text-base font-medium rounded-md text-white hover:bg-slate-700 hover:text-white cursor-pointer">
              Course
            </div>

            {/* Nested Sub-links */}
            <div className="ml-10 mt-1 space-y-1">
              <Link
                href={`/teacher/dashboard/${teacherId}/course/chapter`}
                className="block text-sm text-white hover:text-slate-300"
              >
                Chapter
              </Link>
              <Link
                href={`/teacher/dashboard/${teacherId}/course/lesson`}
                className="block text-sm text-white hover:text-slate-300"
              >
                Lesson
              </Link>
            </div>
          </div>
        </nav>

        {/* Footer */}
        <div className="mt-auto p-4 border-t border-slate-700">
          <div className="flex items-center">
            <img
              className="h-8 w-8 rounded-full"
              src="https://plus.unsplash.com/premium_photo-1670088465712-2da547587a15?w=700&auto=format&fit=crop&q=60"
              alt="User"
            />
            <div className="ml-3">
              <p className="text-sm font-medium text-white">Teacher Name</p>
              <p className="text-xs font-medium text-slate-300">
                View Profile
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-slate-600 overflow-auto">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <div className="mt-4 p-6 bg-white rounded-lg shadow-md">{children}</div>
      </main>
    </div>
  );
}

export default TeacherDashboard;
