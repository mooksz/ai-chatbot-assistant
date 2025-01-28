import { Avatar } from "@/components/atoms/Avatar/Avatar";
import { ChatbotCard } from "@/components/molecules/ChatbotCard/ChatbotCard";
import { ChatbotEdit } from "@/components/organisms/ChatbotEdit";
import { Button } from "@/components/ui/button";
import { apolloServerClient } from "@/graphql/apollo-server-client";
import { GET_CHATBOT_BY_ID } from "@/graphql/queries";
import { getChatbotByIdResponseSchema } from "@/schema/chatbot";
import {
  GetChatbotByIdRequestVariables,
  GetChatbotByIdResponse,
} from "@/types/chatbot";
import { notFound } from "next/navigation";
import { z } from "zod";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page(props: PageProps) {
  const { params } = props;
  const { id } = await params;

  const { data } = await apolloServerClient.query<
    GetChatbotByIdResponse,
    GetChatbotByIdRequestVariables
  >({
    query: GET_CHATBOT_BY_ID,
    variables: { id },
  });

  if (!data) {
    notFound();
  }

  const parsedData = getChatbotByIdResponseSchema.safeParse(data);

  if (parsedData.error) {
    return <div>Error</div>;
  }

  const chatbot = parsedData.data.chatbots;

  //
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
