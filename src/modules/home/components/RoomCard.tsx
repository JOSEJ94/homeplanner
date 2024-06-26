import {
  StyleSheet,
  Pressable,
  ColorValue,
  Dimensions,
  StyleProp,
  ViewStyle,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useMemo} from 'react';
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
import ShakeView from '../../../shared/components/ShakeView';
import {useMutation} from '@apollo/client';
import {DeleteRoomDocument, RoomFragment} from '../../../graphql/generated';
import {Skeleton} from 'moti/skeleton';

const ICON_SIZE = 35;

interface RoomCardProps {
  room: RoomFragment;
  groupId: string;
  shake?: boolean;
  style?: StyleProp<ViewStyle>;
  onLongPress?: (() => void) | null | undefined;
}

const RoomCard = ({
  room,
  groupId,
  style,
  onLongPress,
  shake = false,
}: RoomCardProps) => {
  const theme = useTheme() as AppTheme;
  const styles = useMemo(
    () => createStyles(theme, room.color),
    [theme, room.color],
  );
  const navigation = useNavigation<NavigationProp<AppScreensParamList>>();
  const [deleteRoom, {loading: removingRoom}] = useMutation(DeleteRoomDocument);

  const onCardPress = () =>
    navigation.navigate(Routes.ROOM_EDITOR, {
      id: room.id,
      groupId,
    });

  const onDeletePress = async () => {
    try {
      await deleteRoom({
        variables: {id: room.id},
      });
    } catch (error: any) {
      console.error('Error', error.message);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (shake && onLongPress) {
        onLongPress();
      }
    }, 10000);
  }, [shake]);

  return (
    <View style={styles.mainContainer}>
      {shake && (
        <Pressable
          disabled={removingRoom}
          style={styles.deleteBtn}
          onPress={onDeletePress}
          hitSlop={theme.hitSlop}>
          {removingRoom ? (
            <ActivityIndicator size="small" color={theme.error as ColorValue} />
          ) : (
            <Icon
              name="trash-o"
              size={ICON_SIZE / 2}
              color={theme.error as ColorValue}
            />
          )}
        </Pressable>
      )}
      <Pressable
        onPress={onCardPress}
        onLongPress={onLongPress}
        hitSlop={theme.hitSlop}>
        <ShakeView style={[styles.container, style]} isActive={shake}>
          <Skeleton
            width={styles.container.width}
            height={styles.container.minHeight}
            radius={styles.container.borderRadius}
            colorMode="light">
            <View style={styles.pressableContainer}>
              <Icon
                style={styles.icon}
                name={room.iconName}
                color={theme.white as ColorValue}
                size={ICON_SIZE}
              />
              <Typography
                style={styles.roomNameTxt}
                skeletonProps={{width: 0}}
                variant={TypographyVariant.CAPTION}>
                {room?.name}
              </Typography>
            </View>
          </Skeleton>
        </ShakeView>
      </Pressable>
    </View>
  );
};

export default RoomCard;

const createStyles = (theme: AppTheme, backgroundColor: string) =>
  StyleSheet.create({
    mainContainer: {
      minHeight: 110,
    },
    pressableContainer: {
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    },
    container: {
      backgroundColor,
      borderRadius: 6,
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      marginHorizontal: theme.spacing,
      marginVertical: theme.spacing,
      minHeight: 100,
      width: Dimensions.get('screen').width / 2 - theme.spacing * 2,
    },
    icon: {},
    roomNameTxt: {
      textAlign: 'center',
      color: theme.white as ColorValue,
    },
    deleteBtn: {
      position: 'absolute',
      zIndex: 1,
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: 'red',
      borderRadius: 25,
      height: 25,
      width: 25,
      alignItems: 'center',
      justifyContent: 'center',
      right: 2.5,
      top: -5,
    },
  });
