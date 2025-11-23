import { ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function HelpScreen() {
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor({}, 'background');
  const isDark = colorScheme === 'dark';

  return (
    <ThemedView style={[styles.container, { backgroundColor }]}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}>
        
        {/* Header */}
        <View style={styles.header}>
          <ThemedText style={styles.title}>{'\n'}CIVshield Guidebook</ThemedText>
          <ThemedText style={styles.subtitle}>
            Learn how to use all features of the app
          </ThemedText>
        </View>

        {/* Map Feature Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>Threat Map</ThemedText>
          </View>
          
          <View style={styles.featureCard}>
            <ThemedText style={styles.featureTitle}>What it does:</ThemedText>
            <ThemedText style={styles.featureText}>
              The Threat Map shows real-time danger zones in your area. It displays your current location and nearby threats with color-coded markers.
            </ThemedText>
          </View>

          <View style={styles.featureCard}>
            <ThemedText style={styles.featureTitle}>How to use:</ThemedText>
            <View style={styles.stepList}>
              <View style={styles.stepItem}>
                <ThemedText style={styles.stepNumber}>1</ThemedText>
                <ThemedText style={styles.stepText}>
                  Open the Map tab to view your location and surrounding area
                </ThemedText>
              </View>
              <View style={styles.stepItem}>
                <ThemedText style={styles.stepNumber}>2</ThemedText>
                <ThemedText style={styles.stepText}>
                  Allow location permissions when prompted to see your current position
                </ThemedText>
              </View>
              <View style={styles.stepItem}>
                <ThemedText style={styles.stepNumber}>3</ThemedText>
                <ThemedText style={styles.stepText}>
                  Tap on any threat marker to see details about the threat type and level
                </ThemedText>
              </View>
              <View style={styles.stepItem}>
                <ThemedText style={styles.stepNumber}>4</ThemedText>
                <ThemedText style={styles.stepText}>
                  Use the legend in the bottom-right corner to understand threat levels
                </ThemedText>
              </View>
              <View style={styles.stepItem}>
                <ThemedText style={styles.stepNumber}>5</ThemedText>
                <ThemedText style={styles.stepText}>
                  Tap on a threat marker's callout to get AI-powered safety advice for that specific threat
                </ThemedText>
              </View>
              <View style={styles.stepItem}>
                <ThemedText style={styles.stepNumber}>6</ThemedText>
                <ThemedText style={styles.stepText}>
                  Use the "Download Area" button at the top to save the current map region for offline use
                </ThemedText>
              </View>
            </View>
          </View>

          <View style={styles.featureCard}>
            <ThemedText style={styles.featureTitle}>Threat Level Colors:</ThemedText>
            <View style={styles.colorLegend}>
              <View style={styles.colorItem}>
                <View style={[styles.colorDot, { backgroundColor: '#FF0000' }]} />
                <ThemedText style={styles.colorText}>
                  <ThemedText style={styles.colorLabel}>Red</ThemedText> - High threat level
                </ThemedText>
              </View>
              <View style={styles.colorItem}>
                <View style={[styles.colorDot, { backgroundColor: '#FFA500' }]} />
                <ThemedText style={styles.colorText}>
                  <ThemedText style={styles.colorLabel}>Orange</ThemedText> - Medium threat level
                </ThemedText>
              </View>
              <View style={styles.colorItem}>
                <View style={[styles.colorDot, { backgroundColor: '#FFFF00' }]} />
                <ThemedText style={styles.colorText}>
                  <ThemedText style={styles.colorLabel}>Yellow</ThemedText> - Low threat level
                </ThemedText>
              </View>
              <View style={styles.colorItem}>
                <View style={[styles.colorDot, { backgroundColor: '#00FF00' }]} />
                <ThemedText style={styles.colorText}>
                  <ThemedText style={styles.colorLabel}>Green</ThemedText> - Safe area
                </ThemedText>
              </View>
            </View>
          </View>
        </View>

        {/* Safety Assistant Feature Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>Safety Assistant</ThemedText>
          </View>
          
          <View style={styles.featureCard}>
            <ThemedText style={styles.featureTitle}>What it does:</ThemedText>
            <ThemedText style={styles.featureText}>
              The Safety Assistant is an AI-powered chat that provides personalized safety advice based on your questions or situation descriptions. It uses Google Gemini AI to give you step-by-step safety instructions.
            </ThemedText>
          </View>

          <View style={styles.featureCard}>
            <ThemedText style={styles.featureTitle}>How to use:</ThemedText>
            <View style={styles.stepList}>
              <View style={styles.stepItem}>
                <ThemedText style={styles.stepNumber}>1</ThemedText>
                <ThemedText style={styles.stepText}>
                  Open the "Gemini AI" tab to access the Safety Assistant
                </ThemedText>
              </View>
              <View style={styles.stepItem}>
                <ThemedText style={styles.stepNumber}>2</ThemedText>
                <ThemedText style={styles.stepText}>
                  Type your safety question or describe a threat situation in the input field at the bottom
                </ThemedText>
              </View>
              <View style={styles.stepItem}>
                <ThemedText style={styles.stepNumber}>3</ThemedText>
                <ThemedText style={styles.stepText}>
                  Tap the send button (→) to get AI-powered safety advice
                </ThemedText>
              </View>
              <View style={styles.stepItem}>
                <ThemedText style={styles.stepNumber}>4</ThemedText>
                <ThemedText style={styles.stepText}>
                  Continue the conversation by asking follow-up questions
                </ThemedText>
              </View>
              <View style={styles.stepItem}>
                <ThemedText style={styles.stepNumber}>5</ThemedText>
                <ThemedText style={styles.stepText}>
                  Tap "+ New Chat" to start a fresh conversation anytime
                </ThemedText>
              </View>
              <View style={styles.stepItem}>
                <ThemedText style={styles.stepNumber}>6</ThemedText>
                <ThemedText style={styles.stepText}>
                  When viewing a threat on the map, tap its callout to automatically attach threat context to your question
                </ThemedText>
              </View>
            </View>
          </View>

          <View style={styles.featureCard}>
            <ThemedText style={styles.featureTitle}>Example questions:</ThemedText>
            <View style={styles.exampleList}>
              <ThemedText style={styles.exampleItem}>
                • "What should I do if I hear explosions nearby?"
              </ThemedText>
              <ThemedText style={styles.exampleItem}>
                • "How do I stay safe during an airstrike?"
              </ThemedText>
              <ThemedText style={styles.exampleItem}>
                • "I see gunfire in my area, what are the safety steps?"
              </ThemedText>
              <ThemedText style={styles.exampleItem}>
                • "There's a roadblock ahead, what should I do?"
              </ThemedText>
              <ThemedText style={styles.exampleItem}>
                • "How can I find a safe shelter?"
              </ThemedText>
            </View>
          </View>
        </View>

        {/* Offline Maps Feature Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>Offline Maps</ThemedText>
          </View>
          
          <View style={styles.featureCard}>
            <ThemedText style={styles.featureTitle}>What it does:</ThemedText>
            <ThemedText style={styles.featureText}>
              The Offline Maps feature allows you to download and save map regions with threat data for use when you don't have internet connectivity. This is essential for areas with unreliable network coverage or when you need to conserve data.
            </ThemedText>
          </View>

          <View style={styles.featureCard}>
            <ThemedText style={styles.featureTitle}>How to download a map:</ThemedText>
            <View style={styles.stepList}>
              <View style={styles.stepItem}>
                <ThemedText style={styles.stepNumber}>1</ThemedText>
                <ThemedText style={styles.stepText}>
                  Go to the Map tab and navigate to the area you want to save
                </ThemedText>
              </View>
              <View style={styles.stepItem}>
                <ThemedText style={styles.stepNumber}>2</ThemedText>
                <ThemedText style={styles.stepText}>
                  Tap the "Download Area" button at the top center of the map
                </ThemedText>
              </View>
              <View style={styles.stepItem}>
                <ThemedText style={styles.stepNumber}>3</ThemedText>
                <ThemedText style={styles.stepText}>
                  Confirm the download - the app will save all threats visible in the current map view
                </ThemedText>
              </View>
              <View style={styles.stepItem}>
                <ThemedText style={styles.stepNumber}>4</ThemedText>
                <ThemedText style={styles.stepText}>
                  You'll be taken to the Offline Maps tab to see your downloaded region
                </ThemedText>
              </View>
            </View>
          </View>

          <View style={styles.featureCard}>
            <ThemedText style={styles.featureTitle}>How to use offline maps:</ThemedText>
            <View style={styles.stepList}>
              <View style={styles.stepItem}>
                <ThemedText style={styles.stepNumber}>1</ThemedText>
                <ThemedText style={styles.stepText}>
                  Open the "Offline" tab to see all your downloaded map regions
                </ThemedText>
              </View>
              <View style={styles.stepItem}>
                <ThemedText style={styles.stepNumber}>2</ThemedText>
                <ThemedText style={styles.stepText}>
                  Tap on any downloaded region to view it on a map with all saved threats
                </ThemedText>
              </View>
              <View style={styles.stepItem}>
                <ThemedText style={styles.stepNumber}>3</ThemedText>
                <ThemedText style={styles.stepText}>
                  View threat markers and details even without internet connection
                </ThemedText>
              </View>
              <View style={styles.stepItem}>
                <ThemedText style={styles.stepNumber}>4</ThemedText>
                <ThemedText style={styles.stepText}>
                  Long-press a region card or tap the delete button to remove it from your saved maps
                </ThemedText>
              </View>
            </View>
          </View>
        </View>

        {/* Survival Kit Use Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>Survival Kit</ThemedText>
          </View>
          
          <View style={styles.featureCard}>
            <ThemedText style={styles.featureTitle}>What it does:</ThemedText>
            <ThemedText style={styles.featureText}>
              The Survival Kit is a comprehensive offline emergency field manual that provides essential survival instructions and safety guidance. It includes step-by-step procedures for fire-making, shelter building, water purification, first aid, navigation, and more. All content is available offline and works without internet connectivity.
            </ThemedText>
          </View>

          <View style={styles.featureCard}>
            <ThemedText style={styles.featureTitle}>How to use:</ThemedText>
            <View style={styles.stepList}>
              <View style={styles.stepItem}>
                <ThemedText style={styles.stepNumber}>1</ThemedText>
                <ThemedText style={styles.stepText}>
                  Open the "Survival Kit" tab to access the emergency field manual
                </ThemedText>
              </View>
              <View style={styles.stepItem}>
                <ThemedText style={styles.stepNumber}>2</ThemedText>
                <ThemedText style={styles.stepText}>
                  Tap on any section (e.g., "Making Fire", "Building Shelter") to expand and read detailed instructions
                </ThemedText>
              </View>
              <View style={styles.stepItem}>
                <ThemedText style={styles.stepNumber}>3</ThemedText>
                <ThemedText style={styles.stepText}>
                  All information is available offline - no internet connection required
                </ThemedText>
              </View>
              <View style={styles.stepItem}>
                <ThemedText style={styles.stepNumber}>4</ThemedText>
                <ThemedText style={styles.stepText}>
                  Use this guide in emergency situations when you need quick access to survival procedures
                </ThemedText>
              </View>
            </View>
          </View>

          <View style={styles.featureCard}>
            <ThemedText style={styles.featureTitle}>Available sections:</ThemedText>
            <View style={styles.exampleList}>
              <ThemedText style={styles.exampleItem}>
                • Making Fire (friction, flint and steel, battery methods)
              </ThemedText>
              <ThemedText style={styles.exampleItem}>
                • Building Shelter (lean-to, debris hut)
              </ThemedText>
              <ThemedText style={styles.exampleItem}>
                • Water Purification (boiling, SODIS, filtration)
              </ThemedText>
              <ThemedText style={styles.exampleItem}>
                • Food Rationing & Finding Food
              </ThemedText>
              <ThemedText style={styles.exampleItem}>
                • Wound Treatment & First Aid
              </ThemedText>
              <ThemedText style={styles.exampleItem}>
                • Navigation Without Compass
              </ThemedText>
              <ThemedText style={styles.exampleItem}>
                • Signaling for Help
              </ThemedText>
              <ThemedText style={styles.exampleItem}>
                • Cold Weather & Heat Survival
              </ThemedText>
              <ThemedText style={styles.exampleItem}>
                • Essential Survival Priorities (Rule of 3s)
              </ThemedText>
            </View>
          </View>
        </View>

        {/* Tips Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>Tips & Best Practices</ThemedText>
          </View>
          
          <View style={styles.featureCard}>
            <View style={styles.tipList}>
              <View style={styles.tipItem}>
                <ThemedText style={styles.tipBullet}>•</ThemedText>
                <ThemedText style={styles.tipText}>
                  Check the map regularly to stay aware of threats in your area
                </ThemedText>
              </View>
              <View style={styles.tipItem}>
                <ThemedText style={styles.tipBullet}>•</ThemedText>
                <ThemedText style={styles.tipText}>
                  Be specific when asking the Safety Assistant for better advice
                </ThemedText>
              </View>
              <View style={styles.tipItem}>
                <ThemedText style={styles.tipBullet}>•</ThemedText>
                <ThemedText style={styles.tipText}>
                  This guide is available offline - you can access it anytime
                </ThemedText>
              </View>
              <View style={styles.tipItem}>
                <ThemedText style={styles.tipBullet}>•</ThemedText>
                <ThemedText style={styles.tipText}>
                  Keep your location services enabled for accurate threat mapping
                </ThemedText>
              </View>
              <View style={styles.tipItem}>
                <ThemedText style={styles.tipBullet}>•</ThemedText>
                <ThemedText style={styles.tipText}>
                  The Safety Assistant works best with internet connection, but this guide is always available offline
                </ThemedText>
              </View>
              <View style={styles.tipItem}>
                <ThemedText style={styles.tipBullet}>•</ThemedText>
                <ThemedText style={styles.tipText}>
                  Download map areas before traveling to areas with poor connectivity
                </ThemedText>
              </View>
              <View style={styles.tipItem}>
                <ThemedText style={styles.tipBullet}>•</ThemedText>
                <ThemedText style={styles.tipText}>
                  Attach threat context from the map when asking the Safety Assistant for more personalized advice
                </ThemedText>
              </View>
              <View style={styles.tipItem}>
                <ThemedText style={styles.tipBullet}>•</ThemedText>
                <ThemedText style={styles.tipText}>
                  The Survival Kit is always available offline - bookmark it for emergencies
                </ThemedText>
              </View>
              <View style={styles.tipItem}>
                <ThemedText style={styles.tipBullet}>•</ThemedText>
                <ThemedText style={styles.tipText}>
                  Regularly update your downloaded maps to ensure you have the latest threat information
                </ThemedText>
              </View>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <ThemedText style={styles.footerText}>
            Stay safe with CIVshield
          </ThemedText>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    paddingTop: 60,
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
    textAlign: 'center',
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  featureCard: {
    backgroundColor: 'rgba(66, 133, 244, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(66, 133, 244, 0.2)',
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 15,
    lineHeight: 22,
    opacity: 0.9,
  },
  stepList: {
    marginTop: 8,
  },
  stepItem: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#4285F4',
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 28,
    marginRight: 12,
    flexShrink: 0,
  },
  stepText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    opacity: 0.9,
  },
  colorLegend: {
    marginTop: 8,
  },
  colorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  colorDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
  },
  colorText: {
    fontSize: 15,
    lineHeight: 22,
  },
  colorLabel: {
    fontWeight: '600',
  },
  exampleList: {
    marginTop: 8,
  },
  exampleItem: {
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 6,
    opacity: 0.9,
  },
  tipList: {
    marginTop: 8,
  },
  tipItem: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  tipBullet: {
    fontSize: 18,
    marginRight: 12,
    fontWeight: 'bold',
    opacity: 0.7,
  },
  tipText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    opacity: 0.9,
  },
  footer: {
    marginTop: 24,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  footerSubtext: {
    fontSize: 14,
    opacity: 0.6,
    textAlign: 'center',
  },
});

