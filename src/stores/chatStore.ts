import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ChatMessage } from '@/types';

interface ChatState {
  messages: ChatMessage[];
  isTyping: boolean;
  sendMessage: (message: string) => void;
  clearChat: () => void;
}

const autoReplies = [
  "Thank you for reaching out! How can I help you with your laptop rental today?",
  "I understand your concern. Let me check that for you.",
  "You can find that information in your dashboard under 'My Rentals'.",
  "For technical issues, please try restarting the laptop. If the issue persists, we can arrange a replacement.",
  "Our standard rental period can be extended. Would you like me to help you with that?",
  "Is there anything else I can help you with today?",
];

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      messages: [
        {
          id: 'welcome',
          sender: 'support',
          message: "Welcome to LaptopRent Support! How can I assist you today?",
          timestamp: new Date().toISOString(),
        },
      ],
      isTyping: false,

      sendMessage: (message: string) => {
        const userMessage: ChatMessage = {
          id: `msg_${Date.now()}`,
          sender: 'user',
          message,
          timestamp: new Date().toISOString(),
        };

        set((state) => ({
          messages: [...state.messages, userMessage],
        }));

        // Simulate typing and auto-reply
        set({ isTyping: true });
        
        setTimeout(() => {
          const randomReply = autoReplies[Math.floor(Math.random() * autoReplies.length)];
          const supportMessage: ChatMessage = {
            id: `msg_${Date.now() + 1}`,
            sender: 'support',
            message: randomReply,
            timestamp: new Date().toISOString(),
          };

          set((state) => ({
            messages: [...state.messages, supportMessage],
            isTyping: false,
          }));
        }, 1500 + Math.random() * 1000);
      },

      clearChat: () => {
        set({
          messages: [
            {
              id: 'welcome',
              sender: 'support',
              message: "Welcome to LaptopRent Support! How can I assist you today?",
              timestamp: new Date().toISOString(),
            },
          ],
          isTyping: false,
        });
      },
    }),
    {
      name: 'chat-storage',
    }
  )
);
