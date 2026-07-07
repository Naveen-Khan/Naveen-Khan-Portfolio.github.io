import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { HiBriefcase, HiArrowRight } from "react-icons/hi";

const experiences = [
  {
    role: "AI Engineer Intern",
    company: "Civil Aviation Authority Pakistan",
    location: "Hyderabad Airport, PK",
    date: "Jul 2025 — Aug 2025",
    tag: "Government · Aviation",
    summary:
      "Designed conversational automation and document intelligence pipelines for internal aviation operations.",
    points: [
      "Built an internal conversational assistant using LLM APIs to automate repetitive operations",
      "Engineered chunking, embeddings & vector search over aviation policy documents",
      "Integrated RAG to deliver citation-backed answers to officers",
      "Reduced manual lookup time through AI-driven workflow automation",
    ],
    stack: ["Python", "LangChain", "OpenAI", "FAISS", "FastAPI"],
  },
  {
    role: "AI Engineer Intern",
    company: "Itsolera Pvt Ltd",
    location: "Islamabad, PK",
    date: "Jan 2026 — Mar 2026",
    tag: "AI · Healthcare",
    summary:
      "Built a production-grade deep learning system for medical image classification with a clinician-facing UI.",
    points: [
      "DenseNet121 medical image classifier with transfer learning for high diagnostic accuracy",
      "Dataset augmentation (rotation, flips, contrast) to boost robustness on unseen scans",
      "Tuned LR scheduling & early stopping to lift validation accuracy significantly",
      "Shipped a Streamlit interface with Grad-CAM heatmaps for clinician explainability",
    ],
    stack: ["PyTorch", "DenseNet121", "OpenCV", "Streamlit", "Grad-CAM"],
  },
];

const ExperienceSection = () => (
  <section id="experience" className="py-32 relative">
    <div className="section-container relative z-10 max-w-6xl">
      <SectionHeading
        eyebrow="04 — Journey"
        title="Where I've Worked"
        subtitle="Industry experience that shaped the craft — from aviation automation to medical AI."
        variant="slide"
      />

      <div className="relative mt-20">
        {/* Vertical timeline rail */}
        <div
          aria-hidden
          className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px bg-border"
        />
        <div
          aria-hidden
          className="md:hidden absolute left-5 top-0 bottom-0 w-px bg-border"
        />

        <div className="space-y-20 md:space-y-28">
          {experiences.map((exp, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div
                key={exp.company}
                className="relative md:grid md:grid-cols-2 md:gap-16 items-start"
              >
                {/* Timeline node */}
                <div className="absolute left-5 md:left-1/2 top-6 md:top-8 -translate-x-1/2 z-20">
                  <div className="w-3 h-3 rounded-full bg-primary ring-4 ring-background" />
                </div>

                {/* Date label opposite the card */}
                <div
                  className={`hidden md:block ${
                    isLeft ? "md:col-start-2 md:pl-10 text-left" : "md:col-start-1 md:pr-10 text-right md:row-start-1"
                  }`}
                >
                  <p className="text-[11px] uppercase tracking-[0.35em] text-primary font-mono-code pt-8">
                    {exp.date}
                  </p>
                  <p className="text-xs text-foreground/50 mt-2">{exp.location}</p>
                </div>

                {/* Card */}
                <motion.div
                  initial={{ opacity: 0, x: isLeft ? -50 : 50, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
                  className={`pl-12 md:pl-0 ${
                    isLeft
                      ? "md:col-start-1 md:pr-10 md:row-start-1"
                      : "md:col-start-2 md:pl-10 md:row-start-1"
                  }`}
                >
                  <article className="group relative rounded-2xl border border-border bg-card/40 p-7 sm:p-8 transition-colors duration-300 hover:border-primary/60">
                    {/* Mobile date */}
                    <div className="md:hidden flex items-center gap-3 mb-3">
                      <p className="text-[11px] uppercase tracking-[0.3em] text-primary font-mono-code">
                        {exp.date}
                      </p>
                    </div>

                    {/* Tag + icon row */}
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-[10px] uppercase tracking-[0.3em] font-mono-code text-primary/90">
                        {exp.tag}
                      </span>
                      <div className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-primary">
                        <HiBriefcase />
                      </div>
                    </div>

                    {/* Role */}
                    <h3 className="font-display text-2xl sm:text-[28px] text-foreground leading-tight">
                      {exp.role}
                    </h3>
                    <p className="mt-1 text-sm text-foreground/70">
                      {exp.company} <span className="text-foreground/40">· {exp.location}</span>
                    </p>

                    {/* Summary */}
                    <p className="mt-4 text-sm text-foreground/75 leading-relaxed font-serif-italic">
                      {exp.summary}
                    </p>

                    {/* Divider */}
                    <div className="my-5 h-px bg-border" />

                    {/* Bullets */}
                    <ul className="space-y-2.5">
                      {exp.points.map((pt) => (
                        <li
                          key={pt}
                          className="flex items-start gap-3 text-[13px] sm:text-sm text-foreground/80 leading-relaxed"
                        >
                          <HiArrowRight className="mt-1 text-primary shrink-0" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Stack */}
                    <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-border">
                      {exp.stack.map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-mono-code px-2.5 py-1 rounded border border-border text-foreground/70 hover:border-primary hover:text-primary transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </article>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);

export default ExperienceSection;
