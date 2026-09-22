import React from 'react';
import { motion } from 'framer-motion';
import styles from './Hotspot.module.css';

interface HotspotProps {
  id: string;
  x: number;
  y: number;
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: (e: React.MouseEvent) => void;
}

export const Hotspot: React.FC<HotspotProps> = ({
  id,
  x,
  y,
  isActive,
  onMouseEnter,
  onMouseLeave,
  onClick
}) => {
  return (
    <motion.button
      className={`${styles.hotspot} ${isActive ? styles.active : ''}`}
      style={{ left: `${x}%`, top: `${y}%` }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      aria-label={`View details for ${id}`}
      aria-expanded={isActive}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5, type: 'spring', stiffness: 200 }}
    >
      <div className={styles.innerDot} />
      <div className={styles.pulseRing} />
    </motion.button>
  );
};
