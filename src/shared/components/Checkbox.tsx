import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import React, {useMemo} from 'react';
import Typography, {TypographyVariant} from './Typography';
import {AppTheme} from '../themes/Theme';
import {useTheme} from '@react-navigation/native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

interface CheckboxProps extends PressableProps {
  disabled?: boolean;
  title?: string;
  hint?: string;
  selected?: boolean;
  size?: number;
  containerStyle?: StyleProp<ViewStyle>;
}

const Checkbox = ({
  disabled,
  selected,
  hint,
  title,
  size = 20,
  containerStyle,
  ...rest
}: CheckboxProps) => {
  const theme = useTheme() as AppTheme;
  const styles = useMemo(
    () => createStyles(theme, disabled),
    [theme, disabled],
  );

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.textContainer}>
        <Typography variant={TypographyVariant.CAPTION}>{title}</Typography>
        <Typography>{hint}</Typography>
      </View>
      <Pressable hitSlop={theme.hitSlop} style={styles.iconContainer} {...rest}>
        <MaterialIcon
          color={theme.colors.primary}
          name={selected ? 'checkbox-marked' : 'checkbox-blank-outline'}
          size={size}
        />
      </Pressable>
    </View>
  );
};

export default Checkbox;

const createStyles = (theme: AppTheme, disabled?: boolean) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    textContainer: {
      flex: 1,
    },
    iconContainer: {
      marginLeft: theme.spacing,
    },
  });
