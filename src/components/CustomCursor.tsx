import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest('button') ||
          target.closest('a') ||
          target.closest('[role="button"]') ||
          target.closest('input') ||
          target.closest('textarea') ||
          target.classList.contains('cursor-pointer'))
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (isTouch || !isVisible) return null;

  return (
    <>
      {/* Central glowing dot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full bg-rose-300 mix-blend-screen transition-transform duration-75 ease-out"
        style={{
          width: isHovering ? '12px' : '7px',
          height: isHovering ? '12px' : '7px',
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%) scale(${isClicking ? 0.7 : 1})`,
          boxShadow: '0 0 12px 2px rgba(244, 114, 182, 0.8)',
        }}
        aria-hidden="true"
      />
      {/* Ambient trailing ring */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full border border-rose-400/40 mix-blend-screen transition-all duration-200 ease-out"
        style={{
          width: isHovering ? '48px' : '28px',
          height: isHovering ? '48px' : '28px',
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%) scale(${isClicking ? 1.25 : 1})`,
          backgroundColor: isHovering ? 'rgba(225, 29, 72, 0.08)' : 'transparent',
        }}
        aria-hidden="true"
      />
    </>
  );
}
