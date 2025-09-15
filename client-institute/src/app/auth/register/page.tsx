'use client'
import { ChangeEvent, FormEvent,useEffect,useState } from "react";
import { IRegisterUserData } from "./registerTypes";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { registerUser } from "@/lib/store/auth/authSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Status } from "@/lib/GlobalTypes/type";


const UserRegister = () => {
  const dispatch=useAppDispatch()
  const [data,setData]=useState<IRegisterUserData>({
    userName:"",
    userEmail:"",
    userPassword:""
  })

  const handleUserDataChange=(e:ChangeEvent<HTMLInputElement>)=>{
    const {name,value}=e.target
    setData({
      ...data,
      [name]:value
    })
  }

  const handleUserDataSubmission=(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    dispatch(registerUser(data))
    alert("User Registered Successfully!")
  }

  //login ma redirect garne
  const router = useRouter();  
  const status = useAppSelector(store => store.auth.status)

  useEffect(() => {
  if (status === Status.SUCCESS) {
    router.push(`/auth/login`);
  }
}, [status, router]);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-sky-100 to-indigo-100 flex items-center justify-center px-4">
  <div className="w-full max-w-md">
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-8">
      <div className="flex justify-center mb-6">
        <img
          className="h-14 w-14"
          src="https://www.svgrepo.com/show/499664/user-happy.svg"
          alt="User Icon"
        />
      </div>
      <h2 className="text-center text-2xl font-bold text-gray-800">
        Sign up for an account
      </h2>

      <form onSubmit={handleUserDataSubmission} className="mt-6 space-y-5" method="POST">
        {/* Username */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            onChange={handleUserDataChange}
            name="userName"
            type="text"
            value={data.userName}
            required
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-3 text-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            onChange={handleUserDataChange}
            name="userEmail"
            type="email"
            value={data.userEmail}
            required
            autoComplete="email"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-3 text-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            onChange={handleUserDataChange}
            name="userPassword"
            type="password"
            value={data.userPassword}
            required
            autoComplete="new-password"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-3 text-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            className="w-full flex justify-center rounded-md bg-indigo-500 px-4 py-3 text-sm font-medium text-white shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition"
          >
            Register Account
          </button>
        </div>
      </form>

      {/* Already have an account? */}
      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link
          href="/auth/login"
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Login
        </Link>
      </p>
    </div>
  </div>
      </div>
    </>
  );
};

export default UserRegister;

