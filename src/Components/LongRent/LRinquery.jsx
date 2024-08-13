import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLongrentInquery } from '../../actions/LRentInquery';

export default function LRinquery() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.LRentInquery);

  React.useEffect(() => {
    dispatch(getLongrentInquery());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {data.map((item) => (
        <div key={item.inqueryID} className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-2">{item.fullName}</h2>
            <p className="text-gray-600 mb-4">{item.message}</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-500">Inquery ID</h3>
                <p className="text-gray-700">{item.inqueryID}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500">Username</h3>
                <p className="text-gray-700">{item.username}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500">Preferred Date</h3>
                <p className="text-gray-700">{item.preferredDate}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500">Preferred Time</h3>
                <p className="text-gray-700">{item.preferredTime}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500">Alternate Date</h3>
                <p className="text-gray-700">{item.alternateDate}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500">Alternate Time</h3>
                <p className="text-gray-700">{item.alternateTime}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500">Reply Status</h3>
                <p className={`text-gray-700 ${item.replyStatus === 'Pending' ? 'text-red-500' : 'text-green-500'}`}>{item.replyStatus}</p>
              </div>
            </div>
            {item.alertMsg && (
              <p className="mt-4 text-red-500 text-sm">{item.alertMsg}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
