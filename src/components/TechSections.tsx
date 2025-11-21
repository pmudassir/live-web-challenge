"use client";

import { Brain, Cog, LineChart, Smartphone, Sparkles, Globe2 } from "lucide-react";

import TechSection from "./TechSection";
import type { TechSectionConfig } from "@/types";

const SECTIONS: TechSectionConfig[] = [
  {
    id: "ai",
    label: "AI & Machine Learning",
    title: "Teach machines to see, speak, and imagine with you.",
    description:
      "From chatbots to generative art, AI systems are becoming creative partners instead of just tools.",
    didYouKnow:
      "AI can already design new materials, discover patterns in galaxies, and write code with you in real time.",
    factDetail:
      "Modern models learn from billions of examples. With just a laptop and an internet connection, you can fine-tune them on your own ideas and build assistants that feel personal.",
    highlight: "Prototype AI-powered experiences that react to every gesture and scroll.",
    icon: Brain,
    accentFrom: "from-cyan-400",
    accentTo: "to-sky-500",
  },
  {
    id: "data",
    label: "Data Science & Analytics",
    title: "Turn raw data into stories about the future.",
    description:
      "Dashboards, forecasts, and experiments help you ask better questionsand answer them with evidence.",
    didYouKnow:
      "Most companies only use a tiny fraction of the data they collect. That unused data is a playground for your ideas.",
    factDetail:
      "With the right models, you can simulate entire systems: cities, classrooms, even ecosystems. Data science is how you test \"what if?\" in a safe, virtual world.",
    highlight: "Explore live visualizations that shift as you scroll through time and space.",
    icon: LineChart,
    accentFrom: "from-sky-400",
    accentTo: "to-indigo-500",
  },
  {
    id: "robotics",
    label: "Robotics & Automation",
    title: "Give physical machines a sense of motion and mind.",
    description:
      "Robots are leaving factories and entering hospitals, homes, and even classroomsworking alongside humans.",
    didYouKnow:
      "Soft robots inspired by animals can squeeze, climb, and swim in ways traditional machines never could.",
    factDetail:
      "By combining sensors, control theory, and AI, you can orchestrate fleets of robots that adapt to the world in real timefrom delivery drones to warehouse swarms.",
    highlight: "Watch swarms, arms, and autonomous bots respond to your scrolling choreography.",
    icon: Cog,
    accentFrom: "from-amber-300",
    accentTo: "to-orange-500",
  },
  {
    id: "mobile",
    label: "Mobile App Development",
    title: "Ship ideas that live in everyone&apos;s pocket.",
    description:
      "Build experiences that travel with peoplefrom productivity tools to immersive AR adventures.",
    didYouKnow:
      "A single mobile app can reach more people in a week than some products could in a decade.",
    factDetail:
      "With modern cross-platform frameworks, you can design once and deploy to phones, tablets, and wearableskeeping animations silky smooth at 60fps.",
    highlight: "Prototype touch-first flows that respond to taps, drags, and swipes.",
    icon: Smartphone,
    accentFrom: "from-emerald-400",
    accentTo: "to-teal-500",
  },
  {
    id: "web",
    label: "Web Development",
    title: "Turn the browser into a canvas for stories.",
    description:
      "The modern web lets you blend 3D, video, audio, and real-time data into experiences that feel alive.",
    didYouKnow:
      "Some of the most impressive demos you&apos;ve seen are just HTML, CSS, and JavaScript pushed to their limits.",
    factDetail:
      "With the right performance mindset, you can stream terabytes of data, animate complex scenes, and still keep load times under a second.",
    highlight: "Compose layouts that morph and react as you move through the page.",
    icon: Globe2,
    accentFrom: "from-fuchsia-400",
    accentTo: "to-rose-500",
  },
  {
    id: "emerging",
    label: "Emerging Technologies",
    title: "Explore ideas that barely have names yet.",
    description:
      "From spatial computing to autonomous agents, new platforms are appearing faster than ever before.",
    didYouKnow:
      "Many breakthrough projects start as weekend experiments that don&apos;t fit into any existing box.",
    factDetail:
      "You don&apos;t have to wait for a job title to exist. By prototyping with today&apos;s tools, you can help define what tomorrow&apos;s roles and products look like.",
    highlight: "Play with concepts that blur the boundaries between digital and physical worlds.",
    icon: Sparkles,
    accentFrom: "from-lime-300",
    accentTo: "to-cyan-400",
  },
];

export default function TechSections() {
  return (
    <div className="mt-10 space-y-4 sm:space-y-6">
      {SECTIONS.map((section, index) => (
        <TechSection key={section.id} config={section} index={index} />
      ))}
    </div>
  );
}
