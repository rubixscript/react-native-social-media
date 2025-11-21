import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { ShareButtons } from '@rubixscript/react-native-social-banner';
import { ExpoConfig } from 'expo';

export default function App() {
  const handleShare = (platform: string) => {
    console.log(`Sharing to ${platform}`);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ShareButtons
        content="Check out my social media post! 🚀 #ReactNative #SocialMedia"
        onShare={(platform) => handleShare(platform)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
});