import {
  Text,
  Pressable,
  ButtonProps,
  StyleSheet,
  ColorValue,
  StyleProp,
  ViewStyle,
  ActivityIndicator,
} from 'react-native';
import React, {useMemo} from 'react';
import {AppTheme} from '../themes/Theme';
import {useTheme} from '@react-navigation/native';
import {Skeleton} from 'moti/skeleton';
import {convertHexToRGBA} from '../utils/Color.utils';

export enum ButtonVariant {
  PRIMARY = 'Primary',
  SECONDARY = 'Secondary',
  TERTIARY = 'Tertiary',
}

interface CustomButtonProps extends ButtonProps {
  variant?: ButtonVariant;
  style?: StyleProp<ViewStyle>;
  fullWidth?: boolean;
  loading?: boolean;
}

const Button = ({
  variant = ButtonVariant.PRIMARY,
  title,
  onPress,
  style,
  loading,
  disabled = false,
  fullWidth = false,
  ...rest
}: CustomButtonProps) => {
  const theme = useTheme() as AppTheme;
  const styles = useMemo(
    () => createStyles(theme, variant, fullWidth, disabled),
    [theme, variant, fullWidth, disabled],
  );

  return (
    <Skeleton colorMode="light" radius={styles.container.borderRadius}>
      <Pressable
        hitSlop={theme.hitSlop}
        {...rest}
        disabled={loading || disabled}
        style={({pressed}) => [
          styles.container,
          pressed && {
            backgroundColor: convertHexToRGBA(
              styles.container.backgroundColor,
              0.8,
            ),
          },
          style,
        ]}
        onPress={onPress}>
        {loading ? (
          <ActivityIndicator size="small" color={theme.colors.primary} />
        ) : (
          <Text style={styles.text}>{title}</Text>
        )}
      </Pressable>
    </Skeleton>
  );
};

export default Button;

const createStyles = (
  theme: AppTheme,
  variant: ButtonVariant,
  fullWidth: boolean,
  disabled: boolean,
) =>
  StyleSheet.create({
    container: {
      ...(!fullWidth && {
        alignSelf: 'flex-start',
      }),
      borderRadius: 25,
      borderWidth: 1,
      borderColor: 'transparent',
      alignItems: 'center',
      ...(variant === ButtonVariant.PRIMARY && {
        minWidth: 100,
        backgroundColor: disabled
          ? (theme.disabled as ColorValue)
          : theme.colors.primary,
        paddingVertical: theme.spacing,
        paddingHorizontal: theme.spacing * 2,
        justifyContent: 'center',
      }),
      ...(variant === ButtonVariant.SECONDARY && {
        borderColor: disabled
          ? (theme.disabled as ColorValue)
          : theme.colors.primary,
        paddingVertical: theme.spacing,
        paddingHorizontal: theme.spacing * 2,
        justifyContent: 'center',
      }),
      ...(variant === ButtonVariant.TERTIARY && {
        color: disabled ? (theme.disabled as ColorValue) : theme.colors.primary,
      }),
    },
    text: {
      ...(variant === ButtonVariant.PRIMARY && {
        color: theme.white as ColorValue,
      }),
      ...(variant === ButtonVariant.SECONDARY && {
        color: disabled ? (theme.disabled as ColorValue) : theme.colors.primary,
      }),
      ...(variant === ButtonVariant.TERTIARY && {
        color: disabled ? (theme.disabled as ColorValue) : theme.colors.primary,
      }),
    },
  });
