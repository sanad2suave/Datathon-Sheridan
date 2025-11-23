import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { getMapRegions, deleteMapRegion, OfflineMapRegion } from '@/services/storage/offline-maps';

export default function OfflineMapsScreen() {
    const [regions, setRegions] = useState<OfflineMapRegion[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const loadRegions = async () => {
        setLoading(true);
        const savedRegions = await getMapRegions();
        setRegions(savedRegions);
        setLoading(false);
    };

    useEffect(() => {
        loadRegions();
    }, []);

    // Refresh when screen gains focus (e.g., after downloading a map)
    useFocusEffect(
        React.useCallback(() => {
            loadRegions();
        }, [])
    );
    const handleDelete = (id: string, name: string) => {
        Alert.alert(
            'Delete Map',
            `Are you sure you want to delete "${name}"?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        await deleteMapRegion(id);
                        loadRegions();
                    },
                },
            ]
        );
    };

    const handleViewMap = (region: OfflineMapRegion) => {
        router.push({
            pathname: '/../offline-map-viewer' as any,
            params: { regionId: region.id },
        });
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    };

    const renderItem = ({ item }: { item: OfflineMapRegion }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => handleViewMap(item)}
            onLongPress={() => handleDelete(item.id, item.name)}>
            <View style={styles.cardContent}>
                <ThemedText style={styles.cardTitle}>{item.name}</ThemedText>
                <ThemedText style={styles.cardSubtitle}>
                    {item.threats.length} threats • Downloaded {formatDate(item.downloadedAt)}
                </ThemedText>
            </View>
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(item.id, item.name)}>
                <ThemedText style={styles.deleteButtonText}>🗑️</ThemedText>
            </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ThemedView style={styles.header}>
                <ThemedText style={styles.headerTitle}>📥 Downloaded Maps</ThemedText>
                <ThemedText style={styles.headerSubtitle}>
                    {regions.length} {regions.length === 1 ? 'region' : 'regions'} saved
                </ThemedText>
            </ThemedView>

            {loading ? (
                <ThemedView style={styles.emptyContainer}>
                    <ThemedText style={styles.emptyText}>Loading...</ThemedText>
                </ThemedView>
            ) : regions.length === 0 ? (
                <ThemedView style={styles.emptyContainer}>
                    <ThemedText style={styles.emptyIcon}>🗺️</ThemedText>
                    <ThemedText style={styles.emptyText}>No downloaded maps</ThemedText>
                    <ThemedText style={styles.emptySubtext}>
                        Go to the Map tab and tap "Download Area" to save a region for offline use
                    </ThemedText>
                </ThemedView>
            ) : (
                <FlatList
                    data={regions}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContent}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: 20,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#FFFFFF', // white text
    },
    headerSubtitle: {
        fontSize: 14,
        opacity: 0.8,
        color: '#ddddddc6', // gray
    },
    listContent: {
        padding: 16,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardContent: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 4,
        color: '#000000', // darker
    },
    cardSubtitle: {
        fontSize: 14,
        opacity: 0.8,
        color: '#222222', // darker
    },
    deleteButton: {
        padding: 8,
    },
    deleteButtonText: {
        fontSize: 20,
        color: '#000000', // darker
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
    },
    emptyIcon: {
        fontSize: 64,
        marginBottom: 16,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
        textAlign: 'center',
        color: '#ffffffff', // white
    },
    emptySubtext: {
        fontSize: 14,
        opacity: 0.8,
        textAlign: 'center',
        maxWidth: 280,
        color: '#ddddddc6', // grey
    },
});
