import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import faTranslations from '../locales/fa.json';
import enTranslations from '../locales/en.json';

type Language = 'fa' | 'en';

interface LanguageContextType {
    language: Language;
    t: (key: string) => string;
    toggleLanguage: () => void;
    setLanguage: (lang: Language) => void;
    isRTL: boolean;
}

const translations = {
    fa: faTranslations,
    en: enTranslations
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [language, setLanguage] = useState<Language>(() => {
        // دریافت از localStorage
        const saved = localStorage.getItem('language') as Language;
        if (saved && (saved === 'fa' || saved === 'en')) return saved;
        return 'en';
    });

    const isRTL = language === 'fa';

    // تابع ترجمه
    const t = (key: string): string => {
        const keys = key.split('.');
        let result: any = translations[language];

        for (const k of keys) {
            if (result && result[k] !== undefined) {
                result = result[k];
            } else {
                return key; // اگر کلید پیدا نشد، خود کلید رو برگردون
            }
        }

        return result || key;
    };

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'fa' ? 'en' : 'fa');
    };

    // ذخیره در localStorage و تنظیم جهت صفحه
    useEffect(() => {
        localStorage.setItem('language', language);
        document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
        document.documentElement.lang = language;
    }, [language, isRTL]);

    return (
        <LanguageContext.Provider value={{ language, t, toggleLanguage, setLanguage, isRTL }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};