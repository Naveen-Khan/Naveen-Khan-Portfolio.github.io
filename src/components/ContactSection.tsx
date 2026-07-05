import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { z } from "zod";
import SectionHeading from "./SectionHeading";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiMail, HiPhone, HiLocationMarker, HiCheckCircle, HiExclamationCircle } from "react-icons/hi";

const schema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  subject: z.string().trim().min(2, "Subject is required").max(150),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000),
});

type FormState = z.infer<typeof schema>;
type Status = "idle" | "sending" | "success" | "error";

const initialForm: FormState = { name: "", email: "", subject: "", message: "" };

const ContactSection = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [focused, setFocused] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [shake, setShake] = useState<string | null>(null);
  // Honeypot anti-spam
  const [hp, setHp] = useState("");

  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "4-RlRGpAfUbw-bOmI";
  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_vepazqn";
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_jaj6c4w";
  const AUTOREPLY_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID || "";
  const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || "naveenkhan0059@gmail.com";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (hp) return; // bot
    const result = schema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormState, string>> = {};
      result.error.issues.forEach((i) => {
        const k = i.path[0] as keyof FormState;
        fieldErrors[k] = i.message;
      });
      setErrors(fieldErrors);
      const first = Object.keys(fieldErrors)[0];
      setShake(first);
      setTimeout(() => setShake(null), 600);
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      if (!PUBLIC_KEY || !SERVICE_ID || !TEMPLATE_ID) {
        throw new Error("Email service is not configured");
      }
      const now = new Date();
      const timeStr = now.toLocaleString();
      const templateParams = {
        name: form.name,
        email: form.email,
        user_name: form.name,
        user_email: form.email,
        subject: form.subject,
        title: form.subject,
        message: form.message,
        time: timeStr,
        sent_at: timeStr,
        from_name: form.name,
        from_email: form.email,
        reply_to: form.email,
        to_name: "Naveen Khan",
        to_email: CONTACT_EMAIL,
        contact_email: CONTACT_EMAIL,
      };
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, { publicKey: PUBLIC_KEY });
      setStatus("success");
      setForm(initialForm);
      setTimeout(() => setStatus("idle"), 4500);
    } catch (err: unknown) {
      console.error("EmailJS error:", err);
      const msg = err instanceof Error ? err.message : typeof err === "string" ? err : "Unknown error";
      setErrorMsg(`Couldn't send right now (${msg}). Please email me directly.`);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const fieldClass = (k: keyof FormState) =>
    `w-full bg-secondary/40 border rounded-2xl px-4 pt-6 pb-2 text-sm text-foreground placeholder-transparent focus:outline-none transition-all duration-300 ${
      errors[k]
        ? "border-destructive/70 shadow-[0_0_25px_-5px_hsl(0_75%_55%_/_0.5)]"
        : focused === k
        ? "border-copper/70 shadow-[0_0_30px_-5px_hsl(25_78%_55%_/_0.5)]"
        : "border-border/60"
    }`;

  const labelClass = (k: keyof FormState) =>
    `absolute left-4 transition-all duration-200 pointer-events-none uppercase tracking-[0.18em] ${
      focused === k || form[k]
        ? "top-1.5 text-[9px] text-copper-glow"
        : "top-1/2 -translate-y-1/2 text-xs text-muted-foreground/70"
    }`;

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-25 pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(25 78% 55% / 0.6), transparent 70%)", filter: "blur(90px)", animation: "drift 20s ease-in-out infinite" }} />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(30 90% 65% / 0.5), transparent 70%)", filter: "blur(80px)", animation: "drift 25s ease-in-out infinite reverse" }} />

      <div className="section-container relative z-10 max-w-5xl">
        <SectionHeading eyebrow="06 — Get In Touch" title="Let's Create Together" subtitle="Have a project, idea or collaboration? The studio is open." variant="neon" />

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="md:col-span-2 space-y-3"
          >
            <a href="mailto:naveenkhan0059@gmail.com" className="block glass-card card-hover-glow p-5 rounded-2xl">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-copper-glow/30 to-bronze/20 border border-copper/40 flex items-center justify-center">
                  <HiMail className="text-copper-glow text-xl" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Email</p>
                  <p className="text-sm text-foreground">naveenkhan0059@gmail.com</p>
                </div>
              </div>
            </a>
            <a href="tel:+923013586403" className="block glass-card card-hover-glow p-5 rounded-2xl">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-copper-glow/30 to-bronze/20 border border-copper/40 flex items-center justify-center">
                  <HiPhone className="text-copper-glow text-xl" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Phone</p>
                  <p className="text-sm text-foreground">+92 301 3586403</p>
                </div>
              </div>
            </a>
            <div className="glass-card p-5 rounded-2xl">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-copper-glow/30 to-bronze/20 border border-copper/40 flex items-center justify-center">
                  <HiLocationMarker className="text-copper-glow text-xl" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Location</p>
                  <p className="text-sm text-foreground">Karachi, Pakistan</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <a href="https://github.com/Naveen-Khan" target="_blank" rel="noopener noreferrer"
                className="flex-1 glass-card card-hover-glow p-4 rounded-2xl flex items-center justify-center gap-2 text-sm">
                <FaGithub className="text-lg text-copper-glow" /> GitHub
              </a>
              <a href="https://www.linkedin.com/in/naveen-khan-417103258/" target="_blank" rel="noopener noreferrer"
                className="flex-1 glass-card card-hover-glow p-4 rounded-2xl flex items-center justify-center gap-2 text-sm">
                <FaLinkedin className="text-lg text-copper-glow" /> LinkedIn
              </a>
            </div>
          </motion.div>

          <motion.form
            ref={formRef}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            onSubmit={handleSubmit}
            noValidate
            className="md:col-span-3 glass-card glow-border p-7 rounded-3xl space-y-5"
          >
            <p className="font-serif-italic text-copper-glow text-sm">— Send a message</p>

            {/* honeypot */}
            <input
              type="text" tabIndex={-1} autoComplete="off"
              value={hp} onChange={(e) => setHp(e.target.value)}
              className="absolute opacity-0 -left-[9999px] pointer-events-none"
              aria-hidden="true"
            />

            {(["name", "email", "subject"] as const).map((k) => (
              <motion.div
                key={k}
                animate={shake === k ? { x: [-10, 10, -8, 8, -4, 4, 0] } : { x: 0 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <input
                  type={k === "email" ? "email" : "text"}
                  value={form[k]}
                  onChange={(e) => setForm({ ...form, [k]: e.target.value })}
                  onFocus={() => setFocused(k)}
                  onBlur={() => setFocused(null)}
                  className={fieldClass(k)}
                  placeholder={k}
                  required
                />
                <label className={labelClass(k)}>
                  {k === "name" ? "Full Name" : k === "email" ? "Email Address" : "Subject"}
                </label>
                <AnimatePresence>
                  {errors[k] && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-[11px] text-destructive mt-1.5 flex items-center gap-1.5"
                    >
                      <HiExclamationCircle /> {errors[k]}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}

            <motion.div
              animate={shake === "message" ? { x: [-10, 10, -8, 8, -4, 4, 0] } : { x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <textarea
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                onFocus={() => setFocused("message")}
                onBlur={() => setFocused(null)}
                className={`${fieldClass("message")} resize-none pt-7`}
                placeholder="message"
                required
              />
              <label
                className={`absolute left-4 transition-all duration-200 pointer-events-none uppercase tracking-[0.18em] ${
                  focused === "message" || form.message
                    ? "top-2 text-[9px] text-copper-glow"
                    : "top-4 text-xs text-muted-foreground/70"
                }`}
              >
                Message
              </label>
              <AnimatePresence>
                {errors.message && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-[11px] text-destructive mt-1.5 flex items-center gap-1.5"
                  >
                    <HiExclamationCircle /> {errors.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="btn-glow w-full bg-gradient-to-r from-copper-glow via-copper to-bronze text-background py-3.5 rounded-2xl font-semibold text-sm uppercase tracking-[0.2em] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {status === "sending" ? (
                <>
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-background/40 border-t-background rounded-full"
                  />
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </button>
          </motion.form>
        </div>
      </div>

      {/* Success / error popup */}
      <AnimatePresence>
        {(status === "success" || status === "error") && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="absolute inset-0 bg-background/60 backdrop-blur-sm pointer-events-auto" onClick={() => setStatus("idle")} />
            <motion.div
              initial={{ scale: 0.7, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="relative glass-card glow-border p-8 rounded-3xl max-w-sm text-center pointer-events-auto"
            >
              {status === "success" ? (
                <>
                  <motion.div
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.15, type: "spring", stiffness: 260 }}
                    className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4"
                    style={{
                      background: "linear-gradient(135deg, hsl(30 90% 65%), hsl(25 78% 55%))",
                      boxShadow: "0 0 50px hsl(30 90% 65% / 0.7)",
                    }}
                  >
                    <HiCheckCircle className="text-4xl text-background" />
                  </motion.div>
                  <h3 className="font-display text-2xl gradient-text-warm mb-2">Message Sent Successfully</h3>
                  <p className="text-sm text-muted-foreground">Thanks for reaching out — I'll get back to you shortly.</p>
                </>
              ) : (
                <>
                  <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 bg-destructive/20 border border-destructive/40">
                    <HiExclamationCircle className="text-4xl text-destructive" />
                  </div>
                  <h3 className="font-display text-2xl text-foreground mb-2">Something went wrong</h3>
                  <p className="text-sm text-muted-foreground">{errorMsg}</p>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ContactSection;
