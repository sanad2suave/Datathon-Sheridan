import { StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function MapScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#1E3A5F', dark: '#0F1F2E' }}
      headerImage={
        <IconSymbol
          size={200}
          color="#4A90E2"
          name="map.fill"
          style={styles.headerIcon}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">🗺️ Danger Zone Map</ThemedText>
      </ThemedView>
      
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Real-time Risk Dashboard</ThemedText>
        <ThemedText>
          View danger zones, safe areas, and real-time threat information on an interactive map.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">📍 Map Features</ThemedText>
        <ThemedText>
          • Display danger zones in real-time{'\n'}
          • Show safe zones and shelters{'\n'}
          • Location-based safety information{'\n'}
          • Interactive Google Maps integration
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.mapPlaceholder}>
        <ThemedText style={styles.placeholderText}>
          🗺️ Map will be displayed here
        </ThemedText>
        <ThemedText style={styles.placeholderSubtext}>
          Google Maps integration coming soon
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 24,
  },
  headerIcon: {
    bottom: -50,
    left: -50,
    position: 'absolute',
    opacity: 0.3,
  },
  mapPlaceholder: {
    height: 300,
    borderRadius: 12,
    backgroundColor: '#E8F4F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    borderWidth: 2,
    borderColor: '#4A90E2',
    borderStyle: 'dashed',
  },
  placeholderText: {
    fontSize: 24,
    marginBottom: 8,
  },
  placeholderSubtext: {
    fontSize: 14,
    opacity: 0.7,
  },
});
