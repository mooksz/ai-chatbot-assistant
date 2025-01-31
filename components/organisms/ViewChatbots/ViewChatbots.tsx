"use client";

import { Loader } from "@/components/molecules/Loader/Loader";
import { GET_PAGINATED_CHATBOTS_BY_USER_ID } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import { useUser } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import type { FC } from "react";

type ViewChatbotsProps = {};

export const ViewChatbots: FC<Readonly<ViewChatbotsProps>> = (props) => {
  const {} = props;
  const { user } = useUser();

  const { data, loading, error } = useQuery(GET_PAGINATED_CHATBOTS_BY_USER_ID, {
    variables: {
      clerk_user_id: user?.id,
      page,
      page_size: 1,
    },
    skip: !user?.id,
  });

  if (loading) return <Loader />;
  if (error) return <div>Error</div>;

  return <></>;
};
