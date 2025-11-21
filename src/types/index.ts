import type { LucideIcon } from "lucide-react";

export type TechCategoryId =
  | "ai"
  | "data"
  | "robotics"
  | "mobile"
  | "web"
  | "emerging";

export interface TechSectionConfig {
  id: TechCategoryId;
  label: string;
  title: string;
  description: string;
  didYouKnow: string;
  factDetail: string;
  highlight: string;
  icon: LucideIcon;
  accentFrom: string;
  accentTo: string;
}
