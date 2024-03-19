import {
  Text,
  Pressable,
  ButtonProps,
  StyleSheet,
  ColorValue,
  StyleProp,
  ViewStyle,
} from 'react-native';
import React, {useMemo} from 'react';
import {AppTheme} from '../themes/Theme';
import {useTheme} from '@react-navigation/native';

export enum ButtonVariant {
  PRIMARY = 'Primary',
  SECONDARY = 'Secondary',
  TERTIARY = 'Tertiary',
}

interface CustomButtonProps extends ButtonProps {
  variant?: ButtonVariant;
  style?: StyleProp<ViewStyle>;
  fullWidth?: boolean;
}

const Button = ({
  variant = ButtonVariant.PRIMARY,
  title,
  onPress,
  style,
  fullWidth = false,
  ...rest
}: CustomButtonProps) => {
  const theme = useTheme() as AppTheme;
  const styles = useMemo(
    () => createStyles(theme, variant, fullWidth),
    [theme, variant, fullWidth],
  );

  return (
    <Pressable {...rest} style={[styles.container, style]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

export default Button;

const createStyles = (
  theme: AppTheme,
  variant: ButtonVariant,
  fullWidth: boolean,
) =>
  StyleSheet.create({
    container: {
      ...(!fullWidth && {
        alignSelf: 'flex-start',
      }),
      borderRadius: 25,
      borderWidth: 1,
      borderColor: 'transparent',
      ...(variant === ButtonVariant.PRIMARY && {
        minWidth: 100,
        backgroundColor: theme.colors.primary,
        paddingVertical: theme.spacing,
        paddingHorizontal: theme.spacing * 2,
        justifyContent: 'center',
        alignItems: 'center',
      }),
      ...(variant === ButtonVariant.SECONDARY && {
        borderColor: theme.colors.primary,
        paddingVertical: theme.spacing,
        paddingHorizontal: theme.spacing * 2,
        justifyContent: 'center',
        alignItems: 'center',
      }),
      ...(variant === ButtonVariant.TERTIARY && {
        color: theme.colors.primary,
      }),
    },
    text: {
      ...(variant === ButtonVariant.PRIMARY && {
        color: theme.white as ColorValue,
      }),
      ...(variant === ButtonVariant.SECONDARY && {
        color: theme.colors.primary as ColorValue,
      }),
      ...(variant === ButtonVariant.TERTIARY && {
        color: theme.colors.primary as ColorValue,
      }),
    },
  });
