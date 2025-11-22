import type { LucideIcon } from "lucide-react";

export type TechCategoryId =
  | "frontend"
  | "backend"
  | "cloud"
  | "design";

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
