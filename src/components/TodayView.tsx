import React, { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { getPlantIconForDay } from "./PlantIcons";
import {
  getDayOfYear,
  formatDisplayDate,
  getEntriesFromStorage,
  saveEntryToStorage,
  JournalEntry,
  formatDate,
} from "@/lib/journalData";
import { Check, Sparkles } from "lucide-react";

interface TodayViewProps {
  onSave: () => void;
}

export const TodayView: React.FC<TodayViewProps> = ({ onSave }) => {
  const today = useMemo(() => new Date(), []);
  const dayOfYear = getDayOfYear(today);
  const dateStr = formatDate(today);
  
  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const PlantIcon = getPlantIconForDay(dayOfYear);

  useEffect(() => {
    const entries = getEntriesFromStorage();
    if (entries[dateStr]) {
      setContent(entries[dateStr].content);
    }
  }, [dateStr]);

  const handleSave = async () => {
    if (!content.trim()) return;

    setIsSaving(true);

    const entry: JournalEntry = {
      date: dateStr,
      content: content.trim(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    saveEntryToStorage(entry);

    await new Promise((resolve) => setTimeout(resolve, 400));

    setIsSaving(false);
    setShowSuccess(true);
    onSave();

    setTimeout(() => setShowSuccess(false), 2000);
  };

  const prompts = [
    "What made you smile today?",
    "What's one thing you learned?",
    "Describe a small moment worth remembering.",
    "What are you grateful for right now?",
    "How did you take care of yourself today?",
  ];

  const randomPrompt = useMemo(
    () => prompts[dayOfYear % prompts.length],
    [dayOfYear]
  );

  return (
    <div className="page-transition max-w-md mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="w-24 h-24 mx-auto rounded-2xl bg-garden-ink-light p-4 float-animation shadow-garden">
          <PlantIcon className="w-full h-full" filled={!!content.trim()} />
        </div>

        <div className="space-y-2">
          <Badge className="bg-primary text-primary-foreground font-medium px-4 py-1">
            Today
          </Badge>
          <h1 className="font-display text-3xl text-foreground">
            {formatDisplayDate(today)}
          </h1>
        </div>
      </div>

      {/* Prompt */}
      <div className="text-center">
        <p className="text-muted-foreground text-sm italic flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          {randomPrompt}
        </p>
      </div>

      {/* Journal input */}
      <div className="space-y-4">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Add a memory..."
          className="min-h-[220px] resize-none bg-card border-border rounded-2xl text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all shadow-garden-sm text-base leading-relaxed p-4"
        />

        <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
          <span>{content.length} characters</span>
          <span>Day {dayOfYear} of 365</span>
        </div>
      </div>

      {/* Save button */}
      <div className="flex justify-center">
        <Button
          onClick={handleSave}
          disabled={!content.trim() || isSaving}
          size="lg"
          className="rounded-full px-8 py-6 text-base bg-primary hover:bg-primary/90 text-primary-foreground shadow-garden transition-all duration-300 hover:shadow-garden-lg hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
        >
          {isSaving ? (
            <span className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              Planting...
            </span>
          ) : showSuccess ? (
            <span className="flex items-center gap-2 text-primary-foreground">
              <Check className="w-5 h-5" />
              Planted!
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Check className="w-5 h-5" />
              Save Memory
            </span>
          )}
        </Button>
      </div>

      {/* Motivational footer */}
      <div className="text-center pt-4">
        <p className="font-display text-lg text-muted-foreground">
          Every entry plants a seed in your garden.
        </p>
      </div>
    </div>
  );
};
