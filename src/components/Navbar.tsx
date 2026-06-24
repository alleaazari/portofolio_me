import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight, Inbox } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  onOpenStory: () => void;
  onOpenInbox: () => void;
  inboxCount: number;
  activeView: string;
  onChangeView: (view: string) => void;
}

export default function Navbar({
  onOpenStory,
  onOpenInbox,
  inboxCount,
  activeView,
  onChangeView,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleItemClick = (id: string) => {
    setMobileMenuOpen(false);
    onChangeView(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const menuItems = [
    { label: "Home", id: "home" },
    { label: "Profile", id: "profile" },
    { label: "Process", id: "process" },
    { label: "Projects", id: "works" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 border-b ${scrolled
          ? "h-[72px] bg-black/85 backdrop-blur-[30px] border-white/10"
          : "h-[88px] bg-transparent border-transparent"
          } flex justify-between items-center px-6 md:px-20`}
      >
        <div
          onClick={() => handleItemClick("home")}
          className="font-geist text-xl md:text-2xl font-bold text-white tracking-widest cursor-pointer hover:opacity-80 transition-opacity uppercase"
        >
          ALLEA WEB
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`font-geist text-xs uppercase tracking-widest transition-all duration-300 relative py-2 cursor-pointer ${activeView === item.id
                ? "text-white"
                : "text-zinc-400 hover:text-white"
                }`}
            >
              {item.label}
              {activeView === item.id && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-white"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}

          <button
            onClick={onOpenStory}
            className="font-geist text-xs text-zinc-400 hover:text-white uppercase tracking-widest py-2 transition-colors cursor-pointer"
          >
            My Story
          </button>

          {inboxCount > 0 && (
            <button
              onClick={onOpenInbox}
              className="relative p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all duration-300 flex items-center justify-center gap-1.5"
              title="View mockup inbox"
            >
              <Inbox size={14} />
              <span className="text-[10px] bg-white text-black px-1.5 py-0.5 rounded-full font-bold">
                {inboxCount}
              </span>
            </button>
          )}

          <button
            onClick={() => handleItemClick("contact")}
            className="bg-white text-black px-6 py-2.5 rounded-full font-geist text-xs font-medium tracking-wider hover:bg-neutral-200 transition-all active:scale-95 flex items-center gap-1"
          >
            Hire Me <ArrowUpRight size={14} />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-4 md:hidden">
          {inboxCount > 0 && (
            <button
              onClick={onOpenInbox}
              className="relative p-2 rounded-full border border-white/10 bg-white/5 text-white flex items-center justify-center"
            >
              <Inbox size={14} />
              <span className="absolute -top-1 -right-1 text-[8px] bg-white text-black w-4 h-4 rounded-full font-bold flex items-center justify-center">
                {inboxCount}
              </span>
            </button>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white hover:text-zinc-300 transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 pt-[88px] pb-10 px-6 bg-black/95 backdrop-blur-[20px] border-b border-white/10 flex flex-col justify-between md:hidden"
          >
            <div className="flex flex-col gap-6 mt-8">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`text-left font-geist text-lg tracking-wider uppercase ${activeView === item.id ? "text-white font-bold" : "text-zinc-400"
                    }`}
                >
                  {item.label}
                </button>
              ))}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenStory();
                }}
                className="text-left font-geist text-lg tracking-wider uppercase text-zinc-400"
              >
                My Story
              </button>

              {inboxCount > 0 && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenInbox();
                  }}
                  className="text-left font-geist text-lg tracking-wider uppercase text-zinc-400 flex items-center gap-2"
                >
                  Inbox <span className="bg-white text-black px-2 py-0.5 rounded text-xs font-bold">{inboxCount}</span>
                </button>
              )}
            </div>

            <button
              onClick={() => handleItemClick("contact")}
              className="w-full bg-white text-black text-center py-4 rounded-lg font-geist font-medium hover:bg-neutral-200 transition-colors"
            >
              Hire Me
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
