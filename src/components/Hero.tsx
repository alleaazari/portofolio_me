import React, { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";
import profileImg from "../../assets/image/allea4.jpeg";

interface HeroProps {
  onOpenStory: () => void;
  onNavigate: (view: string) => void;
}

export default function Hero({ onOpenStory, onNavigate }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }> = [];

    // Create particles
    for (let i = 0; i < 45; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.15,
        speedY: (Math.random() - 0.5) * 0.15,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    let mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Subtle atmospheric circular radial glow
      const glowGrad = ctx.createRadialGradient(
        width * 0.75,
        height * 0.35,
        50,
        width * 0.75,
        height * 0.35,
        width * 0.5
      );
      glowGrad.addColorStop(0, "rgba(255, 255, 255, 0.04)");
      glowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, width, height);

      // Draw subtle grids
      ctx.strokeStyle = "rgba(255, 255, 255, 0.015)";
      ctx.lineWidth = 1;
      const gridSize = 80;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Render and update particles
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Interaction with mouse
        let currentOpacity = p.opacity;
        if (mouse.x !== -1000 && mouse.y !== -1000) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            currentOpacity = Math.max(p.opacity, (1 - dist / 180) * 0.85);
            // Hover repelling force
            p.x -= (dx / dist) * 0.6;
            p.y -= (dy / dist) * 0.6;
          }
        }

        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleScrollDown = () => {
    onNavigate("profile");
  };

  const handleScrollToWorks = () => {
    onNavigate("works");
  };

  return (
    <section
      id="home"
      className="relative min-h-[calc(100vh-88px)] flex flex-col justify-center px-6 md:px-20 overflow-hidden"
    >
      {/* Interactive Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-auto z-0"
      />

      {/* Main Content Area */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 select-none pt-12 md:pt-0">
        
        {/* Left Side: Text */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-geist text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-medium tracking-tight mb-8 leading-[1.05]">
              Architecting <span className="text-zinc-500 font-light">digital</span> <br className="hidden sm:block" />
              pages through <br className="hidden sm:block" />
              creative words.
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl mb-12 leading-relaxed"
          >
            Portofolio Pribadi dan Ruang Karya Kreatif Nabila Azari Lubis. Menghadirkan ketenangan dalam estetika digital.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-4"
          >
            <button
              onClick={handleScrollToWorks}
              className="w-full sm:w-auto bg-white text-black hover:bg-zinc-200 transition-all active:scale-95 px-8 py-4 font-geist text-xs uppercase tracking-[0.2em] font-medium hover:shadow-[0_0_25px_rgba(255,255,255,0.25)] cursor-pointer"
            >
              Lihat Karya
            </button>

            <button
              onClick={() => onNavigate("profile")}
              className="w-full sm:w-auto bg-transparent border border-white/20 text-white hover:bg-white/5 transition-all active:scale-95 px-8 py-4 font-geist text-xs uppercase tracking-[0.2em] font-medium cursor-pointer"
            >
              Tentang Saya
            </button>
          </motion.div>
        </div>

        {/* Right Side: Image */}
        <div className="hidden lg:flex lg:col-span-5 justify-end items-start -mt-16">
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="w-full max-w-[280px] aspect-square relative group rounded-full border border-white/20 p-2 shadow-[0_0_40px_rgba(255,255,255,0.05)]"
          >
            <div className="w-full h-full relative overflow-hidden rounded-full">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-40" />
              
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] pointer-events-none z-10 opacity-20" />
              
              <img
                className="w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] scale-[1.02] group-hover:scale-105 filter grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100"
                src={profileImg}
                alt="Nabila Azari Lubis"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating coordinates indicator (Architectural Aesthetic element) */}
      <div className="absolute bottom-10 right-6 md:right-20 hidden md:block text-[10px] text-zinc-600 font-mono tracking-widest uppercase">
        <span>LOC: 0.0000° N, 0.0000° E // ALLEA_WEB_ACTIVE</span>
      </div>

      {/* Down Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.2, 0.8, 0.2], y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 cursor-pointer flex flex-col items-center gap-1 z-10"
        onClick={handleScrollDown}
      >
        <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-geist font-light">
          Eksplor
        </span>
        <ArrowDown size={14} className="text-zinc-500" />
      </motion.div>
    </section>
  );
}
