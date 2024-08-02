import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userPostAds } from '../../actions/userAction';
import { approvelPost } from '../../actions/approvelAction';

export default function UserAds() {
  const { username } = useParams();  
  const dispatch = useDispatch();
  const userADS = useSelector((state) => state.user); // Assuming 'ads' is stored under 'user'
  const [activeTab, setActiveTab] = React.useState('pending');
  React.useEffect(() => {
    dispatch(userPostAds(username));
  }, [dispatch, username]);

  const pendingCount = userADS.data.filter((post) => post.status === 0).length;


  const renderPosts = (status) => {
    return userADS.data 
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
          {activeTab !== 'rejected' && (
          <button
            className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
            onClick={() => dispatch(approvelPost(post.adCode, 2))}
          >
            Reject
          </button>
          )}
        </div>

      </li>
    ));
};

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="flex space-x-4 mb-4">
        <button
          className={`py-2 px-4 rounded ${activeTab === 'pending' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('pending')}
        >
          Pending
          {pendingCount > 0 && <span className="bg-red-500 text-white rounded-full px-2 ml-2">{pendingCount}</span>}
        </button>
        <button
          className={`py-2 px-4 rounded ${activeTab === 'approved' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('approved')}
        >
          Approved
        </button>
        <button
          className={`py-2 px-4 rounded ${activeTab === 'rejected' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
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

}
