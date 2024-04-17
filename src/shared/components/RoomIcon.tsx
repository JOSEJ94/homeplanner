import {
  View,
  ColorValue,
  StyleSheet,
  ViewProps,
  Dimensions,
} from 'react-native';
import React, {useMemo} from 'react';
import {Room} from '../../graphql/generated';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {AppTheme} from '../themes/Theme';
import {useTheme} from '@react-navigation/native';

interface RoomIconProps extends ViewProps {
  room: Room;
  size?: number;
}

const RoomIcon = ({room, size, style, ...props}: RoomIconProps) => {
  const theme = useTheme() as AppTheme;
  const styles = useMemo(() => createStyles(theme, room.color), [room.color]);

  return (
    <View {...props} style={[styles.container, style]}>
      <FontAwesomeIcon
        name={room.iconName}
        size={size || styles.container.width * 0.7}
        color="white"
      />
    </View>
  );
};

export default RoomIcon;

const createStyles = (theme: AppTheme, accentColor: ColorValue) =>
  StyleSheet.create({
    container: {
      backgroundColor: accentColor,
      justifyContent: 'center',
      alignItems: 'center',
      height: undefined,
      width: Dimensions.get('window').width * 0.16,
      aspectRatio: 1,
      borderRadius: 8,
    },
  });
