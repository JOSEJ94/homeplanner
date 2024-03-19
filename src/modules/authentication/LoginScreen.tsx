import {View, Text, StyleSheet} from 'react-native';
import React, {useMemo} from 'react';
import {useTheme} from '@react-navigation/native';
import TextInput from '../../shared/components/TextInput';
import {AppTheme} from '../../shared/themes/Theme';
import Button, {ButtonVariant} from '../../shared/components/Button';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

const LoginScreen = () => {
  const theme = useTheme() as AppTheme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <Text>Home Planner</Text>
      <View style={styles.informationContainer}>
        <TextInput
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
          style={styles.forgotPasswordBtn}
          title="Forgot Password?"
          variant={ButtonVariant.TERTIARY}
        />
        <Button style={styles.loginBtn} title="LOGIN" />
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
