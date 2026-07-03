import { motion, Variants } from "framer-motion";

type Variant = "split" | "float" | "zoom" | "slide" | "rotate3d" | "neon";

const EASE = [0.2, 0.8, 0.2, 1] as const;

const SectionHeading = ({
  title,
  subtitle,
  eyebrow,
  align = "center",
  variant = "split",
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  align?: "center" | "left";
  variant?: Variant;
}) => {
  const words = title.split(" ");
  const lastWord = words.slice(-1)[0];
  const firstWords = words.slice(0, -1).join(" ");

  // Shared viewport – fires as soon as the wrapper is even partially in view
  const inView = { once: true, amount: 0.05, margin: "0px 0px -10% 0px" } as const;

  const baseClass =
    "section-heading-premium font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1] tracking-tight inline-block cursor-default";

  const renderHeading = () => {
    if (variant === "split") {
      const fullText = `${firstWords} ${lastWord}.`;
      const letters = Array.from(fullText);
      const container: Variants = {
        hidden: {},
        show: { transition: { staggerChildren: 0.022, delayChildren: 0 } },
      };
      const letterV: Variants = {
        hidden: { opacity: 0, y: 28, rotateX: -55, filter: "blur(6px)" },
        show: {
          opacity: 1,
          y: 0,
          rotateX: 0,
          filter: "blur(0px)",
          transition: { duration: 0.45, ease: EASE },
        },
      };
      return (
        <motion.h2
          className={baseClass}
          style={{ perspective: 800 }}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={inView}
        >
          {letters.map((ch, i) => {
            const inLast = i >= fullText.length - lastWord.length - 1 && ch !== ".";
            const cls = inLast
              ? "font-serif italic text-foreground/90"
              : ch === "."
              ? "text-copper"
              : "gradient-text-warm";
            return (
              <motion.span
                key={i}
                variants={letterV}
                className={`inline-block ${cls}`}
                style={{ whiteSpace: ch === " " ? "pre" : "normal" }}
              >
                {ch === " " ? "\u00A0" : ch}
              </motion.span>
            );
          })}
        </motion.h2>
      );
    }

    if (variant === "float") {
      return (
        <motion.h2
          className={`${baseClass} glow-text`}
          style={{ textShadow: "0 0 30px hsl(25 78% 55% / 0.5)" }}
          initial={{ opacity: 0, y: 18, scale: 0.97, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={inView}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <span className="gradient-text-warm">{firstWords} </span>
          <span className="font-serif italic text-foreground/90">{lastWord}</span>
          <span className="text-copper">.</span>
        </motion.h2>
      );
    }

    if (variant === "zoom") {
      return (
        <motion.h2
          className={baseClass}
          initial={{ opacity: 0, scale: 1.25, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          viewport={inView}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="gradient-text-warm">{firstWords} </span>
          <span className="font-serif italic text-foreground/90">{lastWord}</span>
          <span className="text-copper">.</span>
        </motion.h2>
      );
    }

    if (variant === "slide") {
      return (
        <div className="relative inline-block overflow-hidden">
          <motion.h2
            className={baseClass}
            initial={{ opacity: 0, x: -60, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={inView}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <span className="gradient-text-warm">{firstWords} </span>
            <span className="font-serif italic text-foreground/90">{lastWord}</span>
            <span className="text-copper">.</span>
          </motion.h2>
          <motion.div
            className="h-[2px] mt-2 bg-gradient-to-r from-copper via-copper-glow to-transparent origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={inView}
            transition={{ duration: 0.7, ease: EASE }}
          />
        </div>
      );
    }

    if (variant === "rotate3d") {
      return (
        <motion.h2
          className={baseClass}
          style={{ transformPerspective: 1200, transformStyle: "preserve-3d" } as React.CSSProperties}
          initial={{ opacity: 0, rotateX: 55, y: 20, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, rotateX: 0, y: 0, filter: "blur(0px)" }}
          viewport={inView}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <span className="gradient-text-warm">{firstWords} </span>
          <span className="font-serif italic text-foreground/90">{lastWord}</span>
          <span className="text-copper">.</span>
        </motion.h2>
      );
    }

    if (variant === "neon") {
      return (
        <motion.h2
          className={`${baseClass} animate-neon-flicker`}
          initial={{ opacity: 0, scale: 0.96, y: 14 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span className="gradient-text-warm">{firstWords} </span>
          <span className="font-serif italic text-foreground/90">{lastWord}</span>
          <span className="text-copper">.</span>
        </motion.h2>
      );
    }

    return null;
  };

  return (
    <motion.div
      className={`section-heading-wrap mb-14 ${align === "center" ? "text-center" : "text-left"}`}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.06, delayChildren: 0 } },
      }}
    >
      {eyebrow && (
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 10 },
            show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
          }}
          className={`flex items-center gap-3 mb-4 ${align === "center" ? "justify-center" : ""}`}
        >
          <motion.span
            className="h-px w-8 bg-copper/60 origin-right"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={inView}
            transition={{ duration: 0.5, ease: EASE }}
          />
          <p className="text-[10px] uppercase tracking-[0.4em] text-copper-glow font-mono-code">
            {eyebrow}
          </p>
          <motion.span
            className="h-px w-8 bg-copper/60 origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={inView}
            transition={{ duration: 0.5, ease: EASE }}
          />
        </motion.div>
      )}
      {renderHeading()}
      {subtitle && (
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 10 },
            show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE, delay: 0.05 } },
          }}
          className="text-muted-foreground mt-4 text-sm sm:text-base max-w-xl mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};

export default SectionHeading;
