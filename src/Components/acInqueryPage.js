import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInquery, replyInquery } from '../actions/inqueryAction';

export default function AcInqueryPage() {
  const dispatch = useDispatch();
  const inqueryState = useSelector(state => state.inquery);
  const [replyMessages, setReplyMessages] = useState({});

  useEffect(() => {
    dispatch(getInquery());
  }, [dispatch]);

  const handleReply = (inqueryID, replyMessage) => {
    dispatch(replyInquery(inqueryID, replyMessage));
    setReplyMessages(prevState => ({
      ...prevState,
      [inqueryID]: '',
    }));
  };

  const handleInputChange = (inqueryID, value) => {
    setReplyMessages(prevState => ({
      ...prevState,
      [inqueryID]: value,
    }));
  };

  if (inqueryState.loading) {
    return <p>Loading...</p>;
  }

  if (inqueryState.error) {
    return <p>Error: {inqueryState.error}</p>;
  }

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.isArray(inqueryState.data) && inqueryState.data.map((inquery, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4">
            <div className="mb-2">
              <span className="font-bold">Username:</span> {inquery.username}
            </div>
            <div className="mb-2">
              <span className="font-bold">Inquiry ID:</span> {inquery.inqueryID}
            </div>
            <div className="mb-2">
              <span className="font-bold">Auction ID:</span> {inquery.auctionID}
            </div>
            <div className="mb-2">
              <span className="font-bold">Message:</span> {inquery.message}
            </div>
            <div className="mb-2">
              <span className="font-bold">Number:</span> {inquery.number}
            </div>
            <div className="mb-2">
              <span className="font-bold">Reply Status:</span> 
              <span className={`ml-2 px-2 py-1 rounded ${inquery.replyStatus === 'Pending' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
                {inquery.replyStatus}
              </span>
            </div>
            <div className="mb-2">
              <span className="font-bold">Reply Message:</span>
              {inquery.replyStatus === 'Pending' ? (
                <form onSubmit={(e) => { e.preventDefault(); handleReply(inquery.inqueryID, replyMessages[inquery.inqueryID]); }}>
                  <input
                    type="text"
                    name="replyMessage"
                    value={replyMessages[inquery.inqueryID] || ''}
                    onChange={(e) => handleInputChange(inquery.inqueryID, e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 w-full mt-2"
                    placeholder="Type your reply here"
                    required
                  />
                  <button
                    type="submit"
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Send
                  </button>
                </form>
              ) : (
                <p className="mt-2">{inquery.reply}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
