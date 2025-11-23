import { useState, useEffect } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { getAdvice, Message, Threat } from '@/services/api';

export default function GeminiChatScreen() {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [attachedThreat, setAttachedThreat] = useState<Threat | null>(null);

  const params = useLocalSearchParams();
  const router = useRouter();
  const backgroundColor = useThemeColor({}, 'background');
  const colorScheme = useColorScheme();
  const textColor = useThemeColor({}, 'text');
  const isDark = colorScheme === 'dark';

  useEffect(() => {
    if (params.threat) {
      try {
        const threatData = JSON.parse(params.threat as string);
        setAttachedThreat(threatData);
      } catch (e) {
        console.error('Error parsing threat data:', e);
      }
    }
  }, [params.threat]);

  const clearAttachedThreat = () => {
    setAttachedThreat(null);
    router.setParams({ threat: null });
  };

  const handleSend = async () => {
    if (inputText.trim()) {
      let messageToSend = inputText.trim();

      if (attachedThreat) {
        messageToSend += `\n\n[Attached Threat Context]\nType: ${attachedThreat.type}\nLevel: ${attachedThreat.threatLevel}\nLocation: ${attachedThreat.lat}, ${attachedThreat.lng}\nTimestamp: ${attachedThreat.timestamp}`;
      }

      setInputText(''); // Clear input immediately
      clearAttachedThreat(); // Clear attached threat and params after sending

      // Add user message to conversation
      const userMessage: Message = { role: 'user', content: messageToSend };
      setMessages(prev => [...prev, userMessage]);

      setLoading(true);
      setError(null);

      try {
        const response = await getAdvice(messageToSend, messages);

        // Add assistant response to conversation
        const assistantMessage: Message = { role: 'assistant', content: response };
        setMessages(prev => [...prev, assistantMessage]);
      } catch (err) {
        setError('Failed to get advice. Please try again.');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleNewConversation = () => {
    setMessages([]);
    setError(null);
    clearAttachedThreat();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>

        <ThemedView style={styles.header}>
          <ThemedText style={styles.headerTitle}>Safety Assistant</ThemedText>
          {messages.length > 0 && (
            <TouchableOpacity onPress={handleNewConversation} style={styles.newChatButton}>
              <ThemedText style={styles.newChatButtonText}>+ New Chat</ThemedText>
            </TouchableOpacity>
          )}
        </ThemedView>

        <ThemedView style={styles.content}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}>

            {messages.map((msg, index) => (
              <View
                key={index}
                style={[
                  styles.messageBubble,
                  msg.role === 'user' ? styles.userBubble : styles.assistantBubble
                ]}>
                <ThemedText style={[
                  styles.messageText,
                  msg.role === 'user' ? styles.userText : styles.assistantText
                ]}>
                  {msg.content}
                </ThemedText>
              </View>
            ))}

            {loading && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#4285F4" />
                <ThemedText style={styles.loadingText}>Thinking...</ThemedText>
              </View>
            )}

            {error && (
              <View style={[styles.messageBubble, styles.errorBubble]}>
                <ThemedText style={styles.errorText}>⚠️ {error}</ThemedText>
              </View>
            )}

            {messages.length === 0 && !loading && !error && (
              <View style={styles.emptyState}>
                <ThemedText style={styles.emptyStateText}>
                  💬 Ask a safety question or describe a threat situation
                </ThemedText>
              </View>
            )}
          </ScrollView>
        </ThemedView>

        <ThemedView style={styles.inputContainer}>
          {attachedThreat && (
            <View style={styles.attachedThreatContainer}>
              <View style={styles.attachedThreatContent}>
                <ThemedText style={styles.attachedThreatTitle}>Attached Threat: {attachedThreat.type}</ThemedText>
                <ThemedText style={styles.attachedThreatSubtitle}>Level: {attachedThreat.threatLevel}</ThemedText>
              </View>
              <TouchableOpacity onPress={clearAttachedThreat} style={styles.removeThreatButton}>
                <ThemedText style={styles.removeThreatText}>✕</ThemedText>
              </TouchableOpacity>
            </View>
          )}
          <View style={[
            styles.inputWrapper,
            isDark ? styles.inputWrapperDark : styles.inputWrapperLight
          ]}>
            <TextInput
              style={[styles.textInput, { color: textColor }]}
              placeholder="Ask a safety question or describe a threat..."
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 80,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  newChatButton: {
    backgroundColor: '#4285F4',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  newChatButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingHorizontal: 16,
    flexGrow: 1,
  },
  messageBubble: {
    maxWidth: '85%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#4285F4',
  },
  assistantBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#E8F5E9',
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  userText: {
    color: '#FFFFFF',
  },
  assistantText: {
    color: '#1B5E20',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 12,
  },
  loadingText: {
    marginLeft: 8,
    fontSize: 14,
    opacity: 0.7,
  },
  errorBubble: {
    backgroundColor: '#FFEBEE',
    borderWidth: 1,
    borderColor: '#F44336',
    alignSelf: 'flex-start',
  },
  errorText: {
    fontSize: 14,
    color: '#C62828',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyStateText: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.5,
  },
  attachedThreatContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#90CAF9',
  },
  attachedThreatContent: {
    flex: 1,
  },
  attachedThreatTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1565C0',
  },
  attachedThreatSubtitle: {
    fontSize: 10,
    color: '#1976D2',
  },
  removeThreatButton: {
    padding: 4,
  },
  removeThreatText: {
    fontSize: 14,
    color: '#1565C0',
    fontWeight: 'bold',
  },
});
