// components/Tag.js
"use client"
import React from 'react';


type Props = {
  label: string;
  color:string;
  Close?: any;
};
export function handleClose(label?:string) {
  console.log(`Tag "${label}" closed!`);
  // Lakukan operasi server di sini, seperti memanggil API atau mengakses database.
}

export const Tag = ({ label, color = 'bg-blue-500', Close }:Props) => {
    const handleClick = () => {
        if (Close) {
          Close(label);
        }
       
      };
    
    
  return (
    <div className={`inline-flex items-center ${color} text-white px-2 py-1 rounded-md text-sm mr-2`}>
      {label}
      {Close && (
        <button className="ml-2 text-white hover:text-gray-200" onClick={handleClick}>
          &times;
        </button>
      )}
    </div>
  );
};

