import { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function GeminiChatScreen() {
  const [inputText, setInputText] = useState('');
  const backgroundColor = useThemeColor({}, 'background');
  const colorScheme = useColorScheme();
  const textColor = useThemeColor({}, 'text');
  const isDark = colorScheme === 'dark';

  const handleSend = () => {
    if (inputText.trim()) {
      // TODO: Send to backend when API is ready
      console.log('Sending:', inputText);
      setInputText('');
    }
  };

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
      <ThemedView style={styles.content}>
        {/* Empty space for future messages */}
      </ThemedView>
      
      <ThemedView style={styles.inputContainer}>
        <View style={[
          styles.inputWrapper,
          isDark ? styles.inputWrapperDark : styles.inputWrapperLight
        ]}>
          <TextInput
            style={[styles.textInput, { color: textColor }]}
            placeholder="Enter a prompt..."
            placeholderTextColor={isDark ? '#9BA1A6' : '#687076'}
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={2000}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              inputText.trim() ? styles.sendButtonActive : styles.sendButtonInactive
            ]}
            onPress={handleSend}
            disabled={!inputText.trim()}>
            <ThemedText style={styles.sendButtonText}>→</ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  inputContainer: {
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 34 : 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 48,
    maxHeight: 120,
    borderWidth: 1,
  },
  inputWrapperLight: {
    backgroundColor: '#F5F5F5',
    borderColor: '#E0E0E0',
  },
  inputWrapperDark: {
    backgroundColor: '#2C2C2E',
    borderColor: '#3A3A3C',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
    paddingRight: 8,
    maxHeight: 104,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  sendButtonActive: {
    backgroundColor: '#4285F4',
  },
  sendButtonInactive: {
    backgroundColor: '#C0C0C0',
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
