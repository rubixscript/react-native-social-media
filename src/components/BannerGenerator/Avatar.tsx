import React from 'react';
import { View, StyleSheet } from 'react-native';

export const Avatar: React.FC = () => {
  return (
    <View style={styles.avatarContainer}>
      <View style={styles.avatarBackground}>
        <View style={styles.headContainer}>
          {/* Hair */}
          <View style={[styles.hair, { backgroundColor: '#2f1b0d' }]} />

          {/* Face */}
          <View style={[styles.face, { backgroundColor: '#eab38f' }]}>
            {/* Eyes */}
            <View style={styles.eyesContainer}>
              <View style={[styles.eye, { backgroundColor: '#1f1f1f' }]} />
              <View style={[styles.eye, { backgroundColor: '#1f1f1f' }]} />
            </View>

            {/* Nose */}
            <View style={styles.nose} />

            {/* Mouth */}
            <View style={[styles.mouth, { backgroundColor: '#d73e3e' }]} />
          </View>

          {/* Shirt */}
          <View style={[styles.shirt, { backgroundColor: '#8665c2' }]}>
            <View style={styles.collar} />
            <View style={styles.buttons}>
              <View style={[styles.button, { backgroundColor: '#5a487b' }]} />
              <View style={[styles.button, { backgroundColor: '#5a487b' }]} />
              <View style={[styles.button, { backgroundColor: '#5a487b' }]} />
            </View>
          </View>
        </View>
      </View>
    </View>
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
});
