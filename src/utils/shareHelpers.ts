import { ShareContent, SocialPlatform, UserProfile } from '../types';
import { SOCIAL_PLATFORMS, DEFAULT_SHARE_MESSAGES } from '../constants/templates';

export class ShareHelpers {
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

    let url = platformConfig.shareUrl;

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
        const ClipboardNative = await import('expo-clipboard');
        await ClipboardNative.setStringAsync(text);
        return true;
      }
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      return false;
    }
  }

  static getReaderLevelName(readerLevel: number): string {
    const levels = [
      { min: 0, max: 99, name: 'Novice' },
      { min: 100, max: 299, name: 'Beginner' },
      { min: 300, max: 699, name: 'Intermediate' },
      { min: 700, max: 1499, name: 'Advanced' },
      { min: 1500, max: 2999, name: 'Expert' },
      { min: 3000, max: 5999, name: 'Master' },
      { min: 6000, max: Infinity, name: 'Grand Master' },
    ];

    const level = levels.find(l => readerLevel >= l.min && readerLevel <= l.max);
    return level?.name || 'Novice';
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