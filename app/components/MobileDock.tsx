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
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="pointer-events-auto flex items-center gap-3 rounded-full border border-white/15 bg-white/90 backdrop-blur-xl px-4 py-2 shadow-[0_18px_45px_rgba(0,0,0,0.45)]"
      >
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleScroll(item.id)}
              className="relative flex flex-col items-center gap-0.5 px-2 py-1 text-[10px] text-black/70 hover:text-black transition-colors"
              aria-label={item.label}
            >
              <motion.div
                whileHover={{ y: -4, scale: 1.05 }}
                whileTap={{ scale: 0.94 }}
                className="flex items-center justify-center h-8 w-8 rounded-2xl bg-black text-white shadow-[0_10px_25px_rgba(0,0,0,0.45)]"
              >
                <Icon className="h-4 w-4" />
              </motion.div>
              <span>{item.label}</span>
            </button>
          );
        })}
      </motion.div>
    </div>
  );
}


