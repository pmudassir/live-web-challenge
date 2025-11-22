"use client";

import type { ReactNode } from "react";

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
    <div className="relative min-h-screen bg-[#030303] text-slate-50 antialiased selection:bg-rose-500/30 selection:text-white">
      <ScrollProgress />
      <TopNav />
      <CursorGlow />
      <IntroOverlay />
      <SectionRail />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.1),transparent_55%),radial-gradient(circle_at_bottom,rgba(244,63,94,0.1),transparent_55%)]" />
      <main className="relative z-10 flex min-h-screen flex-col">{children}</main>
    </div>
  );
}
