import React, { useMemo } from "react";
import { getEntriesFromStorage, MoodType } from "@/lib/journalData";
import { Sun, Flower2, Leaf, Cloud, Moon, CloudRain } from "lucide-react";

interface StatsViewProps {
  year: number;
}

export const StatsView: React.FC<StatsViewProps> = ({ year }) => {
  const stats = useMemo(() => {
    const entries = getEntriesFromStorage();
    const yearEntries = Object.values(entries).filter(e => e.date.startsWith(year.toString()));
    
    const counts: Record<string, number> = {
      amazing: 0, good: 0, calm: 0, neutral: 0, tired: 0, rough: 0
    };

    yearEntries.forEach(e => {
      if (e.mood && counts[e.mood] !== undefined) {
        counts[e.mood]++;
      }
    });

    return counts;
  }, [year]);

  const moodConfig = [
    { id: 'amazing', icon: Sun, label: 'Amazing' },
    { id: 'good', icon: Flower2, label: 'Good' },
    { id: 'calm', icon: Leaf, label: 'Calm' },
    { id: 'neutral', icon: Cloud, label: 'Neutral' },
    { id: 'tired', icon: Moon, label: 'Tired' },
    { id: 'rough', icon: CloudRain, label: 'Rough' },
  ];

  const total = Object.values(stats).reduce((a, b) => a + b, 0);

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {moodConfig.map(({ id, icon: Icon, label }) => {
          const count = stats[id] || 0;
          const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
          
          return (
            <div key={id} className="bg-secondary/20 border border-border/50 rounded-2xl p-4 flex flex-col items-center justify-center gap-2">
              <Icon className="w-6 h-6 text-primary stroke-[1.5]" />
              <div className="text-center">
                <span className="block text-xl font-bold text-foreground font-mono">{count}</span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest">{label}</span>
              </div>
              <div className="w-full bg-secondary h-1 rounded-full mt-1 overflow-hidden">
                <div 
                  className="bg-primary h-full transition-all duration-1000" 
                  style={{ width: `${percentage}%` }} 
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};