'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import ScrollButton from '@/shared/ScrollButton/ScrollButton';
import styles from './About.module.scss';
import Container from '@/shared/container/Container';

const PHOTO = { src: '/image/about.jpg', position: '50% 25%' };

const delay = (s) => ({ '--d': `${s}s` });

function About() {
  const sectionRef = useRef(null);
  const mediaRef = useRef(null);
  const [visible, setVisible] = useState(false);

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
      <Container>
        <div className={styles.inner}>
          <div ref={mediaRef} className={styles.media}>
            <div className={styles.slab} aria-hidden="true" />

            <div className={styles.photoWrap}>
              <div className={styles.parallax}>
                <Image
                  src={PHOTO.src}
                  alt="Єльвина — фотограф в Лимассоле, Кипр"
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
              За объективом
            </p>

            <h2
              className={`${styles.title} ${styles.reveal}`}
              style={delay(0.15)}
              data-testid="about-title"
            >
              <em>Єльвина</em>
              {' — фотограф с 15-летним опытом'}
            </h2>

            <p className={`${styles.lead} ${styles.reveal}`} style={delay(0.3)}>
              Меня зовут Єльвина. Уже более 15 лет фотография является
              неотъемлемой частью моей жизни и профессионального пути.
            </p>

            {[
              'За это время я работала с разными направлениями фотографии, людьми, характерами и историями. Этот опыт научил меня видеть красоту в деталях, чувствовать атмосферу момента и находить индивидуальный подход к каждому человеку.',
              'Сегодня я живу и работаю в Лимассоле, на Кипре, создавая фотографии для тех, кто ценит эстетику, качество и индивидуальность.',
            ].map((paragraph, i) => (
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
              Для меня важно, чтобы каждая съёмка была не только
              профессиональным результатом, но и приятным, комфортным опытом.
            </p>

            <ul
              className={`${styles.facts} ${styles.reveal}`}
              style={delay(0.75)}
              data-testid="about-facts"
            >
              {[
                { big: '15+', label: 'лет опыта' },
                { label: 'Индивидуальный подход' },
                { label: 'Лимассол, Кипр' },
              ].map(({ big, label }) => (
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
                Познакомиться ближе
              </ScrollButton>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default About;
