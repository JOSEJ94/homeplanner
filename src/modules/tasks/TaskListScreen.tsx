import {
  ActivityIndicator,
  ColorValue,
  FlatList,
  ListRenderItemInfo,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import React, {useEffect, useMemo} from 'react';
import {useMutation, useQuery} from '@apollo/client';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  DeleteTaskDocument,
  GetRoomsDocument,
  GetTasksDocument,
  Task,
} from '../../graphql/generated';
import TaskItem from './components/TaskItem';
import Pill from './components/Pill';
import {AppTheme} from '../../shared/themes/Theme';
import {useNavigation, useTheme} from '@react-navigation/native';
import {RoomFilterDto} from '../../shared/models/RoomFilterDto';
import {SwipeListView} from 'react-native-swipe-list-view';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppScreensParamList, Routes} from '../../routes/RoutesParams';

const TaskListScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppScreensParamList>>();
  const theme = useTheme() as AppTheme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const ALL_ROOMS_OPTION: RoomFilterDto = useMemo(
    () => ({id: '-', name: 'All'}),
    [],
  );

  useEffect(
    () =>
      navigation.setOptions({
        headerRight: props => {
          const navigateToTaskEditor = () =>
            navigation.navigate(Routes.TASK_EDITOR);

          return (
            <Pressable
              hitSlop={theme.hitSlop}
              style={styles.addButton}
              onPress={navigateToTaskEditor}>
              <Icon name="add" color={theme.colors.primary} size={30} />
            </Pressable>
          );
        },
      }),
    [],
  );

  const [deleteTask, {loading: submittingTaskDelete}] =
    useMutation(DeleteTaskDocument);
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
  const isLoading = submittingTaskDelete || loadingRooms || loadingTasks;

  const renderTask = (info: ListRenderItemInfo<Task>) => (
    <TaskItem task={info.item} />
  );

  const renderRoomFilter = (info: ListRenderItemInfo<RoomFilterDto>) => (
    <Pill title={info.item.name} style={styles.pill} />
  );

  const renderDeleteButton = (info: ListRenderItemInfo<Task>) => {
    const onDeleteTaskPressed = async () => {
      try {
        if (isLoading) return;
        const deletedTask = await deleteTask({
          variables: {id: info.item.id},
          refetchQueries: [GetTasksDocument],
        });
      } catch (error) {
        console.error(error);
      }
    };

    return (
      <Pressable style={styles.deleteBtn} onPress={onDeleteTaskPressed}>
        {isLoading ? (
          <ActivityIndicator size="large" color={theme.white as ColorValue} />
        ) : (
          <AntDesignIcon
            name="delete"
            size={40}
            color={theme.white as ColorValue}
          />
        )}
      </Pressable>
    );
  };

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
        renderHiddenItem={renderDeleteButton}
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
    addButton: {
      marginRight: theme.spacing,
    },
  });
