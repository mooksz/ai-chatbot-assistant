import { Pagination } from "@/components/molecules/Pagination/Pagination";
import { apolloServerClient } from "@/graphql/apollo-server-client";
import { GET_PAGINATED_CHATBOTS_BY_USER_ID } from "@/graphql/queries";
import { auth } from "@clerk/nextjs/server";

type PageProps = {
  searchParams: Promise<{
    page?: number;
  }>;
};

export default async function Page(props: PageProps) {
  const { searchParams } = props;
  const { page = 1 } = await searchParams;
  const { userId } = await auth();

  if (!userId) return null;

  const { data } = await apolloServerClient.query({
    query: GET_PAGINATED_CHATBOTS_BY_USER_ID,
    variables: {
      clerk_user_id: userId,
      page,
      page_size: 1,
    },
  });

  return (
    <div>
      {JSON.stringify(data)}
      <Pagination
        pageSize={1}
        totalItems={data.chatbotsPaginatedListByUserIdPaginationInfo.total ?? 0}
      />
    </div>
  );
}
