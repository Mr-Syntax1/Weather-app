import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext'; '../../contexts/LanguageContext'

const Spinner: React.FC = () => {

    const { language } = useLanguage()

    return (
        <div className="flex justify-center flex-col items-center py-8">
            <div className="animate-spin rounded-full h-14 w-14 border-4 border-blue-600 border-t-transparent mb-3"></div>
            <p className='font-semibold'>{language === 'en' ? 'loading...' : '...loading'}</p>
        </div>
    );
};

export default Spinner;
