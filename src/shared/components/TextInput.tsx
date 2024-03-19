import React, {useMemo} from 'react';
import {
  View,
  Text,
  TextInput as DefaultTextInput,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  StyleProp,
  ColorValue,
} from 'react-native';
import {AppTheme} from '../themes/Theme';
import {useTheme} from '@react-navigation/native';

interface CustomTextInputProps extends TextInputProps {
  title?: string;
  icon?: React.JSX.Element;
  containerStyle?: StyleProp<ViewStyle>;
  error?: boolean;
}

const TextInput = ({
  title,
  placeholderTextColor,
  icon,
  containerStyle,
  error,
  ...rest
}: CustomTextInputProps) => {
  const theme = useTheme() as AppTheme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const placeholderTextColorToUse = error
    ? (theme.error as ColorValue)
    : placeholderTextColor ?? theme.colors.primary;

  return (
    <View style={containerStyle}>
      {Boolean(title) && <Text>{title}</Text>}
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
