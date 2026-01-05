import React from "react";
import { cn } from "@/lib/utils";
import { DayInfo } from "@/lib/journalData";
import { getPlantIconForDay } from "./PlantIcons";

interface PlantTileProps {
  day: DayInfo;
  onClick: (day: DayInfo) => void;
}

export const PlantTile: React.FC<PlantTileProps> = ({ day, onClick }) => {
  const PlantIcon = getPlantIconForDay(day.dayOfYear);
  const isClickable = !day.isFuture;

  return (
    <div
      onClick={() => isClickable && onClick(day)}
      className={cn(
        "relative flex items-center justify-center transition-all duration-300",
        "w-8 h-8 sm:w-10 sm:h-10 rounded-full", // Rounded full for hover effect
        isClickable && "cursor-pointer hover:bg-accent hover:scale-110 hover:z-10",
        day.isFuture && "cursor-default",
        // TODAY STATE: Add a subtle border ring (Halo)
        day.isToday && "ring-2 ring-primary/30 bg-primary/5"
      )}
    >
      {day.hasEntry ? (
        <PlantIcon 
          className="w-3/4 h-3/4 text-primary drop-shadow-sm stroke-2" 
          filled={true} 
        />
      ) : day.isPast || day.isToday ? (
        <PlantIcon 
          className="w-3/4 h-3/4 text-primary/30" 
          filled={false} 
        />
      ) : (
        // Future Dot: Small but visible enough to define the grid
        <div className="w-1 h-1 rounded-full bg-primary/10" />
      )}
    </div>
  );
};