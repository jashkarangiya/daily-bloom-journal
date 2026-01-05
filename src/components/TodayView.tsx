import React, { useState, useEffect, useMemo, useRef } from "react";
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
import { Check, Camera, X } from "lucide-react";

interface TodayViewProps {
  onSave: () => void;
}

export const TodayView: React.FC<TodayViewProps> = ({ onSave }) => {
  const today = useMemo(() => new Date(), []);
  const dayOfYear = getDayOfYear(today);
  const dateStr = formatDate(today);
  
  const [content, setContent] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const PlantIcon = getPlantIconForDay(dayOfYear);

  useEffect(() => {
    const entries = getEntriesFromStorage();
    if (entries[dateStr]) {
      setContent(entries[dateStr].content);
      setPhotos(entries[dateStr].photos || []);
    }
  }, [dateStr]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPhotos((prev) => [...prev, event.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (!content.trim() && photos.length === 0) return;

    setIsSaving(true);

    const entry: JournalEntry = {
      date: dateStr,
      content: content.trim(),
      photos: photos,
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
    "what made you smile today?",
    "what's one thing you learned?",
    "describe a small moment worth remembering.",
    "what are you grateful for right now?",
    "how did you take care of yourself today?",
  ];

  const randomPrompt = useMemo(
    () => prompts[dayOfYear % prompts.length],
    [dayOfYear]
  );

  return (
    <div className="page-transition max-w-md mx-auto space-y-6">
      {/* Header tagline */}
      <div className="text-center space-y-1">
        <p className="text-muted-foreground text-sm font-mono flex items-center justify-center gap-2">
          reflect on <span className="inline-block w-5 h-5"><PlantIcon className="w-full h-full" filled={false} /></span> each day,
        </p>
        <p className="text-muted-foreground text-sm font-mono">
          with daily journal entries
        </p>
      </div>

      {/* Today card */}
      <div className="bg-card rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-center">
          <Badge className="bg-primary/10 text-primary border-0 text-xs px-4 py-1 rounded-full font-mono lowercase">
            today
          </Badge>
        </div>

        <div className="flex justify-center gap-4">
          <div className="w-20 h-20 rounded-xl bg-card border border-border p-3 flex items-center justify-center">
            <PlantIcon className="w-full h-full" filled={!!content.trim() || photos.length > 0} />
          </div>
        </div>

        <div className="text-center">
          <p className="font-mono text-sm text-foreground lowercase">
            {today.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()}
          </p>
          <p className="font-mono text-xs text-muted-foreground">
            {today.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' })}
          </p>
        </div>
      </div>

      {/* Photo uploads */}
      <div className="space-y-3">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handlePhotoUpload}
          className="hidden"
        />
        
        {photos.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {photos.map((photo, index) => (
              <div key={index} className="relative aspect-square rounded-xl overflow-hidden group">
                <img src={photo} alt="" className="w-full h-full object-cover" />
                <button
                  onClick={() => removePhoto(index)}
                  className="absolute top-1 right-1 p-1 bg-background/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors font-mono lowercase"
        >
          <Camera className="w-4 h-4" />
          add photo memory
        </button>
      </div>

      {/* Journal input */}
      <div className="space-y-3">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="add a memory..."
          className="min-h-[160px] resize-none bg-card border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:ring-1 focus:ring-primary/30 focus:border-primary transition-all font-mono text-sm leading-relaxed p-4 lowercase"
        />

        <div className="flex items-center justify-between text-xs text-muted-foreground px-1 font-mono">
          <span>{content.length} characters</span>
          <span>day {dayOfYear} of 365</span>
        </div>
      </div>

      {/* Save button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={(!content.trim() && photos.length === 0) || isSaving}
          className="rounded-full px-6 py-2 text-sm bg-primary hover:bg-primary/90 text-primary-foreground font-mono lowercase"
        >
          {isSaving ? (
            <span className="flex items-center gap-2">
              <div className="w-3 h-3 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              saving...
            </span>
          ) : showSuccess ? (
            <span className="flex items-center gap-1">
              <Check className="w-4 h-4" />
              saved
            </span>
          ) : (
            "Done"
          )}
        </Button>
      </div>
    </div>
  );
};
