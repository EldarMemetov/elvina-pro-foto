'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import ScrollButton from '@/shared/ScrollButton/ScrollButton';
import styles from './About.module.scss';

// Одна сильная авторская фотография: профессиональный портрет Єльвины.
// Положи в /public/image/about.jpg (вертикальное, лучше 4:5).
// position — фокус кадра: лицо должно оставаться в видимой части.
const PHOTO = { src: '/image/about.jpg', position: '50% 25%' };

const CONTENT = {
  ru: {
    eyebrow: 'За объективом',
    title: {
      accent: 'Єльвина',
      after: ' — фотограф с 15-летним опытом',
    },
    lead: 'Меня зовут Єльвина. Уже более 15 лет фотография является неотъемлемой частью моей жизни и профессионального пути.',
    body: [
      'За это время я работала с разными направлениями фотографии, людьми, характерами и историями. Этот опыт научил меня видеть красоту в деталях, чувствовать атмосферу момента и находить индивидуальный подход к каждому человеку.',
      'Сегодня я живу и работаю в Лимассоле, на Кипре, создавая фотографии для тех, кто ценит эстетику, качество и индивидуальность.',
    ],
    closing:
      'Для меня важно, чтобы каждая съёмка была не только профессиональным результатом, но и приятным, комфортным опытом.',
    facts: [
      { big: '15+', label: 'лет опыта' },
      { label: 'Индивидуальный подход' },
      { label: 'Лимассол, Кипр' },
    ],
    cta: 'Познакомиться ближе',
    alt: 'Єльвина — фотограф в Лимассоле, Кипр',
  },
  en: {
    eyebrow: 'Behind the lens',
    title: {
      accent: 'Yelvina',
      after: ' — a photographer with 15 years of experience',
    },
    lead: 'My name is Yelvina. For more than 15 years, photography has been an inseparable part of my life and professional path.',
    body: [
      'Over this time I have worked across different areas of photography, with different people, characters and stories. This experience taught me to see beauty in details, to feel the atmosphere of a moment and to find a personal approach to every person.',
      'Today I live and work in Limassol, Cyprus, creating photographs for those who value aesthetics, quality and individuality.',
    ],
    closing:
      'It matters to me that every shoot is not only a professional result, but also a pleasant, comfortable experience.',
    facts: [
      { big: '15+', label: 'years of experience' },
      { label: 'Personal approach' },
      { label: 'Limassol, Cyprus' },
    ],
    cta: 'Get to know me better',
    alt: 'Yelvina — photographer in Limassol, Cyprus',
  },
};

const delay = (s) => ({ '--d': `${s}s` });

function About({ lang = 'ru' }) {
  const t = CONTENT[lang] ?? CONTENT.ru;
  const sectionRef = useRef(null);
  const mediaRef = useRef(null);
  const [visible, setVisible] = useState(false);

  // Появление при прокрутке: один раз
  useEffect(() => {
    const el = sectionRef.current;
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

  // Глубина: портрет чуть сдвигается внутри рамки при прокрутке (параллакс).
  // --p ∈ [-1, 1]: положение рамки относительно центра экрана
  useEffect(() => {
    const el = mediaRef.current;
    if (!el) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.bottom < 0 || rect.top > vh) return;
      const center = rect.top + rect.height / 2;
      const p = (center - vh / 2) / (vh / 2 + rect.height / 2);
      el.style.setProperty('--p', Math.max(-1, Math.min(1, p)).toFixed(3));
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      data-testid="about"
      className={`section section-about ${styles.about} ${
        visible ? styles.visible : ''
      }`}
    >
      <div className={styles.inner}>
        <div ref={mediaRef} className={styles.media}>
          {/* Бежевая «подложка» — как паспарту под отпечатком */}
          <div className={styles.slab} aria-hidden="true" />

          <div className={styles.photoWrap}>
            <div className={styles.parallax}>
              <Image
                src={PHOTO.src}
                alt={t.alt}
                fill
                quality={85}
                sizes="(min-width: 1024px) 40vw, (min-width: 768px) 520px, 100vw"
                style={{ objectPosition: PHOTO.position }}
                data-testid="about-photo"
                className={styles.photo}
              />
            </div>
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
            data-testid="about-title"
          >
            <em>{t.title.accent}</em>
            {t.title.after}
          </h2>

          <p className={`${styles.lead} ${styles.reveal}`} style={delay(0.3)}>
            {t.lead}
          </p>

          {t.body.map((paragraph, i) => (
            <p
              key={paragraph}
              className={`${styles.body} ${styles.reveal}`}
              style={delay(0.4 + i * 0.1)}
            >
              {paragraph}
            </p>
          ))}

          <p
            className={`${styles.closing} ${styles.reveal}`}
            style={delay(0.65)}
          >
            {t.closing}
          </p>

          <ul
            className={`${styles.facts} ${styles.reveal}`}
            style={delay(0.75)}
            data-testid="about-facts"
          >
            {t.facts.map(({ big, label }) => (
              <li key={label} className={styles.fact}>
                {big && <strong className={styles.factBig}>{big}</strong>}
                <span className={styles.factLabel}>{label}</span>
              </li>
            ))}
          </ul>

          <div
            className={`${styles.action} ${styles.reveal}`}
            style={delay(0.85)}
          >
            <ScrollButton
              targetId="contact"
              testId="about-button"
              className={styles.cta}
            >
              {t.cta}
            </ScrollButton>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
