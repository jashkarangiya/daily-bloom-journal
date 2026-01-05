import React from "react";
import { cn } from "@/lib/utils";
import { DayInfo } from "@/lib/journalData";
import { getPlantIconForDay } from "./PlantIcons";

interface PlantTileProps {
  day: DayInfo;
  onClick: (day: DayInfo) => void;
  delay?: number;
}

export const PlantTile: React.FC<PlantTileProps> = ({ day, onClick, delay = 0 }) => {
  const PlantIcon = getPlantIconForDay(day.dayOfYear);
  const isClickable = !day.isFuture;

  return (
    <button
      onClick={() => isClickable && onClick(day)}
      disabled={day.isFuture}
      className={cn(
        "w-full aspect-square flex items-center justify-center transition-all duration-200",
        "rounded-sm p-0.5",
        isClickable && "hover:bg-garden-ink-light hover:scale-110 cursor-pointer",
        day.isFuture && "opacity-30 cursor-default",
        day.isToday && "ring-1 ring-primary ring-offset-1 ring-offset-background rounded-md"
      )}
      title={day.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
    >
      {day.hasEntry ? (
        <PlantIcon 
          className="w-full h-full" 
          filled={true} 
        />
      ) : (
        <div className="w-1 h-1 rounded-full bg-garden-dotted" />
      )}
    </button>
  );
};
