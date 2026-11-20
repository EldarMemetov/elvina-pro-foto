import Link from 'next/link';
import styles from './Logo.module.scss';

function Logo({ href = '/', className = '' }) {
  return (
    <Link
      href={href}
      data-testid="logo"
      aria-label="На главную"
      className={`${styles.logo} ${className}`.trim()}
    >
      фото<span className={styles.dot}>.</span>
    </Link>
  );
}

export default Logo;
