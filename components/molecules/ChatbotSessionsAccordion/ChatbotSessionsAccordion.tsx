"use client";

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
import { ChatSession } from "@/types/chat";
import { Pagination } from "../Pagination/Pagination";
import { useQuery } from "@apollo/client";
import { useSearchParams } from "next/navigation";
import { Loader } from "@/components/molecules/Loader/Loader";
import ReactTimeAgo from "react-timeago";

type ChatbotSessionsAccordionProps = Chatbot;

export const ChatbotSessionsAccordion: FC<
  Readonly<ChatbotSessionsAccordionProps>
> = (props) => {
  const { id: chatbotId, name } = props;
  const searchParams = useSearchParams();
  const pageKey = `chat-session-page-chatbot-${chatbotId}`;
  const page = searchParams.get(pageKey) ?? 1;

  /** WOULDDO: VALIDATE DATA */
  const { data } = useQuery(GET_PAGINATED_CHAT_SESSIONS_BY_CHATBOT_ID, {
    variables: {
      chatbot_id: chatbotId,
      page: page,
      page_size: 1,
    },
  });

  if (!data) return <Loader />;

  const chatSessions = data.chat_sessionsPaginatedListByChatbotId;
  const paginationInfo =
    data.chat_sessionsPaginatedListByChatbotIdPaginationInfo;

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

        {!!chatSessions.length && (
          <>
            {chatSessions.map((chatSession: ChatSession) => (
              <div
                key={chatSession.id}
                className="border-b py-4 flex gap-2 justify-between items-center"
              >
                <div>
                  <h4 className="text-2xl font-bold">
                    Session ID: {chatSession.id}
                  </h4>
                  <div className="text-sm">
                    Name: {chatSession.guests.name} - Email:{" "}
                    {chatSession.guests.email}
                  </div>
                  <div className="text-sm text-gray-500">
                    <ReactTimeAgo date={new Date(chatSession.created_at)} />
                  </div>
                </div>

                <Button asChild>
                  <Link href="">View session</Link>
                </Button>
              </div>
            ))}

            <Pagination
              className={"mt-5"}
              pageSize={1}
              totalItems={paginationInfo.total}
              pageKey={pageKey}
            />
          </>
        )}
      </AccordionContent>
    </AccordionItem>
  );
};
