import { Status } from "@/lib/GlobalTypes/type"
import { useAppDispatch } from "@/lib/store/hooks"
import { addTeacher } from "@/lib/store/institute/teacher/teacherSlice"
import { ITeacherDataModal } from "@/lib/store/institute/teacher/teacherSliceTypes"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"

interface ICloseModal{
    closeModal:()=>void
}

const InstituteTeacherModal:React.FC<ICloseModal>=({closeModal})=>{
    const [teacherData,setTeacherData]=useState<ITeacherDataModal>({
    teacherName:"",
    teacherEmail:"",
    teacherPhoneNumber:"",
    teacherExpertise:"",
    teacherJoinDate:"",
    teacherSalary:"",
    teacherImage:null ,
    teacherAddress:""
    })

    const dispatch=useAppDispatch()

    const handleTeacherDataChange=(e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>)=>{
        const {name,value}=e.target
        setTeacherData({
            ...teacherData,
            //@ts-ignore
            [name]:name === "teacherImage" ? e.target.files[0] : value //2
        })
    }

    const handleTeacherDataSubmission=async (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        await dispatch(addTeacher(teacherData))
        closeModal()    
    }


    return(
        <div id="modal" className="fixed inset-0 z-50 flex items-center justify-center">
  <div className="fixed inset-0 bg-black/50" />
  <div className="relative w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add Teacher</h3>
      <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <div className="space-y-4">
      <div className="space-y-4">
        {/* Name */}
        <div>
          <label htmlFor="teacherName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
          <input onChange={handleTeacherDataChange} name="teacherName" id="teacherName" type="text" placeholder="Zehan Sheikh"
            className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            required />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="teacherEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
          <input onChange={handleTeacherDataChange} name="teacherEmail" id="teacherEmail" type="email" placeholder="malik@gmail.com"
            className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            required />
        </div>
        {/* Address */}
        <div>
          <label htmlFor="teacherAddress" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
          <input onChange={handleTeacherDataChange} name="teacherAddress" id="teacherAddress" type="text" placeholder="123 Main St"
            className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            required />
        </div>
        {/* teacher Image */}
        <div>
          <label htmlFor="teacherEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Teacher Image</label>
          <input onChange={handleTeacherDataChange} name="teacherImage" id="teacherEmail" type="file" placeholder="malik@gmail.com"
            className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            required />
        </div>

        {/* Grid Layout for 4 smaller fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Mobile */}
          <div>
            <label htmlFor="teacherPhoneNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Mobile</label>
            <input onChange={handleTeacherDataChange} name="teacherPhoneNumber" id="teacherPhoneNumber" type="text" placeholder="980XXXXXXX"
              className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
              required />
          </div>

          {/* Join Date */}
          <div>
            <label htmlFor="teacherJoinDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Joined</label>
            <input onChange={handleTeacherDataChange} name="teacherJoinDate" id="teacherJoinDate" type="date"
              className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
              required />
          </div>

          {/* Expertise */}
          <div>
            <label htmlFor="teacherExpertise" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Expertise</label>
            <input onChange={handleTeacherDataChange} name="teacherExpertise" id="teacherExpertise" type="text" placeholder="JS / Python / Math"
              className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
              required />
          </div>

          {/* Salary */}
          <div>
            <label htmlFor="teacherSalary" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Salary</label>
            <input onChange={handleTeacherDataChange} name="teacherSalary" id="teacherSalary" type="text" placeholder="Rs. xxxx"
              className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
              required />
          </div>
        </div>
      </div>
        <form onSubmit={handleTeacherDataSubmission}>
      {/* Buttons */}
      <div className="flex justify-end gap-3 pt-4">
        <button onClick={closeModal} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600">
          Cancel
        </button>
        <button type="submit" id="submitUrlButton" className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-md bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 dark:from-indigo-500 dark:to-violet-500 dark:hover:from-indigo-600 dark:hover:to-violet-600">
          Create Teacher
          <svg className="h-4 w-4 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </button>
        
      </div>
      </form>
    </div>
  </div>
</div>


    )
}

export default InstituteTeacherModal