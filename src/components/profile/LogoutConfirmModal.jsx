import React from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from "@headlessui/react";
import {
  IoWarningOutline,
  IoLogOutOutline,
  IoCloseOutline,
} from "react-icons/io5";
import { logoutFromOtherDevice, logoutUser } from "../../store/actions";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

const LogoutConfirmModal = ({
  isOpen,
  setIsOpen,
  ipAddress,
  deviceName,
  sessionId,
  isLoggingOut = false,
  isCurrentSession,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleConfirmLogout = () => {
    if (!isCurrentSession) {
      dispatch(logoutFromOtherDevice(sessionId));
      setIsOpen(false);
    } else {
      dispatch(logoutUser(navigate));
    }
  };
  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        setIsOpen(false);
      }}
      className="relative z-50"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ease-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel
          transition
          className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          <DialogTitle
            as="h3"
            className="text-lg font-bold leading-6 text-gray-900 flex items-center gap-2"
          >
            <IoWarningOutline className="h-6 w-6 text-red-500" />
            Confirm Logout
          </DialogTitle>
          {isCurrentSession ? (
            <div className="mt-4 text-sm text-red-600 font-medium">
              Are you sure you want to end your current active session?
            </div>
          ) : (
            <div className="mt-4">
              <p className="text-sm text-gray-500 mb-4">
                Are you sure you want to end this session?
              </p>

              <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 text-sm text-gray-700 space-y-2">
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-500">Device:</span>
                  <span
                    className="truncate font-medium ml-4"
                    title={deviceName}
                  >
                    {deviceName}
                  </span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-2 mt-2">
                  <span className="font-semibold text-gray-500">
                    IP Address:
                  </span>
                  <span className="font-mono font-medium">{ipAddress}</span>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 flex gap-3 justify-end">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
              onClick={() => {
                setIsOpen(false);
              }}
              disabled={isLoggingOut}
            >
              <IoCloseOutline className="h-5 w-5" />
              Cancel
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:bg-red-400 disabled:cursor-not-allowed min-w-[100px]"
              onClick={handleConfirmLogout}
              disabled={isLoggingOut}
            >
              {isLoggingOut ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <>
                  <IoLogOutOutline className="h-5 w-5" />
                  Logout
                </>
              )}
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default LogoutConfirmModal;
