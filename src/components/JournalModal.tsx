import React, { useState, useEffect } from "react";
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
import { Trash2, Check, X } from "lucide-react";

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
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (day?.entry) {
      setContent(day.entry.content);
    } else {
      setContent("");
    }
  }, [day]);

  if (!day) return null;

  const PlantIcon = getPlantIconForDay(day.dayOfYear);

  const handleSave = async () => {
    if (!content.trim()) return;

    setIsSaving(true);

    const entry: JournalEntry = {
      date: formatDate(day.date),
      content: content.trim(),
      createdAt: day.entry?.createdAt || new Date(),
      updatedAt: new Date(),
    };

    saveEntryToStorage(entry);

    // Small delay for animation feel
    await new Promise((resolve) => setTimeout(resolve, 300));

    setIsSaving(false);
    onSave();
    onClose();
  };

  const handleDelete = () => {
    setContent("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg bg-card border-border shadow-garden-lg rounded-2xl p-0 overflow-hidden">
        <div className="p-6 space-y-6">
          {/* Header with plant icon */}
          <DialogHeader className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="w-20 h-20 rounded-xl bg-garden-ink-light p-3 float-animation">
                <PlantIcon className="w-full h-full" filled={!!day.hasEntry || !!content.trim()} />
              </div>
              
              <div className="flex items-center gap-2">
                {day.isToday && (
                  <Badge className="bg-primary text-primary-foreground font-medium px-3">
                    Today
                  </Badge>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <DialogTitle className="font-display text-3xl text-foreground">
                {formatDisplayDate(day.date)}
              </DialogTitle>
              <p className="text-sm text-muted-foreground">
                Reflect on each day, with daily journal entries.
              </p>
            </div>
          </DialogHeader>

          {/* Journal textarea */}
          <div className="space-y-3">
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Add a memory..."
              className="min-h-[180px] resize-none bg-secondary/50 border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />

            {/* Character count */}
            <div className="flex justify-between items-center text-xs text-muted-foreground">
              <span>{content.length} characters</span>
              {day.entry && (
                <span>
                  Last updated:{" "}
                  {day.entry.updatedAt.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-2">
            <div>
              {content && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDelete}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Clear
                </Button>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={onClose}
                className="rounded-full px-4"
              >
                <X className="w-4 h-4 mr-1" />
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={!content.trim() || isSaving}
                className="rounded-full px-6 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isSaving ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Saving...
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <Check className="w-4 h-4" />
                    Done
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
