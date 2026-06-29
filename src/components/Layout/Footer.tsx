import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const Footer: React.FC = () => {
    const { t } = useLanguage();

    return (
        <footer className="mt-8 w-full hover:scale-[1.03] transition-all duration-300">
            <div className="max-w-4xl mx-auto px-4">
                <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-md rounded-2xl p-6 border border-white/20 dark:border-gray-700/30 shadow-lg"
                >
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        {/* لوگو یا نام */}
                        <div className="flex items-center gap-2">
                            <span className="text-2xl">🌤️</span>
                            <span className="text-sm font-semibold text-white dark:text-white">
                                {t('app.title')}
                            </span>
                        </div>

                        {/* کپی رایت */}
                        <div className="text-sm text-white/60 dark:text-white/60">
                            <p>
                                © 2026 {t('app.title')}
                                <span className="text-white/40"></span>
                            </p>
                        </div>
                    </div>

                    {/* خط جداکننده */}
                    <div className="mt-4 pt-4 border-t border-white/10 dark:border-white/5">
                        <p className="text-center text-xs text-white/40 dark:text-white/40">
                            {t('footer.designBy')}
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;