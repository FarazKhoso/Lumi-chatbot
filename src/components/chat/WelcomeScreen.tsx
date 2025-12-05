import { Sparkles, MessageCircle, Heart, Zap } from "lucide-react";

interface WelcomeScreenProps {
  onSuggestionClick: (suggestion: string) => void;
}

const suggestions = [
  {
    icon: MessageCircle,
    text: "Tell me a fun fact!",
    color: "bg-lumi-lavender text-secondary-foreground",
  },
  {
    icon: Heart,
    text: "I need some encouragement today",
    color: "bg-lumi-coral-light text-foreground",
  },
  {
    icon: Zap,
    text: "Help me brainstorm ideas",
    color: "bg-lumi-mint text-foreground",
  },
];

export function WelcomeScreen({ onSuggestionClick }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-4 animate-scale-in">
      <div className="w-20 h-20 rounded-3xl bg-gradient-lumi flex items-center justify-center shadow-glow mb-6 animate-float">
        <Sparkles className="w-10 h-10 text-primary-foreground" />
      </div>

      <h1 className="text-3xl font-bold mb-2">
        Hi, I'm <span className="text-gradient-lumi">Lumi</span>! ✨
      </h1>

      <p className="text-muted-foreground text-center max-w-md mb-8">
        Your friendly AI companion, here to chat, help, and brighten your day.
        What's on your mind? 😊
      </p>

      <div className="flex flex-wrap justify-center gap-3 max-w-lg">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSuggestionClick(suggestion.text)}
            className={`${suggestion.color} px-4 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 transition-all duration-200 hover:scale-105 hover:shadow-soft`}
          >
            <suggestion.icon className="w-4 h-4" />
            {suggestion.text}
          </button>
        ))}
      </div>
    </div>
  );
}
