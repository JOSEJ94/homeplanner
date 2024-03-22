import {ColorValue, Image, ScrollView, StyleSheet, View} from 'react-native';
import React, {useMemo} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';
import Typography, {
  TypographyVariant,
} from '../../shared/components/Typography';
import {useNavigation, useTheme} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppScreensParamList} from '../../routes/RoutesParams';
import {AppTheme} from '../../shared/themes/Theme';
import {getReadableVersion} from 'react-native-device-info';
import RoundedImage from '../../shared/components/RoundedImage';

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
        {/* TODO: List of actions to include here */}
        <Typography>Help</Typography>
        <Typography>Communications</Typography>
        <Typography>Language</Typography>
        <Typography>Appearance</Typography>
        <Typography>Legal</Typography>
        <Typography>Privacy</Typography>
        <Typography>About me</Typography>
        <Typography>Found a bug?</Typography>
        <Typography>Sign out</Typography>
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
      paddingHorizontal: theme.spacing * 2,
    },
    versionTxt: {
      color: theme.disabled as ColorValue,
    },
  });
