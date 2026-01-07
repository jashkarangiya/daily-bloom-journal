import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Upload, Trash2, Check } from "lucide-react";
import { getEntriesFromStorage, saveEntryToStorage, JournalEntry } from "@/lib/journalData";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataChange: () => void; // To refresh the grid after import
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  onDataChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importStatus, setImportStatus] = useState<"idle" | "success" | "error">("idle");

  // EXPORT: Save data to a JSON file
  const handleExport = () => {
    const entries = getEntriesFromStorage();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(entries, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `daily-bloom-backup-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  // IMPORT: Load data from a JSON file
  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        
        // Basic validation
        if (typeof json !== 'object') throw new Error("Invalid format");

        // Import entries
        Object.values(json).forEach((entry: any) => {
            // Re-construct dates to ensure they are valid Date objects
            const safeEntry: JournalEntry = {
                ...entry,
                createdAt: new Date(entry.createdAt),
                updatedAt: new Date(entry.updatedAt)
            };
            saveEntryToStorage(safeEntry);
        });

        setImportStatus("success");
        onDataChange();
        
        // Reset status after a few seconds
        setTimeout(() => {
            setImportStatus("idle");
            if (fileInputRef.current) fileInputRef.current.value = "";
        }, 3000);
        
      } catch (err) {
        console.error(err);
        setImportStatus("error");
      }
    };
    reader.readAsText(file);
  };

  const handleClearData = () => {
    if (confirm("Are you sure? This will delete all your memories permanently.")) {
      localStorage.removeItem('garden-journal-entries');
      onDataChange();
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-card text-card-foreground border-border rounded-2xl shadow-xl">
        <DialogHeader>
          <DialogTitle className="font-mono text-xl">Settings</DialogTitle>
          <DialogDescription className="font-mono text-xs text-muted-foreground">
            Manage your journal data.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          
          {/* EXPORT SECTION */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-muted-foreground">Backup</h4>
            <Button 
              onClick={handleExport}
              variant="outline" 
              className="w-full justify-between font-mono text-sm group h-12 border-border hover:bg-secondary/50 hover:text-primary"
            >
              <span>Download Backup (.json)</span>
              <Download className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </Button>
            <p className="text-[10px] text-muted-foreground font-mono leading-relaxed">
              Save your memories to your computer so you don't lose them if you clear your browser cache.
            </p>
          </div>

          {/* IMPORT SECTION */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-muted-foreground">Restore</h4>
            <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept=".json" 
                className="hidden" 
            />
            <Button 
              onClick={handleImportClick}
              variant="outline" 
              className="w-full justify-between font-mono text-sm group h-12 border-border hover:bg-secondary/50 hover:text-primary"
            >
              <span>
                {importStatus === "success" ? "Import Successful!" : 
                 importStatus === "error" ? "Error importing file" : 
                 "Import Backup File"}
              </span>
              {importStatus === "success" ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Upload className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              )}
            </Button>
          </div>

          {/* DANGER ZONE */}
          <div className="pt-6 mt-2 border-t border-border/50">
            <Button 
              onClick={handleClearData}
              variant="ghost" 
              className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10 font-mono text-xs px-2 h-auto py-2"
            >
              <Trash2 className="w-3 h-3 mr-2" />
              Reset & Clear All Data
            </Button>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
};