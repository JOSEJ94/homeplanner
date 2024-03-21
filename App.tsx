import React from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import AuthenticationSwitch from './src/routes/AuthenticationSwitch';

GoogleSignin.configure();

function App(): React.JSX.Element {
  return <AuthenticationSwitch />;
}

export default App;
