import { ChatbotCard } from "@/components/molecules/ChatbotCard/ChatbotCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apolloServerClient } from "@/graphql/apollo-server-client";
import { GET_CHATBOT_BY_ID } from "@/graphql/queries";
import { CopyIcon, Link, LinkIcon } from "lucide-react";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page(props: PageProps) {
  const { params } = props;
  const { id } = await params;

  const { data } = await apolloServerClient.query({
    query: GET_CHATBOT_BY_ID,
    variables: { chatbot_id: id },
  });

  const chatbot = data.chatbots;

  if (!chatbot) {
    notFound();
  }

  return (
    <div className="px-0 md:p-10 w-full">
      <ChatbotCard chatbotId={chatbot.id} />
    </div>
  );
}
