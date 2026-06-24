import { useState } from "react";
import { motion } from "motion/react";
import { Search, Compass, Paintbrush, Cpu, Check } from "lucide-react";
import { ProcessStep } from "../types";

export default function Process() {
  const [selectedStep, setSelectedStep] = useState<number | null>(null);

  const steps: ProcessStep[] = [
    {
      number: "01",
      title: "Discovery",
      description: "Deep diving into your brand's DNA, market position, and core objectives to find the unique angle.",
      details: [
        "Brand audit & competitive matrix",
        "Stakeholder interviewing sessions",
        "Target consumer behavioral profiling",
        "Technological feasibility mapping",
      ],
    },
    {
      number: "02",
      title: "Strategy",
      description: "Defining the architectural blueprint and user journey that aligns with your business goals.",
      details: [
        "Information architecture blueprints",
        "User journey flow optimization",
        "Interactive wireframe prototypes",
        "Brand storytelling core frameworks",
      ],
    },
    {
      number: "03",
      title: "Design",
      description: "Crafting high-fidelity interfaces and cinematic brand experiences with surgical precision.",
      details: [
        "Bespoke motion style systems",
        "Frictional interface experiments",
        "High-contrast color & typography",
        "Staggered cinematic art direction",
      ],
    },
    {
      number: "04",
      title: "Development",
      description: "Translating designs into high-performance digital products with clean, scalable code.",
      details: [
        "TypeScript functional reactivity",
        "GPU-accelerated vector layouts",
        "Vapor-fast rendering pipeline",
        "Comprehensive device-agnostic builds",
      ],
    },
  ];

  const getIcon = (num: string) => {
    switch (num) {
      case "01": return <Search size={18} />;
      case "02": return <Compass size={18} />;
      case "03": return <Paintbrush size={18} />;
      case "04": return <Cpu size={18} />;
      default: return null;
    }
  };

  return (
    <section
      id="process"
      className="py-24 sm:py-32 md:py-40 px-6 md:px-20 border-t border-white/5 bg-black"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Header Block */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-geist text-sm uppercase tracking-[0.2em] text-zinc-500 mb-4 font-medium">
              The Process
            </h2>
            <h3 className="font-geist text-2xl sm:text-4xl text-white font-medium mb-6">
              A systematic approach to creating digital excellence, from initial spark to final deployment.
            </h3>
            <p className="font-sans text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed">
              We operate under an iterative, architecture-first model. Every system phase has verified checkpoints designed for maximum transparency and zero waste.
            </p>
          </motion.div>
        </div>

        {/* Process Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const isSelected = selectedStep === index;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                onClick={() => setSelectedStep(isSelected ? null : index)}
                className={`group p-8 border hover:border-white/20 transition-all duration-500 cursor-pointer rounded-lg relative overflow-hidden flex flex-col justify-between ${
                  isSelected 
                    ? "bg-white/[0.04] border-white/30 shadow-[0_0_30px_rgba(255,255,255,0.03)]" 
                    : "border-white/5 bg-neutral-950/40"
                }`}
              >
                <div>
                  {/* Decorative faint grid lines in background */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none rotate-45 transform" />

                  <div className="flex justify-between items-center mb-6">
                    <span className="font-geist text-3xl sm:text-4xl text-zinc-700 group-hover:text-white transition-colors duration-500 font-light">
                      {step.number}
                    </span>
                    <div className="text-zinc-500 group-hover:text-white transition-colors duration-300">
                      {getIcon(step.number)}
                    </div>
                  </div>

                  <h3 className="font-geist text-sm uppercase tracking-[0.14em] text-white font-semibold mb-4">
                    {step.title}
                  </h3>
                  
                  <p className="font-sans text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                {/* Sub-Checklist revealed click/hover */}
                <div className="mt-4">
                  <span className="font-geist text-[10px] text-zinc-500 group-hover:text-zinc-300 uppercase tracking-widest flex items-center gap-1.5 transition-colors">
                    {isSelected ? "TAP TO COLLAPSE" : "TAP TO EXPLORE STEPS"}
                  </span>
                  
                  <motion.div
                    initial={false}
                    animate={{ height: isSelected ? "auto" : 0, opacity: isSelected ? 1 : 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <ul className="pt-4 space-y-2 border-t border-white/10 mt-3">
                      {step.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-[11px] text-zinc-400 font-sans">
                          <Check size={10} className="text-white shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
