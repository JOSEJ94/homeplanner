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
  DeleteTaskTemplateDocument,
  GetRoomsDocument,
  GetTaskTemplatesDocument,
  TaskTemplate,
} from '../../graphql/generated';
import TaskTemplateItem from './components/TaskTemplateItem';
import Pill from '../../shared/components/Pill';
import {AppTheme} from '../../shared/themes/Theme';
import {useNavigation, useTheme} from '@react-navigation/native';
import {RoomFilterDto} from '../../shared/models/RoomFilterDto';
import {SwipeListView} from 'react-native-swipe-list-view';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppScreensParamList, Routes} from '../../routes/RoutesParams';
import {GET_TASK_FILTER} from '../../graphql/local/taskFilter';
import {TaskFilter} from '../../shared/models/TaskFilter';
import {
  DEFAULT_TASK_FILTER,
  taskFilterVar,
} from '../../shared/apollo/cache/cache';

const TaskTemplateListScreen = () => {
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
          const navigateToTaskTemplateEditor = () =>
            // FIXME: We don't have the selected group in app state
            navigation.navigate(Routes.TASK_EDITOR, {
              groupId: 'cff4ddfd-c499-48d6-b87f-372f6ffa1253',
            });

          return (
            <Pressable
              hitSlop={theme.hitSlop}
              style={styles.addButton}
              onPress={navigateToTaskTemplateEditor}>
              <Icon name="add" color={theme.colors.primary} size={30} />
            </Pressable>
          );
        },
      }),
    [],
  );

  const [deleteTaskTemplate, {loading: submittingTaskTemplateDelete}] =
    useMutation(DeleteTaskTemplateDocument);
  const {data: taskFilterData} = useQuery<{
    taskFilter: TaskFilter<RoomFilterDto>;
  }>(GET_TASK_FILTER);
  const roomFilter = taskFilterData?.taskFilter;
  const roomsSelectedIds = roomFilter!.selectedOptions
    .filter(so => so.id !== ALL_ROOMS_OPTION.id)
    .map(so => so.id);
  const {
    data: taskTemplatesData,
    loading: loadingTaskTemplates,
    error: errorTasks,
  } = useQuery(GetTaskTemplatesDocument, {
    variables: {fromRooms: roomsSelectedIds},
  });
  const {
    data: roomsData,
    loading: loadingRooms,
    error: errorRooms,
  } = useQuery(GetRoomsDocument);

  const taskTemplates = taskTemplatesData?.getTaskTemplates || [];
  const rooms: RoomFilterDto[] = [ALL_ROOMS_OPTION].concat(
    roomsData?.getRooms || [],
  );
  const isLoading =
    submittingTaskTemplateDelete || loadingRooms || loadingTaskTemplates;

  const renderTaskTemplate = (info: ListRenderItemInfo<TaskTemplate>) => (
    <TaskTemplateItem taskTemplate={info.item} />
  );

  const renderRoomFilter = (info: ListRenderItemInfo<RoomFilterDto>) => {
    const selectedItem = roomFilter?.selectedOptions.find(
      so => so.id === info.item.id,
    );
    const selected = Boolean(selectedItem);
    const onRoomFilterPress = () => {
      if (selectedItem) {
        if (roomFilter!.selectedOptions.length === 1) {
          taskFilterVar(DEFAULT_TASK_FILTER);
        } else {
          const newSelectedOptions = roomFilter!.selectedOptions.filter(
            so => so.id != selectedItem.id,
          );
          taskFilterVar({
            selectedOptions: newSelectedOptions,
          });
        }
      } else {
        if (info.item.id === ALL_ROOMS_OPTION.id) {
          taskFilterVar(DEFAULT_TASK_FILTER);
        } else {
          const newSelectedOptions = roomFilter!.selectedOptions
            .filter(so => so.id !== ALL_ROOMS_OPTION.id)
            .concat(info.item);
          taskFilterVar({
            selectedOptions: newSelectedOptions,
          });
        }
      }
    };

    return (
      <Pill
        title={info.item.name}
        style={styles.pill}
        selected={selected}
        onPress={onRoomFilterPress}
      />
    );
  };

  const renderDeleteButton = (info: ListRenderItemInfo<TaskTemplate>) => {
    const onDeleteTaskTemplatePressed = async () => {
      try {
        if (isLoading) return;
        const deletedTask = await deleteTaskTemplate({
          variables: {id: info.item.id},
          refetchQueries: [GetTaskTemplatesDocument],
        });
      } catch (error) {
        console.error(error);
      }
    };

    return (
      <Pressable style={styles.deleteBtn} onPress={onDeleteTaskTemplatePressed}>
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
        data={taskTemplates}
        renderItem={renderTaskTemplate}
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

export default TaskTemplateListScreen;

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
