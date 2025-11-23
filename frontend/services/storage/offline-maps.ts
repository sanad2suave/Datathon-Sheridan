import AsyncStorage from '@react-native-async-storage/async-storage';
import { Threat } from '../api';

export interface OfflineMapRegion {
    id: string;
    name: string;
    bounds: {
        north: number;
        south: number;
        east: number;
        west: number;
    };
    center: {
        latitude: number;
        longitude: number;
    };
    threats: Threat[];
    downloadedAt: string;
}

const STORAGE_KEY = '@offline_maps';

export const saveMapRegion = async (region: OfflineMapRegion): Promise<void> => {
    try {
        const existing = await getMapRegions();
        const updated = [...existing.filter(r => r.id !== region.id), region];
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
        console.error('Error saving map region:', error);
        throw error;
    }
};

export const getMapRegions = async (): Promise<OfflineMapRegion[]> => {
    try {
        const data = await AsyncStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Error getting map regions:', error);
        return [];
    }
};

export const getMapRegion = async (id: string): Promise<OfflineMapRegion | null> => {
    try {
        const regions = await getMapRegions();
        return regions.find(r => r.id === id) || null;
    } catch (error) {
        console.error('Error getting map region:', error);
        return null;
    }
};

export const deleteMapRegion = async (id: string): Promise<void> => {
    try {
        const existing = await getMapRegions();
        const updated = existing.filter(r => r.id !== id);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
        console.error('Error deleting map region:', error);
        throw error;
    }
};

export const filterThreatsInBounds = (
    threats: Threat[],
    bounds: OfflineMapRegion['bounds']
): Threat[] => {
    return threats.filter(threat =>
        threat.lat >= bounds.south &&
        threat.lat <= bounds.north &&
        threat.lng >= bounds.west &&
        threat.lng <= bounds.east
    );
};
