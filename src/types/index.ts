export interface ShareContent {
  title: string;
  message?: string;
  url?: string;
  image?: string;
  tags?: string[];
}

export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  totalPages: number;
  currentPage: number;
  coverUri?: string;
  color: string;
  startDate?: string;
  completedDate?: string | Date | null;
  caption?: string;
}

export interface ReadingSession {
  id: string;
  bookId: string;
  startPage: number;
  endPage: number;
  duration: number;
  date: string | Date;
  notes?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  avatar?: string;
  readerLevel: number;
  points: number;
}

export interface ReadingStats {
  pagesThisWeek: number;
  pagesThisMonth: number;
  booksCompletedThisMonth: number;
  booksCompletedThisMonthList: Book[];
  booksReadThisMonth: Book[];
  topBookThisWeek: Book | null;
  totalBooks: number;
  totalPagesEver: number;
  avgPagesPerDay: number;
  goalPercentage: number;
  readingStreak: number;
  totalPoints: number;
}

export interface GraphData {
  days: Array<{
    date: Date;
    pages: number;
    intensity: number; // 0-4 scale
    isToday: boolean;
  }>;
  totalDays: number;
  activeDays: number;
  totalPages: number;
  maxPagesInDay: number;
  currentStreak: number;
}

export interface BannerTemplate {
  id: string;
  name: string;
  colors: string[];
  accentColors: string[];
  overlayColor: string;
  style: string;
}

export interface SocialBannerModalProps {
  visible: boolean;
  onClose: () => void;
  darkMode?: boolean;
  books: Book[];
  readingSessions: ReadingSession[];
  profile?: UserProfile;
  onShareComplete?: (platform: string, success: boolean) => void;
}

export interface ShareButtonsProps {
  content: ShareContent;
  platforms?: SocialPlatform[];
  buttonStyle?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  darkMode?: boolean;
  onShare?: (platform: string) => void;
}

export interface BannerGeneratorProps {
  data: ReadingStats;
  profile?: UserProfile;
  template?: BannerTemplate;
  layoutType?: 'stats' | 'graph';
  graphData?: GraphData;
  onBannerGenerated?: (imageUri: string) => void;
}

export type SocialPlatform =
  | 'facebook'
  | 'instagram'
  | 'twitter'
  | 'linkedin'
  | 'whatsapp'
  | 'telegram'
  | 'copy-link'
  | 'more';

export type ShareButtonStyle = 'primary' | 'secondary' | 'outline';
export type ShareButtonSize = 'small' | 'medium' | 'large';
export type LayoutType = 'stats' | 'graph';

export interface ShareConfig {
  enableAnalytics?: boolean;
  defaultTemplate?: string;
  customBranding?: {
    appName: string;
    appIcon: string;
    appUrl: string;
  };
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}

export interface ShareAnalytics {
  platform: string;
  contentType: string;
  timestamp: Date;
  success: boolean;
  errorMessage?: string;
}