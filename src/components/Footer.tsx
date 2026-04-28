import { motion } from "framer-motion";
import logo from "@/assets/persona-logo.jpeg";

const Footer = () => {
  return (
    <footer className="relative pt-32 pb-12 px-6 overflow-hidden">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[2px]"
        style={{ background: "linear-gradient(90deg, transparent, #52ab98, transparent)", boxShadow: "0 0 30px rgba(82, 171, 152,0.2)" }}
      />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[200px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at top, rgba(82, 171, 152,0.25), transparent 70%)" }}
      />
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15 } } }}
        className="relative max-w-5xl mx-auto text-center space-y-6"
      >
        <motion.div
          variants={{ hidden: { opacity: 0, scale: 0.6 }, show: { opacity: 1, scale: 1, transition: { duration: 0.8 } } }}
          className="flex justify-center"
        >
          <motion.img
            src={logo}
            alt="Persona+ logo"
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover"
            style={{
              boxShadow: "0 0 50px rgba(82, 171, 152,0.7), 0 0 100px rgba(82, 171, 152,0.3)",
              border: "2px solid rgba(200, 216, 228,0.5)",
            }}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
        <motion.h3
          variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
          className="text-5xl sm:text-7xl font-bold shimmer-text tracking-tight"
        >
          Persona+ Connect
        </motion.h3>
        <motion.p
          variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
          className="text-teal/70 tracking-wide leading-relaxed"
        >
          Organized by Persona Plus
          <br />
          Tomorrow · 5:30 PM IST · IS Seminar Hall
        </motion.p>
        <motion.div
          variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
          className="inline-block h-px w-24 bg-gradient-to-r from-transparent via-teal-pale to-transparent"
        />
        <motion.p
          variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
          className="text-sm text-teal/80"
        >
          Made with 🔥 for the best batch yet.
        </motion.p>
      </motion.div>
    </footer>
  );
};

export default Footer;
