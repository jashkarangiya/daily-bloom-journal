// Types
// EXPANDED MOODS: 6 distinct states
export type MoodType = 'amazing' | 'good' | 'calm' | 'neutral' | 'tired' | 'rough' | null;

export interface JournalEntry {
  date: string; // YYYY-MM-DD
  content: string;
  mood: MoodType;
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
  return date.toLocaleDateString('en-GB', {
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

// Helper to get days grouped by month for the grid view
export const getMonthsInYear = (year: number): { name: string; days: DayInfo[] }[] => {
  const months = [];
  
  for (let m = 0; m < 12; m++) {
    const date = new Date(year, m, 1);
    const monthName = date.toLocaleDateString('en-US', { month: 'long' });
    const daysInMonth: DayInfo[] = [];
    
    while (date.getMonth() === m) {
      const dateStr = formatDate(date);
      const entries = getEntriesFromStorage();
      const entry = entries[dateStr];
      
      daysInMonth.push({
        date: new Date(date),
        dayOfYear: getDayOfYear(date),
        isToday: isToday(date),
        isPast: isPastDate(date),
        isFuture: isFutureDate(date),
        hasEntry: !!entry,
        hasPhotos: !!(entry?.photos && entry.photos.length > 0),
        entry,
      });
      date.setDate(date.getDate() + 1);
    }
    months.push({ name: monthName, days: daysInMonth });
  }
  return months;
};

// Local storage helpers
const STORAGE_KEY = 'garden-journal-entries';

export const getEntriesFromStorage = (): Record<string, JournalEntry> => {
  if (typeof window === 'undefined') return {};
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return {};
  
  try {
    const parsed = JSON.parse(stored);
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

// Stats with Streaks
export const getJournalStats = (year: number): { written: number; remaining: number; streak: number } => {
  const entries = getEntriesFromStorage();
  const yearEntries = Object.keys(entries).filter(date => date.startsWith(year.toString()));
  
  let currentStreak = 0;
  const today = new Date();
  
  let checkDate = new Date(today);
  let dateStr = formatDate(checkDate);
  
  if (!entries[dateStr]) {
    checkDate.setDate(checkDate.getDate() - 1);
    dateStr = formatDate(checkDate);
  }

  while (entries[dateStr]) {
    currentStreak++;
    checkDate.setDate(checkDate.getDate() - 1);
    dateStr = formatDate(checkDate);
  }

  const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  const totalDays = isLeap ? 366 : 365;

  return {
    written: yearEntries.length,
    remaining: totalDays - yearEntries.length,
    streak: currentStreak
  };
};

export const initializeJournal = (): void => {
  // Start fresh
};