import React, { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const TransactionHistoryPage = () => {
    const axiosSecure = useAxiosSecure();
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const res = await axiosSecure.get("/transaction/history");
                setTransactions(res.data?.transactions);
            } catch (err) {
                toast.error(
                    err.response?.data?.message || "Failed to fetch transactions"
                );
            }
        };

        fetchTransactions();
    }, [axiosSecure]);

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Transaction History</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Transaction ID</th>
                            <th>Type</th>
                            <th>Amount</th>
                            <th>Fee</th>
                            <th>Date</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((t) => (
                            <tr key={t.transactionId}>
                                <td>{t.transactionId}</td>
                                <td>{t.type}</td>
                                <td>{t.amount}</td>
                                <td>{t.fee}</td>
                                <td>{new Date(t.date).toLocaleString()}</td>
                                <td>{t.details}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TransactionHistoryPage;
