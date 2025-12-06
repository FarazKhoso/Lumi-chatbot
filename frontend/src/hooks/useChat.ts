import { useState, useCallback } from "react";
import { Message, Conversation } from "@/types/chat";

const ASSISTANT_PERSONALITY = `You are a friendly, helpful, and clear assistant. Use natural language and be kind.`;

const generateId = () => Math.random().toString(36).substring(2, 15);

const generateTitle = (firstMessage: string) => {
  const words = firstMessage.split(" ").slice(0, 5).join(" ");
  return words.length > 30 ? words.substring(0, 30) + "..." : words;
};

// Function to get real AI response from backend API
const getAIResponse = async (messages: Message[]): Promise<string> => {
  // Use environment variable or default to localhost for development
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5001';

  try {
    const response = await fetch(`${BACKEND_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: messages[messages.length - 1].content, // Last user message
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    if (data.error) {
      throw new Error(data.error);
    }

    return data.response;
  } catch (error) {
    console.error('Error getting AI response:', error);
    throw error;
  }
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
        // Add an error message to the conversation
        setConversations((prev) =>
          prev.map((conv) => {
            if (conv.id === conversationId) {
              return {
                ...conv,
                messages: [
                  ...conv.messages,
                  {
                    id: generateId(),
                    role: "assistant",
                    content: "Sorry, I'm having trouble connecting to the AI service. Please try again.",
                    timestamp: new Date(),
                  }
                ],
                updatedAt: new Date(),
              };
            }
            return conv;
          })
        );
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
