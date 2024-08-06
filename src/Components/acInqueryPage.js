import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInquery, replyInquery } from '../actions/inqueryAction';

export default function AcInqueryPage() {
  const dispatch = useDispatch();
  const inqueryState = useSelector(state => state.inquery);
  const [replyMessages, setReplyMessages] = useState({});
  const [activeTab, setActiveTab] = useState('Pending');
  const [inquiryCount, setInquiryCount] = useState(0);
  const fetchInquiryCount = () => {
    // Simulate an API call or get from localStorage
    const count = localStorage.getItem('inqueryCount') || 0;
    setInquiryCount(count);
  };


  useEffect(() => {
    fetchInquiryCount();
    dispatch(getInquery());
    const interval = setInterval(() => {
      fetchInquiryCount();
      dispatch(getInquery());
    }, 1000); // Update every 1 second
  
    return () => clearInterval(interval); 
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

 
  if (inqueryState.error) {
    return <p>Error: {inqueryState.error}</p>;
  }

  const renderInquiries = (status) => (
    Array.isArray(inqueryState.data) && inqueryState.data
      .filter(inquery => inquery.replyStatus === status)
      .map((inquery, index) => (
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
      ))
  );

  return (
    
    <div className="p-4">
        <h1 className="text-2xl font-semibold">Inquiry</h1>
      <p className="text-gray-600 cursor-pointer">
        Home / <span className="cursor-pointer">Inquiry</span>
      </p>
      <div className="mt-4">
        <button
          className={`mr-4 px-4 py-2 rounded ${activeTab === 'Pending' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          onClick={() => setActiveTab('Pending')}
        >
          Pending
          {inquiryCount > 0 && (
                  <span className="absolute -mt-4 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                    {inquiryCount}
                  </span>
                )}
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === 'Replied' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          onClick={() => setActiveTab('Replied')}
        >
          Replied
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {activeTab === 'Pending' ? renderInquiries('Pending') : renderInquiries('Replied')}
      </div>
    </div>
  );
}
