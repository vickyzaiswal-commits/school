"use client";
import React from 'react';

export default function Spinner({ size = 48, text = 'Loading...', className = '' }) {
  return (
     <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading school data...</p>
        </div>
      </div>
  );
}
