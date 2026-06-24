import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Calendar, Briefcase, Code, Compass, ArrowRight, CornerDownRight } from "lucide-react";
import { Project } from "../types";

// Load all images in assets/image so we can reference them by string
const imageModules = import.meta.glob<{ default: string }>("../../assets/image/*", { eager: true });

function getImageUrl(path: string) {
  const key = `../../${path}`;
  return imageModules[key]?.default || path;
}

export default function SelectedWorks() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: "aether",
      title: "Gourmand Team",
      subtitle: "Entrepreneurship",
      year: "2024",
      category: "Management",
      image: "assets/image/team.jpeg",
      description: "Pernah menjadi Leader dari tim Gourmand, menjual minuman segar sehat menggunakan bunga telang dengan inovasi rasa dan kemasan yang premium dan terjangkau.Dengan omset lebih dari modal setiap sekali jualan",
      role: "Leader",
      tech: [],
      challenge: "",
      solution: "",
    },
    {
      id: "Membuat Web Photobooth",
      title: "Web Photobooth",
      subtitle: "Web Development",
      year: "2024",
      category: "Web",
      image: "assets/image/project2.png",
      description: "Web Photobooth adalah sebuah website yang berfungsi untuk mengambil foto dan mencetak foto dengan menggunakan kamera web. Web Photobooth ini digunakan untuk acara wisuda dan juga digunakan untuk acara-acara lain.",
      role: "Core UI/UX Director",
      tech: [],
      challenge: "",
      solution: "",
    },
    {
      id: "project3",
      title: "Web Fakta Kucing",
      subtitle: "Pembuatan Website",
      year: "2025",
      category: "Web",
      image: "assets/image/project3.png",
      description: "Web Fakta Kucing adalah sebuah website yang berfungsi untuk menampilkan fakta-fakta menarik tentang kucing. Web Fakta Kucing ini digunakan untuk acara-acara seperti pameran hewan dan juga digunakan untuk acara-acara lain.",
      role: "Design Architect",
      tech: [],
      challenge: "",
      solution: "",
    },
    {
      id: "chronos",
      title: "Web Produk Kerajinan UMKM",
      subtitle: "Pembuatan Website",
      year: "2025",
      category: "Web",
      image: "assets/image/project4.png",
      description: "Web Produk Kerajinan UMKM adalah sebuah website yang berfungsi untuk menampilkan produk-produk kerajinan UMKM. Web Produk Kerajinan UMKM ini digunakan untuk menampilkan produk dari daerah daerah yang memanfaatkan bahan baku dari alam.",
      role: "Mobile App Designer",
      tech: [],
      challenge: "",
      solution: "",
    },

  ];

  return (
    <section id="works" className="py-24 sm:py-32 md:py-40 px-6 md:px-20 bg-neutral-950">
      <div className="max-w-7xl mx-auto">

        {/* Header Title */}
        <div className="mb-20 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-geist text-3xl sm:text-5xl md:text-6xl text-white font-medium tracking-tight"
          >
            Selected Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-geist text-[10px] text-zinc-500 mt-4 uppercase tracking-[0.25em]"
          >
            Volume 01-06 // TAP FOR PORTFOLIO DETAIL CASE STUDY
          </motion.p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setActiveProject(project)}
              className="group cursor-pointer relative aspect-[3/4] overflow-hidden rounded-lg border border-white/5 bg-neutral-900"
            >
              {/* Blur Layer that transitions from heavy blur to 0px on hover */}
              <div className="absolute inset-0 z-10 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] backdrop-blur-[15px] group-hover:backdrop-blur-none bg-black/50 group-hover:bg-black/10" />

              {/* Project Image */}
              <img
                className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                src={getImageUrl(project.image)}
                alt={project.title}
                referrerPolicy="no-referrer"
              />

              {/* Title Slide-in on Hover */}
              <div className="absolute inset-x-8 bottom-8 z-20 flex flex-col justify-end">
                <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
                  <h3 className="font-geist text-xl sm:text-2xl text-white font-medium tracking-tight">
                    {project.title}
                  </h3>
                  <div className="flex justify-between items-center mt-2 border-t border-white/10 pt-2">
                    <p className="font-geist text-[10px] text-zinc-400 uppercase tracking-widest">
                      {project.subtitle} · {project.year}
                    </p>
                    <ArrowRight size={12} className="text-white transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>

              {/* Hint indicator in upper right corner */}
              <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[9px] bg-white text-black font-semibold tracking-wider uppercase px-2 py-1 rounded">
                  CASE
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Case Study Drawer Modal */}
      <AnimatePresence>
        {activeProject && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-[20px] flex items-center justify-center p-4">
            {/* Modal Overlay clicking backdrop closes */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
              onClick={() => setActiveProject(null)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl bg-neutral-950 border border-white/10 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] z-10 max-h-[90vh] flex flex-col lg:flex-row"
            >
              {/* Left Side: Immersive Image and Category Capsule */}
              <div className="lg:w-1/2 relative aspect-video lg:aspect-auto min-h-[250px] lg:min-h-full">
                <img
                  src={getImageUrl(activeProject.image)}
                  alt={activeProject.title}
                  className="absolute inset-0 w-full h-full object-cover grayscale opacity-60"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-neutral-950 via-transparent to-transparent" />

                <div className="absolute top-6 left-6 z-20 flex gap-2">
                  <span className="bg-black/60 backdrop-blur-md text-white border border-white/10 text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-full font-semibold">
                    {activeProject.category}
                  </span>
                </div>
              </div>

              {/* Right Side: Case Study Information */}
              <div className="lg:w-1/2 p-6 sm:p-10 overflow-y-auto">
                <button
                  onClick={() => setActiveProject(null)}
                  className="absolute top-6 right-6 p-2 rounded-full border border-white/10 hover:border-white/30 hover:bg-white/5 text-white transition-all transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>

                <div className="mb-8">
                  <h3 className="font-geist text-2xl sm:text-3xl text-white font-medium tracking-tight">
                    {activeProject.title}
                  </h3>
                  <p className="font-geist text-xs text-zinc-500 uppercase tracking-widest mt-1">
                    {activeProject.subtitle}
                  </p>
                </div>

                <div className="space-y-6 text-sm">
                  <p className="font-sans text-base text-zinc-300 leading-relaxed font-light">
                    {activeProject.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 flex justify-end">
                  <button
                    onClick={() => setActiveProject(null)}
                    className="bg-white text-black px-5 py-2.5 rounded text-xs font-semibold uppercase tracking-wider hover:bg-zinc-200 transition-colors"
                  >
                    Close Study
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
