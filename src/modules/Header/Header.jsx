'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import ScrollButton from '@/shared/ScrollButton/ScrollButton';
import Logo from '@/shared/Logo/Logo';
import NavMenu from './NavMenu/NavMenu';
import styles from './Header.module.scss';

function Header({ overlay = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };

    if (menuOpen) window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  // Прозрачный только в overlay-режиме вверху страницы (поверх фото Hero),
  // во всех остальных случаях — читаемое стекло
  const solid = !overlay || scrolled || menuOpen;

  return (
    <header
      data-testid="header"
      className={`${styles.header} ${solid ? styles.solid : ''}`}
    >
      <div className={styles.inner}>
        <Logo />

        <NavMenu className={styles.navDesktop} withBooking={false} />

        <div className={styles.ctaDesktop}>
          <ScrollButton targetId="contact" />
        </div>

        <button
          type="button"
          data-testid="header-burger"
          className={`${styles.burger} ${menuOpen ? styles.open : ''}`}
          aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>

      {mounted &&
        menuOpen &&
        createPortal(
          <div className={styles.overlay} data-testid="mobile-menu">
            <NavMenu className={styles.overlayNav} onLinkClick={closeMenu} />
          </div>,
          document.body
        )}
    </header>
  );
}

export default Header;
