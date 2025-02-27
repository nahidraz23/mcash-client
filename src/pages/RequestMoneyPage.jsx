import React from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const RequestMoneyPage = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    try {
      const response = await axiosSecure.post("/agent/request-money", data);
      if (response.data?.message === "Request submitted") {
        toast.success("Recharge request submitted successfully!");
        reset();
      } else {
        toast.error("Failed to submit recharge request");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Request failed");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Request Balance Recharge</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="label">Amount to Recharge (Taka)</label>
          <input
            {...register("amount", { required: true, min: 1 })}
            type="number"
            placeholder="Enter amount"
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="label">Your PIN</label>
          <input
            {...register("pin", { required: true })}
            type="password"
            placeholder="Enter your PIN"
            className="input input-bordered w-full"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Request Recharge
        </button>
      </form>
    </div>
  );
};

export default RequestMoneyPage;
