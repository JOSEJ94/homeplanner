import {View, Text, StyleSheet, Alert} from 'react-native';
import React, {useMemo, useState} from 'react';
import {useTheme} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import TextInput from '../../shared/components/TextInput';
import {AppTheme} from '../../shared/themes/Theme';
import Button, {ButtonVariant} from '../../shared/components/Button';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

const LoginScreen = () => {
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
              size={20}
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
              size={20}
              color={theme.colors.primary}
            />
          }
        />
        <Button
          disabled={submitting}
          style={styles.forgotPasswordBtn}
          title="Forgot Password?"
          variant={ButtonVariant.TERTIARY}
        />
        <Button
          loading={submitting}
          onPress={onLoginPress}
          style={styles.loginBtn}
          title="LOGIN"
        />
        <Text style={styles.ssoAlternativeTxt}>
          Or <Text style={styles.ssoAlternativeHighlightTxt}>Login</Text> using
          social media
        </Text>
        <View style={styles.ssoLoginContainer}>
          <Button title="Google" />
          <Button title="Facebook" />
          <Button title="Apple" />
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
