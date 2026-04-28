import { useScroll, motion, useSpring } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[9000]"
      style={{
        scaleX,
        background: "linear-gradient(90deg, #2b6777, #52ab98, #52ab98)",
        boxShadow: "0 0 12px rgba(82, 171, 152,0.3)",
        willChange: "transform",
      }}
    />
  );
};

export default ScrollProgress;
