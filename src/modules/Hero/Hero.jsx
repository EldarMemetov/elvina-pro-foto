'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import ScrollButton from '@/shared/ScrollButton/ScrollButton';
import styles from './Hero.module.scss';
import Container from '@/shared/container/Container';

// ⚠ Фото-заглушки. Когда будут настоящие: горизонтальные кадры ~2400×1500,
// до 300–400 КБ, человек справа или по центру, слева — спокойное место под текст.
const SLIDES = [
  {
    src: '/image/hero-1.jpg',
    position: '50% 40%',
    slogan: 'Искусство видеть красоту в каждом мгновении',
  },
  {
    src: '/image/hero-2.jpg',
    position: '50% 40%',
    slogan: 'Истории любви, сохранённые в фотографиях',
  },
  {
    src: '/image/hero-3.jpg',
    position: '50% 35%',
    slogan: 'Ваша индивидуальность — мой главный источник вдохновения',
  },
  {
    src: '/image/hero-4.jpg',
    position: '50% 40%',
    slogan: 'Эстетика, стиль и внимание к деталям',
  },
  {
    src: '/image/hero-5.jpg',
    position: '50% 40%',
    slogan: 'Моменты, которые останутся с вами навсегда',
  },
];

const ALT = 'Фотосессия на Кипре — работа Эльвины';

// Заголовок по словам: последнее слово — акцентное (champagne, курсив)
const TITLE_WORDS = ['Фотограф', 'в', 'Лимассоле'];

const MARQUEE = [
  'Свадьбы',
  'Love Story',
  'Семейные съёмки',
  'Портреты',
  'Студия и Fashion',
  'События и репортаж',
  'Лимассол и весь Кипр',
  '15+ лет опыта',
];

const AUTOPLAY_MS = 6500;

const pad = (n) => String(n).padStart(2, '0');

function Hero() {
  const total = SLIDES.length;

  // prev — предыдущий кадр: остаётся под новым, пока идёт «шторка»
  const [view, setView] = useState({ index: 0, prev: null, dir: 1 });
  const { index, prev, dir } = view;
  const nextIndex = (index + 1) % total;

  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(false);

  const [motion, setMotion] = useState(null);

  const touchX = useRef(null);
  const slidesRef = useRef(null);
  const frame = useRef(0);

  const paused = hovered || focused || hidden;

  const go = (step) =>
    setView((v) => ({
      index: (v.index + step + total) % total,
      prev: v.index,
      dir: step > 0 ? 1 : -1,
    }));

  const goTo = (target) =>
    setView((v) =>
      v.index === target
        ? v
        : { index: target, prev: v.index, dir: target > v.index ? 1 : -1 }
    );

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setMotion(mq.matches ? 'reduced' : 'full');
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden);
    onVisibility();
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

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

  const handlePointerLeave = () => {
    cancelAnimationFrame(frame.current);
    setTilt(0, 0);
  };

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
    prev !== null && styles.changed,
    dir < 0 && styles.back,
  ]
    .filter(Boolean)
    .join(' ');

  const last = TITLE_WORDS.length - 1;

  return (
    <section
      id="hero"
      className={rootClass}
      data-testid="hero"
      aria-roledescription="карусель"
      aria-label="Фотографии"
      style={{ '--autoplay': `${AUTOPLAY_MS}ms` }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
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
      <div className={styles.parallax}>
        <div ref={slidesRef} className={styles.slides}>
          {SLIDES.map(({ src, position }, i) => {
            const isActive = i === index;
            const isPrev = i === prev;
            const isNear = isActive || isPrev || i === nextIndex;

            const layerClass = [
              styles.layer,
              isActive && styles.layerActive,
              isPrev && styles.layerPrev,
            ]
              .filter(Boolean)
              .join(' ');

            return (
              <div key={src} className={layerClass} aria-hidden={!isActive}>
                <Image
                  src={src}
                  alt={isActive ? ALT : ''}
                  fill
                  priority={i === 0}
                  loading={i === 0 ? undefined : isNear ? 'eager' : 'lazy'}
                  quality={85}
                  sizes="100vw"
                  style={{ objectPosition: position }}
                  data-testid={`hero-slide-${i + 1}`}
                  className={`${styles.slide} ${
                    i % 2 ? styles.slideAlt : ''
                  }`.trim()}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.scrim} aria-hidden="true" />
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.grain} aria-hidden="true" />

      <div className={styles.frame} aria-hidden="true">
        <span className={styles.tl} />
        <span className={styles.tr} />
        <span className={styles.bl} />
        <span className={styles.br} />
      </div>

      <Container>
        <div className={styles.content}>
          <div className={styles.main}>
            <p className={`${styles.eyebrow} anim-fade-up`}>
              Профессиональный фотограф · Лимассол, Кипр
            </p>

            <h1 className={styles.title} data-testid="hero-title">
              {TITLE_WORDS.map((word, i) => {
                const Tag = i === last ? 'em' : 'span';

                return (
                  <span key={word}>
                    {i > 0 && ' '}
                    <span className={styles.word}>
                      <Tag className={styles.wordInner} style={{ '--w': i }}>
                        {word}
                      </Tag>
                    </span>
                  </span>
                );
              })}
              <span className={styles.srOnly}>
                , Кипр — профессиональный фотограф
              </span>
            </h1>

            <p
              className={`${styles.desc} anim-fade-up`}
              style={{ animationDelay: '0.75s' }}
            >
              Создаю эстетичные фотографии, в которых красота, эмоции и
              индивидуальность становятся частью вашей истории. Более 15 лет
              опыта в фотографии, индивидуальный подход и внимание к каждой
              детали.
            </p>

            <div
              className={`${styles.actions} anim-fade-up`}
              style={{ animationDelay: '0.9s' }}
            >
              <ScrollButton
                targetId="portfolio"
                testId="hero-portfolio-button"
                className={styles.primary}
              >
                Посмотреть портфолио
              </ScrollButton>
              <ScrollButton
                targetId="contact"
                testId="hero-booking-button"
                className={styles.secondary}
              >
                Записаться на съёмку
              </ScrollButton>
            </div>
          </div>

          <div
            className={styles.aside}
            onPointerEnter={(e) => {
              if (e.pointerType === 'mouse') setHovered(true);
            }}
            onPointerLeave={() => setHovered(false)}
          >
            <div
              className={styles.caption}
              aria-live={paused ? 'polite' : 'off'}
            >
              <span className={styles.slideIndex}>
                {`${pad(index + 1)} / ${pad(total)}`}
              </span>
              <div className={styles.sloganLayer}>
                {SLIDES.map(({ slogan }, i) => (
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
                aria-label="Предыдущий слайд"
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
                {SLIDES.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    data-testid={`hero-dot-${i + 1}`}
                    className={`${styles.bar} ${
                      i === index ? styles.barActive : ''
                    }`}
                    aria-label={`Слайд ${i + 1}`}
                    aria-current={i === index}
                    onClick={() => goTo(i)}
                    onAnimationEnd={(e) => {
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
                className={styles.next}
                aria-label="Следующий слайд"
                onClick={() => go(1)}
              >
                <Image
                  key={nextIndex}
                  src={SLIDES[nextIndex].src}
                  alt=""
                  fill
                  quality={60}
                  sizes="80px"
                  style={{ objectPosition: SLIDES[nextIndex].position }}
                  className={styles.nextImg}
                />
                <span className={styles.nextLabel}>Далее</span>
              </button>
            </div>
          </div>
        </div>
      </Container>

      <div className={styles.marquee} aria-hidden="true">
        <div className={styles.track}>
          {[0, 1].map((n) => (
            <ul key={n} className={styles.group}>
              {MARQUEE.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
