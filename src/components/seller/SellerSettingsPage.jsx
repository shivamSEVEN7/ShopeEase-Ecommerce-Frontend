import React from "react";
import { FiUser, FiBriefcase, FiCreditCard, FiLock } from "react-icons/fi";

// Dummy data (replace with actual fetched data)
const sellerSettings = {
  profile: {
    name: "Acme Inc.",
    email: "contact@acme.com",
    phone: "+91 9876543210",
    address: "123 Business Rd, Patna, Bihar 800001",
  },
  business: {
    businessName: "Acme Innovations Inc.",
    gstNumber: "22AAAAA0000A1Z5",
    panNumber: "ABCDE1234F",
  },
  bank: {
    accountNumber: "**** **** **** 1234",
    ifscCode: "SBIN000XXXX",
    bankName: "State Bank of India",
  },
};

// --- Main Settings Page Component ---
const SellerSettingsPage = () => {
  // In a real app, you'd use state to manage the active tab
  const activeTab = "Profile"; // Example: Default to Profile

  return (
    <>
      <h1 className="mb-6 text-3xl font-bold text-gray-800">Settings</h1>

      <div className="rounded-lg bg-white shadow-sm">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
            <TabLink
              icon={<FiUser />}
              text="Profile"
              active={activeTab === "Profile"}
            />
            <TabLink
              icon={<FiBriefcase />}
              text="Business Details"
              active={activeTab === "Business"}
            />
            <TabLink
              icon={<FiCreditCard />}
              text="Bank Account"
              active={activeTab === "Bank"}
            />
            <TabLink
              icon={<FiLock />}
              text="Security"
              active={activeTab === "Security"}
            />
          </nav>
        </div>

        {/* Tab Content Area */}
        <div className="p-6">
          {/* Conditionally render content based on activeTab */}
          {activeTab === "Profile" && (
            <SettingsSection title="Store Profile">
              <SettingItem
                label="Store Name"
                value={sellerSettings.profile.name}
              />
              <SettingItem
                label="Contact Email"
                value={sellerSettings.profile.email}
              />
              <SettingItem
                label="Contact Phone"
                value={sellerSettings.profile.phone}
              />
              <SettingItem
                label="Business Address"
                value={sellerSettings.profile.address}
                multiline
              />
            </SettingsSection>
          )}

          {activeTab === "Business" && (
            <SettingsSection title="Business Information">
              <SettingItem
                label="Legal Business Name"
                value={sellerSettings.business.businessName}
              />
              <SettingItem
                label="GST Number"
                value={sellerSettings.business.gstNumber}
              />
              <SettingItem
                label="PAN Number"
                value={sellerSettings.business.panNumber}
              />
            </SettingsSection>
          )}

          {activeTab === "Bank" && (
            <SettingsSection title="Bank Account Details">
              <SettingItem
                label="Account Number"
                value={sellerSettings.bank.accountNumber}
              />
              <SettingItem
                label="IFSC Code"
                value={sellerSettings.bank.ifscCode}
              />
              <SettingItem
                label="Bank Name"
                value={sellerSettings.bank.bankName}
              />
            </SettingsSection>
          )}

          {activeTab === "Security" && (
            <SettingsSection title="Security Settings">
              {/* Placeholder for change password form */}
              <p className="text-gray-600">
                Change your account password here.
              </p>
              <button className="mt-4 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                Change Password
              </button>
            </SettingsSection>
          )}

          {/* General Edit Button (could be specific per section) */}
          <div className="mt-8 border-t pt-6 text-right">
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Edit Information
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// --- Helper Components ---

const TabLink = ({ icon, text, active }) => (
  <a
    href="#" // In a real app, use state setter onClick or routing
    className={`flex items-center whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${
      active
        ? "border-indigo-500 text-indigo-600"
        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
    }`}
  >
    {React.cloneElement(icon, {
      className: `mr-2 h-5 w-5 ${active ? "text-indigo-500" : "text-gray-400"}`,
    })}
    {text}
  </a>
);

const SettingsSection = ({ title, children }) => (
  <div>
    <h2 className="mb-4 text-xl font-semibold text-gray-800">{title}</h2>
    <dl className="space-y-4">{children}</dl>
  </div>
);

const SettingItem = ({ label, value, multiline = false }) => (
  <div className="grid grid-cols-1 gap-1 sm:grid-cols-3 sm:gap-4">
    <dt className="text-sm font-medium text-gray-500">{label}</dt>
    <dd
      className={`mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 ${
        multiline ? "whitespace-pre-wrap" : ""
      }`}
    >
      {value}
    </dd>
  </div>
);

export default SellerSettingsPage;
