import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { UserProfile, TrackerType } from '../../types';
import { ShareHelpers } from '../../utils/shareHelpers';
import { Avatar } from './Avatar';

interface UserCardProps {
  profile?: UserProfile;
  totalPoints: number;
  trackerType: TrackerType;
}

export const UserCard: React.FC<UserCardProps> = ({
  profile,
  totalPoints,
  trackerType,
}) => {
  return (
    <View style={styles.userCard}>
      <View style={styles.level}>
        <Text style={styles.levelText}>
          Level {profile ? ShareHelpers.getLevelName(profile.level, trackerType) : 'Novice'}
        </Text>
      </View>

      <View style={styles.points}>
        <Text style={styles.pointsText}>
          {totalPoints.toLocaleString()} Points
        </Text>
      </View>

      <Avatar profile={profile} />
    </View>
  );
};

const styles = StyleSheet.create({
  userCard: {
    alignItems: 'center',
    marginBottom: 20,
  },
  level: {
    backgroundColor: 'rgba(100, 200, 255, 0.2)',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(100, 200, 255, 0.4)',
  },
  levelText: {
    color: '#64c8ff',
    fontSize: 14,
    fontWeight: '700',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  points: {
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.4)',
  },
  pointsText: {
    color: '#ffd700',
    fontSize: 14,
    fontWeight: '700',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
