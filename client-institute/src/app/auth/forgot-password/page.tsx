"use client"
import { Status } from "@/lib/GlobalTypes/type"
import { forgotPassword, resetStatus } from "@/lib/store/auth/authSlice"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { useRouter } from "next/navigation"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"

export interface IForgotPasswordData{
    userEmail:string
}

const ForgotPassword=()=>{
  const router = useRouter();
  const status = useAppSelector(store => store.auth.status)  
  const dispatch=useAppDispatch()
    const[emailData,setEmailData]=useState<IForgotPasswordData>({
        userEmail:""
    })

    const handleForgotPasswordData=(e:ChangeEvent<HTMLInputElement>)=>{
        const{name,value}=e.target
        setEmailData({
            ...emailData,
            [name]:value
        })
    }

    const handleForgotPasswordSubmission=(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        dispatch(forgotPassword(emailData))

    }

    useEffect(() => {
  if (status === Status.SUCCESS) {
    router.push('/auth/reset-password')
    dispatch(resetStatus())  // reset status after redirect
  }
}, [status, router, dispatch])

    return(
        <>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-xl py-6 px-8 bg-white rounded shadow-xl w-full">
        <form onSubmit={handleForgotPasswordSubmission}>
          {/* Heading */}
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Forgot Password 🔐
          </h2>

          {/* Email Input */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-800 font-bold">
              Email:
            </label>
            <input
              type="email"
              name="userEmail"
              onChange={handleForgotPasswordData}
              id="email"
              placeholder="your@email.com"
              required
              className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 ring-indigo-600"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="cursor-pointer py-2 px-4 block mt-6 bg-indigo-500 text-white font-bold w-full text-center rounded"
          >
            Send OTP
          </button>
        </form>
      </div>
            </div>
        </>
    )
}

export default ForgotPassword