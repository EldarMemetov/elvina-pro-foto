import Container from '@/shared/container/Container';
import ScrollButton from '@/shared/ScrollButton/ScrollButton';
import styles from './Experience.module.scss';

// Серверный компонент: весь текст попадает в HTML сразу, JS нужен только кнопке.
// Появление — чистый CSS.

// Цифры. Пишем только то, что можно честно подтвердить.
// ⚠ «7–10 дней» — уточни у Эльвины, сколько реально занимает отбор и обработка.
const STATS = [
  { value: '15+', label: 'лет профессионального опыта в фотографии' },
  { value: '6', label: 'направлений съёмки: от свадеб до портретов' },
  { value: '7–10', label: 'дней до готовой галереи с обработанными кадрами' },
];

// ⚠ Порядок работы — общий вариант, сверь с тем, как работает Эльвина.
const STEPS = [
  {
    title: 'Знакомство',
    text: 'Вы пишете мне и рассказываете об идее. Обсуждаем формат, место и удобное время.',
  },
  {
    title: 'Подготовка',
    text: 'Вместе выбираем локацию и образы. Подскажу, что надеть и когда лучше свет.',
  },
  {
    title: 'Съёмка',
    text: 'Спокойная атмосфера без спешки. Я направляю, вы чувствуете себя уверенно.',
  },
  {
    title: 'Результат',
    text: 'Отбираю лучшие кадры, делаю авторскую обработку и отправляю готовую галерею.',
  },
];

const pad = (n) => String(n).padStart(2, '0');

function Experience() {
  return (
    <section
      id="experience"
      data-testid="experience"
      aria-labelledby="experience-title"
      className={`section section-experience ${styles.experience}`}
    >
      <Container>
        <header className={styles.head}>
          <p className={styles.eyebrow}>Почему мне доверяют</p>

          <h2
            id="experience-title"
            className={styles.title}
            data-testid="experience-title"
          >
            15 лет опыта и <em>внимание к каждой детали</em>
          </h2>

          <p className={styles.lead}>
            За красивой фотографией стоит не только техника, но и умение увидеть
            человека, почувствовать момент и создать правильную атмосферу.
          </p>
        </header>

        <ul className={styles.stats} role="list" data-testid="experience-stats">
          {STATS.map(({ value, label }, i) => (
            <li
              key={label}
              className={styles.stat}
              style={{ '--i': i }}
              data-testid={`stat-${i + 1}`}
            >
              <span className={styles.value}>{value}</span>
              <span className={styles.label}>{label}</span>
            </li>
          ))}
        </ul>

        <div className={styles.process}>
          <h3 className={styles.processTitle}>
            Как проходит <em>съёмка</em>
          </h3>

          <ol
            className={styles.steps}
            role="list"
            data-testid="experience-steps"
          >
            {STEPS.map(({ title, text }, i) => (
              <li
                key={title}
                className={styles.step}
                style={{ '--i': i }}
                data-testid={`step-${i + 1}`}
              >
                <span className={styles.num} aria-hidden="true">
                  {pad(i + 1)}
                </span>
                <h4 className={styles.name}>{title}</h4>
                <p className={styles.text}>{text}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className={styles.action}>
          <ScrollButton
            targetId="contact"
            testId="experience-button"
            className={styles.cta}
          >
            Записаться на съёмку
          </ScrollButton>
        </div>
      </Container>
    </section>
  );
}

export default Experience;
