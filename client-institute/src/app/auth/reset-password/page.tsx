'use client'
import { Status } from "@/lib/GlobalTypes/type"
import { resetPassword, resetStatus } from "@/lib/store/auth/authSlice"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { useRouter } from "next/navigation"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"

export interface IResetPasswordData{
    userEmail:string,
    OTP:string,
    newPassword:string,
    confirmNewPassword:string
}
const ResetPaassword = () => {
    const status = useAppSelector(store => store.auth.status)
    const router = useRouter();
    const dispatch=useAppDispatch()
    const[resetData,setResetData]=useState<IResetPasswordData>({
        userEmail:"",
        OTP:"",
        newPassword:"",
        confirmNewPassword:""
    })

    const handleResetPasswordChange=(e:ChangeEvent<HTMLInputElement>)=>{
        const{name,value}=e.target
        setResetData({
            ...resetData,
            [name]:value
        })
    }

    const handleResetPasswordSubmission=(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        console.log(resetData)
        dispatch(resetPassword(resetData))
    }

    

  useEffect(() => {
  if (status === Status.SUCCESS) {
    router.push('/auth/login')
    dispatch(resetStatus())  // reset status after redirecting to login
  }
}, [status, router, dispatch])


    return(
        <>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="max-w-xl py-6 px-8 bg-white rounded shadow-xl w-full">
                    <form onSubmit={handleResetPasswordSubmission}>
                    {/* Heading */}
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                        Reset Password 🔄
                    </h2>

                    {/* Email */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-800 font-bold">
                        Email:
                        </label>
                        <input
                        type="email"
                        name="userEmail"
                        onChange={handleResetPasswordChange}
                        id="email"
                        placeholder="your@email.com"
                        required
                        className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 ring-indigo-600"
                        />
                    </div>

                    {/* OTP */}
                    <div className="mb-4">
                        <label htmlFor="otp" className="block text-gray-800 font-bold">
                        OTP:
                        </label>
                        <input
                        type="text"
                        name="OTP"
                        onChange={handleResetPasswordChange}
                        id="otp"
                        placeholder="Enter OTP"
                        required
                        className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 ring-indigo-600"
                        />
                    </div>

                    {/* New Password */}
                    <div className="mb-4">
                        <label htmlFor="newPassword" className="block text-gray-800 font-bold">
                        New Password:
                        </label>
                        <input
                        type="password"
                        name="newPassword"
                        onChange={handleResetPasswordChange}
                        id="newPassword"
                        placeholder="••••••••"
                        required
                        className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 ring-indigo-600"
                        />
                    </div>

                    {/* Confirm New Password */}
                    <div className="mb-6">
                        <label htmlFor="confirmNewPassword" className="block text-gray-800 font-bold">
                        Confirm New Password:
                        </label>
                        <input
                        type="password"
                        name="confirmNewPassword"
                        onChange={handleResetPasswordChange}
                        id="confirmNewPassword"
                        placeholder="••••••••"
                        required
                        className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 ring-indigo-600"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="cursor-pointer py-2 px-4 block mt-6 bg-indigo-500 text-white font-bold w-full text-center rounded"
                    >
                        Reset Password
                    </button>
                    </form>
                </div>
            </div>


        </>
    )
}

export default ResetPaassword