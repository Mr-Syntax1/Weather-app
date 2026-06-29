import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';


interface SuggestedCitiesProps {
  cities: string[];
  onSelectCity: (city: string) => void;
}

const SuggestedCities: React.FC<SuggestedCitiesProps> = ({ cities, onSelectCity }) => {

  const { t } = useLanguage()

  return (
    <div className="mt-8">
      <p className="text-white/80 text-md font-semibold text-center mb-4">
        {t("app.chooseYourCity")}
      </p>

      <div className="flex flex-wrap justify-center gap-3">
        {cities.map((city) => (
          <button
            key={city}
            onClick={() => onSelectCity(city)}
            className="px-5 py-2.5 bg-white/20 backdrop-blur-sm 
                     text-white rounded-full text-sm font-medium
                     hover:bg-white/30 hover:scale-105 
                     hover:shadow-lg hover:shadow-white/20
                     active:scale-95
                     transition-all duration-200
                     border border-white/20
                     focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedCities;