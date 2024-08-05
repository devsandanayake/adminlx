// src/components/StatsCard.js
import React from 'react';
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
export default function StatsCard({ title, value, change, changeType , icons }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex gap-6">
      <div>
      <div className='flex gap-2'>
      <HiAdjustmentsHorizontal className='mt-2 text-xl'/>
      <h2 className="text-2xl  mb-2">{title}</h2>
      </div>
      <p className="text-gray-600">{value}</p>
      <p className='text-sm'>{changeType === 'increase' ? '+' : '-'}{change}</p>
      </div>
      <img src={icons} alt='adsicon' className='w-16 h-16 mt-5 ml-20'/>
     
    </div>
  );
}
