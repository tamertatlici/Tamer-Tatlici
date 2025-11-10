
import React from 'react';

interface CityFilterProps {
  cities: string[];
  selectedCity: string;
  onSelectCity: (city: string) => void;
}

export const CityFilter: React.FC<CityFilterProps> = ({ cities, selectedCity, onSelectCity }) => {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-3">
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 -mx-4 px-4">
        {cities.map(city => (
          <button
            key={city}
            onClick={() => onSelectCity(city)}
            className={`
              px-4 py-2 text-sm font-semibold rounded-full whitespace-nowrap transition-colors duration-200
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-cyan-400
              ${selectedCity === city
                ? 'bg-cyan-500 text-white shadow-md'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }
            `}
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
};
