import React, { useState, useEffect, useMemo, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { getPlantIconForDay } from "./PlantIcons";
import {
  getDayOfYear,
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
      mood: 'okay',
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

  return (
    <div className="page-transition max-w-md mx-auto space-y-6">
      {/* Today card */}
      <div className="bg-card text-card-foreground rounded-2xl p-6 space-y-6 border border-border shadow-sm">
        <div className="flex items-center justify-between">
           <Badge className="bg-primary/10 text-primary border-0 text-xs px-3 py-1 rounded-full font-mono lowercase hover:bg-primary/20">
            today
          </Badge>
          <div className="text-right">
            <p className="font-mono text-sm text-foreground lowercase">
              {today.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()}
            </p>
            {/* UPDATED: DD/MM Format */}
            <p className="font-mono text-xs text-muted-foreground">
              {today.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' })}
            </p>
          </div>
        </div>

        <div className="flex justify-center py-4">
          <div className="w-24 h-24 rounded-xl bg-secondary/50 border border-border p-4 flex items-center justify-center">
            <PlantIcon className="w-full h-full text-primary plant-filled" filled={!!content.trim() || photos.length > 0} />
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
                <div key={index} className="relative aspect-square rounded-xl overflow-hidden group border border-border">
                  <img src={photo} alt="" className="w-full h-full object-cover" />
                  <button
                    onClick={() => removePhoto(index)}
                    className="absolute top-1 right-1 p-1 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors font-mono lowercase"
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
            className="min-h-[160px] resize-none bg-secondary/30 border-border rounded-xl text-foreground placeholder:text-muted-foreground/70 focus:ring-1 focus:ring-primary font-mono text-sm leading-relaxed p-4 lowercase"
          />

          <div className="flex items-center justify-between text-xs text-muted-foreground px-1 font-mono">
            <span>{content.length} characters</span>
            <span>day {dayOfYear} of 365</span>
          </div>
        </div>

        {/* Save button */}
        <div className="flex justify-end pt-2">
          <Button
            onClick={handleSave}
            disabled={(!content.trim() && photos.length === 0) || isSaving}
            className="rounded-full px-8 py-2 text-sm bg-primary text-primary-foreground hover:bg-primary/90 font-mono lowercase"
          >
            {isSaving ? "saving..." : showSuccess ? "saved" : "done"}
          </Button>
        </div>
      </div>
    </div>
  );
};