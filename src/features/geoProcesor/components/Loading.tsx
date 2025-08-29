import React from 'react';

export const Loading: React.FC = () => (
  <div className="flex items-center justify-center h-full w-full">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
    <span className="ml-2 text-blue-600 font-semibold">Processing...</span>
  </div>
);
