'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './Introduction.module.scss';

// Положи фото в /public/image/introduction.jpg (вертикальное, лучше 4:5)
const PHOTO = { src: '/image/introduction.jpg', position: '50% 30%' };

const CONTENT = {
  ru: {
    eyebrow: 'Моя философия',
    title: {
      before: 'Фотография — это искусство ',
      accent: 'сохранять чувства',
      after: '',
    },
    lead: 'Для меня фотография — гораздо больше, чем красивый кадр. Это возможность остановить время, передать настроение, раскрыть индивидуальность человека и сохранить то, что невозможно повторить.',
    quote:
      'Я стремлюсь создавать не просто фотографии, а визуальные истории, наполненные эстетикой, искренностью и характером.',
    note: 'Каждая съёмка — это отдельная история, в которой важны детали, атмосфера и ваше ощущение себя.',
    alt: 'Портрет из съёмки Єльвины',
  },
  en: {
    eyebrow: 'My philosophy',
    title: {
      before: 'Photography is the art of ',
      accent: 'preserving feelings',
      after: '',
    },
    lead: 'For me, photography is much more than a beautiful frame. It is a chance to stop time, convey a mood, reveal a person’s individuality and keep what can never be repeated.',
    quote:
      'I strive to create not just photographs, but visual stories filled with aesthetics, sincerity and character.',
    note: 'Every shoot is its own story, where the details, the atmosphere and how you feel in your own skin all matter.',
    alt: 'Portrait by Yelvina',
  },
};

// Задержка появления элемента (сек) — через CSS-переменную
const delay = (s) => ({ '--d': `${s}s` });

function Introduction({ lang = 'ru' }) {
  const t = CONTENT[lang] ?? CONTENT.ru;
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  // Появление при прокрутке: один раз, без повторов
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (!('IntersectionObserver' in window)) {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="introduction"
      data-testid="introduction"
      className={`section section-introduction ${styles.introduction} ${
        visible ? styles.visible : ''
      }`}
    >
      <div className={styles.inner}>
        <div className={styles.media}>
          <div className={styles.photoWrap}>
            <Image
              src={PHOTO.src}
              alt={t.alt}
              fill
              quality={85}
              sizes="(min-width: 1024px) 40vw, (min-width: 768px) 520px, 100vw"
              style={{ objectPosition: PHOTO.position }}
              data-testid="introduction-photo"
              className={styles.photo}
            />
          </div>

          {/* Уголки видоискателя — перекличка с рамкой в Hero */}
          <div className={styles.marks} aria-hidden="true">
            <span className={styles.tl} />
            <span className={styles.tr} />
            <span className={styles.bl} />
            <span className={styles.br} />
          </div>
        </div>

        <div className={styles.text}>
          <p
            className={`${styles.eyebrow} ${styles.reveal}`}
            style={delay(0.05)}
          >
            {t.eyebrow}
          </p>

          <h2
            className={`${styles.title} ${styles.reveal}`}
            style={delay(0.15)}
            data-testid="introduction-title"
          >
            {t.title.before}
            <em>{t.title.accent}</em>
            {t.title.after}
          </h2>

          <p className={`${styles.lead} ${styles.reveal}`} style={delay(0.3)}>
            {t.lead}
          </p>

          <p className={`${styles.quote} ${styles.reveal}`} style={delay(0.45)}>
            {t.quote}
          </p>

          <p className={`${styles.note} ${styles.reveal}`} style={delay(0.6)}>
            {t.note}
          </p>
        </div>
      </div>
    </section>
  );
}

export default Introduction;
