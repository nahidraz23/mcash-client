import React, { useContext } from 'react';
import { AuthContext } from '../provider/Auth';
import useUser from '../hooks/useUser';


const DashboardHome = () => {
    const { user } = useContext(AuthContext);
    const [userInfo] = useUser(user);

    return (
        <div className=''>
            {/* top section */}
            <div className='py-3 bg-red-100 border-b-2 flex  justify-between px-5'>
                <div className=''>
                    <h1 className='text-xl font-semibold'>Hello, {userInfo?.name}</h1>
                    <p>Nice to see you again</p>
                </div>
                <div className={`avatar flex items-center gap-2`}>
                    <p>{userInfo?.email}</p>
                    <div className={`mask mask-hexagon w-12`}>
                        <img src="https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg" />
                    </div>
                </div>
            </div>

            <div className='flex justify-around mt-2'>
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