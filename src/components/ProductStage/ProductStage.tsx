import React, { useState, useEffect } from 'react';
import { motion, useTransform, useMotionValueEvent, MotionValue, useReducedMotion } from 'framer-motion';
import { ProductVisual } from '../ProductVisual/ProductVisual';
import { VariantSelector, type VariantType } from '../VariantSelector/VariantSelector';
import { CTA } from '../CTA/CTA';
import styles from './ProductStage.module.css';

interface ProductStageProps {
  scrollYProgress: MotionValue<number>;
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

export const ProductStage: React.FC<ProductStageProps> = ({ scrollYProgress }) => {
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

    // Determine variant (force X1 PRO at the end)
    if (latest > 0.9) {
      setVariant('X1 PRO');
    } else if (latest < 0.1) {
      // Allow manual selection to stick if they aren't at the very top/bottom, 
      // but if they scroll all the way back up, reset to X1 to re-tell the story.
      setVariant('X1');
    }
  });

  // --- Visual Transforms ---
  
  // Responsive check: if window is narrow, we use less aggressive X translations
  // We can't use hooks for window size directly without a resize listener, so we'll use CSS clamped values
  // via string interpolation, or just use percentages.
  
  // STAGE 1: Intro (0 - 0.2)
  const introOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const introY = useTransform(scrollYProgress, [0, 0.15], [0, shouldReduceMotion ? 0 : -50]);

  // STAGE 2: Discover / Shift (0.2 - 0.8)
  // Shift product to the left on desktop, keep centered on mobile
  const productX = useTransform(
    scrollYProgress, 
    [0.15, 0.3, 0.8, 0.9], 
    ["0%", isMobile ? "0%" : "-20%", isMobile ? "0%" : "-20%", "0%"]
  );
  const productScale = useTransform(scrollYProgress, [0.15, 0.3, 0.8, 0.9], [1, shouldReduceMotion ? 1 : 1.1, shouldReduceMotion ? 1 : 1.1, 1]);

  // STAGE 3: Tech Text - Neural (0.35 - 0.5)
  const tech1Opacity = useTransform(scrollYProgress, [0.3, 0.35, 0.5, 0.55], [0, 1, 1, 0]);
  const tech1Y = useTransform(scrollYProgress, [0.3, 0.35, 0.5, 0.55], [shouldReduceMotion ? 0 : 50, 0, 0, shouldReduceMotion ? 0 : -50]);

  // STAGE 4: Tech Text - Display/Thermal (0.55 - 0.8)
  const tech2Opacity = useTransform(scrollYProgress, [0.5, 0.55, 0.8, 0.85], [0, 1, 1, 0]);
  const tech2Y = useTransform(scrollYProgress, [0.5, 0.55, 0.8, 0.85], [shouldReduceMotion ? 0 : 50, 0, 0, shouldReduceMotion ? 0 : -50]);

  // STAGE 5: Final Reveal (0.85 - 1.0)
  const finalOpacity = useTransform(scrollYProgress, [0.85, 0.95], [0, 1]);
  const finalY = useTransform(scrollYProgress, [0.85, 0.95], [shouldReduceMotion ? 0 : 50, 0]);

  return (
    <div className={styles.stageContainer}>
      
      {/* Intro Text (Stage 1) */}
      <motion.div 
        className={`${styles.textOverlay} ${styles.introText}`}
        style={{ opacity: introOpacity, y: introY }}
      >
        <h1 className={styles.title}>{variantData['X1'].title.split(' ')[0]}</h1>
        <h2 className={styles.subtitle}>{variantData['X1'].title.split(' ').slice(1).join(' ')}</h2>
        <p className={styles.description}>"{variantData['X1'].description}"</p>
        
        {/* Mobile-only early controls */}
        {isMobile && (
          <div className={styles.mobileHeroControls}>
            <VariantSelector selected={variant} onSelect={setVariant} />
            <CTA />
          </div>
        )}
      </motion.div>

      {/* Product Visual Container */}
      <div className={styles.visualArea}>
        <ProductVisual 
          variant={variant} 
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

      {/* Final Reveal Text & CTA (Stage 5) */}
      <motion.div 
        className={`${styles.textOverlay} ${styles.finalText}`}
        style={{ opacity: finalOpacity, y: finalY }}
      >
        <h1 className={styles.title}>{variantData['X1 PRO'].title.split(' ')[0]}</h1>
        <h2 className={styles.subtitle}>{variantData['X1 PRO'].title.split(' ').slice(1).join(' ')}</h2>
        <p className={styles.description}>"{variantData['X1 PRO'].description}"</p>
        
        <div className={styles.controlsArea}>
          <VariantSelector selected={variant} onSelect={setVariant} />
          <CTA />
        </div>
      </motion.div>

    </div>
  );
};
