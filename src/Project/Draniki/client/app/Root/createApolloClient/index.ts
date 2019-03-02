import { ApolloLink } from 'apollo-link';

import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import fetch from 'isomorphic-fetch';

export const createApolloClient = (options: { uri: string }) =>
  new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([createHttpLink({ uri: options.uri, fetch })]),
    ssrMode: false,
  });
