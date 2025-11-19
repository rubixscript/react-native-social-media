# RubixScript Social Media Share Library

A comprehensive React Native library for creating and sharing beautiful social media banners showcasing reading progress, achievements, and book statistics.

## Features

- 🎨 **Beautiful Banner Generation** - Multiple professionally designed templates
- 📊 **Rich Statistics Display** - Reading stats, progress graphs, and achievements
- 🎯 **Multi-Platform Sharing** - Facebook, Instagram, Twitter, LinkedIn, WhatsApp, and more
- 🌙 **Dark Mode Support** - Full theming support for light and dark modes
- 📱 **React Native Compatible** - Works with Expo and bare React Native projects
- 📈 **Analytics Integration** - Built-in sharing analytics and tracking
- 🔧 **Customizable** - Easy to customize branding, colors, and content

## Installation

```bash
npm install @rubixscript/react-native-social-banner
# or
yarn add @rubixscript/react-native-social-banner
```

### Peer Dependencies

Make sure you have these dependencies installed in your project:

```bash
npm install expo expo-sharing expo-linear-gradient expo-blur react-native-view-shot @expo/vector-icons react-native-safe-area-context
```

## Quick Start

### Basic Usage

```tsx
import React, { useState } from 'react';
import { SocialShareModal } from '@rubixscript/react-native-social-banner';

const App = () => {
  const [showShareModal, setShowShareModal] = useState(false);

  // Your reading data
  const books = [
    {
      id: '1',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      totalPages: 180,
      currentPage: 180,
      completedDate: new Date(),
      color: '#4CAF50',
      category: 'Fiction',
    },
    // ... more books
  ];

  const readingSessions = [
    {
      id: '1',
      bookId: '1',
      startPage: 1,
      endPage: 50,
      date: new Date(),
      duration: 120,
    },
    // ... more sessions
  ];

  const userProfile = {
    id: 'user1',
    name: 'John Doe',
    readerLevel: 3,
    points: 1250,
  };

  return (
    <View>
      <Button
        title="Share Reading Progress"
        onPress={() => setShowShareModal(true)}
      />

      <SocialShareModal
        visible={showShareModal}
        onClose={() => setShowShareModal(false)}
        darkMode={true} // optional
        books={books}
        readingSessions={readingSessions}
        profile={userProfile}
        onShareComplete={(platform, success) => {
          console.log(`Shared to ${platform}: ${success}`);
        }}
      />
    </View>
  );
};
```

### Individual Components

You can also use individual components:

#### ShareButtons

```tsx
import { ShareButtons } from '@rubixscript/react-native-social-banner';

<ShareButtons
  content={{
    title: 'Check out my reading progress!',
    message: 'I read 500 pages this month!',
    tags: ['reading', 'books'],
  }}
  platforms={['facebook', 'twitter', 'instagram', 'whatsapp']}
  buttonStyle="primary"
  size="large"
  onShare={(platform) => console.log(`Shared to ${platform}`)}
/>
```

#### BannerGenerator

```tsx
import { BannerGenerator } from '@rubixscript/react-native-social-banner';

<BannerGenerator
  data={readingStats}
  profile={userProfile}
  template={selectedTemplate}
  layoutType="stats"
  onBannerGenerated={(imageUri) => {
    console.log('Banner generated:', imageUri);
  }}
/>
```

## Data Models

### Book

```tsx
interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  totalPages: number;
  currentPage: number;
  coverUri?: string;
  color: string;
  startDate?: string;
  completedDate?: string | Date | null;
  caption?: string;
}
```

### ReadingSession

```tsx
interface ReadingSession {
  id: string;
  bookId: string;
  startPage: number;
  endPage: number;
  duration: number;
  date: string | Date;
  notes?: string;
}
```

### UserProfile

```tsx
interface UserProfile {
  id: string;
  name: string;
  avatar?: string;
  readerLevel: number;
  points: number;
}
```

## Customization

### Custom Templates

You can create custom banner templates:

```tsx
const customTemplate = {
  id: 'custom',
  name: 'My Custom Theme',
  colors: ['#FF6B6B', '#4ECDC4', '#45B7D1'],
  accentColors: ['#FFFFFF', '#F8F8F8'],
  overlayColor: 'rgba(255,255,255,0.1)',
  style: 'custom'
};

<SocialShareModal
  // ... other props
  defaultTemplate={customTemplate}
/>
```

### Analytics

Track sharing behavior:

```tsx
import { ShareAnalytics } from '@rubixscript/react-native-social-banner';

const analytics = ShareAnalytics.getInstance();

// Get sharing stats
const stats = analytics.getShareStats();
console.log('Total shares:', stats.totalShares);
console.log('Most popular platform:', stats.mostPopularPlatform);

// Export analytics data
const data = await analytics.exportAnalytics();
```

## API Reference

### SocialShareModal Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `visible` | `boolean` | `false` | Controls modal visibility |
| `onClose` | `() => void` | - | Callback when modal is closed |
| `darkMode` | `boolean` | `false` | Enable dark mode styling |
| `books` | `Book[]` | - | Array of user's books |
| `readingSessions` | `ReadingSession[]` | - | Array of reading sessions |
| `profile` | `UserProfile` | - | User profile information |
| `onShareComplete` | `(platform: string, success: boolean) => void` | - | Callback after sharing attempt |

### ShareButtons Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `ShareContent` | - | Content to share |
| `platforms` | `SocialPlatform[]` | All platforms | Platforms to show buttons for |
| `buttonStyle` | `'primary' \| 'secondary' \| 'outline'` | `'primary'` | Button visual style |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Button size |
| `darkMode` | `boolean` | `false` | Enable dark mode styling |
| `onShare` | `(platform: string) => void` | - | Callback when platform is selected |

## Platforms Supported

- Facebook
- Instagram (via native sharing)
- Twitter/X
- LinkedIn
- WhatsApp
- Telegram
- Copy to Clipboard
- Native Share Dialog

## TypeScript Support

This library is written in TypeScript and provides full type definitions:

```tsx
import { SocialPlatform, ShareContent, BannerTemplate } from '@rubixscript/react-native-social-banner';

const platforms: SocialPlatform[] = ['facebook', 'twitter', 'instagram'];
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For issues and questions:
- Create an issue on GitHub
- Email: support@rubixscript.com

---

Made with ❤️ by the RubixScript Team