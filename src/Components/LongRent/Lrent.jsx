import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { longrentGet } from '../../actions/longrentAction';
import { fetchData } from '../../actions/postAction';

export default function Lrent() {
  const dispatch = useDispatch();
  const longrentState = useSelector((state) => state.longrent);
  const postState = useSelector((state) => state.data);

  // Filter only longrent data
  const LongrentData = postState.data.filter((item) => item.transactionType === 2);
  console.log("test", LongrentData);

  const pendingCount = longrentState.data.filter((item) => item.adminKeyStatus === "Pending").length;

  console.log('pending', pendingCount);

  localStorage.setItem('pendingLRCount', pendingCount);

  React.useEffect(() => {
    dispatch(longrentGet());
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Long Rent</h1>
      <div className="grid grid-cols-1 gap-4">
        {LongrentData.map((item) => {
          const pendingCount = longrentState.data.filter(
            (lrItem) => lrItem.adCode === item.adCode && lrItem.adminKeyStatus === "Pending"
          ).length;
          return (
            <div key={item.id} className="relative p-4 bg-white rounded-lg shadow-md w-1/4">
              {pendingCount > 0 && (
                <div className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                  {pendingCount}
                </div>
              )}
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-sm">Pending Count: {pendingCount}</p>
              <button
                className="mt-2 px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
                onClick={() => window.location = `/viewLongrent/${item.adCode}`}
              >
                View
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}