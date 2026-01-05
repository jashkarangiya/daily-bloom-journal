import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { getPlantIconForDay } from "./PlantIcons";
import { DayInfo, saveEntryToStorage, JournalEntry, formatDate } from "@/lib/journalData";
import { Trash2, X, Camera } from "lucide-react";

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
      mood: 'okay',
      createdAt: day.entry?.createdAt || new Date(),
      updatedAt: new Date(),
    };
    saveEntryToStorage(entry);
    await new Promise((resolve) => setTimeout(resolve, 300));
    setIsSaving(false);
    onSave();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg bg-card text-card-foreground border-border rounded-2xl p-0 overflow-hidden sm:max-w-md">
        <div className="p-6 space-y-6">
          <DialogHeader className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="w-16 h-16 rounded-xl bg-secondary/50 p-3 flex items-center justify-center border border-border">
                <PlantIcon className="w-full h-full text-primary plant-filled" filled={true} />
              </div>
              
              <div className="text-right">
                <DialogTitle className="font-mono text-lg lowercase tracking-wide text-foreground">
                  {day.date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()}
                </DialogTitle>
                {/* UPDATED: DD/MM Format */}
                <p className="text-sm text-muted-foreground font-mono">
                  {day.date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' })}
                </p>
              </div>
            </div>
          </DialogHeader>

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
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden group border border-border">
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
              className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors font-mono border border-dashed border-border p-3 rounded-lg w-full justify-center"
            >
              <Camera className="w-4 h-4" />
              add photo memory
            </button>
          </div>

          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="here is what happened..."
            className="min-h-[140px] resize-none bg-secondary/30 border-border rounded-xl text-foreground placeholder:text-muted-foreground/70 focus:ring-1 focus:ring-primary font-mono text-sm p-4"
          />

          <div className="flex items-center justify-between pt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => { setContent(""); setPhotos([]); }}
              className="text-muted-foreground hover:text-destructive font-mono text-xs"
            >
              <Trash2 className="w-3 h-3 mr-1" />
              clear
            </Button>
            <Button
              onClick={handleSave}
              disabled={(!content.trim() && photos.length === 0) || isSaving}
              className="rounded-full px-8 bg-primary text-primary-foreground hover:bg-primary/90 font-mono text-sm"
            >
              {isSaving ? "saving..." : "done"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};