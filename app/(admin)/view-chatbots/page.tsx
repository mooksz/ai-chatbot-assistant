import { Chatbot } from "@/components/molecules/Chatbot/Chatbot";
import { Pagination } from "@/components/molecules/Pagination/Pagination";
import { apolloServerClient } from "@/graphql/apollo-server-client";
import { GET_PAGINATED_CHATBOTS_BY_USER_ID } from "@/graphql/queries";
import { auth } from "@clerk/nextjs/server";
import { Chatbot as ChatbotType } from "@/types/chatbot";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type PageProps = {
  searchParams: Promise<{
    page?: number;
  }>;
};

const PAGE_SIZE = 3;

export default async function Page(props: PageProps) {
  const { searchParams } = props;
  const { page = 1 } = await searchParams;
  const { userId } = await auth();

  if (!userId) return null;

  /** WOULDDO: VALIDATE DATA */
  const { data } = await apolloServerClient.query({
    query: GET_PAGINATED_CHATBOTS_BY_USER_ID,
    variables: {
      clerk_user_id: userId,
      page,
      page_size: PAGE_SIZE,
    },
  });

  console.log(data);

  return (
    <div className="flex-1 pb-20 p-10">
      <h1 className="font-bold text-4xl mb-5">Chatbots</h1>

      {data?.chatbotsPaginatedListByUserId?.length === 0 && (
        <div>
          <p>You do not have any chatbots yet.</p>
          <Button asChild className="mt-2">
            <Link href="/create-chatbot">Create one</Link>
          </Button>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {data?.chatbotsPaginatedListByUserId?.length !== 0 &&
          data?.chatbotsPaginatedListByUserId?.map((chatbot: ChatbotType) => (
            <Chatbot key={chatbot.id} {...chatbot} />
          ))}
      </div>

      <Pagination
        className={"mt-5"}
        pageSize={PAGE_SIZE}
        totalItems={data.chatbotsPaginatedListByUserIdPaginationInfo.total ?? 0}
      />
    </div>
  );
}
