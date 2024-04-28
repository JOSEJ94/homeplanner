import React from 'react';
import {ApolloClient, ApolloProvider, createHttpLink} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {firebase} from '@react-native-firebase/auth';
import AuthenticationSwitch from './src/routes/AuthenticationSwitch';
import Config from 'react-native-config';
import {cache} from './src/shared/apollo/cache/cache';
import {loadErrorMessages, loadDevMessages} from '@apollo/client/dev';

GoogleSignin.configure({
  webClientId: Config.RN_GOOGLE_CLIENT_ID,
});

if (__DEV__) {
  console.info('Apollo client debug mode enabled');
  loadDevMessages();
  loadErrorMessages();
}

const authLink = setContext(async (_, {headers}) => {
  try {
    const authToken = await firebase.auth().currentUser?.getIdToken();
    return {
      headers: {
        ...headers,
        authorization: authToken ? `Bearer ${authToken}` : '',
      },
    };
  } catch (error) {
    console.error('Error', error);

    return {
      ...headers,
    };
  }
});

const httpLink = createHttpLink({
  uri: Config.RN_API_URL,
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: cache,
});

function App(): React.JSX.Element {
  return (
    <ApolloProvider client={client}>
      <AuthenticationSwitch />
    </ApolloProvider>
  );
}

export default App;
