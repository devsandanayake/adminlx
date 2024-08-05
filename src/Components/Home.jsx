import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../actions/postAction';
import { approvelPost } from '../actions/approvelAction';
import { FaHome, FaBuilding, FaExchangeAlt, FaGavel } from 'react-icons/fa';
import { FaHourglassHalf, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';


const App = () => {
  const dispatch = useDispatch();
  const dataState = useSelector((state) => state.data);
  const [activeTab, setActiveTab] = useState('pending');
  const [transactionType, setTractionType] = useState(1); // 1: Rent, 2: Short Term Rent, 3: Auction

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  
   
  const pendingCount = dataState.data.filter((post) => post.status === 0 && parseInt(post.transactionType) === 1).length;

  const renderPosts = (status) => {
    return dataState.data
      .filter((post) => post.status === status && parseInt(post.transactionType) === transactionType)
      .map((post) => (
            <button className='p-2 w-72' onClick={() => {
              window.location = `/adsPage/view/${post.adCode}`;  
            }}>
        <li key={post.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">{post.title}</h3>
            <p className={`mt-2 ${post.status === 1 ? 'text-green-500' : post.status === 2 ? 'text-red-500' : 'text-yellow-500'}`}>
              {post.status === 1 ? 'Approved' : post.status === 2 ? 'Rejected' : 'Pending'}
            </p>
          </div>
         <div className="flex space-x-2">
            {activeTab !== 'approved' && (
              <button
                className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(approvelPost(post.adCode, 1));
                }}
              >
                Approve
              </button>
            )}
            <button
              className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
              onClick={(e) => {
                e.stopPropagation();
                dispatch(approvelPost(post.adCode, 2));
              }}
            >
              Reject
            </button>
          </div>
        </li>
        </button>
       
      ));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className='text-2xl font-semibold'>Advertisement</h1>
      <p className='mb-2 text-gray-600 cursor-pointer'>Home / Advertisement</p>
      {dataState.loading && <p className="text-blue-600">Loading...</p>}
      {dataState.error && <p className="text-red-600">Error: {dataState.error}</p>}

      <div className="flex space-x-4 mb-4">
          <button
            className={`flex items-center py-2 px-4 rounded ${transactionType === 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setTractionType(1)}
          >
            <FaHome className="mr-2" />
            Short Term Rent
          </button>
          <button
            className={`flex items-center py-2 px-4 rounded ${transactionType === 2 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setTractionType(2)}
          >
            <FaBuilding className="mr-2" />
            Long Term Rent
          </button>
          <button
            className={`flex items-center py-2 px-4 rounded ${transactionType === 3 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setTractionType(3)}
          >
            <FaExchangeAlt className="mr-2" />
            Short Term/Long Term
          </button>
          <button
            className={`flex items-center py-2 px-4 rounded ${transactionType === 4 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setTractionType(4)}
          >
            <FaGavel className="mr-2" />
            Auction
          </button>
        </div>

        <div className="flex space-x-4 mb-4">
  <button
    className={`flex items-center py-2 px-4 rounded ${activeTab === 'pending' ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
    onClick={() => setActiveTab('pending')}
  >
    <FaHourglassHalf className="mr-2" />
    Pending
    {pendingCount > 0 && <span className="bg-red-500 text-white rounded-full px-2 ml-2">{pendingCount}</span>}
  </button>
  <button
    className={`flex items-center py-2 px-4 rounded ${activeTab === 'approved' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
    onClick={() => setActiveTab('approved')}
  >
    <FaCheckCircle className="mr-2" />
    Approved
  </button>
  <button
    className={`flex items-center py-2 px-4 rounded ${activeTab === 'rejected' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
    onClick={() => setActiveTab('rejected')}
  >
    <FaTimesCircle className="mr-2" />
    Rejected
  </button>
</div>

      <ul className="space-y-4">
        {activeTab === 'pending' && renderPosts(0)}
        {activeTab === 'approved' && renderPosts(1)}
        {activeTab === 'rejected' && renderPosts(2)}
      </ul>
    </div>
  );
};

export default App;
