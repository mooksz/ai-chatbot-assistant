import {
  ApolloClient,
  DefaultOptions,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";

if (!process.env.NEXT_PUBLIC_BASE_URL) {
  throw new Error("NEXT_PUBLIC_BASE_URL is undefined");
}

const link = createHttpLink({
  uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/graphql`,
});

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: "network-only",
    // errorPolicy: "all",
  },
  query: {
    fetchPolicy: "network-only",
    // errorPolicy: "all",
  },
  mutate: {
    fetchPolicy: "network-only",
    // errorPolicy: "all",
  },
};

const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  defaultOptions,
});

export { apolloClient };
