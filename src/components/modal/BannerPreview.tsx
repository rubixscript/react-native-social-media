import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import BannerGenerator, { BannerGeneratorRef } from '../BannerGenerator';
import { BannerTemplate, GraphData, ProgressStats, UserProfile, TrackerType } from '../../types';

export type LayoutType = 'stats' | 'graph';

interface BannerPreviewProps {
  title: string;
  darkMode?: boolean;
  layoutType: LayoutType;
  onLayoutChange: (type: LayoutType) => void;
  stats: ProgressStats;
  profile?: UserProfile;
  template: BannerTemplate;
  graphData: GraphData;
  bannerGeneratorRef: React.RefObject<BannerGeneratorRef>;
  onBannerGenerated: (uri: string) => void;
  trackerType: TrackerType;
  bannerTitle?: string;
  bannerFooter?: string;
}

export const BannerPreview: React.FC<BannerPreviewProps> = ({
  title,
  darkMode,
  layoutType,
  onLayoutChange,
  stats,
  profile,
  template,
  graphData,
  bannerGeneratorRef,
  onBannerGenerated,
  trackerType,
  bannerTitle,
  bannerFooter,
}) => {
  return (
    <View style={styles.previewSection}>
      <View style={styles.previewHeader}>
        <Text style={[styles.sectionTitle, darkMode && styles.darkText]}>{title}</Text>

        <View style={[styles.toggleContainer, darkMode && styles.darkToggleContainer]}>
          <TouchableOpacity
            style={[
              styles.toggleOption,
              layoutType === 'stats' && styles.toggleOptionActive,
              darkMode && styles.darkToggleOption,
              layoutType === 'stats' && darkMode && styles.darkToggleOptionActive,
            ]}
            onPress={() => onLayoutChange('stats')}
          >
            <FontAwesome
              name="bar-chart"
              size={16}
              color={layoutType === 'stats' ? '#fff' : darkMode ? '#ccc' : '#666'}
            />
            <Text
              style={[
                styles.toggleText,
                layoutType === 'stats' && styles.toggleTextActive,
                darkMode && styles.darkToggleText,
                layoutType === 'stats' && darkMode && styles.darkToggleTextActive,
              ]}
            >
              Stats
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.toggleOption,
              layoutType === 'graph' && styles.toggleOptionActive,
              darkMode && styles.darkToggleOption,
              layoutType === 'graph' && darkMode && styles.darkToggleOptionActive,
            ]}
            onPress={() => onLayoutChange('graph')}
          >
            <FontAwesome
              name="th"
              size={16}
              color={layoutType === 'graph' ? '#fff' : darkMode ? '#ccc' : '#666'}
            />
            <Text
              style={[
                styles.toggleText,
                layoutType === 'graph' && styles.toggleTextActive,
                darkMode && styles.darkToggleText,
                layoutType === 'graph' && darkMode && styles.darkToggleTextActive,
              ]}
            >
              Graph
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <BannerGenerator
        ref={bannerGeneratorRef}
        data={stats}
        profile={profile}
        template={template}
        layoutType={layoutType}
        graphData={graphData}
        onBannerGenerated={onBannerGenerated}
        trackerType={trackerType}
        bannerTitle={bannerTitle}
        bannerFooter={bannerFooter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  previewSection: {
    marginBottom: 24,
  },
  previewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    letterSpacing: -0.3,
  },
  darkText: {
    color: '#fff',
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  darkToggleContainer: {
    backgroundColor: '#2a2a2a',
    borderColor: '#444',
  },
  toggleOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 70,
    justifyContent: 'center',
  },
  darkToggleOption: {
    backgroundColor: 'transparent',
  },
  toggleOptionActive: {
    backgroundColor: '#007AFF',
  },
  darkToggleOptionActive: {
    backgroundColor: '#0A84FF',
  },
  toggleText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
  },
  darkToggleText: {
    color: '#ccc',
  },
  toggleTextActive: {
    color: '#fff',
  },
  darkToggleTextActive: {
    color: '#fff',
  },
});
