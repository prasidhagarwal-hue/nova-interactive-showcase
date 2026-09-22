import React, { useState, useEffect } from 'react';
import { motion, useTransform, useMotionValueEvent, MotionValue, useReducedMotion } from 'framer-motion';
import { ProductVisual } from '../ProductVisual/ProductVisual';
import { VariantSelector, type VariantType } from '../VariantSelector/VariantSelector';
import { CTA } from '../CTA/CTA';
import styles from './ProductStage.module.css';

interface ProductStageProps {
  scrollYProgress: MotionValue<number>;
  theme: 'dark' | 'light';
}

// Variant specific data
const variantData = {
  'X1': {
    title: 'NOVA X1',
    description: 'The workstation that thinks with you.',
  },
  'X1 PRO': {
    title: 'NOVA X1 PRO',
    description: 'Built for people who build what comes next.',
  },
  'X1 ULTRA': {
    title: 'NOVA X1 ULTRA',
    description: 'Maximum local intelligence.',
  }
};

type HotspotId = 'neural-engine' | 'display' | 'thermal-core';

export const ProductStage: React.FC<ProductStageProps> = ({ scrollYProgress, theme }) => {
  const [variant, setVariant] = useState<VariantType>('X1');
  const [suggestedHotspot, setSuggestedHotspot] = useState<HotspotId | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const prevScroll = React.useRef(0);

  // --- Scroll State Logic ---
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Determine suggested hotspot
    if (latest > 0.35 && latest < 0.55) {
      setSuggestedHotspot('neural-engine');
    } else if (latest > 0.55 && latest < 0.70) {
      setSuggestedHotspot('display');
    } else if (latest > 0.70 && latest < 0.85) {
      setSuggestedHotspot('thermal-core');
    } else {
      setSuggestedHotspot(null);
    }

    // Determine variant (force X1 PRO at the end only on threshold crossing)
    if (latest > 0.9 && prevScroll.current <= 0.9) {
      setVariant('X1 PRO');
    } else if (latest < 0.1 && prevScroll.current >= 0.1) {
      setVariant('X1');
    }
    prevScroll.current = latest;
  });

  // --- Visual Transforms ---
  
  // Responsive check: if window is narrow, we use less aggressive X translations
  // We can't use hooks for window size directly without a resize listener, so we'll use CSS clamped values
  // via string interpolation, or just use percentages.
  
  // STAGE 1 & 5: Unified Hero Text (Visible at start and end)
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 0.95], [1, 0, 0, 1]);
  const heroY = useTransform(
    scrollYProgress, 
    [0, 0.15, 0.85, 0.95], 
    [0, shouldReduceMotion ? 0 : -50, shouldReduceMotion ? 0 : 50, 0]
  );

  // STAGE 2: Discover / Shift (0.2 - 0.8)
  // Shift product: starts on the right (hero), moves left (middle)
  const productX = useTransform(
    scrollYProgress, 
    [0.15, 0.3, 0.8, 0.9], 
    ["15%", isMobile ? "0%" : "-10%", isMobile ? "0%" : "-10%", "15%"]
  );
  // Scale product: massively fills screen at start and end
  const productScale = useTransform(
    scrollYProgress, 
    [0.15, 0.3, 0.8, 0.9], 
    [isMobile ? 1.2 : 1.6, shouldReduceMotion ? 1 : 1.1, shouldReduceMotion ? 1 : 1.1, isMobile ? 1.2 : 1.6]
  );

  // STAGE 3: Tech Text - Neural (0.35 - 0.5)
  const tech1Opacity = useTransform(scrollYProgress, [0.3, 0.35, 0.5, 0.55], [0, 1, 1, 0]);
  const tech1Y = useTransform(scrollYProgress, [0.3, 0.35, 0.5, 0.55], [shouldReduceMotion ? 0 : 50, 0, 0, shouldReduceMotion ? 0 : -50]);

  // STAGE 4: Tech Text - Display/Thermal (0.55 - 0.8)
  const tech2Opacity = useTransform(scrollYProgress, [0.5, 0.55, 0.8, 0.85], [0, 1, 1, 0]);
  const tech2Y = useTransform(scrollYProgress, [0.5, 0.55, 0.8, 0.85], [shouldReduceMotion ? 0 : 50, 0, 0, shouldReduceMotion ? 0 : -50]);


  return (
    <div className={styles.stageContainer}>
      
      {/* Single Unified Hero Block */}
      <motion.div 
        className={`${styles.textOverlay} ${styles.heroText}`}
        style={{ opacity: heroOpacity, y: heroY }}
      >
        <h1 className={styles.title}>{variantData[variant].title.split(' ')[0]}</h1>
        <h2 className={styles.subtitle}>{variantData[variant].title.split(' ').slice(1).join(' ')}</h2>
        <p className={styles.description}>"{variantData[variant].description}"</p>
        
        <div className={styles.heroControls}>
          <VariantSelector selected={variant} onSelect={setVariant} />
          
          <div className={styles.techBadges}>
            <div className={styles.badge}>
              <span className={styles.badgeTitle}>AI Engine</span>
              <span className={styles.badgeValue}>Next-gen</span>
            </div>
            <div className={styles.badge}>
              <span className={styles.badgeTitle}>4K OLED</span>
              <span className={styles.badgeValue}>Display</span>
            </div>
            <div className={styles.badge}>
              <span className={styles.badgeTitle}>18 HRS</span>
              <span className={styles.badgeValue}>Battery</span>
            </div>
          </div>

          <CTA />
        </div>
      </motion.div>

      {/* Product Visual Container */}
      <div className={styles.visualArea}>
        <ProductVisual 
          variant={variant} 
          theme={theme}
          suggestedHotspot={suggestedHotspot}
          style={{ x: productX, scale: productScale }}
        />
      </div>

      {/* Storytelling Text (Stage 3) */}
      <motion.div 
        className={`${styles.textOverlay} ${styles.sideText}`}
        style={{ opacity: tech1Opacity, y: tech1Y }}
      >
        <h2 className={styles.storyTitle}>LOCAL<br/>INTELLIGENCE</h2>
        <p className={styles.storyDesc}>40 TOPS of dedicated AI processing.</p>
        <p className={styles.storySub}>Built for on-device machine learning and accelerated workflows.</p>
      </motion.div>

      {/* Storytelling Text (Stage 4) */}
      <motion.div 
        className={`${styles.textOverlay} ${styles.sideText}`}
        style={{ opacity: tech2Opacity, y: tech2Y }}
      >
        <h2 className={styles.storyTitle}>PRECISION<br/>ENGINEERED</h2>
        <p className={styles.storyDesc}>Uncompromising thermal architecture.</p>
        <p className={styles.storySub}>Sustained performance for the most demanding rendering tasks.</p>
      </motion.div>


    </div>
  );
};
