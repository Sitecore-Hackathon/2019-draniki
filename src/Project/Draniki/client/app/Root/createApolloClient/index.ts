import { split } from 'apollo-link';

import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

import fetch from 'isomorphic-fetch';

export const createApolloClient = ({ uri }: { uri: string }) => {
  const httpLink = new HttpLink({
    fetch,
    uri,
  });

  // Create a WebSocket link:
  const wsLink = new WebSocketLink({
    options: {
      reconnect: true,
    },
    // TODO: remove hard-coded ws url
    uri: 'ws://2019-draniki.local/sitecore/api/graph/draniki?sc_apikey=9d34ec07-b4ce-4283-b037-c215efe3ea88',
  });

  // using the ability to split links, you can send data to each link
  // depending on what kind of operation is being sent
  const link = split(
    // split based on operation type
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query) as any;
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    httpLink
  );

  return new ApolloClient({
    cache: new InMemoryCache(),
    link,
    ssrMode: false,
  });
};
