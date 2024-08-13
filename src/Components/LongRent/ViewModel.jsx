import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { viewEachLongrent, updateStatus } from '../../actions/longrentAction';
import { useParams } from 'react-router-dom';
import { Table, Select, Input, Button, Spin, Alert } from 'antd';

const { Option } = Select;

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

  const handleInputChange = (value, name, id) => {
    setFormDataArray(prevState =>
      prevState.map(item =>
        item._id === id ? { ...item, [name]: value } : item
      )
    );
  };

  const handleSubmit = (id) => {
    const formData = formDataArray.find(item => item._id === id);
    if (formData) {
      dispatch(updateStatus(adCode, formData.adminKeyStatus, formData.username, formData.monthlyRate, formData.advancePayment , id));
    }
  };

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username'
    },
    {
      title: 'Ad Code',
      dataIndex: 'adCode',
      key: 'adCode',
      render: () => adCode
    },
    {
      title: 'Rental Start Date',
      dataIndex: 'rentalStartDate',
      key: 'rentalStartDate',
      render: (_, record) => data.find(d => d._id === record._id)?.rentalStartDate
    },
    {
      title: 'Rental End Date',
      dataIndex: 'rentalEndDate',
      key: 'rentalEndDate',
      render: (_, record) => data.find(d => d._id === record._id)?.rentalEndDate
    },
    {
      title: 'User Message',
      dataIndex: 'userMessage',
      key: 'userMessage',
      render: (_, record) => data.find(d => d._id === record._id)?.userMessage
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      render: (_, record) => data.find(d => d._id === record._id)?.phoneNumber
    },
    {
      title: 'Admin Key Status',
      dataIndex: 'adminKeyStatus',
      key: 'adminKeyStatus',
      render: (_, record) => (
        <Select
          defaultValue={record.adminKeyStatus || 'Pending'}
          onChange={(value) => handleInputChange(value, 'adminKeyStatus', record._id)}
        >
          <Option value="Approved">Approved</Option>
          <Option value="Rejected">Rejected</Option>
          <Option value="Pending">Pending</Option>
        </Select>
      )
    },
    {
      title: 'Monthly Rate',
      dataIndex: 'monthlyRate',
      key: 'monthlyRate',
      render: (_, record) => (
        <Input
          type="number"
          value={record.monthlyRate || ''}
          onChange={(e) => handleInputChange(e.target.value, 'monthlyRate', record._id)}
        />
      )
    },
    {
      title: 'Advance Payment',
      dataIndex: 'advancePayment',
      key: 'advancePayment',
      render: (_, record) => (
        <Input
          type="number"
          value={record.advancePayment || ''}
          onChange={(e) => handleInputChange(e.target.value, 'advancePayment', record._id)}
        />
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button onClick={() => handleSubmit(record._id)} type="primary">
          Update
        </Button>
      )
    }
  ];

  if (loading) {
    return <Spin size="large" />;
  }

  if (error) {
    return <Alert message="Error" description={error.message} type="error" />;
  }

  return (
    <div className="p-4">
      {formDataArray.length > 0 ? (
        <Table
          dataSource={formDataArray}
          columns={columns}
          rowKey="_id"
          pagination={false}
        />
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
});

export default ViewModel;
