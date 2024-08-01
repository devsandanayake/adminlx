import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../actions/authAction';
import { Link } from 'react-router-dom';

export default function NavBar() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth); // Adjust this according to your Redux state structure

  const [inquiryCount, setInquiryCount] = useState(0);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  // Function to fetch the inquiry count
  const fetchInquiryCount = () => {
    // Simulate an API call or get from localStorage
    const count = localStorage.getItem('inqueryCount') || 0;
    setInquiryCount(count);
  };

  // Use useEffect to fetch the inquiry count initially and at regular intervals
  useEffect(() => {
    fetchInquiryCount();
    const interval = setInterval(fetchInquiryCount, 1000); // Update every 10 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">Admin Panel</div>
        <div className="flex items-center space-x-4">
          {!auth.isAuthenticated && (
            <button
              className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-700"
              onClick={() => { window.location = '/login'; }}
            >
              Login
            </button>
          )}
          {auth.isAuthenticated && (
            <>
              <Link className="text-white hover:text-gray-300" to="/">Home</Link>
              <Link className="text-white hover:text-gray-300 relative" to="/acInquery">
                Inquiries
                {inquiryCount > 0 && (
                  <span className="absolute -top-3 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                    {inquiryCount}
                  </span>
                )}
              </Link>
              <Link className="text-white hover:text-gray-300" to="/auction">Auction</Link>
              <Link className="text-white hover:text-gray-300" to="/userProfiles">User Management</Link>
              <button
                className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-700"
                onClick={handleLogout}
              >
                Logout
              </button>
              <div className="flex items-center space-x-2">
                <img
                  src={auth.user.profilePicture || 'https://via.placeholder.com/40'}
                  alt="User Profile"
                  className="w-10 h-10 rounded-full"
                />
                <span className="text-white">Admin</span>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
