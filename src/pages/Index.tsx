import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Navigation, NavTab } from "@/components/Navigation";
import { YearGrid } from "@/components/YearGrid";
import { TodayView } from "@/components/TodayView";
import { IconGallery } from "@/components/IconGallery";
import { JournalModal } from "@/components/JournalModal";
import { DayInfo, initializeJournal, isToday, getDaysInYear, getJournalStats } from "@/lib/journalData";
import { Button } from "@/components/ui/button";
import { PenLine, Sprout } from "lucide-react";

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

  // Calculate stats for the header
  const stats = useMemo(() => getJournalStats(currentYear), [currentYear, refreshKey]);

  return (
    <div className="min-h-screen bg-background text-foreground font-mono selection:bg-primary/20 flex flex-col">
      {/* 1. NEW HEADER 
         Replaces the floating stats pill. Anchors the top of the screen.
      */}
      <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-md border-b border-border/40">
        <div className="container max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          
          {/* Left: Branding */}
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold tracking-tight text-primary">{currentYear}</h1>
            <span className="hidden sm:inline-block text-muted-foreground text-sm">|</span>
            <span className="hidden sm:inline-block text-sm font-medium text-foreground/80">
              daily bloom
            </span>
          </div>

          {/* Center: Stats (Hidden on tiny screens, shown on mobile/desktop) */}
          <div className="text-xs font-mono text-muted-foreground hidden xs:block">
            <span className="text-primary font-bold">{stats.written}</span> {stats.written === 1 ? 'memory' : 'memories'} planted 
            <span className="mx-2 opacity-50">•</span>
            <span>{stats.remaining} days to grow</span>
          </div>

          {/* Right: Primary CTA */}
          <Button 
            size="sm" 
            onClick={() => setActiveTab("today")}
            className="bg-primary text-background hover:bg-primary/90 font-mono text-xs shadow-sm"
          >
            <PenLine className="w-3 h-3 mr-2" />
            Plant Today
          </Button>
        </div>
      </header>

      {/* 2. MAIN CONTENT AREA 
         Centered container with max-width to prevent "floating" feel.
      */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8 pb-32">
        {activeTab === "garden" && (
          <div className="animate-in fade-in duration-500">
             <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-1">Your Garden</h2>
                <p className="text-sm text-muted-foreground max-w-md">
                  Each dot represents a day. Click any plant to revisit that memory.
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
           <div className="animate-in fade-in duration-500">
             <IconGallery />
           </div>
        )}
      </main>

      {/* 3. NAVIGATION
         Kept at bottom, but will be updated in next file to include labels
      */}
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