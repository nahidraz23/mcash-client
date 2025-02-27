import React, { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const AdminRechargeRequests = () => {
    const [requests, setRequests] = useState([]);
    const axiosSecure = useAxiosSecure();

    const fetchRequests = async () => {
        try {
            const response = await axiosSecure.get("/admin/recharge-requests");
            setRequests(response.data.requests);
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to fetch requests"
            );
        }
    };

    useEffect(() => {
        fetchRequests();
    }, [axiosSecure]);

    const handleDecision = async (requestId, approve) => {
        try {
            const response = await axiosSecure.put(
                `/admin/recharge-requests/${requestId}`,
                { approve }
            );
            toast.success(response.data.message);
            fetchRequests();
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to process the request"
            );
        }
    };

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">Recharge Requests</h2>
            {requests.length === 0 ? (
                <p>No pending requests.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Request ID</th>
                                <th>Agent ID</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Submitted At</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((req) => (
                                <tr key={req.requestId}>
                                    <td>{req.requestId}</td>
                                    <td>{req.agentId}</td>
                                    <td>{req.amount}</td>
                                    <td>{req.status}</td>
                                    <td>{new Date(req.createdAt).toLocaleString()}</td>
                                    <td>
                                        <button
                                            onClick={() => handleDecision(req.requestId, true)}
                                            className="btn btn-success btn-sm mr-2"
                                        >
                                            Accept
                                        </button>
                                        <button
                                            onClick={() => handleDecision(req.requestId, false)}
                                            className="btn btn-error btn-sm"
                                        >
                                            Reject
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminRechargeRequests;
