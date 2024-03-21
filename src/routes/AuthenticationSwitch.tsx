import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {lightTheme} from '../shared/themes/Theme';
import LoginScreen from '../modules/authentication/LoginScreen';
import {Routes} from '../shared/constants/Routes';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import DashboardScreen from '../modules/dashboard/DashboardScreen';
import SignUpScreen from '../modules/authentication/SignUpScreen';
import {AppScreensParamList} from './RoutesParams';
import ForgotPassword from '../modules/authentication/ForgotPassword';

const Stack = createNativeStackNavigator<AppScreensParamList>();

const AuthenticationSwitch = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    setUser(user);
    setIsSignedIn(Boolean(user));
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return <></>;

  return (
    <NavigationContainer theme={lightTheme}>
      {isSignedIn ? (
        <Stack.Navigator>
          <Stack.Screen name={Routes.DASHBOARD} component={DashboardScreen} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name={Routes.LOGIN} component={LoginScreen} />
          <Stack.Screen
            name={Routes.SIGN_UP}
            component={SignUpScreen}
            options={{headerTitle: '', headerShadowVisible: false}}
          />
          <Stack.Screen
            name={Routes.FORGOT_PASSW0RD}
            component={ForgotPassword}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default AuthenticationSwitch;
