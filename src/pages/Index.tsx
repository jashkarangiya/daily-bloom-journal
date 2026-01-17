import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Navigation, NavTab } from "@/components/Navigation";
import { YearGrid } from "@/components/YearGrid";
import { TodayView } from "@/components/TodayView";
import { JournalModal } from "@/components/JournalModal";
import { SettingsModal } from "@/components/SettingsModal";
import { StatsView } from "@/components/StatsView";
import { DailyQuote } from "@/components/DailyQuote";
import { DayInfo, initializeJournal, getJournalStats } from "@/lib/journalData";
import { Settings2, ChevronLeft, ChevronRight, Search, Sun, Moon } from "lucide-react";
import { SearchResults } from "@/components/SearchResults";

const Index: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavTab>("garden");
  const [selectedDay, setSelectedDay] = useState<DayInfo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    initializeJournal();
    // Initialize Theme
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

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
      <header className="sticky top-0 z-40 w-full bg-background/90 backdrop-blur-xl border-b border-border/40 transition-colors duration-300">
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

          {/* SEARCH BAR */}
          <div className="hidden sm:flex items-center bg-secondary/30 rounded-full px-3 py-1.5 border border-transparent focus-within:border-primary/20 transition-all w-64 ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
            <Search className="w-4 h-4 text-muted-foreground mr-2" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search memories..."
              className="bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground/50 w-full font-sans text-foreground"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="text-xs font-sans text-muted-foreground hidden lg:flex items-center gap-4 mr-2">
              <span className="bg-secondary/50 px-3 py-1 rounded-full">
                <span className="text-foreground font-bold">{stats.written}</span> memories
              </span>
              {stats.streak > 0 && (
                <span className="bg-secondary/50 px-3 py-1 rounded-full animate-in fade-in">
                  <span className="text-foreground font-bold">{stats.streak}</span> streak
                </span>
              )}
            </div>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-secondary/80 transition-colors text-muted-foreground hover:text-primary"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setIsSettingsOpen(true)}
              className="p-2 rounded-full hover:bg-secondary/80 transition-colors text-muted-foreground hover:text-primary"
            >
              <Settings2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-10 pb-32">
        {searchTerm ? (
          <SearchResults searchTerm={searchTerm} onDayClick={handleDayClick} />
        ) : (
          <>
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
                <DailyQuote />
                <TodayView onSave={handleSave} />
              </div>
            )}
          </>
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