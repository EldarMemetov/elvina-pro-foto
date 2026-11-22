import Container from '@/shared/container/Container';
import ScrollButton from '@/shared/ScrollButton/ScrollButton';
import LocationPicker from './LocationPicker';
import styles from './Locations.module.scss';

// Серверный компонент: весь текст попадает в HTML сразу (это важно для SEO).
// Интерактивная часть (смена фото) вынесена в LocationPicker.
//
// Фото-заглушки из /public/image. Потом заменим на настоящие:
// вертикальные кадры 4:5 (например, 1200×1500), до ~400 КБ.
// coords — координаты города, декоративная деталь в подписи к фото.
const LOCATIONS = [
  {
    name: 'Лимассол',
    coords: '34.71° N · 33.02° E',
    spots:
      'Набережная Молос, старый город и порт, белые скалы Governor’s Beach. Тёплый свет и море рядом.',
    image: '/image/hero-3.jpg',
    alt: 'Фотосессия в Лимассоле, Кипр',
    position: '50% 35%',
  },
  {
    name: 'Пафос',
    coords: '34.78° N · 32.42° E',
    spots:
      'Петра ту Ромиу, гавань Пафоса, археологический парк. Скалы, море и античные декорации.',
    image: '/image/locations/larnaka.jpg',
    alt: 'Фотосессия в Пафосе, Кипр',
    position: '50% 40%',
  },
  {
    name: 'Ларнака',
    coords: '34.92° N · 33.62° E',
    spots:
      'Набережная Финикудес, Соляное озеро, улочки старого города. Лёгкая средиземноморская атмосфера.',
    image: '/image/hero-1.jpg',
    alt: 'Фотосессия в Ларнаке, Кипр',
    position: '40% 40%',
  },
  {
    name: 'Айя-Напа и Протарас',
    coords: '34.98° N · 34.00° E',
    spots:
      'Cape Greco, морские пещеры, Fig Tree Bay. Бирюзовая вода и золотой час на скалах.',
    image: '/image/hero-3.jpg',
    alt: 'Фотосессия в Айя-Напе и Протарасе, Кипр',
    position: '70% 50%',
  },
  {
    name: 'Никосия',
    coords: '35.19° N · 33.38° E',
    spots:
      'Венецианские стены, старый город, Лаики Геитония. Архитектура и городские портреты.',
    image: '/image/introduction.jpg',
    alt: 'Фотосессия в Никосии, Кипр',
    position: '60% 30%',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Эльвина — профессиональный фотограф',
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
              Весь Кипр — <em>ваша съёмочная площадка</em>
            </h2>

            <p className={styles.lead}>
              Работаю в Лимассоле и выезжаю по всему острову: от скал и бухт до
              старых улочек и городских набережных.
            </p>

            <p className={styles.desc}>
              Помогу выбрать место и время под нужный свет: золотой час на
              побережье, мягкое утро в старом городе. Вам остаётся прийти и быть
              собой.
            </p>

            <div className={styles.action}>
              <ScrollButton targetId="contact" testId="locations-button">
                Обсудить локацию
              </ScrollButton>
            </div>
          </div>

          <LocationPicker locations={LOCATIONS} />
        </div>
      </Container>
    </section>
  );
}

export default Locations;
