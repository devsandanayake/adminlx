import React from 'react';
import StatsCard from './StatsCard';
import adsicon from '../../images/ads-icon-3.jpg';
import adsicon2 from '../../images/iconc.jpg';
import adsicon3 from '../../images/money.webp';
import { FcApproval } from 'react-icons/fc';
import { isToday, isFuture, isPast } from 'date-fns';
import PendingIcon from '../../images/OIP__5_-removebg-preview.png';
import RepliedIcon from '../../images/replied-icon-20.jpg';
import { GoAlertFill } from "react-icons/go";

export default function Dashboard() {
  const activities = [
    { date: '01/02/2021', description: 'nwk nj ndaodnqdno qenodqend edonqedqe' },
    { date: '01/02/2024', description: 'nwk nj ndaodnqdno qenodqend edonqedqe' },
    { date: '08/05/2024', description: 'nwk nj ndaodnqdno qenodqend edonqedqe' },
    { date: '01/02/2024', description: 'nwk nj ndaodnqdno qenodqend edonqedqe' },
    { date: '01/02/2029', description: 'nwk nj ndaodnqdno qenodqend edonqedqe' },
    { date: '01/02/2024', description: 'nwk nj ndaodnqdno qenodqend edonqedqe' },
  ];

  const sortedActivities = activities.sort((a, b) => new Date(b.date) - new Date(a.date));
  const notificationCount = localStorage.getItem('inqueryCount') || 0;

  const auctions = [
    { id: 'ALW-234-82', maxRate: 25000, currentRate: 24000 },
    { id: 'ALW-234-83', maxRate: 26000, currentRate: 26000 },
    { id: 'ALW-234-84', maxRate: 27000, currentRate: 21500 },
    { id: 'ALW-234-85', maxRate: 27000, currentRate: 21500 },
    { id: 'ALW-234-86', maxRate: 27000, currentRate: 21500 },
    { id: 'ALW-234-87', maxRate: 27000, currentRate: 21500 },
    { id: 'ALW-234-88', maxRate: 27000, currentRate: 21500 },
    { id: 'ALW-234-89', maxRate: 27000, currentRate: 21500 },
    { id: 'ALW-234-90', maxRate: 27000, currentRate: 21500 },
    { id: 'ALW-234-91', maxRate: 27000, currentRate: 21500 },
    { id: 'ALW-234-92', maxRate: 27000, currentRate: 21500 },
    { id: 'ALW-234-93', maxRate: 27000, currentRate: 21500 },
    { id: 'ALW-234-94', maxRate: 27000, currentRate: 21500 },
  ];

  return (
    <>
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="text-gray-600 cursor-pointer">
        Home / <span className="cursor-pointer">Dashboard</span>
      </p>
      <main className="flex-1 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <StatsCard title="Total Ads" value="145" change="12%" changeType="increase" icons={adsicon} />
          <StatsCard title="Revenue" value="$3,264" change="8%" changeType="increase" icons={adsicon3} />
          <StatsCard title="Customers" value="1244" change="12%" changeType="decrease" icons={adsicon2} />
        </div>
      </main>
      <div className='flex gap-5'>
        <div className="bg-white p-4 rounded-lg shadow-md w-full sm:w-1/2 lg:w-1/3">
          <h1 className="text-xl font-semibold mb-4">Recent Activity</h1>
          <div className="space-y-2">
            {sortedActivities.map((activity, index) => {
              const activityDate = new Date(activity.date);
              let bgColor = 'bg-gray-50';

              if (isToday(activityDate)) {
                bgColor = 'bg-red-100';
              } else if (isFuture(activityDate)) {
                bgColor = 'bg-green-100';
              } else if (isPast(activityDate)) {
                bgColor = 'bg-yellow-100';
              }

              return (
                <div
                  key={index}
                  className={`flex items-center gap-2 p-2 rounded-lg shadow-sm ${bgColor}`}
                >
                  <FcApproval className="mt-1" />
                  <span className="text-gray-400 text-sm">{activity.date}</span>
                  <p className="flex italic text-sm">{activity.description}</p>
                </div>
              );
            })}
          </div>
        </div>

               <div className='p-4 rounded-lg shadow-md w-2/4 h-96'>
          <h1 className="text-xl font-semibold mb-4 flex gap-2">
            Auction Alert <GoAlertFill className='text-red-500 mt-1 text-xl' />
          </h1>
          <div className='overflow-y-auto h-full'>
            {auctions
              .sort((a, b) => {
                if (a.maxRate === a.currentRate && b.maxRate !== b.currentRate) {
                  return -1;
                } else if (a.maxRate !== a.currentRate && b.maxRate === b.currentRate) {
                  return 1;
                } else {
                  return 0;
                }
              })
              .map((auction) => {
                let bgColor = 'bg-green-500'; // Default to green for normal value
        
                if (auction.maxRate === auction.currentRate) {
                  bgColor = 'bg-red-500'; // Red if MAX rate equals Current rate
                } else if (Math.abs(auction.maxRate - auction.currentRate) <= 1000) {
                  bgColor = 'bg-yellow-500'; // Yellow if the rates are near (within 1000)
                }
        
                return (
                  <div key={auction.id} className={`p-4 rounded-lg mb-4 font-mono ${bgColor}`}>
                    <div className="flex justify-between">
                      <p>{auction.id}</p>
                      <p className="flex items-center">
                        MAX-RATE <span className="text-black ml-2 p-1 rounded">RS.{auction.maxRate.toLocaleString()}</span>
                      </p>
                      <p className="flex items-center">
                        Current Rate <span className="text-black ml-2 p-1 rounded">Rs.{auction.currentRate.toLocaleString()}</span>
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="flex-row">
          <h1 className="text-xl font-semibold mt-3 text-center">Inquiry Message Status</h1>
          <div className='flex gap-3 mt-3'>
            <div className='bg-gray-200 w-24 h-24 rounded-full relative flex flex-col items-center justify-center ml-7'>
              <img src={PendingIcon} alt='pending' className='w-5 h-5' />
              <p>Pending</p>
              {notificationCount > 0 && (
                <span className='absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center'>
                  {notificationCount}
                </span>
              )}
            </div>

            <div className='bg-green-400 w-24 h-24 rounded-full relative flex flex-col items-center justify-center'>
              <img src={RepliedIcon} alt='replied' className='w-8 h-8' />
              <p>Replied</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}