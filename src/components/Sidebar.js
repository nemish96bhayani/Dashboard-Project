import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const sidebarLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "User Management", path: "/user-management" },
    { name: "Role Management", path: "/role-management" },
  ];

  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      <ul>
        {sidebarLinks.map((link) => (
          <li key={link.name} className="mb-4">
            <Link
              to={link.path}
              className={`block p-2 rounded ${
                location.pathname === link.path
                  ? "bg-blue-600"
                  : "hover:bg-gray-700"
              }`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
