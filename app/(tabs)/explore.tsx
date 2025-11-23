import { StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function GeminiChatScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#4285F4', dark: '#1A237E' }}
      headerImage={
        <IconSymbol
          size={200}
          color="#4A90E2"
          name="message.fill"
          style={styles.headerIcon}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">🤖 Gemini AI Survivor Chat</ThemedText>
      </ThemedView>
      
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">AI-Powered Safety Assistant</ThemedText>
        <ThemedText>
          Get instant, step-by-step safety instructions for any emergency scenario using Google Gemini AI.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">🚨 Quick Scenario Selection</ThemedText>
        <ThemedText>
          • Airstrike nearby{'\n'}
          • Gunfire heard{'\n'}
          • Roadblock reported{'\n'}
          • Explosion nearby
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">💡 How It Works</ThemedText>
        <ThemedText>
          Select a scenario and receive real-time safety instructions tailored to your situation. 
          The AI assistant provides step-by-step guidance to help you stay safe.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.chatPlaceholder}>
        <ThemedText style={styles.placeholderText}>
          💬 Chat interface will appear here
        </ThemedText>
        <ThemedText style={styles.placeholderSubtext}>
          Backend integration with Gemini API coming soon
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
  chatPlaceholder: {
    height: 300,
    borderRadius: 12,
    backgroundColor: '#E8F4F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    borderWidth: 2,
    borderColor: '#4285F4',
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
