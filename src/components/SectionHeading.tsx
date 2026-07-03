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
          yPercent: 120,
          filter: "blur(10px)",
          rotateX: -60,
          duration: 0.9,
          ease: EASE,
          stagger: 0.035,
          scrollTrigger: trigger,
        });
      } else if (variant === "float") {
        gsap.from(heading, {
          opacity: 0,
          y: 40,
          rotate: -4,
          scale: 0.92,
          filter: "blur(14px)",
          duration: 1.1,
          ease: EASE,
          scrollTrigger: trigger,
        });
        gsap.to(heading, {
          y: -10,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1.1,
        });
      } else if (variant === "zoom") {
        gsap.from(heading, {
          opacity: 0,
          scale: 2.4,
          filter: "blur(24px)",
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: trigger,
        });
      } else if (variant === "slide") {
        gsap.from(heading, {
          opacity: 0,
          x: -140,
          filter: "blur(12px)",
          duration: 1.1,
          ease: EASE,
          scrollTrigger: trigger,
        });
        if (underlineRef.current) {
          gsap.from(underlineRef.current, {
            scaleX: 0,
            transformOrigin: "left",
            duration: 1.3,
            delay: 0.3,
            ease: EASE,
            scrollTrigger: trigger,
          });
        }
      } else if (variant === "rotate3d") {
        gsap.from(heading, {
          opacity: 0,
          rotateX: 95,
          y: 40,
          filter: "blur(14px)",
          duration: 1.2,
          ease: EASE,
          scrollTrigger: trigger,
        });
        gsap.to(heading, {
          y: -6,
          duration: 5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1.2,
        });
      } else if (variant === "neon") {
        gsap.fromTo(
          heading,
          { opacity: 0, scale: 0.92 },
          {
            opacity: 1,
            scale: 1,
            keyframes: { opacity: [0, 1, 0.3, 1, 0.6, 1] },
            duration: 1.6,
            ease: "power2.out",
            scrollTrigger: trigger,
          }
        );
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
