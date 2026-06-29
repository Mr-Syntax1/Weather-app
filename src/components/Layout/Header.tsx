import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import LanguageToggle from '../LanguageToggle/LanguageToggle';
import ThemeToggle from '../ThemeToggle/ThemeToggle';

const Header: React.FC = () => {
    const { t } = useLanguage();

    return (
        <header className="flex justify-between items-center w-full mb-4">
            <h2 className="text-2xl md:text-4xl font-bold text-white drop-shadow-lg font-[Lalezar] cursor-pointer" onClick={() => window.location.href = '/'}>
                {t('app.title')}
            </h2>
            <div className="flex items-center gap-3">
                <LanguageToggle />
                <ThemeToggle />
            </div>
        </header >
    );
};

export default Header;