import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './HotspotInfo.module.css';

interface HotspotInfoProps {
  number: string;
  title: string;
  description: string;
  metric?: string;
  x: number; // The x coordinate of the hotspot
  y: number; // The y coordinate of the hotspot
  isVisible: boolean;
  onClose: () => void;
}

export const HotspotInfo: React.FC<HotspotInfoProps> = ({
  number,
  title,
  description,
  metric,
  x,
  y,
  isVisible,
  onClose
}) => {
  // Determine positioning based on which side of the image the hotspot is
  // This helps prevent the panel from going off-screen
  const isLeft = x < 50;
  const isTop = y < 50;

  // Simple line connector style
  const lineStyle = {
    [isLeft ? 'left' : 'right']: '100%',
    [isTop ? 'top' : 'bottom']: '20px',
    width: '40px',
    transformOrigin: isLeft ? 'left center' : 'right center',
  };

  const panelVariants = {
    hidden: { 
      opacity: 0, 
      x: isLeft ? -10 : 10,
      filter: 'blur(4px)'
    },
    visible: { 
      opacity: 1, 
      x: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
    },
    exit: { 
      opacity: 0,
      x: isLeft ? -5 : 5,
      filter: 'blur(4px)',
      transition: { duration: 0.2 }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`${styles.infoPanel} ${isLeft ? styles.alignLeft : styles.alignRight}`}
          style={{
            left: isLeft ? `${x}%` : 'auto',
            right: !isLeft ? `${100 - x}%` : 'auto',
            top: isTop ? `${y}%` : 'auto',
            bottom: !isTop ? `${100 - y}%` : 'auto',
            marginLeft: isLeft ? '40px' : '0',
            marginRight: !isLeft ? '40px' : '0',
            marginTop: isTop ? '-20px' : '0',
            marginBottom: !isTop ? '-20px' : '0'
          }}
          variants={panelVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Connecting Line */}
          <motion.div 
            className={styles.connectingLine}
            style={lineStyle}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          />

          <div className={styles.header}>
            <div className={styles.numberWrapper}>
              <span className={styles.number}>{number}</span>
            </div>
            <h3 className={styles.title}>{title}</h3>
            
            {/* Mobile Close Button */}
            <button className={styles.closeButton} onClick={onClose} aria-label="Close details">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 1L1 13M1 1L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          
          {metric && (
            <div className={styles.metric}>{metric}</div>
          )}
          
          <p className={styles.description}>{description}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
