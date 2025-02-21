import { create } from 'zustand';
import { translations, Language } from '../i18n/translations';

interface LanguageStore {
  currentLanguage: Language;
  t: (section: string, key: string) => string;
  setLanguage: (language: Language) => void;
}

export const useLanguageStore = create<LanguageStore>((set, get) => ({
  currentLanguage: 'en',
  t: (section, key) => {
    const { currentLanguage } = get();
    return translations[currentLanguage][section]?.[key] || key;
  },
  setLanguage: (language) => set({ currentLanguage: language }),
}));