import { motion } from "framer-motion";
import CountUp from "react-countup";

const avatars = ["🧑‍🎓", "👩‍🎓", "🧑", "👨‍💻", "👩‍💻", "🧑‍🔬", "👨‍🎤", "👩‍🎨", "🧑‍🚀", "👩‍🔬"];

const FOMO = () => {
  return (
    <section className="relative py-32 px-6">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
        className="relative max-w-4xl mx-auto glass-card-strong glow-border rounded-3xl p-10 sm:p-14 text-center overflow-hidden"
      >
        {/* Animated background pulse */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: [0.15, 0.4, 0.15] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background: "radial-gradient(circle at 50% 0%, rgba(82, 171, 152,0.35), transparent 60%)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
          className="relative inline-flex items-center gap-2 glass-card rounded-full px-4 py-1.5 mb-8 text-[10px] sm:text-xs uppercase tracking-[0.35em] text-teal"
        >
          <span className="w-2 h-2 rounded-full bg-teal-pale blink-soft glow-primary-strong" />
          Live · Registrations Open
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          className="relative flex justify-center -space-x-3 flex-wrap"
        >
          {avatars.map((a, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, x: -40, scale: 0.6 },
                show: { opacity: 1, x: 0, scale: 1, transition: { type: "spring", damping: 14, stiffness: 220 } },
              }}
              whileHover={{ y: -8, scale: 1.15, zIndex: 10 }}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-2xl bg-white border-2 border-teal-pale/60 glow-primary"
              style={{ willChange: "transform" }}
            >
              {a}
            </motion.div>
          ))}
        </motion.div>

        <h3 className="relative mt-10 text-2xl sm:text-3xl md:text-4xl font-semibold leading-snug">
          Your batch is{" "}
          <motion.span
            className="text-gradient font-bold inline-block"
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <CountUp end={60} duration={2.4} enableScrollSpy scrollSpyOnce />+
          </motion.span>{" "}
          deep already.
          <br className="hidden sm:block" />
          <span className="text-teal/90 text-xl sm:text-2xl md:text-3xl">
            Where are <span className="italic">YOU</span>?
          </span>
        </h3>

        <div className="relative mt-10 max-w-xl mx-auto">
          <div className="flex items-center justify-between text-[10px] sm:text-xs uppercase tracking-[0.3em] text-teal/80 mb-2">
            <span>Seats locked</span>
            <span className="font-mono">80%</span>
          </div>
          <div className="h-3 rounded-full bg-white/5 border border-teal-pale/20 overflow-hidden relative">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "80%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number], delay: 0.3 }}
              className="h-full rounded-full glow-primary-strong relative"
              style={{ background: "linear-gradient(90deg, #2b6777, #52ab98, #52ab98)", willChange: "transform" }}
            >
              <motion.div
                className="absolute inset-y-0 right-0 w-8 bg-white/40 blur-md"
                animate={{ x: [-200, 20] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              />
            </motion.div>
          </div>
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="mt-3 text-sm text-teal tracking-wide uppercase font-semibold"
          >
            ⚡ Don't be the one missing from the photo
          </motion.p>
        </div>

        <motion.a
          href="#register"
          whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(82, 171, 152,0.3)" }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: "spring", damping: 18, stiffness: 220 }}
          className="relative mt-8 inline-flex items-center gap-2 btn-primary px-7 py-3 rounded-full font-semibold text-sm sm:text-base"
        >
          Lock my spot →
        </motion.a>
      </motion.div>
    </section>
  );
};

export default FOMO;
