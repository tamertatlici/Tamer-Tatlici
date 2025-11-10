
import React from 'react';
import type { Dealer, GeminiInfo } from '../types';
import { LocationIcon } from './icons/LocationIcon';
import { ExternalLinkIcon } from './icons/ExternalLinkIcon';
import { XIcon } from './icons/XIcon';

interface GeminiInfoModalProps {
  dealer: Dealer;
  geminiInfo: GeminiInfo | null;
  isLoading: boolean;
  error: string | null;
  onClose: () => void;
}

const LoadingSpinner: React.FC = () => (
  <div className="flex flex-col items-center justify-center text-center">
    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-400 mb-4"></div>
    <p className="text-lg font-semibold text-gray-300">Fetching latest info...</p>
    <p className="text-sm text-gray-400">Using Google Maps Grounding</p>
  </div>
);

export const GeminiInfoModal: React.FC<GeminiInfoModalProps> = ({ dealer, geminiInfo, isLoading, error, onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col border border-gray-700"
        onClick={e => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-5 border-b border-gray-700 flex-shrink-0">
          <div>
            <h2 className="text-xl font-bold text-white">{dealer.fullName}</h2>
            <div className="flex items-center text-sm text-cyan-400 mt-1">
              <LocationIcon className="h-4 w-4 mr-2" />
              <span>{dealer.address}</span>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500"
            aria-label="Close modal"
          >
            <XIcon className="h-6 w-6" />
          </button>
        </header>

        <div className="p-6 overflow-y-auto flex-grow">
          {isLoading && <LoadingSpinner />}
          {error && (
            <div className="text-center text-red-400 bg-red-900/50 p-4 rounded-lg">
              <p className="font-bold">An Error Occurred</p>
              <p>{error}</p>
            </div>
          )}
          {geminiInfo && !isLoading && (
            <div>
              <div className="prose prose-invert prose-sm sm:prose-base max-w-none text-gray-300 whitespace-pre-wrap">
                <p>{geminiInfo.summary}</p>
              </div>

              {geminiInfo.sources && geminiInfo.sources.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-sm font-bold text-gray-400 uppercase mb-3">Sources from Google Maps</h4>
                  <ul className="space-y-2">
                    {geminiInfo.sources.map((source, index) => (
                      <li key={index}>
                        <a 
                          href={source.uri} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex items-center text-cyan-400 hover:text-cyan-300 hover:underline bg-gray-700/50 p-3 rounded-lg transition-colors"
                        >
                          <span className="truncate flex-grow">{source.title}</span>
                          <ExternalLinkIcon className="h-4 w-4 ml-2 flex-shrink-0" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
