import Image from 'next/image';
import Container from '@/shared/container/Container';
import styles from './Works.module.scss';

const INSTAGRAM_URL = 'https://www.instagram.com/';
const INSTAGRAM_HANDLE = '';

const PHOTOS = [
  {
    src: '/image/works/introduction.jpg',
    alt: 'Свадебная фотография на Кипре',
    position: '50% 30%',
  },
  {
    src: '/image/works/introduction.jpg',
    alt: 'Портретная фотосессия в Лимассоле',
    position: '50% 30%',
  },
  {
    src: '/image/works/introduction.jpg',
    alt: 'Love Story — фотосессия пары на Кипре',
    position: '50% 35%',
  },
  {
    src: '/image/works/introduction.jpg',
    alt: 'Fashion и beauty фотосъёмка на Кипре',
    position: '50% 30%',
  },
];

const SERVICES = [
  {
    title: 'Свадебная фотография',
    text: 'Самые важные моменты вашего дня, искренние эмоции, нежность и детали, которые делают историю вашей любви уникальной.',
  },
  {
    title: 'Портретная фотография',
    text: 'Индивидуальные портреты, раскрывающие вашу красоту, характер и неповторимую индивидуальность.',
  },
  {
    title: 'Студийная фотография',
    text: 'Эстетичные фотосессии с профессиональным светом, продуманной композицией и вниманием к каждой детали.',
  },
  {
    title: 'Семейная фотография',
    text: 'Тёплые семейные истории, искренние улыбки и моменты близости, которые хочется сохранить на долгие годы.',
  },
  {
    title: 'Love Story и парные съёмки',
    text: 'Романтические истории о двух людях, их чувствах и особенной связи, запечатлённые в красивых фотографиях.',
  },
  {
    title: 'Fashion & Beauty',
    text: 'Выразительные fashion-образы, beauty-портреты и художественные съёмки с акцентом на стиль и эстетику.',
  },
  {
    title: 'Деловая и персональная фотография',
    text: 'Профессиональные портреты и визуальный образ для предпринимателей, экспертов и личных брендов.',
  },
  {
    title: 'Репортажная и событийная фотография',
    text: 'Живые эмоции, атмосфера и важные моменты частных и деловых мероприятий.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Направления фотографии',
  itemListElement: SERVICES.map(({ title, text }, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Service',
      name: title,
      description: text,
      areaServed: [
        { '@type': 'City', name: 'Лимассол' },
        { '@type': 'Country', name: 'Кипр' },
      ],
      provider: {
        '@type': 'Person',
        name: 'Єльвина',
        jobTitle: 'Профессиональный фотограф',
        ...(INSTAGRAM_HANDLE ? { sameAs: [INSTAGRAM_URL] } : {}),
      },
    },
  })),
};

const pad = (n) => String(n).padStart(2, '0');

function Works() {
  return (
    <section
      // id="portfolio" сохранён: на него уже ведёт кнопка «Посмотреть портфолио» в Hero
      id="portfolio"
      data-testid="works"
      aria-labelledby="works-title"
      className={`section section-services ${styles.works}`}
    >
      <script
        type="application/ld+json"
        // "<" экранируем, чтобы данные не могли закрыть тег script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />

      <Container>
        <header className={styles.head}>
          <div>
            <p className={styles.eyebrow}>Направления</p>
            <h2
              id="works-title"
              className={styles.title}
              data-testid="works-title"
            >
              Фотография для <em>разных историй</em> и событий
            </h2>
          </div>

          <p className={styles.desc}>
            От индивидуальных портретов до особенных семейных событий и
            свадебных торжеств — каждое направление объединяет мой авторский
            взгляд, внимание к деталям и стремление создавать фотографии вне
            времени.
          </p>
        </header>

        <ul className={styles.photos} role="list" data-testid="works-photos">
          {/* {PHOTOS.map(({ src, alt, position }, i) => (
            <li key={src} className={styles.photo}> */}
          {PHOTOS.map(({ src, alt, position }, i) => (
            <li key={`${src}-${i}`} className={styles.photo}>
              <div className={styles.frame}>
                <Image
                  src={src}
                  alt={alt}
                  fill
                  quality={80}
                  sizes="(min-width: 1200px) 290px, (min-width: 768px) 22vw, 46vw"
                  style={{ objectPosition: position }}
                  data-testid={`works-photo-${i + 1}`}
                  className={styles.img}
                />
              </div>
            </li>
          ))}
        </ul>

        <ol className={styles.list} role="list" data-testid="works-services">
          {SERVICES.map(({ title, text }, i) => (
            <li
              key={title}
              className={styles.row}
              data-testid={`service-${i + 1}`}
            >
              <span className={styles.num} aria-hidden="true">
                {pad(i + 1)}
              </span>

              <div>
                <h3 className={styles.name}>{title}</h3>
                <p className={styles.text}>{text}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className={styles.cta} data-testid="works-instagram">
          <div>
            <h3 className={styles.ctaTitle}>
              Больше работ — в <em>Instagram</em>
            </h3>
            <p className={styles.ctaText}>
              Свежие съёмки и новые истории — в моём профиле.
              {INSTAGRAM_HANDLE && (
                <>
                  {' '}
                  <span className={styles.handle}>{INSTAGRAM_HANDLE}</span>
                </>
              )}
            </p>
          </div>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btn}
            data-testid="works-instagram-button"
          >
            Смотреть работы в Instagram
            <span className={styles.srOnly}>(откроется в новой вкладке)</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M5 15L15 5M7 5h8v8"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </Container>
    </section>
  );
}

export default Works;
