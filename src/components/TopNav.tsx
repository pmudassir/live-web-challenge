"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "hero", label: "Overview" },
  { id: "journey", label: "Journey" },
  { id: "ai", label: "AI & ML" },
  { id: "data", label: "Data" },
  { id: "robotics", label: "Robotics" },
  { id: "mobile", label: "Mobile" },
  { id: "web", label: "Web" },
  { id: "emerging", label: "Emerging" },
  { id: "playground", label: "Playground" },
] as const;

export default function TopNav() {
  const [activeId, setActiveId] = useState<string>("hero");

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("section[id]"),
    );

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        root: null,
        threshold: 0.35,
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleClick = (id: string) => (event: React.MouseEvent) => {
    event.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const offset = 88; // account for nav and breathing room
    const targetY = rect.top + window.scrollY - offset;

    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  return (
    <motion.nav
      className="pointer-events-none fixed inset-x-0 top-3 z-30 flex justify-center"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="pointer-events-auto inline-flex items-center gap-1 rounded-full border border-white/10 bg-slate-950/80 px-2 py-1 text-[0.7rem] text-slate-300 shadow-[0_18px_80px_rgba(15,23,42,0.9)] backdrop-blur-2xl">
        {SECTIONS.map((section) => {
          const isActive = activeId === section.id;

          return (
            <button
              key={section.id}
              type="button"
              onClick={handleClick(section.id)}
              className={cn(
                "relative rounded-full px-3 py-1 font-medium outline-none transition-colors",
                "focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
                isActive
                  ? "text-slate-50"
                  : "text-slate-400 hover:text-slate-100",
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-white/8"
                  transition={{
                    type: "spring",
                    stiffness: 320,
                    damping: 26,
                    mass: 0.7,
                  }}
                />
              )}
              <span className="relative z-10">{section.label}</span>
            </button>
          );
        })}
        
        <div className="w-px h-4 bg-white/10 mx-1" />
        
        <a
          href="/horizon"
          className="relative rounded-full px-3 py-1 font-medium outline-none transition-colors text-cyan-300 hover:text-cyan-100"
        >
          Horizon 3D
        </a>
        
        <div className="w-px h-4 bg-white/10 mx-1" />

        <a
          href="/pong"
          className="relative rounded-full px-3 py-1 font-medium outline-none transition-colors text-pink-300 hover:text-pink-100"
        >
          Pong
        </a>
      </div>
    </motion.nav>
  );
}
