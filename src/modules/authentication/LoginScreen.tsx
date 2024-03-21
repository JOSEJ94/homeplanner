import {View, Text, StyleSheet, Alert, Platform} from 'react-native';
import React, {useMemo, useState} from 'react';
import {
  NavigationProp,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import TextInput from '../../shared/components/TextInput';
import {AppTheme} from '../../shared/themes/Theme';
import Button, {ButtonVariant} from '../../shared/components/Button';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {AppScreensParamList} from '../../routes/RoutesParams';
import {Routes} from '../../shared/constants/Routes';

const INPUT_ICON_SIZE = 20;

const LoginScreen = () => {
  const navigation = useNavigation<NavigationProp<AppScreensParamList>>();
  const theme = useTheme() as AppTheme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const onLoginPress = async () => {
    try {
      setSubmitting(true);
      const user = await auth().signInWithEmailAndPassword(email, password);
      if (!user) {
        Alert.alert('No user');
      } else {
        Alert.alert('Welcome', user?.user?.email ?? '');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const goToSignUp = () => navigation.navigate(Routes.SIGN_UP);

  const goToForgotPassword = () => navigation.navigate(Routes.FORGOT_PASSW0RD);

  const loginWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const user = auth().signInWithCredential(googleCredential);
      console.log('userInfo', user);
    } catch (error: any) {
      // TODO: Improve error handling here.
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        Alert.alert('Error', error.message);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        Alert.alert('Error', error.message);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        Alert.alert('Error', error.message);
      } else {
        // some other error happened
        Alert.alert('Error', error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text>Home Planner</Text>
      <View style={styles.informationContainer}>
        <TextInput
          testID="email-input"
          value={email}
          onChangeText={setEmail}
          containerStyle={styles.loginInput}
          placeholder="Email Address"
          keyboardType="email-address"
          textContentType="emailAddress"
          icon={
            <AntDesignIcon
              name="user"
              style={styles.icon}
              size={INPUT_ICON_SIZE}
              color={theme.colors.primary}
            />
          }
        />
        <TextInput
          testID="password-input"
          value={password}
          onChangeText={setPassword}
          containerStyle={styles.loginInput}
          placeholder="Password"
          textContentType="password"
          icon={
            <AntDesignIcon
              name="lock1"
              style={styles.icon}
              size={INPUT_ICON_SIZE}
              color={theme.colors.primary}
            />
          }
        />
        <Button
          disabled={submitting}
          style={styles.forgotPasswordBtn}
          title="Forgot Password?"
          onPress={goToForgotPassword}
          variant={ButtonVariant.TERTIARY}
        />
        <Button
          loading={submitting}
          onPress={onLoginPress}
          style={styles.loginBtn}
          title="LOGIN"
        />
        <Button
          loading={submitting}
          onPress={goToSignUp}
          title="SIGN UP"
          style={styles.loginBtn}
          variant={ButtonVariant.SECONDARY}
        />
        <Text style={styles.ssoAlternativeTxt}>
          Or <Text style={styles.ssoAlternativeHighlightTxt}>Login</Text> using
          social media
        </Text>
        <View style={styles.ssoLoginContainer}>
          <GoogleSigninButton
            onPress={loginWithGoogle}
            size={GoogleSigninButton.Size.Icon}
          />
          <Button title="Facebook" />
          {Platform.OS === 'ios' && <Button title="Apple" />}
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      backgroundColor: 'red',
      flex: 1,
    },
    informationContainer: {
      marginHorizontal: theme.spacing * 2,
      borderRadius: 10,
      padding: theme.spacing * 2,
      backgroundColor: 'white',
    },
    loginInput: {
      marginVertical: theme.spacing,
    },
    loginBtn: {
      alignSelf: 'center',
      minWidth: 150,
      marginBottom: theme.spacing,
    },
    forgotPasswordBtn: {
      marginVertical: theme.spacing * 4,
      alignSelf: 'flex-end',
    },
    icon: {
      marginRight: theme.spacing / 2,
    },
    ssoAlternativeTxt: {
      marginVertical: theme.spacing * 4,
      alignSelf: 'center',
    },
    ssoAlternativeHighlightTxt: {
      color: theme.colors.primary,
    },
    ssoLoginContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
  });
