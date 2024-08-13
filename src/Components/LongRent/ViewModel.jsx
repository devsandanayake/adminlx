import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { viewEachLongrent, updateStatus } from '../../actions/longrentAction';
import { useParams } from 'react-router-dom';

const ViewModel = React.memo(() => {
  const { adCode } = useParams();
  const dispatch = useDispatch();
  
  const { data, loading, error } = useSelector((state) => state.longrent);
  
  const [formDataArray, setFormDataArray] = useState([]);
  
  useEffect(() => {
    dispatch(viewEachLongrent(adCode));
  }, [dispatch, adCode]);

  useEffect(() => {
    if (data && data.length > 0) {
      const initialFormDataArray = data.map(item => ({
        adminKeyStatus: item.adminKeyStatus,
        monthlyRate: item.monthlyRate || '',
        advancePayment: item.advancePayment || '',
        username: item.username,
        _id: item._id
      }));
      setFormDataArray(initialFormDataArray);
    }
  }, [data]);

  const handleInputChange = (e, id) => {
    const { name, value } = e.target;
    setFormDataArray(prevState =>
      prevState.map(item =>
        item._id === id ? { ...item, [name]: value } : item
      )
    );
  };

  const handleSubmit = (e, id) => {
    e.preventDefault();
    const formData = formDataArray.find(item => item._id === id);
    if (formData) {
      dispatch(updateStatus(adCode, formData.adminKeyStatus, formData.username, formData.monthlyRate, formData.advancePayment , id));
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="p-4">
      {formDataArray.length > 0 ? (
        formDataArray.map((item) => (
          <div key={item._id} className="bg-white shadow-lg rounded-lg p-6 mb-4">
            <ul>
              <li className="mb-2"><strong>Username:</strong> {item.username}</li>
              <li className="mb-2"><strong>Ad Code:</strong> {adCode}</li>
              <li className="mb-2"><strong>Rental Start Date:</strong> {data.find(d => d._id === item._id)?.rentalStartDate}</li>
              <li className="mb-2"><strong>Rental End Date:</strong> {data.find(d => d._id === item._id)?.rentalEndDate}</li>
              <li className="mb-2"><strong>User Message:</strong> {data.find(d => d._id === item._id)?.userMessage}</li>
              <li className="mb-2"><strong>Phone Number:</strong> {data.find(d => d._id === item._id)?.phoneNumber}</li>
            </ul>
            
            <form onSubmit={(e) => handleSubmit(e, item._id)} className="mt-4">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor={`adminKeyStatus-${item._id}`}>Admin Key Status</label>
                <select
                  id={`adminKeyStatus-${item._id}`}
                  name="adminKeyStatus"
                  className="p-2 border rounded w-full"
                  value={item.adminKeyStatus || ''}
                  onChange={(e) => handleInputChange(e, item._id)}
                >
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor={`monthlyRate-${item._id}`}>Monthly Rate</label>
                <input
                  id={`monthlyRate-${item._id}`}
                  name="monthlyRate"
                  type="number"
                  className="p-2 border rounded w-full"
                  value={item.monthlyRate || ''}
                  onChange={(e) => handleInputChange(e, item._id)}
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor={`advancePayment-${item._id}`}>Advance Payment</label>
                <input
                  id={`advancePayment-${item._id}`}
                  name="advancePayment"
                  type="number"
                  className="p-2 border rounded w-full"
                  value={item.advancePayment || ''}
                  onChange={(e) => handleInputChange(e, item._id)}
                />
              </div>
              
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Update
              </button>
            </form>
          </div>
        ))
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
});

export default ViewModel;
