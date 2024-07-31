import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuction, openForAuction, updateAuction } from '../actions/auctionAction';

export default function AuctionPage() {
  const dispatch = useDispatch();
  const auctionState = useSelector(state => state.auction);
  const [formData, setFormData] = React.useState({});

  React.useEffect(() => {
    dispatch(getAuction());
  }, [dispatch]);

  const handleInputChange = (adCode, field, value) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [adCode]: {
        ...prevFormData[adCode],
        [field]: value,
      }
    }));
  };

  const handleFormSubmit = (e, adCode) => {
    e.preventDefault();
    if (formData[adCode]) {
      const { startDate, endDate, startPrice, maxRate } = formData[adCode];
      dispatch(updateAuction(adCode, startDate, endDate, startPrice, maxRate));
    }
  };

  return (
    <div className="p-4">
      {auctionState.loading && <p className="text-center text-blue-500">Loading...</p>}
      {auctionState.error && <p className="text-center text-red-500">Error: {auctionState.error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Array.isArray(auctionState.data) && auctionState.data.map((auction, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-6">
            <div className="mb-4">
              <span className="font-bold">Ads Name:</span> {auction.title}
            </div>
            <div className="mb-4">
              <span className="font-bold">Ads Code:</span> {auction.adCode}
            </div>
            <div className="mb-4">
              <span className="font-bold">Ads Status:</span> {auction.status === 1 ? 'Approved' : 'Rejected'}
            </div>
            <div className="mb-4">
              <span className="font-bold">Ads Price:</span> {auction.price}
            </div>
            <form onSubmit={(e) => handleFormSubmit(e, auction.adCode)}>
              <label className="block mb-2">Start Price</label>
              <input
                type="number"
                id="startPrice"
                name="startPrice"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData[auction.adCode]?.startPrice || auction.auctionStatus.startPrice || ''}
                onChange={(e) => handleInputChange(auction.adCode, 'startPrice', e.target.value)}
              />
              <label className="block mb-2">Start Date</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData[auction.adCode]?.startDate || auction.auctionStatus.startDate || ''}
                onChange={(e) => handleInputChange(auction.adCode, 'startDate', e.target.value)}
              />
              <label className="block mb-2">End Date</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData[auction.adCode]?.endDate || auction.auctionStatus.endDate || ''}
                onChange={(e) => handleInputChange(auction.adCode, 'endDate', e.target.value)}
              />
              <label className="block mb-2">Max Rate</label>
              <input
                type="number"
                id="maxRate"
                name="maxRate"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData[auction.adCode]?.maxRate || auction.auctionStatus.maxRate || ''}
                onChange={(e) => handleInputChange(auction.adCode, 'maxRate', e.target.value)}
              />
              <button
                type="submit"
                className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 mt-2"
              >
                Update
              </button>
            </form>
            <div className="mb-4 mt-5">
              <span className="font-bold">Auction Status:</span>
              <span className={`ml-2 py-1 px-3 rounded-full text-white ${auction.auctionStatus.status ? 'bg-green-500' : 'bg-red-500'}`}>
                {auction.auctionStatus.status ? 'Open' : 'Close'}
              </span>
            </div>
            <div className="mb-4">
              <span className="font-bold">Current Rate:</span>
              <span className="ml-2 py-1 px-3 rounded-full">
                {auction.auctionStatus.currentRate}
              </span>
            </div>

            <div className="mb-4">
              <span className="font-bold">Max Rate:</span>
              <span className="ml-2 py-1 px-3 rounded-full">
                {auction.auctionStatus.maxRate}
              </span>
            </div>
            <div className="flex justify-between">
              <button
                className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
                onClick={() => dispatch(openForAuction(auction.adCode, true))}
              >
                Open for Auction
              </button>
              <button
                className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                onClick={() => dispatch(openForAuction(auction.adCode, false))}
              >
                Close Auction
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
