import {Dimensions, StyleProp, StyleSheet, ViewStyle} from 'react-native';
import React, {useMemo} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppTheme} from '../themes/Theme';
import {useTheme} from '@react-navigation/native';
import {ViewProps} from 'react-native';

interface BottomModalProps extends ViewProps {
  modalStyle?: StyleProp<ViewStyle>;
}

const BottomModal = ({
  children,
  modalStyle,
  ...otherProps
}: BottomModalProps) => {
  const theme = useTheme() as AppTheme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <SafeAreaView
      edges={['bottom']}
      style={[styles.container, modalStyle]}
      {...otherProps}>
      {children}
    </SafeAreaView>
  );
};

export default BottomModal;

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      minHeight: Dimensions.get('window').height * 0.15,
      maxHeight: Dimensions.get('window').height * 0.8,
      position: 'absolute',
      width: '100%',
      bottom: 0,
      borderTopWidth: 1,
      borderColor: theme.colors.border,
      borderWidth: 1,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingTop: 12,
    },
  });
