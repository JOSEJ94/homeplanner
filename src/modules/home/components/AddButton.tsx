import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import React, {useMemo} from 'react';
import {useTheme} from '@react-navigation/native';
import {AppTheme} from '../../../shared/themes/Theme';
import {Skeleton} from 'moti/skeleton';
import {MotiSkeletonProps} from 'moti/build/skeleton/types';

interface AddButtonProps extends PressableProps {
  style?: StyleProp<ViewStyle>;
  size?: number;
  skeletonProps?: Omit<MotiSkeletonProps, 'Gradient'>;
}

const AddButton = ({
  size = 25,
  onPress,
  style,
  skeletonProps,
  ...props
}: AddButtonProps) => {
  const theme = useTheme() as AppTheme;
  const styles = useMemo(() => createStyles(), []);

  return (
    <Pressable onPress={onPress} style={[styles.addBtn, style]} {...props}>
      <Skeleton colorMode="light" {...skeletonProps}>
        <Icon
          name="add-circle-outline"
          size={size}
          color={theme.colors.primary}
        />
      </Skeleton>
    </Pressable>
  );
};

export default AddButton;

const createStyles = () =>
  StyleSheet.create({
    addBtn: {
      alignSelf: 'center',
    },
  });
