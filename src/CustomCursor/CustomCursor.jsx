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

      // CTA / Download buttons
      document.querySelectorAll('[class*="bg-gradient"], .cta-button').forEach(el => {
        el.addEventListener('mouseenter', () => setCursorVariant('download'));
        el.addEventListener('mouseleave', () => setCursorVariant('default'));
      });

      // Cards / Sections
      document.querySelectorAll('.card, .rounded-2xl, .bg-gray-800').forEach(el => {
        el.addEventListener('mouseenter', () => setCursorVariant('text'));
        el.addEventListener('mouseleave', () => setCursorVariant('default'));
      });

      // Tech / Interactive elements
      document.querySelectorAll('.tech-icon, [class*="p-3"]').forEach(el => {
        el.addEventListener('mouseenter', () => setCursorVariant('tech'));
        el.addEventListener('mouseleave', () => setCursorVariant('default'));
      });
    };

    setTimeout(enhanceHoverEffects, 500);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      document.removeEventListener('mouseenter', mouseEnter);
      document.removeEventListener('mouseleave', mouseLeave);
      document.removeEventListener('mousedown', mouseDown);
      document.removeEventListener('mouseup', mouseUp);
    };
  }, []);

  // ===== BRAND COLORS FROM YOUR LOGO =====
  const darkBlue = '#061ec3';
  const lightBlue = '#067bff';
  const yellow = '#ffcf00';

  const variants = {
    default: {
      x: mousePosition.x - 10,
      y: mousePosition.y - 10,
      scale: isClicking ? 0.85 : 1,
      background:
        'linear-gradient(135deg, #ffcf00 0%, #067bff 100%)',
      border: `2px solid ${darkBlue}`,
      boxShadow: `0 0 15px ${lightBlue}`,
    },

    link: {
      x: mousePosition.x - 14,
      y: mousePosition.y - 14,
      scale: isClicking ? 1.1 : 1.35,
      background:
        'linear-gradient(135deg, #ffcf00 0%, #067bff 100%)',
      border: `3px solid ${darkBlue}`,
      boxShadow: `0 0 20px ${lightBlue}`,
    },

    button: {
      x: mousePosition.x - 18,
      y: mousePosition.y - 18,
      scale: isClicking ? 1.3 : 1.6,
      background:
        'linear-gradient(135deg, #ffcf00 0%, #067bff 100%)',
      border: `3px solid ${darkBlue}`,
      boxShadow: `0 0 25px ${lightBlue}`,
    },

    input: {
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      scale: isClicking ? 0.9 : 1.1,
      background: lightBlue,
      border: `2px solid ${yellow}`,
      boxShadow: `0 0 18px ${lightBlue}`,
    },

    download: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      scale: isClicking ? 1.8 : 2.1,
      background:
        'linear-gradient(135deg, #ffcf00 0%, #067bff 100%)',
      border: `4px solid ${yellow}`,
      boxShadow: `
        0 0 30px ${lightBlue},
        0 0 50px ${yellow}
      `,
    },

    text: {
      x: mousePosition.x - 12,
      y: mousePosition.y - 12,
      scale: isClicking ? 1 : 1.25,
      background: lightBlue,
      border: `2px solid ${yellow}`,
      boxShadow: `0 0 18px ${lightBlue}`,
    },

    tech: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: isClicking ? 1.2 : 1.5,
      background:
        'linear-gradient(135deg, #067bff 0%, #061ec3 100%)',
      border: `3px solid ${yellow}`,
      boxShadow: `
        0 0 25px ${lightBlue},
        0 0 40px ${darkBlue}
      `,
    }
  };

  // Hide on mobile
  if (typeof window !== 'undefined' && window.innerWidth <= 768) {
    return null;
  }

  return (
    <>
      {/* Main Cursor */}
      <motion.div
        className="custom-cursor"
        variants={variants}
        animate={cursorVariant}
        transition={{
          type: 'spring',
          damping: 18,
          stiffness: 350,
          mass: 0.5
        }}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.15s ease',
          willChange: 'transform',
          backdropFilter: 'blur(2px)',
        }}
      />

      {/* Cursor Trail */}
      <motion.div
        className="cursor-trail"
        animate={{
          x: mousePosition.x - 5,
          y: mousePosition.y - 5,
        }}
        transition={{
          type: 'spring',
          damping: 28,
          stiffness: 180,
          mass: 0.8
        }}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: '10px',
          height: '10px',
          background: `linear-gradient(135deg, ${yellow}, ${lightBlue})`,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          opacity: isVisible ? 0.9 : 0,
          boxShadow: `0 0 15px ${lightBlue}`,
        }}
      />

      {/* Download Pulse Ring */}
      {cursorVariant === 'download' && (
        <motion.div
          className="cursor-ring"
          animate={{
            x: mousePosition.x - 30,
            y: mousePosition.y - 30,
            scale: [1, 1.4, 1],
            opacity: [0.5, 0.2, 0.5],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            width: '60px',
            height: '60px',
            border: `2px solid ${yellow}`,
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 9997,
            boxShadow: `0 0 30px ${yellow}`,
          }}
        />
      )}

      {/* Tech Glow Pulse */}
      {cursorVariant === 'tech' && (
        <motion.div
          className="tech-pulse"
          animate={{
            x: mousePosition.x - 24,
            y: mousePosition.y - 24,
            scale: [1, 1.6, 1],
            opacity: [0.4, 0, 0.4],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeOut'
          }}
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            width: '48px',
            height: '48px',
            border: `2px solid ${lightBlue}`,
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 9996,
            boxShadow: `0 0 30px ${lightBlue}`,
          }}
        />
      )}

      {/* Precision Dot */}
      <motion.div
        className="cursor-dot"
        animate={{
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
        }}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 400,
          mass: 0.3
        }}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: '6px',
          height: '6px',
          backgroundColor: yellow,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 10000,
          opacity: isVisible ? 1 : 0,
          boxShadow: `0 0 12px ${yellow}`,
        }}
      />

      <style jsx global>{`
        * {
          cursor: none !important;
        }

        html,
        body,
        a,
        button,
        input,
        textarea,
        [role='button'] {
          cursor: none !important;
        }

        .custom-cursor {
          mix-blend-mode: normal;
        }

        body {
          overflow-x: hidden;
        }
      `}</style>
    </>
  );
};

export default CustomCursor;