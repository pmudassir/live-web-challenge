"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

import ScrollProgress from "./ScrollProgress";
import TopNav from "./TopNav";
import CursorGlow from "./CursorGlow";
import IntroOverlay from "./IntroOverlay";
import SectionRail from "./SectionRail";

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-50 antialiased">
      <ScrollProgress />
      <TopNav />
      <CursorGlow />
      <IntroOverlay />
      <SectionRail />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.16),transparent_55%),radial-gradient(circle_at_bottom,rgba(244,114,182,0.16),transparent_55%)]" />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 opacity-25"
        initial={{ backgroundPosition: "0px 0px" }}
        animate={{ backgroundPosition: ["0px 0px", "0px 40px", "0px 0px"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(148,163,184,0.22) 1px, transparent 0)",
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(circle at top, black, transparent 65%), radial-gradient(circle at bottom, black, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(circle at top, black, transparent 65%), radial-gradient(circle at bottom, black, transparent 70%)",
        }}
      />
      <main className="relative z-10 flex min-h-screen flex-col">{children}</main>
    </div>
  );
}
