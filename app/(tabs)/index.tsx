import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#1E3A5F', dark: '#0F1F2E' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">CIVshield App</ThemedText>
        <HelloWave />
      </ThemedView>
      
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">🛡️ Your Security Companion</ThemedText>
        <ThemedText>
          Welcome to <ThemedText type="defaultSemiBold">CIVshield</ThemedText>, your trusted mobile application for 
          security and protection. Stay connected and stay safe.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">🔐 Key Features</ThemedText>
        <ThemedText>
          • Real-time security monitoring{'\n'}
          • Emergency response tools{'\n'}
          • Community safety network{'\n'}
          • Quick access to help resources
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">📱 Getting Started</ThemedText>
        <ThemedText>
          Explore the app using the tabs below. Navigate through different sections 
          to discover all the features CIVshield has to offer.
        </ThemedText>
        <Link href="/modal">
          <Link.Trigger>
            <ThemedText type="subtitle" style={styles.linkText}>Open Settings</ThemedText>
          </Link.Trigger>
          <Link.Preview />
          <Link.Menu>
            <Link.MenuAction title="Settings" icon="cube" onPress={() => alert('Settings opened')} />
            <Link.MenuAction
              title="Share App"
              icon="square.and.arrow.up"
              onPress={() => alert('Share pressed')}
            />
          </Link.Menu>
        </Link>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">⚡ Quick Actions</ThemedText>
        <ThemedText>
          Access important features quickly from the Explore tab. Stay informed and 
          connected with your community.
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
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  linkText: {
    marginTop: 8,
  },
});
