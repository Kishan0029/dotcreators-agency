import { useEffect, useRef, useState } from "react";
import mouseBlack from "@/assets/mouse_black.png";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringInput, setIsHoveringInput] = useState(false);

  // Position references
  const position = useRef({ x: 0, y: 0 }); // Target mouse position
  const current = useRef({ x: 0, y: 0 });  // Interpolated position (spring)
  const velocity = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Check if device is touch-based or has no fine pointer
    const isTouchDevice =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;

    if (isTouchDevice) return;

    // Initially hide cursor and add cursor hide class
    setIsVisible(true);
    document.documentElement.classList.add("hide-cursor");

    const handleMouseMove = (e: MouseEvent) => {
      position.current.x = e.clientX;
      position.current.y = e.clientY;

      // Detect if cursor is over form inputs/controls
      const target = e.target as HTMLElement | null;
      if (target) {
        // Exclude form controls (input, textarea, select, option, form)
        const isInput = target.closest("form, input, textarea, select, [contenteditable]") !== null;
        
        setIsHoveringInput(isInput);
        if (isInput) {
          document.documentElement.classList.remove("hide-cursor");
        } else {
          document.documentElement.classList.add("hide-cursor");
        }
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      document.documentElement.classList.remove("hide-cursor");
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
      document.documentElement.classList.add("hide-cursor");
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Animation Loop using Spring Physics
    let animationFrameId: number;
    const stiffness = 0.12; // Elasticity constant
    const damping = 0.70;   // Resistance constant

    const updatePosition = () => {
      const targetX = position.current.x;
      const targetY = position.current.y;

      // Spring calculations
      const ax = (targetX - current.current.x) * stiffness;
      const ay = (targetY - current.current.y) * stiffness;

      velocity.current.x = (velocity.current.x + ax) * damping;
      velocity.current.y = (velocity.current.y + ay) * damping;

      current.current.x += velocity.current.x;
      current.current.y += velocity.current.y;

      // Velocity magnitude (speed)
      const speed = Math.sqrt(velocity.current.x ** 2 + velocity.current.y ** 2);

      if (cursorRef.current) {
        // Move wrapper div (hotspot offset is 24px for a 48px square container)
        cursorRef.current.style.transform = `translate3d(${current.current.x - 24}px, ${current.current.y - 24}px, 0)`;

        // Motion Blur based on velocity (max blur of 8px to keep it readable)
        const maxBlur = 8;
        const blurValue = Math.min(speed * 0.12, maxBlur);
        cursorRef.current.style.filter = blurValue > 0.5 ? `blur(${blurValue}px)` : "none";

        // Squash and Stretch: scale in direction of movement
        const scaleX = 1 + Math.min(speed * 0.006, 0.4);
        const scaleY = 1 - Math.min(speed * 0.004, 0.3);

        // Angle of motion (in degrees)
        const angle = Math.atan2(velocity.current.y, velocity.current.x) * (180 / Math.PI);

        // Apply rotation to align stretch with direction, then counter-rotate parent rotation inside
        const img = cursorRef.current.querySelector("img");
        if (img) {
          img.style.transform = `rotate(${angle}deg) scale(${scaleX}, ${scaleY}) rotate(${-angle}deg)`;
        }
      }

      animationFrameId = requestAnimationFrame(updatePosition);
    };

    animationFrameId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
      document.documentElement.classList.remove("hide-cursor");
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 pointer-events-none z-[99999] transition-opacity duration-200 ${
        isHoveringInput ? "opacity-0" : "opacity-100"
      }`}
      style={{
        width: 48,
        height: 48,
        willChange: "transform, filter",
      }}
    >
      <img
        src={mouseBlack}
        alt="Custom Cursor"
        className="w-full h-full object-contain select-none pointer-events-none"
        style={{
          willChange: "transform",
        }}
      />
    </div>
  );
}
