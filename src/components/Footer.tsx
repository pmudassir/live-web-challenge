"use client";

import { motion } from "framer-motion";
import { Github, Mail } from "lucide-react";
import { BackgroundBeams } from "./BackgroundBeams";

export default function Footer() {
  return (
    <footer className="relative mt-32 border-t border-white/[0.08] bg-[#030303] pt-32 pb-16 text-xs text-white/40">
      <BackgroundBeams className="opacity-20" />
      
      <motion.div
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="space-y-4">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-white/40">
            Mudassir Mohammed
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Building the future,<br />one line of code at a time.
          </h2>
        </div>

        <div className="flex flex-col gap-6 sm:items-end">
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/pmudassir"
              target="_blank"
              rel="noreferrer"
              aria-label="View projects on GitHub"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.02] text-white/60 transition-colors hover:border-indigo-500/50 hover:text-indigo-300 hover:bg-white/[0.05]"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://linkedin.com/in/mudassir-mohammed"
              target="_blank"
              rel="noreferrer"
              aria-label="Connect on LinkedIn"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.02] text-white/60 transition-colors hover:border-indigo-500/50 hover:text-indigo-300 hover:bg-white/[0.05]"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a
              href="mailto:pmuddasir@gmail.com"
              aria-label="Contact via email"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.02] text-white/60 transition-colors hover:border-indigo-500/50 hover:text-indigo-300 hover:bg-white/[0.05]"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
          
          <div className="flex flex-col gap-2 sm:items-end text-[0.75rem] font-medium text-white/40">
             <a href="https://mudassir.in" target="_blank" rel="noreferrer" className="hover:text-indigo-300 transition-colors">mudassir.in</a>
             <span>© {new Date().getFullYear()} Mudassir Mohammed</span>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
