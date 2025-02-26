import React, { useContext } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { AuthContext } from '../provider/Auth'
import useAxiosPublic from '../hooks/useAxiosPublic'

const DashboardLayout = () => {
    const { user, setUser } = useContext(AuthContext)
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
    console.log(user);

    const handleLogOut = async () => {
        try {
            const res = await axiosPublic.post('/logout', {}, { withCredentials: true })
            if (res.data.message === 'Success') {
                setUser(null)
                navigate('/login')
            }
        } catch (error) {
            console.error('Logout error:', error)
        }
    }

    return (
        <div className="grid grid-cols-12 h-screen">
            <div className="col-span-2 border-r border-gray-300 flex flex-col justify-between h-full p-4">
                {/* For General User */}
                <div>
                    <h1 className="text-3xl text-center font-semibold py-4">mCash</h1>
                </div>
                {
                    user?.role === 'agent'
                    &&
                    <div className="flex flex-col gap-2">
                        <Link to="/dashboard/overview" className="w-full btn">
                            Overview
                        </Link>
                        <Link to="/dashboard/cashin" className="w-full btn">
                            Cash In
                        </Link>
                        <Link to="/dashboard/transactionhistory" className="w-full btn">
                            Transaction History
                        </Link>
                        <Link to="/dashboard/requestmoney" className="w-full btn">
                            Request Money
                        </Link>
                    </div>
                }{
                    user?.role === 'user'
                    &&
                    <div className="flex flex-col gap-2">
                        <Link to="/dashboard/overview" className="w-full btn">
                            Overview
                        </Link>
                        <Link to="/dashboard/sendmoney" className="w-full btn">
                            Send Money
                        </Link>
                        <Link to="/dashboard/cashout" className="w-full btn">
                            Cash Out
                        </Link>
                        <Link to="/dashboard/transactionhistory" className="w-full btn">
                            Transaction History
                        </Link>
                    </div>
                }
                {
                    user?.role === 'admin' &&
                    <div className="flex flex-col gap-2">
                        {/* <Link to="/dashboard/overview" className="w-full btn">
                            Overview
                        </Link> */}
                        <Link to="/dashboard/agentrequest" className="w-full btn">
                            Agent Request
                        </Link>
                        <Link to="/dashboard/agentmoneyrequest" className="w-full btn">
                            Agent Recharge Request
                        </Link>
                        <Link to="/dashboard/manageusers" className="w-full btn">
                            Manage Users
                        </Link>
                        <Link to="/dashboard/transactionhistory" className="w-full btn">
                            Transaction History
                        </Link>
                        <Link to="/dashboard/balanceinquiry" className="w-full btn">
                            Balance Inquiry
                        </Link>
                    </div>
                }
                <button onClick={handleLogOut} className="btn btn-error w-full">
                    Sign Out
                </button>
            </div>
            <div className="col-span-10 p-4">
                <Outlet />
            </div>
        </div>
    )
}

export default DashboardLayout
