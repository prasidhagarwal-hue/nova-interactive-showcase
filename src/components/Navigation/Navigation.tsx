import React, { useState } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import styles from './Navigation.module.css';

interface NavigationProps {
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
}

export const Navigation: React.FC<NavigationProps> = ({ theme, setTheme }) => {
  const [activeSection, setActiveSection] = useState<'product' | 'technology' | 'explore'>('product');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.3) setActiveSection('product');
    else if (latest >= 0.3 && latest < 0.75) setActiveSection('technology');
    else setActiveSection('explore');
  });

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, progress: number) => {
    e.preventDefault();
    setIsMobileMenuOpen(false); // Close menu on click
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: scrollableHeight * progress,
      behavior: 'smooth'
    });
  };

  return (
    <header className={styles.header}>
      <div className={styles.brand}>NOVA</div>
      <nav className={`${styles.nav} ${isMobileMenuOpen ? styles.mobileOpen : ''}`}>
        <a 
          href="#product" 
          className={`${styles.navLink} ${activeSection === 'product' ? styles.active : ''}`}
          onClick={(e) => handleNavClick(e, 0)}
        >
          Product
        </a>
        <a 
          href="#technology" 
          className={`${styles.navLink} ${activeSection === 'technology' ? styles.active : ''}`}
          onClick={(e) => handleNavClick(e, 0.4)}
        >
          Technology
        </a>
        <a 
          href="#explore" 
          className={`${styles.navLink} ${activeSection === 'explore' ? styles.active : ''}`}
          onClick={(e) => handleNavClick(e, 1)}
        >
          Explore
        </a>
      </nav>
      <div className={styles.status}>
        <button 
          className={styles.themeToggle} 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <div className={styles.statusIndicator}>
          <span className={styles.statusDot}></span>
          SYSTEM ONLINE
        </div>
      </div>
      
      <button 
        className={styles.mobileMenuBtn} 
        aria-label="Toggle Menu"
        aria-expanded={isMobileMenuOpen}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          {isMobileMenuOpen ? (
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          ) : (
            <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          )}
        </svg>
      </button>
    </header>
  );
};
