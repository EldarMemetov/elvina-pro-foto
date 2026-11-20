'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import ScrollButton from '@/shared/ScrollButton/ScrollButton';
import styles from './Hero.module.scss';

// Фото лежат в /public/image/hero-1.jpg ... hero-5.jpg
// position — фокусная точка кадра (object-position): подправь под каждое фото,
// чтобы лицо/главный объект не обрезался на телефоне
const IMAGES = [
  { src: '/image/hero-1.jpg', position: '50% 40%' },
  { src: '/image/hero-2.jpg', position: '50% 40%' },
  { src: '/image/hero-3.jpg', position: '50% 35%' },
  { src: '/image/hero-4.jpg', position: '50% 40%' },
  { src: '/image/hero-5.jpg', position: '50% 40%' },
];

const CONTENT = {
  ru: {
    label: 'Фотографии',
    roleDescription: 'карусель',
    eyebrow: 'Профессиональный фотограф · Лимассол, Кипр',
    // H1 один и не меняется при смене слайдов (SEO)
    title: {
      before: 'Профессиональный фотограф в ',
      accent: 'Лимассоле',
      after: ', Кипр',
    },
    desc: 'Создаю эстетичные фотографии, в которых красота, эмоции и индивидуальность становятся частью вашей истории. Более 15 лет опыта в фотографии, индивидуальный подход и внимание к каждой детали.',
    portfolio: 'Посмотреть портфолио',
    booking: 'Записаться на съёмку',
    prev: 'Предыдущий слайд',
    next: 'Следующий слайд',
    slide: 'Слайд',
    slogans: [
      'Искусство видеть красоту в каждом мгновении',
      'Истории любви, сохранённые в фотографиях',
      'Ваша индивидуальность — мой главный источник вдохновения',
      'Эстетика, стиль и внимание к деталям',
      'Моменты, которые останутся с вами навсегда',
    ],
  },
  en: {
    label: 'Photographs',
    roleDescription: 'carousel',
    eyebrow: 'Professional photographer · Limassol, Cyprus',
    title: {
      before: 'Professional photographer in ',
      accent: 'Limassol',
      after: ', Cyprus',
    },
    desc: 'I create aesthetic photographs in which beauty, emotion and individuality become part of your story. More than 15 years of experience, a personal approach and attention to every detail.',
    portfolio: 'View portfolio',
    booking: 'Book a shoot',
    prev: 'Previous slide',
    next: 'Next slide',
    slide: 'Slide',
    slogans: [
      'The art of seeing beauty in every moment',
      'Love stories, kept in photographs',
      'Your individuality is my greatest inspiration',
      'Aesthetics, style and attention to detail',
      'Moments that will stay with you forever',
    ],
  },
};

// Время показа одного кадра. Таймер — сама CSS-анимация индикатора:
// когда полоска заполнилась, листаем дальше. Так прогресс и смена кадров
// не расходятся, а пауза (hover / фокус / скрытая вкладка) работает бесплатно.
const AUTOPLAY_MS = 6500;

const pad = (n) => String(n).padStart(2, '0');

function Hero({ lang = 'ru' }) {
  const t = CONTENT[lang] ?? CONTENT.ru;
  const total = IMAGES.length;

  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(false);
  // null — пока не знаем настройку системы; автоплей включаем только после проверки
  const [motion, setMotion] = useState(null);

  const touchX = useRef(null);
  const slidesRef = useRef(null);
  const frame = useRef(0);

  const paused = hovered || focused || hidden;

  const go = (step) => setIndex((prev) => (prev + step + total) % total);

  // prefers-reduced-motion: без автоплея и без параллакса
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setMotion(mq.matches ? 'reduced' : 'full');
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // Вкладка в фоне — ставим на паузу
  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden);
    onVisibility();
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  // Глубина: кадр едва заметно «дышит» за курсором (3D-наклон + сдвиг)
  const setTilt = (x, y) => {
    const el = slidesRef.current;
    if (!el) return;
    el.style.setProperty('--tilt-x', x.toFixed(3));
    el.style.setProperty('--tilt-y', y.toFixed(3));
  };

  const handlePointerMove = (e) => {
    if (e.pointerType !== 'mouse' || motion !== 'full') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const { clientX, clientY } = e;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      setTilt(
        (clientX - rect.left) / rect.width - 0.5,
        (clientY - rect.top) / rect.height - 0.5
      );
    });
  };

  const handlePointerEnter = (e) => {
    if (e.pointerType === 'mouse') setHovered(true);
  };

  const handlePointerLeave = () => {
    setHovered(false);
    cancelAnimationFrame(frame.current);
    setTilt(0, 0);
  };

  // Пауза по фокусу только для клавиатуры: после тапа на телефоне
  // кнопка остаётся в фокусе, и слайдер не должен «залипать»
  const handleFocus = (e) => {
    if (e.target.matches(':focus-visible')) setFocused(true);
  };

  const handleBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
  };

  const handleControlsKey = (e) => {
    if (e.key === 'ArrowLeft') go(-1);
    if (e.key === 'ArrowRight') go(1);
  };

  const rootClass = [
    styles.hero,
    motion === 'full' && styles.autoplay,
    paused && styles.paused,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section
      id="hero"
      className={rootClass}
      data-testid="hero"
      aria-roledescription={t.roleDescription}
      aria-label={t.label}
      style={{ '--autoplay': `${AUTOPLAY_MS}ms` }}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 48) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      {/* Слой 0: фотографии — «проявляются» как отпечаток в проявителе */}
      <div ref={slidesRef} className={styles.slides}>
        {IMAGES.map(({ src, position }, i) => (
          <Image
            key={src}
            src={src}
            alt={t.slogans[i]}
            aria-hidden={i !== index}
            fill
            priority={i === 0}
            quality={85}
            sizes="100vw"
            style={{ objectPosition: position }}
            data-testid={`hero-slide-${i + 1}`}
            className={[
              styles.slide,
              i % 2 ? styles.slideAlt : '',
              i === index ? styles.slideActive : '',
            ]
              .filter(Boolean)
              .join(' ')}
          />
        ))}
      </div>

      {/* Слои 1–2: свет и плёночное зерно */}
      <div className={styles.scrim} aria-hidden="true" />
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.grain} aria-hidden="true" />

      {/* Слой 3: рамка видоискателя */}
      <div className={styles.frame} aria-hidden="true">
        <span className={styles.tl} />
        <span className={styles.tr} />
        <span className={styles.bl} />
        <span className={styles.br} />
      </div>

      {/* Слой 4: контент */}
      <div className={styles.content}>
        <div className={styles.main}>
          <p className={`${styles.eyebrow} anim-fade-up`}>{t.eyebrow}</p>

          <h1
            className={`${styles.title} anim-fade-up anim-delay-1`}
            data-testid="hero-title"
          >
            {t.title.before}
            <em>{t.title.accent}</em>
            {t.title.after}
          </h1>

          <p className={`${styles.desc} anim-fade-up anim-delay-2`}>{t.desc}</p>

          <div className={`${styles.actions} anim-fade-up anim-delay-3`}>
            <ScrollButton
              targetId="portfolio"
              testId="hero-portfolio-button"
              className={styles.primary}
            >
              {t.portfolio}
            </ScrollButton>
            <ScrollButton
              targetId="contact"
              testId="hero-booking-button"
              className={styles.secondary}
            >
              {t.booking}
            </ScrollButton>
          </div>
        </div>

        <div className={styles.aside}>
          <div className={styles.caption} aria-live={paused ? 'polite' : 'off'}>
            <span className={styles.slideIndex}>
              {`${pad(index + 1)} / ${pad(total)}`}
            </span>
            <div className={styles.sloganLayer}>
              {t.slogans.map((slogan, i) => (
                <p
                  key={slogan}
                  className={`${styles.slogan} ${
                    i === index ? styles.sloganActive : ''
                  }`}
                >
                  {slogan}
                </p>
              ))}
            </div>
          </div>

          <div className={styles.controls} onKeyDown={handleControlsKey}>
            <button
              type="button"
              data-testid="hero-arrow-prev"
              className={styles.arrow}
              aria-label={t.prev}
              onClick={() => go(-1)}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M15 5l-7 7 7 7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div className={styles.bars}>
              {IMAGES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  data-testid={`hero-dot-${i + 1}`}
                  className={`${styles.bar} ${
                    i === index ? styles.barActive : ''
                  }`}
                  aria-label={`${t.slide} ${i + 1}`}
                  aria-current={i === index}
                  onClick={() => setIndex(i)}
                  onAnimationEnd={(e) => {
                    // Листаем, только если полоска реально отработала время кадра
                    // (защита от глобальных стилей, обнуляющих animation-duration)
                    if (
                      i === index &&
                      e.elapsedTime * 1000 >= AUTOPLAY_MS - 100
                    )
                      go(1);
                  }}
                />
              ))}
            </div>

            <button
              type="button"
              data-testid="hero-arrow-next"
              className={styles.arrow}
              aria-label={t.next}
              onClick={() => go(1)}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M9 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
