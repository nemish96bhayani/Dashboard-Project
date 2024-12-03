import React from "react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="min-h-screen p-6 bg-gray-100">
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl mb-4">
                Welcome, {user?.firstName || "User"}
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-100 p-4 rounded">
                  <h3 className="font-semibold">Total Users</h3>
                  <p className="text-2xl">10</p>
                </div>
                <div className="bg-green-100 p-4 rounded">
                  <h3 className="font-semibold">Active Roles</h3>
                  <p className="text-2xl">5</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
