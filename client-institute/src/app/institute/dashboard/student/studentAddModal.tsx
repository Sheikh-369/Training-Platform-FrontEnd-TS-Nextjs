import { useAppDispatch } from "@/lib/store/hooks"
import { addStudent } from "@/lib/store/institute/student/studentSlice"
import { IStudentDataModal } from "@/lib/store/institute/student/studentSliceTypes"
import { ChangeEvent, FormEvent, useState } from "react"

interface ICloseModal{
    closeModal:()=>void
}

const StudentAddModal:React.FC<ICloseModal>=({closeModal})=>{
    const dispatch=useAppDispatch()
    const [studentData,setStudentData]=useState<IStudentDataModal>({
        studentName:"",
        studentPhoneNo:"",
        studentAddress:"",
        enrolledDate:""
    })

    const handleStudentDataChange=(e:ChangeEvent<HTMLInputElement>)=>{
        const {name,value}=e.target
        setStudentData({
            ...studentData,
            [name]:value
        })
    }

    const handleStudentDataSubmission=(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        dispatch(addStudent(studentData))
        closeModal()
    }
    return(
        <div id="modal" className="fixed inset-0 z-50 flex items-center justify-center">
  <div className="fixed inset-0 bg-black/50" />
  <form onSubmit={handleStudentDataSubmission}>
  <div className="relative w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add Student</h3>
      <button onClick={closeModal} id="closeModalButton" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
        <svg className="h-4 w-4 inline-block ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    <div className="space-y-4">
      <div>
        {/* studentName */}
        <label htmlFor="website_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
        <input onChange={handleStudentDataChange} name="studentName" type="text" id="website_url" className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500" placeholder="Dipesh Khadka" required />
        {/* studentPhoneNumber */}
        <label htmlFor="website_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Mobile</label>
        <input onChange={handleStudentDataChange} name="studentPhoneNo" type="text" id="website_url" className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500" placeholder="98xxxxxxxx" required />
        {/* studentAddress */}
        <label htmlFor="website_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
        <input onChange={handleStudentDataChange} name="studentAddress" type="text" id="website_url" className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500" placeholder="Bhadrapur" required />
        {/* studentEnrolledDate */}
        <label htmlFor="website_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Enrolled Date</label>
        <input onChange={handleStudentDataChange} name="enrolledDate" type="date" id="website_url" className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500" placeholder="mm/dd/yyyy" required />
      </div>
      <div className="flex justify-end gap-3">
        <button onClick={closeModal} id="cancelButton" className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600">
          Cancel
        </button>
        <button type="submit" id="submitUrlButton" className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-md bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 dark:from-indigo-500 dark:to-violet-500 dark:hover:from-indigo-600 dark:hover:to-violet-600">
          Submit
          <svg className="h-4 w-4 inline-block ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </button>
      </div>
    </div>
  </div>
  </form>
        </div>

    )
}
export default StudentAddModal