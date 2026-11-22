import { SITE_URL } from '@/shared/constants/site';

// ============================================================
// ВСЕ КОНТАКТЫ ЖИВУТ ЗДЕСЬ. Заменишь значения — обновится весь сайт
// (секция контактов, футер, данные для Google).
// Не нужен какой-то канал — оставь значение пустым: '' — карточка исчезнет.
// ============================================================
export const CONTACTS = {
  // ⚠ Когда впишешь настоящие данные — поставь demo: false
  // (пока true, телефон/почта/соцсети не попадают в данные для Google)
  demo: true,

  name: 'Эльвина',
  city: 'Лимассол, Кипр',
  replyTime: 'в течение дня', // ⚠ уточни у Эльвины

  phone: '+357 99 000000', // с кодом страны; он же WhatsApp
  telegram: 'elvina_demo_nick', // ник без @
  instagram: 'elvina_demo_nick', // ник без @
  email: 'hello@example.com',
};

// Текст, который подставится в WhatsApp при нажатии на кнопку
const WHATSAPP_TEXT = 'Здравствуйте, Эльвина! Хочу узнать про фотосессию.';

const digits = (value) => value.replace(/\D/g, '');

// Готовые каналы связи; пустые пропускаются
export function getChannels() {
  const { phone, telegram, instagram, email } = CONTACTS;

  return {
    messengers: [
      phone && {
        id: 'whatsapp',
        label: 'WhatsApp',
        hint: 'Быстрее всего',
        value: phone,
        href: `https://wa.me/${digits(phone)}?text=${encodeURIComponent(WHATSAPP_TEXT)}`,
      },
      telegram && {
        id: 'telegram',
        label: 'Telegram',
        hint: 'Удобно для файлов',
        value: `@${telegram}`,
        href: `https://t.me/${telegram}`,
      },
      instagram && {
        id: 'instagram',
        label: 'Instagram',
        hint: 'Напишите в директ',
        value: `@${instagram}`,
        href: `https://www.instagram.com/${instagram}/`,
      },
    ].filter(Boolean),
    phone: phone && { value: phone, href: `tel:+${digits(phone)}` },
    email: email && { value: email, href: `mailto:${email}` },
  };
}

export function getBusinessJsonLd() {
  const { name, demo, phone, email, telegram, instagram } = CONTACTS;

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#business`,
    name: `${name} — фотограф на Кипре`,
    description:
      'Профессиональный фотограф в Лимассоле: свадьбы, семейные съёмки, портреты, Love Story по всему Кипру.',
    url: SITE_URL,
    image: `${SITE_URL}/image/hero-2.jpg`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Лимассол',
      addressCountry: 'CY',
    },
    areaServed: 'Кипр',
    // Настоящие контакты отдаём Google только когда demo: false
    ...(!demo && {
      ...(phone && { telephone: phone }),
      ...(email && { email }),
      sameAs: [
        telegram && `https://t.me/${telegram}`,
        instagram && `https://www.instagram.com/${instagram}/`,
      ].filter(Boolean),
    }),
  };
}
