"use client";

import { motion } from "framer-motion";
import { Github, Mail, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <motion.footer
      className="mt-24 border-t border-white/10 bg-slate-950/90 py-8 text-xs text-slate-400"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
        <div>
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-slate-500">
            Future Tech Explorer
          </p>
          <p className="mt-1 text-[0.78rem] text-slate-400">
            Built for curious minds who want to design the next wave of technology.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="#hero"
            className="text-[0.75rem] font-medium text-slate-300 transition-colors hover:text-cyan-300"
          >
            Back to top
          </a>

          <div className="h-4 w-px bg-slate-700/70" />

          <div className="flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="View projects on GitHub"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-slate-900/70 text-slate-300 transition-colors hover:border-cyan-400/70 hover:text-cyan-300"
            >
              <Github className="h-3.5 w-3.5" />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Share on X / Twitter"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-slate-900/70 text-slate-300 transition-colors hover:border-cyan-400/70 hover:text-cyan-300"
            >
              <Twitter className="h-3.5 w-3.5" />
            </a>
            <a
              href="mailto:hello@example.com"
              aria-label="Contact via email"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-slate-900/70 text-slate-300 transition-colors hover:border-cyan-400/70 hover:text-cyan-300"
            >
              <Mail className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
