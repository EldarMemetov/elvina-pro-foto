'use client';

import Logo from '@/shared/Logo/Logo';
import styles from './Footer.module.scss';

// Синхронизируйте с LINKS в NavMenu
const NAV_LINKS = [
  { href: '/', label: 'Главная', id: 'home' },
  { href: '#about', label: 'Обо мне', id: 'about' },
  { href: '#services', label: 'Услуги', id: 'services' },
  { href: '#portfolio', label: 'Портфолио', id: 'portfolio' },
  { href: '#contact', label: 'Контакты', id: 'contacts' },
];

// Замените на свои контакты и ссылки на соцсети
const CONTACTS = {
  email: 'hello@photo.studio',
  phone: '+7 000 000-00-00',
  socials: [
    { label: 'Telegram', href: '#', id: 'telegram' },
    { label: 'Instagram', href: '#', id: 'instagram' },
    { label: 'WhatsApp', href: '#', id: 'whatsapp' },
  ],
};

function Footer() {
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer} data-testid="footer">
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Logo />
            <p className={styles.tagline}>
              Свадебная и <em>портретная</em> фотография
            </p>
            <ul className={styles.socials}>
              {CONTACTS.socials.map(({ label, href, id }) => (
                <li key={id}>
                  <a
                    href={href}
                    data-testid={`footer-social-${id}`}
                    className={styles.socialLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav className={styles.group} aria-label="Навигация в подвале">
            <p className={styles.caption}>Навигация</p>
            <ul className={styles.list}>
              {NAV_LINKS.map(({ href, label, id }) => (
                <li key={id}>
                  <a
                    href={href}
                    data-testid={`footer-nav-link-${id}`}
                    className={styles.link}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.group}>
            <p className={styles.caption}>Контакты</p>
            <ul className={styles.list}>
              <li>
                <a
                  href={`mailto:${CONTACTS.email}`}
                  data-testid="footer-email"
                  className={styles.link}
                >
                  {CONTACTS.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACTS.phone.replace(/[^+\d]/g, '')}`}
                  data-testid="footer-phone"
                  className={styles.link}
                >
                  {CONTACTS.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copy}>
            © {new Date().getFullYear()} фото. Все права защищены
          </p>
          <a href="#" data-testid="footer-privacy" className={styles.privacy}>
            Политика конфиденциальности
          </a>
          <button
            type="button"
            data-testid="footer-up-button"
            className={styles.up}
            onClick={scrollTop}
          >
            Наверх
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M7 12V2M7 2L2.5 6.5M7 2l4.5 4.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <p className={styles.wordmark} aria-hidden="true">
        фото.
      </p>
    </footer>
  );
}

export default Footer;
