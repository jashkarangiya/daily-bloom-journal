import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Habit, getHabitsFromStorage, saveHabitsToStorage } from "@/lib/journalData";
import { Plus, X, Trash2 } from "lucide-react";

interface HabitManagerProps {
    isOpen: boolean;
    onClose: () => void;
    onUpdate: () => void; // Refresh parent state
}

export const HabitManager: React.FC<HabitManagerProps> = ({ isOpen, onClose, onUpdate }) => {
    const [habits, setHabits] = useState<Habit[]>([]);
    const [newHabitName, setNewHabitName] = useState("");
    const [newHabitEmoji, setNewHabitEmoji] = useState("✨");

    useEffect(() => {
        if (isOpen) {
            setHabits(getHabitsFromStorage());
        }
    }, [isOpen]);

    const handleAdd = () => {
        if (!newHabitName.trim()) return;
        const newHabit: Habit = {
            id: Date.now().toString(),
            name: newHabitName.trim(),
            emoji: newHabitEmoji,
            isActive: true,
        };
        const updated = [...habits, newHabit];
        setHabits(updated);
        saveHabitsToStorage(updated);
        setNewHabitName("");
        setNewHabitEmoji("✨");
        onUpdate();
    };

    const handleDelete = (id: string) => {
        const updated = habits.filter(h => h.id !== id);
        setHabits(updated);
        saveHabitsToStorage(updated);
        onUpdate();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-sm bg-card text-card-foreground rounded-3xl p-6 shadow-xl border-border">
                <DialogHeader>
                    <DialogTitle className="font-serif text-xl text-center mb-4">Manage Habits</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    {/* Add New */}
                    <div className="flex gap-2 items-center">
                        <Input
                            value={newHabitEmoji}
                            onChange={e => setNewHabitEmoji(e.target.value)}
                            onBlur={() => { if (!newHabitEmoji) setNewHabitEmoji("✨"); }}
                            className="w-14 text-center text-2xl p-1 rounded-xl bg-background border-border focus:ring-primary/20 h-12"
                            maxLength={2}
                        />
                        <Input
                            value={newHabitName}
                            onChange={e => setNewHabitName(e.target.value)}
                            placeholder="New habit..."
                            className="flex-1 rounded-xl bg-background border-border h-12 text-base font-sans"
                        />
                        <Button onClick={handleAdd} size="icon" className="rounded-xl shrink-0 h-12 w-12 bg-primary hover:bg-primary/90 text-primary-foreground">
                            <Plus className="w-6 h-6" />
                        </Button>
                    </div>

                    <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                        {habits.map(habit => (
                            <div key={habit.id} className="flex items-center justify-between p-3 rounded-xl bg-secondary/30 group">
                                <span className="flex items-center gap-3 font-medium">
                                    <span className="text-xl">{habit.emoji}</span>
                                    {habit.name}
                                </span>
                                <button
                                    onClick={() => handleDelete(habit.id)}
                                    className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                        {habits.length === 0 && (
                            <p className="text-center text-sm text-muted-foreground italic py-4">No habits yet.</p>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
