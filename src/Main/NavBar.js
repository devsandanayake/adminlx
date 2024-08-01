import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../actions/authAction';
import { Link } from 'react-router-dom';
import { FaHome, FaInbox, FaGavel, FaUsers, FaSignOutAlt, FaSignInAlt, FaUserCircle } from 'react-icons/fa';

export default function Sidebar() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [inquiryCount, setInquiryCount] = useState(0);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const fetchInquiryCount = () => {
    const count = localStorage.getItem('inqueryCount') || 0;
    setInquiryCount(count);
  };

  useEffect(() => {
    fetchInquiryCount();
    const interval = setInterval(fetchInquiryCount, 10000); // Update every 10 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen flex flex-col bg-gray-800 text-white w-64 fixed">
      <div className="p-4 text-lg font-bold flex">
        <span className="mt-2">Admin Panel</span>
        <div className="ml-14">
          <img
            src={auth.user.profilePicture || 'https://th.bing.com/th/id/OIP.OdQQJxf0UFikV_SreFYyoQAAAA?rs=1&pid=ImgDetMain'}
            alt="User Profile"
            className="w-10 h-10 rounded-full"
          />
        </div>
      </div>
      <div className="flex flex-col flex-grow p-4 space-y-4">
        {!auth.isAuthenticated && (
          <button
            className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-700 flex items-center"
            onClick={() => { window.location = '/login'; }}
          >
            <FaSignInAlt className="mr-2" />
            Login
          </button>
        )}
        {auth.isAuthenticated && (
          <>
            <Link className="hover:text-gray-300 flex items-center" to="/">
              <FaHome className="mr-2" />
              Home
            </Link>
            <Link className="hover:text-gray-300 relative flex items-center" to="/acInquery">
              <FaInbox className="mr-2" />
              Inquiries
              {inquiryCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                  {inquiryCount}
                </span>
              )}
            </Link>
            <Link className="hover:text-gray-300 flex items-center" to="/auction">
              <FaGavel className="mr-2" />
              Auction
            </Link>
            <Link className="hover:text-gray-300 flex items-center" to="/userProfiles">
              <FaUsers className="mr-2" />
              User Management
            </Link>
            <button
              className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-700 flex items-center"
              onClick={handleLogout}
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          </>
        )}
      </div>
      <p className="text-center text-lg font-semibold text-gray-700 mt-4">
  Effective Solution Pvt
</p>
    </div>
  );
}
