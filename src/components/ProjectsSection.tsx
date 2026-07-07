import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, MouseEvent } from "react";
import SectionHeading from "./SectionHeading";
import { FaGithub } from "react-icons/fa";
import { HiArrowUpRight } from "react-icons/hi2";

const projects = [
  {
    n: "01",
    title: "AI-Powered Chatbot Assistant",
    tag: "AI · RAG · ENTERPRISE SUPPORT",
    tech: ["Retrieval-Augmented Generation", "LLM", "LangChain", "Python", "Streamlit", "FAISS"],
    description:
      "An enterprise-grade conversational assistant that answers customer and employee queries by retrieving information from company documents. Uses free FAISS vector search and Mistral LLM to deliver accurate, citation-backed responses. Includes conversation memory, handles unknown questions politely, and offers an interactive Streamlit UI. Reduced operational costs by 30% and minimized the need for human by 40%.",
    github: "https://github.com/Naveen-Khan/CATI--chatbot",
  },
  {
    n: "02",
    title: "Machdollas AI Customer Support Agent",
    tag: "AI Automation",
    tech: ["n8n", "Google Gemini", "Google Sheets", "Webhooks", "HTML/CSS/JS", "Vercel"],
    description:
      "A fully automated AI-driven customer support system for a restaurant chain, handling menu queries, order placement, tracking, and cancellations in real-time. Built a 24/7 autonomous AI agent using n8n and Google Gemini that reduced manual customer service workload by 65%. Integrated Google Sheets as a live backend for dynamic menu retrieval and order tracking, cutting order error rates by 40%. Deployed a responsive chat interface on Vercel for seamless customer interaction.",
    live: "https://machdonals-ai-agent.vercel.app",
  },
  {
    n: "03",
    title: "Autonomous Infrastructure Inspection",
    tag: "Computer Vision · YOLO",
    tech: ["YOLOv8", "OpenCV", "PyTorch", "Streamlit", "Python"],
    description:
      "An end-to-end road-damage detection system that automates manual highway inspection. A custom-trained YOLOv8 model identifies potholes, longitudinal cracks, alligator cracks and surface erosion from drone and dash-cam footage in real time. Results stream into a Streamlit dashboard with severity scoring, geo-tagged heatmaps, and exportable inspection reports for civil engineering teams.",
    github: "https://github.com/Naveen-Khan/Autonomous-Infrastructure-Inspection-System",
  },
  {
    n: "04",
    title: "Medical Disease Diagnosis Agent",
    tag: "DenseNet · TensorFlow",
    tech: ["DenseNet121", "TensorFlow", "Keras", "CNN", "Streamlit"],
    description:
      "A deep-learning diagnostic assistant that classifies brain MRI scans across multiple tumor categories. Built on a transfer-learned DenseNet121 backbone with data augmentation, class balancing and fine-tuned dense heads, reaching strong validation accuracy on held-out scans. Wrapped in a clinician-friendly Streamlit interface that returns the predicted class, confidence scores and a Grad-CAM heatmap for explainability.",
  },
  {
    n: "05",
    title: "Multimodal Smart Wearable Safety System",
    tag: "YOLO · GPS · Voice",
    tech: ["YOLOv8", "Raspberry Pi", "GPS", "Voice Recognition", "IoT"],
    description:
      "A wearable personal-safety device that fuses computer vision, audio and location signals. An on-device YOLO model detects weapons and physical threats from a body-cam feed, while voice-trigger phrases and a panic button instantly broadcast GPS coordinates with a live alert to emergency contacts. Awarded 2nd place at the IEEE Project Exhibition 2025 for innovation in multimodal embedded AI.",
    github: "https://github.com/Naveen-Khan/Multimodal-Smar-Wearable-Device-For-Personal-Saftey",
  },
  {
    n: "06",
    title: "Coffee Shop Sales Analytics",
    tag: "Excel · Data Viz",
    tech: ["Excel", "Power Query", "Pivot Tables", "DAX", "Dashboards"],
    description:
      "A full business-intelligence study of a multi-location coffee chain's transactional data. Cleaned and modeled raw POS exports with Power Query, built pivot-driven analyses of revenue trends, peak hours, product mix, store performance and customer behavior, and packaged the findings into an interactive dashboard with actionable recommendations for marketing and operations.",
    github: "https://github.com/Naveen-Khan/Data-Analyst-projects",
  },
  {
    n: "07",
    title: "RevenueAI — Sales Forecasting Based on Advertisement",
    tag: "AI · Predictive Analytics",
    tech: ["Machine Learning", "Polynomial Regression", "Python", "Streamlit"],
    description:
      "An intelligent sales forecasting platform powered by Polynomial Regression. Analyzes advertising investments across TV, Radio, and Newspaper channels to predict future sales, optimize marketing budgets, and deliver actionable business insights through an interactive dashboard.\n\nAchieved 95.3% R² accuracy with 0.903 MAE, validated through enabling businesses to make data-driven marketing decisions with confidence.",
    live: "https://naveen-khan-sales-prediction-app-bamzvr.streamlit.app",
    github: "https://github.com/Naveen-Khan/RevenueAi",
  },
  {
    n: "08",
    title: "OutreachAI — Smart Email Outreach Agent",
    tag: "AI · AUTOMATION · SALES OUTREACH",
    tech: ["n8n", "OpenRouter AI LLMs", "Google Sheets", "Gmail", "JavaScript", "GCP"],
    description:
      "An AI-powered email automation agent built with n8n that sends 50+ personalized sales emails daily to potential clients. The system automatically reads company data from Google Sheets, generates tailored outreach emails using LLMs, sends them without manual intervention, and logs all email content back to the sheet. Reduced manual effort by 90% while maintaining a cost of approximately $0.02 per email.",
    github: "https://github.com/Naveen-Khan/Smart-Email-Outreach-Agent",
  },
  {
    n: "09",
    title: "CardioRisk AI — Clinical Decision Support System",
    tag: "AI · HEALTHCARE · CLINICAL DECISION SUPPORT",
    tech: ["Machine Learning", "Next.js", "Python", "SQLite", "Tailwind CSS", "Vercel"],
    description:
      "An intelligent web application that predicts heart disease risk using 13 clinical variables with 97.6% accuracy. Powered by Support Vector Machine (SVM) and validated on 3,800+ patient records, the platform delivers real-time risk stratification, and multi-format medical reports (PDF, CSV, Excel). Logistic Regression baseline (80.5% accuracy) included for clinical comparison. Deployed globally via Vercel.",
    live: "https://web-un87u2afa-naveenkhan0111-4662s-projects.vercel.app",
    github: "https://github.com/Naveen-Khan/Heart_Disease_prediction",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;
const cardV = {
  hidden: { opacity: 0, y: 60, scale: 0.94, rotateX: -8, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE, staggerChildren: 0.06, delayChildren: 0.15 },
  },
};
const itemV = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};
const chipV = {
  hidden: { opacity: 0, scale: 0.6, y: 8 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
};

const ProjectCard = ({ p, i }: { p: typeof projects[number]; i: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      variants={cardV}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      whileHover={{ y: -8, transition: { duration: 0.3, ease: EASE } }}
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
      className="group relative rounded-3xl overflow-hidden glass-card card-hover-glow p-7 sm:p-9 cursor-pointer"
    >
      {/* hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: "radial-gradient(600px circle at var(--mx,50%) var(--my,50%), hsl(25 78% 55% / 0.18), transparent 60%)" }} />
      <div className="relative z-10 flex flex-col h-full" style={{ transform: "translateZ(40px)" }}>
        <motion.div variants={itemV} className="flex items-start justify-between mb-6">
          <span className="font-mono-code text-xs text-copper-glow/70 tracking-widest">{p.n}</span>
          {p.github ? (
            <motion.a
              whileHover={{ scale: 1.15, rotate: -8 }}
              whileTap={{ scale: 0.9 }}
              href={p.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${p.title} GitHub repository`}
              className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-foreground/70 hover:text-copper-glow border border-border/50 hover:border-copper/60 transition-all"
            >
              <FaGithub size={15} />
            </motion.a>
          ) : (
            <motion.a
              whileHover={{ scale: 1.15, rotate: -8 }}
              whileTap={{ scale: 0.9 }}
              href="https://github.com/Naveen-Khan"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Naveen Khan GitHub profile"
              className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-foreground/70 hover:text-copper-glow border border-border/50 hover:border-copper/60 transition-all"
            >
              <FaGithub size={15} />
            </motion.a>
          )}
        </motion.div>
        <motion.p variants={itemV} className="text-[10px] uppercase tracking-[0.3em] text-copper-glow/80 mb-3">{p.tag}</motion.p>
        <motion.h3 variants={itemV} className="font-display text-2xl sm:text-3xl text-foreground/95 leading-tight mb-3 group-hover:gradient-text-warm transition-all">
          {p.title}
        </motion.h3>
        <motion.p variants={itemV} className="text-sm text-foreground/65 leading-relaxed mb-6 flex-1">{p.description}</motion.p>
        <motion.div
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } } }}
          className="flex flex-wrap gap-1.5 mb-5"
        >
          {p.tech.map((t) => (
            <motion.span
              variants={chipV}
              whileHover={{ y: -2, scale: 1.06 }}
              key={t}
              className="text-[10px] px-2.5 py-1 rounded-full bg-copper/10 text-copper-glow border border-copper/25"
            >
              {t}
            </motion.span>
          ))}
        </motion.div>
        {p.live ? (
          <motion.a
            variants={itemV}
            whileHover={{ x: 4 }}
            href={p.live}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-copper-glow/80 hover:text-copper-glow transition-colors"
          >
            Live Demo <HiArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </motion.a>
        ) : (
          <motion.div variants={itemV} className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-copper-glow/80 group-hover:text-copper-glow transition-colors">
            Case Study <HiArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => (
  <section id="projects" className="py-32 relative overflow-hidden">
    <div className="absolute top-1/3 left-0 w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none"
      style={{ background: "radial-gradient(circle, hsl(25 78% 55% / 0.5), transparent 70%)", filter: "blur(100px)" }} />
    <div className="section-container relative z-10">
      <SectionHeading eyebrow="03 — Selected Work" title="What I've Built" subtitle="Case studies in applied intelligence" variant="zoom" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {projects.map((p, i) => <ProjectCard key={p.title} p={p} i={i} />)}
      </div>
    </div>
  </section>
);

export default ProjectsSection;
