import React, { useRef } from 'react';
import { useScroll, motion } from 'framer-motion';
import styles from './ScrollSequence.module.css';

interface ScrollSequenceProps {
  children: (props: { scrollYProgress: any }) => React.ReactNode;
}

export const ScrollSequence: React.FC<ScrollSequenceProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className={styles.scrollContainer}>
      <div className={styles.stickyStage}>
        {children({ scrollYProgress })}
        
        {/* Simple Progress Indicator */}
        <div className={styles.progressIndicator}>
          <motion.div 
            className={styles.progressBar}
            style={{ scaleY: scrollYProgress, transformOrigin: 'top' }}
          />
          <div className={styles.progressDots}>
            <div className={styles.dot} />
            <div className={styles.dot} />
            <div className={styles.dot} />
            <div className={styles.dot} />
            <div className={styles.dot} />
          </div>
        </div>
      </div>
    </div>
  );
};
