import React, { useRef, useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import ViewShot from 'react-native-view-shot';
import { BannerGeneratorProps, BannerTemplate, LayoutType } from '../types';
import { DEFAULT_BANNER_TEMPLATES } from '../constants/templates';
import { ShareHelpers } from '../utils/shareHelpers';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BANNER_WIDTH = SCREEN_WIDTH - 40;
const BANNER_HEIGHT = 480;

export interface BannerGeneratorRef {
  generateBanner: () => Promise<string | null>;
}

const BannerGenerator = forwardRef<BannerGeneratorRef, BannerGeneratorProps>(({
  data,
  profile,
  template = DEFAULT_BANNER_TEMPLATES[0],
  layoutType = 'stats',
  graphData,
  onBannerGenerated,
  trackerType = 'reading',
  bannerTitle,
  bannerFooter,
}, ref) => {
  const viewShotRef = useRef<ViewShot>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastGeneratedConfig, setLastGeneratedConfig] = useState<string>('');

  const generateBanner = async (): Promise<string | null> => {
    try {
      setIsGenerating(true);

      // Wait a bit for the component to fully render with new props
      await new Promise(resolve => setTimeout(resolve, 100));

      const uri = await viewShotRef.current?.capture?.();

      if (!uri) {
        throw new Error('Failed to capture banner image');
      }

      // Track the configuration that was used to generate this banner
      const config = JSON.stringify({
        templateId: template.id,
        layoutType,
        trackerType,
      });
      setLastGeneratedConfig(config);

      onBannerGenerated?.(uri);
      return uri;
    } catch (error) {
      console.error('Error generating banner:', error);
      onBannerGenerated?.(''); // Notify with empty string on error
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  // Expose generateBanner method to parent via ref
  useImperativeHandle(ref, () => ({
    generateBanner,
  }));

  const getTrackerEmoji = () => {
    switch (trackerType) {
      case 'reading': return '📚';
      case 'pomodoro': return '🍅';
      case 'skill': return '💪';
      case 'habit': return '✅';
      case 'fitness': return '🏋️';
      default: return '⭐';
    }
  };

  const renderStatsSection = () => {
    if (layoutType === 'graph' && graphData) {
      return (
        <View style={styles.graphSection}>
          {/* Activity Graph */}
          <View style={styles.graphContainer}>
            <View style={styles.graphGrid}>
              {Array.from({ length: 5 }, (_, rowIndex) => (
                <View key={rowIndex} style={styles.graphRow}>
                  {Array.from({ length: 6 }, (_, colIndex) => {
                    const dayIndex = rowIndex * 6 + colIndex;
                    const day = graphData.days[dayIndex];

                    if (!day) return <View key={colIndex} style={styles.graphDayEmpty} />;

                    return (
                      <View
                        key={colIndex}
                        style={[
                          styles.graphDay,
                          {
                            backgroundColor: day.intensity === 0 ? 'rgba(255,255,255,0.1)' :
                              day.intensity === 1 ? 'rgba(100,200,255,0.3)' :
                              day.intensity === 2 ? 'rgba(100,200,255,0.5)' :
                              day.intensity === 3 ? 'rgba(100,200,255,0.7)' :
                              'rgba(100,200,255,0.9)'
                          },
                          day.isToday && styles.graphDayToday,
                        ]}
                      />
                    );
                  })}
                </View>
              ))}
            </View>

            {/* Graph Legend */}
            <View style={styles.graphLegend}>
              <Text style={styles.graphLegendText}>Less</Text>
              <View style={styles.graphLegendScale}>
                <View style={[styles.graphLegendBox, { backgroundColor: 'rgba(255,255,255,0.1)' }]} />
                <View style={[styles.graphLegendBox, { backgroundColor: 'rgba(100,200,255,0.3)' }]} />
                <View style={[styles.graphLegendBox, { backgroundColor: 'rgba(100,200,255,0.5)' }]} />
                <View style={[styles.graphLegendBox, { backgroundColor: 'rgba(100,200,255,0.7)' }]} />
                <View style={[styles.graphLegendBox, { backgroundColor: 'rgba(100,200,255,0.9)' }]} />
              </View>
              <Text style={styles.graphLegendText}>More</Text>
            </View>
          </View>
        </View>
      );
    }

    // Default stats layout - now generic
    const progressLabel = 'progressLabel' in data ? (data as any).progressLabel : 'Progress';
    const itemLabel = 'itemLabel' in data ? (data as any).itemLabel : 'Items';
    const progressValue = 'progressThisMonth' in data ? (data as any).progressThisMonth : ('pagesThisMonth' in data ? (data as any).pagesThisMonth : 0);
    const itemsCompleted = 'itemsCompletedThisMonth' in data ? (data as any).itemsCompletedThisMonth : ('booksCompletedThisMonth' in data ? (data as any).booksCompletedThisMonth : 0);
    const streak = 'currentStreak' in data ? (data as any).currentStreak : ('readingStreak' in data ? (data as any).readingStreak : 0);

    return (
      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text style={styles.statTitle}>{progressLabel}</Text>
          <FontAwesome name="bar-chart" size={16} color="#FF9800" />
          <Text style={styles.statValue}>{progressValue}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statTitle}>% Goal</Text>
          <FontAwesome name="crosshairs" size={16} color="#4CAF50" />
          <Text style={styles.statValue}>{data.goalPercentage}%</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statTitle}>{itemLabel}</Text>
          <FontAwesome name="check-circle" size={16} color="#2196F3" />
          <Text style={styles.statValue}>{itemsCompleted}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statTitle}>Streak</Text>
          <FontAwesome name="fire" size={16} color="#F44336" />
          <Text style={styles.statValue}>{streak}</Text>
        </View>
      </View>
    );
  };

  const renderBanner = () => (
    <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 0.95 }}>
      <View style={styles.cardContainer}>
        <LinearGradient
          colors={template.colors as [string, string, ...string[]]}
          style={[styles.card, layoutType === 'graph' && styles.dynamicHeight]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.additional}>
            <BlurView intensity={80} tint="dark" style={styles.glassBackground} />
            <View style={styles.glassContent}>
              <View style={styles.userCard}>
                <View style={styles.level}>
                  <Text style={styles.levelText}>
                    Level {profile ? ShareHelpers.getLevelName(profile.level, trackerType) : 'Novice'}
                  </Text>
                </View>
                <View style={styles.points}>
                  <Text style={styles.pointsText}>{data.totalPoints.toLocaleString()} Points</Text>
                </View>

                {/* Avatar */}
                <View style={styles.avatarContainer}>
                  <View style={styles.avatarBackground}>
                    <View style={styles.headContainer}>
                      {/* Hair */}
                      <View style={[styles.hair, { backgroundColor: '#2f1b0d' }]} />
                      {/* Face */}
                      <View style={[styles.face, { backgroundColor: '#eab38f' }]}>
                        {/* Eyes */}
                        <View style={styles.eyesContainer}>
                          <View style={[styles.eye, { backgroundColor: '#1f1f1f' }]} />
                          <View style={[styles.eye, { backgroundColor: '#1f1f1f' }]} />
                        </View>
                        {/* Nose */}
                        <View style={styles.nose} />
                        {/* Mouth */}
                        <View style={[styles.mouth, { backgroundColor: '#d73e3e' }]} />
                      </View>
                      {/* Shirt */}
                      <View style={[styles.shirt, { backgroundColor: '#8665c2' }]}>
                        <View style={styles.collar} />
                        <View style={styles.buttons}>
                          <View style={[styles.button, { backgroundColor: '#5a487b' }]} />
                          <View style={[styles.button, { backgroundColor: '#5a487b' }]} />
                          <View style={[styles.button, { backgroundColor: '#5a487b' }]} />
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.moreInfo}>
                <Text style={styles.userName}>
                  {profile?.name || (profile?.title || 'User')}
                </Text>

                {/* Items section (Books, Tasks, Skills, etc.) */}
                <View style={styles.booksSection}>
                  <View style={styles.booksSectionHeader}>
                    <Text style={styles.booksSectionTitle}>
                      {bannerTitle || `${('itemLabel' in data ? data.itemLabel : 'Items')} This Month`}
                    </Text>
                    {layoutType === 'graph' && graphData && (
                      <View style={styles.daysBadge}>
                        <Text style={styles.daysBadgeText}>
                          {graphData.activeDays} days
                        </Text>
                      </View>
                    )}
                  </View>

                  {(() => {
                    // Get items list (supports both generic and reading-specific)
                    const itemsList = 'itemsInProgressThisMonth' in data
                      ? (data as any).itemsInProgressThisMonth
                      : ('booksReadThisMonth' in data ? (data as any).booksReadThisMonth : []);

                    if (itemsList && itemsList.length > 0) {
                      return itemsList.slice(0, 3).map((item: any, index: number) => {
                        const itemProgress = 'progress' in item ? item.progress : ('currentPage' in item ? item.currentPage : 0);
                        const itemTotal = 'total' in item ? item.total : ('totalPages' in item ? item.totalPages : 100);
                        const progressLabel = 'progressLabel' in data ? (data as any).progressLabel : 'Progress';

                        return (
                          <View key={item.id} style={styles.bookItem}>
                            <Text style={styles.bookEmoji}>{getTrackerEmoji()}</Text>
                            <View style={styles.bookInfo}>
                              <Text style={styles.bookTitle} numberOfLines={1}>
                                {item.title}
                              </Text>
                            </View>
                            <Text style={styles.bookPages}>
                              {Math.min(itemProgress, itemTotal)}/{itemTotal}
                            </Text>
                          </View>
                        );
                      });
                    } else {
                      const itemLabel = 'itemLabel' in data ? (data as any).itemLabel.toLowerCase() : 'items';
                      return (
                        <View style={styles.bookItem}>
                          <Text style={styles.bookEmoji}>{getTrackerEmoji()}</Text>
                          <View style={styles.bookInfo}>
                            <Text style={styles.bookTitle}>No {itemLabel} this month</Text>
                          </View>
                        </View>
                      );
                    }
                  })()}

                  {(() => {
                    const itemsList = 'itemsInProgressThisMonth' in data
                      ? (data as any).itemsInProgressThisMonth
                      : ('booksReadThisMonth' in data ? (data as any).booksReadThisMonth : []);

                    if (itemsList && itemsList.length > 3) {
                      return (
                        <Text style={styles.moreBooks}>
                          +{itemsList.length - 3} more
                        </Text>
                      );
                    }
                    return null;
                  })()}
                </View>

                {/* Conditional Stats/Graph Section */}
                {renderStatsSection()}

                {/* App branding at bottom */}
                <View style={styles.appBranding}>
                  <View style={styles.appIconContainer}>
                    <Text style={styles.appIconText}>{getTrackerEmoji()}</Text>
                  </View>
                  <Text style={styles.appName}>{bannerFooter || 'RubixScript'}</Text>
                </View>
              </View>
            </View>
          </View>
        </LinearGradient>
      </View>
    </ViewShot>
  );

  return (
    <View style={styles.container}>
      {renderBanner()}
    </View>
  );
});

BannerGenerator.displayName = 'BannerGenerator';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
  },
  cardContainer: {
    alignSelf: 'center',
    padding: 10,
  },
  card: {
    width: BANNER_WIDTH,
    height: BANNER_HEIGHT + 140,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.8,
    shadowRadius: 30,
    elevation: 25,
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  dynamicHeight: {
    height: BANNER_HEIGHT + 120,
  },
  additional: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 2,
    borderRadius: 20,
    overflow: 'hidden',
  },
  glassBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  glassContent: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    padding: 20,
    borderRadius: 20,
    backgroundColor: 'transparent',
  },
  userCard: {
    alignItems: 'center',
    marginBottom: 20,
  },
  level: {
    backgroundColor: 'rgba(100, 200, 255, 0.2)',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(100, 200, 255, 0.4)',
  },
  levelText: {
    color: '#64c8ff',
    fontSize: 14,
    fontWeight: '700',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  points: {
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.4)',
  },
  pointsText: {
    color: '#ffd700',
    fontSize: 14,
    fontWeight: '700',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  avatarContainer: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: 'rgba(176, 210, 229, 0.3)',
    marginBottom: 5,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  avatarBackground: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(176, 210, 229, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  headContainer: {
    width: 90,
    height: 90,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hair: {
    position: 'absolute',
    top: 5,
    width: 65,
    height: 45,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  face: {
    width: 55,
    height: 55,
    borderRadius: 27,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  eyesContainer: {
    flexDirection: 'row',
    gap: 15,
    marginTop: -5,
    marginBottom: 8,
  },
  eye: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
  },
  nose: {
    width: 3,
    height: 3,
    backgroundColor: '#d4a574',
    borderRadius: 1.5,
    marginBottom: 8,
  },
  mouth: {
    width: 20,
    height: 8,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  shirt: {
    position: 'absolute',
    bottom: -10,
    width: 70,
    height: 40,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  collar: {
    position: 'absolute',
    top: 0,
    left: '50%',
    marginLeft: -10,
    width: 20,
    height: 8,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  buttons: {
    position: 'absolute',
    top: 12,
    left: '50%',
    marginLeft: -2,
    alignItems: 'center',
    gap: 4,
  },
  button: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  moreInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: 'rgba(0,0,0,0.7)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  booksSection: {
    marginBottom: 15,
  },
  booksSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  booksSectionTitle: {
    fontSize: 16,
    color: '#e0e0e0',
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.7)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  bookItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    paddingHorizontal: 5,
    gap: 8,
  },
  bookEmoji: {
    fontSize: 14,
  },
  bookInfo: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 13,
    color: '#ffffff',
    fontWeight: '600',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  bookPages: {
    fontSize: 11,
    color: '#64c8ff',
    fontWeight: '700',
    backgroundColor: 'rgba(100, 200, 255, 0.15)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(100, 200, 255, 0.3)',
  },
  moreBooks: {
    fontSize: 12,
    color: '#cccccc',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 5,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
  },
  statItem: {
    alignItems: 'center',
    gap: 4,
  },
  statTitle: {
    fontSize: 10,
    fontWeight: '700',
    color: '#e0e0e0',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0,0,0,0.7)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#ffffff',
    textShadowColor: 'rgba(0,0,0,0.7)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  appBranding: {
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 5,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
  },
  appIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(100, 200, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
    borderWidth: 1,
    borderColor: 'rgba(100, 200, 255, 0.4)',
    shadowColor: '#64c8ff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  appIconText: {
    fontSize: 24,
  },
  appName: {
    fontSize: 11,
    color: '#64c8ff',
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  daysBadge: {
    backgroundColor: 'rgba(100, 200, 255, 0.2)',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: 'rgba(100, 200, 255, 0.4)',
  },
  daysBadgeText: {
    fontSize: 11,
    color: '#64c8ff',
    fontWeight: '700',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  // Graph styles
  graphSection: {
    marginTop: 10,
  },
  graphContainer: {
    marginBottom: 15,
    alignItems: 'center',
  },
  graphGrid: {
    gap: 2,
    marginBottom: 8,
    alignItems: 'center',
  },
  graphRow: {
    flexDirection: 'row',
    gap: 2,
  },
  graphDay: {
    width: 10,
    height: 10,
    borderRadius: 2.5,
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  graphDayEmpty: {
    width: 10,
    height: 10,
    borderRadius: 2.5,
    backgroundColor: 'transparent',
  },
  graphDayToday: {
    borderColor: 'rgba(100,200,255,1)',
    borderWidth: 1.5,
  },
  graphLegend: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  graphLegendText: {
    fontSize: 9,
    color: '#e0e0e0',
    fontWeight: '500',
  },
  graphLegendScale: {
    flexDirection: 'row',
    gap: 2,
  },
  graphLegendBox: {
    width: 12,
    height: 12,
    borderRadius: 2.5,
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.1)',
  },
});

export default BannerGenerator;