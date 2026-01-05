import React from "react";
import { getPlantIconForDay } from "./PlantIcons";
import { DayInfo } from "@/lib/journalData";
import { cn } from "@/lib/utils";

interface PlantTileProps {
  day: DayInfo;
  onClick: (day: DayInfo) => void;
  delay?: number;
}

export const PlantTile: React.FC<PlantTileProps> = ({ day, onClick, delay = 0 }) => {
  const PlantIcon = getPlantIconForDay(day.dayOfYear);
  const hasEntry = day.hasEntry;
  const isClickable = !day.isFuture;

  return (
    <button
      onClick={() => isClickable && onClick(day)}
      disabled={day.isFuture}
      className={cn(
        "plant-tile relative aspect-square rounded-lg p-1 transition-all duration-300",
        "focus:outline-none focus:ring-2 focus:ring-primary/50",
        "group",
        hasEntry && "bg-garden-ink-light hover:bg-accent",
        !hasEntry && !day.isFuture && "dotted-placeholder hover:border-primary hover:bg-accent/50",
        day.isFuture && "opacity-30 cursor-not-allowed",
        day.isToday && "ring-2 ring-primary ring-offset-2 ring-offset-background"
      )}
      style={{
        animationDelay: `${delay}ms`,
      }}
    >
      {hasEntry ? (
        <PlantIcon
          className="w-full h-full grow-animation"
          filled={true}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-garden-dotted group-hover:bg-primary/50 transition-colors" />
        </div>
      )}
      
      {/* Tooltip on hover */}
      <div className={cn(
        "absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1",
        "bg-foreground text-background text-xs font-medium rounded-md",
        "opacity-0 group-hover:opacity-100 transition-opacity duration-200",
        "pointer-events-none whitespace-nowrap z-10",
        "shadow-garden-sm"
      )}>
        {day.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        {day.isToday && <span className="ml-1 text-primary-foreground/80">• Today</span>}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-foreground" />
      </div>
    </button>
  );
};
