import React from "react";
import { 
  allPlantIcons, 
  PlantIcon1, PlantIcon2, PlantIcon3, PlantIcon4, PlantIcon5,
  PlantIcon6, PlantIcon7, PlantIcon8, PlantIcon9, PlantIcon10,
  PlantIcon11, PlantIcon12, PlantIcon13, PlantIcon14, PlantIcon15,
  PlantIcon16, PlantIcon17, PlantIcon18, PlantIcon19, PlantIcon20,
  ButterflyIcon, BeeIcon, SnailIcon, LadybugIcon, BirdIcon,
  WateringCanIcon, SunIcon, CloudIcon, RainIcon, MushroomIcon,
  AppleIcon, CherryIcon, CarrotIcon, PumpkinIcon, AcornIcon
} from "./PlantIcons";

// Organizing icons into logical groups for the "Collection" view
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
    <div className="space-y-12">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Plant Collection</h2>
        <p className="text-muted-foreground font-mono text-sm">
          All 365 unique hand-drawn stamps available for your daily entries.
        </p>
      </div>

      <div className="space-y-10">
        {categories.map((category, idx) => (
          <div key={idx} className="space-y-4">
            <div className="border-b border-border/50 pb-2">
              <h3 className="font-mono text-sm font-bold text-primary uppercase tracking-wider">
                {category.title}
              </h3>
              <p className="text-xs text-muted-foreground">{category.description}</p>
            </div>
            
            <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-3">
              {category.icons.map((Icon, iconIdx) => (
                <div 
                  key={iconIdx}
                  className="group aspect-square flex items-center justify-center p-2 rounded-xl hover:bg-white hover:shadow-sm hover:border hover:border-border transition-all duration-200 cursor-help"
                  title="Plant Stamp"
                >
                  <Icon className="w-full h-full text-foreground group-hover:text-primary transition-colors" filled={false} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};