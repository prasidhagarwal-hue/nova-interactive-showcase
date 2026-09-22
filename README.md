# NOVA — Interactive AI Workstation Showcase

## Overview
NOVA is an interactive, premium product showcase for a fictional next-generation AI workstation ("The workstation that thinks with you"). It features a cinematic, scroll-driven storytelling experience, interactive 3D depth, and seamless product variant switching.

This project was built for the GDG on Campus SRM 2026-27 Technical Domain recruitment task: "Interactive Product Showcase using Framer".

## Features
- **Product Variants**: Seamless switching between NOVA X1, X1 PRO, and X1 ULTRA models with fluid, interconnected animations.
- **Interactive Hotspots**: Discoverable technical details via interactive product hotspots that reveal beautifully styled information panels.
- **Cinematic Scroll Storytelling**: A 5-stage scroll-driven sequence that progressively reveals product features while intelligently scaling and shifting the product visual.
- **3D / Depth Interaction**: A subtle, physically grounded pointer-tracking interaction that tilts the product and shifts ambient lighting to create a premium sense of depth.
- **Responsive Design**: A meticulously crafted mobile-first experience that adapts layout, scroll behavior, and touch targets across all breakpoints.
- **Accessibility**: Full keyboard navigation, visible focus rings, and robust support for `prefers-reduced-motion` (gracefully disabling parallax, 3D tilts, and complex scaling).

## Tech / Tools
- React 19
- TypeScript
- Vite
- Framer Motion (for all animations, scroll tracking, and spring physics)
- CSS Modules (Vanilla CSS for scalable, isolated styling)
- Lucide React (Icons)

## Design Direction
The project employs a premium, futuristic visual identity designed to feel cinematic and high-tech. It utilizes a dark mode color palette, glassmorphism for floating UI elements, and highly controlled, smooth typography (Inter/system-sans). 

## Interaction Architecture
- **Components**: The architecture is highly modular, splitting logic between `ProductStage` (scroll orchestration), `ProductVisual` (3D transforms and hotspot layers), and individual UI elements like `VariantSelector` and `CTA`.
- **State Management**: React `useState` drives variant selection and active hotspots.
- **Animations**: `framer-motion`'s `<AnimatePresence>` handles smooth variant transitions, while `useTransform` maps vertical scroll progress (`scrollYProgress`) directly to visual styles (opacity, scale, translate) without expensive React re-renders. The 3D depth effect utilizes `useSpring` for silky, physics-based pointer tracking.

## How to Run

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/` in your browser.

3. **Build for production**:
   ```bash
   npm run build
   ```

## Screenshots
*(Add screenshots here after deploying)*

## Live Demo
*(Add URL here if deployed)*
