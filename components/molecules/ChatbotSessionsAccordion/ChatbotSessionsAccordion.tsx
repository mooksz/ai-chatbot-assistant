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
import { GET_PAGINATED_CHAT_SESSIONS_BY_CHATBOT_ID } from "@/graphql/queries";
import { apolloServerClient } from "@/graphql/apollo-server-client";
import { ChatSession } from "@/types/chat";

type ChatbotSessionsAccordionProps = Chatbot;

export const ChatbotSessionsAccordion: FC<
  Readonly<ChatbotSessionsAccordionProps>
> = async (props) => {
  const { id: chatbotId, name } = props;

  /** WOULDDO: VALIDATE DATA */
  const { data } = await apolloServerClient.query({
    query: GET_PAGINATED_CHAT_SESSIONS_BY_CHATBOT_ID,
    variables: {
      chatbot_id: chatbotId,
      page: 1,
      page_size: 1,
    },
  });

  const chatSessions = data?.chat_sessionsPaginatedListByChatbotId;

  return (
    <AccordionItem value={chatbotId.toString()}>
      <AccordionTrigger className="px-4">
        <div className="flex items-center gap-3">
          <Avatar
            className="w-12 h-12 relative"
            seed={`chatbot-${chatbotId}`}
          />
          <span className="font-bold text-xl">
            {name} - {chatSessions.length} sessions
          </span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4">
        {!chatSessions.length && (
          <p className="text-sm text-grey-500">
            No chat sessions available yet.
          </p>
        )}

        {!!chatSessions.length &&
          chatSessions.map((chatSession: ChatSession) => (
            <div
              key={chatSession.id}
              className="border-b py-4 flex gap-2 justify-between items-center"
            >
              <div>
                <h4 className="text-2xl font-bold">
                  Session ID: {chatSession.id}
                </h4>
                <span className="text-sm text-gray-500">
                  Name: {chatSession.guests.name} - Email:{" "}
                  {chatSession.guests.email}
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
