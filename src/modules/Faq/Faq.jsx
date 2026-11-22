import Container from '@/shared/container/Container';
import styles from './Faq.module.scss';

const FAQ = [
  {
    q: 'Где вы проводите фотосессии?',
    a: 'Основное направление моей работы — Лимассол. Также возможны съёмки в других городах и красивых локациях Кипра по предварительной договорённости.',
  },
  {
    q: 'Какие виды фотосессий вы предлагаете?',
    a: 'Я работаю с портретной, свадебной, семейной, студийной, fashion-, beauty-, парной и событийной фотографией.',
  },
  {
    q: 'Помогаете ли вы с выбором локации и образа?',
    a: 'Да. Перед съёмкой мы обсуждаем ваши пожелания, концепцию, подходящие локации и детали будущей фотосессии.',
  },
  {
    q: 'Нужно ли иметь опыт позирования?',
    a: 'Нет. Я помогаю с позированием и направляю во время съёмки, чтобы вы чувствовали себя естественно и комфортно.',
  },
  {
    q: 'Сколько стоит фотосессия на Кипре?',
    a: 'Стоимость зависит от формата, продолжительности и особенностей съёмки. Свяжитесь со мной, чтобы обсудить детали и получить индивидуальное предложение.',
  },
  {
    q: 'Как записаться на фотосессию?',
    a: 'Вы можете оставить заявку через форму на сайте или написать мне напрямую в WhatsApp. Мы обсудим ваши пожелания и подберём удобную дату.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

const pad = (n) => String(n).padStart(2, '0');

function Faq() {
  return (
    <section
      id="faq"
      data-testid="faq"
      aria-labelledby="faq-title"
      className={`section section-faq ${styles.faq}`}
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
          <header className={styles.head}>
            <p className={styles.eyebrow}>Полезная информация</p>

            <h2 id="faq-title" className={styles.title} data-testid="faq-title">
              Всё, что <em>важно знать</em> перед фотосессией
            </h2>

            <span className={styles.mark} aria-hidden="true">
              ?
            </span>
          </header>

          <div className={styles.list} data-testid="faq-list">
            {FAQ.map(({ q, a }, i) => (
              <details
                key={q}
                name="faq"

                open={i === 0}
                className={styles.item}
                data-testid={`faq-item-${i + 1}`}
              >
                <summary className={styles.summary}>
                  <span className={styles.num} aria-hidden="true">
                    {pad(i + 1)}
                  </span>
                  <h3 className={styles.question}>{q}</h3>
                  <span className={styles.icon} aria-hidden="true" />
                </summary>

                <p className={styles.answer}>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Faq;
