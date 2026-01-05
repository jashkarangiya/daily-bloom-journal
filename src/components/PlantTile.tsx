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
        "w-8 h-8", 
        isClickable && "cursor-pointer hover:scale-110 group",
        day.isFuture && "cursor-default opacity-40"
      )}
    >
      {day.hasEntry ? (
        /* FILLED: Always Primary Color (Black/Blue) - No Mood Colors */
        <PlantIcon 
          className="w-6 h-6 drop-shadow-sm plant-filled text-primary transition-colors"
          filled={true} 
        />
      ) : day.isPast || day.isToday ? (
        /* EMPTY: Muted Outline */
        <PlantIcon 
          className="w-5 h-5 text-muted-foreground/40 plant-outlined group-hover:text-primary/70 transition-colors"
          filled={false} 
        />
      ) : (
        /* FUTURE: Dot */
        <div className="w-1.5 h-1.5 rounded-full border border-muted-foreground/30 bg-transparent" />
      )}

      {/* TODAY: Simple Ring */
      day.isToday && (
        <span className="absolute inset-0 rounded-full border border-primary/40 animate-pulse" />
      )}
    </div>
  );
};