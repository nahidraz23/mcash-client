import React, { useContext } from 'react';
import { AuthContext } from '../provider/Auth';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../hooks/useAxiosPublic';
import useUser from '../hooks/useUser';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../hooks/useAxiosSecure';

const DashboardHome = () => {
    const { user, setUser } = useContext(AuthContext);
    const [userInfo] = useUser(user);
    const { register, handleSubmit } = useForm();
    const axiosSecure = useAxiosSecure();
    // const axiosPublic = useAxiosPublic();
    return (
        <div className=''>
            {/* top section */}
            <div className='py-3 border-b-2 flex  justify-between px-5'>
                <div >
                    <h1>Hello, {userInfo?.name}</h1>
                    <p>Nice to see you again</p>
                </div>
                <div className={`avatar flex items-center gap-2`}>
                    <p>{userInfo?.email}</p>
                    <div className={`mask mask-hexagon w-12`}>
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                </div>
            </div>

            <div className='flex justify-around'>
                <div className='w-full'>
                    <div className="card bg-base-100 shadow-sm">
                        <div className="card-body">
                            <h2 className="text-center font-bold text-3xl">Current Balance: {userInfo?.balance}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;