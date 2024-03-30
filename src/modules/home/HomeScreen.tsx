import {
  View,
  StyleSheet,
  Pressable,
  SectionList,
  SectionListData,
  SectionListRenderItemInfo,
  FlatList,
  ListRenderItemInfo,
} from 'react-native';
import React, {useMemo} from 'react';
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
import {RoomDto} from '../../shared/models/RoomDto';
import {IconType} from '../../shared/modules/IconPicker';
import FamilyMemberCard from './components/FamilyMemberCard';
import {FamilyMemberDto} from '../../shared/models/FamilyMemberDto';

interface Section {
  list: RoomDto[] | FamilyMemberDto[];
}

const HomeScreen = () => {
  const theme = useTheme() as AppTheme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const navigation = useNavigation<NavigationProp<AppScreensParamList>>();

  const renderRoom = (info: ListRenderItemInfo<RoomDto>) => (
    <RoomCard room={info.item} />
  );

  const renderFamilyMember = (info: ListRenderItemInfo<FamilyMemberDto>) => (
    <FamilyMemberCard familyMember={info.item} />
  );

  const renderRoomSection = (info: SectionListRenderItemInfo<Section>) => {
    return (
      <FlatList
        data={info.item.list as RoomDto[]}
        numColumns={2}
        renderItem={renderRoom}
      />
    );
  };

  const renderFamilySection = (info: SectionListRenderItemInfo<Section>) => {
    return (
      <FlatList
        data={info.item.list as FamilyMemberDto[]}
        renderItem={renderFamilyMember}
      />
    );
  };

  const rooms: RoomDto[] = [
    {
      color: 'red',
      iconName: 'home',
      iconType: IconType.AntDesign,
      id: '1',
      name: 'Bedroom',
    },
    {
      color: 'green',
      iconName: 'user',
      iconType: IconType.AntDesign,
      id: '2',
      name: 'Bathroom',
    },
    {
      color: 'brown',
      iconName: 'user',
      iconType: IconType.AntDesign,
      id: '2',
      name: 'Kitchen',
    },
  ];

  const familyMember: FamilyMemberDto[] = [
    {
      id: '1',
      name: 'John Doe',
      photo:
        'https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352010-stock-illustration-default-placeholder-man-and-woman.jpg',
    },
  ];

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
          list: familyMember,
        },
      ],
      renderItem: renderFamilySection,
    },
  ];
  const renderSectionHeader = (info: {section: SectionListData<Section>}) => {
    const navigateToEditor = () => navigation.navigate(Routes.ROOM_EDITOR);
    const navigateToInviteMember = () =>
      navigation.navigate(Routes.INVITE_FAMILY_MEMBER);
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
          <Typography variant={TypographyVariant.HEADING}>Your home</Typography>
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
  });
