import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, CheckCircle, Mail, AlertTriangle } from "lucide-react";
import { ContactMessage } from "../types";

interface ContactProps {
  onNewMessage: (msg: ContactMessage) => void;
}

export default function Contact({ onNewMessage }: ContactProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please specify your name.");
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please specify a valid email address.");
      return;
    }
    if (!message.trim() || message.length < 10) {
      setError("Please input a message (at least 10 characters).");
      return;
    }

    setLoading(true);

    // Menggunakan FormSubmit API untuk mengirim email secara otomatis di background
    fetch("https://formsubmit.co/ajax/alleaazarilubis@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        _subject: "Pesan Baru dari Portofolio - " + name.trim(),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const newMsg: ContactMessage = {
          id: Math.random().toString(36).substr(2, 9),
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          timestamp: new Date().toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
        };

        onNewMessage(newMsg);
        setLoading(false);
        setSuccess(true);
        setName("");
        setEmail("");
        setMessage("");

        // Auto clear success notice
        setTimeout(() => setSuccess(false), 8000);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        setError("Gagal mengirim pesan. Silakan coba lagi nanti.");
      });
  };

  return (
    <section id="contact" className="py-24 sm:py-32 md:py-40 px-6 md:px-20 border-t border-white/5 bg-black">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-geist text-3xl sm:text-5xl md:text-6xl text-white font-medium mb-6">
            Let's build the future.
          </h2>
          <p className="font-sans text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Currently accepting new projects for Q3 2024. Reach out to discuss your vision, digital blueprints, or brand direction.
          </p>
        </motion.div>
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        <form onSubmit={handleSubmit} className="space-y-8 text-left">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Name Input */}
            <div className="relative group">
              <label className="font-geist text-[10px] uppercase tracking-widest text-zinc-500 mb-2 block font-medium group-focus-within:text-white transition-colors">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="YOUR NAME"
                autoComplete="off"
                disabled={loading}
                className="w-full bg-transparent border-b border-white/20 py-4 text-white text-sm font-sans placeholder-zinc-700 focus:border-white focus:outline-none transition-all duration-300 disabled:opacity-50"
              />
            </div>

            {/* Email Input */}
            <div className="relative group">
              <label className="font-geist text-[10px] uppercase tracking-widest text-zinc-500 mb-2 block font-medium group-focus-within:text-white transition-colors">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="HELLO@EXAMPLE.COM"
                autoComplete="off"
                disabled={loading}
                className="w-full bg-transparent border-b border-white/20 py-4 text-white text-sm font-sans placeholder-zinc-700 focus:border-white focus:outline-none transition-all duration-300 disabled:opacity-50"
              />
            </div>
          </div>

          {/* Message Area */}
          <div className="relative group">
            <label className="font-geist text-[10px] uppercase tracking-widest text-zinc-500 mb-2 block font-medium group-focus-within:text-white transition-colors">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us about your project, target channels, or constraints"
              rows={4}
              disabled={loading}
              className="w-full bg-transparent border-b border-white/20 py-4 text-white text-sm font-sans placeholder-zinc-700 focus:border-white focus:outline-none transition-all duration-300 resize-none disabled:opacity-50"
            />
          </div>

          {/* Interactive validation error display */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-2 p-4 border border-red-900/30 bg-red-950/20 text-red-400 text-xs rounded-lg"
              >
                <AlertTriangle size={14} className="shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form Action elements */}
          <div className="pt-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6">
            <button
              type="submit"
              disabled={loading}
              className="relative w-full md:w-auto bg-white hover:bg-neutral-200 text-black px-12 py-5 font-geist text-xs uppercase tracking-[0.2em] font-medium hover:shadow-[0_0_30px_rgba(255,255,255,0.35)] transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>TRANSMITTING...</span>
                </>
              ) : (
                <>
                  <Send size={12} />
                  <span>Send Message</span>
                </>
              )}
            </button>

            <div className="text-zinc-500 font-geist text-[10px] uppercase tracking-widest text-center md:text-right flex items-center justify-center md:justify-end gap-1.5 font-light">
              <span>Or email directly:</span>
              <a
                href="mailto:alleaazarilubis@gmail.com"
                className="text-white border-b border-white/30 hover:border-white transition-colors"
              >
                alleaazarilubis@gmail.com
              </a>
            </div>
          </div>
        </form>

        {/* Floating Success Indicator Card */}
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="mt-8 p-6 glass rounded-lg border-emerald-500/30 bg-emerald-950/10 flex items-start gap-4"
            >
              <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg">
                <CheckCircle size={18} />
              </div>
              <div>
                <h4 className="font-geist text-xs font-semibold text-white uppercase tracking-wider mb-1">
                  Message Transmitted Successfully
                </h4>
                <p className="font-sans text-xs text-zinc-400 leading-relaxed">
                  Thank you. Your project blueprint has been registered in our prototype memory. You can view it by tapping the **Inbox** icon in the header.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
