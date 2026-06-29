import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const LanguageToggle: React.FC = () => {
    const { language, toggleLanguage } = useLanguage();

    return (
        <button
            onClick={toggleLanguage}
            className="px-3 py-1.5 rounded-lg bg-white/20 dark:bg-gray-800/50 
                 backdrop-blur-sm text-white text-sm font-medium
                 hover:bg-white/30 dark:hover:bg-gray-700/50 
                 transition-all duration-300 border border-white/20
                 hover:scale-105 active:scale-95"
            aria-label="Toggle language"
        >
            {language === 'fa' ? '🇬🇧 EN' : '🇮🇷 FA'}
        </button>
    );
};

export default LanguageToggle;