import {View, ScrollView, StyleSheet} from 'react-native';
import React, {useMemo, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {SafeAreaView} from 'react-native-safe-area-context';
import Typography, {
  TypographyVariant,
} from '../../shared/components/Typography';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {INPUT_ICON_SIZE} from '../../shared/constants/Constants';
import {useNavigation, useTheme} from '@react-navigation/native';
import {AppScreensParamList, Routes} from '../../routes/RoutesParams';
import {AppTheme} from '../../shared/themes/Theme';
import TextInput from '../../shared/components/TextInput';
import Button, {ButtonVariant} from '../../shared/components/Button';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const ForgotPassword = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppScreensParamList>>();
  const theme = useTheme() as AppTheme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const requestPasswordReset = async () => {
    try {
      setSubmitting(true);
      await auth().sendPasswordResetEmail(email);
      navigation.replace(Routes.PASSWORD_RESET_CONFIRMATION, {email});
    } catch (error: any) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const goToSignUp = () => navigation.navigate(Routes.SIGN_UP);

  const isPasswordResetRequestButtonDisabled = submitting || !email;
  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewcontainer}>
        <View>
          <Typography
            variant={TypographyVariant.HEADING}
            style={styles.decorationTxt}>
            Forgot Password?
          </Typography>
          <Typography
            variant={TypographyVariant.BODY}
            style={styles.decorationTxt}>
            Do not worry! We will help you recover your password.
          </Typography>
          <Typography
            variant={TypographyVariant.BODY}
            style={styles.instructionsTxt}>
            Just enter your email and you will be some steps away from get
            access again.
          </Typography>
          <TextInput
            testID="email-input"
            value={email}
            onChangeText={setEmail}
            containerStyle={styles.emailInput}
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
        </View>
        <View>
          <Button
            disabled={submitting}
            onPress={goToSignUp}
            title="Don't have account? Sign Up"
            variant={ButtonVariant.TERTIARY}
            style={styles.signUpBtn}
          />
          <Button
            loading={submitting}
            disabled={isPasswordResetRequestButtonDisabled}
            onPress={requestPasswordReset}
            title="Request Password Reset"
            fullWidth
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgotPassword;

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollViewcontainer: {
      padding: theme.spacing * 2,
      flex: 1,
      justifyContent: 'space-between',
    },
    decorationTxt: {
      marginVertical: theme.spacing,
      textAlign: 'center',
    },
    instructionsTxt: {
      marginTop: theme.spacing * 3,
    },
    icon: {
      marginRight: theme.spacing / 2,
    },
    signUpBtn: {
      alignSelf: 'center',
      marginBottom: theme.spacing * 1.5,
    },
    emailInput: {
      marginVertical: theme.spacing,
    },
  });
