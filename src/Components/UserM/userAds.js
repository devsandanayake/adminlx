import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userPostAds } from '../../actions/userAction';

export default function UserAds() {
  const { username } = useParams();  
  const dispatch = useDispatch();
  const userADS = useSelector((state) => state.user); // Assuming 'ads' is stored under 'user'

  React.useEffect(() => {
    dispatch(userPostAds(username));
  }, [dispatch, username]);

   
  return (
    <div className="container mx-auto p-4">
      {Array.isArray(userADS.data) && userADS.data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {userADS.data.map((ad) => (
            <div key={ad._id} className="max-w-sm rounded overflow-hidden shadow-lg">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{ad.title}</div>
                <p className="text-gray-700 text-base">{ad.description}</p>
              </div>
              <div className="px-6 py-4">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                  {ad.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No ads found.</p>
      )}
    </div>
  );
}
