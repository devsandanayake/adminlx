import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from 'antd';
import { longrentGet , } from '../../actions/longrentAction';
import {fetchData} from '../../actions/postAction';

 
export default function Lrent() {
  const dispatch = useDispatch();
  const longrentState = useSelector((state) => state.longrent);
  const postState = useSelector((state) => state.data);
  

  //filter only logrent data
  const LongrentData = postState.data.filter((item) => item.transactionType === 2);
  console.log("test",LongrentData);

  const pendingCount = longrentState.data.filter((item) => item.adminKeyStatus === "Pending").length;

  console.log('pending', pendingCount);

  localStorage.setItem('pendingLRCount', pendingCount);


  React.useEffect(() => {
    dispatch(longrentGet());
    dispatch(fetchData());
  }, [dispatch]);


 

  return (
     <>
         <h1>Long Rent</h1>
         {LongrentData.map((item) => {
            const pendingCount = longrentState.data.filter(
              (lrItem) => lrItem.adCode === item.adCode && lrItem.adminKeyStatus === "Pending"
            ).length;
          return(
            <Card key={item.id} style={{ marginBottom: 20 }}>
            <h2>{item.title}</h2>
            <p>Pending Count: {pendingCount}</p>
            <button onClick={() => window.location = `/viewLongrent/${item.adCode}`}>View</button>
          </Card>
          )
          })}
     </>
     )
}