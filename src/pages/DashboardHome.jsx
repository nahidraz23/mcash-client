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

    // handle Send money
    const handleSendMoney = async (data) => {
        try {
            const response = await axiosSecure.post("/transaction/send", data);
            if (response.data?.message === "Transaction successful") {
                toast.success("Money sent successfully!");
                reset();
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Send Money Failed");
        }
        document.getElementById('my_modal_1').close(); // Close modal manually
    }

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
            <div>
                {/* Send Money Modal */}
                <button className="btn" onClick={() => document.getElementById('my_modal_1').showModal()}>Send Money</button>
                <dialog id="my_modal_1" className="modal">
                    <div className="modal-box">
                        <div className="modal-action w-full">
                            <form onSubmit={handleSubmit(handleSendMoney)} method="dialog" className='w-full'>
                                {/* if there is a button in form, it will close the modal */}
                                {/* <button className="btn w-full">Send</button> */}
                                <fieldset className="fieldset ">
                                    <legend className="fieldset-legend">Please Enter Receiver Phone Number</legend>
                                    <input {...register('mobileNumber')} type="text" className="input w-full" placeholder="Type here" />
                                </fieldset>
                                {/* <button className='w-full btn'>Send Money</button> */}
                                <input type="submit" value="Send Money" className='btn w-full' />
                            </form>
                        </div>
                    </div>
                </dialog>

                 {/* Cash Out Modal */}
                 <button className="btn" onClick={() => document.getElementById('my_modal_2').showModal()}>Send Money</button>
                <dialog id="my_modal_2" className="modal">
                    <div className="modal-box">
                        <div className="modal-action w-full">
                            <form onSubmit={handleSubmit(handleSendMoney)} method="dialog" className='w-full'>
                                {/* if there is a button in form, it will close the modal */}
                                {/* <button className="btn w-full">Send</button> */}
                                <fieldset className="fieldset ">
                                    <legend className="fieldset-legend">Please Enter Receiver Phone Number</legend>
                                    <input {...register('mobileNumber')} type="text" className="input w-full" placeholder="Type here" />
                                </fieldset>
                                {/* <button className='w-full btn'>Send Money</button> */}
                                <input type="submit" value="Send Money" className='btn w-full' />
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>
        </div>
    );
};

export default DashboardHome;