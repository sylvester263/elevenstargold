import {
  Building2,
  Route,
  ClipboardList,
  Ruler,
  Hammer,
  PaintRoller,
  Factory,
  Landmark,
  Wrench,
  type LucideIcon,
} from "lucide-react";

// One icon per service line on /services and the homepage services grid —
// content/site-copy.ts's `services` array has no icon field of its own
// (text-only, from the source PDF), so this is presentation-only and kept
// separate rather than bolted onto the content data.
export const SERVICE_ICON: Record<string, LucideIcon> = {
  "Building Construction": Building2,
  "Road Construction": Route,
  "Project Management": ClipboardList,
  "Civil Engineering": Ruler,
  "Renovation & Remodeling": Hammer,
  "Interior and Exterior Finishing": PaintRoller,
  "Industrial Construction": Factory,
  "Real Estate Development": Landmark,
  "Maintenance & Repairs": Wrench,
};
