import React, { useState, useEffect } from "react";
import { UserService } from "../services/API";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await UserService.getAllUsers();
        setUsers(userData);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch users", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="min-h-screen p-6 bg-gray-100">
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">User Management</h1>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="bg-white shadow-md rounded-lg">
                <table className="w-full">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="p-3 text-left">ID</th>
                      <th className="p-3 text-left">Name</th>
                      <th className="p-3 text-left">Email</th>
                      <th className="p-3 text-left">Role</th>
                      <th className="p-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b">
                        <td className="p-3">{user.id}</td>
                        <td className="p-3">
                          {user.firstName} {user.lastName}
                        </td>
                        <td className="p-3">{user.email}</td>
                        <td className="p-3">{user.role}</td>
                        <td className="p-3">
                          <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">
                            Edit
                          </button>
                          <button className="bg-red-500 text-white px-2 py-1 rounded">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
