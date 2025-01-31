import type { FC } from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Chatbot } from "@/types/chatbot";
import { Avatar } from "@/components/atoms/Avatar/Avatar";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type ChatbotSessionsAccordionProps = Chatbot;

export const ChatbotSessionsAccordion: FC<
  Readonly<ChatbotSessionsAccordionProps>
> = (props) => {
  const { chat_sessions, id, name } = props;

  return (
    <AccordionItem value={id.toString()}>
      <AccordionTrigger className="px-4">
        <div className="flex items-center gap-3">
          <Avatar className="w-12 h-12 relative" seed={`chatbot-${id}`} />
          <span className="font-bold text-xl">
            {name} - {chat_sessions.length} sessions
          </span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4">
        {!chat_sessions.length && (
          <p className="text-sm text-grey-500">
            No chat sessions available yet.
          </p>
        )}

        {!!chat_sessions.length &&
          chat_sessions.map((chat_session) => (
            <div
              key={chat_session.id}
              className="border-b py-4 flex gap-2 justify-between items-center"
            >
              <div>
                <h4 className="text-2xl font-bold">
                  Session ID: {chat_session.id}
                </h4>
                <span className="text-sm text-gray-500">
                  Name: {chat_session.guests.name} - Email:{" "}
                  {chat_session.guests.email}
                </span>
              </div>

              <Button asChild>
                <Link href="">View session</Link>
              </Button>
            </div>
          ))}
      </AccordionContent>
    </AccordionItem>
  );
};
