import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ProgressStats } from '../../types';

interface StatsSummaryProps {
  title: string;
  stats: ProgressStats;
  darkMode?: boolean;
}

interface StatItem {
  label: string;
  value: number;
}

export const StatsSummary: React.FC<StatsSummaryProps> = ({ title, stats, darkMode }) => {
  const getProgressLabel = () => stats.progressLabel || 'Progress';
  const getItemLabel = () => stats.itemLabel || 'Items';

  const statItems: StatItem[] = [
    { label: `${getProgressLabel()} This Month`, value: stats.progressThisMonth },
    { label: `${getItemLabel()} Completed`, value: stats.itemsCompletedThisMonth },
    { label: `Total ${getItemLabel()}`, value: stats.totalItems },
    { label: `Total ${getProgressLabel()}`, value: stats.totalProgressEver },
  ];

  return (
    <View style={[styles.summarySection, darkMode && styles.darkSummarySection]}>
      <Text style={[styles.sectionTitle, darkMode && styles.darkText]}>{title}</Text>
      <View style={styles.summaryGrid}>
        {statItems.map((item, index) => (
          <View key={index} style={styles.summaryItem}>
            <Text style={[styles.summaryNumber, darkMode && styles.darkText]}>{item.value}</Text>
            <Text style={[styles.summaryLabel, darkMode && styles.darkSecondaryText]}>
              {item.label}
            </Text>
          </View>
        ))}
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
