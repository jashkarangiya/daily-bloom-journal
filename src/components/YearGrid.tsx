import React, { useMemo } from "react";
import { PlantTile } from "./PlantTile";
import { getDaysInYear, DayInfo, getJournalStats } from "@/lib/journalData";
import { Leaf, Sprout } from "lucide-react";

interface YearGridProps {
  year: number;
  onDayClick: (day: DayInfo) => void;
}

export const YearGrid: React.FC<YearGridProps> = ({ year, onDayClick }) => {
  const days = useMemo(() => getDaysInYear(year), [year]);
  const stats = useMemo(() => getJournalStats(year), [year]);

  // Group days by month for visual organization
  const months = useMemo(() => {
    const grouped: { month: string; days: DayInfo[] }[] = [];
    let currentMonth = "";
    
    days.forEach((day) => {
      const monthName = day.date.toLocaleDateString('en-US', { month: 'long' });
      if (monthName !== currentMonth) {
        currentMonth = monthName;
        grouped.push({ month: monthName, days: [] });
      }
      grouped[grouped.length - 1].days.push(day);
    });
    
    return grouped;
  }, [days]);

  return (
    <div className="page-transition space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-5 py-2 bg-card rounded-full shadow-garden-sm border border-border">
          <Sprout className="w-5 h-5 text-primary" />
          <span className="font-display text-2xl text-foreground">{year}</span>
        </div>
        
        <p className="text-muted-foreground text-sm max-w-sm mx-auto font-medium">
          Watch your year grow, one plant at a time.
        </p>
      </div>

      {/* Stats */}
      <div className="flex justify-center gap-6">
        <div className="flex items-center gap-2 text-sm">
          <div className="w-8 h-8 rounded-lg bg-garden-ink-light flex items-center justify-center">
            <Leaf className="w-4 h-4 text-primary" />
          </div>
          <div>
            <span className="font-display text-xl text-foreground">{stats.written}</span>
            <span className="text-muted-foreground ml-1">days written</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-sm">
          <div className="w-8 h-8 rounded-lg dotted-placeholder flex items-center justify-center">
            <Sprout className="w-4 h-4 text-garden-dotted" />
          </div>
          <div>
            <span className="font-display text-xl text-foreground">{stats.remaining}</span>
            <span className="text-muted-foreground ml-1">days to grow</span>
          </div>
        </div>
      </div>

      {/* Month grids */}
      <div className="space-y-6">
        {months.map((monthData) => (
          <div key={monthData.month} className="space-y-3">
            <h3 className="font-display text-xl text-primary px-1">
              {monthData.month}
            </h3>
            <div className="grid grid-cols-7 sm:grid-cols-10 md:grid-cols-14 lg:grid-cols-16 gap-2">
              {monthData.days.map((day, index) => (
                <PlantTile
                  key={day.dayOfYear}
                  day={day}
                  onClick={onDayClick}
                  delay={index * 10}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer message */}
      <div className="text-center pt-8 pb-4">
        <p className="font-display text-lg text-muted-foreground">
          A yearly memory garden, growing one plant every day.
        </p>
      </div>
    </div>
  );
};
