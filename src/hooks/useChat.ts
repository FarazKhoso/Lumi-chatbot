import { useState, useCallback } from "react";
import { Message, Conversation } from "@/types/chat";

const LUMI_PERSONALITY = `You are Lumi, a warm, caring, and lovable AI friend. You always respond with kindness, use gentle emojis (😊 ❤️ ✨ 🌟 💫), and make people feel supported. You're excited to help, never judgmental, and add small touches of joy in every reply. Keep responses conversational and friendly, not too long. You speak like a caring best friend who genuinely wants to brighten someone's day.`;

const generateId = () => Math.random().toString(36).substring(2, 15);

const generateTitle = (firstMessage: string) => {
  const words = firstMessage.split(" ").slice(0, 5).join(" ");
  return words.length > 30 ? words.substring(0, 30) + "..." : words;
};

// Simulated AI response (will be replaced with actual API call when Cloud is enabled)
const getAIResponse = async (messages: Message[]): Promise<string> => {
  // Simulate typing delay
  await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1500));

  const responses = [
    "Aww, I'm so happy you reached out! 😊 That's such an interesting thing to think about. Let me share my thoughts with you... ✨",
    "Yay, I love chatting with you! 💫 That's a great question. Here's what I think might help...",
    "Oh, that sounds wonderful! ❤️ I'm here to help however I can. Let's work through this together!",
    "You're doing amazing by even thinking about this! 🌟 I believe in you. Here's a little encouragement...",
    "That's so thoughtful of you to share! 😊 I really appreciate you trusting me with this. Here's what comes to mind... ✨",
    "Ooh, fun topic! 💫 I'm excited to explore this with you. Let me think... okay, here's my take!",
  ];

  return responses[Math.floor(Math.random() * responses.length)];
};

export function useChat() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const activeConversation = conversations.find((c) => c.id === activeConversationId);

  const createNewConversation = useCallback(() => {
    const newConversation: Conversation = {
      id: generateId(),
      title: "New Chat",
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setConversations((prev) => [newConversation, ...prev]);
    setActiveConversationId(newConversation.id);
    return newConversation.id;
  }, []);

  const sendMessage = useCallback(
    async (content: string) => {
      let conversationId = activeConversationId;

      // Create new conversation if none exists
      if (!conversationId) {
        conversationId = createNewConversation();
      }

      const userMessage: Message = {
        id: generateId(),
        role: "user",
        content,
        timestamp: new Date(),
      };

      // Add user message
      setConversations((prev) =>
        prev.map((conv) => {
          if (conv.id === conversationId) {
            const isFirstMessage = conv.messages.length === 0;
            return {
              ...conv,
              title: isFirstMessage ? generateTitle(content) : conv.title,
              messages: [...conv.messages, userMessage],
              updatedAt: new Date(),
            };
          }
          return conv;
        })
      );

      setIsLoading(true);

      try {
        const currentConversation = conversations.find((c) => c.id === conversationId);
        const allMessages = currentConversation
          ? [...currentConversation.messages, userMessage]
          : [userMessage];

        const aiResponse = await getAIResponse(allMessages);

        const assistantMessage: Message = {
          id: generateId(),
          role: "assistant",
          content: aiResponse,
          timestamp: new Date(),
        };

        setConversations((prev) =>
          prev.map((conv) => {
            if (conv.id === conversationId) {
              return {
                ...conv,
                messages: [...conv.messages, assistantMessage],
                updatedAt: new Date(),
              };
            }
            return conv;
          })
        );
      } catch (error) {
        console.error("Error getting AI response:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [activeConversationId, conversations, createNewConversation]
  );

  const deleteConversation = useCallback(
    (id: string) => {
      setConversations((prev) => prev.filter((conv) => conv.id !== id));
      if (activeConversationId === id) {
        setActiveConversationId(null);
      }
    },
    [activeConversationId]
  );

  const selectConversation = useCallback((id: string) => {
    setActiveConversationId(id);
  }, []);

  const startNewChat = useCallback(() => {
    setActiveConversationId(null);
  }, []);

  return {
    conversations,
    activeConversation,
    activeConversationId,
    isLoading,
    sendMessage,
    deleteConversation,
    selectConversation,
    startNewChat,
  };
}
