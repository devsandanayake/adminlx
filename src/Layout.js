import React from 'react';
import Sidebar from './Main/NavBar';

export default function Layout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 w-full p-4">
        {children}
      </div>
    </div>
  );
}
