import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SocialShareModal } from '../src';
import type { ProgressItem, ProgressSession } from '../src/types';

// Sample data
const sampleItems: ProgressItem[] = [
  {
    id: '1',
    title: 'Morning Workout',
    subtitle: 'Fitness',
    category: 'Health',
    progress: 45,
    total: 60,
    color: '#FF6B6B',
    startDate: '2026-01-01',
    caption: 'Daily exercise routine',
  },
  {
    id: '2',
    title: 'Reading Challenge',
    subtitle: 'Self-improvement',
    category: 'Education',
    progress: 120,
    total: 200,
    color: '#4ECDC4',
    startDate: '2026-01-01',
    caption: 'Reading 200 pages this month',
  },
  {
    id: '3',
    title: 'Meditation',
    subtitle: 'Mindfulness',
    category: 'Wellness',
    progress: 150,
    total: 300,
    color: '#95E1D3',
    startDate: '2026-01-01',
    caption: 'Daily meditation practice',
  },
];

const sampleSessions: ProgressSession[] = [
  { id: '1', itemId: '1', value: 30, duration: 45, date: '2026-01-01T08:00:00' },
  { id: '2', itemId: '1', value: 15, duration: 30, date: '2026-01-02T08:00:00' },
  { id: '3', itemId: '1', value: 25, duration: 40, date: '2026-01-03T08:00:00' },
  { id: '4', itemId: '2', value: 40, duration: 60, date: '2026-01-01T19:00:00' },
  { id: '5', itemId: '2', value: 35, duration: 55, date: '2026-01-02T20:00:00' },
  { id: '6', itemId: '2', value: 45, duration: 65, date: '2026-01-03T19:30:00' },
  { id: '7', itemId: '3', value: 60, duration: 30, date: '2026-01-01T06:30:00' },
  { id: '8', itemId: '3', value: 45, duration: 25, date: '2026-01-02T06:00:00' },
  { id: '9', itemId: '3', value: 45, duration: 28, date: '2026-01-03T06:15:00' },
];

const sampleProfile = {
  id: 'user-1',
  name: 'John Doe',
  level: 5,
  points: 1250,
  title: 'Fitness Enthusiast',
};

// Custom text labels - all text is now customizable via props
const customTextLabels = {
  headerTitle: 'Share Your Fitness Journey',
  templateSectionTitle: 'Select Banner Style',
  previewSectionTitle: 'Banner Preview',
  shareSectionTitle: 'Share Your Achievements',
  statsSectionTitle: 'Your Fitness Statistics',
  shareDescription: 'Inspire others by sharing your fitness progress with your community!',
  generateBannerText: 'Create Banner',
  generatingText: 'Creating...',
  backToTemplatesText: 'Choose Another Style',
  copyLinkSuccessMessage: 'Fitness stats copied to clipboard!',
  shareSuccessMessage: 'Your fitness journey has been shared!',
  shareErrorMessage: 'Unable to share. Please try again.',
};

export default function App() {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [gender, setGender] = React.useState<'guy' | 'girl'>('guy');

  // Update profile with gender selection
  const profile = {
    ...sampleProfile,
    gender,
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Progress Banner Demo</Text>

      {/* Gender Selection */}
      <View style={styles.genderContainer}>
        <TouchableOpacity
          style={[styles.genderButton, gender === 'guy' && styles.genderButtonActive]}
          onPress={() => setGender('guy')}
        >
          <Text style={[styles.genderButtonText, gender === 'guy' && styles.genderButtonTextActive]}>
            👨 Guy
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.genderButton, gender === 'girl' && styles.genderButtonActive]}
          onPress={() => setGender('girl')}
        >
          <Text style={[styles.genderButtonText, gender === 'girl' && styles.genderButtonTextActive]}>
            👩 Girl
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Open Banner Modal</Text>
      </TouchableOpacity>

      <SocialShareModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        items={sampleItems}
        sessions={sampleSessions}
        profile={profile}
        trackerType="fitness"
        bannerTitle="My Fitness Progress"
        bannerFooter="Keep pushing! 💪"
        textLabels={customTextLabels}
        onShareComplete={() => setModalVisible(false)}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  genderContainer: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 20,
  },
  genderButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    borderWidth: 2,
    borderColor: '#f0f0f0',
  },
  genderButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  genderButtonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  genderButtonTextActive: {
    color: '#fff',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
