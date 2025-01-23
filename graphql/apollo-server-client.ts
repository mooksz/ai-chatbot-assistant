import {
  ApolloClient,
  DefaultOptions,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";

if (!process.env.NEXT_PUBLIC_IBM_STEPZEN_GRAPHQL_ENDPOINT) {
  throw new Error("NEXT_PUBLIC_IBM_STEPZEN_GRAPHQL_ENDPOINT is undefined");
}

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
  mutate: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

const apolloServerClient = new ApolloClient({
  ssrMode: true,
  link: createHttpLink({
    uri: process.env.NEXT_PUBLIC_IBM_STEPZEN_GRAPHQL_ENDPOINT,
    headers: {
      Authorization: `Apikey ${process.env.IBM_STEPZEN_API_KEY}`,
    },
    fetch,
  }),
  cache: new InMemoryCache(),
  defaultOptions,
});

export { apolloServerClient };
