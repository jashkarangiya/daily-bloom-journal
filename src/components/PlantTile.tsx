import React from "react";
import { cn } from "@/lib/utils";
import { DayInfo } from "@/lib/journalData";
import { 
  Sun,        // Amazing
  Flower2,    // Good
  Leaf,       // Calm
  Cloud,      // Neutral
  Moon,       // Tired
  CloudRain,  // Rough
  Circle 
} from "lucide-react"; 

interface PlantTileProps {
  day: DayInfo;
  onClick: (day: DayInfo) => void;
}

export const PlantTile: React.FC<PlantTileProps> = ({ day, onClick }) => {
  const isClickable = !day.isFuture;

  // ICON LOGIC: Map 6 moods to specific shapes
  const getIcon = () => {
    if (!day.entry) return Circle; 
    
    switch (day.entry.mood) {
      case 'amazing': return Sun;
      case 'good': return Flower2;
      case 'calm': return Leaf;
      case 'neutral': return Cloud;
      case 'tired': return Moon;
      case 'rough': return CloudRain;
      default: return Flower2;
    }
  };

  const Icon = getIcon();

  return (
    <button
      onClick={() => isClickable && onClick(day)}
      disabled={!isClickable}
      className={cn(
        "group relative flex items-center justify-center transition-all duration-300",
        "w-10 h-10", 
        isClickable ? "cursor-pointer" : "cursor-default",
      )}
    >
      {day.hasEntry ? (
        // FILLED ENTRY: Solid ink look
        <Icon 
          className={cn(
            "w-5 h-5 transition-all duration-300",
            "text-primary fill-primary/10 stroke-[1.5]", 
            "group-hover:scale-110"
          )} 
        />
      ) : day.isPast || day.isToday ? (
        // EMPTY PAST DAY
        <div className={cn(
          "w-1.5 h-1.5 rounded-full bg-muted-foreground/40 transition-all",
          "group-hover:w-2 group-hover:h-2 group-hover:bg-primary/60"
        )} />
      ) : (
        // FUTURE DAY
        <div className="w-1 h-1 rounded-full bg-muted-foreground/10" />
      )}

      {/* TODAY INDICATOR */}
      {day.isToday && (
        <span className="absolute inset-0 rounded-full border-2 border-primary/30 animate-pulse pointer-events-none" />
      )}
    </button>
  );
};