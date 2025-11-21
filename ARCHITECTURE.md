# Library Architecture

## 📁 Modular Structure

```
src/
├── components/
│   ├── BannerGenerator/
│   │   ├── index.tsx                    # Main banner generator (orchestrator)
│   │   ├── Avatar.tsx                   # Procedural avatar component
│   │   ├── UserCard.tsx                 # User info card with level & points
│   │   ├── StatsGrid.tsx               # 4-stat grid layout
│   │   ├── ActivityGraph.tsx           # 30-day activity heatmap
│   │   ├── ItemsList.tsx               # List of progress items
│   │   └── BrandingFooter.tsx          # App branding footer
│   │
│   ├── SocialShareModal/
│   │   ├── index.tsx                    # Main modal (orchestrator)
│   │   ├── TemplateSelector.tsx        # Template selection UI
│   │   ├── StatsSummary.tsx            # Stats summary cards
│   │   └── ShareStep.tsx               # Share buttons step
│   │
│   ├── ShareButtons/
│   │   └── index.tsx                    # Social platform buttons
│   │
│   ├── BannerGenerator.old.tsx          # Backup of old monolithic file
│   └── SocialShareModal.tsx             # Original file (to be refactored)
│
├── hooks/
│   ├── useBannerGeneration.ts          # Banner generation logic (future)
│   ├── useProgressStats.ts             # Stats calculation hook (future)
│   └── useGraphData.ts                 # Graph data hook (future)
│
├── utils/
│   ├── helpers/
│   │   └── trackerHelpers.ts           # Tracker-specific utilities
│   ├── shareHelpers.ts                  # Share & stats calculations
│   └── analytics.ts                     # Analytics service
│
├── constants/
│   ├── templates.ts                     # Banner templates
│   ├── platforms.ts                     # Social platforms (future)
│   └── messages.ts                      # Share messages (future)
│
└── types/
    └── index.ts                         # All TypeScript interfaces
```

## 🎯 Design Principles

### 1. **Single Responsibility**
Each component has one clear purpose:
- `Avatar.tsx` - Only renders the avatar
- `StatsGrid.tsx` - Only renders the stats grid
- `ActivityGraph.tsx` - Only renders the activity heatmap

### 2. **Separation of Concerns**
- **UI Components** - Pure presentational (no business logic)
- **Utility Functions** - Pure functions for calculations
- **Hooks** - Encapsulate stateful logic (future enhancement)
- **Types** - Centralized type definitions

### 3. **Composition Over Inheritance**
- Main components (`BannerGenerator`, `SocialShareModal`) orchestrate subcomponents
- Subcomponents are highly reusable and testable
- Props flow down, events bubble up

### 4. **DRY (Don't Repeat Yourself)**
- Shared utilities in `trackerHelpers.ts`
- Reusable components for common patterns
- Centralized styling

## 📦 Component Hierarchy

### BannerGenerator
```
BannerGenerator (index.tsx)
├── ViewShot (banner capture)
├── LinearGradient (template background)
└── BlurView (glass effect)
    ├── UserCard
    │   ├── Level Badge
    │   ├── Points Badge
    │   └── Avatar
    ├── User Name
    ├── ItemsList
    │   ├── Section Header
    │   ├── Item 1
    │   ├── Item 2
    │   ├── Item 3
    │   └── More Badge
    ├── StatsGrid | ActivityGraph (conditional)
    └── BrandingFooter
```

### SocialShareModal
```
SocialShareModal (index.tsx)
├── Modal
├── SafeAreaView
├── Header
├── ScrollView
│   ├── TemplateSelector (step 1)
│   ├── BannerGenerator Preview (step 1)
│   ├── ShareStep (step 2)
│   └── StatsSummary (both steps)
└── Action Button (Generate/Back)
```

## 🔧 Utility Modules

### trackerHelpers.ts
```typescript
- getTrackerEmoji(type): string
- getProgressLabel(type): string
- getItemLabel(type): string
- getLevelName(level): string
```

### shareHelpers.ts
```typescript
- calculateProgressStats(items, sessions, type): ProgressStats
- generateProgressGraphData(sessions, type): GraphData
- calculateReadingStats(books, sessions): ReadingStats  // Backward compat
- generateReadingGraphData(sessions): GraphData          // Backward compat
```

## 🎨 Styling Strategy

### Current: Inline Styles
- Each component has its own `StyleSheet.create()`
- Styles are colocated with components
- Easy to maintain and understand

### Future: Shared Style System
```
styles/
├── theme.ts          # Colors, spacing, typography
├── common.ts         # Shared styles
└── mixins.ts         # Reusable style functions
```

## 🚀 Benefits of Modularization

### 1. **Maintainability**
- Smaller files (50-150 lines vs 700+ lines)
- Easy to locate and fix bugs
- Clear component boundaries

### 2. **Testability**
- Each component can be tested in isolation
- Mock props easily
- Unit test pure functions separately

### 3. **Reusability**
- Components can be used independently
- Share components across projects
- Build new features faster

### 4. **Readability**
- Clear file names indicate purpose
- Easier onboarding for new developers
- Better code documentation

### 5. **Performance**
- Potential for code splitting
- Tree-shaking unused components
- Lazy loading opportunities

### 6. **Collaboration**
- Multiple developers can work simultaneously
- Reduced merge conflicts
- Clear ownership of files

## 📝 Migration Status

### ✅ Completed
- [x] BannerGenerator modularization
  - [x] Avatar component
  - [x] UserCard component
  - [x] StatsGrid component
  - [x] ActivityGraph component
  - [x] ItemsList component
  - [x] BrandingFooter component
- [x] SocialShareModal partial modularization
  - [x] TemplateSelector component
  - [x] StatsSummary component
  - [x] ShareStep component
- [x] Utility helpers
  - [x] trackerHelpers module

### 🚧 In Progress
- [ ] Complete SocialShareModal refactoring
  - [ ] Create refactored index.tsx
  - [ ] Move to modular structure
  - [ ] Update imports

### 📋 Future Enhancements
- [ ] Create custom hooks
  - [ ] `useBannerGeneration()`
  - [ ] `useProgressStats()`
  - [ ] `useGraphData()`
- [ ] Split utility functions further
  - [ ] `progressCalculations.ts`
  - [ ] `dateHelpers.ts`
  - [ ] `formatters.ts`
- [ ] Create shared style system
- [ ] Add comprehensive tests
- [ ] Performance optimizations
  - [ ] React.memo for expensive components
  - [ ] useMemo for calculations
  - [ ] useCallback for handlers

## 🔗 Import Examples

### Using Modular Components

```typescript
// Import main components (as before)
import { SocialShareModal, BannerGenerator } from '@rubixscript/react-native-progress-banner';

// Import subcomponents (if needed for custom implementations)
import { Avatar } from '@rubixscript/react-native-progress-banner/BannerGenerator/Avatar';
import { StatsGrid } from '@rubixscript/react-native-progress-banner/BannerGenerator/StatsGrid';

// Import utilities
import { getTrackerEmoji, getProgressLabel } from '@rubixscript/react-native-progress-banner/utils';
```

## 🎯 Best Practices

### 1. **Component Props**
- Use TypeScript interfaces
- Provide sensible defaults
- Document with JSDoc comments

### 2. **Styling**
- Use `StyleSheet.create()` for performance
- Avoid inline styles for static values
- Support dark mode consistently

### 3. **State Management**
- Keep state close to where it's used
- Lift state only when necessary
- Use custom hooks for complex logic

### 4. **Error Handling**
- Try-catch in async operations
- Provide fallback UI for errors
- Log errors for debugging

### 5. **Performance**
- Avoid re-renders with React.memo
- Memoize expensive calculations
- Use proper key props in lists

## 📚 Resources

- [React Component Design Patterns](https://reactpatterns.com/)
- [React Native Best Practices](https://reactnative.dev/docs/performance)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)

---

Made with ❤️ by the RubixScript Team
