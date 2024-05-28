import React, {useMemo} from 'react';
import {
  View,
  TextInput as DefaultTextInput,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  StyleProp,
  ColorValue,
} from 'react-native';
import {AppTheme} from '../themes/Theme';
import {useTheme} from '@react-navigation/native';
import Typography, {TypographyProps} from './Typography';
import {Skeleton} from 'moti/skeleton';
import {MotiSkeletonProps} from 'moti/build/skeleton/types';

interface CustomTextInputProps extends TextInputProps {
  title?: string;
  icon?: React.JSX.Element;
  containerStyle?: StyleProp<ViewStyle>;
  error?: boolean;
  titleProps?: TypographyProps;
  skeletonProps?: Omit<MotiSkeletonProps, 'Gradient'>;
}

const TextInput = ({
  title,
  placeholderTextColor,
  icon,
  containerStyle,
  error,
  titleProps,
  skeletonProps,
  ...rest
}: CustomTextInputProps) => {
  const theme = useTheme() as AppTheme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const placeholderTextColorToUse = error
    ? (theme.error as ColorValue)
    : placeholderTextColor ?? theme.colors.primary;

  return (
    <View style={containerStyle}>
      {Boolean(title) && (
        <>
          <Typography {...titleProps}>{title}</Typography>
          <View style={styles.spacer} />
        </>
      )}

      <Skeleton
        colorMode="light"
        radius={styles.inputContainer.borderRadius}
        {...skeletonProps}>
        <View
          style={[
            styles.inputContainer,
            Boolean(error) && styles.inputContainerError,
            Boolean(icon) && styles.iconContainer,
          ]}>
          {icon}
          <DefaultTextInput
            style={styles.textInput}
            placeholderTextColor={placeholderTextColorToUse}
            {...rest}
          />
        </View>
      </Skeleton>
    </View>
  );
};

export default TextInput;

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    inputContainer: {
      borderRadius: 5,
      borderWidth: 1,
      borderColor: theme.colors.primary,
      padding: theme.spacing * 1.5,
      flexDirection: 'row',
      alignItems: 'center',
    },
    spacer: {
      marginBottom: theme.spacing,
    },
    inputContainerError: {
      borderColor: theme.error as ColorValue,
    },
    iconContainer: {
      paddingHorizontal: theme.spacing,
    },
    icon: {
      marginRight: theme.spacing,
    },
    textInput: {
      flex: 1,
    },
  });
