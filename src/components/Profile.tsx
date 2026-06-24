import React, { useState } from "react";
import { motion } from "motion/react";
import { Sparkles, Instagram, Facebook, Video, MessageCircle } from "lucide-react";
import profileImg from "../../assets/image/foto2.jpeg";

export default function Profile() {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const tagDetails: Record<string, { title: string; desc: string; icon: any }> = {
    "CREATIVE DIRECTION": {
      title: "Kreativitas & Konsep",
      desc: "Mendesain narasi visual berestetika tinggi yang memberikan karakter kuat dan tak terlupakan bagi setiap karya digital.",
      icon: Sparkles,
    },
    "WRITING & DIGITAL ART": {
      title: "Penulisan & Sajak",
      desc: "Mengekspresikan dinamika kehidupan dan emosi melalui rangkaian bait-bait puitis dan sajak kontemporer yang mendalam.",
      icon: MessageCircle,
    },
  };

  const tags = ["CREATIVE DIRECTION", "WRITING & DIGITAL ART"] as const;

  return (
    <section
      id="profile"
      className="py-12 sm:py-20 md:py-24 px-6 md:px-20 bg-neutral-950 border-t border-white/5 relative overflow-hidden flex flex-col justify-center min-h-[calc(100vh-88px)]"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center w-full">

        {/* Left Side: Portrait Image with premium hover blur fade */}
        <div className="lg:col-span-5 flex justify-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-sm aspect-[4/5] glass relative group overflow-hidden rounded-lg self-center shadow-[0_0_40px_rgba(255,255,255,0.02)]"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-70" />

            {/* Visual scanlines architectural pattern overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] pointer-events-none z-10 opacity-20" />

            {/* Portrait Image */}
            <img
              className="w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] scale-[1.02] group-hover:scale-105 filter grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-90"
              src={profileImg}
              alt="Nabila Azari Lubis Profile Portrait"
              referrerPolicy="no-referrer"
            />

            <div className="absolute inset-0 border border-white/10 group-hover:border-white/30 transition-colors duration-500 rounded-lg pointer-events-none" />

            {/* Minimal label overlay on image */}
            <div className="absolute bottom-6 left-6 z-20 pointer-events-none">
              <p className="font-geist text-[9px] text-zinc-500 uppercase tracking-widest font-light">
                JUNIOR ENGINEER & CREATIVE WRITER
              </p>
              <h4 className="font-geist text-sm text-white uppercase tracking-wider font-semibold mt-1">
                Nabila Azari Lubis
              </h4>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Profile Text Content / Sajak / Social buttons */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="font-geist text-xs uppercase tracking-[0.2em] text-zinc-500 mb-2 font-medium">
              Profile
            </h2>
            <h1 className="font-geist text-3xl sm:text-4xl lg:text-5xl text-white font-bold tracking-tight mb-6">
              Nabila Azari Lubis
            </h1>

            {/* SAJAK / POETRY (Indonesian poetic sajak block) */}
            <div className="border-l-2 border-white/20 pl-6 my-8 py-2 relative">
              <span className="absolute top-0 left-2 text-white/5 font-serif text-8xl -translate-y-12 select-none">“</span>
              <p className="font-serif text-base sm:text-lg italic text-zinc-300 leading-relaxed max-w-2xl">
                Dalam sunyi, kuukir kata yang menari,<br />
                Mencari harmoni di sela hiruk-pikuk maya.<br />
                Bukan sekadar aksara, tapi bait batin yang berbunyi,<br />
                Di bawah naungan langit yang membiru raya.
              </p>
              <p className="font-serif text-base sm:text-lg italic text-zinc-300 leading-relaxed max-w-2xl mt-4">
                Aku adalah rintik yang tenang dalam redam,<br />
                Melodi sederhana di dunia yang bising.<br />
                Merajut angan dalam ketenangan malam,<br />
                Menemukan teduh di balik sudut yang benderang.
              </p>
              <span className="font-geist text-[10px] text-zinc-500 uppercase tracking-widest block mt-4 font-light">
                — Sajak oleh Allea
              </span>
            </div>

            <div className="space-y-4 text-zinc-400 font-sans text-xs sm:text-sm leading-relaxed mb-8">
              <p>
                Menjembatani keindahan kata dengan arsitektur digital. Melalui media modern,
                setiap tata letak, warna, dan tulisan dirancang untuk memberikan ruang berpikir yang tenang bagi penggunanya.
              </p>
            </div>

            {/* Social Media Pill Buttons (Instagram, Facebook, Tiktok) */}
            <div className="mb-8 p-5 border border-white/10 bg-white/[0.01] rounded-lg">
              <p className="font-geist text-[10px] text-zinc-500 uppercase tracking-widest mb-3 font-medium">
                Connect on Social Media:
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href=" https://www.instagram.com/azalea_lbs?igsh=MXd6OWppZTNxY2g5eg%3D%3D&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gradient-to-r from-pink-500/10 to-orange-500/10 hover:from-pink-500/20 hover:to-orange-500/20 border border-white/10 hover:border-pink-500/40 text-xs text-white rounded-full font-geist uppercase tracking-widest flex items-center gap-2 transition-all duration-300 active:scale-95 cursor-pointer"
                >
                  <Instagram size={13} className="text-pink-500" />
                  <span>Instagram</span>
                </a>

                <a
                  href="https://www.facebook.com/share/1Dy8CMx7Bm/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 border border-white/10 hover:border-blue-500/40 text-xs text-white rounded-full font-geist uppercase tracking-widest flex items-center gap-2 transition-all duration-300 active:scale-95 cursor-pointer"
                >
                  <Facebook size={13} className="text-blue-500" />
                  <span>Facebook</span>
                </a>

                <a
                  href="https://www.tiktok.com/@biaazari_?_r=1&_t=ZS-97QRsyusyyv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-zinc-800/20 hover:bg-zinc-800/40 border border-white/10 hover:border-teal-500/40 text-xs text-white rounded-full font-geist uppercase tracking-widest flex items-center gap-2 transition-all duration-300 active:scale-95 cursor-pointer"
                >
                  <Video size={13} className="text-teal-400" />
                  <span>TikTok</span>
                </a>
              </div>
            </div>

            {/* Interactive tag list with dynamic details display */}
            <div>
              <p className="font-geist text-[10px] text-zinc-500 uppercase tracking-widest mb-3">
                Eksplorasi Keahlian:
              </p>
              <div className="flex flex-wrap gap-2.5 mb-4">
                {tags.map((tag) => {
                  const isActive = activeTag === tag;
                  return (
                    <button
                      key={tag}
                      onClick={() => setActiveTag(isActive ? null : tag)}
                      className={`px-3 py-1.5 border rounded-full font-geist text-[10px] uppercase tracking-wider font-medium transition-all duration-300 cursor-pointer ${isActive
                        ? "bg-white text-black border-white"
                        : "text-zinc-400 border-white/10 hover:border-white/30 hover:text-white"
                        }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Tag Details block */}
              <div className="min-h-[70px]">
                {activeTag && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 border border-white/10 bg-white/[0.02] rounded-lg"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-1.5 rounded bg-white/5 border border-white/10 text-white mt-0.5">
                        {(() => {
                          const IconComponent = tagDetails[activeTag].icon;
                          return <IconComponent size={12} />;
                        })()}
                      </div>
                      <div>
                        <h4 className="font-geist text-[10px] uppercase tracking-wider text-white font-medium mb-1">
                          {tagDetails[activeTag].title}
                        </h4>
                        <p className="font-sans text-xs text-zinc-400 leading-relaxed">
                          {tagDetails[activeTag].desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

          </motion.div>
        </div>

      </div>
    </section>
  );
}
