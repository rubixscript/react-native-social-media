import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { UserProfile } from '../../types';

interface AvatarProps {
  profile?: UserProfile;
}

export const Avatar: React.FC<AvatarProps> = ({ profile }) => {
  // If profile has an avatar image URL, use it
  if (profile?.avatar) {
    return (
      <View style={styles.avatarContainer}>
        <Image source={{ uri: profile.avatar }} style={styles.avatarImage} />
      </View>
    );
  }

  // Otherwise, use procedural SVG-style avatar with gender selection
  const gender = (profile as any)?.gender || 'guy';

  return (
    <View style={styles.avatarContainer}>
      <View style={styles.avatarBackground}>
        <View style={styles.avatarBody}>
          {/* SVG-style Guy Avatar */}
          {gender === 'guy' && <GuyAvatar />}

          {/* SVG-style Girl Avatar */}
          {gender === 'girl' && <GirlAvatar />}
        </View>
      </View>
    </View>
  );
};

// Guy Avatar Component
const GuyAvatar: React.FC = () => {
  return (
    <>
      {/* Background circle */}
      <View style={[styles.avatarBg, { backgroundColor: '#e8f4f8' }]} />

      {/* Body */}
      <View style={[styles.body, { backgroundColor: '#6366f1' }]}>
        <View style={styles.neck} />
      </View>

      {/* Head */}
      <View style={[styles.head, { backgroundColor: '#fcd5b8' }]}>
        {/* Hair */}
        <View style={styles.guyHairContainer}>
          <View style={[styles.guyHairMain, { backgroundColor: '#2d1b0e' }]} />
          <View style={[styles.guyHairSideLeft, { backgroundColor: '#2d1b0e' }]} />
          <View style={[styles.guyHairSideRight, { backgroundColor: '#2d1b0e' }]} />
        </View>

        {/* Face features */}
        <View style={styles.faceFeatures}>
          {/* Eyebrows */}
          <View style={[styles.eyebrow, styles.eyebrowLeft]} />
          <View style={[styles.eyebrow, styles.eyebrowRight]} />

          {/* Eyes */}
          <View style={[styles.eye, styles.eyeLeft]}>
            <View style={styles.pupil} />
          </View>
          <View style={[styles.eye, styles.eyeRight]}>
            <View style={styles.pupil} />
          </View>

          {/* Nose */}
          <View style={styles.nose} />

          {/* Mouth - slight smile */}
          <View style={[styles.mouth, styles.guyMouth]} />
        </View>

        {/* Ears */}
        <View style={[styles.ear, styles.earLeft, { backgroundColor: '#fcd5b8' }]} />
        <View style={[styles.ear, styles.earRight, { backgroundColor: '#fcd5b8' }]} />
      </View>
    </>
  );
};

// Girl Avatar Component
const GirlAvatar: React.FC = () => {
  return (
    <>
      {/* Background circle */}
      <View style={[styles.avatarBg, { backgroundColor: '#fef3c7' }]} />

      {/* Body */}
      <View style={[styles.body, { backgroundColor: '#ec4899' }]}>
        <View style={styles.neck} />
        {/* Hair strands on body */}
        <View style={[styles.hairStrandBodyLeft, { backgroundColor: '#4a3728' }]} />
        <View style={[styles.hairStrandBodyRight, { backgroundColor: '#4a3728' }]} />
      </View>

      {/* Head */}
      <View style={[styles.head, { backgroundColor: '#fcd5b8' }]}>
        {/* Hair */}
        <View style={styles.girlHairContainer}>
          {/* Main hair */}
          <View style={[styles.girlHairMain, { backgroundColor: '#4a3728' }]} />
          {/* Bangs */}
          <View style={[styles.girlBangs, { backgroundColor: '#4a3728' }]} />
          {/* Side hair */}
          <View style={[styles.girlHairSideLeft, { backgroundColor: '#4a3728' }]} />
          <View style={[styles.girlHairSideRight, { backgroundColor: '#4a3728' }]} />
          {/* Hair bun/ponytail */}
          <View style={[styles.girlHairBun, { backgroundColor: '#4a3728' }]} />
        </View>

        {/* Face features */}
        <View style={styles.faceFeatures}>
          {/* Eyelashes */}
          <View style={[styles.eyelash, styles.eyelashLeft]} />
          <View style={[styles.eyelash, styles.eyelashRight]} />

          {/* Eyes - slightly larger */}
          <View style={[styles.eye, styles.eyeLeft, styles.girlEye]}>
            <View style={styles.pupil} />
            <View style={styles.eyeShine} />
          </View>
          <View style={[styles.eye, styles.eyeRight, styles.girlEye]}>
            <View style={styles.pupil} />
            <View style={styles.eyeShine} />
          </View>

          {/* Blush */}
          <View style={[styles.blush, styles.blushLeft]} />
          <View style={[styles.blush, styles.blushRight]} />

          {/* Small nose */}
          <View style={[styles.nose, styles.girlNose]} />

          {/* Mouth - with lips */}
          <View style={[styles.mouth, styles.girlMouth]}>
            <View style={styles.lips} />
          </View>
        </View>

        {/* Ears */}
        <View style={[styles.ear, styles.earLeft, { backgroundColor: '#fcd5b8' }]} />
        <View style={[styles.ear, styles.earRight, { backgroundColor: '#fcd5b8' }]} />

        {/* Earring */}
        <View style={[styles.earring, styles.earringLeft]} />
        <View style={[styles.earring, styles.earringRight]} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: 'rgba(176, 210, 229, 0.3)',
    marginBottom: 5,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 55,
  },
  avatarBackground: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(176, 210, 229, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  headContainer: {
    width: 90,
    height: 90,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hair: {
    position: 'absolute',
    top: 5,
    width: 65,
    height: 45,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  girlHair: {
    height: 55,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  hairSide: {
    position: 'absolute',
    top: 15,
    width: 12,
    height: 70,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 15,
    left: 10,
  },
  face: {
    width: 55,
    height: 55,
    borderRadius: 27,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  eyesContainer: {
    flexDirection: 'row',
    gap: 15,
    marginTop: -5,
    marginBottom: 8,
  },
  eye: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
  },
  nose: {
    width: 3,
    height: 3,
    backgroundColor: '#d4a574',
    borderRadius: 1.5,
    marginBottom: 8,
  },
  mouth: {
    width: 20,
    height: 8,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  shirt: {
    position: 'absolute',
    bottom: -10,
    width: 70,
    height: 40,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  collar: {
    position: 'absolute',
    top: 0,
    left: '50%',
    marginLeft: -10,
    width: 20,
    height: 8,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  buttons: {
    position: 'absolute',
    top: 12,
    left: '50%',
    marginLeft: -2,
    alignItems: 'center',
    gap: 4,
  },
  button: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  necklace: {
    position: 'absolute',
    top: 8,
    left: '50%',
    marginLeft: -15,
    width: 30,
    height: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pendant: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
