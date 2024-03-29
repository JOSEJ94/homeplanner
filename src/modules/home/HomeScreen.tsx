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

interface Section {
  list: RoomDto[];
}

const HomeScreen = () => {
  const theme = useTheme() as AppTheme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const navigation = useNavigation<NavigationProp<AppScreensParamList>>();

  const renderRoom = (info: ListRenderItemInfo<RoomDto>) => (
    <RoomCard room={info.item} />
  );

  const renderSection = (info: SectionListRenderItemInfo<Section>) => {
    return (
      <FlatList
        data={info.item.list}
        numColumns={2}
        renderItem={renderRoom}
        // keyExtractor={this.keyExtractor}
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

  const sections: SectionListData<Section>[] = [
    {
      title: 'Rooms',
      key: 'Rooms',
      data: [
        {
          list: rooms,
        },
      ],
      renderItem: renderSection,
    },
    // {
    //   title: 'Family',
    //   key: 'Family',
    //   data: [],
    // },
  ];
  const renderSectionHeader = (info: {section: SectionListData<Section>}) => {
    const navigateToEditor = () => navigation.navigate(Routes.ROOM_EDITOR);

    return (
      <View style={styles.roomsHeaderContainer}>
        <Typography variant={TypographyVariant.SUB_HEADING}>
          {info.section.title}
        </Typography>
        <Pressable onPress={navigateToEditor} style={styles.addBtn}>
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
    <SafeAreaView style={{flex: 1}}>
      <SectionList
        style={{flex: 1}}
        ListHeaderComponent={
          <Typography variant={TypographyVariant.HEADING}>Your home</Typography>
        }
        sections={sections}
        renderSectionHeader={renderSectionHeader}
        renderItem={() => <View />}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {},
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
