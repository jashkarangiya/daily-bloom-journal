import React, { useState, useEffect, useCallback } from "react";
import { Navigation, NavTab } from "@/components/Navigation";
import { YearGrid } from "@/components/YearGrid";
import { TodayView } from "@/components/TodayView";
import { IconGallery } from "@/components/IconGallery";
import { JournalModal } from "@/components/JournalModal";
import { DayInfo, initializeJournal, isToday, getDaysInYear } from "@/lib/journalData";

const Index: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavTab>("garden");
  const [selectedDay, setSelectedDay] = useState<DayInfo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const currentYear = new Date().getFullYear();

  // Initialize journal with sample data
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
    // Force refresh of the grid
    setRefreshKey((prev) => prev + 1);
  }, []);

  const handleTabChange = useCallback((tab: NavTab) => {
    setActiveTab(tab);
  }, []);

  // Get fresh day data when refreshKey changes
  const getTodayDayInfo = useCallback((): DayInfo | null => {
    const days = getDaysInYear(currentYear);
    return days.find((d) => isToday(d.date)) || null;
  }, [currentYear, refreshKey]);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Main content */}
      <main className="container max-w-4xl mx-auto px-4 py-8">
        {activeTab === "garden" && (
          <YearGrid
            key={refreshKey}
            year={currentYear}
            onDayClick={handleDayClick}
          />
        )}

        {activeTab === "today" && (
          <TodayView onSave={handleSave} />
        )}

        {activeTab === "gallery" && (
          <IconGallery />
        )}
      </main>

      {/* Navigation */}
      <Navigation activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Journal modal for past days */}
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
