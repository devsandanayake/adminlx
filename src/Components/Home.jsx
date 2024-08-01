import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../actions/postAction';
import { approvelPost } from '../actions/approvelAction';

const App = () => {
  const dispatch = useDispatch();
  const dataState = useSelector((state) => state.data);
  const [activeTab, setActiveTab] = useState('pending');

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const pendingCount = dataState.data.filter((post) => post.status === 0).length;

  const renderPosts = (status) => {
    return dataState.data
      .filter((post) => post.status === status)
      .map((post) => (
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
              onClick={() => dispatch(approvelPost(post.adCode, 1))}
            >
              Approve
            </button>
            )}
            <button
              className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
              onClick={() => dispatch(approvelPost(post.adCode, 2))}
            >
              Reject
            </button>
          </div>

        </li>
      ));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {dataState.loading && <p className="text-blue-600">Loading...</p>}
      {dataState.error && <p className="text-red-600">Error: {dataState.error}</p>}

      <div className="flex space-x-4 mb-4">
        <button
          className={`py-2 px-4 rounded ${activeTab === 'pending' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('pending')}
        >
          Pending
          {pendingCount > 0 && <span className="bg-red-500 text-white rounded-full px-2 ml-2">{pendingCount}</span>}
        </button>
        <button
          className={`py-2 px-4 rounded ${activeTab === 'approved' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('approved')}
        >
          Approved
        </button>
        <button
          className={`py-2 px-4 rounded ${activeTab === 'rejected' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('rejected')}
        >
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
