import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../provider/Auth';
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../hooks/useAxiosPublic';

const DasboardLayout = () => {

    const { user, setUser } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleLogOut = async () => {
        await axiosPublic.post('/logout', {}, { withCredentials: true })
            .then((res) => {
                if (res.data.message === "Success") {
                    setUser(null);
                    navigate('/login');
                }
            })
            .catch((error) => console.log(error))
    }

    console.log(user);

    return (
        <div className='grid grid-cols-12 h-screen'>
            <div className='col-span-2 border-r-2 border-black flex flex-col gap-1'>
                <div className='flex flex-col h-full gap-1'>
                    <Link to={'/dashboard/overview'} className='w-full btn ' >
                        Overview
                    </Link>
                    <Link to={'/dashboard/transaction'} className='w-full btn ' >
                        Transactions
                    </Link>
                    <Link to={'/dashboard/statistics'} className='w-full btn ' >
                        Statistics
                    </Link>
                </div>
                <div className=''>
                    <button onClick={handleLogOut} className='btn btn-error w-full'>Sign Out</button>
                </div>
            </div>
            <div className='col-span-10'>
                <Outlet />
            </div>
        </div>
    );
};

export default DasboardLayout;