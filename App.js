import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { AsyncStorage } from 'react-native';
import { ApolloClient } from 'apollo-client';
import { ApolloLink, split } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { getMainDefinition } from 'apollo-utilities';
import { getTokens } from './src/utils/auth';
import AlertHero from './src/navigation';

let JWT_TOKEN;
let JWT_REFESHTOKEN;

export const reset = async () => {
  getTokens().then((res) => {
    JWT_TOKEN = res.token;
    JWT_REFESHTOKEN = res.refreshToken;
  });
};

reset();
const httpLink = createHttpLink({ uri: 'http://localhost:8000/graphql' });

const middlewareLink = setContext(() => ({
  headers: {
    'x-token': JWT_TOKEN,
    'x-refresh-token': JWT_REFESHTOKEN,
  },
}));

const afterwareLink = new ApolloLink((operation, forward) => forward(operation).map((response) => {
  const { response: { headers } } = operation.getContext();
  if (headers) {
    const token = headers.get('x-token');
    const refreshToken = headers.get('x-refresh-token');
    if (response.errors) {
      console.log(response.errors);
    }
    if (token) {
      AsyncStorage.setItem('token', token);
    }
    if (refreshToken) {
      AsyncStorage.setItem('refreshToken', refreshToken);
    }
  }
  return response;
}));

const httpLinkWithMiddleware = afterwareLink.concat(middlewareLink.concat(httpLink));

export const wsLink = new WebSocketLink({
  uri: 'ws://localhost:8000/subscriptions',
  options: {
    lazy: true,
    reconnect: true,
    connectionParams: () => ({
      token: JWT_TOKEN,
      refreshToken: JWT_REFESHTOKEN,
    }),
  },
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLinkWithMiddleware,
);

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'ignore',
  },
  mutate: {
    errorPolicy: 'all',
  },
};

export const client = new ApolloClient({
  link,
  defaultOptions,
  cache: new InMemoryCache(),
});

const App = () => (
  <ApolloProvider client={client}>
    <AlertHero />
  </ApolloProvider>
);

export default App;
