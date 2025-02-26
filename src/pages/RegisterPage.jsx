import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import useAxiosPublic from '../hooks/useAxiosPublic'
import toast, { Toaster } from 'react-hot-toast'

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const axiosPublic = useAxiosPublic()
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    const { name, pin, nid, email, mobileNumber, role, status, balance } = data

    const userInfo = {
      name,
      pin,
      nid,
      email,
      mobile: mobileNumber,
      role,
      balance,
      status
    }

    try {
      const res = await axiosPublic.post('/register', userInfo)
      if (res.data.insertedId) {
        toast.success('Registration successful!')
        navigate('/login')
      }
    } catch (error) {
      toast.error('Registration Failed!')
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
          }}>
            <div>
              <h2 className="text-2xl font-bold text-white sm:text-7xl">mCash</h2>
              <p className="max-w-2xl mt-3 text-gray-300 text-xl">
              Create your account to unlock exclusive features, personalized experiences, and a community that’s waiting to welcome you. Register now and start your journey with us!
              </p>
            </div>
          </div>
        </div>

        {/* Registration Form Section */}
        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">
            <div className="text-center">
              <div className="flex justify-center mx-auto">
                <img
                  className="w-auto h-7 sm:h-20"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVjYwFZ3vdrMDHbBEfH4Tv9COX62M8-XEZrg&s"
                  alt="Logo"
                />
              </div>
              <p className="mt-3 text-gray-500 dark:text-gray-300">
                Create an account to get started
              </p>
            </div>

            <div className="mt-8">
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* NID Input */}
                <div className="mt-6">
                  <label
                    htmlFor="nid"
                    className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                  >
                    NID
                  </label>
                  <input
                    {...register('nid', { required: 'NID is required' })}
                    type="number"
                    name="nid"
                    id="nid"
                    placeholder="Please Enter NID"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  {errors.nid && (
                    <p className="mt-1 text-sm text-red-500">{errors.nid.message}</p>
                  )}
                </div>

                {/* Mobile Number */}
                <div className="mt-6">
                  <label
                    htmlFor="mobileNumber"
                    className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                  >
                    Mobile Number
                  </label>
                  <input
                    {...register('mobileNumber', {
                      required: 'Mobile number is required'
                    })}
                    type="number"
                    name="mobileNumber"
                    id="mobileNumber"
                    placeholder="Please Enter Mobile Number"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  {errors.mobileNumber && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.mobileNumber.message}
                    </p>
                  )}
                </div>

                {/* PIN Input */}
                <div className="mt-6">
                  <div className="flex justify-between mb-2">
                    <label
                      htmlFor="pin"
                      className="text-sm text-gray-600 dark:text-gray-200"
                    >
                      Pin
                    </label>
                  </div>
                  <input
                    {...register('pin', {
                      required: 'Pin is required',
                      maxLength: {
                        value: 5,
                        message: 'Pin should not be more than 5 digits'
                      }
                    })}
                    type="number"
                    name="pin"
                    id="pin"
                    placeholder="Please Enter Your Pin"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  {errors.pin && (
                    <p className="mt-1 text-sm text-red-500">{errors.pin.message}</p>
                  )}
                </div>

                {/* Name Input */}
                <div className="mt-6">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                  >
                    Name
                  </label>
                  <input
                    {...register('name', { required: 'Name is required' })}
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Please Enter Name"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                  )}
                </div>

                {/* Email Input */}
                <div className="mt-6">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                  >
                    Email Address
                  </label>
                  <input
                    {...register('email', {
                      required: 'Email is required'
                    })}
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Please Enter Email"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>

                {/* Role Selection */}
                <div className="mt-6">
                  <label
                    htmlFor="role"
                    className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                  >
                    Select Role
                  </label>
                  <select
                    {...register('role')}
                    defaultValue="user"
                    id="role"
                    className="select w-full px-4 py-2 mt-2 border border-gray-200 rounded-lg dark:border-gray-700 focus:border-blue-400 focus:ring-blue-400 focus:outline-none"
                  >
                    <option value="user">User</option>
                    <option value="agent">Agent</option>
                  </select>
                </div>

                {/* Register Button */}
                <div className="mt-6">
                  <button className="btn btn-primary w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                    Register
                  </button>
                </div>
              </form>

              {/* Sign In Link */}
              <p className="pt-6 text-sm text-center text-gray-400">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="text-blue-500 focus:outline-none focus:underline hover:underline"
                >
                  Sign In
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  )
}

export default RegisterPage
