import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion, useSpring } from 'framer-motion';
import styles from './ProductVisual.module.css';
import { Hotspot } from '../Hotspot/Hotspot';
import { HotspotInfo } from '../HotspotInfo/HotspotInfo';

interface ProductVisualProps {
  variant: 'X1' | 'X1 PRO' | 'X1 ULTRA';
  suggestedHotspot?: HotspotId | null;
  style?: any; // To accept motion styles
}

const variantStyles = {
  'X1': {
    filter: 'brightness(1) contrast(1) saturate(1) hue-rotate(0deg)',
    lightColor: 'rgba(255, 255, 255, 0.15)',
    scale: 1,
  },
  'X1 PRO': {
    filter: 'brightness(0.85) contrast(1.15) saturate(1.1) hue-rotate(5deg)',
    lightColor: 'rgba(58, 134, 255, 0.3)',
    scale: 1.02,
  },
  'X1 ULTRA': {
    filter: 'brightness(0.75) contrast(1.25) saturate(1.3) hue-rotate(-10deg)',
    lightColor: 'rgba(138, 43, 226, 0.4)',
    scale: 1.04,
  }
};

type HotspotId = 'neural-engine' | 'display' | 'thermal-core';

interface HotspotConfig {
  id: HotspotId;
  label: string;
  number: string;
  position: { x: number, y: number };
  variants: {
    'X1': { value?: string; description: string };
    'X1 PRO': { value?: string; description: string };
    'X1 ULTRA': { value?: string; description: string };
  }
}

const hotspotsData: HotspotConfig[] = [
  {
    id: 'neural-engine',
    label: 'NEURAL ENGINE',
    number: '01',
    position: { x: 35, y: 55 },
    variants: {
      'X1': { value: '20 TOPS', description: 'Local AI processing designed for fast on-device intelligence.' },
      'X1 PRO': { value: '40 TOPS', description: 'Advanced AI processing designed for demanding local intelligence.' },
      'X1 ULTRA': { value: '60 TOPS', description: 'Maximum AI processing capability for the most intensive on-device workflows.' },
    }
  },
  {
    id: 'display',
    label: 'HOLOGRAPHIC DISPLAY',
    number: '02',
    position: { x: 50, y: 25 },
    variants: {
      'X1': { description: 'Standard high-density visuals engineered for daily tasks.' },
      'X1 PRO': { description: 'Ultra-high-density visuals engineered for creators and technical workflows.' },
      'X1 ULTRA': { description: 'Extreme-density visuals engineered for immersive technical simulation.' },
    }
  },
  {
    id: 'thermal-core',
    label: 'THERMAL CORE',
    number: '03',
    position: { x: 65, y: 65 },
    variants: {
      'X1': { description: 'A standard thermal architecture designed to sustain everyday workloads.' },
      'X1 PRO': { description: 'A precision thermal architecture designed to sustain demanding workloads.' },
      'X1 ULTRA': { description: 'An advanced thermal architecture designed to sustain maximum continuous performance.' },
    }
  }
];

// Maximum rotation angles in degrees — intentionally small for subtlety
const MAX_ROTATE_X = 5;
const MAX_ROTATE_Y = 5;
// Parallax offset for the ambient light (moves opposite to product for depth)
const LIGHT_OFFSET_FACTOR = 15;

export const ProductVisual: React.FC<ProductVisualProps> = ({ variant, suggestedHotspot = null, style }) => {
  const currentStyle = variantStyles[variant];
  const [activeHotspotId, setActiveHotspotId] = useState<HotspotId | null>(null);
  const [hoveredHotspotId, setHoveredHotspotId] = useState<HotspotId | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // --- 3D Pointer Interaction (springs for silky smooth return-to-neutral) ---
  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);
  const lightX = useSpring(0, springConfig);
  const lightY = useSpring(0, springConfig);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (isMobile || shouldReduceMotion) return;
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    // Normalise pointer position to -1…+1 relative to container center
    const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

    // Product rotation: pointer-right → rotate-Y positive, pointer-down → rotate-X negative
    rotateY.set(normX * MAX_ROTATE_Y);
    rotateX.set(-normY * MAX_ROTATE_X);

    // Ambient light moves in the opposite direction for depth parallax
    lightX.set(-normX * LIGHT_OFFSET_FACTOR);
    lightY.set(-normY * LIGHT_OFFSET_FACTOR);
  }, [isMobile, shouldReduceMotion, rotateX, rotateY, lightX, lightY]);

  const handlePointerLeave = useCallback(() => {
    // Smoothly return to neutral via springs
    rotateX.set(0);
    rotateY.set(0);
    lightX.set(0);
    lightY.set(0);
  }, [rotateX, rotateY, lightX, lightY]);

  const handleHotspotClick = (e: React.MouseEvent, id: HotspotId) => {
    e.stopPropagation(); // Prevent container click from immediately closing
    setActiveHotspotId(prev => prev === id ? null : id);
    setHoveredHotspotId(null);
  };

  const handleContainerClick = () => {
    setActiveHotspotId(null);
  };

  // The hotspot to display info for is either the active (clicked) one, the hovered one, or the one suggested by the parent (unless another is actively clicked)
  const displayHotspotId = activeHotspotId || hoveredHotspotId || suggestedHotspot;

  return (
    <motion.div
      className={styles.visualContainer}
      ref={containerRef}
      onClick={handleContainerClick}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        ...style,
        perspective: 800,
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={variant}
          initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: currentStyle.scale, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className={styles.imageWrapper}
          style={{
            rotateX: isMobile || shouldReduceMotion ? 0 : rotateX,
            rotateY: isMobile || shouldReduceMotion ? 0 : rotateY,
            transformStyle: 'preserve-3d' as const,
          }}
        >
          <img 
            src="/nova_product.jpg" 
            alt={`NOVA ${variant}`} 
            className={styles.productImage}
            style={{ filter: currentStyle.filter }}
            draggable="false"
          />
          
          {/* Hotspots Layer — kept flat in the transform hierarchy so panels stay stable */}
          <div className={styles.hotspotsLayer}>
            {hotspotsData.map(hotspot => (
              <Hotspot
                key={hotspot.id}
                id={hotspot.id}
                x={hotspot.position.x}
                y={hotspot.position.y}
                isActive={activeHotspotId === hotspot.id || hoveredHotspotId === hotspot.id}
                onMouseEnter={() => !activeHotspotId && setHoveredHotspotId(hotspot.id)}
                onMouseLeave={() => setHoveredHotspotId(null)}
                onClick={(e) => handleHotspotClick(e, hotspot.id)}
              />
            ))}

            {/* Info Panels Layer */}
            {hotspotsData.map(hotspot => {
              const variantData = hotspot.variants[variant];
              return (
                <HotspotInfo
                  key={`info-${hotspot.id}`}
                  number={hotspot.number}
                  title={hotspot.label}
                  description={variantData.description}
                  metric={variantData.value}
                  x={hotspot.position.x}
                  y={hotspot.position.y}
                  isVisible={displayHotspotId === hotspot.id}
                  onClose={() => setActiveHotspotId(null)}
                />
              )
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Ambient Light — parallax offset for depth */}
      <motion.div
        className={styles.ambientLight}
        animate={{ backgroundColor: currentStyle.lightColor, scale: currentStyle.scale }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        style={{
          x: isMobile || shouldReduceMotion ? 0 : lightX,
          y: isMobile || shouldReduceMotion ? 0 : lightY,
        }}
      />
    </motion.div>
  );
};
