'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './Locations.module.scss';

const pad = (n) => String(n).padStart(2, '0');

function LocationPicker({ locations }) {
  const [active, setActive] = useState(0);
  const current = locations[active];

  return (
    <div className={styles.picker} data-testid="locations-picker">
      <div className={styles.stage}>
        {locations.map(({ name, image, alt, position }, i) => (
          <Image
            key={name}
            src={image}
            alt={alt}
            fill
            quality={80}
            sizes="(min-width: 1024px) 400px, (min-width: 768px) 45vw, 100vw"
            aria-hidden={i !== active}
            style={{ objectPosition: position }}
            className={`${styles.img} ${i === active ? styles.imgActive : ''}`}
          />
        ))}

        <div className={styles.shade} aria-hidden="true" />

        <p className={styles.stageCaption} aria-hidden="true">
          <span className={styles.stageName}>{current.name}</span>
          <span className={styles.stageCoords}>{current.coords}</span>
        </p>
      </div>

      <ul className={styles.list} role="list" data-testid="locations-list">
        {locations.map(({ name, spots }, i) => {
          const isActive = i === active;

          return (
            <li
              key={name}
              className={`${styles.row} ${isActive ? styles.rowActive : ''}`}
              data-testid={`location-${i + 1}`}
            >
              <h3 className={styles.heading}>
                <button
                  type="button"
                  className={styles.rowBtn}
                  aria-expanded={isActive}
                  aria-controls={`location-spots-${i}`}
                  onClick={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onPointerEnter={(e) => {
                    if (e.pointerType === 'mouse') setActive(i);
                  }}
                >
                  <span className={styles.rowNum} aria-hidden="true">
                    {pad(i + 1)}
                  </span>
                  <span className={styles.name}>{name}</span>
                </button>
              </h3>

              <div id={`location-spots-${i}`} className={styles.spots}>
                <div className={styles.spotsInner}>
                  <p className={styles.spotsText}>{spots}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default LocationPicker;
