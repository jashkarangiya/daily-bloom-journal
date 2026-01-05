// Types
export type MoodType = 'great' | 'good' | 'okay' | 'bad' | null;

export interface JournalEntry {
  date: string; // YYYY-MM-DD
  content: string;
  mood: MoodType; // Added mood
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

// NEW: Helper to get days grouped by month for the new layout
export const getMonthsInYear = (year: number): { name: string; days: DayInfo[] }[] => {
  const months = [];
  
  for (let m = 0; m < 12; m++) {
    const date = new Date(year, m, 1);
    const monthName = date.toLocaleDateString('en-US', { month: 'long' });
    const daysInMonth: DayInfo[] = [];
    
    // Iterate through days of this month
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

// Keep the old linear getter just in case
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
  
  // If it's the current year, remaining is days passed - written. 
  // If distinct "remaining in year", it would be 365 - written.
  // We'll stick to "days remaining in the year to fill" logic.
  
  return {
    written: yearEntries.length,
    remaining: 365 - yearEntries.length,
  };
};

// Updated Sample Generator with Moods
export const addSampleEntries = (): void => {
  const currentYear = new Date().getFullYear();
  const today = new Date();
  const moods: MoodType[] = ['great', 'good', 'okay', 'bad'];
  
  const sampleTexts = [
    "Sunrise walk was perfect today.",
    "Struggled with focus, but made it through.",
    "Dinner with friends, laughed so much.",
    "Quiet day reading by the window.",
    "Finally finished that big project!",
  ];
  
  const entries = getEntriesFromStorage();
  
  // Add entries for some random past days
  for (let i = 1; i <= 40; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - Math.floor(Math.random() * 90)); // Past 3 months
    
    if (date.getFullYear() !== currentYear) continue;
    
    const dateStr = formatDate(date);
    
    if (!entries[dateStr] && Math.random() > 0.4) { 
      const mood = moods[Math.floor(Math.random() * moods.length)];
      
      const entry: JournalEntry = {
        date: dateStr,
        content: sampleTexts[Math.floor(Math.random() * sampleTexts.length)],
        mood: mood,
        createdAt: date,
        updatedAt: date,
      };
      entries[dateStr] = entry;
    }
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
};

export const initializeJournal = (): void => {
  const entries = getEntriesFromStorage();
  if (Object.keys(entries).length === 0) {
    addSampleEntries();
  }
};