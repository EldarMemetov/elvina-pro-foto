import Image from 'next/image';
import Container from '@/shared/container/Container';
import ScrollButton from '@/shared/ScrollButton/ScrollButton';
import styles from './Works.module.scss';

// Когда будет ник — впиши сюда, и ссылка в конце секции появится сама
const INSTAGRAM_URL = 'https://www.instagram.com/';
const INSTAGRAM_HANDLE = '';

// Фото-заглушки из /public/image. Заменим на настоящие работы Эльвины:
// вертикальные кадры 4:5 (например, 1200×1500), до ~400 КБ каждый.
const SERVICES = [
  {
    title: 'Свадьбы',
    text: 'Искренние эмоции и детали вашего дня: от утренних сборов до первого танца.',
    image: '/image/services/wedding.jpg',
    alt: 'Свадебная фотосъёмка на Кипре',
    position: '50% 30%',
  },
  {
    title: 'Love Story',
    text: 'Романтическая история двоих: побережье, закат, живые чувства без постановки.',
    image: '/image/hero-3.jpg',
    alt: 'Love Story — фотосессия пары на Кипре',
    position: '50% 35%',
  },
  {
    title: 'Семейные съёмки',
    text: 'Тёплые моменты с детьми и близкими: спокойно, без спешки и натянутых улыбок.',
    image: '/image/hero-2.jpg',
    alt: 'Семейная фотосессия в Лимассоле',
    position: '50% 40%',
  },
  {
    title: 'Портреты и личный бренд',
    text: 'Портреты для соцсетей и бизнеса: выразительно, естественно, с вашим характером.',
    image: '/image/about.jpg',
    alt: 'Портретная и деловая фотосессия в Лимассоле',
    position: '50% 25%',
  },
  {
    title: 'Студия, Fashion и Beauty',
    text: 'Профессиональный свет и композиция: образы для портфолио, журналов и соцсетей.',
    image: '/image/introduction.jpg',
    alt: 'Студийная fashion и beauty фотосъёмка на Кипре',
    position: '70% 30%',
  },
  {
    title: 'События и репортаж',
    text: 'Дни рождения, крестины, корпоративы: живые кадры без позирования.',
    image: '/image/hero-1.jpg',
    alt: 'Репортажная фотосъёмка мероприятий на Кипре',
    position: '30% 40%',
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
        name: 'Эльвина',
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
      // id="portfolio" сохранён: на него ведёт кнопка «Посмотреть портфолио» в Hero
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
            От свадьбы до личного портрета: в каждой съёмке один подход, живые
            эмоции, внимание к деталям и кадры, которые не стареют.
          </p>
        </header>

        <ul className={styles.list} role="list" data-testid="works-services">
          {SERVICES.map(({ title, text, image, alt, position }, i) => (
            <li
              key={title}
              className={styles.card}
              style={{ '--i': i % 3 }}
              data-testid={`service-${i + 1}`}
            >
              <div className={styles.photo}>
                <Image
                  src={image}
                  alt={alt}
                  fill
                  quality={80}
                  sizes="(min-width: 1024px) 380px, (min-width: 768px) 45vw, 78vw"
                  style={{ objectPosition: position }}
                  className={styles.img}
                />
                <div className={styles.shade} aria-hidden="true" />

                <div className={styles.body}>
                  <span className={styles.num} aria-hidden="true">
                    {pad(i + 1)}
                  </span>
                  <h3 className={styles.name}>{title}</h3>
                  <div className={styles.reveal}>
                    <div className={styles.revealInner}>
                      <p className={styles.text}>{text}</p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className={styles.foot} data-testid="works-foot">
          <p className={styles.footText}>
            Не нашли свой формат? Расскажите о задаче, подберём решение.
            {INSTAGRAM_HANDLE && (
              <>
                {' '}
                Больше работ в{' '}
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.insta}
                  data-testid="works-instagram-link"
                >
                  Instagram {INSTAGRAM_HANDLE}
                  <span className={styles.srOnly}>
                    (откроется в новой вкладке)
                  </span>
                </a>
              </>
            )}
          </p>

          <ScrollButton targetId="contact" testId="works-contact-button">
            Обсудить съёмку
          </ScrollButton>
        </div>
      </Container>
    </section>
  );
}

export default Works;
