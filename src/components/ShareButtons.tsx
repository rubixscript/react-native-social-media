import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  Share as RNShare,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { ShareButtonsProps, ShareContent } from '../types';
import { SOCIAL_PLATFORMS } from '../constants/templates';
import { ShareHelpers } from '../utils/shareHelpers';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const ShareButtons: React.FC<ShareButtonsProps> = ({
  content,
  platforms = Object.keys(SOCIAL_PLATFORMS) as any[],
  buttonStyle = 'primary',
  size = 'medium',
  darkMode = false,
  onShare,
}) => {
  const handleShare = async (platform: string) => {
    try {
      let success = false;
      let errorMessage = '';

      if (platform === 'copy-link') {
        const textToCopy = content.message || content.title;
        success = await ShareHelpers.copyToClipboard(textToCopy);
        if (success) {
          Alert.alert('Success', 'Link copied to clipboard!');
        }
      } else if (platform === 'more') {
        // Use native sharing
        const result = await RNShare.share({
          message: content.message || content.title,
          url: content.url,
          title: content.title,
        });
        success = result.action === RNShare.sharedAction;
      } else {
        // Open social platform share URL
        const shareUrl = ShareHelpers.buildShareUrl(platform as any, content);
        if (shareUrl) {
          success = await ShareHelpers.openShareUrl(shareUrl);
        } else {
          // Fallback to native sharing for platforms that don't have direct URLs
          const result = await RNShare.share({
            message: content.message || content.title,
            url: content.url,
            title: content.title,
          });
          success = result.action === RNShare.sharedAction;
        }
      }

      onShare?.(platform);
      return { platform, success, errorMessage };
    } catch (error) {
      console.error(`Error sharing to ${platform}:`, error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      Alert.alert('Error', `Failed to share to ${platform}`);
      return { platform, success: false, errorMessage };
    }
  };

  const getButtonStyles = () => {
    const baseSize = size === 'small' ? 40 : size === 'large' ? 60 : 50;
    const iconSize = size === 'small' ? 16 : size === 'large' ? 24 : 20;
    const fontSize = size === 'small' ? 10 : size === 'large' ? 14 : 12;

    return {
      buttonSize: baseSize,
      iconSize,
      fontSize,
      borderRadius: baseSize / 2,
    };
  };

  const getButtonColor = (platform: string) => {
    if (buttonStyle === 'secondary') {
      return darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)';
    } else if (buttonStyle === 'outline') {
      return 'transparent';
    }
    return SOCIAL_PLATFORMS[platform as keyof typeof SOCIAL_PLATFORMS]?.color || '#6c757d';
  };

  const getTextColor = (platform: string) => {
    if (buttonStyle === 'primary') {
      return '#ffffff';
    }
    return darkMode ? '#ffffff' : '#333333';
  };

  const getBorderStyle = (platform: string) => {
    if (buttonStyle === 'outline') {
      return {
        borderWidth: 2,
        borderColor: SOCIAL_PLATFORMS[platform as keyof typeof SOCIAL_PLATFORMS]?.color || '#6c757d',
      };
    }
    return {};
  };

  const { buttonSize, iconSize, fontSize, borderRadius } = getButtonStyles();

  return (
    <View style={[styles.container, darkMode && styles.darkContainer]}>
      <View style={styles.grid}>
        {platforms.map((platform) => {
          const platformConfig = SOCIAL_PLATFORMS[platform as keyof typeof SOCIAL_PLATFORMS];
          if (!platformConfig) return null;

          return (
            <TouchableOpacity
              key={platform}
              style={[
                styles.button,
                {
                  width: buttonSize,
                  height: buttonSize,
                  borderRadius,
                  backgroundColor: getButtonColor(platform),
                  ...getBorderStyle(platform),
                },
              ]}
              onPress={() => handleShare(platform)}
              activeOpacity={0.7}
            >
              <FontAwesome
                name={platformConfig.icon as any}
                size={iconSize}
                color={getTextColor(platform)}
              />
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Platform Labels */}
      <View style={styles.labelsGrid}>
        {platforms.map((platform) => {
          const platformConfig = SOCIAL_PLATFORMS[platform as keyof typeof SOCIAL_PLATFORMS];
          if (!platformConfig) return null;

          return (
            <Text
              key={`${platform}-label`}
              style={[
                styles.label,
                {
                  fontSize,
                  color: darkMode ? '#ffffff' : '#333333',
                },
              ]}
            >
              {platformConfig.name}
            </Text>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  darkContainer: {
    backgroundColor: 'transparent',
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 16,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  labelsGrid: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 8,
    gap: 16,
  },
  label: {
    textAlign: 'center',
    fontWeight: '500',
    minWidth: 60,
  },
});

export default ShareButtons;