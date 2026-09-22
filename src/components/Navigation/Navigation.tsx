import React from 'react';
import styles from './Navigation.module.css';

export const Navigation: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>NOVA</div>
      <nav className={styles.nav}>
        <a href="#product" className={styles.navLink}>Product</a>
        <a href="#technology" className={styles.navLink}>Technology</a>
        <a href="#explore" className={styles.navLink}>Explore</a>
      </nav>
      <div className={styles.status}>
        <span className={styles.statusDot}></span>
        SYSTEM ONLINE
      </div>
    </header>
  );
};
