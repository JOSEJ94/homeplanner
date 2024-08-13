import {
  ActivityIndicator,
  ColorValue,
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

export interface CheckboxProps extends PressableProps {
  color?: ColorValue;
  containerStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  emptyIcon?: string;
  fullIcon?: string;
  hint?: string;
  loading?: boolean;
  selected?: boolean;
  size?: number;
  title?: string;
  unselectedColor?: ColorValue;
}

const Checkbox = ({
  color,
  containerStyle,
  disabled,
  emptyIcon = 'checkbox-blank-outline',
  fullIcon = 'checkbox-marked',
  hint,
  loading,
  selected,
  size = 20,
  title,
  unselectedColor,
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
      {loading ? (
        <ActivityIndicator size={size} color={theme.colors.primary} />
      ) : (
        <Pressable
          hitSlop={theme.hitSlop}
          style={(Boolean(title) || Boolean(hint)) && styles.iconContainer}
          {...rest}>
          <MaterialIcon
            color={(selected ? color : unselectedColor) ?? theme.colors.primary}
            name={selected ? fullIcon : emptyIcon}
            size={size}
          />
        </Pressable>
      )}
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
