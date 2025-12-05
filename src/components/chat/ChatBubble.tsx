import { Message } from "@/types/chat";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Sparkles } from "lucide-react";

interface ChatBubbleProps {
  message: Message;
  isLatest?: boolean;
}

export function ChatBubble({ message, isLatest }: ChatBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex w-full gap-3 animate-slide-up",
        isUser ? "justify-end" : "justify-start"
      )}
      style={{ animationDelay: isLatest ? "0ms" : "0ms" }}
    >
      {!isUser && (
        <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-lumi flex items-center justify-center shadow-soft">
          <Sparkles className="w-5 h-5 text-primary-foreground" />
        </div>
      )}

      <div
        className={cn(
          "max-w-[75%] px-4 py-3 transition-all duration-300",
          isUser ? "chat-bubble-user" : "chat-bubble-bot"
        )}
      >
        <p className="text-[15px] leading-relaxed whitespace-pre-wrap break-words">
          {message.content}
        </p>
        <p
          className={cn(
            "text-[11px] mt-1.5",
            isUser ? "text-primary-foreground/70" : "text-muted-foreground"
          )}
        >
          {format(message.timestamp, "h:mm a")}
        </p>
      </div>

      {isUser && (
        <div className="flex-shrink-0 w-9 h-9 rounded-full bg-muted flex items-center justify-center">
          <span className="text-sm font-semibold text-muted-foreground">You</span>
        </div>
      )}
    </div>
  );
}
