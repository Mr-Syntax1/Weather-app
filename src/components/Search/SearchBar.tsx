import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

interface SearchBarProps {
    onSearch: (city: string) => void;
    isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
    const { t } = useLanguage();
    const [city, setCity] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (city.trim()) {
            onSearch(city.trim());
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <div className="relative">
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder={t('app.searchPlaceholder')}
                    className="w-full px-4 py-3 pl-24 pr-5 rounded-xl border border-gray-300 dark:border-gray-600
                   bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm
                   text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                   focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 shadow-lg focus:shadow-blue-500/80"
                    disabled={isLoading}
                />

                <button
                    type="submit"
                    disabled={isLoading}
                    className="absolute left-1 top-1 bottom-1 px-4 bg-blue-500 text-white 
                   rounded-lg font-semibold hover:bg-blue-600 transition-colors
                   disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? t('app.loading') : t('app.searchButton')}
                </button>
            </div>
        </form>
    );
};

export default SearchBar;