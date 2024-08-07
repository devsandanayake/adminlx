import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from 'antd';
import { longrentGet } from '../../actions/longrentAction';
import {fetchData} from '../../actions/postAction';

 
export default function Lrent() {
  const dispatch = useDispatch();
  const longrentState = useSelector((state) => state.longrent);
  const postState = useSelector((state) => state.data);
  
  //filter only logrent data
  const LongrentData = postState.data.filter((item) => item.transactionType === 2);
  console.log("test",LongrentData);


  React.useEffect(() => {
    dispatch(longrentGet());
    dispatch(fetchData());
  }, [dispatch]);

  const handleStatusChange = (id, value) => {
    // dispatch(updateAdminKeyStatus(id, value));
  };

  console.log(longrentState);

  return (
     <>
         <h1>Long Rent</h1>
         {LongrentData.map((item) => (
          <Card key={item.id} style={{ marginBottom: 20 }}>
            <h2>{item.title}</h2>
            <button onClick={()=>window.location=`/viewLongrent/${item.adCode}`}>View</button>
          </Card>  
        ))}
     </>
  );
}