import { ScrollView, StyleSheet, View, Text } from 'react-native';

import { Collapsible } from '@/components/ui/collapsible';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function SurvivalKitScreen() {
  const backgroundColor = useThemeColor({}, 'background');
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: isDark ? '#1a1a1a' : '#f5f0e8' }]}
      contentContainerStyle={styles.contentContainer}>
      
      {/* Book Cover Header */}
      <View style={[styles.bookCover, isDark && styles.bookCoverDark]}>
      {/* Removed book spine */}

      {/* Shield icon OR image */}
      <View style={styles.shieldContainer}>
        <Text style={styles.shield}>🛡️</Text>
      </View>

      {/* Title */}
      <View style={styles.headerTextContainer}>
        <Text style={styles.headerTitle}>SURVIVAL</Text>
        <Text style={styles.headerTitle}>KIT</Text>

        <View style={styles.titleUnderline} />

        <Text style={styles.headerSubtitle}>Emergency Field Manual</Text>
        <Text style={styles.headerSubtitle2}>Offline Survival Guide</Text>
      </View>
    </View>

      {/* Book Page Section */}
      <View style={[styles.bookPages, isDark && styles.bookPagesDark]}>

        {/* Making Fire */}
        <Collapsible title="Making Fire">
          <ThemedText style={styles.sectionText}>
            <ThemedText style={styles.bold}>Method 1: Friction Fire{'\n'}</ThemedText>
            1. Find dry wood and create a fire board with a notch{'\n'}
            2. Use a spindle stick to create friction{'\n'}
            3. Rotate the spindle rapidly between your hands{'\n'}
            4. Collect the ember in tinder{'\n'}
            5. Blow gently to ignite{'\n\n'}

            <ThemedText style={styles.bold}>Method 2: Flint and Steel{'\n'}</ThemedText>
            1. Strike flint against steel{'\n'}
            2. Direct sparks onto dry tinder{'\n'}
            3. Blow gently once tinder catches{'\n\n'}

            <ThemedText style={styles.bold}>Method 3: Battery + Steel Wool{'\n'}</ThemedText>
            1. Touch steel wool to battery terminals{'\n'}
            2. Steel wool ignites quickly{'\n'}
            3. Transfer ember to tinder bundle{'\n\n'}

            <ThemedText style={styles.bold}>Fire Safety Tips:{'\n'}</ThemedText>
            • Clear the area of flammable materials{'\n'}
            • Keep water nearby{'\n'}
            • Never leave fire unattended{'\n'}
            • Fully extinguish before leaving
          </ThemedText>
        </Collapsible>

        {/* Building Shelter */}
        <Collapsible title="Building Shelter">
          <ThemedText style={styles.sectionText}>
            <ThemedText style={styles.bold}>Lean-To Shelter{'\n'}</ThemedText>
            1. Find a long branch as ridgepole{'\n'}
            2. Prop one end against a rock/tree{'\n'}
            3. Lean branches at 45°{'\n'}
            4. Cover with leaves + debris{'\n\n'}

            <ThemedText style={styles.bold}>Debris Hut{'\n'}</ThemedText>
            1. Build framework with branches{'\n'}
            2. Cover thick with debris{'\n'}
            3. Make walls 3ft thick{'\n'}
            4. Small entrance keeps heat inside{'\n\n'}

            <ThemedText style={styles.bold}>Shelter Tips:{'\n'}</ThemedText>
            • Avoid low areas (cold sinks){'\n'}
            • Stay away from dead trees{'\n'}
            • Use natural windbreaks
          </ThemedText>
        </Collapsible>

        {/* Water Purification */}
        <Collapsible title="Water Purification">
          <ThemedText style={styles.sectionText}>
            <ThemedText style={styles.bold}>Boiling Method{'\n'}</ThemedText>
            1. Bring to rolling boil 1–3 mins{'\n\n'}

            <ThemedText style={styles.bold}>Solar Disinfection (SODIS){'\n'}</ThemedText>
            1. Fill clear plastic bottle{'\n'}
            2. Leave in sunlight 6 hours{'\n\n'}

            <ThemedText style={styles.bold}>Filtration Method{'\n'}</ThemedText>
            1. Layer sand, charcoal, gravel{'\n'}
            2. Pour water through filter{'\n\n'}

            <ThemedText style={styles.bold}>Finding Water:{'\n'}</ThemedText>
            • Follow animal tracks{'\n'}
            • Dig in dry riverbeds{'\n'}
            • Collect dew
          </ThemedText>
        </Collapsible>

        {/* Food Rationing & Finding Food */}
        <Collapsible title="Food Rationing & Finding Food">
          <ThemedText style={styles.sectionText}>
            <ThemedText style={styles.bold}>Rationing Rules:{'\n'}</ThemedText>
            • Eat small portions{'\n'}
            • Don’t eat if low on water{'\n\n'}

            <ThemedText style={styles.bold}>Safe Foods:{'\n'}</ThemedText>
            • Dandelions{'\n'}
            • Cattails{'\n'}
            • Acorns (leached){'\n'}
            • Pine needles (vitamin C)
          </ThemedText>
        </Collapsible>

        {/* Wound Treatment & First Aid */}
        <Collapsible title="Wound Treatment & First Aid">
          <ThemedText style={styles.sectionText}>
            <ThemedText style={styles.bold}>Bleeding:{'\n'}</ThemedText>
            • Apply pressure 10–15 mins{'\n'}
            • Elevate limb{'\n\n'}

            <ThemedText style={styles.bold}>Cleaning:{'\n'}</ThemedText>
            • Rinse with clean water{'\n'}
            • Cover with bandage
          </ThemedText>
        </Collapsible>

        {/* Navigation Without Compass */}
        <Collapsible title="Navigation Without Compass">
          <ThemedText style={styles.sectionText}>
            <ThemedText style={styles.bold}>Using the Sun:{'\n'}</ThemedText>
            • East = sunrise{'\n'}
            • West = sunset{'\n'}
            • Shadow-stick method
          </ThemedText>
        </Collapsible>

        {/* Signaling for Help */}
        <Collapsible title="Signaling for Help">
          <ThemedText style={styles.sectionText}>
            <ThemedText style={styles.bold}>Visual Signals:{'\n'}</ThemedText>
            • Three fires = distress{'\n'}
            • Mirror flash{'\n'}
            • Bright cloth
          </ThemedText>
        </Collapsible>

        {/* Cold Weather Survival */}
        <Collapsible title="Cold Weather Survival">
          <ThemedText style={styles.sectionText}>
            <ThemedText style={styles.bold}>Prevent Hypothermia:{'\n'}</ThemedText>
            • Stay dry{'\n'}
            • Layer clothing
          </ThemedText>
        </Collapsible>

        {/* Heat & Desert Survival */}
        <Collapsible title="Heat & Desert Survival">
          <ThemedText style={styles.sectionText}>
            <ThemedText style={styles.bold}>Dehydration Prevention:{'\n'}</ThemedText>
            • Move at night{'\n'}
            • Stay in shade
          </ThemedText>
        </Collapsible>

        {/* Emergency Communication */}
        <Collapsible title="Emergency Communication">
          <ThemedText style={styles.sectionText}>
            <ThemedText style={styles.bold}>When Network Returns:{'\n'}</ThemedText>
            • Send location{'\n'}
            • Use texts to save data
          </ThemedText>
        </Collapsible>

        {/* Essential Survival Priorities */}
        <Collapsible title="Essential Survival Priorities">
          <ThemedText style={styles.sectionText}>
            <ThemedText style={styles.bold}>Rule of 3s:{'\n'}</ThemedText>
            • 3 minutes without air{'\n'}
            • 3 hours without shelter{'\n'}
            • 3 days without water
          </ThemedText>
        </Collapsible>

        {/* Footer */}
        <View style={styles.footer}>
          <ThemedView style={styles.footerCard}>
            <ThemedText style={styles.footerText}>
              💡 This guide works offline — keep it for emergencies.
            </ThemedText>
          </ThemedView>
        </View>
      </View>
    </ScrollView>
  );
}




// ------------------------------------------------------
//                      STYLES
// ------------------------------------------------------

const styles = StyleSheet.create({
  container: { flex: 1 },

  contentContainer: {
    paddingTop: 60,
    paddingBottom: 40,
  },

  // BOOK COVER HEADER
  bookCover: {
    backgroundColor: '#8B4513',
    marginHorizontal: 16,
    marginBottom: 30,
    marginTop: 10,
    borderRadius: 40,
    paddingVertical: 60,
    paddingHorizontal: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 8,
    position: 'relative',
    borderWidth: 2,
    borderColor: '#654321',
    alignItems: 'center',
    overflow: 'hidden',
  },
  
  bookCoverDark: {
    backgroundColor: '#3d2817',
    borderColor: '#2a1a0f',
  },
  
  // Removed bookSpine style
  
  shieldContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  
  shield: {
    fontSize: 48,
    lineHeight: 52,
  },
  
  headerTextContainer: {
    alignItems: 'center',
  },
  
  headerTitle: {
    fontSize: 40,
    fontFamily: 'Georgia',
    fontWeight: '900',
    letterSpacing: 4,
    color: '#FFD700',             // GOLD YELLOW
    marginBottom: -2,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  
  titleUnderline: {
    width: 160,
    height: 3,
    backgroundColor: '#FFD700',
    marginVertical: 12,
    borderRadius: 2,
  },
  
  headerSubtitle: {
    fontSize: 14,
    fontFamily: 'Georgia',
    color: '#FFF8DC',
    fontWeight: '600',
    letterSpacing: 1,
  },
  
  headerSubtitle2: {
    fontSize: 12,
    fontFamily: 'Georgia',
    color: '#E8D3A0',
    marginTop: 2,
    fontStyle: 'italic',
  },

  // BOOK PAGES
  bookPages: {
    backgroundColor: '#FFFEF7',
    marginHorizontal: 16,
    borderRadius: 20,
    padding: 20,
    paddingVertical: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E8E5D8',
    gap: 28,
    overflow: 'hidden',
  },

  bookPagesDark: {
    backgroundColor: '#2a2a2a',
    borderColor: '#3a3a3a',
  },

  sectionText: {
    fontSize: 15,
    lineHeight: 26,
    marginTop: 8,
  },

  bold: {
    fontWeight: '700',
    fontSize: 17,
    marginTop: 12,
    marginBottom: 4,
  },

  footer: {
    marginTop: 32,
  },

  footerCard: {
    padding: 20,
    borderRadius: 8,
    backgroundColor: '#F0F8E8',
    borderWidth: 1,
    borderColor: '#C8E6C9',
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  footerText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#2E7D32',
    fontWeight: '500',
    lineHeight: 20,
  },
});