import React from "react";
import { motion } from "motion/react";
import { Heart } from "lucide-react";

interface FooterProps {
  onNavigate: (view: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const socialLinks = [
    { label: "Instagram", href: " https://www.instagram.com/azalea_lbs?igsh=MXd6OWppZTNxY2g5eg%3D%3D&utm_source=qr", action: "link" },
    { label: "Facebook", href: "https://www.facebook.com/share/1Dy8CMx7Bm/?mibextid=wwXIfr", action: "link" },
    { label: "TikTok", href: "https://www.tiktok.com/@biaazari_?_r=1&_t=ZS-97QRsyusyyv", action: "link" },
    { label: "Contact", href: "#", action: "contact" },
  ];

  const handleSocialClick = (e: React.MouseEvent, item: any) => {
    e.preventDefault();
    if (item.action === "contact") {
      onNavigate("contact");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.open(item.href, "_blank", "noopener,noreferrer");
    }
  };

  const handleScrollTop = () => {
    onNavigate("home");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="w-full py-16 md:py-24 border-t border-white/5 bg-neutral-950 font-sans">
      <div className="flex flex-col md:flex-row justify-between items-center px-6 md:px-20 max-w-7xl mx-auto gap-8">

        {/* Brand Name */}
        <div
          onClick={handleScrollTop}
          className="font-geist text-lg md:text-xl font-bold text-white tracking-widest cursor-pointer hover:opacity-80 transition-opacity uppercase"
        >
          ALLEA WEB
        </div>

        {/* Social Links */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
          {socialLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleSocialClick(e, item)}
              className="font-geist text-xs uppercase tracking-wider text-zinc-400 hover:text-white transition-colors py-1 relative"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Rights Information */}
        <div className="font-geist text-[10px] text-zinc-500 uppercase tracking-widest text-center md:text-right font-light">
          © {new Date().getFullYear()} · Nabila AL. Made with <Heart className="w-4 h-4 inline-block fill-white" /> by Allea.
        </div>

      </div>
    </footer>
  );
}
