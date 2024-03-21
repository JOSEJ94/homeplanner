import {View, StyleSheet, ScrollView} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import React, {useMemo, useState} from 'react';
import {AppTheme} from '../../shared/themes/Theme';
import {
  NavigationProp,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
import {AppScreensParamList} from '../../routes/RoutesParams';
import TextInput from '../../shared/components/TextInput';
import Typography, {
  TypographyVariant,
} from '../../shared/components/Typography';
import Button from '../../shared/components/Button';
import {SafeAreaView} from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';

const INPUT_ICON_SIZE = 20;

const SignUpScreen = () => {
  const navigation = useNavigation<NavigationProp<AppScreensParamList>>();
  const theme = useTheme() as AppTheme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const onSignUpPress = async () => {
    try {
      setSubmitting(true);
      await auth().createUserWithEmailAndPassword(email, password);
    } catch (error: any) {
    } finally {
      setSubmitting(false);
    }
  };

  const isSignUpDisabled = submitting || !email || !password;
  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewcontainer}>
        <View>
          <Typography variant={TypographyVariant.HEADING}>Sign Up</Typography>
          <Typography
            variant={TypographyVariant.BODY}
            style={styles.decorationTxt}>
            Register now and start controlling all our daily tasks!
          </Typography>
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
            secureTextEntry
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
        </View>
        <Button
          loading={submitting}
          disabled={isSignUpDisabled}
          onPress={onSignUpPress}
          title="Get Started"
          fullWidth
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;

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
    },
    icon: {
      marginRight: theme.spacing / 2,
    },
    loginInput: {
      marginVertical: theme.spacing,
    },
  });
