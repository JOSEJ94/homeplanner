import {ColorValue, Image, ScrollView, StyleSheet, View} from 'react-native';
import React, {useMemo} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';
import Typography, {
  TypographyVariant,
} from '../../shared/components/Typography';
import {useNavigation, useTheme} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Ionicon from 'react-native-vector-icons/Ionicons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {AppScreensParamList, Routes} from '../../routes/RoutesParams';
import {AppTheme} from '../../shared/themes/Theme';
import {getReadableVersion} from 'react-native-device-info';
import RoundedImage from '../../shared/components/RoundedImage';
import MenuButton from './components/MenuButton';
import {useApolloClient} from '@apollo/client';

interface Menu_Button {
  display: string;
  key: string;
  hint?: string;
  route: Routes;
  icon: React.ReactNode;
}
const ICON_SIZE = 20;
const MENU_BUTTONS: Menu_Button[] = [
  {
    key: 'help',
    display: 'Help',
    icon: <Ionicon size={ICON_SIZE} name="help-buoy" />,
    route: Routes.COMMUNICATION_SETTINGS,
  },
  {
    key: 'communications',
    display: 'Communications',
    hint: 'Manage your notification settings',
    icon: <AntDesignIcon size={ICON_SIZE} name="notification" />,
    route: Routes.COMMUNICATION_SETTINGS,
  },
  {
    key: 'language',
    display: 'Language',
    hint: 'Change the way you see things on the app',
    icon: <AntDesignIcon size={ICON_SIZE} name="earth" />,
    route: Routes.COMMUNICATION_SETTINGS,
  },
  {
    key: 'appearance',
    display: 'Appearance',
    icon: <Ionicon size={ICON_SIZE} name="help-buoy" />,
    route: Routes.COMMUNICATION_SETTINGS,
  },
  {
    key: 'legal',
    display: 'Legal',
    icon: <FontAwesomeIcon size={ICON_SIZE} name="legal" />,
    route: Routes.COMMUNICATION_SETTINGS,
  },
  {
    key: 'privacy',
    display: 'Privacy',
    icon: <AntDesignIcon size={ICON_SIZE} name="eye" />,
    route: Routes.COMMUNICATION_SETTINGS,
  },
  {
    key: 'about me',
    display: 'About me',
    icon: <AntDesignIcon size={ICON_SIZE} name="info" />,
    route: Routes.COMMUNICATION_SETTINGS,
  },
  {
    key: 'bug report',
    display: 'Found a bug?',
    icon: <FontAwesomeIcon size={ICON_SIZE} name="bug" />,
    route: Routes.COMMUNICATION_SETTINGS,
  },
];

const AccountScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppScreensParamList>>();
  const theme = useTheme() as AppTheme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const client = useApolloClient();
  const user = auth().currentUser;
  const userPhoto = user?.photoURL ?? '';
  const version = getReadableVersion();

  const onSignOutPressed = async () =>
    await Promise.all([auth().signOut(), client.cache.reset()]);

  const renderMenuButton = (menuButton: Menu_Button) => {
    // @ts-expect-error Cannot validate dynamic route type yet.
    const onMenuItemPressed = () => navigation.navigate(menuButton.route);

    return (
      <MenuButton
        key={menuButton.key}
        title={menuButton.display}
        icon={menuButton.icon}
        hint={menuButton.hint}
        onPress={onMenuItemPressed}
      />
    );
  };

  const buttons = MENU_BUTTONS.map(renderMenuButton);

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <View style={styles.profileContainer}>
        <Typography variant={TypographyVariant.HEADING}>
          {user?.displayName}
        </Typography>
        <RoundedImage sourceUri={userPhoto} />
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollviewContainer}
        showsVerticalScrollIndicator={false}>
        <View>
          {buttons}
          <MenuButton
            onPress={onSignOutPressed}
            title="Sign Out"
            titleStyle={styles.logoutTxt}
          />
        </View>
        <Typography style={styles.versionTxt}>v{version}</Typography>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AccountScreen;

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    profileContainer: {
      paddingHorizontal: theme.spacing * 2,
      paddingVertical: theme.spacing,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    profileImage: {
      borderRadius: 30,
      height: 60,
      width: 60,
    },
    scrollviewContainer: {
      justifyContent: 'space-between',
      flex: 1,
      paddingHorizontal: theme.spacing * 2,
    },
    versionTxt: {
      color: theme.disabled as ColorValue,
      marginBottom: theme.spacing * 3,
    },
    logoutTxt: {
      color: theme.error as ColorValue,
    },
  });
