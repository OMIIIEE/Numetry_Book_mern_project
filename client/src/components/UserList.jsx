import React, { useEffect, useState } from "react";
import axios from "axios";

const UserList = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const convertToIST = (utcDateString) => {
    const date = new Date(utcDateString);
    const istOffset = (6.5-12) * 60 * 60 * 1000; // IST offset in milliseconds
    const istTime = new Date(date.getTime() + istOffset);
    return istTime.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  };

  const renderLogs = (logs) => {
    if (!logs || logs.length === 0) return "No logs recorded";

    return logs.map((log, index) => {
      const loginTime = convertToIST(log.loginTime);
      const logoutTime = log.logoutTime
        ? convertToIST(log.logoutTime)
        : "Currently Logged In";
      return (
        <tr key={index} className="log-entry">
          <td className="border px-4 py-2">{loginTime}</td>
          <td className="border px-4 py-2">{logoutTime}</td>
        </tr>
      );
    });
  };

  return (
    <div className="relative flex items-center justify-center">
      <button
        onClick={toggleDropdown}
        className="inline-block px-6 py-1 bg-white text-[#5AB2FF] font-medium border-2 rounded hover:bg-[#5AB2FF] hover:text-white transition-colors duration-300"
      >
        Show User List
      </button>
      {isOpen && (
        <div className="absolute z-10 top-full bg-white shadow-lg rounded mt-1 overflow-y-auto max-h-90 w-[80rem]">
          <table className="min-w-full divide-y divide-gray-200 mt-4">
            <thead className="sticky top-0 bg-[#5AB2FF] z-20">
              <tr className="">
                <th className="py-2">Name</th>
                <th className="py-2">Username</th>
                <th className="py-2">Email</th>
                <th className="py-2">Phone</th>
                <th className="py-2">Login Time</th>
                <th className="py-2">Logout Time</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {user.map((user) => (
                <tr key={user._id} className="text-center">
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2">{user.username}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">{user.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap border" colSpan="2">
                    <div className="log-container overflow-y-auto max-h-20">
                      <table className="min-w-full divide-y divide-gray-200">
                        <tbody>{renderLogs(user.logs)}</tbody>
                      </table>
                    </div>
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

export default UserList;
