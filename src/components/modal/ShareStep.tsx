import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ShareButtons from '../ShareButtons';
import { ShareContent } from '../../types';

interface ShareStepProps {
  title: string;
  description: string;
  darkMode?: boolean;
  shareContent: ShareContent;
  onShare: (platform: string) => void;
}

export const ShareStep: React.FC<ShareStepProps> = ({
  title,
  description,
  darkMode,
  shareContent,
  onShare,
}) => {
  return (
    <View style={styles.shareSection}>
      <Text style={[styles.sectionTitle, darkMode && styles.darkText]}>{title}</Text>
      <Text style={[styles.shareDescription, darkMode && styles.darkSecondaryText]}>
        {description}
      </Text>

      <ShareButtons
        content={shareContent}
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
  darkSecondaryText: {
    color: '#aaa',
  },
  shareDescription: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
    textAlign: 'center',
  },
});
