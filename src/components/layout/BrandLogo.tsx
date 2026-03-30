

import React from "react";
import { cn } from "@/lib/utils";

/**
 * Props for the BrandLogo component
 */
interface BrandLogoProps {
  /** The variant of the logo to display: 'normal' for full logo, 'icon' for favicon style */
  variant?: "normal" | "icon";
  /** Additional CSS classes to apply to the container/image */
  className?: string;
}

/**
 * Standardized BrandLogo component that handles 'normal' and 'icon' representations.
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({ variant = "normal", className }) => {
  const isIcon = variant === "icon";

  return (
    <div className={cn("", className)}>
      <img
        src="/brand_logo.png"
        alt="WealthWise Logo"
        className={cn(
          "w-full h-full",
          isIcon ? "scale-110" : "scale-100"
        )}
      />
    </div>
  );
};
