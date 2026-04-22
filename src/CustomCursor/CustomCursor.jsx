import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    const mouseEnter = () => setIsVisible(true);
    const mouseLeave = () => setIsVisible(false);
    const mouseDown = () => setIsClicking(true);
    const mouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseenter', mouseEnter);
    document.addEventListener('mouseleave', mouseLeave);
    document.addEventListener('mousedown', mouseDown);
    document.addEventListener('mouseup', mouseUp);

    // Enhanced hover detection
    const enhanceHoverEffects = () => {
      // Links
      document.querySelectorAll('a').forEach(el => {
        el.addEventListener('mouseenter', () => setCursorVariant('link'));
        el.addEventListener('mouseleave', () => setCursorVariant('default'));
      });

      // Buttons
      document.querySelectorAll('button').forEach(el => {
        el.addEventListener('mouseenter', () => setCursorVariant('button'));
        el.addEventListener('mouseleave', () => setCursorVariant('default'));
      });

      // Input fields
      document.querySelectorAll('input, textarea').forEach(el => {
        el.addEventListener('mouseenter', () => setCursorVariant('input'));
        el.addEventListener('mouseleave', () => setCursorVariant('default'));
      });

      // Download / CTA buttons (adjust selector to match your project)
      const ctaButton = document.querySelector('[class*="bg-gradient-to-r"], .cta-button');
      if (ctaButton) {
        ctaButton.addEventListener('mouseenter', () => setCursorVariant('download'));
        ctaButton.addEventListener('mouseleave', () => setCursorVariant('default'));
      }

      // Card / text blocks
      document.querySelectorAll('.bg-gray-800, .rounded-2xl, .card').forEach(el => {
        el.addEventListener('mouseenter', () => setCursorVariant('text'));
        el.addEventListener('mouseleave', () => setCursorVariant('default'));
      });

      // Tech / interactive tiles
      document.querySelectorAll('[class*="p-3"][class*="bg-"], .tech-icon').forEach(el => {
        el.addEventListener('mouseenter', () => setCursorVariant('tech'));
        el.addEventListener('mouseleave', () => setCursorVariant('default'));
      });
    };

    setTimeout(enhanceHoverEffects, 1000);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      document.removeEventListener('mouseenter', mouseEnter);
      document.removeEventListener('mouseleave', mouseLeave);
      document.removeEventListener('mousedown', mouseDown);
      document.removeEventListener('mouseup', mouseUp);
    };
  }, []);

  // Brand colors from About section
  const brandGreen = '#DEF29B';   // Inner fill
  const brandOrange = '#FF7537';  // Outer border / accent

  const variants = {
    default: {
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      scale: isClicking ? 0.8 : 1,
      backgroundColor: brandGreen,           // Green inner
      border: `2px solid ${brandOrange}`,    // Orange outer border
      mixBlendMode: 'normal',
    },
    link: {
      x: mousePosition.x - 12,
      y: mousePosition.y - 12,
      scale: isClicking ? 1.1 : 1.3,
      backgroundColor: brandGreen,
      border: `3px solid ${brandOrange}`,
      mixBlendMode: 'normal',
    },
    button: {
      x: mousePosition.x - 15,
      y: mousePosition.y - 15,
      scale: isClicking ? 1.4 : 1.6,
      backgroundColor: brandGreen,
      border: `3px solid ${brandOrange}`,
      mixBlendMode: 'normal',
    },
    input: {
      x: mousePosition.x - 6,
      y: mousePosition.y - 6,
      scale: isClicking ? 0.9 : 1.1,
      backgroundColor: brandGreen,
      border: `2px solid ${brandOrange}`,
      mixBlendMode: 'normal',
    },
    download: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      scale: isClicking ? 1.8 : 2,
      backgroundColor: brandGreen,
      border: `4px solid ${brandOrange}`,
      mixBlendMode: 'normal',
    },
    text: {
      x: mousePosition.x - 10,
      y: mousePosition.y - 10,
      scale: isClicking ? 1 : 1.2,
      backgroundColor: brandGreen,
      border: `2px solid ${brandOrange}`,
      mixBlendMode: 'normal',
    },
    tech: {
      x: mousePosition.x - 14,
      y: mousePosition.y - 14,
      scale: isClicking ? 1.2 : 1.4,
      backgroundColor: brandGreen,
      border: `3px solid ${brandOrange}`,
      mixBlendMode: 'normal',
    }
  };

  // Hide cursor on mobile devices
  if (typeof window !== 'undefined' && window.innerWidth <= 768) {
    return null;
  }

  return (
    <>
      {/* Main cursor (green inner with orange border) */}
      <motion.div
        className="custom-cursor"
        variants={variants}
        animate={cursorVariant}
        transition={{
          type: "spring",
          damping: 15,
          stiffness: 400,
          mass: 0.5
        }}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: '16px',
          height: '16px',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.15s ease',
        }}
      />
      
      {/* Cursor trail (orange, follows with lag) */}
      <motion.div
        className="cursor-trail"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
        }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 200,
          mass: 0.8
        }}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: '8px',
          height: '8px',
          backgroundColor: brandOrange, // Orange trail
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.2s ease',
        }}
      />

      {/* Additional ring effect for download state (orange pulse) */}
      {cursorVariant === 'download' && (
        <motion.div
          className="cursor-ring"
          animate={{
            x: mousePosition.x - 25,
            y: mousePosition.y - 25,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            width: '50px',
            height: '50px',
            border: `2px solid ${brandOrange}`,
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 9997,
            opacity: isVisible ? 0.4 : 0,
          }}
        />
      )}

      {/* Pulse effect for tech icons (green pulse) */}
      {cursorVariant === 'tech' && (
        <motion.div
          className="tech-pulse"
          animate={{
            x: mousePosition.x - 20,
            y: mousePosition.y - 20,
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeOut"
          }}
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            width: '40px',
            height: '40px',
            border: `2px solid ${brandGreen}`,
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 9996,
            opacity: isVisible ? 0.3 : 0,
          }}
        />
      )}

      {/* Central precision dot (orange) */}
      <motion.div
        className="cursor-dot"
        animate={{
          x: mousePosition.x - 2,
          y: mousePosition.y - 2,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 300,
          mass: 0.5
        }}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: '4px',
          height: '4px',
          backgroundColor: brandOrange, // Orange dot for contrast
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.1s ease',
        }}
      />

      <style jsx global>{`
        * {
          cursor: none !important;
        }
        
        html, body, a, button, input, textarea, [role="button"] {
          cursor: none !important;
        }

        .custom-cursor {
          filter: drop-shadow(0 0 8px rgba(255, 117, 55, 0.3));
          will-change: transform;
          backdrop-filter: blur(1px);
        }

        /* Glow effects for outer orange border */
        .custom-cursor[style*="border: 2px solid rgb(255, 117, 55)"] {
          box-shadow: 0 0 15px rgba(255, 117, 55, 0.4);
        }

        .custom-cursor[style*="border: 3px solid rgb(255, 117, 55)"] {
          box-shadow: 0 0 20px rgba(255, 117, 55, 0.5);
        }

        .custom-cursor[style*="border: 4px solid rgb(255, 117, 55)"] {
          box-shadow: 0 0 25px rgba(255, 117, 55, 0.6);
        }
      `}</style>
    </>
  );
};

export default CustomCursor;