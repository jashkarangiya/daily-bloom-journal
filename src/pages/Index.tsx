import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Navigation, NavTab } from "@/components/Navigation";
import { YearGrid } from "@/components/YearGrid";
import { TodayView } from "@/components/TodayView";
import { IconGallery } from "@/components/IconGallery";
import { JournalModal } from "@/components/JournalModal";
import { DayInfo, initializeJournal, getJournalStats } from "@/lib/journalData";

const Index: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavTab>("garden");
  const [selectedDay, setSelectedDay] = useState<DayInfo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    initializeJournal();
  }, []);

  const handleDayClick = useCallback((day: DayInfo) => {
    if (day.isToday) {
      setActiveTab("today");
    } else {
      setSelectedDay(day);
      setIsModalOpen(true);
    }
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
    <div className="min-h-screen bg-background text-foreground font-mono flex flex-col">
      {/* HEADER */}
      <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-md border-b border-border/30">
        <div className="container max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold tracking-tight text-primary">{currentYear}</h1>
            <span className="text-muted-foreground/40">/</span>
            <span className="text-sm font-medium text-muted-foreground tracking-wide">daily bloom</span>
          </div>

          <div className="text-xs font-mono text-muted-foreground hidden sm:block bg-secondary/50 px-3 py-1 rounded-full">
            <span className="text-foreground font-bold">{stats.written}</span> memories 
            <span className="mx-2 text-muted-foreground/30">•</span>
            {stats.remaining} days left
          </div>
          
          {/* Spacer for balance */}
          <div className="w-[10px] sm:w-[100px]" />
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-10 pb-32">
        {activeTab === "garden" && (
          <div>
             <div className="mb-10 max-w-lg">
                <h2 className="text-3xl font-bold text-foreground mb-3 tracking-tight">Your Garden</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Each dot is a day. Click to plant a memory, or watch your garden grow in color over time.
                </p>
             </div>
             <YearGrid
               key={refreshKey}
               year={currentYear}
               onDayClick={handleDayClick}
             />
          </div>
        )}

        {activeTab === "today" && (
          <div className="max-w-xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
            <TodayView onSave={handleSave} />
          </div>
        )}

        {activeTab === "gallery" && (
           <IconGallery />
        )}
      </main>

      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

      <JournalModal
        day={selectedDay}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleSave}
      />
    </div>
  );
};

export default Index;