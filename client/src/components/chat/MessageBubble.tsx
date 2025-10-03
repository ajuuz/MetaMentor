import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useUserStore } from "@/zustand/userStore";

// Define the type for a single chat message
interface Message {
  _id: string;
  senderName: string;
  content: string;
  createdAt: string;
}

// Props for MessageBubble
interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const { user } = useUserStore();

  function formatTime(time: string): string {
    return new Date(time).toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  }

  if (message.senderName === user?.name) {
    return (
      <div className="flex justify-end mb-4">
        <div className="max-w-[85%] sm:max-w-xs lg:max-w-md">
          <div className="bg-primary text-primary-foreground rounded-lg px-3 sm:px-4 py-2 shadow-sm">
            <p className="text-sm leading-relaxed break-words">{message.content}</p>
          </div>
          <div className="text-xs text-muted-foreground mt-1 mr-2 text-right">
            You • {formatTime(message.createdAt)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start mb-4">
      <div className="flex space-x-2 max-w-[85%] sm:max-w-xs lg:max-w-md">
        <Avatar className="h-8 w-8 mt-1 flex-shrink-0">
          <AvatarFallback className="text-xs">
            {message.senderName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="bg-secondary text-secondary-foreground rounded-lg px-3 sm:px-4 py-2 shadow-sm">
            <p className="text-sm leading-relaxed break-words">{message.content}</p>
          </div>
          <div className="text-xs text-muted-foreground mt-1 ml-2 truncate">
            {message.senderName} • {formatTime(message.createdAt)}
          </div>
        </div>
      </div>
    </div>
  );
}
