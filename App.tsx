import React from 'react';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import AuthenticationSwitch from './src/routes/AuthenticationSwitch';

GoogleSignin.configure();
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
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
