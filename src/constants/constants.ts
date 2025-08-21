import { Dimensions, Platform } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const COLORS = {
  // Primary Colors
  primary: '#6366F1',
  primaryLight: '#818CF8',
  primaryDark: '#4338CA',
  
  // Secondary Colors
  secondary: '#10B981',
  secondaryLight: '#34D399',
  secondaryDark: '#059669',
  
  // Status Colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  
  // Neutral Colors
  white: '#FFFFFF',
  black: '#000000',
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',
  
  // Background Colors
  background: '#FFFFFF',
  backgroundSecondary: '#F9FAFB',
  backgroundDark: '#1F2937',
  
  // Text Colors
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  textLight: '#9CA3AF',
  textInverse: '#FFFFFF',
  
  // Card & Surface Colors
  cardBackground: '#FFFFFF',
  cardBorder: '#E5E7EB',
  surface: '#F9FAFB',
  
  // Accent Colors for Collections
  accent1: '#EF4444', // Red
  accent2: '#F59E0B', // Amber
  accent3: '#10B981', // Emerald
  accent4: '#3B82F6', // Blue
  accent5: '#8B5CF6', // Violet
  accent6: '#EC4899', // Pink
} as const;

export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
  '6xl': 60,
} as const;

export const FONT_WEIGHTS = {
  light: '300' as const,
  normal: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extrabold: '800' as const,
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
} as const;

export const BORDER_RADIUS = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  full: 9999,
} as const;

export const DIMENSIONS = {
  screenWidth: SCREEN_WIDTH,
  screenHeight: SCREEN_HEIGHT,
  isSmallDevice: SCREEN_WIDTH < 375,
  headerHeight: Platform.OS === 'ios' ? 88 : 64,
  tabBarHeight: Platform.OS === 'ios' ? 83 : 60,
} as const;

export const STORAGE_KEYS = {
  COLLECTIONS: 'collections',
  WORDS: 'words',
  SETTINGS: 'app_settings',
  USER_PROGRESS: 'user_progress',
  REVIEW_SESSIONS: 'review_sessions',
  ONBOARDING_COMPLETED: 'onboarding_completed',
  THEME: 'app_theme',
} as const;

export const REVIEW_MODES = {
  FLASHCARD: 'flashcard',
  QUIZ: 'quiz',
  MATCHING: 'matching',
  TYPING: 'typing',
} as const;

export const MASTERY_SETTINGS = {
  DEFAULT_THRESHOLD: 5,
  MIN_THRESHOLD: 2,
  MAX_THRESHOLD: 10,
} as const;