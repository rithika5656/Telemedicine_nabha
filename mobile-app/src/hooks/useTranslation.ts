/**
 * Translation Hook
 * Simple hook to get translated strings
 */

import { useAppStore } from '../store/appStore';
import { TRANSLATIONS, Language } from '../constants/translations';

export const useTranslation = () => {
  const language = useAppStore((state) => state.language) || 'en';
  
  const t = (key: string): string => {
    return TRANSLATIONS[language as Language]?.[key] || TRANSLATIONS.en[key] || key;
  };
  
  return { t, language };
};
