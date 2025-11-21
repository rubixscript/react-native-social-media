import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ProgressStats, ReadingStats, TrackerType, GraphData } from '../../types';
import { getTrackerEmoji } from '../../utils/helpers/trackerHelpers';

interface ItemsListProps {
  data: ProgressStats | ReadingStats;
  trackerType: TrackerType;
  bannerTitle?: string;
  layoutType?: 'stats' | 'graph';
  graphData?: GraphData;
}

export const ItemsList: React.FC<ItemsListProps> = ({
  data,
  trackerType,
  bannerTitle,
  layoutType,
  graphData,
}) => {
  const itemLabel = 'itemLabel' in data ? (data as any).itemLabel : 'Items';
  const itemsList = 'itemsInProgressThisMonth' in data
    ? (data as any).itemsInProgressThisMonth
    : 'booksReadThisMonth' in data
    ? (data as any).booksReadThisMonth
    : [];

  const emoji = getTrackerEmoji(trackerType);

  return (
    <View style={styles.booksSection}>
      <View style={styles.booksSectionHeader}>
        <Text style={styles.booksSectionTitle}>
          {bannerTitle || `${itemLabel} This Month`}
        </Text>
        {layoutType === 'graph' && graphData && (
          <View style={styles.daysBadge}>
            <Text style={styles.daysBadgeText}>{graphData.activeDays} days</Text>
          </View>
        )}
      </View>

      {itemsList && itemsList.length > 0 ? (
        itemsList.slice(0, 3).map((item: any) => {
          const itemProgress = 'progress' in item
            ? item.progress
            : 'currentPage' in item
            ? item.currentPage
            : 0;
          const itemTotal = 'total' in item
            ? item.total
            : 'totalPages' in item
            ? item.totalPages
            : 100;

          return (
            <View key={item.id} style={styles.bookItem}>
              <Text style={styles.bookEmoji}>{emoji}</Text>
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
        })
      ) : (
        <View style={styles.bookItem}>
          <Text style={styles.bookEmoji}>{emoji}</Text>
          <View style={styles.bookInfo}>
            <Text style={styles.bookTitle}>No {itemLabel.toLowerCase()} this month</Text>
          </View>
        </View>
      )}

      {itemsList && itemsList.length > 3 && (
        <Text style={styles.moreBooks}>+{itemsList.length - 3} more</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
});
