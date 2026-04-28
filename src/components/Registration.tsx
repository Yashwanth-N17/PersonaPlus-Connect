import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { supabase } from "../lib/supabase";
import { toast } from "sonner";

const slide = {
  initial: { x: 100, opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
  exit: { x: -100, opacity: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
};

const FloatLabel = ({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) => {
  const [focus, setFocus] = useState(false);
  const lifted = focus || value.length > 0;
  return (
    <div className="relative mt-2">
      <motion.label
        initial={false}
        animate={{
          y: lifted ? -11 : 16,
          scale: lifted ? 0.85 : 1,
          color: focus ? "#52ab98" : "#2b6777",
        }}
        transition={{ type: "spring", damping: 20, stiffness: 220 }}
        className={`absolute left-3 top-0 origin-left pointer-events-none font-medium px-1 transition-colors duration-200 ${lifted ? "bg-white" : "bg-transparent"}`}
        style={{ willChange: "transform" }}
      >
        {label}
      </motion.label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        className="w-full bg-transparent border border-teal-pale/40 rounded-xl px-4 pt-5 pb-3 text-foreground transition-all duration-300 focus:outline-none focus:border-teal"
        style={{ boxShadow: focus ? "0 0 0 1px #52ab98" : "none" }}
      />
    </div>
  );
};

const Registration = () => {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [usn, setUsn] = useState("");
  const [email, setEmail] = useState("");
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [isLoading, setIsLoading] = useState(false);

  const register = async () => {
    if (!name.trim() || !usn.trim() || !email.trim()) return;
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('registrations')
        .insert([
          { name, usn, email }
        ]);

      if (error) {
        if (error.code === '23505') {
          throw new Error("This USN or Email is already registered!");
        }
        throw error;
      }

      setSize({ w: window.innerWidth, h: window.innerHeight });
      setStep(1);
      toast.success("Spot successfully secured! 🎉");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to secure your spot. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="register" className="relative py-32 px-6">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
        className="max-w-3xl mx-auto"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-6xl font-bold text-gradient">Lock In Your Spot</h2>
          <p className="mt-4 text-teal/70">Secure your entry right now.</p>
        </div>

        <div className="glass-card-strong glow-border rounded-3xl p-8 sm:p-12 min-h-[380px] relative overflow-hidden flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="s0" variants={slide} initial="initial" animate="animate" exit="exit" className="space-y-6">
                <FloatLabel label="Full Name" value={name} onChange={setName} />
                <FloatLabel label="USN" value={usn} onChange={setUsn} />
                <FloatLabel label="Email Address" value={email} onChange={setEmail} type="email" />
                <motion.button
                  whileHover={{ scale: 1.06, boxShadow: "0 0 30px rgba(82, 171, 152,0.7)" }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", damping: 18, stiffness: 220 }}
                  onClick={register}
                  disabled={isLoading}
                  className="btn-primary w-full py-4 rounded-xl font-semibold mt-6"
                >
                  {isLoading ? "Locking in..." : "Lock it in →"}
                </motion.button>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div key="s1" variants={slide} initial="initial" animate="animate" exit="exit" className="text-center space-y-6 py-6">
                <Confetti
                  width={size.w}
                  height={size.h}
                  numberOfPieces={250}
                  recycle={false}
                  colors={["#2b6777", "#52ab98", "#52ab98", "#f0f9ff"]}
                />
                <motion.div
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", damping: 14, stiffness: 200 }}
                  className="text-7xl"
                >
                  🎉
                </motion.div>
                <h3 className="text-3xl sm:text-4xl font-bold shimmer-text">You're All Set!</h3>
                <p className="text-teal/70">
                  You're in, <span className="text-teal font-semibold">{name}</span>. We'll see you on the day. 🚀
                </p>
                <div className="inline-block glass-card rounded-xl px-6 py-3 text-sm tracking-widest uppercase text-teal">
                  Spot Confirmed · {name}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
};

export default Registration;
