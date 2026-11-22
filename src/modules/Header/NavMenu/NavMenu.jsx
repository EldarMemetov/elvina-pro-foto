import Link from 'next/link';
import ScrollButton from '@/shared/ScrollButton/ScrollButton';
import { NAV_LINKS } from '@/shared/constants/nav';
import styles from './NavMenu.module.scss';

function NavMenu({ className = '', onLinkClick, withBooking = true }) {
  return (
    <nav
      className={className}
      aria-label="Основная навигация"
      data-testid="nav-menu"
    >
      <ul className={styles.list}>
        {NAV_LINKS.map(({ href, label, id }, i) => (
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
