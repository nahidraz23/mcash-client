import React, { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { AuthContext } from "../provider/Auth";
import { useQuery } from "@tanstack/react-query";

const TransactionHistoryPage = () => {
    const { user } = useContext(AuthContext)
    console.log(user);
    const axiosSecure = useAxiosSecure();
 
    const { data: transactions = [], isLoading, error, refetch } = useQuery({
        queryKey: ['transactions', user?.role],
        queryFn: async () => {
            let res;
            if (user?.role === 'admin') {
                res = await axiosSecure.get('/admin/transactionhistory');
            } else {
                res = await axiosSecure.get('/transaction/history');
            }
            return res.data?.transactions;
        },
        enabled: !!axiosSecure && !!user,
        onError: (err) => {
            toast.error(err.response?.data?.message || 'Failed to fetch transactions');
        }
    });

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
                                <td>{t.amountInt}</td>
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
