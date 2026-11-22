'use client';

import { FaWhatsapp, FaTelegram, FaInstagram } from 'react-icons/fa';
import Logo from '@/shared/Logo/Logo';
import { NAV_LINKS } from '@/shared/constants/nav';
import { CONTACTS, getChannels } from '@/shared/constants/contacts';
import styles from './Footer.module.scss';

const ICONS = {
  whatsapp: FaWhatsapp,
  telegram: FaTelegram,
  instagram: FaInstagram,
};

function Footer() {
  const { messengers, phone, email } = getChannels();

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer} data-testid="footer">
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Logo light />

            <p className={styles.tagline}>
              Свадебная и <em>портретная</em> фотография на Кипре
            </p>

            <ul className={styles.socials}>
              {messengers.map(({ label, href, id }) => {
                const Icon = ICONS[id];

                return (
                  <li key={id}>
                    <a
                      href={href}
                      data-testid={`footer-social-${id}`}
                      className={styles.social}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${label} (откроется в новой вкладке)`}
                    >
                      <Icon aria-hidden="true" />
                    </a>
                  </li>
                );
              })}
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
              {phone && (
                <li>
                  <a
                    href={phone.href}
                    data-testid="footer-phone"
                    className={styles.link}
                  >
                    {phone.value}
                  </a>
                </li>
              )}
              {email && (
                <li>
                  <a
                    href={email.href}
                    data-testid="footer-email"
                    className={styles.link}
                  >
                    {email.value}
                  </a>
                </li>
              )}
              <li>
                <span className={styles.text}>{CONTACTS.city}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copy}>
            © {new Date().getFullYear()} {CONTACTS.name}. Все права защищены
          </p>

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
    </footer>
  );
}

export default Footer;
