import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { getPlantIconForDay } from "./PlantIcons";
import {
  DayInfo,
  formatDisplayDate,
  saveEntryToStorage,
  JournalEntry,
  formatDate,
} from "@/lib/journalData";
import { Trash2, Check, X, Camera, Image } from "lucide-react";

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
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (day?.entry) {
      setContent(day.entry.content);
      setPhotos(day.entry.photos || []);
    } else {
      setContent("");
      setPhotos([]);
    }
  }, [day]);

  if (!day) return null;

  const PlantIcon = getPlantIconForDay(day.dayOfYear);

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
      date: formatDate(day.date),
      content: content.trim(),
      photos: photos,
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
    setContent("");
    setPhotos([]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg bg-card border-border rounded-2xl p-0 overflow-hidden">
        <div className="p-6 space-y-5">
          {/* Header with plant icon */}
          <DialogHeader className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="w-16 h-16 rounded-xl bg-garden-ink-light p-3">
                <PlantIcon className="w-full h-full" filled={!!day.hasEntry || !!content.trim() || photos.length > 0} />
              </div>
              
              <div className="flex items-center gap-2">
                {day.isToday && (
                  <Badge className="bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full">
                    today
                  </Badge>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <DialogTitle className="font-mono text-sm lowercase tracking-wide text-foreground">
                {day.date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()}
              </DialogTitle>
              <p className="text-xs text-muted-foreground font-mono">
                {day.date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' })}
              </p>
            </div>
          </DialogHeader>

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
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden group">
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
              className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors font-mono"
            >
              <Camera className="w-4 h-4" />
              add photo memory
            </button>
          </div>

          {/* Journal textarea */}
          <div className="space-y-2">
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="add a memory..."
              className="min-h-[140px] resize-none bg-secondary/50 border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:ring-1 focus:ring-primary/30 focus:border-primary transition-all font-mono text-sm lowercase"
            />

            <div className="flex justify-between items-center text-xs text-muted-foreground font-mono">
              <span>{content.length} characters</span>
              {photos.length > 0 && <span>{photos.length} photo{photos.length > 1 ? 's' : ''}</span>}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-2">
            <div>
              {(content || photos.length > 0) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDelete}
                  className="text-muted-foreground hover:text-destructive font-mono text-xs lowercase"
                >
                  <Trash2 className="w-3 h-3 mr-1" />
                  clear
                </Button>
              )}
            </div>

            <Button
              onClick={handleSave}
              disabled={(!content.trim() && photos.length === 0) || isSaving}
              className="rounded-full px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-mono text-sm lowercase"
            >
              {isSaving ? (
                <span className="flex items-center gap-2">
                  <div className="w-3 h-3 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  saving...
                </span>
              ) : (
                "Done"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
