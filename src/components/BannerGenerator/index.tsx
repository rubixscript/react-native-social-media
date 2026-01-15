import React, { useRef, useState, useImperativeHandle, forwardRef } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import ViewShot, { captureRef } from 'react-native-view-shot';
import { BannerGeneratorProps, BannerTemplate, SocialShareModalLabels } from '../../types';
import { DEFAULT_BANNER_TEMPLATES } from '../../constants/templates';
import { UserCard } from './UserCard';
import { ItemsList } from './ItemsList';
import { StatsGrid } from './StatsGrid';
import { ActivityGraph } from './ActivityGraph';
import { BrandingFooter } from './BrandingFooter';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BANNER_WIDTH = SCREEN_WIDTH - 40;
const BANNER_HEIGHT = 480;

export interface BannerGeneratorRef {
  generateBanner: () => Promise<string | null>;
}

const BannerGenerator = forwardRef<BannerGeneratorRef, BannerGeneratorProps>(
  (
    {
      data,
      profile,
      template = DEFAULT_BANNER_TEMPLATES[0],
      layoutType = 'stats',
      graphData,
      onBannerGenerated,
      trackerType = 'reading',
      bannerTitle,
      bannerFooter,
      statLabels,
    },
    ref
  ) => {
    const viewShotRef = useRef<any>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    const generateBanner = async (): Promise<string | null> => {
      try {
        setIsGenerating(true);

        // Wait for component to fully render
        await new Promise((resolve) => setTimeout(resolve, 100));

        const uri = await viewShotRef.current?.capture?.();

        if (!uri) {
          throw new Error('Failed to capture banner image');
        }

        onBannerGenerated?.(uri);
        return uri;
      } catch (error) {
        console.error('Error generating banner:', error);
        onBannerGenerated?.('');
        return null;
      } finally {
        setIsGenerating(false);
      }
    };

    // Expose generateBanner method to parent via ref
    useImperativeHandle(ref, () => ({
      generateBanner,
    }));

    // Get template-specific styles for modern minimal dark themes
    const getTemplateStyle = () => {
      switch (template.style) {
        case 'obsidian':
          return {
            borderWidth: 1,
            borderColor: 'rgba(34, 211, 238, 0.2)',
            shadowColor: '#22d3ee',
            accentColor: '#22d3ee',
            showTopAccent: true,
          };
        case 'carbon':
          return {
            borderWidth: 1,
            borderColor: 'rgba(16, 185, 129, 0.15)',
            shadowColor: '#10b981',
            accentColor: '#10b981',
            showTopAccent: false,
            showGlow: true,
          };
        case 'midnight':
        default:
          return {
            borderWidth: 1,
            borderColor: 'rgba(168, 85, 247, 0.15)',
            shadowColor: '#a855f7',
            accentColor: '#a855f7',
            showTopAccent: false,
            showGlow: false,
          };
      }
    };

    const templateStyle = getTemplateStyle();

    return (
      <View style={styles.container}>
        <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 0.95 }}>
          <View style={styles.cardContainer}>
            <LinearGradient
              colors={template.colors as [string, string, ...string[]]}
              style={[
                styles.card,
                layoutType === 'graph' && styles.dynamicHeight,
                { borderColor: templateStyle.borderColor },
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              {/* Top accent bar for obsidian template */}
              {templateStyle.showTopAccent && (
                <View style={[styles.topAccent, { backgroundColor: templateStyle.accentColor }]} />
              )}

              {/* Subtle glow effect for carbon template */}
              {templateStyle.showGlow && (
                <View style={[styles.glowEffect, { backgroundColor: templateStyle.accentColor }]} />
              )}

              <View style={styles.content}>
                {/* User Card with Avatar */}
                <UserCard
                  profile={profile}
                  totalPoints={data.totalPoints}
                  trackerType={trackerType}
                />

                {/* User Info Section */}
                <View style={styles.moreInfo}>
                  <Text style={[
                    styles.userName,
                    { color: template.style === 'midnight' ? '#ffffff' : templateStyle.accentColor }
                  ]}>
                    {profile?.name || profile?.title || 'User'}
                  </Text>

                  {/* Items List */}
                  <ItemsList
                    data={data}
                    trackerType={trackerType}
                    bannerTitle={bannerTitle}
                    layoutType={layoutType}
                    graphData={graphData}
                  />

                  {/* Stats or Graph Section */}
                  {layoutType === 'graph' && graphData ? (
                    <ActivityGraph graphData={graphData} />
                  ) : (
                    <StatsGrid data={data} statLabels={statLabels} />
                  )}

                  {/* App Branding Footer */}
                  <BrandingFooter
                    trackerType={trackerType}
                    bannerFooter={bannerFooter}
                  />
                </View>
              </View>
            </LinearGradient>
          </View>
        </ViewShot>
      </View>
    );
  }
);

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
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  dynamicHeight: {
    height: BANNER_HEIGHT + 120,
  },
  topAccent: {
    height: 3,
    width: '100%',
  },
  glowEffect: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 150,
    height: 150,
    borderRadius: 75,
    opacity: 0.15,
  },
  content: {
    padding: 20,
    height: '100%',
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
  },
});

export default BannerGenerator;
