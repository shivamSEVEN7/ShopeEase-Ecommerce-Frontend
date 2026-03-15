import React from "react";
import {
  FiPackage,
  FiTruck,
  FiCheckCircle,
  FiCornerUpLeft,
} from "react-icons/fi";

// Define all possible steps
const allTrackerSteps = [
  { key: "CONFIRMED", displayText: "Ordered", icon: <FiPackage /> },
  { key: "PROCESSING", displayText: "Packed", icon: <FiPackage /> },
  { key: "SHIPPED", displayText: "Shipped", icon: <FiTruck /> },
  { key: "DELIVERED", displayText: "Delivered", icon: <FiCheckCircle /> },
];

const returnedStep = {
  key: "RETURNED",
  displayText: "Returned",
  icon: <FiCornerUpLeft />,
};

const OrderStatusTracker = ({ currentStatus }) => {
  // --- FIX 1: Conditionally build the steps to display ---
  let stepsToDisplay = [...allTrackerSteps];
  // Only add the 'Returned' step if the current status is 'RETURNED'
  if (currentStatus === "RETURNED") {
    stepsToDisplay.push(returnedStep);
  }

  const currentIndex = stepsToDisplay.findIndex(
    (step) => step.key === currentStatus
  );

  if (currentIndex === -1) {
    return null;
  }

  return (
    <div className="flex flex-col md:flex-row md:justify-between w-full items-start md:items-center">
      {stepsToDisplay.map((step, index) => {
        const isCompleted = index <= currentIndex;
        const isCurrent = index === currentIndex;

        return (
          <React.Fragment key={step.key}>
            {/* --- FIX 2: Corrected width for desktop view --- */}
            {/* Changed 'w-full' to 'md:w-auto' to allow lines to have space */}
            <div className="flex items-center md:flex-col w-full md:w-auto">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0 ${
                  isCompleted
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {step.icon}
              </div>
              <div className="ml-4 md:ml-0 md:mt-2 text-left md:text-center">
                <p
                  className={`font-medium text-sm ${
                    isCurrent ? "text-gray-900" : "text-gray-600"
                  }`}
                >
                  {step.displayText}
                </p>
              </div>
            </div>

            {/* Connecting lines */}
            {index < stepsToDisplay.length - 1 && (
              <>
                <div className="ml-5 md:hidden h-16 w-px bg-gray-200"></div>
                <div className="hidden md:flex flex-1 h-px bg-gray-200 mx-4 self-start mt-5"></div>
              </>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default OrderStatusTracker;
