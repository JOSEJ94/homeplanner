import {Animated, Pressable, StyleSheet, View} from 'react-native';
import React, {useEffect, useMemo} from 'react';
import {AppTheme} from '../../shared/themes/Theme';
import {
  RouteProp,
  useNavigation,
  useRoute,
  useTheme,
} from '@react-navigation/native';
import Typography, {
  TypographyVariant,
} from '../../shared/components/Typography';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppScreensParamList, Routes} from '../../routes/RoutesParams';
import Button, {ButtonVariant} from '../../shared/components/Button';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const ErrorModal = () => {
  const theme = useTheme() as AppTheme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const navigation =
    useNavigation<
      NativeStackNavigationProp<AppScreensParamList, Routes.ERROR_MODAL>
    >();
  const route = useRoute<RouteProp<AppScreensParamList, Routes.ERROR_MODAL>>();
  const {message, title, onPress} = route.params;

  const localOnPress = () => {
    navigation.goBack();
    if (onPress) {
      onPress();
    }
  };

  const fadeAnimation = new Animated.Value(0);
  useEffect(() => {
    Animated.timing(fadeAnimation, {
      toValue: 0.5,
      duration: 500,
      useNativeDriver: false,
      delay: 250,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <AnimatedPressable
        onPress={navigation.goBack}
        style={[
          styles.overlay,
          {
            opacity: fadeAnimation,
          },
        ]}
      />
      <View style={styles.windowContainer}>
        <Typography variant={TypographyVariant.CAPTION}>{title}</Typography>
        <Typography variant={TypographyVariant.BODY} style={styles.contentTxt}>
          {message}
        </Typography>
        <View style={styles.buttonContainer}>
          <Button
            onPress={localOnPress}
            title="Ok"
            variant={ButtonVariant.SECONDARY}
          />
        </View>
      </View>
    </View>
  );
};

export default ErrorModal;

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: theme.background.card,
    },
    windowContainer: {
      maxWidth: '80%',
      backgroundColor: theme.colors.card,
      borderRadius: 15,
      padding: theme.spacing * 2,
    },
    buttonContainer: {
      marginTop: theme.spacing * 2,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    contentTxt: {
      marginTop: theme.spacing,
    },
  });
