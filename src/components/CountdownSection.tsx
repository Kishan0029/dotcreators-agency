import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";

const EVENT_DATE = new Date("2026-08-16T17:00:00+05:30");

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(): TimeLeft {
  const diff = Math.max(0, EVENT_DATE.getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function AnimatedDigit({ value }: { value: number }) {
  const formatted = String(value).padStart(2, "0");

  return (
    <span className="relative inline-block overflow-hidden">
      <span className="invisible" aria-hidden="true">
        {formatted}
      </span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={formatted}
          className="absolute inset-0 flex items-center justify-center tabular-nums"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {formatted}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function CountdownUnit({
  value,
  label,
  showDivider,
  className = "",
}: {
  value: number;
  label: string;
  showDivider?: boolean;
  className?: string;
}) {
  return (
    <>
      <div className={`flex flex-col items-center gap-3 sm:gap-4 md:gap-5 ${className}`}>
        <div className="font-helvetica text-[clamp(3rem,8.5vw,6.8rem)] font-semibold leading-none tracking-[-0.06em] text-black lg:text-[clamp(4.25rem,9vw,8.75rem)]">
          <AnimatedDigit value={value} />
        </div>
        <span className="font-helvetica text-[10px] font-medium uppercase tracking-[0.32em] text-black/60 sm:text-[11px] md:text-[12px]">
          {label}
        </span>
      </div>
      {showDivider && (
        <div
          className="hidden h-14 w-px shrink-0 bg-black/10 lg:block lg:h-20 xl:h-24"
          aria-hidden="true"
        />
      )}
    </>
  );
}

function FloatingParticles() {
  const particles = useRef(
    Array.from({ length: 14 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.5 + 0.5,
      duration: Math.random() * 20 + 25,
      delay: Math.random() * 10,
    })),
  ).current;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="countdown-particle-light absolute rounded-full bg-black"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

type CountdownSectionProps = {
  onRegister?: () => void;
};

export default function CountdownSection({ onRegister }: CountdownSectionProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-60px" });

  useEffect(() => {
    const tick = () => setTimeLeft(getTimeLeft());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const scrollToRegister = () => {
    if (onRegister) {
      onRegister();
      return;
    }
    document.getElementById("register")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div
      ref={sectionRef}
      className="relative mt-12 w-full overflow-hidden rounded-[2rem] border border-black/[0.06] bg-white/90 px-4 py-12 text-black shadow-[0_20px_50px_rgba(0,0,0,0.02)] backdrop-blur-sm sm:mt-16 sm:px-8 sm:py-16 md:py-20 lg:mt-20"
      aria-label="Countdown to Pai Creator Summit 2026"
    >
      {/* Grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />

      {/* Soft glow behind timer */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-[55%] h-[min(70vw,480px)] w-[min(70vw,480px)] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px]"
        style={{
          background: "radial-gradient(circle, rgba(0,0,0,0.04) 0%, transparent 70%)",
        }}
        animate={{ opacity: [0.6, 1, 0.6], scale: [0.96, 1.04, 0.96] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />

      <FloatingParticles />

      <motion.div
        className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center text-center"
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="font-helvetica text-[11px] font-semibold uppercase tracking-[0.3em] text-black/60 sm:text-[12px] md:text-[13px]">
          Countdown to
        </p>

        <h2 className="font-helvetica mt-4 text-[clamp(1.45rem,4.6vw,3.6rem)] font-semibold leading-[1.03] tracking-[-0.025em] text-black sm:mt-5">
          PAI CREATOR SUMMIT 2026
        </h2>

        <p className="font-helvetica mt-4 max-w-xl text-sm font-normal leading-relaxed text-black/70 sm:mt-5 sm:text-base md:text-[18px]">
          16 AUGUST 2026 • 5:00 PM
          <br />
          Pai Convention Hall, Belagavi
        </p>

        {/* Countdown */}
        <div className="mt-10 w-full sm:mt-12 md:mt-16 lg:mt-20">
          {/* Mobile & tablet: 2×2 grid */}
          <div className="mx-auto grid w-full max-w-sm grid-cols-2 sm:max-w-md lg:hidden">
            <CountdownUnit
              value={timeLeft.days}
              label="Days"
              className="border-r border-b border-black/10 px-3 pb-8 pt-1 sm:px-5 sm:pb-10"
            />
            <CountdownUnit
              value={timeLeft.hours}
              label="Hours"
              className="border-b border-black/10 px-3 pb-8 pt-1 sm:px-5 sm:pb-10"
            />
            <CountdownUnit
              value={timeLeft.minutes}
              label="Minutes"
              className="border-r border-black/10 px-3 pt-8 pb-1 sm:px-5 sm:pt-10"
            />
            <CountdownUnit
              value={timeLeft.seconds}
              label="Seconds"
              className="px-3 pt-8 pb-1 sm:px-5 sm:pt-10"
            />
          </div>

          {/* Desktop: single row */}
          <div className="mx-auto hidden w-full max-w-4xl items-center justify-center gap-6 lg:flex xl:max-w-5xl xl:gap-10">
            <CountdownUnit value={timeLeft.days} label="Days" showDivider />
            <CountdownUnit value={timeLeft.hours} label="Hours" showDivider />
            <CountdownUnit value={timeLeft.minutes} label="Minutes" showDivider />
            <CountdownUnit value={timeLeft.seconds} label="Seconds" />
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-col items-center gap-3 sm:mt-12 md:mt-16 lg:mt-20">
          <motion.button
            type="button"
            onClick={scrollToRegister}
            className="font-helvetica cursor-pointer rounded-[14px] bg-black px-8 py-3.5 text-[11px] font-medium uppercase tracking-[0.28em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(0,0,0,0.12)] sm:px-10 sm:py-4 sm:text-[12px]"
            whileHover={{ y: -3, boxShadow: "0 12px 40px rgba(0,0,0,0.12)" }}
            whileTap={{ y: 0, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            Register Now
          </motion.button>
          <p className="font-helvetica text-sm text-black/60 sm:text-base">
            Registration closes soon.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
