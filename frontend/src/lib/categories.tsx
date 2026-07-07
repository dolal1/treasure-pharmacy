import type { ComponentType, SVGProps } from "react";
import { BeakerIcon, ChatIcon, HomeIcon, MoonIcon } from "../components/icons";

const icons: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  "lab-tests": BeakerIcon,
  consultations: ChatIcon,
  "home-care": HomeIcon,
  "bedside-nursing": MoonIcon,
};

export function CategoryIcon({
  slug,
  ...props
}: { slug: string } & SVGProps<SVGSVGElement>) {
  const Icon = icons[slug] ?? BeakerIcon;
  return <Icon {...props} />;
}

/** Categories whose services happen at the client's home. */
export const HOME_VISIT_CATEGORIES = new Set(["home-care", "bedside-nursing"]);
