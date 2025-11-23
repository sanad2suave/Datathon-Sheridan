import { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { getThreats, Threat } from '@/services/api';

export default function MapScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [threats, setThreats] = useState<Threat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        // Request location permissions
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setError('Location permission denied');
          setLoading(false);
          return;
        }

        // Get current location
        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);

        // Fetch threats from backend
        const fetchedThreats = await getThreats();
        setThreats(fetchedThreats);
      } catch (err) {
        console.error('Error loading map data:', err);
        setError('Failed to load map data');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const getMarkerColor = (threatLevel: string): string => {
    switch (threatLevel.toLowerCase()) {
      case 'high':
        return '#FF0000'; // Red
      case 'medium':
        return '#FFA500'; // Orange
      case 'low':
        return '#FFFF00'; // Yellow
      case 'safe':
        return '#00FF00'; // Green
      default:
        return '#808080'; // Gray
    }
  };

  const getTimeAgo = (timestamp?: string) => {
    if (!timestamp) return '';
    const now = new Date();
    const threatTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - threatTime.getTime()) / 60000);

    if (diffInMinutes < 60) {
      return `${diffInMinutes} mins ago`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} hours ago`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `${days} days ago`;
    }
  };

  const handleMarkerPress = (threat: Threat) => {
    router.push({
      pathname: '/explore',
      params: { threat: JSON.stringify(threat) }
    });
  };

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <ActivityIndicator size="large" color="#4285F4" />
        <ThemedText style={styles.loadingText}>Loading map...</ThemedText>
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={styles.errorText}>⚠️ {error}</ThemedText>
      </ThemedView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: location?.coords.latitude || 31.5,
          longitude: location?.coords.longitude || 34.5,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        showsUserLocation
        showsMyLocationButton>

        {threats.map((threat) => (
          <Marker
            key={threat.id}
            coordinate={{
              latitude: threat.lat,
              longitude: threat.lng,
            }}
            pinColor={getMarkerColor(threat.threatLevel)}
            title={threat.type}
            description={`Level: ${threat.threatLevel} • ${getTimeAgo(threat.timestamp)}`}
            onCalloutPress={() => handleMarkerPress(threat)}
          />
        ))}
      </MapView>

      <View style={styles.legend}>
        <ThemedView style={styles.legendContainer}>
          <ThemedText style={styles.legendTitle}>🗺️ Threat Levels</ThemedText>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#FF0000' }]} />
            <ThemedText style={styles.legendText}>High</ThemedText>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#FFA500' }]} />
            <ThemedText style={styles.legendText}>Medium</ThemedText>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#FFFF00' }]} />
            <ThemedText style={styles.legendText}>Low</ThemedText>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#00FF00' }]} />
            <ThemedText style={styles.legendText}>Safe</ThemedText>
          </View>
        </ThemedView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  errorText: {
    fontSize: 16,
    color: '#FF0000',
    textAlign: 'center',
    padding: 20,
  },
  legend: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  legendContainer: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#1E1E1E', // Darker background for contrast
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#333',
  },
  legendTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#FFFFFF', // White text
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  legendText: {
    fontSize: 12,
    color: '#E0E0E0', // Light gray text
    fontWeight: '500',
  },
});
