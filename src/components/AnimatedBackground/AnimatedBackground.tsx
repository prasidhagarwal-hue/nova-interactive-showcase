import React, { useState } from 'react';
import styles from './AnimatedBackground.module.css';

interface AnimatedBackgroundProps {
  theme: 'dark' | 'light';
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ theme }) => {
  const [particles] = useState<Array<{ id: number; left: string; top: string; delay: string; duration: string; size: string; opacity: number }>>(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${15 + Math.random() * 20}s`,
      size: `${2 + Math.random() * 4}px`,
      opacity: 0.1 + Math.random() * 0.4
    }));
  });

  return (
    <div className={`${styles.background} ${theme === 'light' ? styles.light : styles.dark}`}>
      {/* Background gradient layers */}
      <div className={styles.gradientLayer1}></div>
      <div className={styles.gradientLayer2}></div>
      
      {/* Floating particles */}
      <div className={styles.particlesContainer}>
        {particles.map((p) => (
          <div
            key={p.id}
            className={styles.particle}
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              opacity: p.opacity,
              animationDelay: p.delay,
              animationDuration: p.duration
            }}
          />
        ))}
      </div>
    </div>
  );
};
