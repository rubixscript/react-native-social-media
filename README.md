# React Native Progress Banner

A comprehensive React Native library for creating and sharing beautiful social media banners showcasing progress tracking for any type of app. Perfect for **reading trackers, pomodoro timers, habit trackers, skill trackers, fitness apps**, and more!

[![npm version](https://img.shields.io/npm/v/@rubixscript/react-native-progress-banner.svg)](https://www.npmjs.com/package/@rubixscript/react-native-progress-banner)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 🎯 **Universal Progress Tracking** - Works with reading apps, pomodoro timers, habit trackers, skill trackers, fitness apps, and custom trackers
- 🎨 **Beautiful Banner Generation** - 3 modern dark minimal templates with unique accent colors
- 📊 **Rich Statistics Display** - Progress stats, activity graphs, streaks, and achievements
- 📱 **Two Layout Modes** - Stats grid view or 30-day activity heatmap
- 🔄 **Multi-Platform Sharing** - Facebook, Instagram, Twitter, LinkedIn, WhatsApp, Telegram, and more
- 🌙 **Dark Mode Support** - Full theming support for light and dark modes
- 📈 **Analytics Integration** - Built-in sharing analytics and tracking
- 🔧 **Fully Customizable** - Custom branding, colors, labels, and content
- 🚀 **Direct Native Share** - Generate banner and share directly to any app
- 📱 **React Native & Expo Compatible** - Works with both Expo and bare React Native projects
- 🎮 **Gamification Ready** - Levels, points, streaks, and achievements
- 📝 **TypeScript Support** - Full type definitions included

## 🎉 What's New

### v2.3.0 - Dark Minimal Templates & Improved Avatars

- 🌙 **3 Dark Minimal Templates** - New modern dark-themed templates: Midnight, Obsidian, and Carbon
- 👤 **Improved Avatar System** - Procedural avatars with guy/girl options, now with simpler and cleaner design
- 🎨 **Template-Specific Styling** - Each dark template has unique accent colors and visual elements
- 🐛 **Bug Fixes** - Fixed name text color for midnight template to display as white

**Breaking Changes:** None - fully backward compatible

### v2.2.0 - Direct Share & Custom Stats

- ✨ **Fully Customizable Banner Stats** - All 4 stat items (label, icon, value) are now customizable via `textLabels` prop
- 🚀 **Direct Native Share** - Banner now shares directly to phone's native share sheet (no extra screen)
- 🖼️ **Image-Only Sharing** - Uses `expo-sharing` to share the banner image file directly
- 📝 **Enhanced Documentation** - Complete guide on customizing stats labels

## 📦 Installation

```bash
npm install @rubixscript/react-native-progress-banner
# or
yarn add @rubixscript/react-native-progress-banner
```

### Peer Dependencies

```bash
# Required dependencies
npm install expo expo-sharing expo-linear-gradient expo-blur expo-clipboard react-native-view-shot @expo/vector-icons react-native-safe-area-context
```

## 🚀 Quick Start

### Reading Tracker App (Backward Compatible)

```tsx
import React, { useState } from 'react';
import { View, Button } from 'react-native';
import { SocialShareModal } from '@rubixscript/react-native-progress-banner';

const ReadingApp = () => {
  const [showModal, setShowModal] = useState(false);

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
  ];

  const readingSessions = [
    {
      id: '1',
      bookId: '1',
      startPage: 1,
      endPage: 50,
      date: new Date(),
      duration: 120, // minutes
    },
  ];

  const profile = {
    id: 'user1',
    name: 'John Doe',
    level: 5,
    points: 1250,
  };

  return (
    <View>
      <Button
        title="Share Reading Progress"
        onPress={() => setShowModal(true)}
      />

      <SocialShareModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        books={books}
        readingSessions={readingSessions}
        profile={profile}
        onShareComplete={(platform, success) => {
          console.log(`Shared to ${platform}: ${success}`);
        }}
      />
    </View>
  );
};
```

### Pomodoro Timer App

```tsx
import React, { useState } from 'react';
import { View, Button } from 'react-native';
import { SocialShareModal } from '@rubixscript/react-native-progress-banner';

const PomodoroApp = () => {
  const [showModal, setShowModal] = useState(false);

  const tasks = [
    {
      id: '1',
      title: 'Build React Native App',
      subtitle: 'Work',
      category: 'Development',
      progress: 240, // minutes completed
      total: 480, // total estimated minutes
      color: '#FF6347',
      startDate: new Date('2025-01-01'),
    },
    {
      id: '2',
      title: 'Learn TypeScript',
      subtitle: 'Learning',
      category: 'Education',
      progress: 180,
      total: 300,
      color: '#4CAF50',
      startDate: new Date('2025-01-15'),
    },
  ];

  const pomodoroSessions = [
    {
      id: '1',
      itemId: '1',
      value: 25, // minutes worked
      duration: 25,
      date: new Date(),
      notes: 'Completed user authentication',
    },
  ];

  const profile = {
    id: 'user1',
    name: 'Focus Master',
    level: 8,
    points: 3200,
    title: 'Productivity Ninja',
  };

  return (
    <View>
      <Button
        title="Share Pomodoro Stats"
        onPress={() => setShowModal(true)}
      />

      <SocialShareModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        trackerType="pomodoro"
        items={tasks}
        sessions={pomodoroSessions}
        profile={profile}
        bannerTitle="My Productivity Stats"
        bannerFooter="FocusTime App"
        darkMode={true}
      />
    </View>
  );
};
```

### Custom Stats Labels Example

Fully customize all 4 stats shown in the banner:

```tsx
import React, { useState } from 'react';
import { View, Button } from 'react-native';
import { SocialShareModal } from '@rubixscript/react-native-progress-banner';

const CustomStatsApp = () => {
  const [showModal, setShowModal] = useState(false);

  const items = [
    {
      id: '1',
      title: 'My Goal',
      category: 'General',
      progress: 150,
      total: 200,
      color: '#8B5CF6',
      startDate: new Date('2025-01-01'),
    },
  ];

  const sessions = [
    {
      id: '1',
      itemId: '1',
      value: 25,
      duration: 25,
      date: new Date(),
    },
  ];

  const profile = {
    id: 'user1',
    name: 'Custom User',
    level: 5,
    points: 1000,
  };

  return (
    <View>
      <Button
        title="Share with Custom Stats"
        onPress={() => setShowModal(true)}
      />

      <SocialShareModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        trackerType="custom"
        items={items}
        sessions={sessions}
        profile={profile}
        bannerTitle="My Custom Progress"
        bannerFooter="MyApp"
        textLabels={{
          // Fully customize the 4 banner stats
          bannerStat1Label: 'Focus Hours',
          bannerStat1Icon: 'clock-o',
          bannerStat1Value: '42',

          bannerStat2Label: 'On Track',
          bannerStat2Icon: 'rocket',
          bannerStat2Value: '87%',

          bannerStat3Label: 'Sessions Done',
          bannerStat3Icon: 'check-circle',
          bannerStat3Value: '156',

          bannerStat4Label: 'Day Streak',
          bannerStat4Icon: 'fire',
          bannerStat4Value: '14',
        }}
      />
    </View>
  );
};
```

### Habit Tracker App

```tsx
import React, { useState } from 'react';
import { View, Button } from 'react-native';
import { SocialShareModal } from '@rubixscript/react-native-progress-banner';

const HabitTrackerApp = () => {
  const [showModal, setShowModal] = useState(false);

  const habits = [
    {
      id: '1',
      title: 'Morning Meditation',
      subtitle: 'Health & Wellness',
      category: 'Mindfulness',
      progress: 30, // days completed
      total: 90, // 90-day goal
      color: '#9C27B0',
      startDate: new Date('2025-01-01'),
    },
    {
      id: '2',
      title: 'Daily Exercise',
      subtitle: 'Fitness',
      category: 'Health',
      progress: 25,
      total: 90,
      color: '#FF5722',
      startDate: new Date('2025-01-01'),
    },
  ];

  const habitSessions = [
    {
      id: '1',
      itemId: '1',
      value: 1, // 1 day completed
      duration: 15, // 15 minutes
      date: new Date(),
      notes: '10 minutes of mindfulness',
    },
  ];

  const profile = {
    id: 'user1',
    name: 'Habit Champion',
    level: 12,
    points: 5400,
  };

  return (
    <View>
      <Button
        title="Share Habit Streak"
        onPress={() => setShowModal(true)}
      />

      <SocialShareModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        trackerType="habit"
        items={habits}
        sessions={habitSessions}
        profile={profile}
        bannerTitle="My Habit Streak"
        bannerFooter="HabitFlow"
      />
    </View>
  );
};
```

### Skill Tracker App

```tsx
import React, { useState } from 'react';
import { View, Button } from 'react-native';
import { SocialShareModal } from '@rubixscript/react-native-progress-banner';

const SkillTrackerApp = () => {
  const skills = [
    {
      id: '1',
      title: 'JavaScript Mastery',
      subtitle: 'Programming',
      category: 'Web Development',
      progress: 45, // practice sessions
      total: 100,
      color: '#F7DF1E',
      startDate: new Date('2024-11-01'),
    },
  ];

  const skillSessions = [
    {
      id: '1',
      itemId: '1',
      value: 1, // 1 practice session
      duration: 60,
      date: new Date(),
    },
  ];

  const profile = {
    id: 'user1',
    name: 'Code Learner',
    level: 6,
    points: 2100,
  };

  return (
    <SocialShareModal
      visible={true}
      onClose={() => {}}
      trackerType="skill"
      items={skills}
      sessions={skillSessions}
      profile={profile}
      bannerTitle="My Learning Journey"
    />
  );
};
```

### Fitness Tracker App

```tsx
import React, { useState } from 'react';
import { View, Button } from 'react-native';
import { SocialShareModal } from '@rubixscript/react-native-progress-banner';

const FitnessApp = () => {
  const workouts = [
    {
      id: '1',
      title: 'Push-ups Challenge',
      subtitle: 'Upper Body',
      category: 'Strength',
      progress: 450, // total reps
      total: 1000, // goal
      color: '#E91E63',
      startDate: new Date('2025-01-01'),
    },
  ];

  const workoutSessions = [
    {
      id: '1',
      itemId: '1',
      value: 50, // 50 reps
      duration: 10,
      date: new Date(),
    },
  ];

  const profile = {
    id: 'user1',
    name: 'Fitness Beast',
    level: 15,
    points: 8900,
  };

  return (
    <SocialShareModal
      visible={true}
      onClose={() => {}}
      trackerType="fitness"
      items={workouts}
      sessions={workoutSessions}
      profile={profile}
      bannerTitle="My Fitness Progress"
      bannerFooter="GymPro"
    />
  );
};
```

## 🎯 Integration with Companion Libraries

This Progress Banner library is designed to work seamlessly with other RubixScript productivity libraries:

### With Flip Clock Library (Pomodoro Integration)

Combine Progress Banner with the Flip Clock for sharing Pomodoro achievements:

```tsx
import React, { useState } from 'react';
import { View, Button } from 'react-native';
import { FlipClockModal } from '@rubixscript/react-native-flip-clock';
import { SocialShareModal } from '@rubixscript/react-native-progress-banner';

const PomodoroShareApp = () => {
  const [showTimer, setShowTimer] = useState(false);
  const [showShare, setShowShare] = useState(false);

  // Tasks tracked with Flip Clock Pomodoro sessions
  const tasks = [
    {
      id: '1',
      title: 'Build React Native App',
      subtitle: 'Development',
      category: 'Work',
      progress: 240, // minutes completed (4 hours)
      total: 480,    // estimated total minutes (8 hours)
      color: '#FF6347',
      startDate: new Date('2025-01-01'),
    },
    {
      id: '2',
      title: 'Learn TypeScript',
      subtitle: 'Education',
      category: 'Learning',
      progress: 180,
      total: 300,
      color: '#3B82F6',
      startDate: new Date('2025-01-10'),
    },
  ];

  // Pomodoro sessions from Flip Clock
  const pomodoroSessions = [
    {
      id: 's1',
      itemId: '1',
      value: 25, // 25 minutes
      duration: 25,
      date: new Date(),
      notes: 'User authentication',
    },
    {
      id: 's2',
      itemId: '1',
      value: 25,
      duration: 25,
      date: new Date(),
      notes: 'API integration',
    },
  ];

  const userProfile = {
    id: 'user1',
    name: 'Focus Master',
    level: 8,
    points: 3200,
    title: 'Productivity Ninja',
  };

  return (
    <View>
      {/* Timer Button */}
      <Button
        title="Start Pomodoro"
        onPress={() => setShowTimer(true)}
      />

      {/* Share Progress Button */}
      <Button
        title="Share My Progress"
        onPress={() => setShowShare(true)}
      />

      {/* Flip Clock for Pomodoro Timer */}
      <FlipClockModal
        visible={showTimer}
        onClose={() => setShowTimer(false)}
        phase="work"
        theme="dark"
        time={1500}
        isRunning={false}
        onStart={() => console.log('Session started')}
        onStop={() => {
          // After completing a session, update sessions array
          console.log('Session completed - ready to share!');
        }}
      />

      {/* Social Share Modal for Pomodoro Stats */}
      <SocialShareModal
        visible={showShare}
        onClose={() => setShowShare(false)}
        trackerType="pomodoro"
        items={tasks}
        sessions={pomodoroSessions}
        profile={userProfile}
        bannerTitle="My Pomodoro Stats"
        bannerFooter="FocusTime App"
        darkMode={true}
        onShareComplete={(platform, success) => {
          console.log(`Shared to ${platform}: ${success}`);
        }}
      />
    </View>
  );
};
```

### With Productivity Charts Library

Combine Progress Banner with Productivity Charts for visual analytics before sharing:

```tsx
import React, { useState } from 'react';
import { View, ScrollView, Button } from 'react-native';
import {
  HeatmapChart,
  ActivityBarChart,
  ProgressCard,
  generateHeatmapData,
  useProductivityData,
} from '@rubixscript/react-native-productivity-charts';
import { SocialShareModal } from '@rubixscript/react-native-progress-banner';

const DashboardWithShare = () => {
  const [showShare, setShowShare] = useState(false);

  // Your tracking data
  const sessions = [
    { date: new Date('2025-01-01'), value: 5 },
    { date: new Date('2025-01-02'), value: 8 },
    { date: new Date('2025-01-03'), value: 6 },
    // ... more sessions
  ];

  // Generate data for Productivity Charts
  const heatmapDays = generateHeatmapData(sessions, 150, 8);
  const { stats } = useProductivityData({ days: heatmapDays });

  // Map to ProgressItem format
  const progressItems = [
    {
      id: '1',
      title: 'My Learning Journey',
      subtitle: 'Daily Activities',
      category: 'Productivity',
      progress: stats.totalSessions,
      total: stats.totalSessions + 20, // Goal
      color: '#8B5CF6',
      startDate: new Date('2025-01-01'),
    },
  ];

  // Map to ProgressSession format
  const progressSessions = sessions.map((session, index) => ({
    id: `s${index}`,
    itemId: '1',
    value: session.value,
    duration: session.value * 25, // 25 min per session
    date: session.date,
  }));

  const userProfile = {
    id: 'user1',
    name: 'Learner',
    level: Math.floor(stats.totalSessions / 10) + 1,
    points: stats.totalSessions * 100,
  };

  return (
    <ScrollView style={{ padding: 16 }}>
      {/* Visual Analytics */}
      <ProgressCard
        icon="fire"
        value={stats.currentStreak}
        label="Day Streak"
      />

      <ProgressCard
        icon="clock-outline"
        value={Math.round(stats.totalTime / 60)}
        label="Hours Focused"
      />

      <HeatmapChart days={heatmapDays} title="Activity Heatmap" />

      <ActivityBarChart
        data={heatmapDays.slice(-7).map(day => ({
          label: day.date.getDate().toString(),
          value: day.value,
        }))}
        title="Last 7 Days"
      />

      {/* Share Button */}
      <Button
        title="Share My Progress"
        onPress={() => setShowShare(true)}
      />

      {/* Social Share Modal */}
      <SocialShareModal
        visible={showShare}
        onClose={() => setShowShare(false)}
        trackerType="pomodoro"
        items={progressItems}
        sessions={progressSessions}
        profile={userProfile}
        bannerTitle="My Productivity Journey"
        bannerFooter="MyApp"
        darkMode={false}
        onShareComplete={(platform, success) => {
          console.log(`Shared to ${platform}: ${success}`);
        }}
      />
    </ScrollView>
  );
};
```

### Complete Integration Example

A complete productivity app combining all three libraries:

```tsx
import React, { useState } from 'react';
import { View, ScrollView, Button } from 'react-native';
import { FlipClockModal } from '@rubixscript/react-native-flip-clock';
import {
  HeatmapChart,
  ProgressCard,
  generateHeatmapData,
  useProductivityData,
} from '@rubixscript/react-native-productivity-charts';
import { SocialShareModal } from '@rubixscript/react-native-progress-banner';

const CompleteProductivityShareApp = () => {
  const [showTimer, setShowTimer] = useState(false);
  const [showShare, setShowShare] = useState(false);

  // Session data from your app
  const sessions = [
    { date: new Date(), value: 4, duration: 100 },
    { date: new Date(Date.now() - 86400000), value: 6, duration: 150 },
    // ... more sessions
  ];

  const heatmapDays = generateHeatmapData(sessions, 90, 5);
  const { stats } = useProductivityData({ days: heatmapDays });

  const progressItems = [
    {
      id: '1',
      title: 'Focus Goals',
      subtitle: 'Productivity',
      category: 'Work',
      progress: stats.totalSessions,
      total: 100,
      color: '#8B5CF6',
      startDate: new Date('2025-01-01'),
    },
  ];

  const progressSessions = sessions.map((s, i) => ({
    id: `s${i}`,
    itemId: '1',
    value: s.value,
    duration: s.duration,
    date: s.date,
  }));

  const userProfile = {
    id: 'user1',
    name: 'Productivity Master',
    level: Math.floor(stats.totalSessions / 10) + 1,
    points: stats.totalSessions * 100,
    title: 'Focus Champion',
  };

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      {/* Visual Stats */}
      <ProgressCard
        icon="fire"
        value={stats.currentStreak}
        label="Day Streak"
      />

      <HeatmapChart days={heatmapDays} title="Activity Heatmap" />

      {/* Timer Button */}
      <Button
        title="Start Focus Session"
        onPress={() => setShowTimer(true)}
      />

      {/* Share Progress Button */}
      <Button
        title="Share My Achievements"
        onPress={() => setShowShare(true)}
      />

      {/* Flip Clock Modal for Timer */}
      <FlipClockModal
        visible={showTimer}
        onClose={() => setShowTimer(false)}
        phase="work"
        theme="dark"
        time={1500}
        isRunning={false}
        onStart={() => console.log('Timer started')}
        onPause={() => console.log('Timer paused')}
        onStop={() => {
          // After completing a session, add to sessions and update stats
          console.log('Session completed!');
        }}
      />

      {/* Social Share Modal */}
      <SocialShareModal
        visible={showShare}
        onClose={() => setShowShare(false)}
        trackerType="pomodoro"
        items={progressItems}
        sessions={progressSessions}
        profile={userProfile}
        bannerTitle="My Focus Journey"
        bannerFooter="ProductivityPro"
        darkMode={true}
        layoutType="graph"
        onShareComplete={(platform, success) => {
          console.log(`Shared achievements to ${platform}: ${success}`);
        }}
      />
    </ScrollView>
  );
};
```

### Sharing Tips

#### Best Practices for Shareable Content

1. **After Completing Sessions**: Trigger the share modal after completing Flip Clock sessions
2. **Milestone Achievements**: Share when reaching streaks (7 days, 30 days, etc.)
3. **Weekly Summary**: Share weekly productivity highlights from charts
4. **Goal Completion**: Celebrate when completing major goals

#### Share Content Customization

```tsx
// Customize the banner for different occasions
<SocialShareModal
  // For daily streaks
  bannerTitle="🔥 30 Day Streak!"
  bannerFooter="DailyFocus"

  // For milestones
  bannerTitle="🎯 100 Hours Focused!"
  bannerFooter="FocusTracker Pro"

  // For summaries
  bannerTitle="📊 My Monthly Progress"
  bannerFooter="ProductivityHub"
/>
```

## 📚 Core Data Models

### Generic Types (v2.0+)

#### TrackerType

```tsx
type TrackerType = 'reading' | 'pomodoro' | 'skill' | 'habit' | 'fitness' | 'custom';
```

#### ProgressItem

Generic item interface that works for books, tasks, habits, skills, workouts, etc.

```tsx
interface ProgressItem {
  id: string;
  title: string;
  subtitle?: string; // e.g., author for books, category for habits
  category: string;
  progress: number; // Current progress value
  total: number; // Total/goal value
  coverUri?: string; // Optional cover image
  color: string; // Color for visual representation
  startDate?: string | Date;
  completedDate?: string | Date | null;
  caption?: string;
  metadata?: Record<string, any>; // For custom data
}
```

#### ProgressSession

Generic session interface for tracking progress over time.

```tsx
interface ProgressSession {
  id: string;
  itemId: string; // ID of the ProgressItem
  value: number; // Progress made in this session (e.g., pages read, minutes worked, reps completed)
  duration: number; // Duration in minutes
  date: string | Date;
  notes?: string;
  metadata?: Record<string, any>; // For custom data
}
```

#### UserProfile

```tsx
interface UserProfile {
  id: string;
  name: string;
  avatar?: string;
  level: number; // Generic level (works for any tracker type)
  points: number;
  title?: string; // e.g., "Master Reader", "Focus Ninja", "Habit Champion"
}
```

#### ProgressStats

Generic statistics interface with dynamic labels.

```tsx
interface ProgressStats {
  // Current period stats
  progressThisWeek: number;
  progressThisMonth: number;
  itemsCompletedThisMonth: number;
  itemsCompletedThisMonthList: ProgressItem[];
  itemsInProgressThisMonth: ProgressItem[];
  topItemThisWeek: ProgressItem | null;

  // All-time stats
  totalItems: number;
  totalProgressEver: number;
  avgProgressPerDay: number;

  // Goals and achievements
  goalPercentage: number;
  currentStreak: number;
  totalPoints: number;

  // Metadata for display
  progressLabel: string; // e.g., "Pages", "Minutes", "Reps", "Days"
  itemLabel: string; // e.g., "Books", "Sessions", "Skills", "Habits"
}
```

#### GraphData

Generic activity graph data for 30-day heatmaps.

```tsx
interface GraphData {
  days: Array<{
    date: Date;
    value: number; // Generic value instead of pages
    intensity: number; // 0-4 scale
    isToday: boolean;
  }>;
  totalDays: number;
  activeDays: number;
  totalValue: number;
  maxValueInDay: number;
  currentStreak: number;
  valueLabel?: string; // e.g., "Pages", "Minutes", "Reps"
}
```

### Reading-Specific Types (Backward Compatible)

#### Book

Extends `ProgressItem` with reading-specific fields.

```tsx
interface Book extends ProgressItem {
  author: string;
  totalPages: number;
  currentPage: number;
}
```

#### ReadingSession

Extends `ProgressSession` with reading-specific fields.

```tsx
interface ReadingSession extends ProgressSession {
  bookId: string;
  startPage: number;
  endPage: number;
}
```

## 🎨 API Reference

### SocialShareModal Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `visible` | `boolean` | ✅ | - | Controls modal visibility |
| `onClose` | `() => void` | ✅ | - | Callback when modal is closed |
| `trackerType` | `TrackerType` | ❌ | `'reading'` | Type of tracker (reading, pomodoro, skill, habit, fitness, custom) |
| `items` | `ProgressItem[]` | ❌* | - | Generic progress items (tasks, habits, skills, etc.) |
| `sessions` | `ProgressSession[]` | ❌* | - | Generic progress sessions |
| `books` | `Book[]` | ❌* | - | Reading-specific: Array of books (backward compatible) |
| `readingSessions` | `ReadingSession[]` | ❌* | - | Reading-specific: Array of reading sessions (backward compatible) |
| `profile` | `UserProfile` | ❌ | - | User profile information |
| `darkMode` | `boolean` | ❌ | `false` | Enable dark mode styling |
| `bannerTitle` | `string` | ❌ | Auto-generated | Custom banner title (e.g., "My Pomodoro Stats") |
| `bannerFooter` | `string` | ❌ | `'RubixScript'` | Custom footer text (your app name) |
| `textLabels` | `SocialShareModalLabels` | ❌ | - | **Custom labels for all text including banner stats** |
| `onShareComplete` | `(platform: string, success: boolean) => void` | ❌ | - | Callback after sharing attempt |

\* Either provide `items` + `sessions` (generic) OR `books` + `readingSessions` (reading-specific)

### Customizing Banner Stats Labels

The `textLabels` prop allows you to fully customize all text in the modal, including the 4 stats shown in the banner grid. **No more hardcoded labels!**

#### Fully Customizable Banner Stats

Each of the 4 stat items in the banner can be customized with:
- Custom label text
- Custom FontAwesome icon
- Custom value (or use calculated values from stats)

```tsx
<SocialShareModal
  visible={showModal}
  onClose={() => setShowModal(false)}
  trackerType="pomodoro"
  items={tasks}
  sessions={sessions}
  profile={profile}
  textLabels={{
    // Customize the 4 stats shown in the banner
    // Stat 1 (default: "Progress" with bar-chart icon)
    bannerStat1Label: 'Focus Time',
    bannerStat1Icon: 'clock-o',
    bannerStat1Value: '240', // Or leave undefined to use progressThisMonth

    // Stat 2 (default: "% Goal" with crosshairs icon)
    bannerStat2Label: 'Target',
    bannerStat2Icon: 'bullseye',
    bannerStat2Value: '75%', // Or leave undefined to use goalPercentage

    // Stat 3 (default: "Books"/"Tasks" with check-circle icon)
    bannerStat3Label: 'Completed',
    bannerStat3Icon: 'check-square',
    bannerStat3Value: '12', // Or leave undefined to use itemsCompletedThisMonth

    // Stat 4 (default: "Streak" with fire icon)
    bannerStat4Label: 'Days Active',
    bannerStat4Icon: 'calendar',
    bannerStat4Value: '30', // Or leave undefined to use currentStreak
  }}
/>
```

#### All Available Text Label Options

```tsx
interface SocialShareModalLabels {
  // Header & Section Titles
  headerTitle?: string;              // Default: "Share Your [Type] Progress"
  templateSectionTitle?: string;     // Default: "Choose Template"
  previewSectionTitle?: string;      // Default: "Preview"
  shareSectionTitle?: string;        // Default: "Share Your Progress"
  statsSectionTitle?: string;        // Default: "Your [Type] Stats"

  // Share Section
  shareDescription?: string;         // Default: "Share your progress with friends..."

  // Buttons
  generateBannerText?: string;       // Default: "Generate Banner"
  generatingText?: string;           // Default: "Generating..."
  backToTemplatesText?: string;      // Default: "Back to Templates"

  // Success Messages
  copyLinkSuccessMessage?: string;   // Default: "Progress copied to clipboard!"
  shareSuccessMessage?: string;      // Default: "Your progress has been shared!"
  shareErrorMessage?: string;        // Default: "Failed to share. Please try again."

  // Stats Labels (for ProgressStats calculation)
  progressLabel?: string;            // Default: "Progress" (or type-specific)
  itemLabel?: string;                // Default: "Items" (or type-specific)

  // Banner Stats Labels (fully customizable!)
  bannerStat1Label?: string;         // Stat 1 label text
  bannerStat1Icon?: string;          // Stat 1 FontAwesome icon name
  bannerStat1Value?: string;         // Stat 1 value override
  bannerStat2Label?: string;         // Stat 2 label text
  bannerStat2Icon?: string;          // Stat 2 FontAwesome icon name
  bannerStat2Value?: string;         // Stat 2 value override
  bannerStat3Label?: string;         // Stat 3 label text
  bannerStat3Icon?: string;          // Stat 3 FontAwesome icon name
  bannerStat3Value?: string;         // Stat 3 value override
  bannerStat4Label?: string;         // Stat 4 label text
  bannerStat4Icon?: string;          // Stat 4 FontAwesome icon name
  bannerStat4Value?: string;         // Stat 4 value override
}
```

#### Example: Fitness Tracker Custom Stats

```tsx
<SocialShareModal
  visible={showModal}
  onClose={() => setShowModal(false)}
  trackerType="fitness"
  items={workouts}
  sessions={workoutSessions}
  profile={profile}
  bannerTitle="My Fitness Journey"
  bannerFooter="FitPro App"
  textLabels={{
    // Banner stats for fitness
    bannerStat1Label: 'Total Reps',
    bannerStat1Icon: 'heartbeat',
    // bannerStat1Value uses progressThisMonth (total reps)

    bannerStat2Label: 'Goal Reached',
    bannerStat2Icon: 'trophy',
    // bannerStat2Value uses goalPercentage

    bannerStat3Label: 'Workouts',
    bannerStat3Icon: 'dumbbell',
    // bannerStat3Value uses itemsCompletedThisMonth

    bannerStat4Label: 'Active Days',
    bannerStat4Icon: 'fire',
    // bannerStat4Value uses currentStreak
  }}
/>
```

#### Example: Habit Tracker Custom Stats

```tsx
<SocialShareModal
  visible={showModal}
  onClose={() => setShowModal(false)}
  trackerType="habit"
  items={habits}
  sessions={habitSessions}
  profile={profile}
  textLabels={{
    bannerStat1Label: 'Days Completed',
    bannerStat1Icon: 'check-circle-o',

    bannerStat2Label: 'Success Rate',
    bannerStat2Icon: 'line-chart',

    bannerStat3Label: 'Habits Done',
    bannerStat3Icon: 'star',

    bannerStat4Label: 'Current Streak',
    bannerStat4Icon: 'bolt',
  }}
/>
```

#### Example: Custom Values Instead of Calculated

If you want to show completely custom values instead of the calculated ones:

```tsx
<SocialShareModal
  visible={showModal}
  onClose={() => setShowModal(false)}
  trackerType="reading"
  books={books}
  readingSessions={readingSessions}
  profile={profile}
  textLabels={{
    // Override all values with custom ones
    bannerStat1Value: '1,250',  // Custom pages instead of progressThisMonth
    bannerStat2Value: '85%',    // Custom percentage
    bannerStat3Value: '7',      // Custom books count
    bannerStat4Value: '45',     // Custom streak days
  }}
/>
```

### Customizing Footer Branding (RubixScript)

The banner footer shows your app name. Customize it with the `bannerFooter` prop:

```tsx
<SocialShareModal
  visible={showModal}
  onClose={() => setShowModal(false)}
  trackerType="pomodoro"
  items={items}
  sessions={sessions}
  profile={profile}
  bannerFooter="My Awesome App"  // Your app name instead of "RubixScript"
/>
```

**Default**: If not specified, the footer shows "RubixScript".

### BannerGenerator Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `data` | `ProgressStats \| ReadingStats` | ✅ | - | Statistics data to display |
| `profile` | `UserProfile` | ❌ | - | User profile information |
| `template` | `BannerTemplate` | ❌ | First template | Banner design template |
| `layoutType` | `'stats' \| 'graph'` | ❌ | `'stats'` | Layout mode (stats grid or activity graph) |
| `graphData` | `GraphData` | ❌ | - | Activity graph data (required if layoutType is 'graph') |
| `trackerType` | `TrackerType` | ❌ | `'reading'` | Type of tracker for icons and labels |
| `bannerTitle` | `string` | ❌ | Auto-generated | Custom banner title |
| `bannerFooter` | `string` | ❌ | `'RubixScript'` | Custom footer text |
| `onBannerGenerated` | `(imageUri: string) => void` | ❌ | - | Callback when banner is generated |

### ShareButtons Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `content` | `ShareContent` | ✅ | - | Content to share |
| `platforms` | `SocialPlatform[]` | ❌ | All platforms | Platforms to show buttons for |
| `buttonStyle` | `'primary' \| 'secondary' \| 'outline'` | ❌ | `'primary'` | Button visual style |
| `size` | `'small' \| 'medium' \| 'large'` | ❌ | `'medium'` | Button size |
| `darkMode` | `boolean` | ❌ | `false` | Enable dark mode styling |
| `onShare` | `(platform: string) => void` | ❌ | - | Callback when platform is selected |

### BannerTemplate

```tsx
interface BannerTemplate {
  id: string;
  name: string;
  colors: string[]; // Gradient colors (minimum 2)
  accentColors: string[]; // Text/UI accent colors
  overlayColor: string; // Semi-transparent overlay
  style: string; // Style identifier
}
```

### ShareContent

```tsx
interface ShareContent {
  title: string;
  message?: string;
  url?: string;
  image?: string;
  tags?: string[];
}
```

## 🎨 Built-in Templates

The library includes 3 modern dark minimal templates, each with unique accent colors and visual elements:

1. **Midnight** - Pure black with subtle purple accent glow and white name text
2. **Obsidian** - Deep blue-black with cyan top accent bar
3. **Carbon** - Dark charcoal with emerald green glow effect

## 🛠️ Utility Functions

### ShareHelpers

#### Calculate Generic Progress Stats

```tsx
import { ShareHelpers } from '@rubixscript/react-native-progress-banner';

const stats = ShareHelpers.calculateProgressStats(
  items,
  sessions,
  'pomodoro', // tracker type
  {
    progressLabel: 'Minutes', // optional custom label
    itemLabel: 'Tasks', // optional custom label
    goalValue: 1000, // optional goal for percentage calculation
  }
);
```

#### Generate Progress Graph Data

```tsx
const graphData = ShareHelpers.generateProgressGraphData(
  sessions,
  'habit', // tracker type
  {
    daysToShow: 30, // optional, default 30
    valueLabel: 'Days', // optional
    intensityThresholds: [1, 15, 30, 50], // optional, for coloring
  }
);
```

#### Get Level Name

```tsx
const levelName = ShareHelpers.getLevelName(level, 'pomodoro');
// Returns: 'Novice', 'Beginner', 'Intermediate', 'Advanced', 'Expert', 'Master', 'Grand Master'
```

#### Get Progress/Item Labels

```tsx
const progressLabel = ShareHelpers.getProgressLabel('pomodoro'); // "Minutes"
const itemLabel = ShareHelpers.getItemLabel('habit'); // "Habits"
```

### Default Labels by Tracker Type

| Tracker Type | Progress Label | Item Label |
|--------------|----------------|------------|
| `reading` | Pages | Books |
| `pomodoro` | Minutes | Tasks |
| `skill` | Sessions | Skills |
| `habit` | Days | Habits |
| `fitness` | Reps | Workouts |
| `custom` | Progress | Items |

## 📱 Platforms Supported

- ✅ Facebook
- ✅ Instagram (via native sharing)
- ✅ Twitter/X
- ✅ LinkedIn
- ✅ WhatsApp
- ✅ Telegram
- ✅ Copy to Clipboard
- ✅ Native Share Dialog (More options)

## 📊 Analytics

Track sharing behavior across your app:

```tsx
import { ShareAnalyticsService } from '@rubixscript/react-native-progress-banner';

const analytics = ShareAnalyticsService.getInstance();

// Get sharing statistics
const stats = analytics.getShareStats();
console.log('Total shares:', stats.totalShares);
console.log('Success rate:', stats.successRate);
console.log('Most popular platform:', stats.mostPopularPlatform);

// Export analytics data
const data = await analytics.exportAnalytics();

// Clear analytics data
analytics.clearAnalytics();
```

## 🎯 Advanced Usage

### Using Individual Components

#### Generate Banner Programmatically

```tsx
import React, { useRef } from 'react';
import { BannerGenerator, BannerGeneratorRef } from '@rubixscript/react-native-progress-banner';

const MyComponent = () => {
  const bannerRef = useRef<BannerGeneratorRef>(null);

  const generateAndSave = async () => {
    const uri = await bannerRef.current?.generateBanner();
    if (uri) {
      console.log('Banner saved to:', uri);
      // Do something with the banner URI
    }
  };

  return (
    <>
      <Button title="Generate Banner" onPress={generateAndSave} />

      <BannerGenerator
        ref={bannerRef}
        data={stats}
        profile={profile}
        trackerType="pomodoro"
        layoutType="graph"
        graphData={graphData}
      />
    </>
  );
};
```

### Custom Template

```tsx
const customTemplate = {
  id: 'my-custom',
  name: 'Ocean Sunset',
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

## 🔄 Migration Guide (v1.x → v2.0)

### Breaking Changes

1. **Package Name Changed**
   ```bash
   # Old
   npm install @rubixscript/react-native-social-banner

   # New
   npm install @rubixscript/react-native-progress-banner
   ```

2. **UserProfile Interface**
   ```tsx
   // Old (v1.x)
   interface UserProfile {
     readerLevel: number; // ❌ Removed
   }

   // New (v2.0)
   interface UserProfile {
     level: number; // ✅ Generic level name
     title?: string; // ✅ Optional custom title
   }
   ```

3. **Helper Functions**
   ```tsx
   // Old (v1.x)
   ShareHelpers.getReaderLevelName(level); // ❌ Deprecated

   // New (v2.0) - Still works but use generic version
   ShareHelpers.getLevelName(level, trackerType); // ✅ Recommended
   ShareHelpers.getReaderLevelName(level); // ✅ Still supported for backward compatibility
   ```

### What Stays the Same

✅ All reading-specific props still work (`books`, `readingSessions`)
✅ `Book` and `ReadingSession` interfaces unchanged
✅ All component props backward compatible
✅ Template system unchanged
✅ Share buttons unchanged

### Migration Steps

#### Step 1: Update Dependencies

```bash
npm uninstall @rubixscript/react-native-social-banner
npm install @rubixscript/react-native-progress-banner
```

#### Step 2: Update Imports

```tsx
// Old
import { SocialShareModal } from '@rubixscript/react-native-social-banner';

// New
import { SocialShareModal } from '@rubixscript/react-native-progress-banner';
```

#### Step 3: Update UserProfile (if using)

```tsx
// Old
const profile = {
  id: 'user1',
  name: 'John Doe',
  readerLevel: 5, // ❌ Change this
  points: 1250,
};

// New
const profile = {
  id: 'user1',
  name: 'John Doe',
  level: 5, // ✅ Renamed
  points: 1250,
};
```

#### Step 4: (Optional) Add New Features

```tsx
// Add tracker type for better labeling
<SocialShareModal
  visible={true}
  onClose={() => {}}
  trackerType="reading" // ✅ New prop (optional)
  books={books}
  readingSessions={readingSessions}
  profile={profile}
  bannerTitle="My Reading Journey" // ✅ New prop (optional)
  bannerFooter="MyApp" // ✅ New prop (optional)
/>
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For issues, questions, and feature requests:
- 🐛 [Create an issue on GitHub](https://github.com/rubixscript/react-native-progress-banner/issues)
- 📧 Email: support@rubixscript.com
- 💬 [Join our Discord community](https://discord.gg/rubixscript)

## 🙏 Acknowledgments

Built with:
- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [react-native-view-shot](https://github.com/gre/react-native-view-shot)
- [expo-linear-gradient](https://docs.expo.dev/versions/latest/sdk/linear-gradient/)
- [expo-blur](https://docs.expo.dev/versions/latest/sdk/blur-view/)

## 🌟 Show Your Support

If this library helped you, please give it a ⭐️ on GitHub!

---

Made with ❤️ by the [RubixScript Team](https://www.rubixscript.com)
