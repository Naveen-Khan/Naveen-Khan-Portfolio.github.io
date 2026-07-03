import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Variant = "split" | "float" | "zoom" | "slide" | "rotate3d" | "neon";

const EASE = "power3.out";

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
  const wrapRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);

  const words = title.split(" ");
  const lastWord = words.slice(-1)[0];
  const firstWords = words.slice(0, -1).join(" ");

  useEffect(() => {
    const wrap = wrapRef.current;
    const heading = headingRef.current;
    if (!wrap || !heading) return;

    const ctx = gsap.context(() => {
      // wrapper fade
      gsap.from(wrap.querySelectorAll("[data-eyebrow], [data-subtitle]"), {
        opacity: 0,
        y: 12,
        duration: 0.5,
        ease: EASE,
        stagger: 0.06,
        scrollTrigger: { trigger: wrap, start: "top 95%", once: true },
      });

      const trigger = { trigger: heading, start: "top 95%", once: true } as const;

      if (variant === "split") {
        const letters = heading.querySelectorAll<HTMLElement>("[data-letter]");
        gsap.from(letters, {
          opacity: 0,
          yPercent: 80,
          filter: "blur(6px)",
          rotateX: -40,
          duration: 0.55,
          ease: EASE,
          stagger: 0.018,
          scrollTrigger: trigger,
        });
      } else if (variant === "float") {
        gsap.from(heading, {
          opacity: 0,
          y: 24,
          scale: 0.96,
          filter: "blur(8px)",
          duration: 0.7,
          ease: EASE,
          scrollTrigger: trigger,
        });
        gsap.to(heading, {
          y: -8,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 0.8,
        });
      } else if (variant === "zoom") {
        gsap.from(heading, {
          opacity: 0,
          scale: 1.4,
          filter: "blur(12px)",
          duration: 0.75,
          ease: "expo.out",
          scrollTrigger: trigger,
        });
      } else if (variant === "slide") {
        gsap.from(heading, {
          opacity: 0,
          x: -80,
          filter: "blur(8px)",
          duration: 0.7,
          ease: EASE,
          scrollTrigger: trigger,
        });
        if (underlineRef.current) {
          gsap.from(underlineRef.current, {
            scaleX: 0,
            transformOrigin: "left",
            duration: 0.8,
            delay: 0.15,
            ease: EASE,
            scrollTrigger: trigger,
          });
        }
      } else if (variant === "rotate3d") {
        gsap.from(heading, {
          opacity: 0,
          rotateX: 60,
          y: 24,
          filter: "blur(8px)",
          duration: 0.75,
          ease: EASE,
          scrollTrigger: trigger,
        });
      } else if (variant === "neon") {
        gsap.from(heading, {
          opacity: 0,
          scale: 0.96,
          y: 16,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: trigger,
        });
      }
    }, wrap);

    return () => ctx.revert();
  }, [variant]);

  const baseClass =
    "section-heading-premium font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1] tracking-tight inline-block cursor-default";

  const renderHeading = () => {
    if (variant === "split") {
      const fullText = `${firstWords} ${lastWord}.`;
      const letters = Array.from(fullText);
      return (
        <h2 ref={headingRef} className={baseClass} style={{ perspective: 800 }}>
          {letters.map((ch, i) => {
            const inLast = i >= fullText.length - lastWord.length - 1 && ch !== ".";
            const cls = inLast
              ? "font-serif italic text-foreground/90"
              : ch === "."
              ? "text-copper"
              : "gradient-text-warm";
            return (
              <span
                key={i}
                data-letter
                className={`inline-block ${cls}`}
                style={{ whiteSpace: ch === " " ? "pre" : "normal" }}
              >
                {ch === " " ? "\u00A0" : ch}
              </span>
            );
          })}
        </h2>
      );
    }

    if (variant === "float") {
      return (
        <h2
          ref={headingRef}
          className={`${baseClass} glow-text animate-pulse-glow-soft`}
          style={{ textShadow: "0 0 30px hsl(25 78% 55% / 0.5)" }}
        >
          <span className="gradient-text-warm">{firstWords} </span>
          <span className="font-serif italic text-foreground/90">{lastWord}</span>
          <span className="text-copper">.</span>
        </h2>
      );
    }

    if (variant === "zoom") {
      return (
        <h2 ref={headingRef} className={baseClass}>
          <span className="gradient-text-warm">{firstWords} </span>
          <span className="font-serif italic text-foreground/90">{lastWord}</span>
          <span className="text-copper">.</span>
        </h2>
      );
    }

    if (variant === "slide") {
      return (
        <div className="relative inline-block overflow-hidden">
          <h2 ref={headingRef} className={baseClass}>
            <span className="gradient-text-warm">{firstWords} </span>
            <span className="font-serif italic text-foreground/90">{lastWord}</span>
            <span className="text-copper">.</span>
          </h2>
          <div
            ref={underlineRef}
            className="h-[2px] mt-2 bg-gradient-to-r from-copper via-copper-glow to-transparent"
          />
        </div>
      );
    }

    if (variant === "rotate3d") {
      return (
        <h2
          ref={headingRef}
          className={baseClass}
          style={{ transformPerspective: 1200, transformStyle: "preserve-3d" } as React.CSSProperties}
        >
          <span className="gradient-text-warm">{firstWords} </span>
          <span className="font-serif italic text-foreground/90">{lastWord}</span>
          <span className="text-copper">.</span>
        </h2>
      );
    }

    if (variant === "neon") {
      return (
        <h2 ref={headingRef} className={`${baseClass} animate-neon-flicker`}>
          <span className="gradient-text-warm">{firstWords} </span>
          <span className="font-serif italic text-foreground/90">{lastWord}</span>
          <span className="text-copper">.</span>
        </h2>
      );
    }

    return null;
  };

  return (
    <div
      ref={wrapRef}
        className={`section-heading-wrap mb-14 ${align === "center" ? "text-center" : "text-left"}`}
    >
      {eyebrow && (
        <div
          data-eyebrow
          className={`flex items-center gap-3 mb-4 ${align === "center" ? "justify-center" : ""}`}
        >
          <span className="h-px w-8 bg-copper/60" />
          <p className="text-[10px] uppercase tracking-[0.4em] text-copper-glow font-mono-code">
            {eyebrow}
          </p>
          <span className="h-px w-8 bg-copper/60" />
        </div>
      )}
      {renderHeading()}
      {subtitle && (
        <p
          data-subtitle
          className="text-muted-foreground mt-4 text-sm sm:text-base max-w-xl mx-auto"
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
