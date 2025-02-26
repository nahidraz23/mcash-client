import React from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const CashInPage = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        console.log(data);
        try {
            const response = await axiosSecure.post("/transaction/cash-in", data);
            if (response.data?.message === "Cash-in successful") {
                toast.success("Cash-in successful!");
                reset();
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Cash-in Failed");
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Cash In</h2>
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
                    <label className="label">User Mobile</label>
                    <input
                        {...register("userMobile", { required: true })}
                        type="text"
                        placeholder="Enter agent mobile"
                        className="input input-bordered w-full"
                    />
                </div>
                <div>
                    <label className="label">Agent PIN</label>
                    <input
                        {...register("agentPin", { required: true })}
                        type="password"
                        placeholder="Enter agent PIN"
                        className="input input-bordered w-full"
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Cash In
                </button>
            </form>
        </div>
    );
};

export default CashInPage;
