import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { ProgressStats, ReadingStats } from '../../types';

interface StatsGridProps {
  data: ProgressStats | ReadingStats;
}

export const StatsGrid: React.FC<StatsGridProps> = ({ data }) => {
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
