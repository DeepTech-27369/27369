# AI Development Rules

This document outlines the tech stack and specific rules for using libraries within this project. Following these guidelines ensures consistency, maintainability, and leverages the strengths of our chosen tools.

## Tech Stack Overview

This is a modern web application built with the following core technologies:

*   **Framework:** React 19, utilizing functional components and hooks.
*   **Build Tool:** Vite for an extremely fast and efficient development experience.
*   **Language:** TypeScript for robust type-checking and improved code quality.
*   **Routing:** `react-router-dom` for handling all client-side navigation and views.
*   **Styling:** Standard CSS files imported directly into components. We use descriptive, component-scoped class names (e.g., `.team-carousel-title`) to avoid conflicts.
*   **Animation:** GSAP (GreenSock Animation Platform) is included for high-performance, complex animations.
*   **3D/WebGL:** The `ogl` library is used for creating lightweight and efficient WebGL-based visuals, like the particle effects.

## Library Usage Guidelines

To maintain a clean and elegant codebase, please adhere to the following rules:

1.  **React:**
    *   Always use functional components with hooks (`useState`, `useEffect`, `useRef`, etc.).
    *   Keep components small and focused on a single responsibility. Create new component files for distinct pieces of UI.
    *   Place all reusable components in the `src/components/` directory.

2.  **React Router (`react-router-dom`):**
    *   All application routes should be defined and managed within `src/App.tsx`.
    *   Use the `Link` component or the `useNavigate` hook for all internal navigation to ensure the single-page application experience is preserved.

3.  **Styling (CSS):**
    *   Create a dedicated `.css` file for each component that requires styling (e.g., `TeamCarousel.css` for `TeamCarousel.tsx`).
    *   Use clear, BEM-like class names that are prefixed with the component's name to prevent global scope conflicts (e.g., `.pc-card`, `.pc-user-info`).
    *   Avoid inline styles unless they are required for dynamic values calculated by JavaScript (e.g., animation transforms).

4.  **Animation (GSAP):**
    *   Use GSAP for any complex UI animations, sequenced transitions, or effects where performance is critical.
    *   For simple hover effects (like color or background changes), standard CSS transitions are acceptable. For anything involving movement, timelines, or physics, prefer GSAP.

5.  **3D Graphics (`ogl`):**
    *   The `ogl` library should **only** be used for creating WebGL-based components, such as the `Particles.tsx` background.
    *   Do not use `ogl` for rendering standard 2D UI elements. Stick to React components and CSS for the main interface.