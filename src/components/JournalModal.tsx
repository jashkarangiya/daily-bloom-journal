import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  DayInfo, saveEntryToStorage, JournalEntry, formatDate, deleteEntryFromStorage, MoodType 
} from "@/lib/journalData";
import { 
  Trash2, X, Camera, 
  Sun, Flower2, Leaf, Cloud, Moon, CloudRain 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface JournalModalProps {
  day: DayInfo | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

export const JournalModal: React.FC<JournalModalProps> = ({
  day,
  isOpen,
  onClose,
  onSave,
}) => {
  const [content, setContent] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [mood, setMood] = useState<MoodType>('good');
  const [isSaving, setIsSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false); 
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (day?.entry) {
      setContent(day.entry.content);
      setPhotos(day.entry.photos || []);
      setMood(day.entry.mood || 'good');
    } else {
      setContent("");
      setPhotos([]);
      setMood('good');
    }
    setDeleteConfirm(false);
  }, [day]);

  if (!day) return null;

  const cycleMood = () => {
    const moods: MoodType[] = ['amazing', 'good', 'calm', 'neutral', 'tired', 'rough'];
    const currentIndex = moods.indexOf(mood || 'good');
    const nextIndex = (currentIndex + 1) % moods.length;
    setMood(moods[nextIndex]);
  };

  const getMoodIcon = () => {
    const iconClass = "w-8 h-8 text-primary stroke-[1.5]";
    switch (mood) {
      case 'amazing': return <Sun className={iconClass} />;
      case 'good': return <Flower2 className={iconClass} />;
      case 'calm': return <Leaf className={iconClass} />;
      case 'neutral': return <Cloud className={iconClass} />;
      case 'tired': return <Moon className={iconClass} />;
      case 'rough': return <CloudRain className={iconClass} />;
      default: return <Flower2 className={iconClass} />;
    }
  };

  const getMoodLabel = () => {
    switch (mood) {
      case 'amazing': return "AMAZING";
      case 'good': return "GOOD";
      case 'calm': return "CALM";
      case 'neutral': return "NEUTRAL";
      case 'tired': return "TIRED";
      case 'rough': return "ROUGH";
      default: return "GOOD";
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) setPhotos((prev) => [...prev, event.target!.result as string]);
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
      date: formatDate(day.date),
      content: content.trim(),
      photos: photos,
      mood: mood,
      createdAt: day.entry?.createdAt || new Date(),
      updatedAt: new Date(),
    };
    saveEntryToStorage(entry);
    await new Promise((resolve) => setTimeout(resolve, 300));
    setIsSaving(false);
    onSave();
    onClose();
  };

  const handleDelete = () => {
    if (!deleteConfirm) {
      setDeleteConfirm(true);
      return;
    }
    deleteEntryFromStorage(formatDate(day.date));
    onSave();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg bg-background text-foreground border-border rounded-3xl p-6 overflow-hidden shadow-2xl">
        <DialogHeader className="space-y-0 pb-4">
          <div className="flex items-start justify-between">
            
            {/* UNIFIED MOOD PICKER STYLE */}
            <button 
              onClick={cycleMood}
              className="flex flex-col items-center justify-center w-20 h-24 rounded-2xl border-2 border-primary/20 bg-card hover:bg-secondary/30 hover:border-primary transition-all duration-200 group"
              title="Tap to change mood"
            >
              <div className="mb-2 p-2 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors">
                {getMoodIcon()}
              </div>
              <span className="text-[10px] font-bold font-mono text-primary/70 uppercase tracking-widest">
                {getMoodLabel()}
              </span>
            </button>
            
            {/* DATE DISPLAY */}
            <div className="text-right pt-2 mr-6">
              <DialogTitle className="font-mono text-sm text-muted-foreground font-normal lowercase tracking-wide mb-1">
                {day.date.toLocaleDateString('en-US', { weekday: 'long' })}
              </DialogTitle>
              <p className="text-3xl font-bold text-primary font-mono tracking-tighter">
                {day.date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' })}
              </p>
            </div>
          </div>
        </DialogHeader>

        {/* PHOTO SECTION */}
        <div className="space-y-4">
          <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handlePhotoUpload} className="hidden" />
          {photos.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {photos.map((photo, index) => (
                <div key={index} className="relative aspect-square rounded-xl overflow-hidden group border border-border">
                  <img src={photo} alt="" className="w-full h-full object-cover" />
                  <button onClick={() => removePhoto(index)} className="absolute top-1 right-1 p-1 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
          
          {/* Dashed Border Button Style - Matches Screenshot */}
          <button 
            onClick={() => fileInputRef.current?.click()} 
            className="flex items-center justify-center gap-2 text-xs text-muted-foreground hover:text-primary transition-all font-mono border-2 border-dashed border-border hover:border-primary/50 p-3 rounded-xl w-full"
          >
            <Camera className="w-4 h-4" />
            {photos.length > 0 ? "add more photos" : "add photo memory"}
          </button>
        </div>

        {/* TEXT AREA */}
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write about your day..."
          className="min-h-[180px] resize-none bg-transparent border-none text-lg text-foreground placeholder:text-muted-foreground/40 focus-visible:ring-0 p-0 leading-relaxed font-mono mt-4"
        />

        {/* FOOTER ACTIONS */}
        <div className="flex items-center justify-between pt-6 border-t border-border/20">
          {day.hasEntry ? (
            <Button variant="ghost" size="sm" onClick={handleDelete} className={cn("font-mono text-xs px-2 hover:bg-destructive/10 transition-colors", deleteConfirm ? "text-destructive hover:text-destructive font-bold" : "text-muted-foreground")}>
              <Trash2 className="w-4 h-4 mr-2" />
              {deleteConfirm ? "sure?" : "delete"}
            </Button>
          ) : <div />}

          <Button 
            onClick={handleSave} 
            disabled={(!content.trim() && photos.length === 0) || isSaving} 
            className="rounded-full px-8 bg-primary text-primary-foreground hover:bg-primary/90 font-mono text-xs h-10 transition-all shadow-lg shadow-primary/20"
          >
            {isSaving ? "saving..." : "done"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};