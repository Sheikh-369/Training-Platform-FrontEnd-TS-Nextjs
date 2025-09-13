import Link from "next/link";

function TeacherDashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
    return(
        
    <div className="flex h-screen">
  {/* Sidebar */}
  <aside className="w-64 bg-white shadow-md flex flex-col">
    <div className="p-4 border-b">
      <div className="flex items-center">
        <img src="https://tailwindflex.com/images/logo.svg" alt="Logo" className="h-8 w-auto" />
        <span className="ml-2 text-xl font-semibold text-gray-800">Dashboard</span>
      </div>
    </div>

    <nav className="mt-5 px-2 flex-1">
      {/* Dashboard Link */}
      <Link href="/teacher/dashboard" className="group flex items-center px-2 py-2 text-base font-medium rounded-md bg-indigo-100 text-indigo-700">
        <svg className="mr-3 h-6 w-6 text-indigo-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        Dashboard
      </Link>

      {/* Student Link */}
      <Link href="/teacher/dashboard/student" className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
        <svg className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
        </svg>
        Student
      </Link>

      {/* Course Parent */}
      <div className="mt-1">
        <div className="flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 cursor-pointer">
          <svg className="mr-3 h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
          Course
        </div>

        {/* Nested Sub-links */}
        <div className="ml-10 mt-1 space-y-1">
          <Link href="/teacher/dashboard/course/chapter" className="block text-sm text-gray-600 hover:text-gray-900">
            Chapter
          </Link>
          <Link href="/teacher/dashboard/course/lesson" className="block text-sm text-gray-600 hover:text-gray-900">
            Lesson
          </Link>
        </div>
      </div>
    </nav>

    {/* Footer */}
    <div className="mt-auto p-4 border-t">
      <div className="flex items-center">
        <img className="h-8 w-8 rounded-full" src="https://plus.unsplash.com/premium_photo-1670088465712-2da547587a15?w=700&auto=format&fit=crop&q=60" alt="User" />
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-700">Teacher Name</p>
          <p className="text-xs font-medium text-gray-500">View Profile</p>
        </div>
      </div>
    </div>
  </aside>

  {/* Main Content */}
  <main className="flex-1 p-6 bg-gray-100 overflow-auto">
    <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
    <div className="mt-4 p-6 bg-white rounded-lg shadow-md">
      {children}
    </div>
  </main>
</div>



    )
}
export default TeacherDashboard