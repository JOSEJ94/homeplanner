import {
  View,
  StyleSheet,
  Pressable,
  SectionList,
  SectionListData,
  SectionListRenderItemInfo,
  FlatList,
  ListRenderItemInfo,
  ColorValue,
} from 'react-native';
import React, {useMemo, useState} from 'react';
import {AppTheme} from '../../shared/themes/Theme';
import {
  NavigationProp,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Typography, {
  TypographyVariant,
} from '../../shared/components/Typography';
import RoomCard from './components/RoomCard';
import Icon from 'react-native-vector-icons/Ionicons';
import {AppScreensParamList, Routes} from '../../routes/RoutesParams';
import FamilyMemberCard from './components/FamilyMemberCard';
import {useQuery} from '@apollo/client';
import {
  GetGroupsDocument,
  GroupMemberFragment,
  RoomFragment,
} from '../../graphql/generated';

interface Section {
  list: RoomFragment[] | GroupMemberFragment[];
}

const HomeScreen = () => {
  const theme = useTheme() as AppTheme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const navigation = useNavigation<NavigationProp<AppScreensParamList>>();
  const [selectedRoom, setSelectedRoom] = useState<string>('');
  const {data: homeData, loading, error} = useQuery(GetGroupsDocument);

  const groups = homeData?.getGroups || [];
  const firstGroup = groups?.length ? groups[0] : undefined;
  const rooms: RoomFragment[] = firstGroup?.rooms || [];
  const members: GroupMemberFragment[] = firstGroup?.members || [];

  const renderRoom = (info: ListRenderItemInfo<RoomFragment>) => (
    <RoomCard
      key={info.item.id}
      room={info.item}
      shake={selectedRoom === info.item.id}
      onLongPress={() =>
        setSelectedRoom(selectedRoom === info.item.id ? '' : info.item.id)
      }
    />
  );

  const renderFamilyMember = (
    info: ListRenderItemInfo<GroupMemberFragment>,
  ) => <FamilyMemberCard member={info.item} />;

  const renderRoomSection = (info: SectionListRenderItemInfo<Section>) => {
    return (
      <FlatList
        style={styles.roomsContainer}
        data={info.item.list as RoomFragment[]}
        numColumns={2}
        renderItem={renderRoom}
      />
    );
  };

  const renderFamilySection = (info: SectionListRenderItemInfo<Section>) => {
    return (
      <FlatList
        data={info.item.list as GroupMemberFragment[]}
        renderItem={renderFamilyMember}
      />
    );
  };

  const sections: SectionListData<Section>[] = [
    {
      title: 'Rooms',
      key: 'Rooms',
      data: [
        {
          list: rooms,
        },
      ],
      renderItem: renderRoomSection,
    },
    {
      title: 'Family',
      key: 'Family',
      data: [
        {
          list: members,
        },
      ],
      renderItem: renderFamilySection,
    },
  ];
  const renderSectionHeader = (info: {section: SectionListData<Section>}) => {
    const navigateToEditor = () =>
      navigation.navigate(Routes.ROOM_EDITOR, {groupId: firstGroup?.id!});
    const navigateToInviteMember = () =>
      navigation.navigate(Routes.INVITE_FAMILY_MEMBER, {
        groupId: firstGroup?.id!,
      });
    const navigate =
      info.section.key === 'Rooms' ? navigateToEditor : navigateToInviteMember;

    return (
      <View style={styles.roomsHeaderContainer}>
        <Typography variant={TypographyVariant.SUB_HEADING}>
          {info.section.title}
        </Typography>
        <Pressable onPress={navigate} style={styles.addBtn}>
          <Icon
            name="add-circle-outline"
            size={25}
            color={theme.colors.primary}
          />
        </Pressable>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        style={styles.container}
        ListHeaderComponent={
          <Typography style={styles.header} variant={TypographyVariant.HEADING}>
            {firstGroup?.name}
          </Typography>
        }
        sections={sections}
        renderSectionHeader={renderSectionHeader}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    roomsHeaderContainer: {
      flexDirection: 'row',
      alignContent: 'center',
      paddingHorizontal: theme.spacing,
      backgroundColor: theme.white as ColorValue,
    },
    roomsAddBtn: {
      alignSelf: 'flex-end',
      marginLeft: theme.spacing,
    },
    addBtn: {
      alignSelf: 'flex-end',
      marginBottom: theme.spacing / 2,
      marginLeft: theme.spacing,
    },
    header: {
      paddingTop: theme.spacing,
      paddingHorizontal: theme.spacing,
    },
    roomsContainer: {
      marginVertical: theme.spacing,
    },
  });
