const UserRegister = () => {
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

            <form className="mt-6 space-y-5" method="POST">
              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  name="username"
                  type="text"
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
                  name="email"
                  type="email"
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
                  name="password"
                  type="password"
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
          </div>
        </div>
      </div>
    </>
  );
};

export default UserRegister;
