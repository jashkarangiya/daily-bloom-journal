import React, { useMemo } from "react";
import { PlantTile } from "./PlantTile";
import { getDaysInYear, DayInfo } from "@/lib/journalData";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface YearGridProps {
  year: number;
  onDayClick: (day: DayInfo) => void;
}

export const YearGrid: React.FC<YearGridProps> = ({ year, onDayClick }) => {
  const days = useMemo(() => getDaysInYear(year), [year]);

  return (
    <div className="w-full">
      {/* Grid Logic:
         - Mobile: 7 cols (weeks)
         - Tablet: 14 cols (2 weeks)
         - Desktop: 21 cols (3 weeks) 
         This creates a nice dense block of texture.
      */}
      <div className="grid grid-cols-7 sm:grid-cols-14 md:grid-cols-21 gap-x-2 gap-y-3 sm:gap-x-3 sm:gap-y-4 justify-items-center">
        <TooltipProvider delayDuration={100}>
          {days.map((day) => (
            <Tooltip key={day.dayOfYear}>
              <TooltipTrigger asChild>
                <div className="relative">
                   <PlantTile
                     day={day}
                     onClick={onDayClick}
                   />
                </div>
              </TooltipTrigger>
              <TooltipContent 
                side="top" 
                className="bg-primary text-background font-mono text-xs px-2 py-1"
              >
                <p>{day.date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>
    </div>
  );
};