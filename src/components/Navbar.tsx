import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FaGithub, FaLinkedin } from "react-icons/fa";


const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

const profileLinks = [
  { label: "GitHub", href: "https://github.com/Naveen-Khan", Icon: FaGithub },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/naveen-khan-417103258/", Icon: FaLinkedin },
];

const scrollToSection = (href: string) => {
  if (typeof window === "undefined") return;
  if (href === "#") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.history.replaceState(null, "", window.location.pathname);
    return;
  }
  const el = document.querySelector<HTMLElement>(href);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  window.history.replaceState(null, "", `${window.location.pathname}${href}`);
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#about");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 12) {
        setActive("#contact");
        return;
      }
      const ids = navLinks.map((l) => l.href.slice(1));
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 140 && rect.bottom >= 140) {
          setActive(`#${id}`); break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
      className="fixed top-4 left-4 right-4 z-50"
    >
      <div
        className={`max-w-5xl mx-auto px-5 py-3 rounded-full border transition-all duration-500 ${
          scrolled ? "border-copper/30 shadow-[0_8px_40px_-12px_hsl(25_78%_55%_/_0.35)]" : "border-border/40"
        }`}
        style={{
          background: scrolled
            ? "linear-gradient(135deg, hsl(24 18% 6% / 0.85), hsl(20 25% 9% / 0.6))"
            : "linear-gradient(135deg, hsl(24 18% 6% / 0.6), hsl(20 25% 9% / 0.35))",
          backdropFilter: "blur(28px) saturate(1.4)",
        }}
      >
        <div className="flex items-center justify-between gap-6">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#");
              setOpen(false);
            }}
            className="flex items-center gap-2 group"
          >
            <div className="relative w-9 h-9 rounded-full bg-gradient-to-br from-copper-glow via-copper to-bronze flex items-center justify-center font-display font-bold text-background text-sm">
              NK
              <div className="absolute inset-0 rounded-full bg-copper-glow/40 blur-md group-hover:blur-lg transition-all" />
            </div>
            <span className="hidden sm:block font-display text-base tracking-wide gradient-text">Naveen Khan</span>
          </a>

          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((l) => {
              const isActive = active === l.href;
              return (
                <li key={l.href} className="relative">
                  <a
                    href={l.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(l.href);
                      setOpen(false);
                    }}
                    className={`relative px-4 py-2 text-xs uppercase tracking-[0.18em] font-medium transition-colors ${
                      isActive ? "text-copper-glow" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {l.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        className="absolute inset-0 -z-10 rounded-full border border-copper/40"
                        style={{ background: "linear-gradient(135deg, hsl(25 78% 55% / 0.18), hsl(30 55% 42% / 0.1))" }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="hidden md:flex items-center gap-3">

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#contact");
                setOpen(false);
              }}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] px-4 py-2 rounded-full text-background font-semibold bg-gradient-to-r from-copper-glow via-copper to-bronze hover:shadow-[0_0_30px_-5px_hsl(25_78%_55%_/_0.7)] transition-all"
            >
              Let's Talk
            </a>
          </div>

          <div className="md:hidden flex items-center gap-2">

            <button
              onClick={() => setOpen(!open)}
              className="text-foreground p-2 rounded-full border border-border/50"
              aria-label="Toggle menu"
            >
              {open ? <HiX size={20} /> : <HiMenuAlt3 size={20} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden mt-3"
            >
              <ul className="flex flex-col gap-1 pt-2 border-t border-border/40 text-center">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(l.href);
                        setOpen(false);
                      }}
                      className="block px-4 py-3 text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-copper-glow text-center"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
                <li className="grid grid-cols-2 gap-2 pt-2">
                  {profileLinks.map(({ label, href, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-border/50 px-4 py-3 text-xs uppercase tracking-[0.16em] text-muted-foreground hover:border-copper/60 hover:text-copper-glow"
                    >
                      <Icon size={14} /> {label}
                    </a>
                  ))}
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
