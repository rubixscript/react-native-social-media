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

    return (
      <View style={styles.container}>
        <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 0.95 }}>
          <View style={styles.cardContainer}>
            <LinearGradient
              colors={template.colors as [string, string, ...string[]]}
              style={[
                styles.card,
                layoutType === 'graph' && styles.dynamicHeight,
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.additional}>
                <BlurView
                  intensity={80}
                  tint="dark"
                  style={styles.glassBackground}
                />
                <View style={styles.glassContent}>
                  {/* User Card with Avatar */}
                  <UserCard
                    profile={profile}
                    totalPoints={data.totalPoints}
                    trackerType={trackerType}
                  />

                  {/* User Info Section */}
                  <View style={styles.moreInfo}>
                    <Text style={styles.userName}>
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
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  dynamicHeight: {
    height: BANNER_HEIGHT + 120,
  },
  additional: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 2,
    borderRadius: 20,
    overflow: 'hidden',
  },
  glassBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  glassContent: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    padding: 20,
    borderRadius: 20,
    backgroundColor: 'transparent',
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
    textShadowColor: 'rgba(0,0,0,0.7)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
});

export default BannerGenerator;
