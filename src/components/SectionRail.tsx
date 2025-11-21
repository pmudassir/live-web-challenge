"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "hero", label: "Overview" },
  { id: "journey", label: "Journey" },
  { id: "ai", label: "AI" },
  { id: "data", label: "Data" },
  { id: "robotics", label: "Robotics" },
  { id: "mobile", label: "Mobile" },
  { id: "web", label: "Web" },
  { id: "emerging", label: "Emerging" },
  { id: "playground", label: "Play" },
] as const;

export default function SectionRail() {
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
    const offset = 88;
    const targetY = rect.top + window.scrollY - offset;

    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  return (
    <div className="pointer-events-none fixed right-3 top-1/2 z-20 hidden -translate-y-1/2 flex-col md:flex lg:right-6">
      <div className="relative flex flex-col items-center gap-2">
        <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-slate-700/40" />
        {SECTIONS.map((section) => {
          const isActive = activeId === section.id;

          return (
            <button
              key={section.id}
              type="button"
              onClick={handleClick(section.id)}
              className="group relative flex h-6 w-6 items-center justify-center outline-none"
            >
              <motion.span
                className={cn(
                  "relative z-10 h-2 w-2 rounded-full border border-slate-500/70 bg-slate-900/80 transition-colors",
                  isActive && "border-cyan-300/80 bg-cyan-400",
                )}
                layoutId="rail-dot"
                transition={{ type: "spring", stiffness: 320, damping: 26, mass: 0.7 }}
              />
              <span className="pointer-events-none absolute left-[-0.5rem] top-1/2 h-7 w-7 -translate-x-full -translate-y-1/2 rounded-full bg-slate-900/80 text-[0.65rem] font-medium text-slate-200 opacity-0 shadow-[0_10px_35px_rgba(15,23,42,0.85)] backdrop-blur-xl transition-opacity group-hover:opacity-100 md:left-[-0.75rem]">
                <span className="flex h-full items-center justify-center px-2">
                  {section.label}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
