import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface LoaderProps {
  title?: string;
  brandText?: string;
  duration?: number;
  onComplete?: () => void;
}

export function OBYSLoader({ 
  title = 'Dot Creator Summit 2026',
  brandText = 'Dotlab@DotCreatorsSummit2026',
  duration = 4000,
  onComplete 
}: LoaderProps) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const progressBarFillRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLDivElement>(null);
  const brandTextRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loaderRef.current) return;

    // Reset positions so animation starts fresh
    gsap.set(topRef.current, { yPercent: 0 });
    gsap.set(bottomRef.current, { yPercent: 0 });
    gsap.set(loaderRef.current, { display: 'block', pointerEvents: 'auto' });

    // Fade in content
    gsap.to([brandTextRef.current, percentRef.current, contentRef.current], {
      opacity: 1,
      duration: 0.2, // Faster fade in
      ease: 'power2.out'
    });

    // Animate progress bar
    const startTime = performance.now();
    const animateFakeLoader = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const value = progress * 100;

      if (progressBarFillRef.current) progressBarFillRef.current.style.width = value + '%';
      if (percentRef.current) percentRef.current.textContent = Math.floor(value).toString();

      if (progress < 1) requestAnimationFrame(animateFakeLoader);
    };

    requestAnimationFrame(animateFakeLoader);

    // Fade out content (Trigger slightly before progress finishes)
    setTimeout(() => {
      gsap.to([brandTextRef.current, percentRef.current, contentRef.current], {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.out'
      });
    }, duration - 200);

    // Slide away split bars (Trigger immediately when progress finishes)
    setTimeout(() => {
      gsap.to(topRef.current, {
        yPercent: -100,
        duration: 0.2, // Faster slide
        ease: 'expo.inOut'
      });

      gsap.to(bottomRef.current, {
        yPercent: 100,
        duration: 0.2, // Faster slide
        ease: 'expo.inOut',
        onComplete: () => {
          gsap.set(loaderRef.current, { display: 'none' });
          onComplete?.();
        }
      });
    }, duration);

    return () => gsap.killTweensOf("*");
  }, [duration, onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-9999 overflow-hidden bg-black pointer-events-auto"
      style={{ display: 'block' }}
    >
      {/* Top Bar */}
      <div
        ref={topRef}
        className="absolute top-0 left-0 right-0 h-1/2 bg-black"
        style={{ transform: 'translate(0%, -100%)' }}
      />

      {/* Bottom Bar */}
      <div
        ref={bottomRef}
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-black"
        style={{ transform: 'translate(0%, 100%)' }}
      />

      {/* Center content - Vertical layout */}
      <div className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none">
        
        {/* TOP: Brand text and percentage */}
        <div className="w-full flex items-center justify-between px-6 mb-12">
          <div
            ref={brandTextRef}
            className="text-white font-medium text-xs tracking-widest"
            style={{ opacity: 0 }}
          >
            {brandText}
          </div>
          <div
            ref={percentRef}
            className="text-white font-medium text-xs tracking-widest"
            style={{ opacity: 0 }}
          >
            0%
          </div>
        </div>

        {/* MIDDLE: Full-width loading bar */}
        <div
          ref={contentRef}
          className="w-full relative overflow-hidden mb-12"
          style={{ opacity: 0 }}
        >
          <div className="h-px bg-white/20 w-full relative overflow-hidden">
            <div
              ref={progressBarFillRef}
              className="h-full bg-white"
              style={{ width: '0%', transition: 'width 0.1s linear' }}
            />
          </div>
        </div>

        {/* BOTTOM: Title */}
        <div className="text-white font-medium text-lg tracking-tight text-center">
          {title}
        </div>
      </div>
    </div>
  );
}
