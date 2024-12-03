import React, { useState, useEffect } from "react";
import { RoleService } from "../services/API";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const roleData = await RoleService.getAllRoles();
        setRoles(roleData);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch roles", error);
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="min-h-screen p-6 bg-gray-100">
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">Role Management</h1>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="bg-white shadow-md rounded-lg">
                <table className="w-full">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="p-3 text-left">ID</th>
                      <th className="p-3 text-left">Name</th>
                      <th className="p-3 text-left">Permissions</th>
                      <th className="p-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roles.map((role) => (
                      <tr key={role.id} className="border-b">
                        <td className="p-3">{role.id}</td>
                        <td className="p-3">{role.name}</td>
                        <td className="p-3">
                          {role.permissions.map((perm) => (
                            <span
                              key={perm}
                              className="bg-blue-100 px-2 py-1 rounded mr-1 text-sm"
                            >
                              {perm}
                            </span>
                          ))}
                        </td>
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

export default RoleManagement;
