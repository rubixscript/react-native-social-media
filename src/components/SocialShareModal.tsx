import React, { useState, useRef, useEffect } from 'react';
import { View, Modal, StyleSheet, ScrollView, Alert } from 'react-native';
import { Share as RNShare } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SocialBannerModalProps, ShareContent, SocialPlatform } from '../types';
import { DEFAULT_BANNER_TEMPLATES } from '../constants/templates';
import { ShareHelpers } from '../utils/shareHelpers';
import ShareAnalyticsService from '../utils/analytics';
import { BannerGeneratorRef } from './BannerGenerator';
import {
  ModalHeader,
  TemplateSelector,
  BannerPreview,
  ShareStep,
  StatsSummary,
  ModalActions,
} from './modal';
import type { LayoutType, ShareStepType } from './modal';

const SocialShareModal: React.FC<SocialBannerModalProps> = ({
  visible,
  onClose,
  darkMode = false,
  books,
  readingSessions,
  profile,
  onShareComplete,
  trackerType = 'reading',
  items,
  sessions,
  bannerTitle,
  bannerFooter,
  textLabels,
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState(DEFAULT_BANNER_TEMPLATES[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [layoutType, setLayoutType] = useState<LayoutType>('stats');
  const [bannerUri, setBannerUri] = useState<string | null>(null);
  const [currentShareStep, setCurrentShareStep] = useState<ShareStepType>('generate');
  const bannerGeneratorRef = useRef<BannerGeneratorRef>(null);
  const analytics = ShareAnalyticsService.getInstance();

  // Customizable text labels with defaults
  const labels = {
    headerTitle: textLabels?.headerTitle || `Share Your ${capitalize(trackerType)} Progress`,
    templateSectionTitle: textLabels?.templateSectionTitle || 'Choose Template',
    previewSectionTitle: textLabels?.previewSectionTitle || 'Preview',
    shareSectionTitle: textLabels?.shareSectionTitle || 'Share Your Progress',
    statsSectionTitle: textLabels?.statsSectionTitle || `Your ${capitalize(trackerType)} Stats`,
    shareDescription: textLabels?.shareDescription || `Share your ${trackerType} progress with friends and family on your favorite social media platforms!`,
    generateBannerText: textLabels?.generateBannerText || 'Generate Banner',
    generatingText: textLabels?.generatingText || 'Generating...',
    backToTemplatesText: textLabels?.backToTemplatesText || 'Back to Templates',
    copyLinkSuccessMessage: textLabels?.copyLinkSuccessMessage || 'Progress copied to clipboard!',
    shareSuccessMessage: textLabels?.shareSuccessMessage || 'Your progress has been shared!',
    shareErrorMessage: textLabels?.shareErrorMessage || 'Failed to share. Please try again.',
  };

  // Determine which data to use (generic or reading-specific)
  const useGeneric = items && sessions;
  const useReading = books && readingSessions;

  // Calculate stats based on data type
  const progressStats = useGeneric && items && sessions
    ? ShareHelpers.calculateProgressStats(items, sessions, trackerType)
    : null;

  const readingStats = useReading && books && readingSessions
    ? ShareHelpers.calculateReadingStats(books, readingSessions)
    : null;

  // Use generic or reading-specific stats
  const stats = progressStats || readingStats || {
    progressThisWeek: 0,
    progressThisMonth: 0,
    itemsCompletedThisMonth: 0,
    itemsCompletedThisMonthList: [],
    itemsInProgressThisMonth: [],
    topItemThisWeek: null,
    totalItems: 0,
    totalProgressEver: 0,
    avgProgressPerDay: 0,
    goalPercentage: 0,
    currentStreak: 0,
    totalPoints: 0,
    progressLabel: 'Progress',
    itemLabel: 'Items',
  };

  // Generate graph data
  const graphData = useGeneric && sessions
    ? ShareHelpers.generateProgressGraphData(sessions, trackerType)
    : useReading && readingSessions
    ? ShareHelpers.generateReadingGraphData(readingSessions)
    : { days: [], totalDays: 0, activeDays: 0, totalValue: 0, maxValueInDay: 0, currentStreak: 0 };

  useEffect(() => {
    if (!visible) {
      // Reset state when modal closes
      setCurrentShareStep('generate');
      setBannerUri(null);
      setSelectedTemplate(DEFAULT_BANNER_TEMPLATES[0]);
      setLayoutType('stats');
    }
  }, [visible]);

  const handleGenerateBanner = async () => {
    setIsGenerating(true);
    try {
      const uri = await bannerGeneratorRef.current?.generateBanner();

      if (!uri) {
        throw new Error('Failed to generate banner');
      }

      setBannerUri(uri);
      setCurrentShareStep('share');
    } catch (error) {
      console.error('Error generating banner:', error);
      Alert.alert('Error', 'Failed to generate banner. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleBannerGenerated = (uri: string) => {
    if (uri) {
      setBannerUri(uri);
    } else {
      console.error('BannerGenerator returned empty URI');
    }
  };

  const handleShare = async (platform: string) => {
    try {
      let success = false;
      let errorMessage = '';

      const progressValue = 'progressThisMonth' in stats ? stats.progressThisMonth : 0;
      const itemsCompleted = 'itemsCompletedThisMonth' in stats ? stats.itemsCompletedThisMonth : 0;
      const progressLabel = 'progressLabel' in stats ? stats.progressLabel : 'progress';
      const itemLabel = 'itemLabel' in stats ? stats.itemLabel : 'items';

      const shareContent: ShareContent = {
        title: bannerTitle || `My ${capitalize(trackerType)} Progress - ${progressValue} ${progressLabel.toLowerCase()} this month!`,
        message: `I've completed ${progressValue} ${progressLabel.toLowerCase()} and ${itemsCompleted} ${itemLabel.toLowerCase()} this month! 🎉✨`,
        url: bannerUri || undefined,
        tags: [trackerType, 'progress', 'goals'],
      };

      if (platform === 'copy-link') {
        success = await ShareHelpers.copyToClipboard(shareContent.message || shareContent.title);
        if (success) {
          Alert.alert('Success', labels.copyLinkSuccessMessage);
        }
      } else if (platform === 'more') {
        const result = await RNShare.share({
          message: shareContent.message || shareContent.title,
          url: shareContent.url,
          title: shareContent.title,
        });
        success = result.action === RNShare.sharedAction;
      } else if (bannerUri) {
        const result = await RNShare.share({
          url: bannerUri,
          title: bannerTitle || labels.headerTitle,
          message: shareContent.message,
        });
        success = result.action === RNShare.sharedAction;
      } else {
        const shareUrl = ShareHelpers.buildShareUrl(platform as SocialPlatform, shareContent);
        if (shareUrl) {
          success = await ShareHelpers.openShareUrl(shareUrl);
        } else {
          const result = await RNShare.share({
            message: shareContent.message || shareContent.title,
            title: shareContent.title,
          });
          success = result.action === RNShare.sharedAction;
        }
      }

      analytics.trackShare({
        platform,
        contentType: `${trackerType}_progress`,
        timestamp: new Date(),
        success,
        errorMessage,
      });

      onShareComplete?.(platform, success);

      if (success) {
        Alert.alert('Success', labels.shareSuccessMessage);
      }

    } catch (error) {
      console.error(`Error sharing to ${platform}:`, error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';

      analytics.trackShare({
        platform,
        contentType: `${trackerType}_progress`,
        timestamp: new Date(),
        success: false,
        errorMessage,
      });

      Alert.alert('Error', labels.shareErrorMessage);
      onShareComplete?.(platform, false);
    }
  };

  const shareContent: ShareContent = {
    title: bannerTitle || `My ${capitalize(trackerType)} Progress`,
    message: `Check out my progress! 🎉`,
    tags: [trackerType, 'progress', 'goals'],
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={[styles.container, darkMode && styles.darkContainer]}>
        <ModalHeader title={labels.headerTitle} darkMode={darkMode} onClose={onClose} />

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {currentShareStep === 'generate' && (
            <>
              <TemplateSelector
                templates={DEFAULT_BANNER_TEMPLATES}
                selectedTemplate={selectedTemplate}
                onSelectTemplate={setSelectedTemplate}
                title={labels.templateSectionTitle}
                darkMode={darkMode}
              />

              <BannerPreview
                title={labels.previewSectionTitle}
                darkMode={darkMode}
                layoutType={layoutType}
                onLayoutChange={setLayoutType}
                stats={stats}
                profile={profile}
                template={selectedTemplate}
                graphData={graphData}
                bannerGeneratorRef={bannerGeneratorRef}
                onBannerGenerated={handleBannerGenerated}
                trackerType={trackerType}
                bannerTitle={bannerTitle}
                bannerFooter={bannerFooter}
              />
            </>
          )}

          {currentShareStep === 'share' && (
            <ShareStep
              title={labels.shareSectionTitle}
              description={labels.shareDescription}
              darkMode={darkMode}
              shareContent={shareContent}
              onShare={handleShare}
            />
          )}

          <StatsSummary
            title={labels.statsSectionTitle}
            stats={stats}
            darkMode={darkMode}
          />
        </ScrollView>

        <ModalActions
          step={currentShareStep}
          isGenerating={isGenerating}
          selectedTemplate={selectedTemplate}
          darkMode={darkMode}
          onGenerate={handleGenerateBanner}
          onBack={() => setCurrentShareStep('generate')}
          generateText={labels.generateBannerText}
          generatingText={labels.generatingText}
          backText={labels.backToTemplatesText}
        />
      </SafeAreaView>
    </Modal>
  );
};

// Helper function to capitalize first letter
function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#0a0a0a',
  },
  content: {
    flex: 1,
    padding: 20,
  },
});

export default SocialShareModal;
