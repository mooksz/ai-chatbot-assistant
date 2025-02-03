import { type FC } from "react";
import { Chatbot as ChatbotType } from "@/types/chatbot";
import { Avatar } from "@/components/atoms/Avatar/Avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { apolloServerClient } from "@/graphql/apollo-server-client";
import { GET_CHAT_SESSIONS_COUNT_BY_CHATBOT_ID } from "@/graphql/queries";

type ChatbotProps = ChatbotType;

export const Chatbot: FC<Readonly<ChatbotProps>> = async (props) => {
  const { name, id, created_at, chatbot_characteristics } = props;

  /** WOULDDO: Validate data */
  const { data } = await apolloServerClient.query({
    query: GET_CHAT_SESSIONS_COUNT_BY_CHATBOT_ID,
    variables: {
      chatbot_id: id,
    },
  });

  const chatSessionsCount = data?.chat_sessionsCountChatbotId?.total || 0;

  return (
    <div className="rounded-lg bg-white border p-5">
      <div className="flex items-center gap-3">
        <Avatar className="w-12 h-12 relative" seed={`chatbot-${id}`} />
        <h2 className="font-bold text-xl">{name}</h2>

        <Button asChild className="ml-auto">
          <Link href={`/edit-chatbot/${id}`}>Edit chatbot</Link>
        </Button>
      </div>

      <hr className="my-5" />

      <div>
        <h3 className="font-bold">Characteristics</h3>
        {!chatbot_characteristics?.length && (
          <p>No chatbot characteristics yet</p>
        )}

        {!!chatbot_characteristics?.length && (
          <ul className="list-disc pl-4 flex flex-wrap">
            {chatbot_characteristics.map((c) => (
              <li className="w-[50%]" key={c.id}>
                {c.content}
              </li>
            ))}
          </ul>
        )}
      </div>

      <hr className="mt-5 mb-3" />

      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">Sessions: {chatSessionsCount}</p>
        <p className="text-sm text-gray-500">
          Created: {new Date(created_at).toLocaleString("nl-NL")}
        </p>
      </div>
    </div>
  );
};
