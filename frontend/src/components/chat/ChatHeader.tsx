import { Sparkles, Menu, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ChatHeaderProps {
  onMenuClick: () => void;
  onNewChat: () => void;
  onSearch: (query: string) => void;
  showSearch?: boolean;
}

export function ChatHeader({ onMenuClick, onNewChat, onSearch, showSearch }: ChatHeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    onSearch(value);
  };

  return (
    <header className="glass-effect border-b px-4 py-3 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden h-10 w-10 rounded-xl"
          onClick={onMenuClick}
        >
          <Menu className="w-5 h-5" />
        </Button>

        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center shadow-soft">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">AI Assistant</h1>
            <p className="text-xs text-muted-foreground">Chat with AI</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {showSearch && (
          <div
            className={cn(
              "overflow-hidden transition-all duration-300",
              isSearchOpen ? "w-48" : "w-0"
            )}
          >
            <Input
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search chats..."
              className="h-9 rounded-xl border-muted"
            />
          </div>
        )}

        {showSearch && (
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-xl"
            onClick={() => {
              setIsSearchOpen(!isSearchOpen);
              if (isSearchOpen) {
                setSearchQuery("");
                onSearch("");
              }
            }}
          >
            <Search className="w-5 h-5" />
          </Button>
        )}

        <Button
          onClick={onNewChat}
          className="h-10 px-4 rounded-xl bg-gradient-primary hover:opacity-90 shadow-soft"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Chat
        </Button>
      </div>
    </header>
  );
}
