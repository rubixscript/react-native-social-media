import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
  ScrollView,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Share as RNShare } from 'react-native';
import { SocialBannerModalProps, ShareContent, SocialPlatform } from '../types';
import { DEFAULT_BANNER_TEMPLATES, SOCIAL_PLATFORMS } from '../constants/templates';
import { ShareHelpers } from '../utils/shareHelpers';
import ShareAnalytics from '../utils/analytics';
import BannerGenerator from './BannerGenerator';
import ShareButtons from './ShareButtons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const SocialShareModal: React.FC<SocialBannerModalProps> = ({
  visible,
  onClose,
  darkMode = false,
  books,
  readingSessions,
  profile,
  onShareComplete,
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState(DEFAULT_BANNER_TEMPLATES[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [layoutType, setLayoutType] = useState<'stats' | 'graph'>('stats');
  const [bannerUri, setBannerUri] = useState<string | null>(null);
  const [currentShareStep, setCurrentShareStep] = useState<'generate' | 'share'>('generate');
  const analytics = ShareAnalytics.getInstance();

  // Calculate reading stats
  const readingStats = ShareHelpers.calculateReadingStats(books, readingSessions);
  const graphData = ShareHelpers.generateReadingGraphData(readingSessions);

  useEffect(() => {
    if (!visible) {
      // Reset state when modal closes
      setCurrentShareStep('generate');
      setBannerUri(null);
    }
  }, [visible]);

  const handleGenerateBanner = async () => {
    setIsGenerating(true);
    try {
      // The BannerGenerator will call onBannerGenerated
      setCurrentShareStep('share');
    } catch (error) {
      console.error('Error generating banner:', error);
      Alert.alert('Error', 'Failed to generate banner. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleBannerGenerated = (uri: string) => {
    setBannerUri(uri);
    setCurrentShareStep('share');
  };

  const handleShare = async (platform: string) => {
    try {
      let success = false;
      let errorMessage = '';

      const shareContent: ShareContent = {
        title: `My Reading Progress - ${readingStats.pagesThisMonth} pages this month!`,
        message: `I've read ${readingStats.pagesThisMonth} pages and ${readingStats.booksCompletedThisMonth} books this month! 📚✨`,
        url: bannerUri || undefined,
        tags: ['reading', 'books', 'onpageapp'],
      };

      if (platform === 'copy-link') {
        success = await ShareHelpers.copyToClipboard(shareContent.message || shareContent.title);
        if (success) {
          Alert.alert('Success', 'Reading progress copied to clipboard!');
        }
      } else if (platform === 'more') {
        // Use native sharing
        const result = await RNShare.share({
          message: shareContent.message || shareContent.title,
          url: shareContent.url,
          title: shareContent.title,
        });
        success = result.action === RNShare.sharedAction;
      } else if (bannerUri) {
        // Share the banner image
        const result = await RNShare.share({
          url: bannerUri,
          title: 'My Reading Progress',
          message: shareContent.message,
        });
        success = result.action === RNShare.sharedAction;
      } else {
        // Fallback to sharing text content
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

      // Track analytics
      analytics.trackShare({
        platform,
        contentType: 'reading_progress',
        timestamp: new Date(),
        success,
        errorMessage,
      });

      onShareComplete?.(platform, success);

      if (success) {
        Alert.alert('Success', 'Your reading progress has been shared!');
      }

    } catch (error) {
      console.error(`Error sharing to ${platform}:`, error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';

      analytics.trackShare({
        platform,
        contentType: 'reading_progress',
        timestamp: new Date(),
        success: false,
        errorMessage,
      });

      Alert.alert('Error', 'Failed to share. Please try again.');
      onShareComplete?.(platform, false);
    }
  };

  const renderTemplateSelector = () => (
    <View style={styles.templateSection}>
      <Text style={[styles.sectionTitle, darkMode && styles.darkText]}>
        Choose Template
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.templateList}>
          {DEFAULT_BANNER_TEMPLATES.map((template) => (
            <TouchableOpacity
              key={template.id}
              style={[
                styles.templateItem,
                selectedTemplate.id === template.id && styles.templateItemSelected,
                darkMode && styles.darkTemplateItem,
              ]}
              onPress={() => setSelectedTemplate(template)}
            >
              <LinearGradient
                colors={template.colors}
                style={styles.templatePreview}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              />
              <Text style={[
                styles.templateName,
                darkMode && styles.darkText,
                selectedTemplate.id === template.id && styles.templateNameSelected,
              ]}>
                {template.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );

  const renderBannerPreview = () => (
    <View style={styles.previewSection}>
      <View style={styles.previewHeader}>
        <Text style={[styles.sectionTitle, darkMode && styles.darkText]}>
          Preview
        </Text>

        {/* Layout Toggle */}
        <View style={[styles.toggleContainer, darkMode && styles.darkToggleContainer]}>
          <TouchableOpacity
            style={[
              styles.toggleOption,
              layoutType === 'stats' && styles.toggleOptionActive,
              darkMode && styles.darkToggleOption,
              layoutType === 'stats' && darkMode && styles.darkToggleOptionActive,
            ]}
            onPress={() => setLayoutType('stats')}
          >
            <FontAwesome
              name="bar-chart"
              size={16}
              color={layoutType === 'stats' ? '#fff' : (darkMode ? '#ccc' : '#666')}
            />
            <Text style={[
              styles.toggleText,
              layoutType === 'stats' && styles.toggleTextActive,
              darkMode && styles.darkToggleText,
              layoutType === 'stats' && darkMode && styles.darkToggleTextActive,
            ]}>
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
            onPress={() => setLayoutType('graph')}
          >
            <FontAwesome
              name="th"
              size={16}
              color={layoutType === 'graph' ? '#fff' : (darkMode ? '#ccc' : '#666')}
            />
            <Text style={[
              styles.toggleText,
              layoutType === 'graph' && styles.toggleTextActive,
              darkMode && styles.darkToggleText,
              layoutType === 'graph' && darkMode && styles.darkToggleTextActive,
            ]}>
              Graph
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <BannerGenerator
        data={readingStats}
        profile={profile}
        template={selectedTemplate}
        layoutType={layoutType}
        graphData={graphData}
        onBannerGenerated={handleBannerGenerated}
      />
    </View>
  );

  const renderShareStep = () => (
    <View style={styles.shareSection}>
      <Text style={[styles.sectionTitle, darkMode && styles.darkText]}>
        Share Your Progress
      </Text>
      <Text style={[styles.shareDescription, darkMode && styles.darkSecondaryText]}>
        Share your reading progress with friends and family on your favorite social media platforms!
      </Text>

      <ShareButtons
        content={{
          title: `My Reading Progress - ${readingStats.pagesThisMonth} pages this month!`,
          message: `I've read ${readingStats.pagesThisMonth} pages and ${readingStats.booksCompletedThisMonth} books this month! 📚✨`,
          tags: ['reading', 'books', 'onpageapp'],
        }}
        buttonStyle="primary"
        size="large"
        darkMode={darkMode}
        onShare={handleShare}
      />
    </View>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={[styles.container, darkMode && styles.darkContainer]}>
        {/* Header */}
        <View style={[styles.header, darkMode && styles.darkHeader]}>
          <Text style={[styles.title, darkMode && styles.darkText]}>
            Share Your Reading Progress
          </Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <FontAwesome
              name="close"
              size={24}
              color={darkMode ? "#fff" : "#333"}
            />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Template Selection */}
          {currentShareStep === 'generate' && renderTemplateSelector()}

          {/* Banner Preview */}
          {currentShareStep === 'generate' && renderBannerPreview()}

          {/* Share Step */}
          {currentShareStep === 'share' && renderShareStep()}

          {/* Stats Summary */}
          <View style={[styles.summarySection, darkMode && styles.darkSummarySection]}>
            <Text style={[styles.sectionTitle, darkMode && styles.darkText]}>
              Your Reading Stats
            </Text>
            <View style={styles.summaryGrid}>
              <View style={styles.summaryItem}>
                <Text style={[styles.summaryNumber, darkMode && styles.darkText]}>
                  {readingStats.pagesThisMonth}
                </Text>
                <Text style={[styles.summaryLabel, darkMode && styles.darkSecondaryText]}>
                  Pages This Month
                </Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={[styles.summaryNumber, darkMode && styles.darkText]}>
                  {readingStats.booksCompletedThisMonth}
                </Text>
                <Text style={[styles.summaryLabel, darkMode && styles.darkSecondaryText]}>
                  Books Completed
                </Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={[styles.summaryNumber, darkMode && styles.darkText]}>
                  {readingStats.totalBooks}
                </Text>
                <Text style={[styles.summaryLabel, darkMode && styles.darkSecondaryText]}>
                  Total Books
                </Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={[styles.summaryNumber, darkMode && styles.darkText]}>
                  {readingStats.totalPagesEver}
                </Text>
                <Text style={[styles.summaryLabel, darkMode && styles.darkSecondaryText]}>
                  Total Pages
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Action Button */}
        <View style={styles.buttonContainer}>
          {currentShareStep === 'generate' ? (
            <TouchableOpacity
              style={[
                styles.actionButton,
                isGenerating && styles.actionButtonDisabled
              ]}
              onPress={handleGenerateBanner}
              disabled={isGenerating}
            >
              <LinearGradient
                colors={selectedTemplate.colors}
                style={styles.actionButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <FontAwesome
                  name={isGenerating ? "clock-o" : "magic"}
                  size={20}
                  color="white"
                />
                <Text style={styles.actionButtonText}>
                  {isGenerating ? 'Generating...' : 'Generate Banner'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setCurrentShareStep('generate')}
            >
              <FontAwesome name="arrow-left" size={20} color={darkMode ? "#fff" : "#333"} />
              <Text style={[styles.backButtonText, darkMode && styles.darkText]}>
                Back to Templates
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#0a0a0a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  darkHeader: {
    borderBottomColor: '#333',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    letterSpacing: -0.5,
  },
  darkText: {
    color: '#fff',
  },
  darkSecondaryText: {
    color: '#aaa',
  },
  closeButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    letterSpacing: -0.3,
    marginBottom: 16,
  },

  // Template Section
  templateSection: {
    marginBottom: 24,
  },
  templateList: {
    flexDirection: 'row',
    gap: 16,
    paddingHorizontal: 4,
  },
  templateItem: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    backgroundColor: '#f8f9fa',
    minWidth: 80,
  },
  darkTemplateItem: {
    backgroundColor: '#2a2a2a',
  },
  templateItemSelected: {
    borderColor: '#007AFF',
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
  },
  templatePreview: {
    width: 60,
    height: 40,
    borderRadius: 8,
    marginBottom: 8,
  },
  templateName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
  },
  templateNameSelected: {
    color: '#007AFF',
  },

  // Preview Section
  previewSection: {
    marginBottom: 24,
  },
  previewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
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

  // Share Section
  shareSection: {
    marginBottom: 24,
  },
  shareDescription: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
    textAlign: 'center',
  },

  // Summary Section
  summarySection: {
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  darkSummarySection: {
    backgroundColor: '#1a1a1a',
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

  // Buttons
  buttonContainer: {
    padding: 20,
  },
  actionButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  actionButtonDisabled: {
    opacity: 0.6,
  },
  actionButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    padding: 16,
  },
  actionButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    letterSpacing: 0.3,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: darkMode ? '#444' : '#e0e0e0',
    backgroundColor: darkMode ? '#1a1a1a' : '#fff',
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
});

export default SocialShareModal;