import { Sparkles } from "lucide-react";

export function TypingIndicator() {
  return (
    <div className="flex w-full gap-3 justify-start animate-slide-up">
      <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-primary flex items-center justify-center shadow-soft animate-pulse-soft">
        <Sparkles className="w-5 h-5 text-primary-foreground" />
      </div>

      <div className="chat-bubble-bot px-5 py-4 flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-secondary-foreground/60 animate-typing-dot-1" />
        <span className="w-2 h-2 rounded-full bg-secondary-foreground/60 animate-typing-dot-2" />
        <span className="w-2 h-2 rounded-full bg-secondary-foreground/60 animate-typing-dot-3" />
      </div>
    </div>
  );
}
