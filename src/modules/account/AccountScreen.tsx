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
import {AppScreensParamList} from '../../routes/RoutesParams';
import {AppTheme} from '../../shared/themes/Theme';
import {getReadableVersion} from 'react-native-device-info';
import RoundedImage from '../../shared/components/RoundedImage';
import MenuButton from './components/MenuButton';

const AccountScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppScreensParamList>>();
  const theme = useTheme() as AppTheme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const user = auth().currentUser;
  const userPhoto = user?.photoURL ?? '';
  const version = getReadableVersion();

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <View style={styles.profileContainer}>
        <Typography variant={TypographyVariant.HEADING}>
          {user?.displayName}
        </Typography>
        <RoundedImage source={{uri: userPhoto}} />
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollviewContainer}
        showsVerticalScrollIndicator={false}>
        <View>
          <MenuButton
            title="Help"
            icon={<Ionicon size={20} name="help-buoy" />}
          />
          <MenuButton
            title="Communications"
            icon={<Ionicon size={20} name="help-buoy" />}
          />
          <MenuButton
            title="Language"
            icon={<AntDesignIcon size={20} name="earth" />}
          />
          <MenuButton
            title="Appearance"
            icon={<Ionicon size={20} name="help-buoy" />}
          />
          <MenuButton
            title="Legal"
            icon={<FontAwesomeIcon size={20} name="legal" />}
          />
          <MenuButton
            title="Privacy"
            icon={<AntDesignIcon size={20} name="eye" />}
          />
          <MenuButton
            title="About me"
            icon={<AntDesignIcon size={20} name="info" />}
          />
          <MenuButton
            title="Found a bug?"
            icon={<FontAwesomeIcon size={20} name="bug" />}
          />
          <MenuButton
            title="Sign Out"
            icon={<Ionicon size={20} name="help-buoy" />}
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
  });
