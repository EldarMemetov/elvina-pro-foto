'use client';
import React, { useState } from 'react';
import { createInstance } from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18nConfig from '../../../i18nConfig';

export default function TranslationsProvider({
  children,
  locale,
  namespaces,
  resources,
}) {
  const [i18nInstance] = useState(() => {
    const instance = createInstance();
    instance.use(initReactI18next).init({
      lng: locale,
      resources,
      fallbackLng: i18nConfig.defaultLocale,
      supportedLngs: i18nConfig.locales,
      defaultNS: namespaces[0],
      fallbackNS: namespaces[0],
      ns: namespaces,
      interpolation: { escapeValue: false },

      initImmediate: false,
    });
    return instance;
  });

  return <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>;
}
