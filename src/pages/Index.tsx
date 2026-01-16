import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Navigation, NavTab } from "@/components/Navigation";
import { YearGrid } from "@/components/YearGrid";
import { TodayView } from "@/components/TodayView";
import { JournalModal } from "@/components/JournalModal";
import { SettingsModal } from "@/components/SettingsModal";
import { StatsView } from "@/components/StatsView"; // Import new Stats
import { DayInfo, initializeJournal, getJournalStats } from "@/lib/journalData";
import { Settings2, ChevronLeft, ChevronRight } from "lucide-react";

const Index: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavTab>("garden");
  const [selectedDay, setSelectedDay] = useState<DayInfo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    initializeJournal();
  }, []);

  const handleDayClick = useCallback((day: DayInfo) => {
    if (day.isFuture) return;
    setSelectedDay(day);
    setIsModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
    setSelectedDay(null);
  }, []);

  const handleSave = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  const stats = useMemo(() => getJournalStats(currentYear), [currentYear, refreshKey]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* HEADER */}
      <header className="sticky top-0 z-40 w-full bg-background/90 backdrop-blur-xl border-b border-border/40">
        <div className="container max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <button onClick={() => setCurrentYear(y => y - 1)} className="p-1 hover:bg-secondary rounded-full transition-colors text-muted-foreground">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <h1 className="text-xl font-bold tracking-tight text-primary min-w-[3rem] text-center">{currentYear}</h1>
              <button onClick={() => setCurrentYear(y => y + 1)} className="p-1 hover:bg-secondary rounded-full transition-colors text-muted-foreground">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <span className="text-muted-foreground/30 h-4 w-[1px] bg-border"></span>
            <span className="text-xl font-serif font-medium text-foreground tracking-wide hidden xs:block">Daily Bloom</span>
          </div>

          <div className="text-xs font-sans text-muted-foreground hidden md:flex items-center gap-4">
            <span className="bg-secondary/50 px-3 py-1 rounded-full">
              <span className="text-foreground font-bold">{stats.written}</span> memories
            </span>
            {stats.streak > 0 && (
              <span className="bg-secondary/50 px-3 py-1 rounded-full animate-in fade-in">
                <span className="text-foreground font-bold">{stats.streak}</span> day streak
              </span>
            )}
          </div>

          <button
            onClick={() => setIsSettingsOpen(true)}
            className="p-2 rounded-full hover:bg-secondary/80 transition-colors text-muted-foreground hover:text-primary"
          >
            <Settings2 className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-10 pb-32">
        {activeTab === "garden" && (
          <div className="space-y-16">
            <YearGrid
              key={`${currentYear}-${refreshKey}`}
              year={currentYear}
              onDayClick={handleDayClick}
            />

            {/* Show stats if there is data */}
            {stats.written > 0 && (
              <div className="pt-8 border-t border-border/40">
                <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-6">Yearly Breakdown</h3>
                <StatsView year={currentYear} />
              </div>
            )}
          </div>
        )}

        {activeTab === "today" && (
          <div className="max-w-xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
            <TodayView onSave={handleSave} />
          </div>
        )}
      </main>

      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

      <JournalModal
        day={selectedDay}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleSave}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onDataChange={handleSave}
      />
    </div>
  );
};

export default Index;