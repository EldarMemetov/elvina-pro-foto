import Link from 'next/link';
import ScrollButton from '@/shared/ScrollButton/ScrollButton';
import styles from './NavMenu.module.scss';

const LINKS = [
  { href: '/', label: 'Главная', id: 'home' },
  { href: '#about', label: 'Обо мне', id: 'about' },
  { href: '#services', label: 'Услуги', id: 'services' },
  { href: '#portfolio', label: 'Портфолио', id: 'portfolio' },
  { href: '#contact', label: 'Контакты', id: 'contacts' },
];

function NavMenu({ className = '', onLinkClick, withBooking = true }) {
  return (
    <nav
      className={className}
      aria-label="Основная навигация"
      data-testid="nav-menu"
    >
      <ul className={styles.list}>
        {LINKS.map(({ href, label, id }, i) => (
          <li key={id} className={styles.item}>
            <Link
              href={href}
              data-testid={`nav-link-${id}`}
              className={styles.link}
              onClick={onLinkClick}
            >
              <span className={styles.index}>{`0${i + 1}`}</span>
              {label}
            </Link>
          </li>
        ))}
      </ul>

      {withBooking && (
        <ScrollButton
          targetId="contact"
          className={styles.booking}
          onClick={onLinkClick}
        >
          Забронировать
        </ScrollButton>
      )}
    </nav>
  );
}

export default NavMenu;
