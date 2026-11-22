import Link from 'next/link';
import Image from 'next/image';
import styles from './Logo.module.scss';

const LOGO_SRC = '/image/logo.png';
const LOGO_WIDTH = 400;
const LOGO_HEIGHT = 120;

function Logo({ href = '/', className = '', light = false, priority = false }) {
  return (
    <Link
      href={href}
      data-testid="logo"
      className={`${styles.logo} ${className}`.trim()}
    >
      <Image
        src={LOGO_SRC}
        alt="Эльвина — фотограф на Кипре, на главную"
        width={LOGO_WIDTH}
        height={LOGO_HEIGHT}
        priority={priority}
        sizes="(min-width: 768px) 200px, 150px"
        className={`${styles.img} ${light ? styles.light : ''}`.trim()}
      />
    </Link>
  );
}

export default Logo;
