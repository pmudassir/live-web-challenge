"use client";

import { Brain, LineChart, Sparkles, Globe2 } from "lucide-react";

import TechSection from "./TechSection";
import type { TechSectionConfig } from "@/types";

const SECTIONS: TechSectionConfig[] = [
  {
    id: "frontend",
    label: "Frontend & Mobile",
    title: "Crafting pixel-perfect cross-platform experiences.",
    description:
      "Specializing in ReactJS, NextJS, and React Native. I build responsive, high-performance web and mobile applications with seamless animations using ThreeJS and Framer Motion.",
    didYouKnow:
      "React Native allows code reusability of up to 90% between iOS and Android, significantly reducing development time without compromising performance.",
    factDetail:
      "I leverage component-driven architecture with Shadcn and Tailwind CSS to ensure consistency and scalability across all my frontend projects.",
    highlight: "Interactive UIs that feel alive.",
    icon: Globe2,
    accentFrom: "from-indigo-500",
    accentTo: "to-violet-500",
  },
  {
    id: "backend",
    label: "Backend & Database",
    title: "Architecting robust and scalable server-side systems.",
    description:
      "Designing efficient APIs with NodeJS, NestJS, and Express. Expert in managing data with PostgreSQL, MongoDB, and Redis for high-speed performance.",
    didYouKnow:
      "Using GraphQL can reduce data fetching volume by allowing clients to request exactly what they need, optimizing bandwidth in mobile networks.",
    factDetail:
      "I implement secure authentication, real-time communication with Socket.io, and microservices architecture to handle complex business logic.",
    highlight: "Secure and efficient data flow.",
    icon: Brain,
    accentFrom: "from-rose-500",
    accentTo: "to-orange-500",
  },
  {
    id: "cloud",
    label: "Cloud & DevOps",
    title: "Automating deployment and ensuring high availability.",
    description:
      "Leveraging AWS (S3, EC2), Docker, and Kubernetes for containerized deployments. Proficient in CI/CD pipelines and Nginx configuration.",
    didYouKnow:
      "Containerization with Docker ensures that your application runs consistently across any environment, eliminating the 'it works on my machine' problem.",
    factDetail:
      "I use Vercel for rapid frontend deployments and Git for version control, ensuring a smooth development lifecycle from commit to production.",
    highlight: "Scalable infrastructure managed with code.",
    icon: LineChart,
    accentFrom: "from-amber-500",
    accentTo: "to-yellow-500",
  },
  {
    id: "design",
    label: "Languages & Core",
    title: "Strong foundation in computer science fundamentals.",
    description:
      "Proficient in JavaScript, TypeScript, Java, and C. I believe in understanding the core principles of programming to write efficient and maintainable code.",
    didYouKnow:
      "TypeScript's static typing helps catch errors early in the development process, improving code quality and developer productivity in large codebases.",
    factDetail:
      "I write unit and integration tests using Jest and Mocha to ensure code reliability and prevent regressions during refactoring.",
    highlight: "Clean, testable, and type-safe code.",
    icon: Sparkles,
    accentFrom: "from-cyan-500",
    accentTo: "to-blue-500",
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
