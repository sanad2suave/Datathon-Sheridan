import { useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { getAdvice, Message } from '@/services/api';

export default function GeminiChatScreen() {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const backgroundColor = useThemeColor({}, 'background');
  const colorScheme = useColorScheme();
  const textColor = useThemeColor({}, 'text');
  const isDark = colorScheme === 'dark';

  const handleSend = async () => {
    if (inputText.trim()) {
      const messageToSend = inputText.trim();
      setInputText(''); // Clear input immediately

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
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor }]}
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
});
