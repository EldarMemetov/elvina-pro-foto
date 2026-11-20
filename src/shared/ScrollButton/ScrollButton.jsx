'use client';

import styles from './ScrollButton.module.scss';

function ScrollButton({
  targetId = 'contact',
  children = 'Забронировать',
  className = '',
  onClick,
  testId = 'scroll-button',
}) {
  const handleClick = () => {
    const target = document.getElementById(targetId);
    onClick?.();

    requestAnimationFrame(() => {
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  return (
    <button
      type="button"
      data-testid={testId}
      className={`${styles.button} ${className}`.trim()}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

export default ScrollButton;
