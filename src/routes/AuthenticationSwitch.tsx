import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  NavigationContainer,
  NavigationContainerRef,
  useTheme,
} from '@react-navigation/native';
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
import HomeScreen from '../modules/home/HomeScreen';
import RoomEditor from '../modules/home/RoomEditor';
import ColorPicker from '../shared/modules/ColorPicker';
import IconPicker from '../shared/modules/IconPicker';
import InviteFamilyMember from '../modules/home/InviteFamilyMember';
import {firebase} from '@react-native-firebase/analytics';
import TaskListScreen from '../modules/templates/TaskTemplateListScreen';
import TaskEditorScreen from '../modules/templates/TaskTemplateEditorScreen';
import InvitationModal from '../modules/modal/InvitationModal';
import {useLazyQuery} from '@apollo/client';
import {GetInvitationsDocument} from '../graphql/generated';
import ErrorModal from '../modules/modal/ErrorModal';
import RoomPicker from '../shared/components/filter/Filter';

const Stack = createNativeStackNavigator<AppScreensParamList>();
const Tab = createBottomTabNavigator();

const AuthenticationSwitch = () => {
  const theme = useTheme() as AppTheme;
  const routeNameRef = React.useRef<string>(null);
  const navigationRef =
    React.useRef<NavigationContainerRef<AppScreensParamList>>(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [getInvitations] = useLazyQuery(GetInvitationsDocument);

  const screenDefaultOptions: BottomTabNavigationOptions = {
    headerShown: false,
    headerTintColor: theme.colors.primary,
  };

  const onAuthStateChanged = async (user: FirebaseAuthTypes.User | null) => {
    setIsSignedIn(Boolean(user));
    try {
      console.log('Access token', await user?.getIdToken());
      if (Boolean(user)) {
        const {data: invitationsData} = await getInvitations();
        if (invitationsData?.getInvitations.length) {
          navigationRef.current?.navigate(Routes.INVITATION_RECEIVED_MODAL);
        }
      }
    } catch (error) {
      console.error('Error', error);
    }
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
          tabBarLabel: 'Templates',
          tabBarIcon: renderTabBarIcon('list'),
          headerShown: true,
          headerTitle: 'Task Templates',
        }}
        name={Routes.CHORES_LIST}
        component={TaskListScreen}
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
          tabBarLabel: 'Home',
          tabBarIcon: renderTabBarIcon('home'),
        }}
        name={Routes.FAMILY}
        component={HomeScreen}
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
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        // @ts-expect-error "Cannot" assigned "read-only" property
        routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name;
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;

        if (previousRouteName !== currentRouteName) {
          await firebase.analytics().logScreenView({
            screen_name: currentRouteName,
            screen_class: currentRouteName,
          });
        }
        // @ts-expect-error "Cannot" assigned "read-only" property
        routeNameRef.current = currentRouteName;
      }}
      theme={lightTheme}>
      <Stack.Navigator>
        {isSignedIn ? (
          <>
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
              <Stack.Screen name={Routes.ROOM_EDITOR} component={RoomEditor} />
              <Stack.Screen
                name={Routes.TASK_EDITOR}
                component={TaskEditorScreen}
              />
              <Stack.Screen
                name={Routes.INVITE_FAMILY_MEMBER}
                component={InviteFamilyMember}
              />
            </Stack.Group>
            <Stack.Group
              screenOptions={{
                animation: 'slide_from_bottom',
                presentation: 'containedModal',
              }}>
              <Stack.Screen
                name={Routes.COLOR_PICKER}
                component={ColorPicker}
              />
              <Stack.Screen name={Routes.ICON_PICKER} component={IconPicker} />
            </Stack.Group>
            <Stack.Group
              screenOptions={{
                headerShown: false,
                presentation: 'transparentModal',
              }}>
              <Stack.Screen
                name={Routes.OPTION_PICKER}
                component={RoomPicker}
              />
              <Stack.Screen
                name={Routes.INVITATION_RECEIVED_MODAL}
                component={InvitationModal}
              />
              <Stack.Screen name={Routes.ERROR_MODAL} component={ErrorModal} />
            </Stack.Group>
          </>
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
