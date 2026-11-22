import Container from '@/shared/container/Container';
import styles from './Experience.module.scss';

// Серверный компонент: весь текст и разметка попадают в HTML сразу,
// JS для этой секции не нужен. Появление — чистый CSS.
const ADVANTAGES = [
  {
    big: '15+',
    title: 'лет профессионального опыта',
    text: 'Глубокое понимание фотографии, света, композиции и художественного подхода.',
  },
  {
    title: 'Индивидуальная концепция',
    text: 'Каждая съёмка создаётся с учётом ваших пожеланий, характера и желаемого результата.',
  },
  {
    title: 'Внимание к деталям',
    text: 'От выбора локации и освещения до финальной обработки каждого кадра.',
  },
  {
    title: 'Комфортная атмосфера',
    text: 'Помогаю чувствовать себя уверенно перед камерой и получать удовольствие от процесса.',
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
            Опыт, внимание и <em>индивидуальный подход</em>
          </h2>

          <p className={styles.lead}>
            За каждой красивой фотографией стоит не только профессиональная
            техника, но и умение увидеть человека, почувствовать момент и
            создать правильную атмосферу.
          </p>

          <p className={styles.desc}>
            Я уделяю особое внимание подготовке, деталям и комфорту клиента,
            чтобы результат отражал именно вашу индивидуальность.
          </p>
        </header>

        <ul
          className={styles.list}
          role="list"
          data-testid="experience-advantages"
        >
          {ADVANTAGES.map(({ big, title, text }, i) => (
            <li
              key={title}
              className={styles.item}
              style={{ '--i': i }}
              data-testid={`advantage-${i + 1}`}
            >
              <span className={styles.num} aria-hidden="true">
                {pad(i + 1)}
              </span>

              <h3 className={styles.name}>
                {big && <span className={styles.big}>{big}</span>}
                {big && ' '}
                {title}
              </h3>

              <p className={styles.text}>{text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export default Experience;
