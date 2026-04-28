import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const clues = [
  "When the music dies, you better SPEAK.",
  "It floats. It bounces. It picks YOU.",
  "30 seconds. One product. Sell it like a pro.",
  "No script. No mercy. Just vibes.",
];

const GlitchText = ({ text }: { text: string }) => {
  const [display, setDisplay] = useState(text);
  useEffect(() => {
    const chars = "!<>-_\\/[]{}—=+*^?#________";
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setDisplay(
        text
          .split("")
          .map((c, idx) => (idx < i / 2 ? c : chars[Math.floor(Math.random() * chars.length)]))
          .join("")
      );
      if (i / 2 >= text.length) {
        clearInterval(iv);
        setDisplay(text);
      }
    }, 60);
    return () => clearInterval(iv);
  }, [text]);
  return <span>{display}</span>;
};

const ClueTeaser = () => {
  const [idx, setIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState<"typing" | "hold" | "erasing">("typing");

  useEffect(() => {
    const current = clues[idx];
    let timer: ReturnType<typeof setTimeout>;
    if (phase === "typing") {
      if (typed.length < current.length) {
        timer = setTimeout(() => setTyped(current.slice(0, typed.length + 1)), 60);
      } else {
        timer = setTimeout(() => setPhase("hold"), 1400);
      }
    } else if (phase === "hold") {
      timer = setTimeout(() => setPhase("erasing"), 800);
    } else if (phase === "erasing") {
      if (typed.length > 0) {
        timer = setTimeout(() => setTyped(typed.slice(0, -1)), 30);
      } else {
        setIdx((i) => (i + 1) % clues.length);
        setPhase("typing");
      }
    }
    return () => clearTimeout(timer);
  }, [typed, phase, idx]);

  return (
    <section id="clue" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-60 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, transparent 30%, #f2f2f2 80%)" }}
      />
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
        className="relative max-w-5xl mx-auto text-center"
      >
        <h2 className="text-4xl sm:text-6xl font-bold text-gradient">
          <GlitchText text="Think you're ready?" />
        </h2>

        <div className="mt-14 glass-card-strong glow-border rounded-2xl p-10 min-h-[180px] flex flex-col items-center justify-center gap-6">
          <div className="text-xs uppercase tracking-[0.4em] text-teal/70">// Clue feed</div>
          <div className="font-mono text-2xl sm:text-3xl text-teal min-h-[3rem]" style={{ textShadow: "0 0 20px rgba(82, 171, 152,0.2)" }}>
            {typed}
            <span className="inline-block w-[2px] h-[1em] bg-teal-pale ml-1 align-middle blink-soft" />
          </div>
          <motion.div
            key={idx}
            initial={{ x: 0 }}
            animate={{ x: [0, -4, 4, -3, 3, 0] }}
            transition={{ duration: 0.6 }}
            className="font-mono text-3xl tracking-[0.6em] text-foreground/70"
          >
            _ _ _ _
          </motion.div>
        </div>
        <p className="mt-8 text-sm sm:text-base text-teal/70 blink-soft">
          Figure it out on the day 😏
        </p>
      </motion.div>
    </section>
  );
};

export default ClueTeaser;
