import { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { getMapRegion, OfflineMapRegion } from '@/services/storage/offline-maps';
import { Threat } from '@/services/api';

export default function OfflineMapViewer() {
    const { regionId } = useLocalSearchParams();
    const [region, setRegion] = useState<OfflineMapRegion | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const loadRegion = async () => {
            if (regionId) {
                const data = await getMapRegion(regionId as string);
                setRegion(data);
                setLoading(false);
            }
        };
        loadRegion();
    }, [regionId]);

    const getMarkerColor = (threatLevel: string): string => {
        switch (threatLevel.toLowerCase()) {
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

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <ThemedView style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#4285F4" />
                    <ThemedText style={styles.loadingText}>Loading map...</ThemedText>
                </ThemedView>
            </SafeAreaView>
        );
    }

    if (!region) {
        return (
            <SafeAreaView style={styles.container}>
                <ThemedView style={styles.errorContainer}>
                    <ThemedText style={styles.errorText}>Map region not found</ThemedText>
                    <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                        <ThemedText style={styles.backButtonText}>Go Back</ThemedText>
                    </TouchableOpacity>
                </ThemedView>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <ThemedText style={styles.backButtonText}>← Back</ThemedText>
                </TouchableOpacity>
                <ThemedText style={styles.headerTitle}>{region.name}</ThemedText>
                <ThemedText style={styles.headerSubtitle}>
                    📡 Offline Mode • {region.threats.length} threats
                </ThemedText>
            </View>

            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: region.center.latitude,
                    longitude: region.center.longitude,
                    latitudeDelta: Math.abs(region.bounds.north - region.bounds.south) * 1.2,
                    longitudeDelta: Math.abs(region.bounds.east - region.bounds.west) * 1.2,
                }}>
                {region.threats.map((threat) => (
                    <Marker
                        key={threat.id}
                        coordinate={{ latitude: threat.lat, longitude: threat.lng }}
                        pinColor={getMarkerColor(threat.threatLevel)}
                        title={threat.type}
                        description={`Level: ${threat.threatLevel} • ${getTimeAgo(threat.timestamp)}`}
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
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { padding: 16, backgroundColor: '#1E1E1E' },
    headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 4 },
    headerSubtitle: { fontSize: 14, color: '#E0E0E0' },
    backButton: { marginBottom: 8 },
    backButtonText: { fontSize: 16, color: '#4285F4', fontWeight: '600' },
    map: { flex: 1 },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    loadingText: { marginTop: 16, fontSize: 16 },
    errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    errorText: { fontSize: 18, marginBottom: 20, textAlign: 'center' },
    legend: { position: 'absolute', bottom: 20, right: 20 },
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
    legendTitle: { fontSize: 14, fontWeight: 'bold', marginBottom: 12, color: '#FFFFFF' },
    legendItem: { flexDirection: 'row', alignItems: 'center', marginVertical: 4 },
    legendDot: { width: 12, height: 12, borderRadius: 6, marginRight: 8, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
    legendText: { fontSize: 12, color: '#FFFFFF', fontWeight: '500' },
});
