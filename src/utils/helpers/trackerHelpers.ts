import { TrackerType } from '../../types';

/**
 * Get emoji icon for tracker type
 */
export function getTrackerEmoji(trackerType: TrackerType): string {
  switch (trackerType) {
    case 'reading':
      return '📚';
    case 'pomodoro':
      return '🍅';
    case 'skill':
      return '💪';
    case 'habit':
      return '✅';
    case 'fitness':
      return '🏋️';
    default:
      return '⭐';
  }
}

/**
 * Get progress label for tracker type
 */
export function getProgressLabel(trackerType: TrackerType): string {
  switch (trackerType) {
    case 'reading':
      return 'Pages';
    case 'pomodoro':
      return 'Minutes';
    case 'skill':
      return 'Sessions';
    case 'habit':
      return 'Days';
    case 'fitness':
      return 'Reps';
    default:
      return 'Progress';
  }
}

/**
 * Get item label for tracker type
 */
export function getItemLabel(trackerType: TrackerType): string {
  switch (trackerType) {
    case 'reading':
      return 'Books';
    case 'pomodoro':
      return 'Tasks';
    case 'skill':
      return 'Skills';
    case 'habit':
      return 'Habits';
    case 'fitness':
      return 'Workouts';
    default:
      return 'Items';
  }
}

/**
 * Get level name from level number
 */
export function getLevelName(level: number): string {
  const levels = [
    { min: 0, max: 99, name: 'Novice' },
    { min: 100, max: 299, name: 'Beginner' },
    { min: 300, max: 699, name: 'Intermediate' },
    { min: 700, max: 1499, name: 'Advanced' },
    { min: 1500, max: 2999, name: 'Expert' },
    { min: 3000, max: 5999, name: 'Master' },
    { min: 6000, max: Infinity, name: 'Grand Master' },
  ];

  const levelData = levels.find((l) => level >= l.min && level <= l.max);
  return levelData?.name || 'Novice';
}
