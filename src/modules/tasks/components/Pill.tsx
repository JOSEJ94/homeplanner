import {
  ColorValue,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import React, {useMemo} from 'react';
import {AppTheme} from '../../../shared/themes/Theme';
import {useTheme} from '@react-navigation/native';
import Typography from '../../../shared/components/Typography';

interface PillProps extends PressableProps {
  title: string;
  selected?: boolean;
  textStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
}

const Pill = ({title, selected, textStyle, style, ...props}: PillProps) => {
  const theme = useTheme() as AppTheme;
  const styles = useMemo(
    () => createStyles(theme, selected),
    [theme, selected],
  );

  return (
    <Pressable
      {...props}
      hitSlop={theme.hitSlop}
      style={[styles.container, style]}>
      <Typography style={[styles.text, textStyle]}>{title}</Typography>
    </Pressable>
  );
};

export default Pill;

const createStyles = (theme: AppTheme, selected?: boolean) =>
  StyleSheet.create({
    container: {
      alignSelf: 'flex-start',
      alignItems: 'flex-start',
      borderRadius: theme.spacing * 2,
      paddingVertical: theme.spacing * 0.5,
      paddingHorizontal: theme.spacing,
      borderWidth: 1,
      backgroundColor: selected
        ? theme.colors.primary
        : (theme.white as ColorValue),
      borderColor: theme.colors.primary,
    },
    text: {
      color: selected ? (theme.white as ColorValue) : theme.colors.primary,
    },
  });
