import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {firebase} from '@react-native-firebase/auth';
import AuthenticationSwitch from './src/routes/AuthenticationSwitch';
import Config from 'react-native-config';

GoogleSignin.configure({
  webClientId: Config.RN_GOOGLE_CLIENT_ID,
});

const authLink = setContext(async (_, {headers}) => {
  const authToken = await firebase.auth().currentUser?.getIdToken();
  return {
    headers: {
      ...headers,
      authorization: authToken ? `Bearer ${authToken}` : '',
    },
  };
});

const httpLink = createHttpLink({
  uri: Config.RN_API_URL,
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App(): React.JSX.Element {
  return (
    <ApolloProvider client={client}>
      <AuthenticationSwitch />
    </ApolloProvider>
  );
}

export default App;
