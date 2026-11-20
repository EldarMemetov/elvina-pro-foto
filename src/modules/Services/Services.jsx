import Image from 'next/image';
import styles from './Services.module.scss';

// Серверный компонент (без 'use client'): весь контент и разметка
// попадают в HTML сразу, JS для этой секции не нужен.
//
// Фото: /public/image/services/*.jpg — вертикальные, лучше 4:5 или 3:4.
// alt — описание кадра с естественным упоминанием услуги и места.
// Поправь alt под реальные фотографии.
const SERVICES = [
  {
    title: 'Свадебная фотография',
    text: 'Самые важные моменты вашего дня, искренние эмоции, нежность и детали, которые делают историю вашей любви уникальной.',
    image: '/image/services/wedding.jpg',
    alt: 'Свадебный фотограф на Кипре: жених и невеста во время свадебной съёмки',
  },
  {
    title: 'Портретная фотография',
    text: 'Индивидуальные портреты, раскрывающие вашу красоту, характер и неповторимую индивидуальность.',
    image: '/image/services/wedding.jpg',
    alt: 'Индивидуальная портретная фотосессия в Лимассоле',
  },
  {
    title: 'Студийная фотография',
    text: 'Эстетичные фотосессии с профессиональным светом, продуманной композицией и вниманием к каждой детали.',
    image: '/image/services/wedding.jpg',
    alt: 'Студийная фотосессия с профессиональным светом в Лимассоле',
  },
  {
    title: 'Семейная фотография',
    text: 'Тёплые семейные истории, искренние улыбки и моменты близости, которые хочется сохранить на долгие годы.',
    image: '/image/services/wedding.jpg',
    alt: 'Семейная фотосессия на Кипре: тёплые моменты близости',
  },
  {
    title: 'Love Story и парные съёмки',
    text: 'Романтические истории о двух людях, их чувствах и особенной связи, запечатлённые в красивых фотографиях.',
    image: '/image/services/wedding.jpg',
    alt: 'Love Story: фотосессия влюблённой пары на Кипре',
  },
  {
    title: 'Fashion & Beauty',
    text: 'Выразительные fashion-образы, beauty-портреты и художественные съёмки с акцентом на стиль и эстетику.',
    image: '/image/services/wedding.jpg',
    alt: 'Fashion и beauty фотосъёмка на Кипре',
  },
  {
    title: 'Деловая и персональная фотография',
    text: 'Профессиональные портреты и визуальный образ для предпринимателей, экспертов и личных брендов.',
    image: '/image/services/wedding.jpg',
    alt: 'Деловой портрет и фотосъёмка для личного бренда в Лимассоле',
  },
  {
    title: 'Репортажная и событийная фотография',
    text: 'Живые эмоции, атмосфера и важные моменты частных и деловых мероприятий.',
    image: '/image/services/wedding.jpg',
    alt: 'Репортажная фотосъёмка мероприятий на Кипре',
  },
];

// Структурированные данные (schema.org): помогают поисковикам понять,
// какие услуги, где и кто оказывает. Содержимое совпадает с видимым текстом.
// В идеале provider позже заменить ссылкой на общий LocalBusiness из layout
// (через @id) — тогда во всём сайте будет одна «сущность» фотографа.
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
      },
    },
  })),
};

const pad = (n) => String(n).padStart(2, '0');

function Services() {
  return (
    <section
      id="services"
      data-testid="services"
      aria-labelledby="services-title"
      className={`section section-services ${styles.services}`}
    >
      <script
        type="application/ld+json"
        // "<" экранируем, чтобы данные не могли закрыть тег script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />

      <div className={styles.inner}>
        <header className={styles.head}>
          <div>
            <p className={styles.eyebrow}>Направления</p>
            <h2
              id="services-title"
              className={styles.title}
              data-testid="services-title"
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

        <ul className={styles.list} role="list" data-testid="services-list">
          {SERVICES.map(({ title, text, image, alt }, i) => (
            <li
              key={title}
              className={styles.card}
              data-testid={`service-card-${i + 1}`}
            >
              <div className={styles.photo}>
                <Image
                  src={image}
                  alt={alt}
                  fill
                  quality={80}
                  sizes="(min-width: 1200px) 25vw, (min-width: 768px) 50vw, 78vw"
                  className={styles.img}
                />
              </div>

              <div className={styles.meta} aria-hidden="true">
                <span className={styles.num}>{pad(i + 1)}</span>
                <span className={styles.rule} />
              </div>

              <h3 className={styles.name}>{title}</h3>
              <p className={styles.text}>{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Services;
