import { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import * as Location from 'expo-location';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { getThreats, Threat } from '@/services/api';
import { saveMapRegion, filterThreatsInBounds } from '@/services/storage/offline-maps';

export default function MapScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [threats, setThreats] = useState<Threat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentRegion, setCurrentRegion] = useState<Region | null>(null);
  const router = useRouter();


  // Load initial data
  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setError('Location permission denied');
          setLoading(false);
          return;
        }
        const loc = await Location.getCurrentPositionAsync({});
        setLocation(loc);
        const fetched = await getThreats();
        setThreats(fetched);
      } catch (e) {
        console.error(e);
        setError('Failed to load map data');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const getMarkerColor = (level: string): string => {
    switch (level.toLowerCase()) {
      case 'high':
        return '#FF0000';
      case 'medium':
        return '#FFA500';
      case 'low':
        return '#FFFF00';
      case 'safe':
        return '#00FF00';
      default:
        return '#808080';
    }
  };

  const getTimeAgo = (timestamp?: string) => {
    if (!timestamp) return '';
    const now = new Date();
    const t = new Date(timestamp);
    const diff = Math.floor((now.getTime() - t.getTime()) / 60000);
    if (diff < 60) return `${diff} mins ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)} hours ago`;
    return `${Math.floor(diff / 1440)} days ago`;
  };

  const handleMarkerPress = (threat: Threat) => {
    router.push({ pathname: '/explore', params: { threat: JSON.stringify(threat) } });
  };

  const downloadCurrentArea = async () => {
    if (!currentRegion) {
      Alert.alert('Error', 'Unable to determine current map region');
      return;
    }
    const bounds = {
      north: currentRegion.latitude + currentRegion.latitudeDelta / 2,
      south: currentRegion.latitude - currentRegion.latitudeDelta / 2,
      east: currentRegion.longitude + currentRegion.longitudeDelta / 2,
      west: currentRegion.longitude - currentRegion.longitudeDelta / 2,
    };
    const threatsInBounds = filterThreatsInBounds(threats, bounds);
    Alert.alert(
      'Download Map Area',
      `This will save ${threatsInBounds.length} threats for offline use.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Download',
          onPress: async () => {
            try {
              const regionName = `Region ${new Date().toLocaleDateString()}`;
              await saveMapRegion({
                id: Date.now().toString(),
                name: regionName,
                bounds,
                center: { latitude: currentRegion.latitude, longitude: currentRegion.longitude },
                threats: threatsInBounds,
                downloadedAt: new Date().toISOString(),
              });
              Alert.alert('Success', `${threatsInBounds.length} threats saved offline.`);
              // Navigate to Offline Maps tab to see refreshed list
              router.push('/offline-maps');
            } catch (e) {
              Alert.alert('Error', 'Failed to download map area');
            }
          },
        },
      ]
    );
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
        onRegionChangeComplete={setCurrentRegion}
        showsUserLocation
        showsMyLocationButton>
        {threats.map((threat) => (
          <Marker
            key={threat.id}
            coordinate={{ latitude: threat.lat, longitude: threat.lng }}
            pinColor={getMarkerColor(threat.threatLevel)}
            title={threat.type}
            description={`Level: ${threat.threatLevel} • ${getTimeAgo(threat.timestamp)}`}
            onCalloutPress={() => handleMarkerPress(threat)}
          />
        ))}
      </MapView>

      {/* Legend */}
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

      {/* Download button centered */}
      <TouchableOpacity style={styles.downloadButton} onPress={downloadCurrentArea}>
        <ThemedText style={styles.downloadButtonText}>📥 Download Area</ThemedText>
      </TouchableOpacity>
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
    backgroundColor: '#1E1E1E',
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
    color: '#FFFFFF',
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
    color: '#E0E0E0',
    fontWeight: '500',
  },
  downloadButton: {
    position: 'absolute',
    top: 40,
    left: '50%',
    marginLeft: -100,
    width: 200,
    alignItems: 'center',
    backgroundColor: '#4285F4',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 10,
  },

  downloadButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
