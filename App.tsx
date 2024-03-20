import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import LoginScreen from './src/modules/authentication/LoginScreen';
import {Routes} from './src/shared/constants/Routes';
import {lightTheme} from './src/shared/themes/Theme';

const Stack = createNativeStackNavigator();
GoogleSignin.configure();

function App(): React.JSX.Element {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  console.log('user set', user);

  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    console.log('user', user);

    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return <></>;
  return (
    <NavigationContainer theme={lightTheme}>
      <Stack.Navigator>
        <Stack.Screen name={Routes.LOGIN} component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
