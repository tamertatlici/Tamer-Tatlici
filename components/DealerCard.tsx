
import React from 'react';
import type { Dealer } from '../types';
import { LocationIcon } from './icons/LocationIcon';
import { PhoneIcon } from './icons/PhoneIcon';
import { MailIcon } from './icons/MailIcon';
import { SparklesIcon } from './icons/SparklesIcon';

interface DealerCardProps {
  dealer: Dealer;
  onFetchInfo: (dealer: Dealer) => void;
}

export const DealerCard: React.FC<DealerCardProps> = ({ dealer, onFetchInfo }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col h-full transform hover:scale-[1.02] transition-transform duration-300 ease-in-out border border-gray-700">
      <div className="p-5 flex-grow">
        <h3 className="text-xl font-bold text-white mb-1">{dealer.fullName}</h3>
        <p className="text-cyan-400 font-semibold text-sm mb-4">{dealer.city}</p>

        <div className="space-y-3 text-sm text-gray-300">
          {dealer.address && (
            <div className="flex items-start">
              <LocationIcon className="h-4 w-4 mr-3 mt-0.5 text-gray-400 flex-shrink-0" />
              <span>{dealer.address}</span>
            </div>
          )}
          {dealer.phone && (
            <div className="flex items-center">
              <PhoneIcon className="h-4 w-4 mr-3 text-gray-400 flex-shrink-0" />
              <span>{dealer.phone}</span>
            </div>
          )}
          {dealer.email && (
            <div className="flex items-center">
              <MailIcon className="h-4 w-4 mr-3 text-gray-400 flex-shrink-0" />
              <span className="truncate">{dealer.email}</span>
            </div>
          )}
        </div>
      </div>
      
      {dealer.floorModels.length > 0 && (
        <div className="px-5 py-3 bg-gray-800/50">
          <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Floor Models</h4>
          <div className="flex flex-wrap gap-2">
            {dealer.floorModels.map((model, index) => (
              <span key={index} className="px-2.5 py-1 text-xs font-semibold bg-gray-700 text-cyan-300 rounded-full">
                {model}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="p-5 mt-auto bg-gray-900/50">
        <button
          onClick={() => onFetchInfo(dealer)}
          className="w-full flex items-center justify-center bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-cyan-400"
        >
          <SparklesIcon className="h-5 w-5 mr-2" />
          Get Latest Info
        </button>
      </div>
    </div>
  );
};
