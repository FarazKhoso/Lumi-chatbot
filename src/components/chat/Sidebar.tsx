import { Conversation } from "@/types/chat";
import { ConversationItem } from "./ConversationItem";
import { Sparkles, X, PanelLeftClose, PanelLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface SidebarProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onDeleteConversation: (id: string) => void;
  isOpen: boolean;
  onToggle: () => void;
  searchQuery: string;
}

export function Sidebar({
  conversations,
  activeConversationId,
  onSelectConversation,
  onDeleteConversation,
  isOpen,
  onToggle,
  searchQuery,
}: SidebarProps) {
  const isMobile = useIsMobile();
  const filteredConversations = conversations.filter((conv) =>
    conv.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Collapsed toggle button (shows when sidebar is closed on desktop)
  if (!isOpen && !isMobile) {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggle}
        className="fixed left-4 top-4 z-50 h-10 w-10 rounded-xl bg-card shadow-card-lumi border hover:bg-muted"
      >
        <PanelLeft className="w-5 h-5" />
      </Button>
    );
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && isMobile && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40"
          onClick={onToggle}
        />
      )}

      <aside
        className={cn(
          "z-50 h-full w-80 bg-card border-r shrink-0",
          "flex flex-col transition-all duration-300 ease-in-out",
          isMobile ? "fixed" : "relative",
          isMobile && !isOpen && "-translate-x-full"
        )}
      >
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-lumi flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg">History</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-lg hover:bg-muted"
            onClick={onToggle}
            title={isMobile ? "Close sidebar" : "Collapse sidebar"}
          >
            {isMobile ? <X className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
          </Button>
        </div>

        <ScrollArea className="flex-1 p-3">
          {filteredConversations.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p className="text-sm">No conversations yet</p>
              <p className="text-xs mt-1">Start chatting with Lumi! ✨</p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredConversations.map((conversation) => (
                <ConversationItem
                  key={conversation.id}
                  conversation={conversation}
                  isActive={conversation.id === activeConversationId}
                  onSelect={() => {
                    onSelectConversation(conversation.id);
                    if (isMobile) onToggle();
                  }}
                  onDelete={() => onDeleteConversation(conversation.id)}
                />
              ))}
            </div>
          )}
        </ScrollArea>

        <div className="p-4 border-t">
          <p className="text-xs text-center text-muted-foreground">
            Made with ❤️ by Lumi
          </p>
        </div>
      </aside>
    </>
  );
}
