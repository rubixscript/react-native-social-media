import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { ShareButtons } from '../src';
import { SocialShareModal } from '../src';

export default function App() {
  const [modalVisible, setModalVisible] = React.useState(false);
  const content = 'Check out this post!';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Social Media Lib</Text>

      <ShareButtons content={content} />

      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Open Modal</Text>
      </TouchableOpacity>

      <SocialShareModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        content={content}
        onShare={() => setModalVisible(false)}
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
