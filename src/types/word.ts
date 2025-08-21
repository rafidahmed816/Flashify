// src/types/word.ts
export interface Word {
  id: string;
  text: string;
  meaning: string;
  example?: string;
  pronunciation?: string;
  partOfSpeech?: string;
  masteryCount: number;
  collectionId: string;
  createdAt: Date;
  updatedAt: Date;
}

// src/types/collection.ts
export interface Collection {
  id: string;
  name: string;
  description?: string;
  color?: string;
  wordCount: number;
  createdAt: Date;
  updatedAt: Date;
}

// src/types/review.ts
export interface ReviewSession {
  id: string;
  words: Word[];
  mode: 'flashcard' | 'quiz' | 'matching' | 'typing';
  currentIndex: number;
  results: ReviewResult[];
  startTime: Date;
  endTime?: Date;
}

export interface ReviewResult {
  wordId: string;
  isCorrect: boolean;
  timeSpent: number;
  timestamp: Date;
}

// src/types/settings.ts
export interface AppSettings {
  dictionaryLanguage: string;
  masteryThreshold: number;
  reviewOrder: 'random' | 'sequential';
  theme: 'light' | 'dark';
  notifications: boolean;
  dailyGoal: number;
}