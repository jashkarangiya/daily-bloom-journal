import React, { useMemo } from "react";
import { DayInfo, JournalEntry, formatDate, getEntriesFromStorage } from "@/lib/journalData";
import { format } from "date-fns";
import { Search } from "lucide-react";

interface SearchResultsProps {
    searchTerm: string;
    onDayClick: (day: DayInfo) => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({ searchTerm, onDayClick }) => {
    const results = useMemo(() => {
        if (!searchTerm.trim()) return [];
        const entries = getEntriesFromStorage();
        const term = searchTerm.toLowerCase();

        return Object.values(entries)
            .filter((entry: JournalEntry) => {
                const contentMatch = entry.content.toLowerCase().includes(term);
                const habitMatch = entry.habits && Object.values(entry.habits).some(h => h.note?.toLowerCase().includes(term));
                return contentMatch || habitMatch;
            })
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [searchTerm]);

    if (!searchTerm.trim()) return null;

    if (results.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground animate-in fade-in">
                <Search className="w-8 h-8 mb-3 opacity-50" />
                <p className="font-mono text-sm">No memories found for "{searchTerm}"</p>
            </div>
        );
    }

    return (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4">
                Found {results.length} memories
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {results.map((entry) => (
                    <button
                        key={entry.date}
                        onClick={() => {
                            // Construct a partial DayInfo object sufficient for opening the modal
                            // In a real app we might want to fully reconstruct DayInfo via a helper
                            const date = new Date(entry.date);
                            const dayInfo: DayInfo = {
                                date,
                                dayOfYear: 0, // Not needed for modal
                                isToday: false,
                                isPast: true,
                                isFuture: false,
                                hasEntry: true,
                                hasPhotos: !!entry.photos?.length,
                                entry
                            };
                            onDayClick(dayInfo);
                        }}
                        className="text-left group relative flex flex-col p-5 bg-card hover:bg-secondary/30 border border-border rounded-2xl transition-all hover:scale-[1.02] hover:shadow-lg"
                    >
                        <div className="flex items-center justify-between mb-3 w-full">
                            <span className="font-mono text-xs text-muted-foreground">
                                {format(new Date(entry.date), 'EEE, MMM d, yyyy')}
                            </span>
                            {entry.mood && (
                                <span className="text-lg opacity-80 group-hover:scale-110 transition-transform">
                                    {entry.mood === 'amazing' && '☀️'}
                                    {entry.mood === 'good' && '🌸'}
                                    {entry.mood === 'calm' && '🍃'}
                                    {entry.mood === 'neutral' && '☁️'}
                                    {entry.mood === 'tired' && '🌙'}
                                    {entry.mood === 'rough' && '🌧️'}
                                </span>
                            )}
                        </div>
                        <p className="text-sm font-serif line-clamp-3 text-foreground/90 leading-relaxed">
                            {entry.content}
                        </p>
                        {entry.photos && entry.photos.length > 0 && (
                            <div className="mt-3 flex gap-1">
                                {entry.photos.slice(0, 3).map((p, i) => (
                                    <div key={i} className="w-8 h-8 rounded-lg bg-secondary overflow-hidden">
                                        <img src={p} className="w-full h-full object-cover opacity-80" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};
