'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './Introduction.module.scss';

const PHOTO = { src: '/image/introduction.jpg', position: '50% 30%' };

const delay = (s) => ({ '--d': `${s}s` });

function Introduction() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

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
              alt="Портрет из съёмки Єльвины"
              fill
              quality={85}
              sizes="(min-width: 1024px) 40vw, (min-width: 768px) 520px, 100vw"
              style={{ objectPosition: PHOTO.position }}
              data-testid="introduction-photo"
              className={styles.photo}
            />
          </div>

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
            Моя философия
          </p>

          <h2
            className={`${styles.title} ${styles.reveal}`}
            style={delay(0.15)}
            data-testid="introduction-title"
          >
            Фотография — это искусство <em>сохранять чувства</em>
          </h2>

          <p className={`${styles.lead} ${styles.reveal}`} style={delay(0.3)}>
            Для меня фотография — гораздо больше, чем красивый кадр. Это
            возможность остановить время, передать настроение, раскрыть
            индивидуальность человека и сохранить то, что невозможно повторить.
          </p>

          <p className={`${styles.quote} ${styles.reveal}`} style={delay(0.45)}>
            Я стремлюсь создавать не просто фотографии, а визуальные истории,
            наполненные эстетикой, искренностью и характером.
          </p>

          <p className={`${styles.note} ${styles.reveal}`} style={delay(0.6)}>
            Каждая съёмка — это отдельная история, в которой важны детали,
            атмосфера и ваше ощущение себя.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Introduction;
