import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import useAxiosSecure from '../hooks/useAxiosSecure'
import toast, { Toaster } from 'react-hot-toast'
import { AuthContext } from '../provider/Auth'

const LoginPage = () => {
  const { setUser } = useContext(AuthContext)
  const { register, handleSubmit } = useForm()
  const axiosSecure = useAxiosSecure()
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    const { email, pin } = data
    const credentials = { email, pin }

    try {
      const response = await axiosSecure.post('/login', credentials)
      if (response.data?.message === 'Success') {
        toast.success('Login successful!')
        setUser(email)
        navigate('/dashboard')
      } else {
        toast.error('Invalid Credential. Login Failed!')
      }
    } catch (error) {
      toast.error('Invalid Credential. Login Failed!')
    }
  }

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="flex justify-center h-screen">
        {/* Background Image Section */}
        <div
          className="hidden bg-cover lg:block lg:w-2/3"

        >
          <div className="flex items-center h-full px-20 bg-opacity-40" style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }
          }>
            <div>
              <h2 className="text-2xl font-bold text-white sm:text-7xl">mCash</h2>
              <p className="max-w-2xl mt-3 text-gray-300 text-xl">
                Welcome Back!
                Sign in to access your personalized dashboard and continue exploring our amazing features.
              </p>
            </div>
          </div>
        </div>

        {/* Login Form Section */}
        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">
            <div className="text-center">
              <div className="flex justify-center mx-auto">
                <img className="w-auto h-7 sm:h-20" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVjYwFZ3vdrMDHbBEfH4Tv9COX62M8-XEZrg&s" alt="Logo" />
              </div>
              <p className="mt-3 text-gray-500 dark:text-gray-300">Sign in to access your account</p>
            </div>

            <div className="mt-8">
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                    Email
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Please Enter Your Email or Mobile Number"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                {/* PIN Input */}
                <div className="mt-6">
                  <div className="flex justify-between mb-2">
                    <label htmlFor="pin" className="text-sm text-gray-600 dark:text-gray-200">
                      Pin
                    </label>
                  </div>
                  <input
                    {...register('pin')}
                    type="password"
                    name="pin"
                    id="pin"
                    placeholder="Please Enter Your 5 Digit Pin"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                {/* Sign In Button */}
                <div className="mt-6">
                  <button className="btn btn-primary w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                    Sign in
                  </button>
                </div>
              </form>

              {/* Sign Up Link */}
              <p className="pt-5 text-sm text-center text-gray-400">
                Don't have an account yet?{' '}
                <Link to="/register" className="text-blue-500 focus:outline-none focus:underline hover:underline">
                  Sign Up
                </Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  )
}

export default LoginPage
