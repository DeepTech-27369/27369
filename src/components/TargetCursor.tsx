import React, { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import "./TargetCursor.css";

export interface TargetCursorProps {
  targetSelector?: string;
  hideDefaultCursor?: boolean;
}

const TargetCursor: React.FC<TargetCursorProps> = ({
  targetSelector = ".cursor-target, button, a, .nav-link, .cta-button, .feature-card, .content-card, .contact-card, .member-card",
  hideDefaultCursor = true,
}) => {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);

  const moveCursor = useCallback((x: number, y: number) => {
    if (cursorRef.current) {
      // Use gsap.set for instant "snapping" movement
      gsap.set(cursorRef.current, { x, y });
    }
  }, []);

  useEffect(() => {
    if (!cursorRef.current) return;

    const originalCursor = document.body.style.cursor;
    if (hideDefaultCursor) {
      document.body.style.cursor = 'none';
    }

    const cursor = cursorRef.current;
    let activeTarget: Element | null = null;
    let currentLeaveHandler: (() => void) | null = null;

    gsap.set(cursor, {
      xPercent: -50,
      yPercent: -50,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });

    const moveHandler = (e: MouseEvent) => {
      // Always ensure the default cursor is hidden if the prop is set
      if (hideDefaultCursor) {
        document.body.style.cursor = 'none';
      }
      
      const el = document.elementFromPoint(e.clientX, e.clientY) as Element | null;
      const isForm = el && (el.matches('input, textarea, select, [contenteditable], iframe, .no-custom-cursor'));
      
      if (isForm) {
        // Hide custom cursor over forms and iframes
        if (cursor) cursor.style.opacity = '0';
      } else {
        // Show custom cursor elsewhere
        if (cursor) cursor.style.opacity = '1';
      }
      moveCursor(e.clientX, e.clientY);
    };
    window.addEventListener("mousemove", moveHandler);

    const scrollHandler = () => {
      if (!activeTarget || !cursor) return;
      
      const mouseX = gsap.getProperty(cursor, "x") as number;
      const mouseY = gsap.getProperty(cursor, "y") as number;
      
      const elementUnderMouse = document.elementFromPoint(mouseX, mouseY);
      const isStillOverTarget = elementUnderMouse && (
        elementUnderMouse === activeTarget || 
        elementUnderMouse.closest(targetSelector) === activeTarget
      );
      
      if (!isStillOverTarget && currentLeaveHandler) {
        currentLeaveHandler();
      }
    };
    window.addEventListener("scroll", scrollHandler, { passive: true });

    const mouseDownHandler = (): void => {
      if (!dotRef.current) return;
      gsap.to(dotRef.current, { scale: 0.7, duration: 0.3 });
      gsap.to(cursor, { scale: 0.9, duration: 0.2 });
    };

    const mouseUpHandler = (): void => {
      if (!dotRef.current) return;
      gsap.to(dotRef.current, { scale: 1, duration: 0.3 });
      gsap.to(cursor, { scale: 1, duration: 0.2 });
    };
    window.addEventListener("mousedown", mouseDownHandler);
    window.addEventListener("mouseup", mouseUpHandler);

    const enterHandler = (e: MouseEvent) => {
      const directTarget = e.target as Element | null;
      const found = directTarget?.closest(targetSelector);
      if (!found || !cursor) return;

      activeTarget = found;
      cursor.classList.add('cursor-active');

      const leaveHandler = () => {
        cursor.classList.remove('cursor-active');
        activeTarget = null;
        found.removeEventListener('mouseleave', leaveHandler);
        currentLeaveHandler = null;
      };
      found.addEventListener('mouseleave', leaveHandler, { once: true });
      currentLeaveHandler = leaveHandler;
    };
    window.addEventListener("mouseover", enterHandler, { passive: true });

    return () => {
      window.removeEventListener("mousemove", moveHandler);
      window.removeEventListener("mouseover", enterHandler);
      window.removeEventListener("scroll", scrollHandler);
      window.removeEventListener("mousedown", mouseDownHandler);
      window.removeEventListener("mouseup", mouseUpHandler);
      document.body.style.cursor = originalCursor;
      if (cursor) {
        cursor.classList.remove('cursor-active');
        cursor.style.opacity = '';
      }
    };
  }, [targetSelector, moveCursor, hideDefaultCursor]);

  return (
    <div ref={cursorRef} className="target-cursor-wrapper" aria-hidden="true">
      <div ref={dotRef} className="target-cursor-dot" />
      <div className="target-cursor-ring" />
    </div>
  );
};

export default TargetCursor;