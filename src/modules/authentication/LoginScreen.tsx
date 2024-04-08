import {View, Text, StyleSheet, Alert, Platform} from 'react-native';
import React, {useMemo, useState} from 'react';
import {useNavigation, useTheme} from '@react-navigation/native';
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
import {AppScreensParamList, Routes} from '../../routes/RoutesParams';
import Typography from '../../shared/components/Typography';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useLazyQuery, useMutation} from '@apollo/client';
import {CreateUserDocument, GetMyUserDocument} from '../../graphql/generated';
import {firebase} from '@react-native-firebase/analytics';

const INPUT_ICON_SIZE = 20;

const LoginScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppScreensParamList>>();
  const theme = useTheme() as AppTheme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [getMyUser] = useLazyQuery(GetMyUserDocument);
  const [createUser] = useMutation(CreateUserDocument);

  const onLoginPress = async () => {
    try {
      setSubmitting(true);
      const user = await auth().signInWithEmailAndPassword(email, password);
      if (!user) {
        throw new Error('No user');
      }
      const response = await getMyUser();
      if (!response.data?.getMyUser) {
        throw new Error('No user');
      }
      await firebase.analytics().logLogin({method: 'email/password'});
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const goToSignUp = () => navigation.navigate(Routes.SIGN_UP);

  const goToForgotPassword = () => navigation.navigate(Routes.FORGOT_PASSWORD);

  const loginWithGoogle = async () => {
    try {
      console.log('called');
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const {idToken} = await GoogleSignin.signIn();
      console.log('idToken', idToken);
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      console.log('googleCredential', googleCredential);
      const credentials = await auth().signInWithCredential(googleCredential);
      const response = await getMyUser();
      if (!response.data?.getMyUser) {
        await createUser({
          variables: {
            email: credentials.user.email || '',
            name: credentials.user.displayName,
            id: credentials.user.uid,
          },
        });
      }
      await Promise.all([
        firebase.analytics().logSignUp({method: 'google'}),
        firebase.analytics().logLogin({method: 'google'}),
      ]);
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
        console.error(error);
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
          secureTextEntry
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
        <Typography style={styles.ssoAlternativeTxt}>
          Or{' '}
          <Typography style={styles.ssoAlternativeHighlightTxt}>
            Login
          </Typography>{' '}
          using social media
        </Typography>
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
