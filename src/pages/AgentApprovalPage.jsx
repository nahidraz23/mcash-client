import React, { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const AgentApprovalPage = () => {
    const axiosSecure = useAxiosSecure();
    const [agents, setAgents] = useState([]);

    const fetchAgents = async () => {
        try {
            const res = await axiosSecure.get("/admin/agent-approvals");
            setAgents(res.data.agents);
        } catch (err) {
            toast.error(
                err.response?.data?.message || "Failed to fetch agent approvals"
            );
        }
    };

    useEffect(() => {
        fetchAgents();
    }, [axiosSecure]);

    const handleApproval = async (email, approve) => {
        try {
            await axiosSecure.put(`/admin/agent-approve/${email}`, { approve });
            toast.success(
                `Agent ${approve ? "approved" : "rejected"} successfully`
            );
            fetchAgents();
        } catch (err) {
            toast.error(err.response?.data?.message || "Operation failed");
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Agent Approval</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Mobile</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {agents.map((agent) => (
                            <tr key={agent._id}>
                                <td>{agent.name}</td>
                                <td>{agent.mobile}</td>
                                <td>{agent.email}</td>
                                <td>{agent.status || "Pending"}</td>
                                <td>
                                    <button
                                        onClick={() => handleApproval(agent.email, true)}
                                        className="btn btn-success btn-sm mr-2"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => handleApproval(agent.email, false)}
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
        </div>
    );
};

export default AgentApprovalPage;
