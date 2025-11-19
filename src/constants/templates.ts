import { BannerTemplate } from '../types';

export const DEFAULT_BANNER_TEMPLATES: BannerTemplate[] = [
  {
    id: 'midnight_aurora',
    name: 'Aurora',
    colors: ['#0F2027', '#203A43', '#2C5364'],
    accentColors: ['#00d4ff', '#ffffff', '#7b68ee'],
    overlayColor: 'rgba(0,212,255,0.1)',
    style: 'aurora'
  },
  {
    id: 'sunset_vibes',
    name: 'Sunset',
    colors: ['#FF6B35', '#F7931E', '#FFE066'],
    accentColors: ['#ffffff', '#fff8dc', '#ffe4b5'],
    overlayColor: 'rgba(255,255,255,0.15)',
    style: 'sunset'
  },
  {
    id: 'dreamy_pink',
    name: 'Dreamy',
    colors: ['#667eea', '#764ba2', '#f093fb'],
    accentColors: ['#ffffff', '#f8f8ff', '#e6e6fa'],
    overlayColor: 'rgba(255,255,255,0.12)',
    style: 'dreamy'
  },
  {
    id: 'forest_mystique',
    name: 'Mystique',
    colors: ['#134E5E', '#71B280', '#A8E6CF'],
    accentColors: ['#ffffff', '#f0fff0', '#e0ffe0'],
    overlayColor: 'rgba(255,255,255,0.15)',
    style: 'mystique'
  },
  {
    id: 'royal_purple',
    name: 'Royal',
    colors: ['#2D1B69', '#11998e', '#38ef7d'],
    accentColors: ['#ffffff', '#f5f5f5', '#e6e6fa'],
    overlayColor: 'rgba(255,255,255,0.12)',
    style: 'royal'
  },
  {
    id: 'cosmic_nebula',
    name: 'Nebula',
    colors: ['#0c0c0c', '#301934', '#c31432'],
    accentColors: ['#ffffff', '#ffb6c1', '#ffc0cb'],
    overlayColor: 'rgba(255,182,193,0.1)',
    style: 'nebula'
  },
  {
    id: 'golden_luxury',
    name: 'Luxury',
    colors: ['#D4AF37', '#FFD700', '#FFA500'],
    accentColors: ['#000000', '#2f2f2f', '#4a4a4a'],
    overlayColor: 'rgba(0,0,0,0.1)',
    style: 'luxury'
  },
  {
    id: 'ocean_depths',
    name: 'Ocean',
    colors: ['#1e3c72', '#2a5298', '#00d4ff'],
    accentColors: ['#ffffff', '#f0f8ff', '#e6f3ff'],
    overlayColor: 'rgba(255,255,255,0.15)',
    style: 'ocean'
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