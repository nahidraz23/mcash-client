import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const DasboardLayout = () => {
    return (
        <div className='grid grid-cols-12 h-screen'>
            <div className='col-span-2 border-r-2 border-black flex flex-col gap-1'>
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
            <div className='col-span-10'>
                <Outlet />
            </div>
        </div>
    );
};

export default DasboardLayout;