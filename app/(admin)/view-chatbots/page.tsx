import { Chatbot } from "@/components/molecules/Chatbot/Chatbot";
import { Pagination } from "@/components/molecules/Pagination/Pagination";
import { apolloServerClient } from "@/graphql/apollo-server-client";
import { GET_PAGINATED_CHATBOTS_BY_USER_ID } from "@/graphql/queries";
import { auth } from "@clerk/nextjs/server";
import { Chatbot as ChatbotType } from "@/types/chatbot";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageSizeSelect } from "@/components/molecules/PageSizeSelect/PageSizeSelect";

type PageProps = {
  searchParams: Promise<{
    page?: string;
    page_size?: string;
  }>;
};

const PAGE_SIZE_OPTIONS = [3, 5, 10, 25];
const DEFAULT_PAGE_SIZE = PAGE_SIZE_OPTIONS[0];

export default async function Page(props: PageProps) {
  const { searchParams } = props;
  const {
    page: pageString = "1",
    page_size: page_sizeString = DEFAULT_PAGE_SIZE,
  } = await searchParams;
  const { userId } = await auth();
  const page = Number(pageString);
  const page_size = Number(page_sizeString);

  if (!userId) return null;

  /** WOULDDO: VALIDATE DATA */
  const { data } = await apolloServerClient.query({
    query: GET_PAGINATED_CHATBOTS_BY_USER_ID,
    variables: {
      clerk_user_id: userId,
      page,
      page_size,
    },
  });

  return (
    <div className="flex-1 pb-20 p-10">
      <div className="flex gap-4 items-start justify-between">
        <h1 className="font-bold text-4xl mb-5">Chatbots</h1>

        <PageSizeSelect
          defaultPageSize={DEFAULT_PAGE_SIZE}
          options={PAGE_SIZE_OPTIONS}
        />
      </div>

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
        pageSize={page_size}
        totalItems={data.chatbotsPaginatedListByUserIdPaginationInfo.total ?? 0}
      />
    </div>
  );
}
