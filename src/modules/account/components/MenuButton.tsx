import {
  Pressable,
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  PressableProps,
  TextStyle,
} from 'react-native';
import React, {ReactNode, useMemo} from 'react';
import {AppTheme} from '../../../shared/themes/Theme';
import {useTheme} from '@react-navigation/native';
import Typography from '../../../shared/components/Typography';

interface MenuButtonProps extends PressableProps {
  title: string;
  titleStyle?: StyleProp<TextStyle>;
  hint?: string;
  icon?: ReactNode;
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
      <View style={styles.icon}>{icon}</View>
      <View style={styles.informationContainer}>
        <Typography style={[styles.titleTxt, titleStyle]}>{title}</Typography>
        {Boolean(hint) && (
          <Typography style={[styles.hintTxt, hintStyle]}>{hint}</Typography>
        )}
      </View>
    </Pressable>
  );
};

export default MenuButton;

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: theme.spacing * 2,
    },
    titleTxt: {
      fontWeight: '500',
    },
    hintTxt: {
      fontSize: 14,
      fontWeight: '200',
    },
    icon: {
      minWidth: 20,
    },
    informationContainer: {
      marginHorizontal: theme.spacing * 2,
    },
  });
