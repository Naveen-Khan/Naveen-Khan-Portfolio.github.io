import { motion, Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiDownload, HiMail, HiArrowDown } from "react-icons/hi";

const EASE = [0.22, 1, 0.36, 1] as const;
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: EASE } },
};
const clipReveal: Variants = {
  hidden: { opacity: 0, clipPath: "inset(0 100% 0 0)", y: 12 },
  show: {
    opacity: 1,
    clipPath: "inset(0 0% 0 0)",
    y: 0,
    transition: { duration: 0.9, ease: EASE },
  },
};
const floatIn: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.9, rotate: -3 },
  show: { opacity: 1, y: 0, scale: 1, rotate: 0, transition: { duration: 0.8, ease: EASE } },
};


const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      setMouse({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  const parallax = (depth: number) => ({
    transform: `translate3d(${(mouse.x - 0.5) * depth}px, ${(mouse.y - 0.5) * depth}px, 0)`,
  });

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector<HTMLElement>(href);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `${window.location.pathname}${href}`);
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden grain"
    >
      {/* Minimal dark background */}
      <div className="absolute inset-0 z-0 bg-background">
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/70" />
        {/* spotlight follows cursor */}
        <div
          className="absolute pointer-events-none w-[600px] h-[600px] rounded-full"
          style={{
            left: `${mouse.x * 100}%`,
            top: `${mouse.y * 100}%`,
            background: "radial-gradient(circle, hsl(30 90% 65% / 0.18) 0%, transparent 60%)",
            transform: "translate(-50%, -50%)",
            transition: "left 0.3s ease-out, top 0.3s ease-out",
            mixBlendMode: "screen",
          }}
        />
      </div>

      {/* Floating glass accent cards */}
      <motion.div
        variants={floatIn}
        initial="hidden"
        animate="show"
        transition={{ delay: 1.1 }}
        className="hidden lg:block absolute top-32 left-10 glass-card px-4 py-3 rounded-2xl animate-float"
        style={parallax(-30)}
      >
        <p className="text-[10px] uppercase tracking-[0.2em] text-copper-glow/80">Now Building</p>
        <p className="text-sm font-display text-foreground mt-1">RAG Pipelines · LLM Agents</p>
      </motion.div>
      <motion.div
        variants={floatIn}
        initial="hidden"
        animate="show"
        transition={{ delay: 1.25 }}
        className="hidden lg:block absolute bottom-32 right-10 glass-card px-4 py-3 rounded-2xl animate-float"
        style={{ ...parallax(-25), animationDelay: "-3s" }}
      >
        <p className="text-[10px] uppercase tracking-[0.2em] text-copper-glow/80">Based In</p>
        <p className="text-sm font-display text-foreground mt-1">Karachi, Pakistan</p>
      </motion.div>
      <motion.div
        variants={floatIn}
        initial="hidden"
        animate="show"
        transition={{ delay: 1.4 }}
        className="hidden xl:flex absolute top-1/3 right-16 glass-card glow-border px-4 py-3 rounded-2xl items-center gap-3"
        style={parallax(-40)}
      >
        <div className="w-2 h-2 rounded-full bg-copper-glow animate-pulse" />
        <p className="text-xs font-mono-code text-foreground/80">available_for_hire = true</p>
      </motion.div>

      {/* Main content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="section-container relative z-10 text-center"
        style={parallax(8)}
      >
        <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mb-8">
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
            className="h-px w-12 bg-gradient-to-r from-transparent to-copper origin-right"
          />
          <p className="font-serif-italic text-copper-glow tracking-widest text-sm sm:text-base">
            build future with AI
          </p>
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
            className="h-px w-12 bg-gradient-to-l from-transparent to-copper origin-left"
          />
        </motion.div>

        <motion.h1
          variants={container}
          className="font-display font-bold leading-[0.95] tracking-tight animate-hero-reveal"
        >
          <motion.span
            variants={clipReveal}
            className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl gradient-text-warm glow-text animate-pulse-glow-soft"
          >
            Naveen
          </motion.span>
          <motion.span
            variants={clipReveal}
            className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-foreground/95 mt-1 italic font-serif"
          >
            Khan<span className="text-copper">.</span>
          </motion.span>
        </motion.h1>

        <motion.div variants={fadeUp} className="mt-8 flex flex-col items-center gap-2">
          <p className="text-base sm:text-lg uppercase tracking-[0.4em] text-foreground/80 font-medium">
            Creative Developer
          </p>
          <div className="h-7 flex items-center justify-center">
            <TypeAnimation
              sequence={[
                "AI / ML Engineer",
                2000,
                "AI Automation Engineer",
                2000,
                "Computer System Engineer",
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="font-mono-code text-sm sm:text-base text-copper-glow/90"
            />
          </div>
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="text-muted-foreground mt-6 max-w-xl mx-auto text-sm sm:text-base leading-relaxed"
        >
          Crafting intelligent systems where data, design, and decision-making meet.
          Building production-grade AI that solves real problems, cuts support costs
          up to 30% and delivers measurable impact.
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-wrap gap-3 justify-center mt-10">
          <motion.a
            whileHover={{ y: -3, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href="#projects"
            onClick={(e) => handleAnchorClick(e, "#projects")}
            className="btn-glow group inline-flex items-center gap-2 bg-gradient-to-r from-copper-glow via-copper to-bronze text-background px-6 py-3 rounded-full font-semibold text-sm uppercase tracking-[0.15em]"
          >
            Explore Portfolio
            <HiArrowDown className="text-base group-hover:translate-y-0.5 transition-transform" />
          </motion.a>
          <motion.a
            whileHover={{ y: -3, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href="#contact"
            onClick={(e) => handleAnchorClick(e, "#contact")}
            className="glass-card card-hover-glow inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm uppercase tracking-[0.15em] text-foreground"
          >
            <HiMail className="text-base" /> Contact Me
          </motion.a>
          <motion.a
            whileHover={{ y: -3, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href={`${import.meta.env.BASE_URL}Naveen_Resume.pdf`}
            download
            className="glass-card card-hover-glow inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm uppercase tracking-[0.15em] text-foreground"
          >
            <HiDownload /> Resume
          </motion.a>
          <div className="flex gap-2">
            <motion.a
              whileHover={{ y: -3, rotate: -6, scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              href="https://github.com/Naveen-Khan"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="glass-card card-hover-glow inline-flex items-center justify-center w-12 h-12 rounded-full text-foreground"
            >
              <FaGithub />
            </motion.a>
            <motion.a
              whileHover={{ y: -3, rotate: 6, scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              href="https://www.linkedin.com/in/naveen-khan-417103258/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="glass-card card-hover-glow inline-flex items-center justify-center w-12 h-12 rounded-full text-foreground"
            >
              <FaLinkedin />
            </motion.a>
          </div>
        </motion.div>
      </motion.div>

    </section>
  );
};

export default HeroSection;
