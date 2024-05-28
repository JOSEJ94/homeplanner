import {
  ColorValue,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import React, {useMemo} from 'react';
import {AppTheme} from '../themes/Theme';
import {useTheme} from '@react-navigation/native';
import Typography from './Typography';
import RoundedImage from './RoundedImage';

interface PillProps extends PressableProps {
  image?: string | null;
  placeholderImage?: string;
  selected?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<ViewStyle>;
  title: string;
}

const Pill = ({
  image,
  onPress,
  placeholderImage,
  selected,
  style,
  textStyle,
  title,
  ...props
}: PillProps) => {
  const theme = useTheme() as AppTheme;
  const styles = useMemo(
    () => createStyles(theme, selected),
    [theme, selected],
  );

  return (
    <Pressable
      {...props}
      onPress={onPress}
      pointerEvents={onPress ? 'auto' : 'none'}
      hitSlop={theme.hitSlop}
      style={[styles.container, style]}>
      {(Boolean(image) || Boolean(placeholderImage)) && (
        <RoundedImage
          sourceUri={image}
          placeholderUri={placeholderImage}
          imageStyle={styles.image}
          style={styles.image}
        />
      )}
      <Typography style={[styles.text, textStyle]}>{title}</Typography>
    </Pressable>
  );
};

export default Pill;

const createStyles = (theme: AppTheme, selected?: boolean) =>
  StyleSheet.create({
    container: {
      alignSelf: 'flex-start',
      alignItems: 'center',
      borderRadius: theme.spacing * 3,
      paddingVertical: theme.spacing * 0.5,
      paddingHorizontal: theme.spacing,
      flexDirection: 'row',
      borderWidth: 1,
      backgroundColor: selected
        ? theme.colors.primary
        : (theme.white as ColorValue),
      borderColor: theme.colors.primary,
    },
    image: {
      height: 25,
      width: 25,
      borderRadius: 5,
      marginRight: theme.spacing,
    },
    text: {
      color: selected ? (theme.white as ColorValue) : theme.colors.primary,
    },
  });
