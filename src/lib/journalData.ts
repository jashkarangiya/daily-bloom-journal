// Types
export interface JournalEntry {
  date: string; // YYYY-MM-DD
  content: string;
  photos?: string[]; // Array of photo URLs/base64
  createdAt: Date;
  updatedAt: Date;
}

export interface DayInfo {
  date: Date;
  dayOfYear: number;
  isToday: boolean;
  isPast: boolean;
  isFuture: boolean;
  hasEntry: boolean;
  hasPhotos: boolean;
  entry?: JournalEntry;
}

// Helper functions
export const getDayOfYear = (date: Date): number => {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
};

export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const formatDisplayDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
};

export const isToday = (date: Date): boolean => {
  const today = new Date();
  return formatDate(date) === formatDate(today);
};

export const isPastDate = (date: Date): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const compareDate = new Date(date);
  compareDate.setHours(0, 0, 0, 0);
  return compareDate < today;
};

export const isFutureDate = (date: Date): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const compareDate = new Date(date);
  compareDate.setHours(0, 0, 0, 0);
  return compareDate > today;
};

// Get all days in a year
export const getDaysInYear = (year: number): DayInfo[] => {
  const days: DayInfo[] = [];
  const startDate = new Date(year, 0, 1);
  const endDate = new Date(year, 11, 31);
  
  const currentDate = new Date(startDate);
  
  while (currentDate <= endDate) {
    const dateStr = formatDate(currentDate);
    const entries = getEntriesFromStorage();
    const entry = entries[dateStr];
    
    days.push({
      date: new Date(currentDate),
      dayOfYear: getDayOfYear(currentDate),
      isToday: isToday(currentDate),
      isPast: isPastDate(currentDate),
      isFuture: isFutureDate(currentDate),
      hasEntry: !!entry,
      hasPhotos: !!(entry?.photos && entry.photos.length > 0),
      entry,
    });
    
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return days;
};

// Local storage helpers
const STORAGE_KEY = 'garden-journal-entries';

export const getEntriesFromStorage = (): Record<string, JournalEntry> => {
  if (typeof window === 'undefined') return {};
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return {};
  
  try {
    const parsed = JSON.parse(stored);
    // Convert date strings back to Date objects
    Object.keys(parsed).forEach(key => {
      parsed[key].createdAt = new Date(parsed[key].createdAt);
      parsed[key].updatedAt = new Date(parsed[key].updatedAt);
    });
    return parsed;
  } catch {
    return {};
  }
};

export const saveEntryToStorage = (entry: JournalEntry): void => {
  const entries = getEntriesFromStorage();
  entries[entry.date] = entry;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
};

export const deleteEntryFromStorage = (date: string): void => {
  const entries = getEntriesFromStorage();
  delete entries[date];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
};

// Stats
export const getJournalStats = (year: number): { written: number; remaining: number } => {
  const entries = getEntriesFromStorage();
  const yearEntries = Object.keys(entries).filter(date => date.startsWith(year.toString()));
  
  const today = new Date();
  const dayOfYear = getDayOfYear(today);
  const isCurrentYear = today.getFullYear() === year;
  
  const daysPassedThisYear = isCurrentYear ? dayOfYear : 365;
  
  return {
    written: yearEntries.length,
    remaining: Math.max(0, daysPassedThisYear - yearEntries.length),
  };
};

// Sample entries for demo
export const addSampleEntries = (): void => {
  const currentYear = new Date().getFullYear();
  const today = new Date();
  
  const sampleTexts = [
    "Started the day with a beautiful sunrise walk. The morning dew on the grass reminded me of simpler times.",
    "Had the most delicious homemade soup for lunch. Grandma's recipe never fails.",
    "Finished reading that book I've been putting off. The ending was unexpected but perfect.",
    "Spent the afternoon in the garden, planting new seeds. Can't wait to see them grow.",
    "Called an old friend today. It's amazing how time flies, but some connections remain strong.",
    "Tried a new recipe for dinner. It was a disaster, but we laughed about it.",
    "Watched the stars tonight. The sky was so clear, I could see the Milky Way.",
    "Felt grateful for the little things today - a warm cup of tea, a good book, a cozy blanket.",
  ];
  
  const entries = getEntriesFromStorage();
  
  // Add entries for some random past days
  for (let i = 1; i <= 30; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - Math.floor(Math.random() * 60)); // Random day in last 60 days
    
    if (date.getFullYear() !== currentYear) continue;
    
    const dateStr = formatDate(date);
    
    if (!entries[dateStr] && Math.random() > 0.4) { // 60% chance to add entry
      const entry: JournalEntry = {
        date: dateStr,
        content: sampleTexts[Math.floor(Math.random() * sampleTexts.length)],
        createdAt: date,
        updatedAt: date,
      };
      entries[dateStr] = entry;
    }
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
};

// Initialize with sample data if empty
export const initializeJournal = (): void => {
  const entries = getEntriesFromStorage();
  if (Object.keys(entries).length === 0) {
    addSampleEntries();
  }
};
