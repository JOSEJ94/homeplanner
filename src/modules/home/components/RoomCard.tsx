import {
  StyleSheet,
  Pressable,
  ColorValue,
  Dimensions,
  StyleProp,
  ViewStyle,
} from 'react-native';
import React, {useMemo} from 'react';
import {AppTheme} from '../../../shared/themes/Theme';
import {
  NavigationProp,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
import Typography, {
  TypographyVariant,
} from '../../../shared/components/Typography';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AppScreensParamList, Routes} from '../../../routes/RoutesParams';
import {RoomDto} from '../../../shared/models/RoomDto';

const ICON_SIZE = 35;

interface RoomCardProps {
  room: RoomDto;
  style?: StyleProp<ViewStyle>;
}

const RoomCard = ({room, style}: RoomCardProps) => {
  const theme = useTheme() as AppTheme;
  const styles = useMemo(
    () => createStyles(theme, room.color),
    [theme, room.color],
  );
  const navigation = useNavigation<NavigationProp<AppScreensParamList>>();

  const onCardPress = () =>
    navigation.navigate(Routes.ROOM_EDITOR, {id: room.id});

  return (
    <Pressable onPress={onCardPress} style={[styles.container, style]}>
      <Icon
        style={styles.icon}
        name={room.iconName}
        color={theme.white as ColorValue}
        size={ICON_SIZE}
      />
      <Typography
        style={styles.roomNameTxt}
        variant={TypographyVariant.CAPTION}>
        {room?.name}
      </Typography>
    </Pressable>
  );
};

export default RoomCard;

const createStyles = (theme: AppTheme, backgroundColor: string) =>
  StyleSheet.create({
    container: {
      padding: theme.spacing,
      backgroundColor,
      borderRadius: 6,
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      marginHorizontal: theme.spacing,
      marginVertical: theme.spacing / 2,
      minHeight: 100,
      maxWidth: Dimensions.get('screen').width / 2 - theme.spacing * 2,
    },
    icon: {},
    roomNameTxt: {
      textAlign: 'center',
      color: theme.white as ColorValue,
    },
  });
