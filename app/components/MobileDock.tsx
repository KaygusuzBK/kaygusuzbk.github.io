'use client';

import { useCallback } from "react";
import { motion } from "framer-motion";
import { Home, Briefcase, User, Mail } from "lucide-react";

const items = [
  { id: "top", icon: Home, label: "Home" },
  { id: "work", icon: Briefcase, label: "Work" },
  { id: "about", icon: User, label: "About" },
  { id: "contact", icon: Mail, label: "Contact" },
];

export default function MobileDock() {
  const handleScroll = useCallback((targetId: string) => {
    const el = document.getElementById(targetId);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const offset = window.scrollY + rect.top - 80; // a bit above the section
    window.scrollTo({ top: offset, behavior: "smooth" });
  }, []);

  return (
    <div className="fixed inset-x-0 bottom-4 z-50 flex justify-center md:hidden pointer-events-none">
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="pointer-events-auto flex items-center gap-2.5 rounded-3xl border border-white/20 bg-black/80 backdrop-blur-2xl px-3.5 py-2 shadow-[0_18px_45px_rgba(0,0,0,0.7)]"
      >
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleScroll(item.id)}
              className="group relative flex flex-col items-center gap-0.5 px-1.5 py-0.5 text-[10px] text-white/70 hover:text-white transition-colors"
              aria-label={item.label}
            >
              {/* Soft glow ring */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 rounded-3xl bg-white/5 blur-md"
                initial={false}
                transition={{ duration: 0.25 }}
              />
              <motion.div
                whileHover={{ y: -4, scale: 1.07 }}
                whileTap={{ scale: 0.9 }}
                className="relative flex items-center justify-center h-9 w-9 rounded-2xl bg-white text-black shadow-[0_10px_25px_rgba(0,0,0,0.7)]"
              >
                <Icon className="h-4 w-4" />
              </motion.div>
              <span className="relative">{item.label}</span>
            </button>
          );
        })}
      </motion.div>
    </div>
  );
}


