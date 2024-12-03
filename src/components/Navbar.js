import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "User Management", path: "/user-management" },
    { name: "Role Management", path: "/role-management" },
  ];

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="text-xl font-bold">
          <Link to="/dashboard">My Dashboard</Link>
        </div>
        <ul className="flex space-x-6">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                className={`${
                  location.pathname === link.path ? "font-bold" : "font-normal"
                } hover:underline`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        <div>
          <button
            className="bg-red-500 px-4 py-2 rounded"
            onClick={() => alert("Logout functionality here")}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
