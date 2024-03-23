import {
  Pressable,
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  PressableProps,
  TextStyle,
  ColorValue,
} from 'react-native';
import React, {ReactNode, useMemo} from 'react';
import {AppTheme} from '../../../shared/themes/Theme';
import {useTheme} from '@react-navigation/native';
import Typography from '../../../shared/components/Typography';
import {Icon} from 'react-native-vector-icons/Icon';

interface MenuButtonProps extends PressableProps {
  title: string;
  titleStyle?: StyleProp<ViewStyle>;
  hint?: string;
  icon: ReactNode;
  style?: StyleProp<ViewStyle>;
  hintStyle?: StyleProp<TextStyle>;
}

const MenuButton = ({
  title,
  titleStyle,
  hint,
  icon,
  style,
  hintStyle,
  ...rest
}: MenuButtonProps) => {
  const theme = useTheme() as AppTheme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <Pressable style={[styles.container, style]} {...rest}>
      {icon}
      <View style={styles.informationContainer}>
        <Typography style={titleStyle}>{title}</Typography>
        {Boolean(hint) && <Typography style={hintStyle}>{hint}</Typography>}
      </View>
    </Pressable>
  );
};

export default MenuButton;

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      paddingVertical: theme.spacing * 2,
    },
    hintTxt: {
      color: theme.text.subtle as ColorValue,
    },
    informationContainer: {
      marginHorizontal: theme.spacing * 2,
    },
  });
