import { motion } from "framer-motion";
import ParticleField from "./ParticleField";
import logo from "@/assets/persona-logo.jpeg";

const headline = "Unwind. Connect. Make memories.";
const words = headline.split(" ");

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};
const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
};

const Hero = () => {
  return (
    <section id="top" className="relative min-h-screen w-full overflow-hidden flex flex-col pt-24 pb-8">
      {/* Particles */}
      <div className="absolute inset-0">
        <ParticleField />
      </div>
      {/* Ambient blobs */}
      <div
        className="absolute top-1/4 left-[10%] w-[420px] h-[420px] rounded-full float-blob pointer-events-none"
        style={{ background: "radial-gradient(circle, #2b6777 0%, transparent 70%)", filter: "blur(90px)", opacity: 0.5 }}
      />
      <div
        className="absolute bottom-[15%] right-[8%] w-[500px] h-[500px] rounded-full float-blob pointer-events-none"
        style={{ background: "radial-gradient(circle, #52ab98 0%, transparent 70%)", filter: "blur(100px)", opacity: 0.4, animationDelay: "3s" }}
      />
      <div
        className="absolute top-[20%] right-[20%] w-[300px] h-[300px] rounded-full float-blob pointer-events-none"
        style={{ background: "radial-gradient(circle, #52ab98 0%, transparent 70%)", filter: "blur(80px)", opacity: 0.35, animationDelay: "6s" }}
      />
      {/* Radial overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, transparent 0%, #f2f2f2 75%)" }}
      />

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex-1 flex flex-col items-center justify-center max-w-6xl w-full mx-auto px-6 text-center"
      >
        <motion.div variants={item} className="relative mb-6">
          {/* Orbiting ring */}
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              border: "1px dashed rgba(200, 216, 228,0.4)",
              boxShadow: "0 0 60px rgba(82, 171, 152,0.4), inset 0 0 30px rgba(82, 171, 152,0.2)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.img
            src={logo}
            alt="Persona+ logo"
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover relative"
            style={{
              boxShadow: "0 0 60px rgba(82, 171, 152,0.3), 0 0 120px rgba(82, 171, 152,0.4)",
              border: "2px solid rgba(200, 216, 228,0.6)",
            }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
        
        <motion.div variants={item} className="mb-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wider text-teal">
            Persona+ Connect
          </h2>
        </motion.div>

        <motion.div variants={item} className="inline-block">
          <div className="glass-card glow-border rounded-full px-5 py-2 text-xs sm:text-sm tracking-[0.25em] uppercase text-teal pulse-glow">
            🚀 Fun Day · Tomorrow 5:30 PM IST
          </div>
        </motion.div>

        <h1 className="mt-8 text-5xl sm:text-7xl md:text-8xl font-bold leading-[0.95] tracking-tight">
          <motion.span variants={container} initial="hidden" animate="show" className="block">
            {words.map((w, i) => (
              <motion.span
                key={i}
                variants={item}
                className="inline-block mr-3 text-gradient"
                style={{ willChange: "transform" }}
              >
                {w}
              </motion.span>
            ))}
          </motion.span>
        </h1>

        <motion.p variants={item} className="mt-6 text-base sm:text-lg md:text-xl text-teal/70 max-w-2xl mx-auto">
          A few hours. Unlimited fun. Zero boring moments.
        </motion.p>

        <motion.div variants={item} className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <span className="glass-card rounded-full px-4 py-2 text-xs sm:text-sm tracking-wide text-teal flex items-center gap-2">
            📍 <span className="font-semibold">IS Seminar Hall</span>
          </span>
          <span className="glass-card rounded-full px-4 py-2 text-xs sm:text-sm tracking-wide text-teal flex items-center gap-2">
            ⏰ <span className="font-semibold">Tomorrow · 5:30 PM IST</span>
          </span>
        </motion.div>

        <motion.div
          variants={item}
          className="mt-10 flex justify-center"
        >
          <motion.a
            href="#register"
            whileHover={{ scale: 1.06, boxShadow: "0 0 40px rgba(82, 171, 152,0.3)" }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", damping: 18, stiffness: 220 }}
            className="btn-primary group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-base sm:text-lg overflow-hidden"
          >
            <motion.span
              initial={{ x: -30, opacity: 0 }}
              whileHover={{ x: 0, opacity: 1 }}
              className="text-xl"
            >
              →
            </motion.span>
            <motion.span whileHover={{ x: 6 }} transition={{ type: "spring", damping: 18, stiffness: 220 }}>
              Claim Your Spot 🚀
            </motion.span>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Marquee bottom */}
      <div className="relative z-10 mt-12 py-5 border-y border-teal-pale/15 bg-white/60 backdrop-blur-sm space-y-2">
        <Marquee
          direction="left"
          items={["FUN DAY", "MUSIC", "GAMES", "SNACKS", "FRIENDS", "MEMORIES"]}
        />
        <Marquee
          direction="right"
          items={["PERSONA+ CONNECT", "RELAX", "ENJOY", "CHILL", "CONNECT", "HAVE FUN"]}
        />
      </div>
    </section>
  );
};

const Marquee = ({ items, direction }: { items: string[]; direction: "left" | "right" }) => {
  const line = (
    <div className="marquee-track">
      {items.map((t, i) => (
        <span key={i} className="flex items-center gap-8 text-xl md:text-3xl font-bold tracking-[0.2em] text-gradient whitespace-nowrap">
          {t}
          <span className="text-teal/60">·</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className={`marquee ${direction === "left" ? "marquee-left" : "marquee-right"}`}>
      {line}
      {line}
    </div>
  );
};

export default Hero;
