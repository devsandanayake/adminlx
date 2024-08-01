import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../actions/userAction';

export default function UserProfiles() {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState('user');

  const fetchUser = () => {
    dispatch(getUser());
  };

  React.useEffect(() => {
    fetchUser();
  }, [dispatch]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6 text-center">User Profiles</h1>
      <div className="flex justify-center mb-6">
        <button
          onClick={() => handleTabChange('user')}
          className={`px-4 py-2 mx-2 font-semibold rounded-lg ${
            activeTab === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          Registered Users
        </button>
        <button
          onClick={() => handleTabChange('admin')}
          className={`px-4 py-2 mx-2 font-semibold rounded-lg ${
            activeTab === 'admin' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          Admin Accounts
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {userState.data
          .filter((user) => (activeTab === 'user' ? user.role !== 'admin' : user.role === 'admin'))
          .map((user, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-6">
              <div className="mb-4">
                <span className="font-bold">Username:</span> {user.username}
              </div>
              <div className="mb-4">
                <span className="font-bold">Email:</span> {user.email}
              </div>
              {activeTab === 'admin' && (
              <div className="mb-4">
                <span className="font-bold">Role:</span> {user.role}
              </div>
              )}

              {activeTab === 'user' && (
                <div className="flex justify-end space-x-2">
                  <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition duration-200"
                  onClick={()=>{
                    const handleClick = ()=>{
                      window.location = `/userAds/${user.username}`;
                    }
                    handleClick();
                  }}>
                    View Advertisements
                  </button>
                  <button className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition duration-200">
                    View Auction Details
                  </button>
                  <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition duration-200">
                    View Inquiry
                  </button>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
