import { Image } from 'expo-image';
import { Platform, StyleSheet, ScrollView } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import { SocialShareModal, ShareButtons } from '@rubixscript/react-native-social-banner';

export default function HomeScreen() {
  const handleShare = (platform: string) => {
    console.log(`Sharing to ${platform}`);
  };

  const samplePosts = [
    {
      username: "john_doe",
      postText: "Just launched my new React Native app! 🚀 #ReactNative #MobileDev",
      likes: 42,
      comments: 8,
      timestamp: "2 hours ago"
    },
    {
      username: "jane_smith",
      postText: "Beautiful sunset at the beach today! Nature is amazing 🌅",
      likes: 128,
      comments: 23,
      timestamp: "5 hours ago"
    },
    {
      username: "tech_blogger",
      postText: "Working on some cool AI projects lately. The future is here! 🤖✨",
      likes: 256,
      comments: 45,
      timestamp: "1 day ago"
    }
  ];

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Social Media Feed</ThemedText>
        <HelloWave />
      </ThemedView>

      {/* Social Media Posts with Share Buttons */}
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Social Posts</ThemedText>

        {samplePosts.map((post, index) => (
          <ThemedView key={index} style={styles.postContainer}>
            <ThemedView style={styles.postHeader}>
              <ThemedText type="defaultSemiBold">@{post.username}</ThemedText>
              <ThemedText style={styles.timestamp}>{post.timestamp}</ThemedText>
            </ThemedView>
            <ThemedText style={styles.postText}>{post.postText}</ThemedText>
            <ThemedView style={styles.postStats}>
              <ThemedText>❤️ {post.likes}</ThemedText>
              <ThemedText>💬 {post.comments}</ThemedText>
            </ThemedView>
            <ShareButtons
              content={post.postText}
              onShare={(platform) => handleShare(platform)}
              style={styles.shareButtons}
            />
          </ThemedView>
        ))}
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Interactive Features</ThemedText>
        <ThemedText>
          Try the share buttons above to see social media integration in action!
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <Link href="/modal">
          <Link.Trigger>
            <ThemedText type="subtitle">Explore More</ThemedText>
          </Link.Trigger>
          <Link.Preview />
          <Link.Menu>
            <Link.MenuAction title="Action" icon="cube" onPress={() => alert('Action pressed')} />
            <Link.MenuAction
              title="Share"
              icon="square.and.arrow.up"
              onPress={() => alert('Share pressed')}
            />
            <Link.Menu title="More" icon="ellipsis">
              <Link.MenuAction
                title="Delete"
                icon="trash"
                destructive
                onPress={() => alert('Delete pressed')}
              />
            </Link.Menu>
          </Link.Menu>
        </Link>

        <ThemedText>
          {`Tap the Explore tab to learn more about what's included in this starter app.`}
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  postContainer: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  timestamp: {
    fontSize: 12,
    opacity: 0.6,
  },
  postText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
  },
  postStats: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  shareButtons: {
    marginTop: 8,
  },
});
