import Link from "next/link";

function Dashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
    return(
        
    <div className="flex h-screen">
  {/* Sidebar */}
  <aside className="w-64 bg-white shadow-md">
    <div className="p-4 border-b">
      <div className="flex items-center">
        <img src="https://tailwindflex.com/images/logo.svg" alt="Logo" className="h-8 w-auto" />
        <span className="ml-2 text-xl font-semibold text-gray-800">Dashboard</span>
      </div>
    </div>
    <nav className="mt-5 px-2">
      <Link href="/institute/dashboard" className="group flex items-center px-2 py-2 text-base font-medium rounded-md bg-indigo-100 text-indigo-700">
        <svg className="mr-3 h-6 w-6 text-indigo-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        Dashboard
      </Link>
      <Link href="/institute/dashboard/teacher" className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
        <svg className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        Teacher
      </Link>
      <Link href="/institute/dashboard/student" className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
        <svg className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
        </svg>
        Student
      </Link>
      <Link href="/institute/dashboard/course" className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
        <svg className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Course
      </Link>
      <Link href="/institute/dashboard/category" className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
        <svg className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
        Category
      </Link>
      
    </nav>
    <div className="mt-auto p-4 border-t">
      <div className="flex items-center">
        <img className="h-8 w-8 rounded-full" src="https://plus.unsplash.com/premium_photo-1670088465712-2da547587a15?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bW9kZWxzJTIwbWFsZXxlbnwwfHwwfHx8MA%3D%3D" alt="User" />
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-700">Zunaid Sheikh</p>
          <p className="text-xs font-medium text-gray-500">View Profile</p>
        </div>
      </div>
    </div>
  </aside>
  {/* Main Content */}
  <main className="flex-1 p-6 bg-gray-100">
    <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
    <div className="mt-4 p-6 bg-white rounded-lg shadow-md">
      {children}
    </div>
  </main>
</div>


    )
}
export default Dashboard