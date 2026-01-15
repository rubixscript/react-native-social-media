import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { ProgressStats, ReadingStats, SocialShareModalLabels } from '../../types';

interface StatsGridProps {
  data: ProgressStats | ReadingStats;
  statLabels?: SocialShareModalLabels;
}

export const StatsGrid: React.FC<StatsGridProps> = ({ data, statLabels }) => {
  const progressLabel = 'progressLabel' in data ? (data as any).progressLabel : 'Progress';
  const itemLabel = 'itemLabel' in data ? (data as any).itemLabel : 'Items';
  const progressValue = 'progressThisMonth' in data
    ? (data as any).progressThisMonth
    : 'pagesThisMonth' in data
    ? (data as any).pagesThisMonth
    : 0;
  const itemsCompleted = 'itemsCompletedThisMonth' in data
    ? (data as any).itemsCompletedThisMonth
    : 'booksCompletedThisMonth' in data
    ? (data as any).booksCompletedThisMonth
    : 0;
  const streak = 'currentStreak' in data
    ? (data as any).currentStreak
    : 'readingStreak' in data
    ? (data as any).readingStreak
    : 0;

  // Custom labels with defaults
  const stat1Label = statLabels?.bannerStat1Label || progressLabel;
  const stat1Icon = statLabels?.bannerStat1Icon || 'bar-chart';
  const stat1Value = statLabels?.bannerStat1Value || String(progressValue);

  const stat2Label = statLabels?.bannerStat2Label || '% Goal';
  const stat2Icon = statLabels?.bannerStat2Icon || 'crosshairs';
  const stat2Value = statLabels?.bannerStat2Value || `${data.goalPercentage}%`;

  const stat3Label = statLabels?.bannerStat3Label || itemLabel;
  const stat3Icon = statLabels?.bannerStat3Icon || 'check-circle';
  const stat3Value = statLabels?.bannerStat3Value || String(itemsCompleted);

  const stat4Label = statLabels?.bannerStat4Label || 'Streak';
  const stat4Icon = statLabels?.bannerStat4Icon || 'fire';
  const stat4Value = statLabels?.bannerStat4Value || String(streak);

  return (
    <View style={styles.stats}>
      <View style={styles.statItem}>
        <Text style={styles.statTitle}>{stat1Label}</Text>
        <FontAwesome name={stat1Icon as any} size={16} color="#FF9800" />
        <Text style={styles.statValue}>{stat1Value}</Text>
      </View>

      <View style={styles.statItem}>
        <Text style={styles.statTitle}>{stat2Label}</Text>
        <FontAwesome name={stat2Icon as any} size={16} color="#4CAF50" />
        <Text style={styles.statValue}>{stat2Value}</Text>
      </View>

      <View style={styles.statItem}>
        <Text style={styles.statTitle}>{stat3Label}</Text>
        <FontAwesome name={stat3Icon as any} size={16} color="#2196F3" />
        <Text style={styles.statValue}>{stat3Value}</Text>
      </View>

      <View style={styles.statItem}>
        <Text style={styles.statTitle}>{stat4Label}</Text>
        <FontAwesome name={stat4Icon as any} size={16} color="#F44336" />
        <Text style={styles.statValue}>{stat4Value}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
});
