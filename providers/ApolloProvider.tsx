"use client";

import type { FC, ReactNode } from "react";
import { ApolloProvider as ApolloProviderLib } from "@apollo/client";
import { apolloClient } from "@/graphql/apollo-client";

type ApolloProviderProps = { children: ReactNode };

export const ApolloProvider: FC<Readonly<ApolloProviderProps>> = (props) => {
  const { children } = props;

  return (
    <ApolloProviderLib client={apolloClient}>{children}</ApolloProviderLib>
  );
};
