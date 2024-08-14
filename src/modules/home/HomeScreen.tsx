import {
  View,
  StyleSheet,
  SectionList,
  SectionListData,
  SectionListRenderItemInfo,
  FlatList,
  ListRenderItemInfo,
  ColorValue,
  Pressable,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
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
import {AppScreensParamList, Routes} from '../../routes/RoutesParams';
import FamilyMemberCard from './components/FamilyMemberCard';
import {useQuery} from '@apollo/client';
import {
  GetGroupsDocument,
  GroupMemberFragment,
  RoomFragment,
  GroupFragment,
} from '../../graphql/generated';
import {Skeleton} from 'moti/skeleton';
import AddButton from './components/AddButton';
import Spacer from '../../shared/components/Spacer';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {FilterType} from '../../shared/components/filter/Filter';
import {GET_HOME_FILTER} from '../../graphql/local/homeFilter';
import {HomeFilterDto} from '../../shared/models/HomeFilterDto';
import {selectedHomeGroupVar} from '../../shared/apollo/cache/cache';
import FontistoIcon from 'react-native-vector-icons/Fontisto';

interface Section {
  list: RoomFragment[] | GroupMemberFragment[];
}

const ICON_SIZE = 12;

const HomeScreen = () => {
  const theme = useTheme() as AppTheme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const navigation = useNavigation<NavigationProp<AppScreensParamList>>();
  const [selectedRoom, setSelectedRoom] = useState<string>('');
  const {data: homeFilter} = useQuery<{homeFilter: HomeFilterDto}>(
    GET_HOME_FILTER,
  );
  const {data: homeData, loading, error} = useQuery(GetGroupsDocument);

  const homeSelected = homeFilter?.homeFilter.selected;
  const groups: GroupFragment[] = homeData?.getGroups || [];
  const rooms: RoomFragment[] = homeSelected?.rooms || [];
  const members: GroupMemberFragment[] = homeSelected?.members || [];

  // Initial state for local selected home.
  useEffect(() => {
    if (!homeFilter?.homeFilter.selected) {
      selectedHomeGroupVar({selected: groups[0]});
    }
  }, [groups]);

  const navigateToHomeSelector = () =>
    navigation.navigate(Routes.OPTION_PICKER, {
      label: 'Select home',
      type: FilterType.SingleOption,
      options: groups,
      ctaLabel: 'Use this selection',
      selected: homeSelected,
      identityComparator: (a, b) =>
        (a as GroupFragment).id === (b as GroupFragment).id,
      onOptionSelected: selected => {
        selectedHomeGroupVar({selected: selected as GroupFragment});
      },
      renderItem: (selected, onPress, item) =>
        renderHomeOption(
          selected as GroupFragment,
          onPress,
          item as GroupFragment,
        ),
    });

  const renderHomeOption = (
    selected: GroupFragment,
    onPress: any,
    item: GroupFragment,
  ) => {
    const isSelected = selected.id === item.id;

    return (
      <Pressable
        onPress={onPress}
        style={[styles.homeGroupContainer, !isSelected && styles.unselected]}>
        <View style={styles.iconContainer}>
          {isSelected && (
            <FontistoIcon
              name="record"
              color={theme.colors.primary}
              size={ICON_SIZE}
            />
          )}
        </View>
        <Typography>{item.name}</Typography>
      </Pressable>
    );
  };

  const renderRoom = (info: ListRenderItemInfo<RoomFragment>) => (
    <RoomCard
      key={info.item.id}
      room={info.item}
      groupId={homeSelected?.id!}
      shake={selectedRoom === info.item.id}
      onLongPress={() =>
        setSelectedRoom(selectedRoom === info.item.id ? '' : info.item.id)
      }
    />
  );

  const renderFamilyMember = (
    info: ListRenderItemInfo<GroupMemberFragment>,
  ) => <FamilyMemberCard member={info.item} />;

  const renderRoomSection = (info: SectionListRenderItemInfo<Section>) => (
    <FlatList
      style={styles.roomsContainer}
      data={info.item.list as RoomFragment[]}
      numColumns={2}
      renderItem={renderRoom}
    />
  );

  const renderFamilySection = (info: SectionListRenderItemInfo<Section>) => (
    <FlatList
      data={info.item.list as GroupMemberFragment[]}
      renderItem={renderFamilyMember}
    />
  );

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
      navigation.navigate(Routes.ROOM_EDITOR, {groupId: homeSelected?.id!});
    const navigateToInviteMember = () =>
      navigation.navigate(Routes.INVITE_FAMILY_MEMBER, {
        groupId: homeSelected?.id!,
      });
    const navigate =
      info.section.key === 'Rooms' ? navigateToEditor : navigateToInviteMember;

    return (
      <View style={styles.roomsHeaderContainer}>
        <Typography variant={TypographyVariant.SUB_HEADING}>
          {info.section.title}
        </Typography>
        <Spacer style={styles.horizontalSpacer} />
        <AddButton onPress={navigate} disabled={loading} />
      </View>
    );
  };

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <Skeleton.Group show={loading}>
        <SectionList
          style={styles.container}
          ListHeaderComponent={
            <View style={styles.header}>
              <Typography
                skeletonProps={{width: 100}}
                variant={TypographyVariant.HEADING}>
                {homeSelected?.name}
              </Typography>
              {groups.length > 0 && (
                <Pressable
                  hitSlop={theme.hitSlop}
                  onPress={navigateToHomeSelector}>
                  <AntIcon name="swap" color={theme.colors.primary} size={20} />
                </Pressable>
              )}
            </View>
          }
          sections={sections}
          renderSectionHeader={renderSectionHeader}
        />
      </Skeleton.Group>
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
    horizontalSpacer: {
      width: theme.spacing,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: theme.spacing,
      paddingHorizontal: theme.spacing,
    },
    roomsContainer: {
      marginVertical: theme.spacing,
    },
    unselected: {
      opacity: 0.5,
    },
    homeGroupContainer: {
      marginVertical: theme.spacing,
      marginHorizontal: theme.spacing * 2,
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconContainer: {
      minWidth: 25,
      height: 20,
      justifyContent: 'center',
    },
  });
