import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ProgressStats, ReadingStats, TrackerType } from '../../types';

interface StatsSummaryProps {
  stats: ProgressStats | ReadingStats;
  trackerType: TrackerType;
  darkMode?: boolean;
}

export const StatsSummary: React.FC<StatsSummaryProps> = ({
  stats,
  trackerType,
  darkMode = false,
}) => {
  const progressLabel = 'progressLabel' in stats ? stats.progressLabel : 'Progress';
  const itemLabel = 'itemLabel' in stats ? stats.itemLabel : 'Items';
  const progressThisMonth = 'progressThisMonth' in stats ? stats.progressThisMonth : 0;
  const itemsCompleted = 'itemsCompletedThisMonth' in stats ? stats.itemsCompletedThisMonth : 0;
  const totalItems = 'totalItems' in stats ? stats.totalItems : 0;
  const totalProgress = 'totalProgressEver' in stats ? stats.totalProgressEver : 0;

  return (
    <View style={[styles.summarySection, darkMode && styles.darkSummarySection]}>
      <Text style={[styles.sectionTitle, darkMode && styles.darkText]}>
        Your {trackerType.charAt(0).toUpperCase() + trackerType.slice(1)} Stats
      </Text>
      <View style={styles.summaryGrid}>
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryNumber, darkMode && styles.darkText]}>
            {progressThisMonth}
          </Text>
          <Text style={[styles.summaryLabel, darkMode && styles.darkSecondaryText]}>
            {progressLabel} This Month
          </Text>
        </View>

        <View style={styles.summaryItem}>
          <Text style={[styles.summaryNumber, darkMode && styles.darkText]}>
            {itemsCompleted}
          </Text>
          <Text style={[styles.summaryLabel, darkMode && styles.darkSecondaryText]}>
            {itemLabel} Completed
          </Text>
        </View>

        <View style={styles.summaryItem}>
          <Text style={[styles.summaryNumber, darkMode && styles.darkText]}>
            {totalItems}
          </Text>
          <Text style={[styles.summaryLabel, darkMode && styles.darkSecondaryText]}>
            Total {itemLabel}
          </Text>
        </View>

        <View style={styles.summaryItem}>
          <Text style={[styles.summaryNumber, darkMode && styles.darkText]}>
            {totalProgress}
          </Text>
          <Text style={[styles.summaryLabel, darkMode && styles.darkSecondaryText]}>
            Total {progressLabel}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  summarySection: {
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  darkSummarySection: {
    backgroundColor: '#1a1a1a',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    letterSpacing: -0.3,
    marginBottom: 16,
  },
  darkText: {
    color: '#fff',
  },
  darkSecondaryText: {
    color: '#aaa',
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  summaryItem: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    padding: 16,
  },
  summaryNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: '#333',
    letterSpacing: -0.5,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 6,
    fontWeight: '600',
  },
});
