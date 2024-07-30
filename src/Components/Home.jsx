import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../actions/postAction';
import { approvelPost } from '../actions/approvelAction';

const App = () => {
  const dispatch = useDispatch();
  const dataState = useSelector(state => state.data);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {dataState.loading && <p className="text-blue-600">Loading...</p>}
      {dataState.error && <p className="text-red-600">Error: {dataState.error}</p>}
      <ul className="space-y-4">
        {dataState.data &&
          dataState.data.map((post) => (
            <li
              key={post.id}
              className="bg-white p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold">{post.title}</h3>
                <p className={`mt-2 ${post.status === 1 ? 'text-green-500' : 'text-red-500'}`}>
                  {post.status === 1 ? 'Approved' : 'Rejected'}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
                  onClick={() => dispatch(approvelPost(post.adCode, 1))}
                >
                  Approve
                </button>
                <button
                  className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                  onClick={() => dispatch(approvelPost(post.adCode, 0))}
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default App;
