import React from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const CashOutPage = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        try {
            const response = await axiosSecure.post("/transaction/cash-out", data);
            if (response.data?.message === "Cash-out successful") {
                toast.success("Cash-out successful!");
                reset();
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Cash-out Failed");
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Cash Out</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="label">Amount (Taka)</label>
                    <input
                        {...register("amount", { required: true, min: 1 })}
                        type="number"
                        placeholder="Enter amount"
                        className="input input-bordered w-full"
                    />
                </div>
                <div>
                    <label className="label">Agent Mobile</label>
                    <input
                        {...register("agentMobile", { required: true })}
                        type="text"
                        placeholder="Enter agent mobile"
                        className="input input-bordered w-full"
                    />
                </div>
                <div>
                    <label className="label">Your Account PIN</label>
                    <input
                        {...register("pin", { required: true })}
                        type="password"
                        placeholder="Enter your PIN"
                        className="input input-bordered w-full"
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Cash Out
                </button>
            </form>
        </div>
    );
};

export default CashOutPage;
