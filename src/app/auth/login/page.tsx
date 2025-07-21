'use client'
import { ChangeEvent, FormEvent, useState } from "react"
import { IUserLoginData } from "./loginTypes"
import { useAppDispatch } from "@/lib/store/hooks"
import { loginUser } from "@/lib/store/auth/authSlice"
import { Status } from "@/lib/GlobalTypes/type"

const userLogin=()=>{
  const dispatch=useAppDispatch()
  const [data,setData]=useState<IUserLoginData>({
      userEmail:"",
      userPassword:""
  })

  const handleLoginChange=(e:ChangeEvent<HTMLInputElement>)=>{
      const {name,value}=e.target
      setData({
          ...data,
      [name]:value
      })
  }

  const handleLoginSubmission=(e:FormEvent<HTMLFormElement>)=>{
      e.preventDefault()
      dispatch(loginUser(data))   
  }
  return(
        <>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="max-w-xl py-6 px-8 bg-white rounded shadow-xl">
    <form onSubmit={handleLoginSubmission}>
      {/* Email Field */}
      <div className="mb-6">
        <label htmlFor="email" className="block text-gray-800 font-bold">Email:</label>
        <input
          onChange={handleLoginChange}
          value={data.userEmail}
          type="email"
          name="userEmail"
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
          onChange={handleLoginChange}
          value={data.userPassword}
          type="password"
          name="userPassword"
          id="password"
          placeholder="••••••••"
          className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 ring-indigo-600"
          required
        />
        <a
          href="#"
          className="text-sm font-thin text-gray-800 hover:underline mt-2 inline-block hover:text-indigo-600"
        >
          Forgot Password?
        </a>
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

export default userLogin