import { Messages } from "@/components/molecules/Messages/Messages";
import { apolloServerClient } from "@/graphql/apollo-server-client";
import { GET_CHAT_SESSION_BY_ID } from "@/graphql/queries";

type PageProps = {
  params: Promise<{
    id?: string;
  }>;
};

export default async function Page(props: PageProps) {
  const { params } = props;
  const { id } = await params;

  if (!id) return;

  /** WOULDDO: Validate date */
  const { data } = await apolloServerClient.query({
    query: GET_CHAT_SESSION_BY_ID,
    variables: {
      chat_session_id: parseInt(id),
    },
  });

  if (!data) return;

  const {
    chat_sessions: {
      id: chatSessionId,
      created_at,
      messages,
      chatbots: { name: chatbotName, id: chatbotId },
      guests: { name: guestName, email },
    },
  } = data;

  console.log(data);

  return (
    <div className="flex-1 p-10 pb-24">
      <h1 className="text-xl lg:text-3xl font-semibold">
        Chat Session review - {chatbotName} ({chatSessionId})
      </h1>
      <p className="text-sm text-gray-500">
        {new Date(created_at).toLocaleString("nl-NL")} - {guestName} ({email})
      </p>

      <hr className="my-5" />

      <Messages
        messages={messages}
        chatbotName={chatbotName}
        chatbotId={chatbotId}
        guestName={guestName}
      />
    </div>
  );
}
