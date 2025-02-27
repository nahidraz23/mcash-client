import React, { useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const BalanceInquiryPage = () => {
    const axiosSecure = useAxiosSecure();
    const [balance, setBalance] = useState(null);
    const [revealed, setRevealed] = useState(false);

    const handleShowBalance = async () => {
        try {
            const response = await axiosSecure.get("/balance");
            setBalance(response.data?.balance);
            setRevealed(true);
            toast.success("Balance revealed!");
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to get balance");
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Balance Inquiry</h2>
            <div className="card bg-base-100 shadow-xl p-4">
                <div className="card-body">
                    <h3 className="card-title">Your Balance</h3>
                    {revealed ? (
                        <p className="text-xl font-bold">{balance} Taka</p>
                    ) : (
                        <p className="text-xl font-bold">••••••</p>
                    )}
                    <button onClick={handleShowBalance} className="btn btn-primary mt-4">
                        {revealed ? "Hide Balance" : "Show Balance"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BalanceInquiryPage;
