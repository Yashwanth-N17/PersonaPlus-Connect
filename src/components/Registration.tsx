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
                  className="text-6xl mb-2"
                >
                  🎉
                </motion.div>
                <div className="space-y-2">
                  <h3 className="text-3xl sm:text-4xl font-bold shimmer-text">You're All Set!</h3>
                  <p className="text-teal/70">
                    You're in, <span className="text-teal font-semibold">{name}</span>. We'll see you on the day. 🚀
                  </p>
                </div>
                
                <div className="flex flex-col items-center gap-6 mt-8 pt-8 border-t border-teal/10">
                  <div className="space-y-2">
                    <p className="text-sm font-bold uppercase tracking-widest text-teal/60">Important Step</p>
                    <p className="text-teal font-medium">Join the WhatsApp group for updates & clues!</p>
                  </div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="relative group"
                  >
                    <div className="absolute -inset-4 bg-gradient-to-r from-teal/20 to-teal-pale/20 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative p-4 bg-white rounded-2xl shadow-2xl shadow-teal/10 border border-teal/5">
                      <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent("https://chat.whatsapp.com/FTpYe3BDHIJGywS1kqeCjd")}`} 
                        alt="WhatsApp Group QR Code"
                        className="w-32 h-32 sm:w-40 sm:h-40"
                      />
                    </div>
                  </motion.div>

                  <motion.a 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://chat.whatsapp.com/FTpYe3BDHIJGywS1kqeCjd" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-primary px-8 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-lg shadow-teal/20"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Join WhatsApp Group
                  </motion.a>
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
