import { useMemo } from "react";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

// This link from the book is broken. Get it from the Book's Github repo
let uri = "/api/graphql";

let apolloClient;

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: new HttpLink({ uri }),
    cache: new InMemoryCache(),
  });
}

export function initApollo(initialState) {
  const client = apolloClient || createApolloClient();
  if (initialState != undefined) {
    client.cache.restore({
      ...client.extract(),
      ...initialState,
    });
  }
  if (typeof window === "undefined") {
    return client;
  }
  if (!apolloClient) {
    apolloClient = client;
  }
  return client;
}

export function useApollo(initialState) {
  return useMemo(() => initApollo(initialState), [initialState]);
}
