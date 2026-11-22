import Image from 'next/image';
import Container from '@/shared/container/Container';
import ScrollButton from '@/shared/ScrollButton/ScrollButton';
import styles from './Locations.module.scss';

// Серверный компонент: весь текст и разметка попадают в HTML сразу.
// Появление — чистый CSS, JS нужен только кнопке (ScrollButton).
//
// Фото: /public/image/locations/*.jpg — вертикальные, лучше 4:5.
// alt — описание кадра с названием города; поправь под реальные фото.
// coords — координаты города (десятичные градусы), декоративная деталь.
const LOCATIONS = [
  {
    name: 'Лимассол',
    coords: '34.71° N · 33.02° E',
    image: '/image/locations/larnaka.jpg',
    alt: 'Фотосессия в Лимассоле, Кипр',
  },
  {
    name: 'Пафос',
    coords: '34.78° N · 32.42° E',
    image: '/image/locations/larnaka.jpg',
    alt: 'Фотосессия в Пафосе, Кипр',
  },
  {
    name: 'Ларнака',
    coords: '34.92° N · 33.62° E',
    image: '/image/locations/larnaka.jpg',
    alt: 'Фотосессия в Ларнаке, Кипр',
  },
  {
    name: 'Никосия',
    coords: '35.19° N · 33.38° E',
    image: '/image/locations/larnaka.jpg',
    alt: 'Фотосессия в Никосии, Кипр',
  },
  {
    name: 'Айя-Напа',
    coords: '34.98° N · 34.00° E',
    image: '/image/locations/larnaka.jpg',
    alt: 'Фотосессия в Айя-Напе, Кипр',
  },
  {
    name: 'Протарас',
    coords: '35.01° N · 34.06° E',
    image: '/image/locations/larnaka.jpg',
    alt: 'Фотосессия в Протарасе, Кипр',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Єльвина — профессиональный фотограф',
  serviceType: 'Фотосъёмка',
  description: 'Фотосессии в Лимассоле и по всему Кипру',
  areaServed: LOCATIONS.map(({ name }) => ({
    '@type': 'City',
    name,
    containedInPlace: { '@type': 'Country', name: 'Кипр' },
  })),
};

function Locations() {
  return (
    <section
      id="locations"
      data-testid="locations"
      aria-labelledby="locations-title"
      className={`section section-locations ${styles.locations}`}
    >
      <script
        type="application/ld+json"
        // "<" экранируем, чтобы данные не могли закрыть тег script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />

      <Container>
        <div className={styles.inner}>
          <div className={styles.text}>
            <p className={styles.eyebrow}>Локации</p>

            <h2
              id="locations-title"
              className={styles.title}
              data-testid="locations-title"
            >
              Красота Кипра — <em>идеальный фон</em> для вашей истории
            </h2>

            <p className={styles.lead}>
              Кипр вдохновляет своей природой, средиземноморской атмосферой,
              архитектурой и невероятным светом. Здесь можно создать совершенно
              разные образы — от романтических фотографий на побережье до
              элегантных городских и студийных портретов.
            </p>

            <p className={styles.desc}>
              Я провожу фотосессии в Лимассоле и других уголках острова, помогая
              подобрать локацию, которая лучше всего подчеркнёт вашу идею.
            </p>

            <div className={styles.action}>
              <ScrollButton
                targetId="contact"
                testId="locations-button"
                className={styles.cta}
              >
                Обсудить локацию для съёмки
              </ScrollButton>
            </div>
          </div>

          <ul className={styles.list} role="list" data-testid="locations-list">
            {LOCATIONS.map(({ name, coords, image, alt }, i) => (
              <li
                key={name}
                className={styles.tile}
                data-testid={`location-${i + 1}`}
              >
                <div className={styles.photo}>
                  <Image
                    src={image}
                    alt={alt}
                    fill
                    quality={80}
                    sizes="(min-width: 1024px) 300px, (min-width: 768px) 40vw, 45vw"
                    className={styles.img}
                  />
                </div>

                <div className={styles.caption}>
                  <h3 className={styles.name}>{name}</h3>
                  <p className={styles.coords} aria-hidden="true">
                    {coords}
                  </p>
                  <span className={styles.rule} aria-hidden="true" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

export default Locations;
