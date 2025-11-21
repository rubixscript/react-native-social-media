import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TrackerType } from '../../types';
import { getTrackerEmoji } from '../../utils/helpers/trackerHelpers';

interface BrandingFooterProps {
  trackerType: TrackerType;
  bannerFooter?: string;
}

export const BrandingFooter: React.FC<BrandingFooterProps> = ({
  trackerType,
  bannerFooter,
}) => {
  return (
    <View style={styles.appBranding}>
      <View style={styles.appIconContainer}>
        <Text style={styles.appIconText}>{getTrackerEmoji(trackerType)}</Text>
      </View>
      <Text style={styles.appName}>{bannerFooter || 'RubixScript'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
});
