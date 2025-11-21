import { ShareContent, SocialPlatform, UserProfile, ProgressItem, ProgressSession, ProgressStats, GraphData, TrackerType } from '../types';
import { SOCIAL_PLATFORMS, DEFAULT_SHARE_MESSAGES } from '../constants/templates';

export class ShareHelpers {
  // Generic progress calculation (works for any tracker type)
  static calculateProgressStats(
    items: ProgressItem[],
    sessions: ProgressSession[],
    trackerType: TrackerType = 'custom',
    options: {
      progressLabel?: string;
      itemLabel?: string;
      goalValue?: number;
    } = {}
  ): ProgressStats {
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth(), 1);

    const parseDate = (dateValue: string | Date) => {
      if (!dateValue) return null;
      if (dateValue instanceof Date) return dateValue;
      const parsed = new Date(dateValue);
      return isNaN(parsed.getTime()) ? null : parsed;
    };

    // Progress made this week
    const progressThisWeek = sessions
      .filter(session => {
        const sessionDate = parseDate(session.date);
        return sessionDate && sessionDate >= oneWeekAgo && sessionDate <= now;
      })
      .reduce((total, session) => total + (session.value || 0), 0);

    // Progress made this month
    const progressThisMonth = sessions
      .filter(session => {
        const sessionDate = parseDate(session.date);
        return sessionDate && sessionDate >= oneMonthAgo && sessionDate <= now;
      })
      .reduce((total, session) => total + (session.value || 0), 0);

    // Items completed this month
    const itemsCompletedThisMonth = items.filter(item => {
      if (!item.completedDate) return false;
      const completionDate = parseDate(item.completedDate);
      return completionDate && completionDate >= oneMonthAgo && completionDate <= now;
    });

    // Items in progress this month
    const itemsInProgressThisMonth = items.filter(item => {
      const startDate = parseDate(item.startDate);
      return !item.completedDate && startDate && startDate >= oneMonthAgo;
    });

    // Top item this week (item with most progress)
    const itemProgressThisWeek = new Map<string, number>();
    sessions
      .filter(session => {
        const sessionDate = parseDate(session.date);
        return sessionDate && sessionDate >= oneWeekAgo && sessionDate <= now;
      })
      .forEach(session => {
        const current = itemProgressThisWeek.get(session.itemId) || 0;
        itemProgressThisWeek.set(session.itemId, current + (session.value || 0));
      });

    let topItemThisWeek: ProgressItem | null = null;
    let maxProgress = 0;
    itemProgressThisWeek.forEach((progress, itemId) => {
      if (progress > maxProgress) {
        maxProgress = progress;
        topItemThisWeek = items.find(item => item.id === itemId) || null;
      }
    });

    // Calculate streak
    const calculateStreak = () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      let streak = 0;
      let currentDate = new Date(today);

      for (let i = 0; i < 365; i++) {
        const dayStart = new Date(currentDate);
        const dayEnd = new Date(currentDate);
        dayEnd.setHours(23, 59, 59, 999);

        const hasActivityOnDay = sessions.some(session => {
          const sessionDate = parseDate(session.date);
          return sessionDate && sessionDate >= dayStart && sessionDate <= dayEnd;
        });

        if (hasActivityOnDay) {
          streak++;
          currentDate.setDate(currentDate.getDate() - 1);
        } else {
          break;
        }
      }

      return streak;
    };

    const currentStreak = calculateStreak();

    // Calculate total points
    const totalPoints = items.reduce((total, item) => {
      if (item.completedDate) {
        return total + item.total;
      }
      return total + item.progress;
    }, 0);

    // Total progress ever
    const totalProgressEver = sessions.reduce((total, session) => total + (session.value || 0), 0);

    // Average progress per day
    const oldestSession = sessions.reduce((oldest, session) => {
      const sessionDate = parseDate(session.date);
      if (!sessionDate) return oldest;
      if (!oldest || sessionDate < oldest) return sessionDate;
      return oldest;
    }, null as Date | null);

    const daysSinceStart = oldestSession
      ? Math.max(1, Math.ceil((now.getTime() - oldestSession.getTime()) / (1000 * 60 * 60 * 24)))
      : 1;

    const avgProgressPerDay = totalProgressEver / daysSinceStart;

    // Goal percentage
    const goalValue = options.goalValue || 1000;
    const goalPercentage = Math.min(100, Math.round((progressThisMonth / goalValue) * 100));

    // Labels
    const progressLabel = options.progressLabel || this.getProgressLabel(trackerType);
    const itemLabel = options.itemLabel || this.getItemLabel(trackerType);

    return {
      progressThisWeek: Math.max(0, progressThisWeek),
      progressThisMonth: Math.max(0, progressThisMonth),
      itemsCompletedThisMonth: itemsCompletedThisMonth.length,
      itemsCompletedThisMonthList: itemsCompletedThisMonth,
      itemsInProgressThisMonth: itemsInProgressThisMonth,
      topItemThisWeek,
      totalItems: items.length,
      totalProgressEver: Math.max(0, totalProgressEver),
      avgProgressPerDay: Math.max(0, avgProgressPerDay),
      goalPercentage: Math.max(0, goalPercentage),
      currentStreak: Math.max(0, currentStreak),
      totalPoints: Math.max(0, totalPoints),
      progressLabel,
      itemLabel,
    };
  }

  // Generic graph data generation
  static generateProgressGraphData(
    sessions: ProgressSession[],
    trackerType: TrackerType = 'custom',
    options: {
      daysToShow?: number;
      valueLabel?: string;
      intensityThresholds?: number[];
    } = {}
  ): GraphData {
    const now = new Date();
    const daysToShow = options.daysToShow || 30;
    const intensityThresholds = options.intensityThresholds || [1, 15, 30, 50]; // Default thresholds
    const days = [];

    const parseDate = (dateValue: string | Date) => {
      if (!dateValue) return null;
      if (dateValue instanceof Date) return dateValue;
      const parsed = new Date(dateValue);
      return isNaN(parsed.getTime()) ? null : parsed;
    };

    for (let dayIndex = daysToShow - 1; dayIndex >= 0; dayIndex--) {
      const day = new Date(now);
      day.setDate(now.getDate() - dayIndex);
      day.setHours(0, 0, 0, 0);

      const dayEnd = new Date(day);
      dayEnd.setHours(23, 59, 59, 999);

      const valueOnDay = sessions
        .filter(session => {
          const sessionDate = parseDate(session.date);
          return sessionDate && sessionDate >= day && sessionDate <= dayEnd;
        })
        .reduce((total, session) => total + (session.value || 0), 0);

      let intensity = 0;
      if (valueOnDay > 0) {
        if (valueOnDay >= intensityThresholds[3]) intensity = 4;
        else if (valueOnDay >= intensityThresholds[2]) intensity = 3;
        else if (valueOnDay >= intensityThresholds[1]) intensity = 2;
        else intensity = 1;
      }

      days.push({
        date: new Date(day),
        value: valueOnDay,
        intensity,
        isToday: day.toDateString() === now.toDateString(),
      });
    }

    const totalValue = days.reduce((sum, day) => sum + day.value, 0);
    const activeDays = days.filter(day => day.value > 0).length;
    const maxValueInDay = Math.max(...days.map(day => day.value), 0);

    // Calculate current streak from graph data
    let currentStreak = 0;
    for (let i = days.length - 1; i >= 0; i--) {
      if (days[i].value > 0) {
        currentStreak++;
      } else {
        break;
      }
    }

    return {
      days,
      totalDays: days.length,
      activeDays,
      totalValue,
      maxValueInDay,
      currentStreak,
      valueLabel: options.valueLabel || this.getProgressLabel(trackerType),
    };
  }

  // Helper to get progress label based on tracker type
  static getProgressLabel(trackerType: TrackerType): string {
    switch (trackerType) {
      case 'reading':
        return 'Pages';
      case 'pomodoro':
        return 'Minutes';
      case 'skill':
        return 'Sessions';
      case 'habit':
        return 'Days';
      case 'fitness':
        return 'Reps';
      default:
        return 'Progress';
    }
  }

  // Helper to get item label based on tracker type
  static getItemLabel(trackerType: TrackerType): string {
    switch (trackerType) {
      case 'reading':
        return 'Books';
      case 'pomodoro':
        return 'Tasks';
      case 'skill':
        return 'Skills';
      case 'habit':
        return 'Habits';
      case 'fitness':
        return 'Workouts';
      default:
        return 'Items';
    }
  }

  static generateShareMessage(
    contentType: 'bookCompletion' | 'readingProgress' | 'readingGoal' | 'readingStreak',
    variables: Record<string, any>
  ): string {
    const messages = DEFAULT_SHARE_MESSAGES[contentType];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    return randomMessage.replace(/\{(\w+)\}/g, (match, key) => {
      return variables[key] || match;
    });
  }

  static buildShareUrl(platform: SocialPlatform, content: ShareContent): string {
    const platformConfig = SOCIAL_PLATFORMS[platform];
    if (!platformConfig || !platformConfig.shareUrl) return '';

    let url: string = platformConfig.shareUrl;

    // Replace placeholders
    url = url.replace('{url}', encodeURIComponent(content.url || ''));
    url = url.replace('{text}', encodeURIComponent(content.message || content.title || ''));
    url = url.replace('{tags}', encodeURIComponent(content.tags?.join(',') || ''));

    return url;
  }

  static async openShareUrl(url: string): Promise<boolean> {
    try {
      if (typeof window !== 'undefined') {
        // Web platform
        window.open(url, '_blank', 'width=600,height=400');
        return true;
      } else {
        // React Native
        const { Linking } = await import('react-native');
        const supported = await Linking.canOpenURL(url);

        if (supported) {
          await Linking.openURL(url);
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Error opening share URL:', error);
      return false;
    }
  }

  static async copyToClipboard(text: string): Promise<boolean> {
    try {
      if (typeof window !== 'undefined' && window.navigator.clipboard) {
        // Web platform
        await window.navigator.clipboard.writeText(text);
        return true;
      } else {
        // React Native - use expo-clipboard
        const ClipboardNative = await import('expo-clipboard') as any;
        await ClipboardNative.setStringAsync(text);
        return true;
      }
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      return false;
    }
  }

  // Generic level name getter
  static getLevelName(level: number, trackerType: TrackerType = 'reading'): string {
    const levels = [
      { min: 0, max: 99, name: 'Novice' },
      { min: 100, max: 299, name: 'Beginner' },
      { min: 300, max: 699, name: 'Intermediate' },
      { min: 700, max: 1499, name: 'Advanced' },
      { min: 1500, max: 2999, name: 'Expert' },
      { min: 3000, max: 5999, name: 'Master' },
      { min: 6000, max: Infinity, name: 'Grand Master' },
    ];

    const levelData = levels.find(l => level >= l.min && level <= l.max);
    return levelData?.name || 'Novice';
  }

  // Backward compatible method
  static getReaderLevelName(readerLevel: number): string {
    return this.getLevelName(readerLevel, 'reading');
  }

  static calculateReadingStats(books: any[], readingSessions: any[]): any {
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth(), 1);

    const parseDate = (dateValue: string | Date) => {
      if (!dateValue) return null;
      if (dateValue instanceof Date) return dateValue;
      const parsed = new Date(dateValue);
      return isNaN(parsed.getTime()) ? null : parsed;
    };

    const getPagesFromSession = (session: any) => {
      return Math.max(0, session.endPage - session.startPage);
    };

    // Pages read this week
    const pagesThisWeek = readingSessions
      .filter(session => {
        const sessionDate = parseDate(session.date);
        return sessionDate && sessionDate >= oneWeekAgo && sessionDate <= now;
      })
      .reduce((total, session) => total + getPagesFromSession(session), 0);

    // Pages read this month
    const pagesThisMonth = readingSessions
      .filter(session => {
        const sessionDate = parseDate(session.date);
        return sessionDate && sessionDate >= oneMonthAgo && sessionDate <= now;
      })
      .reduce((total, session) => total + getPagesFromSession(session), 0);

    // Books completed this month
    const booksCompletedThisMonth = books.filter(book => {
      if (!book.completedDate) return false;
      const completionDate = parseDate(book.completedDate);
      return completionDate && completionDate >= oneMonthAgo && completionDate <= now;
    }).length;

    // Calculate reading streak
    const calculateReadingStreak = () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      let streak = 0;
      let currentDate = new Date(today);

      for (let i = 0; i < 365; i++) {
        const dayStart = new Date(currentDate);
        const dayEnd = new Date(currentDate);
        dayEnd.setHours(23, 59, 59, 999);

        const hasReadingOnDay = readingSessions.some(session => {
          const sessionDate = parseDate(session.date);
          return sessionDate && sessionDate >= dayStart && sessionDate <= dayEnd;
        });

        if (hasReadingOnDay) {
          streak++;
          currentDate.setDate(currentDate.getDate() - 1);
        } else {
          break;
        }
      }

      return streak;
    };

    const readingStreak = calculateReadingStreak();

    // Calculate total points
    const totalPoints = books.reduce((total, book) => {
      if (book.completedDate) {
        return total + book.totalPages;
      }
      return total + book.currentPage;
    }, 0);

    return {
      pagesThisWeek: Math.max(0, pagesThisWeek),
      pagesThisMonth: Math.max(0, pagesThisMonth),
      booksCompletedThisMonth: Math.max(0, booksCompletedThisMonth),
      totalBooks: Math.max(0, books.length),
      totalPagesEver: readingSessions.reduce((total, session) => total + getPagesFromSession(session), 0),
      readingStreak: Math.max(0, readingStreak),
      totalPoints: Math.max(0, totalPoints),
      goalPercentage: Math.min(100, Math.round((pagesThisMonth / 1000) * 100)), // Assuming 1000 page goal
    };
  }

  static generateReadingGraphData(readingSessions: any[]): any {
    const now = new Date();
    const daysToShow = 30;
    const days = [];

    const parseDate = (dateValue: string | Date) => {
      if (!dateValue) return null;
      if (dateValue instanceof Date) return dateValue;
      const parsed = new Date(dateValue);
      return isNaN(parsed.getTime()) ? null : parsed;
    };

    for (let dayIndex = daysToShow - 1; dayIndex >= 0; dayIndex--) {
      const day = new Date(now);
      day.setDate(now.getDate() - dayIndex);
      day.setHours(0, 0, 0, 0);

      const dayEnd = new Date(day);
      dayEnd.setHours(23, 59, 59, 999);

      const pagesOnDay = readingSessions
        .filter(session => {
          const sessionDate = parseDate(session.date);
          return sessionDate && sessionDate >= day && sessionDate <= dayEnd;
        })
        .reduce((total, session) => total + Math.max(0, session.endPage - session.startPage), 0);

      let intensity = 0;
      if (pagesOnDay > 0) {
        if (pagesOnDay >= 50) intensity = 4;
        else if (pagesOnDay >= 30) intensity = 3;
        else if (pagesOnDay >= 15) intensity = 2;
        else intensity = 1;
      }

      days.push({
        date: new Date(day),
        pages: pagesOnDay,
        intensity,
        isToday: day.toDateString() === now.toDateString(),
      });
    }

    return {
      days,
      totalDays: days.length,
      activeDays: days.filter(day => day.pages > 0).length,
      totalPages: days.reduce((sum, day) => sum + day.pages, 0),
      maxPagesInDay: Math.max(...days.map(day => day.pages)),
    };
  }
}