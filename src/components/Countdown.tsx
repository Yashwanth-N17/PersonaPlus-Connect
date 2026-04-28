import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Tomorrow at 5:30 PM IST (Asia/Kolkata, UTC+5:30)
const buildTarget = () => {
  const now = new Date();
  // Convert "now" into IST wall-clock by offsetting from UTC
  const istNow = new Date(now.getTime() + (5.5 * 60 - now.getTimezoneOffset()) * 60000);
  const istTomorrow = new Date(istNow);
  istTomorrow.setDate(istTomorrow.getDate() + 1);
  istTomorrow.setHours(17, 30, 0, 0);
  // Convert that IST wall-clock back into a real UTC instant
  return new Date(istTomorrow.getTime() - (5.5 * 60 - now.getTimezoneOffset()) * 60000);
};
const target = buildTarget();

const calc = () => {
  const diff = Math.max(0, target.getTime() - Date.now());
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const minutes = Math.floor((diff / 60000) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
};

const Unit = ({ value, label }: { value: number; label: string }) => (
  <div className="glass-card-strong rounded-2xl px-3 py-4 sm:px-5 sm:py-5 w-[78px] sm:w-[104px] text-center pulse-glow">
    <div className="relative h-14 sm:h-16 overflow-hidden flex items-center justify-center" style={{ perspective: "600px" }}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ rotateX: -90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          exit={{ rotateX: 90, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
          className="text-4xl sm:text-5xl font-bold text-gradient absolute inset-0 flex items-center justify-center tabular-nums"
          style={{ willChange: "transform", backfaceVisibility: "hidden" }}
        >
          {String(value).padStart(2, "0")}
        </motion.span>
      </AnimatePresence>
    </div>
    <div className="mt-2 text-[10px] sm:text-xs uppercase tracking-[0.25em] text-teal/70">{label}</div>
  </div>
);

const Countdown = () => {
  const [time, setTime] = useState(calc());
  useEffect(() => {
    const i = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(i);
  }, []);
  return (
    <div className="flex gap-3 sm:gap-4 justify-center">
      <Unit value={time.days} label="Days" />
      <Unit value={time.hours} label="Hours" />
      <Unit value={time.minutes} label="Min" />
      <Unit value={time.seconds} label="Sec" />
    </div>
  );
};

export default Countdown;
