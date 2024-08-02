import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataSpecific } from '../../actions/postAction';
import { approvelPost } from '../../actions/approvelAction';



export default function Adspage() {
  const { adCode } = useParams();
  const dispatch = useDispatch();
  const postState = useSelector(state => state.data);

  React.useEffect(() => {
    dispatch(fetchDataSpecific(adCode));
  }, [dispatch, adCode]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Advertisement Details</h1>
      <div className="flex space-x-2">
             
             <button
               className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
               onClick={(e) => {
                 e.stopPropagation();
                 dispatch(approvelPost(adCode, 1));
               }}
             >
               Approve
             </button>
          
           <button
             className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
             onClick={(e) => {
               e.stopPropagation();
               dispatch(approvelPost(adCode, 2));
             }}
           >
             Reject
           </button>
           </div>
      {postState.loading && <p className="text-blue-600">Loading...</p>}
      {postState.error && <p className="text-red-600">Error: {postState.error}</p>}
      {postState.data && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-2">{postState.data.title}</h2>
          <p className="text-gray-600 mb-4">{postState.data.description}</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold">Details</h3>
              <ul className="list-disc pl-5">
                <li><strong>Bedrooms:</strong> {postState.data.bedroomCount}</li>
                <li><strong>Bathrooms:</strong> {postState.data.bathroomCount}</li>
                <li><strong>Floor:</strong> {postState.data.floor}</li>
                <li><strong>Area Size:</strong> {postState.data.areaSize} sq ft</li>
                <li><strong>Price:</strong> {postState.data.price} {postState.data.currency}</li>
                <li><strong>Transaction Type:</strong> {postState.data.transactionType}</li>
                <li>
                  <strong>Status:</strong> 
                  <span className={
                    postState.data.status === 1 ? 'text-green-500 font-extrabold ml-3' : 
                    postState.data.status === 2 ? 'text-red-500 font-extrabold ml-3' : 
                    'text-yellow-500 font-extrabold ml-3'
                  }>
                    {postState.data.status === 1 ? 'Approved' : 
                     postState.data.status === 2 ? 'Rejected' : 
                     'Pending'}
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Address</h3>
              {/* <p>{postState.data.address.street}</p>
              <p>{postState.data.address.postCode}</p> */}
              <p>{postState.data.areas}, {postState.data.districts}</p>
            </div>
          </div>
          {postState.data.images && postState.data.images.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mt-4">Images</h3>
              <div className="grid grid-cols-3 gap-4">
              {postState.data.images.map((image, index) => (
                  <img 
                    key={index} 
                    src={`http://124.43.179.118:8081/${image.replace('../', '')}`} 
                    alt="Advertisement" 
                    className="w-full h-32 object-cover rounded" 
                  />
                ))}
              </div>
            </div>
          )}
          {postState.data.auctionStatus && postState.data.auctionStatus.status && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Auction Details</h3>
              <ul className="list-disc pl-5">
                <li><strong>Start Price:</strong> {postState.data.auctionStatus.startPrice} {postState.data.currency}</li>
                <li><strong>Start Date:</strong> {postState.data.auctionStatus.startDate}</li>
                <li><strong>End Date:</strong> {postState.data.auctionStatus.endDate}</li>
                <li><strong>Max Rate:</strong> {postState.data.auctionStatus.maxRate}</li>
                <li><strong>Current Rate:</strong> {postState.data.auctionStatus.currentRate}</li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
