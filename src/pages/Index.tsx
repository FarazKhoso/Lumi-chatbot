import { useState, useRef, useEffect } from "react";
import { ChatHeader } from "@/components/chat/ChatHeader";
import { Sidebar } from "@/components/chat/Sidebar";
import { ChatBubble } from "@/components/chat/ChatBubble";
import { ChatInput } from "@/components/chat/ChatInput";
import { TypingIndicator } from "@/components/chat/TypingIndicator";
import { WelcomeScreen } from "@/components/chat/WelcomeScreen";
import { useChat } from "@/hooks/useChat";
import { ScrollArea } from "@/components/ui/scroll-area";

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    conversations,
    activeConversation,
    activeConversationId,
    isLoading,
    sendMessage,
    deleteConversation,
    selectConversation,
    startNewChat,
  } = useChat();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeConversation?.messages, isLoading]);

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
  };

  return (
    <div className="flex h-screen bg-gradient-warm overflow-hidden">
      <Sidebar
        conversations={conversations}
        activeConversationId={activeConversationId}
        onSelectConversation={selectConversation}
        onDeleteConversation={deleteConversation}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        searchQuery={searchQuery}
      />

      <main className="flex-1 flex flex-col min-w-0">
        <ChatHeader
          onMenuClick={() => setIsSidebarOpen(true)}
          onNewChat={startNewChat}
          onSearch={setSearchQuery}
          showSearch={conversations.length > 0}
        />

        <div className="flex-1 overflow-hidden">
          {!activeConversation || activeConversation.messages.length === 0 ? (
            <WelcomeScreen onSuggestionClick={handleSuggestionClick} />
          ) : (
            <ScrollArea className="h-full">
              <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
                {activeConversation.messages.map((message, index) => (
                  <ChatBubble
                    key={message.id}
                    message={message}
                    isLatest={index === activeConversation.messages.length - 1}
                  />
                ))}
                {isLoading && <TypingIndicator />}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
          )}
        </div>

        <div className="px-4 pb-4 pt-2 max-w-3xl mx-auto w-full">
          <ChatInput onSend={sendMessage} isLoading={isLoading} />
        </div>
      </main>
    </div>
  );
};

export default Index;
