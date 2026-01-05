import React from "react";

interface PlantIconProps {
  className?: string;
  filled?: boolean;
}

// 30+ unique hand-drawn plant/garden SVG icons
export const PlantIcon1: React.FC<PlantIconProps> = ({ className, filled }) => (
  <svg viewBox="0 0 40 40" className={className} fill="none">
    <path d="M20 35V20" className="ink-stroke" />
    <path d="M20 20C20 15 15 12 15 8C18 10 20 14 20 20Z" className={filled ? "ink-fill" : "ink-stroke"} />
    <path d="M20 20C20 15 25 12 25 8C22 10 20 14 20 20Z" className={filled ? "ink-fill" : "ink-stroke"} />
    <path d="M20 25C17 22 12 22 10 18C14 20 18 22 20 25Z" className={filled ? "ink-fill" : "ink-stroke"} />
    <path d="M20 25C23 22 28 22 30 18C26 20 22 22 20 25Z" className={filled ? "ink-fill" : "ink-stroke"} />
  </svg>
);

export const PlantIcon2: React.FC<PlantIconProps> = ({ className, filled }) => (
  <svg viewBox="0 0 40 40" className={className} fill="none">
    <circle cx="20" cy="12" r="6" className={filled ? "ink-fill" : "ink-stroke"} />
    <path d="M20 18V35" className="ink-stroke" />
    <path d="M15 24L20 28L25 24" className="ink-stroke" />
  </svg>
);

export const PlantIcon3: React.FC<PlantIconProps> = ({ className, filled }) => (
  <svg viewBox="0 0 40 40" className={className} fill="none">
    <path d="M20 35V22" className="ink-stroke" />
    <ellipse cx="14" cy="15" rx="5" ry="7" className={filled ? "ink-fill" : "ink-stroke"} />
    <ellipse cx="26" cy="15" rx="5" ry="7" className={filled ? "ink-fill" : "ink-stroke"} />
    <ellipse cx="20" cy="10" rx="5" ry="7" className={filled ? "ink-fill" : "ink-stroke"} />
  </svg>
);

export const PlantIcon4: React.FC<PlantIconProps> = ({ className, filled }) => (
  <svg viewBox="0 0 40 40" className={className} fill="none">
    <path d="M20 35V20" className="ink-stroke" />
    <path d="M12 20C12 12 20 8 20 8C20 8 28 12 28 20C28 28 20 32 20 32C20 32 12 28 12 20Z" className={filled ? "ink-fill" : "ink-stroke"} />
    <circle cx="20" cy="18" r="3" className="ink-stroke" />
  </svg>
);

export const PlantIcon5: React.FC<PlantIconProps> = ({ className, filled }) => (
  <svg viewBox="0 0 40 40" className={className} fill="none">
    <path d="M20 35V25" className="ink-stroke" />
    <path d="M10 25C10 18 15 12 20 10C25 12 30 18 30 25L20 28L10 25Z" className={filled ? "ink-fill" : "ink-stroke"} />
    <path d="M15 20L20 18L25 20" className="ink-stroke" />
  </svg>
);

export const PlantIcon6: React.FC<PlantIconProps> = ({ className, filled }) => (
  <svg viewBox="0 0 40 40" className={className} fill="none">
    <path d="M20 35V28" className="ink-stroke" />
    <circle cx="20" cy="20" r="8" className={filled ? "ink-fill" : "ink-stroke"} />
    <circle cx="20" cy="20" r="3" className="ink-stroke" />
    <path d="M20 12V8M12 20H8M28 20H32M20 28V32" className="ink-stroke" />
  </svg>
);

export const PlantIcon7: React.FC<PlantIconProps> = ({ className, filled }) => (
  <svg viewBox="0 0 40 40" className={className} fill="none">
    <path d="M20 35C20 35 8 28 8 18C8 12 14 8 20 8C26 8 32 12 32 18C32 28 20 35 20 35Z" className={filled ? "ink-fill" : "ink-stroke"} />
    <path d="M20 15V25M15 20H25" className="ink-stroke" />
  </svg>
);

export const PlantIcon8: React.FC<PlantIconProps> = ({ className, filled }) => (
  <svg viewBox="0 0 40 40" className={className} fill="none">
    <ellipse cx="20" cy="28" rx="12" ry="6" className={filled ? "ink-fill" : "ink-stroke"} />
    <path d="M20 22V12" className="ink-stroke" />
    <circle cx="20" cy="10" r="4" className={filled ? "ink-fill" : "ink-stroke"} />
    <path d="M15 18L20 14L25 18" className="ink-stroke" />
  </svg>
);

export const PlantIcon9: React.FC<PlantIconProps> = ({ className, filled }) => (
  <svg viewBox="0 0 40 40" className={className} fill="none">
    <path d="M20 35V20" className="ink-stroke" />
    <path d="M10 18C10 10 20 6 20 6C20 6 30 10 30 18L20 22L10 18Z" className={filled ? "ink-fill" : "ink-stroke"} />
    <circle cx="20" cy="14" r="2" className="ink-stroke" />
  </svg>
);

export const PlantIcon10: React.FC<PlantIconProps> = ({ className, filled }) => (
  <svg viewBox="0 0 40 40" className={className} fill="none">
    <path d="M20 35V18" className="ink-stroke" />
    <path d="M8 18C8 8 20 4 20 4C20 4 32 8 32 18C32 24 26 28 20 28C14 28 8 24 8 18Z" className={filled ? "ink-fill" : "ink-stroke"} />
    <path d="M14 16C14 16 17 12 20 12C23 12 26 16 26 16" className="ink-stroke" />
  </svg>
);

export const PlantIcon11: React.FC<PlantIconProps> = ({ className, filled }) => (
  <svg viewBox="0 0 40 40" className={className} fill="none">
    <path d="M20 35V22" className="ink-stroke" />
    <circle cx="12" cy="16" r="4" className={filled ? "ink-fill" : "ink-stroke"} />
    <circle cx="28" cy="16" r="4" className={filled ? "ink-fill" : "ink-stroke"} />
    <circle cx="20" cy="10" r="4" className={filled ? "ink-fill" : "ink-stroke"} />
    <circle cx="16" cy="22" r="4" className={filled ? "ink-fill" : "ink-stroke"} />
    <circle cx="24" cy="22" r="4" className={filled ? "ink-fill" : "ink-stroke"} />
  </svg>
);

export const PlantIcon12: React.FC<PlantIconProps> = ({ className, filled }) => (
  <svg viewBox="0 0 40 40" className={className} fill="none">
    <path d="M20 35V8" className="ink-stroke" />
    <path d="M20 12L12 8" className="ink-stroke" />
    <path d="M20 18L28 14" className="ink-stroke" />
    <path d="M20 24L12 20" className="ink-stroke" />
    <circle cx="12" cy="8" r="3" className={filled ? "ink-fill" : "ink-stroke"} />
    <circle cx="28" cy="14" r="3" className={filled ? "ink-fill" : "ink-stroke"} />
    <circle cx="12" cy="20" r="3" className={filled ? "ink-fill" : "ink-stroke"} />
  </svg>
);

export const PlantIcon13: React.FC<PlantIconProps> = ({ className, filled }) => (
  <svg viewBox="0 0 40 40" className={className} fill="none">
    <path d="M20 35V20" className="ink-stroke" />
    <path d="M20 20C14 20 10 14 10 10C16 10 20 14 20 20Z" className={filled ? "ink-fill" : "ink-stroke"} />
    <path d="M20 20C26 20 30 14 30 10C24 10 20 14 20 20Z" className={filled ? "ink-fill" : "ink-stroke"} />
  </svg>
);

export const PlantIcon14: React.FC<PlantIconProps> = ({ className, filled }) => (
  <svg viewBox="0 0 40 40" className={className} fill="none">
    <ellipse cx="20" cy="32" rx="8" ry="4" className={filled ? "ink-fill" : "ink-stroke"} />
    <path d="M20 28V18" className="ink-stroke" />
    <path d="M14 18L20 10L26 18L20 14L14 18Z" className={filled ? "ink-fill" : "ink-stroke"} />
  </svg>
);

export const PlantIcon15: React.FC<PlantIconProps> = ({ className, filled }) => (
  <svg viewBox="0 0 40 40" className={className} fill="none">
    <path d="M20 35V24" className="ink-stroke" />
    <ellipse cx="20" cy="16" rx="10" ry="8" className={filled ? "ink-fill" : "ink-stroke"} />
    <path d="M15 14L20 10L25 14" className="ink-stroke" />
    <path d="M17 18L20 15L23 18" className="ink-stroke" />
  </svg>
);

export const PlantIcon16: React.FC<PlantIconProps> = ({ className, filled }) => (
  <svg viewBox="0 0 40 40" className={className} fill="none">
    <path d="M20 35V25" className="ink-stroke" />
    <path d="M8 20C8 12 14 8 20 8C26 8 32 12 32 20C32 25 26 28 20 28C14 28 8 25 8 20Z" className={filled ? "ink-fill" : "ink-stroke"} />
    <ellipse cx="15" cy="16" rx="2" ry="3" className="ink-stroke" />
    <ellipse cx="25" cy="16" rx="2" ry="3" className="ink-stroke" />
    <path d="M16 22C18 24 22 24 24 22" className="ink-stroke" />
  </svg>
);

export const PlantIcon17: React.FC<PlantIconProps> = ({ className, filled }) => (
  <svg viewBox="0 0 40 40" className={className} fill="none">
    <path d="M20 35V20" className="ink-stroke" />
    <path d="M6 20L20 8L34 20L20 16L6 20Z" className={filled ? "ink-fill" : "ink-stroke"} />
  </svg>
);

export const PlantIcon18: React.FC<PlantIconProps> = ({ className, filled }) => (
  <svg viewBox="0 0 40 40" className={className} fill="none">
    <path d="M20 35V22" className="ink-stroke" />
    <circle cx="20" cy="14" r="8" className={filled ? "ink-fill" : "ink-stroke"} />
    <path d="M16 12L18 16L22 14L20 10L16 12Z" className="ink-stroke" />
  </svg>
);

export const PlantIcon19: React.FC<PlantIconProps> = ({ className, filled }) => (
  <svg viewBox="0 0 40 40" className={className} fill="none">
    <ellipse cx="20" cy="32" rx="10" ry="4" className={filled ? "ink-fill" : "ink-stroke"} />
    <path d="M20 28V12" className="ink-stroke" />
    <path d="M14 12L20 6L26 12" className="ink-stroke" />
    <path d="M16 16L20 12L24 16" className="ink-stroke" />
    <path d="M18 20L20 18L22 20" className="ink-stroke" />
  </svg>
);

export const PlantIcon20: React.FC<PlantIconProps> = ({ className, filled }) => (
  <svg viewBox="0 0 40 40" className={className} fill="none">
    <path d="M20 35V20" className="ink-stroke" />
    <circle cx="14" cy="12" r="5" className={filled ? "ink-fill" : "ink-stroke"} />
    <circle cx="26" cy="12" r="5" className={filled ? "ink-fill" : "ink-stroke"} />
    <circle cx="20" cy="18" r="5" className={filled ? "ink-fill" : "ink-stroke"} />
  </svg>
);

// Animals and garden items
export const ButterflyIcon: React.FC<PlantIconProps> = ({ className, filled }) => (
  <svg viewBox="0 0 40 40" className={className} fill="none">
    <path d="M20 12V28" className="ink-stroke" />
    <ellipse cx="12" cy="16" rx="6" ry="8" className={filled ? "ink-fill" : "ink-stroke"} />
    <ellipse cx="28" cy="16" rx="6" ry="8" className={filled ? "ink-fill" : "ink-stroke"} />
    <ellipse cx="14" cy="26" rx="4" ry="5" className={filled ? "ink-fill" : "ink-stroke"} />
    <ellipse cx="26" cy="26" rx="4" ry="5" className={filled ? "ink-fill" : "ink-stroke"} />
    <path d="M18 10C16 6 14 6 12 8" className="ink-stroke" />
    <path d="M22 10C24 6 26 6 28 8" className="ink-stroke" />
  </svg>
);

export const BeeIcon: React.FC<PlantIconProps> = ({ className, filled }) => (
  <svg viewBox="0 0 40 40" className={className} fill="none">
    <ellipse cx="20" cy="20" rx="10" ry="8" className={filled ? "ink-fill" : "ink-stroke"} />
    <path d="M14 17H26M14 20H26M14 23H26" className="ink-stroke" />
    <ellipse cx="10" cy="14" rx="4" ry="6" className="ink-stroke" />
    <ellipse cx="30" cy="14" rx="4" ry="6" className="ink-stroke" />
    <path d="M16 12C14 8 12 8 10 10" className="ink-stroke" />
    <path d="M24 12C26 8 28 8 30 10" className="ink-stroke" />
  </svg>
);

export const SnailIcon: React.FC<PlantIconProps> = ({ className, filled }) => (
  <svg viewBox="0 0 40 40" className={className} fill="none">
    <path d="M8 28C8 28 10 32 20 32C30 32 32 28 32 28" className="ink-stroke" />
    <circle cx="22" cy="20" r="8" className={filled ? "ink-fill" : "ink-stroke"} />
    <path d="M22 16C20 16 18 18 18 20C18 22 20 24 22 24" className="ink-stroke" />
    <circle cx="10" cy="24" r="3" className="ink-stroke" />
    <path d="M8 20L6 16M12 20L14 16" className="ink-stroke" />
  </svg>
);

export const LadybugIcon: React.FC<PlantIconProps> = ({ className, filled }) => (
  <svg viewBox="0 0 40 40" className={className} fill="none">
    <ellipse cx="20" cy="22" rx="10" ry="10" className={filled ? "ink-fill" : "ink-stroke"} />
    <path d="M20 12V32" className="ink-stroke" />
    <circle cx="15" cy="18" r="2" className="ink-stroke" />
    <circle cx="25" cy="18" r="2" className="ink-stroke" />
    <circle cx="14" cy="26" r="2" className="ink-stroke" />
    <circle cx="26" cy="26" r="2" className="ink-stroke" />
    <circle cx="20" cy="10" r="3" className="ink-stroke" />
    <path d="M17 8L15 4M23 8L25 4" className="ink-stroke" />
  </svg>
);

export const BirdIcon: React.FC<PlantIconProps> = ({ className, filled }) => (
  <svg viewBox="0 0 40 40" className={className} fill="none">
    <ellipse cx="20" cy="20" rx="12" ry="8" className={filled ? "ink-fill" : "ink-stroke"} />
    <circle cx="28" cy="16" r="4" className="ink-stroke" />
    <path d="M32 16L36 14" className="ink-stroke" />
    <circle cx="30" cy="15" r="1" className="ink-fill" />
    <path d="M8 20L4 18L8 22" className="ink-stroke" />
    <path d="M16 28L18 34M22 28L20 34" className="ink-stroke" />
  </svg>
);

export const WateringCanIcon: React.FC<PlantIconProps> = ({ className, filled }) => (
  <svg viewBox="0 0 40 40" className={className} fill="none">
    <path d="M10 18L8 30H28L26 18H10Z" className={filled ? "ink-fill" : "ink-stroke"} />
    <path d="M26 22L34 16" className="ink-stroke" />
    <circle cx="36" cy="14" r="3" className="ink-stroke" />
    <path d="M14 18C14 14 18 10 18 10L22 18" className="ink-stroke" />
  </svg>
);

export const SunIcon: React.FC<PlantIconProps> = ({ className, filled }) => (
  <svg viewBox="0 0 40 40" className={className} fill="none">
    <circle cx="20" cy="20" r="8" className={filled ? "ink-fill" : "ink-stroke"} />
    <path d="M20 6V10M20 30V34M6 20H10M30 20H34" className="ink-stroke" />
    <path d="M10 10L13 13M27 27L30 30M30 10L27 13M13 27L10 30" className="ink-stroke" />
  </svg>
);

export const CloudIcon: React.FC<PlantIconProps> = ({ className, filled }) => (
  <svg viewBox="0 0 40 40" className={className} fill="none">
    <path d="M10 26C6 26 4 22 6 18C8 14 14 14 16 16C18 12 24 10 28 14C32 18 30 24 26 26C22 28 14 28 10 26Z" className={filled ? "ink-fill" : "ink-stroke"} />
  </svg>
);

export const RainIcon: React.FC<PlantIconProps> = ({ className, filled }) => (
  <svg viewBox="0 0 40 40" className={className} fill="none">
    <path d="M10 20C6 20 4 16 6 12C8 8 14 8 16 10C18 6 24 4 28 8C32 12 30 18 26 20C22 22 14 22 10 20Z" className={filled ? "ink-fill" : "ink-stroke"} />
    <path d="M12 26L10 32M20 26L18 34M28 26L26 32" className="ink-stroke" />
  </svg>
);

export const MushroomIcon: React.FC<PlantIconProps> = ({ className, filled }) => (
  <svg viewBox="0 0 40 40" className={className} fill="none">
    <path d="M14 22V32H26V22" className="ink-stroke" />
    <path d="M6 22C6 14 12 8 20 8C28 8 34 14 34 22H6Z" className={filled ? "ink-fill" : "ink-stroke"} />
    <circle cx="14" cy="16" r="2" className="ink-stroke" />
    <circle cx="24" cy="14" r="3" className="ink-stroke" />
    <circle cx="18" cy="20" r="2" className="ink-stroke" />
  </svg>
);

export const AppleIcon: React.FC<PlantIconProps> = ({ className, filled }) => (
  <svg viewBox="0 0 40 40" className={className} fill="none">
    <path d="M20 10C14 10 10 16 10 22C10 30 16 34 20 34C24 34 30 30 30 22C30 16 26 10 20 10Z" className={filled ? "ink-fill" : "ink-stroke"} />
    <path d="M20 10C20 6 22 4 24 4" className="ink-stroke" />
    <path d="M22 8C24 6 26 6 28 8" className="ink-stroke" />
  </svg>
);

export const CherryIcon: React.FC<PlantIconProps> = ({ className, filled }) => (
  <svg viewBox="0 0 40 40" className={className} fill="none">
    <circle cx="12" cy="28" r="6" className={filled ? "ink-fill" : "ink-stroke"} />
    <circle cx="28" cy="26" r="6" className={filled ? "ink-fill" : "ink-stroke"} />
    <path d="M12 22C12 14 20 8 20 8C20 8 28 14 28 20" className="ink-stroke" />
    <path d="M20 8L24 4" className="ink-stroke" />
  </svg>
);

export const CarrotIcon: React.FC<PlantIconProps> = ({ className, filled }) => (
  <svg viewBox="0 0 40 40" className={className} fill="none">
    <path d="M20 10L14 34L20 32L26 34L20 10Z" className={filled ? "ink-fill" : "ink-stroke"} />
    <path d="M16 10C14 6 16 4 18 4M20 8C20 4 22 2 24 4M24 10C26 6 24 4 22 4" className="ink-stroke" />
  </svg>
);

export const PumpkinIcon: React.FC<PlantIconProps> = ({ className, filled }) => (
  <svg viewBox="0 0 40 40" className={className} fill="none">
    <ellipse cx="20" cy="24" rx="12" ry="10" className={filled ? "ink-fill" : "ink-stroke"} />
    <path d="M20 14V8" className="ink-stroke" />
    <path d="M16 10C14 8 16 6 18 6" className="ink-stroke" />
    <path d="M12 20C12 20 16 18 20 18C24 18 28 20 28 20" className="ink-stroke" />
    <path d="M10 24L8 24M30 24L32 24" className="ink-stroke" />
  </svg>
);

export const AcornIcon: React.FC<PlantIconProps> = ({ className, filled }) => (
  <svg viewBox="0 0 40 40" className={className} fill="none">
    <path d="M12 18H28C28 18 30 16 30 14C30 12 26 10 20 10C14 10 10 12 10 14C10 16 12 18 12 18Z" className="ink-stroke" />
    <path d="M12 18C12 18 10 24 12 30C14 34 20 36 20 36C20 36 26 34 28 30C30 24 28 18 28 18" className={filled ? "ink-fill" : "ink-stroke"} />
    <path d="M20 10V6" className="ink-stroke" />
  </svg>
);

// Collect all icons for easy random access
export const allPlantIcons = [
  PlantIcon1, PlantIcon2, PlantIcon3, PlantIcon4, PlantIcon5,
  PlantIcon6, PlantIcon7, PlantIcon8, PlantIcon9, PlantIcon10,
  PlantIcon11, PlantIcon12, PlantIcon13, PlantIcon14, PlantIcon15,
  PlantIcon16, PlantIcon17, PlantIcon18, PlantIcon19, PlantIcon20,
  ButterflyIcon, BeeIcon, SnailIcon, LadybugIcon, BirdIcon,
  WateringCanIcon, SunIcon, CloudIcon, RainIcon, MushroomIcon,
  AppleIcon, CherryIcon, CarrotIcon, PumpkinIcon, AcornIcon
];

export const getPlantIconForDay = (dayOfYear: number) => {
  const index = dayOfYear % allPlantIcons.length;
  return allPlantIcons[index];
};
