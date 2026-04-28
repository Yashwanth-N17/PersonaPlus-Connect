import { motion } from "framer-motion";

// Cryptic clues only — no activity names revealed
const cards = [
  {
    icon: "🎈",
    code: "CLUE · 01",
    line1: "It floats. It bounces.",
    line2: "When the music dies — it picks YOU.",
    hint: "Hold tight. Or pass it on.",
    delay: 0,
  },
  {
    icon: "🎤",
    code: "CLUE · 02",
    line1: "30 seconds. One spotlight.",
    line2: "Sell something. ANYTHING.",
    hint: "No script. No mercy.",
    delay: 0.6,
  },
  {
    icon: "⚡",
    code: "CLUE · 03",
    line1: "We're not telling.",
    line2: "Find out at 5:30 PM.",
    hint: "Trust us — you'll want to be there.",
    delay: 1.2,
  },
];

const Activities = () => {
  return (
    <section id="activities" className="relative py-32 px-6">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
        className="max-w-7xl mx-auto text-center"
      >
        <div className="inline-block glass-card rounded-full px-5 py-2 text-xs tracking-[0.4em] uppercase text-teal mb-6">
          // Decrypting clues...
        </div>
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold text-gradient leading-tight">
          Three clues. Zero spoilers.
        </h2>
        <p className="mt-5 text-lg text-teal/70">
          Decode them. Show up. Find out what hits 👀
        </p>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.18 } } }}
          className="mt-16 grid md:grid-cols-3 gap-8"
        >
          {cards.map((c, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 60, scale: 0.92 },
                show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
              }}
              whileHover={{ scale: 1.04, y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group relative glass-card-strong rounded-3xl p-8 min-h-[340px] flex flex-col items-center justify-between overflow-hidden float-card"
              style={{ animationDelay: `${c.delay}s`, willChange: "transform" }}
            >
              {/* Glowing animated border */}
              <div
                className="absolute inset-0 rounded-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(120deg, rgba(43, 103, 119,0.0) 30%, rgba(200, 216, 228,0.4) 50%, rgba(43, 103, 119,0.0) 70%)",
                  backgroundSize: "200% 200%",
                  animation: "shimmer 4s linear infinite",
                }}
              />

              <div className="relative z-10 text-[10px] tracking-[0.4em] text-teal/70 font-mono">
                {c.code}
              </div>

              <motion.div
                className="text-7xl relative z-10"
                animate={{ scale: [1, 1.15, 1], rotate: [0, 8, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{ willChange: "transform", filter: "drop-shadow(0 0 30px rgba(82, 171, 152,0.2))" }}
              >
                {c.icon}
              </motion.div>

              <div className="relative z-10 space-y-2">
                <p className="font-mono text-base sm:text-lg text-teal leading-snug" style={{ textShadow: "0 0 14px rgba(82, 171, 152,0.5)" }}>
                  {c.line1}
                </p>
                <p className="font-mono text-base sm:text-lg text-teal/90 leading-snug">
                  {c.line2}
                </p>
                <p className="text-xs text-teal/70 italic pt-2 blink-soft">
                  {c.hint}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-12 text-sm tracking-[0.3em] uppercase text-teal/70 font-mono"
        >
          [ Activities revealed live · IS Seminar Hall · 5:30 PM ]
        </motion.p>
      </motion.div>
    </section>
  );
};

export default Activities;
