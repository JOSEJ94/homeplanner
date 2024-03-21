import {View, ScrollView, StyleSheet} from 'react-native';
import React, {useMemo} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Typography, {
  TypographyVariant,
} from '../../shared/components/Typography';
import {
  RouteProp,
  useNavigation,
  useRoute,
  useTheme,
} from '@react-navigation/native';
import {AppScreensParamList, Routes} from '../../routes/RoutesParams';
import {AppTheme} from '../../shared/themes/Theme';
import Button, {ButtonVariant} from '../../shared/components/Button';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const PasswordResetConfirmationScreen = () => {
  const theme = useTheme() as AppTheme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const navigation =
    useNavigation<NativeStackNavigationProp<AppScreensParamList>>();
  const {email} = useRoute<RouteProp<AppScreensParamList>>()
    .params as AppScreensParamList[Routes.PASSWORD_RESET_CONFIRMATION];

  const goToLogin = () => navigation.popToTop();

  const goToResetPasswordWithCode = () => {
    navigation.navigate(Routes.RESET_PASSWORD_WITH_CODE);
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewcontainer}>
        <View>
          <Typography
            variant={TypographyVariant.HEADING}
            style={styles.decorationTxt}>
            Verify Email!
          </Typography>
          <Typography
            variant={TypographyVariant.BODY}
            style={styles.decorationTxt}>
            We have sent you a password reset code to your email{' '}
            <Typography style={styles.emailTxt}>{email}</Typography> that you
            can use to restablish your access.
          </Typography>
        </View>
        <View>
          <Button
            onPress={goToResetPasswordWithCode}
            title="I have got the code!"
            fullWidth
            style={styles.codeBtn}
          />
          <Button
            variant={ButtonVariant.SECONDARY}
            onPress={goToLogin}
            title="Return to Login"
            fullWidth
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PasswordResetConfirmationScreen;

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
    emailTxt: {
      fontWeight: 'bold',
    },
    codeBtn: {
      marginBottom: theme.spacing * 1.5,
    },
  });
