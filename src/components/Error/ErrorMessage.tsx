import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

interface ErrorMessageProps {
    message: string;
    onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
    const { t } = useLanguage();
    return (
        <div className="bg-gray-800 backdrop-blur-sm text-gray-200  p-4 rounded-xl text-center text-lg font-semibold">
            <h2 className="font-medium mb-2">{message || t('errors.cityNotFound')}</h2>
            <button
                className='bg-red-500/80 px-4 py-2 rounded-md hover:scale-[1.04] transition-all duration-300'
                onClick={onRetry}>
                {t('errors.retry')}
            </button>
        </div>
    );
};

export default ErrorMessage;