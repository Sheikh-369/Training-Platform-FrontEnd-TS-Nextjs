'use client'
import { Status } from "@/lib/global/types"
import { resetStatus, teacherLogin } from "@/lib/store/auth/auth-slice"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"

export interface ITeacherLoginData{
    instituteNumber:string,
    teacherEmail:string,
    teacherPassword:string
}

const Teacher=()=>{
    const router = useRouter();  
    const status = useAppSelector(store => store.auth.status)

    const dispatch=useAppDispatch()
    const[teacherLoginData,setTeacherLoginData]=useState<ITeacherLoginData>({
        instituteNumber:"",
        teacherEmail:"",
        teacherPassword:""
    })

    const handleTeacherLoginChange=(e:ChangeEvent<HTMLInputElement>)=>{
        const{name,value}=e.target
        setTeacherLoginData({
            ...teacherLoginData,
            [name]:value
        })
    }

    const handleTeacherLoginSubmission=(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        console.log(teacherLoginData)
        dispatch(teacherLogin(teacherLoginData))

        // ✅ Add the console log here
    console.log("Submitting institute number:", teacherLoginData.instituteNumber);
    console.log("Raw payload:", teacherLoginData);
    }

//backend bata single teacher ko id tanne tarika
const authData = useAppSelector(store => store.auth.authData);

useEffect(() => {
  if (status === Status.SUCCESS && authData?.teacherId) {
    router.push(`/teacher/dashboard/${authData.teacherId}`);
    dispatch(resetStatus());
  }
}, [status, authData, router, dispatch]);



    return(
        <>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="max-w-xl py-6 px-8 bg-white rounded shadow-xl">
    <form onSubmit={handleTeacherLoginSubmission}>
        {/* Institute Number Field*/}
      <div className="mb-6">
        <label htmlFor="instituteNumber" className="block text-gray-800 font-bold">Institute Number:</label>
        <input
          onChange={handleTeacherLoginChange}
          value={teacherLoginData.instituteNumber}
          type="text"
          name="instituteNumber"
          id="instituteNumber"
          placeholder="Enter your institute number"
          className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 ring-indigo-600"
          required
        />
      </div>

      {/* Email Field */}
      <div className="mb-6">
        <label htmlFor="email" className="block text-gray-800 font-bold">Email:</label>
        <input
          onChange={handleTeacherLoginChange}
          value={teacherLoginData.teacherEmail}
          type="email"
          name="teacherEmail"
          id="email"
          placeholder="your@email.com"
          className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 ring-indigo-600"
          required
        />
      </div>

      {/* Password Field */}
      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-800 font-bold">Password:</label>
        <input
          onChange={handleTeacherLoginChange}
          value={teacherLoginData.teacherPassword}
          type="password"
          name="teacherPassword"
          id="password"
          placeholder="••••••••"
          className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 ring-indigo-600"
          required
        />
        <Link
          href="/auth/forgot-password"
          className="text-sm font-thin text-gray-800 hover:underline mt-2 inline-block hover:text-indigo-600"
        >
          Forgot Password?
        </Link>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="cursor-pointer py-2 px-4 block mt-6 bg-indigo-500 text-white font-bold w-full text-center rounded"
      >
        Login
      </button>
    </form>
  </div>
            </div>
        </>
    )
}
export default Teacher