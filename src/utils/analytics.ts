import { ShareAnalytics } from '../types';

export class ShareAnalytics {
  private static instance: ShareAnalytics;
  private analytics: ShareAnalytics[] = [];

  private constructor() {}

  public static getInstance(): ShareAnalytics {
    if (!ShareAnalytics.instance) {
      ShareAnalytics.instance = new ShareAnalytics();
    }
    return ShareAnalytics.instance;
  }

  public trackShare(analytics: ShareAnalytics): void {
    this.analytics.push(analytics);

    // In a real implementation, you would send this to your analytics service
    console.log('Share Analytics:', analytics);

    // Store locally for offline support
    this.storeAnalytics(analytics);
  }

  public getShareStats(): {
    totalShares: number;
    sharesByPlatform: Record<string, number>;
    successRate: number;
    mostPopularPlatform: string;
  } {
    const totalShares = this.analytics.length;
    const sharesByPlatform: Record<string, number> = {};
    const successfulShares = this.analytics.filter(a => a.success).length;

    this.analytics.forEach(analytics => {
      sharesByPlatform[analytics.platform] = (sharesByPlatform[analytics.platform] || 0) + 1;
    });

    const mostPopularPlatform = Object.keys(sharesByPlatform).reduce((a, b) =>
      sharesByPlatform[a] > sharesByPlatform[b] ? a : b, ''
    );

    return {
      totalShares,
      sharesByPlatform,
      successRate: totalShares > 0 ? (successfulShares / totalShares) * 100 : 0,
      mostPopularPlatform,
    };
  }

  private async storeAnalytics(analytics: ShareAnalytics): Promise<void> {
    // Store in AsyncStorage or local storage for web
    try {
      // Implementation would depend on the platform
      if (typeof window !== 'undefined' && window.localStorage) {
        const existing = localStorage.getItem('share_analytics') || '[]';
        const parsed = JSON.parse(existing);
        parsed.push(analytics);
        localStorage.setItem('share_analytics', JSON.stringify(parsed));
      }
    } catch (error) {
      console.warn('Failed to store analytics:', error);
    }
  }

  public async exportAnalytics(): Promise<ShareAnalytics[]> {
    return [...this.analytics];
  }

  public clearAnalytics(): void {
    this.analytics = [];
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem('share_analytics');
      }
    } catch (error) {
      console.warn('Failed to clear analytics:', error);
    }
  }
}