"use client";

import { Avatar } from "@/components/atoms/Avatar/Avatar";
import { cn } from "@/lib/utils";
import { Message } from "@/types/chat";
import { UserCircleIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import ReactTimeago from "react-timeago";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useEffect, useRef } from "react";

type MessagesProps = {
  messages: Message[];
  chatbotName: string;
  chatbotId: number;
  guestName: string;
};

export function Messages(props: Readonly<MessagesProps>) {
  const { messages, chatbotName, chatbotId, guestName } = props;
  const pathname = usePathname();
  const isReviewsPage = pathname.includes("/review-chat-sessions/");
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    ref.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col overflow-y-auto gap-y-3 py-10 px-5 bg-white rounded-lg max-h-[calc(100vh-25rem)]">
      {messages.map((msg) => {
        const isUser = msg.sender === "user";

        return (
          <div
            key={msg.id}
            className={cn(
              "chat",
              isUser ? "chat-end" : "chat-start",
              "relative"
            )}
          >
            <div className="chat-image avatar">
              <div className="w-8 rounded-full">
                {!isUser && <Avatar seed={`chatbot-${chatbotId}`} />}

                {isUser && (
                  <UserCircleIcon className="w-full h-full text-blue-500" />
                )}
              </div>
            </div>

            <div className="chat-header font-semibold">
              {isUser ? guestName : chatbotName}
            </div>

            <div
              className={cn(
                "chat-bubble",
                isUser ? "bg-gray-200 text-gray-800" : "bg-blue-500 text-white"
              )}
            >
              <Markdown remarkPlugins={[remarkGfm]} className={"break-words"}>
                {msg.content}
              </Markdown>
            </div>

            <div className="chat-footer">
              <span className="text-xs text-gray-500">
                sent{" "}
                {isReviewsPage ? (
                  new Date(msg.created_at).toLocaleString("nl-NL")
                ) : (
                  <ReactTimeago date={new Date(msg.created_at)} />
                )}
              </span>
            </div>
          </div>
        );
      })}

      <div ref={ref} />
    </div>
  );
}
