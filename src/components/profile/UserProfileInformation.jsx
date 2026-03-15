import React, { useState } from "react";
import { FiMonitor, FiSmartphone } from "react-icons/fi";
import { useSelector } from "react-redux";
import UserProfileInformationSkeleton from "./UserProfileInformationSkelton";
import LogoutConfirmModal from "./LogoutConfirmModal";

function formatLoginTimestamp(dateString) {
  const validISOString = dateString.replace(" ", "T");
  const loginDate = new Date(validISOString);

  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  const timeString = loginDate.toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  let datePart;
  if (loginDate.toDateString() === today.toDateString()) {
    datePart = "Today";
  } else if (loginDate.toDateString() === yesterday.toDateString()) {
    datePart = "Yesterday";
  } else {
    datePart = loginDate.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  return `${datePart} at ${timeString}`;
}

const UserProfileInformation = () => {
  let [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const { userDetails } = useSelector((state) => state.authentication);
  const [selectedSession, setSelectedSession] = useState(null);

  const handleLogoutClick = (id, ip, device, current) => {
    setIsLogoutModalOpen(true);
    setSelectedSession({
      ipAddress: ip,
      deviceInfo: device,
      sessionId: id,
      isCurrentSession: current,
    });
  };

  return userDetails === null ? (
    <UserProfileInformationSkeleton />
  ) : (
    <div className="min-h-full bg-white rounded-lg shadow-lg p-6 md:p-8">
      {/* --- Section 1: Account Information --- */}
      <div className="flex justify-between items-center pb-5">
        <h1 className="text-2xl font-bold text-gray-800">
          Account Information
        </h1>
        <button className="px-5 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
          Edit
        </button>
      </div>

      {/* UPDATED: Two-column grid for user details */}
      <div className="border-t border-gray-200 pt-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        <div>
          <p className="text-sm font-medium text-gray-500">Full Name</p>
          <p className="mt-1 text-gray-900">{userDetails.name}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Email address</p>
          <p className="mt-1 text-gray-900">{userDetails.email}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Username</p>
          <p className="mt-1 text-gray-900">{userDetails.username}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Mobile Number</p>
          <p className="mt-1 text-gray-900">{userDetails.mobileNumber}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Gender</p>
          <p className="mt-1 text-gray-900">{userDetails.gender}</p>
        </div>
      </div>

      {/* --- UPDATED: Modern Section Divider --- */}
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-4 text-sm font-medium text-gray-500">
            Active Sessions
          </span>
        </div>
      </div>

      {/* --- Section 2: Active Sessions --- */}
      <div className="space-y-4">
        {userDetails.activeSessions.map((session) => (
          // UPDATED: Fully responsive flex layout
          <div
            key={session.id}
            className="p-4 bg-gray-50 rounded-lg border border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <div className="flex items-center">
              <div className="text-gray-500 mr-4 flex-shrink-0">
                {session.deviceType === "Desktop" ? (
                  <FiMonitor size={24} />
                ) : (
                  <FiSmartphone size={24} />
                )}
              </div>
              <div>
                <p className="font-semibold text-gray-900">
                  {session.deviceInfo}
                </p>
                <p className="text-sm text-gray-500">
                  {session.ipAddress} •{" "}
                  {formatLoginTimestamp(session.loginTime)}
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                handleLogoutClick(
                  session.id,
                  session.ipAddress,
                  session.deviceInfo,
                  session.currentSession
                );
              }}
              className="px-4 py-2 border border-red-300 text-red-600 text-sm font-semibold rounded-lg hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-400 flex-shrink-0"
            >
              Logout
            </button>
          </div>
        ))}
      </div>
      <LogoutConfirmModal
        isOpen={isLogoutModalOpen}
        setIsOpen={setIsLogoutModalOpen}
        ipAddress={selectedSession?.ipAddress}
        deviceName={selectedSession?.deviceInfo}
        sessionId={selectedSession?.sessionId}
        isCurrentSession={selectedSession?.isCurrentSession}
      />
    </div>
  );
};

export default UserProfileInformation;
