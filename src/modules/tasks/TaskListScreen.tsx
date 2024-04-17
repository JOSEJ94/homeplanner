import {
  ColorValue,
  FlatList,
  ListRenderItemInfo,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import React, {useMemo} from 'react';
import {useQuery} from '@apollo/client';
import {GetRoomsDocument, GetTasksDocument} from '../../graphql/generated';
import TaskItem from './components/TaskItem';
import Pill from './components/Pill';
import {AppTheme} from '../../shared/themes/Theme';
import {useTheme} from '@react-navigation/native';
import {RoomFilterDto} from '../../shared/models/RoomFilterDto';
import {SwipeListView} from 'react-native-swipe-list-view';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

const TaskListScreen = () => {
  const theme = useTheme() as AppTheme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const ALL_ROOMS_OPTION: RoomFilterDto = useMemo(
    () => ({id: '-', name: 'All'}),
    [],
  );

  const {
    data: tasksData,
    loading: loadingTasks,
    error: errorTasks,
  } = useQuery(GetTasksDocument);
  const {
    data: roomsData,
    loading: loadingRooms,
    error: errorRooms,
  } = useQuery(GetRoomsDocument);
  const tasks = tasksData?.getTasks || [];
  const rooms: RoomFilterDto[] = [ALL_ROOMS_OPTION].concat(
    roomsData?.getRooms || [],
  );
  console.log('tasks', tasks);

  const renderTask = (info: ListRenderItemInfo<any>) => (
    <TaskItem task={info.item} />
  );

  const renderRoomFilter = (info: ListRenderItemInfo<RoomFilterDto>) => (
    <Pill title={info.item.name} style={styles.pill} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.filterContentContainer}
        style={styles.filterContainer}
        horizontal
        data={rooms}
        renderItem={renderRoomFilter}
        showsHorizontalScrollIndicator={false}
      />
      <SwipeListView
        data={tasks}
        renderItem={renderTask}
        renderHiddenItem={() => (
          <Pressable style={styles.deleteBtn}>
            <AntDesignIcon
              name="delete"
              size={40}
              color={theme.white as ColorValue}
            />
          </Pressable>
        )}
        disableRightSwipe
        closeOnScroll
        closeOnRowPress
        rightOpenValue={-70}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default TaskListScreen;

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    filterContentContainer: {
      paddingHorizontal: theme.spacing * 1.5,
    },
    filterContainer: {
      flexGrow: 0,
      paddingVertical: theme.spacing,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    pill: {
      marginHorizontal: theme.spacing / 2,
    },
    deleteBtn: {
      alignSelf: 'flex-end',
      justifyContent: 'center',
      alignItems: 'flex-end',
      paddingRight: theme.spacing * 2,
      padding: theme.spacing,
      backgroundColor: theme.error as ColorValue,
      height: '100%',
      width: '100%',
    },
  });
