import {StyleSheet, Text, TextProps} from 'react-native';
import React, {useMemo} from 'react';
import {AppTheme} from '../themes/Theme';
import {useTheme} from '@react-navigation/native';

export enum TypographyVariant {
  BODY = 'Body',
  HEADING = 'Heading',
  CAPTION = 'Caption',
}

interface TypographyProps extends TextProps {
  variant?: TypographyVariant;
}

const Typography = ({
  children,
  variant = TypographyVariant.BODY,
  style,
  ...rest
}: TypographyProps) => {
  const theme = useTheme() as AppTheme;
  const styles = useMemo(() => createStyles(theme, variant), [theme, variant]);

  return (
    <Text {...rest} style={[styles.text, style]}>
      {children}
    </Text>
  );
};

export default Typography;

const createStyles = (theme: AppTheme, variant: TypographyVariant) =>
  StyleSheet.create({
    text: {
      ...(variant === TypographyVariant.HEADING && {
        fontSize: 34,
        fontWeight: 'bold',
      }),
      ...(variant === TypographyVariant.CAPTION && {
        fontSize: 20,
        fontWeight: 'bold',
      }),
      ...(variant === TypographyVariant.BODY && {
        fontSize: 16,
      }),
    },
  });
