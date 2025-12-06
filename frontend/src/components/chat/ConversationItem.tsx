import { Conversation } from "@/types/chat";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { MessageCircle, Trash2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ConversationItemProps {
  conversation: Conversation;
  isActive: boolean;
  onSelect: () => void;
  onDelete: () => void;
}

export function ConversationItem({
  conversation,
  isActive,
  onSelect,
  onDelete,
}: ConversationItemProps) {
  const [showDelete, setShowDelete] = useState(false);

  return (
    <div
      className={cn(
        "group relative flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer",
        "transition-all duration-200 hover:bg-muted/80",
        isActive && "bg-primary-light border border-primary/20"
      )}
      onClick={onSelect}
      onMouseEnter={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
    >
      <div
        className={cn(
          "flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center",
          isActive ? "bg-gradient-primary" : "bg-muted"
        )}
      >
        <MessageCircle
          className={cn(
            "w-5 h-5",
            isActive ? "text-primary-foreground" : "text-muted-foreground"
          )}
        />
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-sm truncate">{conversation.title}</h4>
        <p className="text-xs text-muted-foreground truncate">
          {format(conversation.updatedAt, "MMM d, h:mm a")}
        </p>
      </div>

      {showDelete ? (
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      ) : (
        <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
    </div>
  );
}
