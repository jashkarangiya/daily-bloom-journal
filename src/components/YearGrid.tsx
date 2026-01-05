import React, { useMemo } from "react";
import { PlantTile } from "./PlantTile";
import { getDaysInYear, DayInfo, getJournalStats } from "@/lib/journalData";

interface YearGridProps {
  year: number;
  onDayClick: (day: DayInfo) => void;
}

export const YearGrid: React.FC<YearGridProps> = ({ year, onDayClick }) => {
  const days = useMemo(() => getDaysInYear(year), [year]);
  const stats = useMemo(() => getJournalStats(year), [year]);

  return (
    <div className="page-transition space-y-6">
      {/* Year pill */}
      <div className="flex justify-start">
        <div className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-full font-mono text-sm">
          {year}
        </div>
      </div>

      {/* Dense grid like the reference - all 365 days in one view */}
      <div className="grid grid-cols-14 sm:grid-cols-18 md:grid-cols-22 lg:grid-cols-26 gap-0.5">
        {days.map((day, index) => (
          <PlantTile
            key={day.dayOfYear}
            day={day}
            onClick={onDayClick}
            delay={0}
          />
        ))}
      </div>

      {/* Stats footer */}
      <div className="flex justify-between items-center text-xs text-muted-foreground font-mono pt-4 border-t border-border">
        <span>{year}</span>
        <span>{stats.remaining} days to grow</span>
      </div>
    </div>
  );
};
