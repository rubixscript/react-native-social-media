import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TrackerType } from '../../types';
import ShareButtons from '../ShareButtons';

interface ShareStepProps {
  trackerType: TrackerType;
  bannerTitle?: string;
  darkMode?: boolean;
  onShare: (platform: string) => void;
}

export const ShareStep: React.FC<ShareStepProps> = ({
  trackerType,
  bannerTitle,
  darkMode = false,
  onShare,
}) => {
  const title =
    bannerTitle ||
    `My ${trackerType.charAt(0).toUpperCase() + trackerType.slice(1)} Progress`;

  return (
    <View style={styles.shareSection}>
      <Text style={[styles.sectionTitle, darkMode && styles.darkText]}>
        Share Your Progress
      </Text>
      <Text style={[styles.shareDescription, darkMode && styles.darkSecondaryText]}>
        Share your progress with friends and family on your favorite social media platforms!
      </Text>

      <ShareButtons
        content={{
          title,
          message: 'Check out my progress! 🎉',
          tags: [trackerType, 'progress', 'goals'],
        }}
        buttonStyle="primary"
        size="large"
        darkMode={darkMode}
        onShare={onShare}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  shareSection: {
    marginBottom: 24,
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
  shareDescription: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
    textAlign: 'center',
    color: '#666',
  },
  darkSecondaryText: {
    color: '#aaa',
  },
});
