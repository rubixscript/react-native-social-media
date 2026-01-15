export interface ShareContent {
  title: string;
  message?: string;
  url?: string;
  image?: string;
  tags?: string[];
}

// Text labels for the SocialShareModal - allows full customization of all text
export interface SocialShareModalLabels {
  // Header
  headerTitle?: string;

  // Section titles
  templateSectionTitle?: string;
  previewSectionTitle?: string;
  shareSectionTitle?: string;
  statsSectionTitle?: string;

  // Share section
  shareDescription?: string;

  // Buttons
  generateBannerText?: string;
  generatingText?: string;
  backToTemplatesText?: string;

  // Success messages
  copyLinkSuccessMessage?: string;
  shareSuccessMessage?: string;
  shareErrorMessage?: string;

  // Stats labels (for ProgressStats calculation)
  progressLabel?: string;
  itemLabel?: string;

  // Banner stats labels - fully customizable stats grid labels
  // These control the 4 stat items shown in the banner
  bannerStat1Label?: string;    // Default: "Progress" (e.g., "Pages", "Minutes", "Reps")
  bannerStat1Icon?: string;     // Default: "bar-chart" (FontAwesome icon name)
  bannerStat1Value?: string;    // Custom value override (e.g., "150" or use progressThisMonth)
  bannerStat2Label?: string;    // Default: "% Goal"
  bannerStat2Icon?: string;     // Default: "crosshairs"
  bannerStat2Value?: string;    // Custom value override (e.g., "75%")
  bannerStat3Label?: string;    // Default: "Books" / "Tasks" / "Habits" etc.
  bannerStat3Icon?: string;     // Default: "check-circle"
  bannerStat3Value?: string;    // Custom value override (e.g., "5")
  bannerStat4Label?: string;    // Default: "Streak"
  bannerStat4Icon?: string;     // Default: "fire"
  bannerStat4Value?: string;    // Custom value override (e.g., "30")
}

// ============================================
// GENERIC PROGRESS TRACKER TYPES
// ============================================

export type TrackerType = 'reading' | 'pomodoro' | 'skill' | 'habit' | 'fitness' | 'custom';

export interface ProgressItem {
  id: string;
  title: string;
  subtitle?: string; // e.g., author for books, category for habits
  category: string;
  progress: number; // Current progress value
  total: number; // Total/goal value
  coverUri?: string;
  color: string;
  startDate?: string | Date;
  completedDate?: string | Date | null;
  caption?: string;
  metadata?: Record<string, any>; // For custom data
}

export interface ProgressSession {
  id: string;
  itemId: string; // ID of the ProgressItem
  value: number; // Progress made in this session (e.g., pages read, minutes worked, reps completed)
  duration: number; // Duration in minutes
  date: string | Date;
  notes?: string;
  metadata?: Record<string, any>; // For custom data
}

export interface UserProfile {
  id: string;
  name: string;
  avatar?: string;
  level: number; // Generic level instead of readerLevel
  points: number;
  title?: string; // e.g., "Master Reader", "Focus Ninja", "Habit Champion"
}

export interface ProgressStats {
  // Current period stats
  progressThisWeek: number;
  progressThisMonth: number;
  itemsCompletedThisMonth: number;
  itemsCompletedThisMonthList: ProgressItem[];
  itemsInProgressThisMonth: ProgressItem[];
  topItemThisWeek: ProgressItem | null;

  // All-time stats
  totalItems: number;
  totalProgressEver: number;
  avgProgressPerDay: number;

  // Goals and achievements
  goalPercentage: number;
  currentStreak: number;
  totalPoints: number;

  // Metadata for display
  progressLabel: string; // e.g., "Pages", "Minutes", "Reps", "Days"
  itemLabel: string; // e.g., "Books", "Sessions", "Skills", "Habits"
}

export interface GraphData {
  days: Array<{
    date: Date;
    value: number; // Generic value instead of pages
    intensity: number; // 0-4 scale
    isToday: boolean;
  }>;
  totalDays: number;
  activeDays: number;
  totalValue: number; // Generic value instead of totalPages
  maxValueInDay: number; // Generic value instead of maxPagesInDay
  currentStreak: number;
  valueLabel?: string; // e.g., "Pages", "Minutes", "Reps"
}

// ============================================
// READING-SPECIFIC TYPES (Backward Compatible)
// ============================================

export interface Book extends ProgressItem {
  author: string;
  totalPages: number;
  currentPage: number;
}

export interface ReadingSession extends ProgressSession {
  bookId: string;
  startPage: number;
  endPage: number;
}

export interface ReadingStats extends ProgressStats {
  pagesThisWeek: number;
  pagesThisMonth: number;
  booksCompletedThisMonth: number;
  booksCompletedThisMonthList: Book[];
  booksReadThisMonth: Book[];
  topBookThisWeek: Book | null;
  totalBooks: number;
  totalPagesEver: number;
  avgPagesPerDay: number;
}

export interface BannerTemplate {
  id: string;
  name: string;
  colors: string[];
  accentColors: string[];
  overlayColor: string;
  style: string;
}

// Generic modal props (supports any tracker type)
export interface SocialBannerModalProps {
  visible: boolean;
  onClose: () => void;
  darkMode?: boolean;
  trackerType?: TrackerType;

  // Generic props
  items?: ProgressItem[];
  sessions?: ProgressSession[];

  // Backward compatible: Reading-specific props
  books?: Book[];
  readingSessions?: ReadingSession[];

  profile?: UserProfile;
  onShareComplete?: (platform: string, success: boolean) => void;

  // Customization
  bannerTitle?: string; // e.g., "My Reading Progress", "Pomodoro Stats", "Habit Streak"
  bannerFooter?: string; // Custom footer text (default: "Shared from [App Name]")

  // Text labels customization - allows full control over all displayed text
  textLabels?: SocialShareModalLabels;
}

export interface ShareButtonsProps {
  content: ShareContent;
  platforms?: SocialPlatform[];
  buttonStyle?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  darkMode?: boolean;
  onShare?: (platform: string) => void;
}

// Generic banner generator props (supports any tracker type)
export interface BannerGeneratorProps {
  trackerType?: TrackerType;
  data: ProgressStats | ReadingStats; // Support both generic and reading-specific
  profile?: UserProfile;
  template?: BannerTemplate;
  layoutType?: 'stats' | 'graph';
  graphData?: GraphData;
  onBannerGenerated?: (imageUri: string) => void;
  bannerTitle?: string;
  bannerFooter?: string;
  statLabels?: SocialShareModalLabels; // Custom stats labels for the banner
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