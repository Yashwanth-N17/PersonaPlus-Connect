import { motion } from "framer-motion";

const stats = [
  { title: "Tomorrow · 5:30 PM IST", emoji: "⏰" },
  { title: "IS Seminar Hall", emoji: "📍" },
  { title: "Snacks · Games · Glory", emoji: "🏆" },
];

const headlineLines = ["What is", "Persona+ Connect?"];

const About = () => {
  return (
    <section id="about" className="relative py-32 px-6 max-w-7xl mx-auto">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15 } } }}
        className="grid md:grid-cols-2 gap-16 items-center"
      >
        <div>
          <h2 className="text-4xl sm:text-6xl font-bold leading-[1.05]">
            {headlineLines.map((line, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
                }}
                className="block text-gradient"
                style={{ willChange: "transform" }}
              >
                {line}
              </motion.span>
            ))}
          </h2>
          <motion.p
            variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
            className="mt-8 text-lg text-teal/80 leading-relaxed max-w-lg"
          >
            A fun-filled evening to relax, meet new people, and enjoy exciting activities. Join us for an unforgettable experience with your friends!
          </motion.p>
          <motion.div
            variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
            className="mt-8 inline-block h-px w-32 bg-gradient-to-r from-teal to-teal-pale glow-primary"
          />
        </div>

        <div className="grid gap-5">
          {stats.map((s, i) => (
            <motion.div
              key={s.title}
              variants={{
                hidden: { opacity: 0, rotateY: 90 },
                show: {
                  opacity: 1,
                  rotateY: 0,
                  transition: { duration: 0.9, delay: i * 0.15, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
                },
              }}
              whileHover={{ scale: 1.04, y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="glass-card-strong glow-border rounded-2xl p-6 flex items-center gap-5 float-card"
              style={{ animationDelay: `${i * 0.6}s`, willChange: "transform" }}
            >
              <div className="text-5xl">{s.emoji}</div>
              <div>
                <div className="text-xl font-semibold text-foreground">{s.title}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default About;
