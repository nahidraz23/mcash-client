import React, { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const AdminUserManagementPage = () => {
    const axiosSecure = useAxiosSecure();
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    const fetchUsers = async () => {
        try {
            const res = await axiosSecure.get("/api/admin/users");
            setUsers(res.data.users);
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to fetch users");
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [axiosSecure]);

    const handleBlock = async (email) => {
        try {
            await axiosSecure.put(`/admin/block/${email}`);
            toast.success("User blocked successfully");
            fetchUsers();
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to block user");
        }
    };

    const filteredUsers = users.filter((u) =>
        u.mobile.includes(search)
    );

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">User Management</h2>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by mobile number"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="input input-bordered w-full"
                />
            </div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Mobile</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Balance</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((u) => (
                            <tr key={u._id}>
                                <td>{u.name}</td>
                                <td>{u.mobile}</td>
                                <td>{u.email}</td>
                                <td>{u.role}</td>
                                <td>{u.balance}</td>
                                <td>
                                    <button
                                        onClick={() => handleBlock(u.email)}
                                        className="btn btn-error btn-sm"
                                    >
                                        Block
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

export default AdminUserManagementPage;
