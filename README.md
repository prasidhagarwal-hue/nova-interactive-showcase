# NOVA — Interactive AI Workstation Showcase

![NOVA Interactive Showcase](https://img.shields.io/badge/Project-NOVA-2563EB?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer)

## Overview
NOVA is an interactive, premium product showcase for a fictional next-generation AI workstation ("The workstation that thinks with you"). It features a cinematic, scroll-driven storytelling experience, interactive 3D depth, and seamless product variant switching.

This project was built for the GDG on Campus SRM 2026-27 Technical Domain recruitment task: "Interactive Product Showcase using Framer".

## Features & Enhancements
- **Cinematic Scroll Storytelling**: A scroll-driven sequence that progressively reveals product features while scaling and shifting the product visual immersively.
- **Product Variants**: Seamless switching between NOVA X1, X1 PRO, and X1 ULTRA models with fluid, interconnected animations.
- **Interactive Hotspots**: Discoverable technical details via interactive product hotspots that reveal styled information panels.
- **3D / Depth Interaction**: A subtle, physically grounded pointer-tracking interaction that tilts the product and shifts ambient lighting to create a premium sense of depth.
- **Premium Dark Studio Environment**: A deeply immersive, perfectly balanced dark environment showcasing the product in a premium studio context with floating particles and soft gradients.
- **Model Comparison Section**: A frosted-glass comparison table designed to showcase model specifications side-by-side.
- **Responsive Design**: A meticulously crafted mobile-first experience that adapts layout, scroll behavior, and touch targets across all breakpoints.
- **Accessibility**: Full keyboard navigation, visible focus rings, and robust support for `prefers-reduced-motion` (gracefully disabling parallax, 3D tilts, and complex scaling).

## Tech Stack
- **Framework**: React 19 + TypeScript + Vite
- **Animations**: Framer Motion (for all animations, scroll tracking, and spring physics)
- **Styling**: CSS Modules (Vanilla CSS for scalable, isolated styling)
- **Icons**: Lucide React

## Design & Architecture
- **Visual Direction**: The project employs a premium, futuristic visual identity designed to feel cinematic and high-tech. It utilizes a sophisticated dark mode palette, glassmorphism for floating UI elements, and highly controlled, smooth typography.
- **Component Architecture**: The architecture is highly modular, splitting logic between `ProductStage` (scroll orchestration), `ProductVisual` (3D transforms and hotspot layers), and individual UI elements like `VariantSelector` and `CTA`.
- **Performance & State**: React `useState` drives variant selection and active hotspots. `framer-motion`'s `<AnimatePresence>` handles smooth variant transitions, while `useTransform` maps vertical scroll progress (`scrollYProgress`) directly to visual styles (opacity, scale, translate) without expensive React re-renders. The 3D depth effect utilizes `useSpring` for silky, physics-based pointer tracking.

## Getting Started

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

## Live Demo
*(Add URL here if deployed)*
