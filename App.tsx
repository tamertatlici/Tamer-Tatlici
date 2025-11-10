
import React, { useState, useMemo, useCallback } from 'react';
import { useDealers } from './hooks/useDealers';
import type { Dealer, GeminiInfo } from './types';
import { CityFilter } from './components/CityFilter';
import { DealerCard } from './components/DealerCard';
import { GeminiInfoModal } from './components/GeminiInfoModal';
import { getDealerInfo } from './services/geminiService';
import { LogoIcon } from './components/icons/LogoIcon';

export default function App() {
  const { dealers, cities } = useDealers();
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [selectedDealer, setSelectedDealer] = useState<Dealer | null>(null);
  const [geminiInfo, setGeminiInfo] = useState<GeminiInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const filteredDealers = useMemo(() => {
    if (selectedCity === 'All') {
      return dealers;
    }
    return dealers.filter(dealer => dealer.city === selectedCity);
  }, [dealers, selectedCity]);

  const handleFetchInfo = useCallback(async (dealer: Dealer) => {
    setSelectedDealer(dealer);
    setIsLoading(true);
    setError(null);
    setGeminiInfo(null);
    try {
      const info = await getDealerInfo(dealer);
      setGeminiInfo(info);
    } catch (e) {
      console.error(e);
      setError('Failed to fetch information. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const closeModal = () => {
    setSelectedDealer(null);
    setGeminiInfo(null);
    setError(null);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <header className="bg-gray-800/50 backdrop-blur-sm sticky top-0 z-20 shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <LogoIcon className="h-10 w-10 text-cyan-400" />
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              FURCO DEALERS
            </h1>
          </div>
          <p className="text-gray-400 mt-1">Ontario Customer Contact List</p>
        </div>
        <CityFilter
          cities={cities}
          selectedCity={selectedCity}
          onSelectCity={setSelectedCity}
        />
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDealers.map((dealer, index) => (
            <DealerCard key={`${dealer.fullName}-${index}`} dealer={dealer} onFetchInfo={handleFetchInfo} />
          ))}
        </div>
      </main>
      
      {selectedDealer && (
        <GeminiInfoModal
          dealer={selectedDealer}
          geminiInfo={geminiInfo}
          isLoading={isLoading}
          error={error}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
