import { useAnimate } from "motion/react";
import { ReactNode, useRef, useEffect } from "react";

export const MouseImageTrail = ({
  children,
  images,
  renderImageBuffer,
  rotationRange,
}: {
  children: ReactNode;
  images: string[];
  renderImageBuffer: number;
  rotationRange: number;
}) => {
  const [scope, animate] = useAnimate();
  const lastRenderPosition = useRef({ x: 0, y: 0 });
  const imageRenderCount = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;

      // If the cursor is over a form or form control, don't spawn trail images
      if (target && target.closest && target.closest("form, input, textarea, select, [contenteditable]") ) {
        return;
      }

      const x = e.clientX;
      const y = e.clientY;

      const distance = calculateDistance(
        x,
        y,
        lastRenderPosition.current.x,
        lastRenderPosition.current.y
      );

      if (distance >= renderImageBuffer || imageRenderCount.current === 0) {
        lastRenderPosition.current.x = x;
        lastRenderPosition.current.y = y;
        renderNextImage();
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [renderImageBuffer]);

  const calculateDistance = (
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ) => {
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  };

  const renderNextImage = () => {
    const imageIndex = imageRenderCount.current % images.length;
    const selector = `[data-mouse-move-index="${imageIndex}"]`;
    const el = document.querySelector(selector) as HTMLElement | null;

    if (!el) {
      return;
    }

    el.style.top = `${lastRenderPosition.current.y}px`;
    el.style.left = `${lastRenderPosition.current.x}px`;
    el.style.zIndex = imageRenderCount.current.toString();

    const rotation = Math.random() * rotationRange;
    animate(
      selector,
      {
        opacity: [0, 1],
        transform: [
          `translate(-50%, -25%) scale(0.4) ${
            imageIndex % 2
              ? `rotate(${rotation}deg)`
              : `rotate(-${rotation}deg)`
          }`,
          `translate(-50%, -50%) scale(0.85) ${
            imageIndex % 2
              ? `rotate(-${rotation}deg)`
              : `rotate(${rotation}deg)`
          }`,
        ],
      },
      { type: "spring", damping: 15, stiffness: 180 }
    );

    animate(
      selector,
      { opacity: [0.85, 0] },
      { ease: "linear", duration: 1, delay: 1.2 }
    );

    imageRenderCount.current += 1;
  };

  return (
    <div ref={scope} className="relative w-full">
      {children}
      {images.map((img, index) => (
        <img
          key={img}
          className="pointer-events-none fixed left-0 top-0 h-36 w-auto rounded-2xl border border-white/20 bg-slate-900 object-cover opacity-0 shadow-2xl shadow-black/60"
          src={img}
          alt={`Mouse trail ${index}`}
          data-mouse-move-index={index}
        />
      ))}
    </div>
  );
};
