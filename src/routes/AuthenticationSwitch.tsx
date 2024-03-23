import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer, useTheme} from '@react-navigation/native';
import {AppTheme, lightTheme} from '../shared/themes/Theme';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import DashboardScreen from '../modules/dashboard/DashboardScreen';
import {AppScreensParamList, Routes} from './RoutesParams';
import {
  ForgotPasswordScreen,
  LoginScreen,
  PasswordResetConfirmationScreen,
  ResetPasswordScreen,
  SignUpScreen,
} from '../modules/authentication';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import AccountScreen from '../modules/account/AccountScreen';
import {renderTabBarIcon} from '../shared/utils/TabBarIcons';
import CommunicationSettingsScreen from '../modules/account/CommunicationSettingsScreen';
const Stack = createNativeStackNavigator<AppScreensParamList>();
const Tab = createBottomTabNavigator();

const AuthenticationSwitch = () => {
  const theme = useTheme() as AppTheme;
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  const screenDefaultOptions: BottomTabNavigationOptions = {
    headerShown: false,
    headerTintColor: theme.colors.primary,
  };

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

  const RenderTabBar = () => (
    <Tab.Navigator screenOptions={screenDefaultOptions}>
      <Tab.Screen
        options={{
          tabBarLabel: 'Today',
          tabBarIcon: renderTabBarIcon('calendar'),
        }}
        name={Routes.DASHBOARD}
        component={DashboardScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Chores',
          tabBarIcon: renderTabBarIcon('list'),
        }}
        name={Routes.CHORES_LIST}
        component={DashboardScreen}
      />
      <Tab.Screen
        name={Routes.CHAT_LIST}
        options={{
          tabBarLabel: 'Chats',
          tabBarIcon: renderTabBarIcon('commenting'),
        }}
        component={DashboardScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Family',
          tabBarIcon: renderTabBarIcon('users'),
        }}
        name={Routes.FAMILY}
        component={DashboardScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: renderTabBarIcon('user'),
        }}
        name={Routes.ACCOUNT}
        component={AccountScreen}
      />
    </Tab.Navigator>
  );

  return (
    <NavigationContainer theme={lightTheme}>
      <Stack.Navigator>
        {isSignedIn ? (
          <Stack.Group
            screenOptions={{
              headerTitle: '',
              headerBackTitle: 'Back',
              headerShadowVisible: false,
            }}>
            <Stack.Screen
              name={Routes.TAB_BAR}
              options={{headerShown: false}}
              component={RenderTabBar}
            />
            <Stack.Screen
              name={Routes.COMMUNICATION_SETTINGS}
              component={CommunicationSettingsScreen}
            />
          </Stack.Group>
        ) : (
          <Stack.Group
            screenOptions={{
              headerTitle: '',
              headerBackTitle: 'Back',
              headerShadowVisible: false,
            }}>
            <Stack.Screen name={Routes.LOGIN} component={LoginScreen} />
            <Stack.Screen name={Routes.SIGN_UP} component={SignUpScreen} />
            <Stack.Screen
              name={Routes.FORGOT_PASSWORD}
              component={ForgotPasswordScreen}
            />
            <Stack.Screen
              name={Routes.PASSWORD_RESET_CONFIRMATION}
              component={PasswordResetConfirmationScreen}
            />
            <Stack.Screen
              name={Routes.RESET_PASSWORD_WITH_CODE}
              component={ResetPasswordScreen}
            />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthenticationSwitch;
