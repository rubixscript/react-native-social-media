import { BannerTemplate } from '../types';

// Modern Minimal Dark Templates - 3 unique aesthetic styles
export const DEFAULT_BANNER_TEMPLATES: BannerTemplate[] = [
  // 1. Midnight - Pure black with subtle purple accent glow
  {
    id: 'midnight',
    name: 'Midnight',
    colors: ['#050505', '#0f0f1a'],
    accentColors: ['#a855f7', '#c084fc', '#ffffff'],
    overlayColor: 'rgba(168, 85, 247, 0.08)',
    style: 'midnight'
  },
  // 2. Obsidian - Deep blue-black with cyan accent
  {
    id: 'obsidian',
    name: 'Obsidian',
    colors: ['#0a0f1a', '#152238', '#1e3a5f'],
    accentColors: ['#22d3ee', '#67e8f9', '#ffffff'],
    overlayColor: 'rgba(34, 211, 238, 0.1)',
    style: 'obsidian'
  },
  // 3. Carbon - Dark charcoal with emerald accent
  {
    id: 'carbon',
    name: 'Carbon',
    colors: ['#0f1419', '#1a1f2e', '#252d3a'],
    accentColors: ['#10b981', '#34d399', '#ffffff'],
    overlayColor: 'rgba(16, 185, 129, 0.08)',
    style: 'carbon'
  },
];

export const SOCIAL_PLATFORMS = {
  facebook: {
    name: 'Facebook',
    icon: 'facebook',
    color: '#1877f2',
    shareUrl: 'https://www.facebook.com/sharer/sharer.php?u={url}',
  },
  instagram: {
    name: 'Instagram',
    icon: 'instagram',
    color: '#e4405f',
    shareUrl: 'https://www.instagram.com/', // Instagram doesn't support direct sharing
  },
  twitter: {
    name: 'Twitter/X',
    icon: 'twitter',
    color: '#1da1f2',
    shareUrl: 'https://twitter.com/intent/tweet?text={text}&url={url}&hashtags={tags}',
  },
  linkedin: {
    name: 'LinkedIn',
    icon: 'linkedin',
    color: '#0077b5',
    shareUrl: 'https://www.linkedin.com/sharing/share-offsite/?url={url}',
  },
  whatsapp: {
    name: 'WhatsApp',
    icon: 'whatsapp',
    color: '#25d366',
    shareUrl: 'https://wa.me/?text={text}%20{url}',
  },
  telegram: {
    name: 'Telegram',
    icon: 'send',
    color: '#0088cc',
    shareUrl: 'https://t.me/share/url?url={url}&text={text}',
  },
  'copy-link': {
    name: 'Copy Link',
    icon: 'link',
    color: '#6c757d',
    shareUrl: '', // Handle specially
  },
  more: {
    name: 'More',
    icon: 'ellipsis-h',
    color: '#6c757d',
    shareUrl: '', // Use native sharing
  },
} as const;

export const READER_LEVELS = [
  { level: 1, name: 'Novice', minPoints: 0, maxPoints: 99 },
  { level: 2, name: 'Beginner', minPoints: 100, maxPoints: 299 },
  { level: 3, name: 'Intermediate', minPoints: 300, maxPoints: 699 },
  { level: 4, name: 'Advanced', minPoints: 700, maxPoints: 1499 },
  { level: 5, name: 'Expert', minPoints: 1500, maxPoints: 2999 },
  { level: 6, name: 'Master', minPoints: 3000, maxPoints: 5999 },
  { level: 7, name: 'Grand Master', minPoints: 6000, maxPoints: Infinity },
];

export const DEFAULT_SHARE_MESSAGES = {
  bookCompletion: [
    "Just finished reading '{title}' by {author}! 📚",
    "Another great book completed: '{title}' 🎉",
    "Highly recommend '{title}' by {author}. Must read! ⭐",
  ],
  readingProgress: [
    "Making great progress on '{title}' - {percentage}% complete! 📖",
    "Currently enjoying '{title}' by {author}. {pagesRead} pages read so far! 💪",
    "On page {currentPage} of '{title}'. Loving this book! ❤️",
  ],
  readingGoal: [
    "Smashed my reading goal this month with {pages} pages read! 🎯",
    "{pages} pages this month! Feeling accomplished with my reading progress 📚",
    "Monthly reading goal achieved: {pages} pages read! Who's next? 📖",
  ],
  readingStreak: [
    "On a {streak}-day reading streak! Consistency is key 🔥",
    "{streak} days of reading in a row! Building better habits one book at a time 💪",
    "Reading streak: {streak} days and counting! 📚✨",
  ],
} as const;