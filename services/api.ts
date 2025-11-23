// API Configuration
const API_BASE_URL = 'https://civshield-backend-973526763654.us-central1.run.app'; // Replace with your actual Cloud Run URL

export interface Threat {
    id: number;
    lat: number;
    lng: number;
    threatLevel: string;
    type: string;
    timestamp?: string;
}

export interface AdviceResponse {
    advice: string;
}

export interface Message {
    role: 'user' | 'assistant';
    content: string;
}

/**
 * Fetch all threats from the backend
 */
export async function getThreats(): Promise<Threat[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/threats`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching threats:', error);
        throw error;
    }
}

/**
 * Get safety advice for a message (which may contain a threat or general question)
 */
export async function getAdvice(message: string, history: Message[] = []): Promise<string> {
    try {
        const response = await fetch(`${API_BASE_URL}/advise`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message, history }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: AdviceResponse = await response.json();
        return data.advice;
    } catch (error) {
        console.error('Error getting advice:', error);
        throw error;
    }
}
