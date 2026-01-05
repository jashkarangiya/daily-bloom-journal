import React, { useMemo } from "react";
import { PlantTile } from "./PlantTile";
import { getMonthsInYear, DayInfo } from "@/lib/journalData";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface YearGridProps {
  year: number;
  onDayClick: (day: DayInfo) => void;
}

export const YearGrid: React.FC<YearGridProps> = ({ year, onDayClick }) => {
  const months = useMemo(() => getMonthsInYear(year), [year]);

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10">
        <TooltipProvider delayDuration={0}>
          {months.map((month) => (
            <div key={month.name} className="flex flex-col space-y-3">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest pl-1">
                {month.name}
              </h3>

              <div className="grid grid-cols-7 gap-1 mb-1 px-1">
                {['S','M','T','W','T','F','S'].map((d, i) => (
                  <span key={i} className="text-[10px] text-center text-muted-foreground/30 font-mono select-none">{d}</span>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1 p-3 bg-secondary/20 rounded-2xl border border-border/40">
                {Array.from({ length: month.days[0].date.getDay() }).map((_, i) => (
                  <div key={`empty-${i}`} className="w-8 h-8" />
                ))}

                {month.days.map((day) => (
                  <Tooltip key={day.dayOfYear}>
                    <TooltipTrigger asChild>
                      <div>
                        <PlantTile day={day} onClick={onDayClick} />
                      </div>
                    </TooltipTrigger>
                    {/* UPDATED: Uses en-GB to force DD/MM format */}
                    <TooltipContent className="bg-primary text-primary-foreground text-xs font-mono border border-border">
                      {day.date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' })}
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>
          ))}
        </TooltipProvider>
      </div>
    </div>
  );
};