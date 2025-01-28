"use client";

import { ChatbotCard } from "@/components/molecules/ChatbotCard/ChatbotCard";
import { ChatbotEdit } from "@/components/organisms/ChatbotEdit";
import { apolloServerClient } from "@/graphql/apollo-server-client";
import { GET_CHATBOT_BY_ID } from "@/graphql/queries";
import { getChatbotByIdResponseSchema } from "@/schema/chatbot";
import {
  GetChatbotByIdRequestVariables,
  GetChatbotByIdResponse,
} from "@/types/chatbot";
import { useQuery } from "@apollo/client";
import { notFound } from "next/navigation";
import { use } from "react";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default function Page(props: PageProps) {
  const { params } = props;
  const { id } = use(params);

  const { data } = useQuery<
    GetChatbotByIdResponse,
    GetChatbotByIdRequestVariables
  >(GET_CHATBOT_BY_ID, {
    variables: { id },
  });

  if (!data) return null;

  const parsedData = getChatbotByIdResponseSchema.safeParse(data);

  if (parsedData.error) {
    return <div>Error</div>;
  }

  const chatbot = parsedData.data.chatbots;

  return (
    <div className="px-0 md:p-10 w-full flex flex-wrap items-start">
      <h1 className="font-bold text-4xl">Edit chatbot</h1>

      <ChatbotCard
        chatbotId={chatbot.id}
        className="md:sticky md:top-5 z-50 sm:max-w-sm ml-auto"
      />

      <ChatbotEdit chatbot={chatbot} />
    </div>
  );
}
