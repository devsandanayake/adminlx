import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { viewEachLongrent, updateStatus } from '../../actions/longrentAction';
import { useParams } from 'react-router-dom';

const ViewModel = React.memo(() => {
  const { adCode } = useParams();
  const dispatch = useDispatch();
  
  const { data, loading, error } = useSelector((state) => state.longrent);

  React.useEffect(() => {
   dispatch(viewEachLongrent(adCode));     
  }, [dispatch, adCode]);

  const handleStatusChange = (id, status) => {
         dispatch(updateStatus(id, status));
   };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="p-4">
      {Array.isArray(data) ? (
        data.map((item) => (
          <div key={item._id} className="bg-white shadow-lg rounded-lg p-6 mb-4">
            <ul>
              <li className="mb-2"><strong>Username:</strong> {item.username}</li>
              <li className="mb-2"><strong>Ad Code:</strong> {item.adCode}</li>
              <li className="mb-2"><strong>Rental Start Date:</strong> {item.rentalStartDate}</li>
              <li className="mb-2"><strong>Rental End Date:</strong> {item.rentalEndDate}</li>
              <li className="mb-2">
                <strong>Admin Key Status:</strong>
                <select
                  className="ml-2 p-2 border rounded"
                  value={item.adminKeyStatus}
                  onChange={(e) => handleStatusChange(item.adCode, e.target.value)}
                >
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Pending">Pending</option>
                </select>
              </li>
              <li className="mb-2"><strong>User Message:</strong> {item.userMessage}</li>
              <li className="mb-2"><strong>Phone Number:</strong> {item.phoneNumber}</li>
            </ul>
          </div>
        ))
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
});

export default ViewModel;
