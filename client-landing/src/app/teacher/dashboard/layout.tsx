"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  UserCircleIcon,
  ClipboardIcon,
  CalendarIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  BookOpenIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

export default function TeacherDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { name: "Profile", href: "/teacher/dashboard", icon: UserCircleIcon },
    { name: "Classes", href: "/teacher/dashboard/classes", icon: ClipboardIcon },
    { name: "Attendance", href: "/teacher/dashboard/attendance", icon: CalendarIcon },
    { name: "Chapters", href: "/teacher/dashboard/chapters", icon: BookOpenIcon },
    { name: "Lessons", href: "/teacher/dashboard/lessons", icon: DocumentTextIcon },
    { name: "Settings", href: "/teacher/dashboard/settings", icon: Cog6ToothIcon },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="bg-[#4c5d85] text-[#f0f3f9] w-64 h-screen flex flex-col">
        {/* Logo / User Info */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-300/20">
          <UserCircleIcon className="h-10 w-10 text-white" />
          <div>
            <p className="font-semibold text-white">John Doe</p>
            <p className="text-sm text-gray-300">Teacher</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navItems.map(({ name, href, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={name}
                href={href}
                className={`flex items-center gap-3 px-4 py-3 rounded-md transition
                  ${isActive
                    ? "bg-[#88b2e6] text-[#1e2b50] font-semibold"
                    : "text-gray-200 hover:bg-[#5c6d97] hover:text-white"
                  }`}
              >
                <Icon className="h-6 w-6 flex-shrink-0" />
                <span>{name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <button
          type="button"
          className="flex items-center gap-3 px-6 py-3 mb-6 text-red-400 hover:bg-red-100 hover:text-red-700 transition rounded-md mx-4"
          onClick={() => {
            // Add your logout logic here
            alert("Logout clicked!");
          }}
        >
          <ArrowRightOnRectangleIcon className="h-6 w-6" />
          <span>Logout</span>
        </button>
      </aside>

      {/* Main content area */}
      <main className="flex-1 bg-gradient-to-br from-[#f7f8fc] via-[#eae9ef] to-[#cdd2ee] p-6 text-[#1e2b50]">
        {children}
      </main>
    </div>
  );
}
