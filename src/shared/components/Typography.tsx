import {StyleSheet, Text, TextProps} from 'react-native';
import React, {useMemo} from 'react';
import {AppTheme} from '../themes/Theme';
import {useTheme} from '@react-navigation/native';
import {Skeleton} from 'moti/skeleton';
import {MotiSkeletonProps} from 'moti/build/skeleton/types';

export enum TypographyVariant {
  BODY = 'Body',
  CAPTION = 'Caption',
  HEADING = 'Heading',
  SUB_HEADING = 'Sub Heading',
}

export interface TypographyProps extends TextProps {
  variant?: TypographyVariant;
  skeletonProps?: Omit<MotiSkeletonProps, 'Gradient'>;
}

const Typography = ({
  children,
  variant = TypographyVariant.BODY,
  style,
  skeletonProps,
  ...rest
}: TypographyProps) => {
  const theme = useTheme() as AppTheme;
  const styles = useMemo(() => createStyles(theme, variant), [theme, variant]);

  return (
    <Skeleton colorMode="light" {...skeletonProps}>
      <Text {...rest} style={[styles.text, style]}>
        {children}
      </Text>
    </Skeleton>
  );
};

export default Typography;

const createStyles = (theme: AppTheme, variant: TypographyVariant) =>
  StyleSheet.create({
    text: {
      alignSelf: 'flex-start',
      fontFamily: 'Roboto-Regular',
      ...(variant === TypographyVariant.HEADING && {
        fontSize: 34,
        fontWeight: 'bold',
      }),
      ...(variant === TypographyVariant.SUB_HEADING && {
        fontSize: 30,
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
