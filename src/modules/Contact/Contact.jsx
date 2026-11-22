import { FaWhatsapp, FaTelegram, FaInstagram } from 'react-icons/fa';
import Container from '@/shared/container/Container';
import {
  CONTACTS,
  getChannels,
  getBusinessJsonLd,
} from '@/shared/constants/contacts';
import styles from './Contact.module.scss';

const ICONS = {
  whatsapp: FaWhatsapp,
  telegram: FaTelegram,
  instagram: FaInstagram,
};

// Серверный компонент: весь текст в HTML сразу, JS не нужен.
// Формы нет: клиент пишет в мессенджер — так быстрее и удобнее для обеих сторон.
function Contact() {
  const { messengers, phone, email } = getChannels();

  return (
    <section
      id="contact"
      data-testid="contact"
      aria-labelledby="contact-title"
      className={`section section-contact ${styles.contact}`}
    >
      <script
        type="application/ld+json"
        // "<" экранируем, чтобы данные не могли закрыть тег script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getBusinessJsonLd()).replace(/</g, '\\u003c'),
        }}
      />

      <Container>
        <header className={styles.head}>
          <p className={styles.eyebrow}>Контакты</p>

          <h2
            id="contact-title"
            className={styles.title}
            data-testid="contact-title"
          >
            Давайте обсудим <em>вашу съёмку</em>
          </h2>

          <p className={styles.lead}>
            Напишите в удобный мессенджер: расскажите об идее и дате, и я отвечу{' '}
            {CONTACTS.replyTime}. Без анкет и форм.
          </p>
        </header>

        <ul
          className={styles.channels}
          role="list"
          data-testid="contact-channels"
        >
          {messengers.map(({ id, label, hint, value, href }, i) => {
            const Icon = ICONS[id];

            return (
              <li key={id} className={styles.item} style={{ '--i': i }}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.card}
                  data-testid={`contact-${id}`}
                >
                  <span className={styles.top}>
                    <span className={styles.icon} aria-hidden="true">
                      <Icon />
                    </span>
                    <svg
                      className={styles.arrow}
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M5 15L15 5M7 5h8v8"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>

                  <span>
                    <span className={styles.hint}>{hint}</span>
                    <span className={styles.label}>{label}</span>
                    <span className={styles.value}>{value}</span>
                  </span>

                  <span className={styles.srOnly}>
                    (откроется в новой вкладке)
                  </span>
                </a>
              </li>
            );
          })}
        </ul>

        <p className={styles.more}>
          <span>{CONTACTS.city}</span>
          {phone && (
            <a href={phone.href} data-testid="contact-phone">
              {phone.value}
            </a>
          )}
          {email && (
            <a href={email.href} data-testid="contact-email">
              {email.value}
            </a>
          )}
        </p>
      </Container>
    </section>
  );
}

export default Contact;
