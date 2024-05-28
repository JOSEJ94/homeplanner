import {ColorValue, Pressable, StyleSheet, View} from 'react-native';
import React, {useMemo} from 'react';
import {useTheme} from '@react-navigation/native';
import {AppTheme} from '../themes/Theme';
import Pill from './Pill';
import Typography, {TypographyProps} from './Typography';

interface PillInputProps<T> {
  data: T[];
  error?: boolean;
  extractImage?: (item: T) => string | null | undefined;
  extractLabel: (item: T) => string;
  onPress?: () => void;
  placeholderImage?: string;
  placeholderText?: string;
  placeholderTextColor?: ColorValue;
  title?: string;
  titleProps?: TypographyProps;
}

const PillInput = <T,>({
  data = [],
  error,
  extractImage = () => '',
  extractLabel = () => 'Pill',
  onPress,
  placeholderImage,
  placeholderText = 'Please select a value',
  placeholderTextColor,
  title,
  titleProps,
}: PillInputProps<T>) => {
  const theme = useTheme() as AppTheme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const items = useMemo(
    () =>
      data.map(item => (
        <Pill
          selected
          title={extractLabel(item)}
          image={extractImage(item)}
          placeholderImage={placeholderImage}
          style={styles.pillContainer}
        />
      )),
    [data, extractLabel, extractImage],
  );
  const placeholderTextColorToUse = error
    ? (theme.error as ColorValue)
    : placeholderTextColor ?? theme.colors.primary;

  return (
    <View>
      {Boolean(title) && (
        <>
          <Typography {...titleProps}>{title}</Typography>
          <View style={styles.spacer} />
        </>
      )}
      <Pressable
        hitSlop={theme.hitSlop}
        pointerEvents={onPress ? 'auto' : 'none'}
        style={styles.inputContainer}
        onPress={onPress}>
        {!items.length && (
          <Typography
            style={[styles.placeholderTxt, {color: placeholderTextColorToUse}]}>
            {placeholderText}
          </Typography>
        )}
        {items}
      </Pressable>
    </View>
  );
};

export default PillInput;

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    inputContainer: {
      borderRadius: 5,
      borderWidth: 1,
      borderColor: theme.colors.primary,
      padding: theme.spacing * 0.5,
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    placeholderTxt: {
      marginVertical: theme.spacing * 0.75,
      marginHorizontal: theme.spacing,
      fontSize: 14,
    },
    pillContainer: {
      margin: theme.spacing / 4,
    },
    spacer: {
      marginBottom: theme.spacing,
    },
  });
