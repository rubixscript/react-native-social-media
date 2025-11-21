import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GraphData } from '../../types';

interface ActivityGraphProps {
  graphData: GraphData;
}

export const ActivityGraph: React.FC<ActivityGraphProps> = ({ graphData }) => {
  return (
    <View style={styles.graphSection}>
      <View style={styles.graphContainer}>
        <View style={styles.graphGrid}>
          {Array.from({ length: 5 }, (_, rowIndex) => (
            <View key={rowIndex} style={styles.graphRow}>
              {Array.from({ length: 6 }, (_, colIndex) => {
                const dayIndex = rowIndex * 6 + colIndex;
                const day = graphData.days[dayIndex];

                if (!day) return <View key={colIndex} style={styles.graphDayEmpty} />;

                return (
                  <View
                    key={colIndex}
                    style={[
                      styles.graphDay,
                      {
                        backgroundColor:
                          day.intensity === 0
                            ? 'rgba(255,255,255,0.1)'
                            : day.intensity === 1
                            ? 'rgba(100,200,255,0.3)'
                            : day.intensity === 2
                            ? 'rgba(100,200,255,0.5)'
                            : day.intensity === 3
                            ? 'rgba(100,200,255,0.7)'
                            : 'rgba(100,200,255,0.9)',
                      },
                      day.isToday && styles.graphDayToday,
                    ]}
                  />
                );
              })}
            </View>
          ))}
        </View>

        {/* Graph Legend */}
        <View style={styles.graphLegend}>
          <Text style={styles.graphLegendText}>Less</Text>
          <View style={styles.graphLegendScale}>
            <View style={[styles.graphLegendBox, { backgroundColor: 'rgba(255,255,255,0.1)' }]} />
            <View style={[styles.graphLegendBox, { backgroundColor: 'rgba(100,200,255,0.3)' }]} />
            <View style={[styles.graphLegendBox, { backgroundColor: 'rgba(100,200,255,0.5)' }]} />
            <View style={[styles.graphLegendBox, { backgroundColor: 'rgba(100,200,255,0.7)' }]} />
            <View style={[styles.graphLegendBox, { backgroundColor: 'rgba(100,200,255,0.9)' }]} />
          </View>
          <Text style={styles.graphLegendText}>More</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  graphSection: {
    marginTop: 10,
  },
  graphContainer: {
    marginBottom: 15,
    alignItems: 'center',
  },
  graphGrid: {
    gap: 2,
    marginBottom: 8,
    alignItems: 'center',
  },
  graphRow: {
    flexDirection: 'row',
    gap: 2,
  },
  graphDay: {
    width: 10,
    height: 10,
    borderRadius: 2.5,
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  graphDayEmpty: {
    width: 10,
    height: 10,
    borderRadius: 2.5,
    backgroundColor: 'transparent',
  },
  graphDayToday: {
    borderColor: 'rgba(100,200,255,1)',
    borderWidth: 1.5,
  },
  graphLegend: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  graphLegendText: {
    fontSize: 9,
    color: '#e0e0e0',
    fontWeight: '500',
  },
  graphLegendScale: {
    flexDirection: 'row',
    gap: 2,
  },
  graphLegendBox: {
    width: 12,
    height: 12,
    borderRadius: 2.5,
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.1)',
  },
});
