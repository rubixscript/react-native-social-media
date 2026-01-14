import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { BannerTemplate } from '../../types';

export type ShareStep = 'generate' | 'share';

interface ModalActionsProps {
  step: ShareStep;
  isGenerating: boolean;
  selectedTemplate: BannerTemplate;
  darkMode?: boolean;
  onGenerate: () => void;
  onBack: () => void;
  generateText: string;
  generatingText: string;
  backText: string;
}

export const ModalActions: React.FC<ModalActionsProps> = ({
  step,
  isGenerating,
  selectedTemplate,
  darkMode,
  onGenerate,
  onBack,
  generateText,
  generatingText,
  backText,
}) => {
  return (
    <View style={styles.buttonContainer}>
      {step === 'generate' ? (
        <TouchableOpacity
          style={[styles.actionButton, isGenerating && styles.actionButtonDisabled]}
          onPress={onGenerate}
          disabled={isGenerating}
        >
          <LinearGradient
            colors={selectedTemplate.colors as [string, string, ...string[]]}
            style={styles.actionButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <FontAwesome name={isGenerating ? 'clock-o' : 'magic'} size={20} color="white" />
            <View style={styles.buttonTextContainer}>
              <Text style={styles.actionButtonText}>
                {isGenerating ? generatingText : generateText}
              </Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[styles.backButton, darkMode && styles.darkBackButton]}
          onPress={onBack}
        >
          <FontAwesome name="arrow-left" size={20} color={darkMode ? '#fff' : '#333'} />
          <Text style={[styles.backButtonText, darkMode && styles.darkText]}>{backText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

// Need to import Text for the component
import { Text } from 'react-native';

const styles = StyleSheet.create({
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
    padding: 16,
  },
  buttonTextContainer: {
    marginLeft: 12,
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
    borderColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  darkBackButton: {
    borderColor: '#444',
    backgroundColor: '#1a1a1a',
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  darkText: {
    color: '#fff',
  },
});
