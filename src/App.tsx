import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Calendar, User, Mail, Sparkles, Inbox, Trash2, Heart } from "lucide-react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Profile from "./components/Profile";
import Process from "./components/Process";
import SelectedWorks from "./components/SelectedWorks";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { ContactMessage } from "./types";

export default function App() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [storyOpen, setStoryOpen] = useState(false);
  const [inboxOpen, setInboxOpen] = useState(false);

  // Tab-based routing state: 'home' | 'profile' | 'process' | 'works' | 'contact'
  const [activeView, setActiveView] = useState<string>("home");

  // Mouse Coordinates for empty-space tracking spotlight
  const [mousePos, setMousePos] = useState({ x: -2000, y: -2000 });

  // Load messages from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("studio_void_messages");
      if (saved) {
        setMessages(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Local storage loading error", e);
    }
  }, []);

  // Track global mousemove to render the empty-space cursor glow
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleNewMessage = (newMsg: ContactMessage) => {
    const updated = [newMsg, ...messages];
    setMessages(updated);
    try {
      localStorage.setItem("studio_void_messages", JSON.stringify(updated));
    } catch (e) {
      console.error("Local storage saving error", e);
    }
  };

  const handleDeleteMessage = (id: string) => {
    const filtered = messages.filter((m) => m.id !== id);
    setMessages(filtered);
    try {
      localStorage.setItem("studio_void_messages", JSON.stringify(filtered));
    } catch (e) {
      console.error("Local storage updating error", e);
    }
  };

  const handleClearAllMessages = () => {
    if (window.confirm("Apakah Anda yakin ingin menghapus semua pesan masuk di prototipe ini?")) {
      setMessages([]);
      localStorage.removeItem("studio_void_messages");
    }
  };

  // Render correct component based on activeView
  const renderActiveComponent = () => {
    switch (activeView) {
      case "home":
        return <Hero onOpenStory={() => setStoryOpen(true)} onNavigate={setActiveView} />;
      case "profile":
        return <Profile />;
      case "process":
        return <Process />;
      case "works":
        return <SelectedWorks />;
      case "contact":
        return <Contact onNewMessage={handleNewMessage} />;
      default:
        return <Hero onOpenStory={() => setStoryOpen(true)} onNavigate={setActiveView} />;
    }
  };

  return (
    <div className="bg-black text-zinc-100 min-h-screen selection:bg-white selection:text-black font-sans relative antialiased overflow-x-hidden flex flex-col justify-between">

      {/* Background ambient static glow (slow-floating atmospheric texture) */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-white/[0.012] rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-zinc-800/[0.02] rounded-full blur-[150px]" />
      </div>

      {/* --- CURSOR CO-SPOTLIGHT GLOW (Renders only on empty spaces) --- */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300 ease-out hidden sm:block"
        style={{
          background: `radial-gradient(550px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.045), transparent 100%)`,
        }}
      />

      <div className="relative z-10 flex-grow flex flex-col pt-[88px]">
        {/* Navigation Bar */}
        <Navbar
          activeView={activeView}
          onChangeView={setActiveView}
          onOpenStory={() => setStoryOpen(true)}
          onOpenInbox={() => setInboxOpen(true)}
          inboxCount={messages.length}
        />

        {/* Tab content wrapper with smooth motion transition */}
        <main className="flex-grow flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full"
            >
              {renderActiveComponent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Footer is consistently placed at bottom of page layout */}
      <div className="relative z-10 w-full">
        <Footer onNavigate={setActiveView} />
      </div>

      {/* --- OUR STORY OVERLAY MODAL --- */}
      <AnimatePresence>
        {storyOpen && (
          <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-[20px] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
              onClick={() => setStoryOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 35 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 35 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl bg-neutral-950 border border-white/10 rounded-xl p-8 sm:p-12 shadow-[0_0_50px_rgba(255,255,255,0.02)] z-10 max-h-[85vh] overflow-y-auto"
            >
              <button
                onClick={() => setStoryOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full border border-white/10 hover:border-white/30 hover:bg-white/5 text-white transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>

              <div className="mb-8">
                <span className="font-geist text-[10px] uppercase tracking-[0.25em] text-zinc-500 block mb-2 font-medium">
                  GENESIS & INTENT
                </span>
                <h3 className="font-geist text-3xl text-white font-medium tracking-tight">
                  My Story
                </h3>
              </div>

              <div className="space-y-6 text-zinc-400 font-sans text-sm sm:text-base leading-relaxed">
                <p>
                  Halo! Saya <strong className="text-white font-medium">Nabila Azari Lubis</strong>, atau biasa dipanggil Allea. Saya adalah seorang Junior Engineer yang bersemangat dalam dunia pengembangan web dan teknologi.
                </p>

                <p>
                  Perjalanan saya dimulai dari ketertarikan untuk menciptakan hal-hal yang tidak hanya fungsional, tetapi juga memberikan pengalaman yang baik bagi penggunanya. Melalui <strong className="text-white font-medium">ALLEA WEB</strong>, saya menuangkan ide-ide kreatif ke dalam bentuk kode dan desain antarmuka yang rapi serta sederhana.
                </p>

                <p>
                  Sebagai seorang Junior Engineer, saya terus belajar dan bereksperimen dengan berbagai proyek. Beberapa di antaranya adalah membangun website interaktif seperti <em>Web Photobooth</em>, merancang portal informasi ringan lewat <em>Web Fakta Kucing</em>, hingga membuat solusi digital untuk produk lokal melalui <em>Web Produk Kerajinan UMKM</em>.
                </p>

                <p>
                  Selain pengembangan web, saya juga memiliki pengalaman memimpin <em>Gourmand Team</em> dalam mengelola bisnis minuman sehat berbahan dasar bunga telang. Pengalaman entrepreneurship ini mengajarkan saya pentingnya komunikasi tim dan pemahaman terhadap kebutuhan nyata dari klien saat membangun sebuah produk. Di sini, saya tidak sekadar menulis kode, tapi saya belajar membangun solusi.
                </p>

                <div className="pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-1 text-zinc-500">
                    <span>Est. 2026 by Allea</span>
                    <Heart size={14} className="text-neutral-500 fill-zinc-500 animate-pulse" />
                  </div>
                  <span className="font-geist text-[10px] text-white uppercase tracking-wider font-semibold bg-white/5 border border-white/10 px-3 py-1.5 rounded">
                    Nabila Azari Lubis, Junior Engineer
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- PROTO-INBOX GLASS DRAWER --- */}
      <AnimatePresence>
        {inboxOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-[10px] flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
              onClick={() => setInboxOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-md bg-neutral-950 border-l border-white/10 p-6 sm:p-8 flex flex-col justify-between z-10 h-full shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            >
              <div className="overflow-y-auto pr-1">
                {/* Header info */}
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-white/5 border border-white/10 rounded-lg text-white">
                      <Inbox size={18} />
                    </div>
                    <div>
                      <h3 className="font-geist text-lg text-white font-medium tracking-tight">
                        Prototype Inbox
                      </h3>
                      <p className="font-sans text-[10px] text-zinc-500 uppercase tracking-widest font-light">
                        {messages.length} pesan didalam memori lokal
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setInboxOpen(false)}
                    className="p-1.5 rounded-full border border-white/10 hover:border-white/30 hover:bg-white/5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Submissions Loop */}
                {messages.length === 0 ? (
                  <div className="py-20 text-center flex flex-col items-center justify-center gap-4">
                    <p className="font-geist text-sm text-zinc-600 italic">
                      Belum ada pesan yang masuk.
                    </p>
                    <p className="font-sans text-xs text-zinc-500 leading-relaxed max-w-xs">
                      Kirim pesan melalui formulir kontak di tab **Contact** untuk melihat respons pengiriman dinamis secara instan.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((m) => (
                      <div
                        key={m.id}
                        className="p-5 border border-white/10 bg-white/[0.01] hover:bg-white/[0.03] transition-colors rounded-lg flex flex-col justify-between gap-4 relative group"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-1.5 font-geist text-xs text-white uppercase tracking-wider font-semibold">
                              <User size={12} className="text-zinc-500" />
                              <span className="truncate max-w-[150px]">{m.name}</span>
                            </div>
                            <span className="text-[9px] text-zinc-500 font-mono tracking-widest">
                              {m.timestamp}
                            </span>
                          </div>

                          <div className="flex items-center gap-1 text-[11px] text-zinc-400 font-sans mt-1.5 shrink-0 break-all">
                            <Mail size={10} className="text-zinc-600 flex-shrink-0" />
                            <span>{m.email}</span>
                          </div>

                          <p className="font-sans text-xs text-zinc-300 font-light mt-4 leading-relaxed whitespace-pre-wrap break-words">
                            {m.message}
                          </p>
                        </div>

                        {/* Delete action button */}
                        <div className="flex justify-end pt-2 border-t border-white/5 mt-2">
                          <button
                            onClick={() => handleDeleteMessage(m.id)}
                            className="text-zinc-600 hover:text-red-400 p-1.5 hover:bg-white/5 rounded transition-all flex items-center justify-center cursor-pointer"
                            title="Hapus pesan"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Drawer footer actions */}
              {messages.length > 0 && (
                <div className="pt-4 border-t border-white/5 mt-6 flex justify-between items-center gap-4">
                  <button
                    onClick={handleClearAllMessages}
                    className="font-geist text-[10px] text-zinc-500 hover:text-red-400 uppercase tracking-widest flex items-center gap-1 cursor-pointer"
                  >
                    Hapus Memori
                  </button>
                  <button
                    onClick={() => setInboxOpen(false)}
                    className="bg-white text-black text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded hover:bg-zinc-200 transition-colors cursor-pointer"
                  >
                    Tutup
                  </button>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
