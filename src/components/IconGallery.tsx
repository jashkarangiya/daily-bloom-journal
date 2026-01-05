import React from "react";
import { 
  PlantIcon1, PlantIcon2, PlantIcon3, PlantIcon4, PlantIcon5,
  PlantIcon6, PlantIcon7, PlantIcon8, PlantIcon9, PlantIcon10,
  PlantIcon11, PlantIcon12, PlantIcon13, PlantIcon14, PlantIcon15,
  PlantIcon16, PlantIcon17, PlantIcon18, PlantIcon19, PlantIcon20,
  ButterflyIcon, BeeIcon, SnailIcon, LadybugIcon, BirdIcon,
  WateringCanIcon, SunIcon, CloudIcon, RainIcon, MushroomIcon,
  AppleIcon, CherryIcon, CarrotIcon, PumpkinIcon, AcornIcon
} from "./PlantIcons";

const categories = [
  {
    title: "Flowers & Flora",
    description: "The core blooms of your garden.",
    icons: [PlantIcon1, PlantIcon2, PlantIcon3, PlantIcon4, PlantIcon5, PlantIcon6, PlantIcon7, PlantIcon8, PlantIcon9, PlantIcon10]
  },
  {
    title: "Trees & Shrubs",
    description: "Strong roots and big growth.",
    icons: [PlantIcon11, PlantIcon12, PlantIcon13, PlantIcon14, PlantIcon15, PlantIcon16, PlantIcon17, PlantIcon18, PlantIcon19, PlantIcon20]
  },
  {
    title: "Garden Visitors",
    description: "Little friends that stop by.",
    icons: [ButterflyIcon, BeeIcon, SnailIcon, LadybugIcon, BirdIcon, MushroomIcon]
  },
  {
    title: "Harvest & Weather",
    description: "Fruits of labor and skies above.",
    icons: [AppleIcon, CherryIcon, CarrotIcon, PumpkinIcon, AcornIcon, WateringCanIcon, SunIcon, CloudIcon, RainIcon]
  }
];

export const IconGallery: React.FC = () => {
  return (
    <div className="space-y-12 animate-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2 mb-8">
        <h2 className="text-3xl font-bold text-foreground tracking-tight">Collection</h2>
        <p className="text-muted-foreground font-mono text-sm max-w-lg">
          The complete library of 365 hand-drawn stamps.
        </p>
      </div>

      <div className="grid gap-12">
        {categories.map((category, idx) => (
          <div key={idx} className="space-y-5">
            <div className="border-b border-border/60 pb-3">
              <h3 className="font-mono text-sm font-bold text-primary uppercase tracking-wider">
                {category.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">{category.description}</p>
            </div>
            
            <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-4">
              {category.icons.map((Icon, iconIdx) => (
                <div 
                  key={iconIdx}
                  className="group aspect-square flex items-center justify-center p-2 rounded-xl bg-secondary/30 border border-transparent hover:bg-background hover:shadow-md hover:border-border transition-all duration-200"
                >
                  {/* Explicit text color ensures visibility */}
                  <Icon className="w-full h-full text-foreground/80 group-hover:text-primary transition-colors ink-stroke" filled={false} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};