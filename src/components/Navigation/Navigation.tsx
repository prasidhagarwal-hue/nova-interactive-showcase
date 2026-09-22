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
      
      <button className={styles.mobileMenuBtn} aria-label="Menu">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </header>
  );
};
