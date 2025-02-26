import React from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const SendMoneyPage = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        try {
            const response = await axiosSecure.post("/transaction/send", data);
            if (response.data?.message === "Transaction successful") {
                toast.success("Money sent successfully!");
                reset();
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Send Money Failed");
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Send Money</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="label">Recipient Mobile</label>
                    <input
                        {...register("recipientMobile", { required: true })}
                        type="text"
                        placeholder="Enter recipient mobile"
                        className="input input-bordered w-full"
                    />
                </div>
                <div>
                    <label className="label">Amount (Taka)</label>
                    <input
                        {...register("amount", { required: true, min: 50 })}
                        type="number"
                        placeholder="Enter amount (min 50)"
                        className="input input-bordered w-full"
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Send Money
                </button>
            </form>
        </div>
    );
};

export default SendMoneyPage;
