import {
  IoCubeOutline,
  IoSettingsOutline,
  IoCardOutline,
  IoHeartOutline,
  IoLogOutOutline,
  IoClose,
} from "react-icons/io5";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import FemaleAvatar from "./FemaleAvatar";
import MaleAvatar from "./MaleAvatar";

const NavHeader = ({ icon: Icon, children }) => (
  <h3 className="px-4 pt-4 pb-2 text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center">
    <Icon className="w-4 h-4 mr-2" />
    {children}
  </h3>
);

const Sidebar = ({ isOpen, onClose }) => {
  const { userDetails } = useSelector((state) => state.authentication);

  const linkClasses = ({ isActive }) =>
    `block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-50 hover:text-blue-600 ${
      isActive ? "bg-blue-50 text-blue-600 font-semibold" : "text-gray-600"
    }`;

  return (
    <div
      className={`fixed inset-y-0 left-0 bg-white shadow-lg w-72 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out z-50 
      lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto lg:z-auto lg:translate-x-0 lg:flex-shrink-0`}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 lg:hidden"
      >
        <IoClose size={24} />
      </button>

      <div className="flex items-center p-4 border-b border-gray-200">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
          {userDetails?.gender.toLowerCase() === "female" ? (
            <FemaleAvatar />
          ) : (
            <MaleAvatar />
          )}
        </div>

        <div className="ml-3">
          <p className="text-sm text-gray-500">Hello,</p>
          <p className="font-bold text-gray-800">{userDetails?.name}</p>
        </div>
      </div>

      <nav className="p-4 space-y-2">
        <NavLink
          onClick={onClose}
          to="orders"
          className={({ isActive }) =>
            `font-bold flex justify-between items-center text-gray-800 ${linkClasses(
              { isActive }
            )}`
          }
        >
          <span className="flex items-center">
            <IoCubeOutline className="w-5 h-5 mr-3" />
            MY ORDERS
          </span>
          <span>&gt;</span>
        </NavLink>

        <div className="border-t border-gray-200 pt-2">
          <NavHeader icon={IoSettingsOutline}>Account Settings</NavHeader>
          <NavLink onClick={onClose} to="profile" className={linkClasses}>
            Profile Information
          </NavLink>
          <NavLink onClick={onClose} to="addresses" className={linkClasses}>
            Manage Addresses
          </NavLink>
        </div>

        <div className="border-t border-gray-200 pt-2">
          <NavHeader icon={IoCardOutline}>Payments</NavHeader>
          <NavLink onClick={onClose} to="gift-cards" className={linkClasses}>
            Gift Cards
          </NavLink>
        </div>

        <div className="border-t border-gray-200 pt-2">
          <NavHeader icon={IoHeartOutline}>My Stuff</NavHeader>
          <NavLink onClick={onClose} to="reviews" className={linkClasses}>
            My Reviews & Ratings
          </NavLink>
          <NavLink onClick={onClose} to="notifications" className={linkClasses}>
            All Notifications
          </NavLink>
          <NavLink onClick={onClose} to="wishlist" className={linkClasses}>
            My Wishlist
          </NavLink>
        </div>

        <div className="border-t border-gray-200 pt-2">
          <a
            href="/logout"
            className="flex items-center p-4 text-gray-600 hover:text-red-600"
          >
            <IoLogOutOutline className="w-5 h-5 mr-3" />
            Logout
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
