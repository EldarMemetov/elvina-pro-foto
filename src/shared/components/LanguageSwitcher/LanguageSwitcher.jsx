'use client';

import { useLanguageChanger } from '@/i18n/utils/LanguageChanger';
import styles from './LanguageSwitcher.module.scss';

const LANGUAGES = ['ru', 'en'];

const LanguageSwitcher = () => {
  const { handleChangeLanguage, currentLocale } = useLanguageChanger();

  return (
    <div
      className={styles.languageSwitcher}
      role="group"
      aria-label="Язык сайта"
      data-testid="language-switcher"
    >
      {LANGUAGES.map((lang) => (
        <button
          key={lang}
          type="button"
          lang={lang}
          className={`${styles.languageOption} ${
            currentLocale === lang ? styles.active : ''
          }`}
          aria-pressed={currentLocale === lang}
          data-testid={`language-${lang}`}
          onClick={() => handleChangeLanguage(lang)}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
