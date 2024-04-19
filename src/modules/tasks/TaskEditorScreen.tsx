import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {
  RouteProp,
  useNavigation,
  useRoute,
  useTheme,
} from '@react-navigation/native';
import {AppTheme} from '../../shared/themes/Theme';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import DropDownPicker, {ItemType} from 'react-native-dropdown-picker';
import {AppScreensParamList, Routes} from '../../routes/RoutesParams';
import {SafeAreaView} from 'react-native-safe-area-context';
import Typography from '../../shared/components/Typography';
import TextInput from '../../shared/components/TextInput';
import Button from '../../shared/components/Button';
import {TaskDto} from '../../shared/models/TaskDto';
import {useMutation, useQuery} from '@apollo/client';
import {
  CreateTaskDocument,
  GetRoomsDocument,
  GetTaskDetailsDocument,
  GetTasksDocument,
  TaskSchedule,
  UpdateTaskDocument,
} from '../../graphql/generated';
import {RoomDto} from '../../shared/models/RoomDto';
import {RoomFilterDto} from '../../shared/models/RoomFilterDto';

const scheduleTypeOptions: ItemType<TaskSchedule>[] = [
  {
    label: 'Once',
    value: TaskSchedule.Once,
  },
  {
    label: 'Daily',
    value: TaskSchedule.Daily,
  },
  {
    label: 'Weekly',
    value: TaskSchedule.Weekly,
  },
  {
    label: 'Monthly',
    value: TaskSchedule.Monthly,
  },
];

const TaskEditorScreen = () => {
  const theme = useTheme() as AppTheme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const navigation =
    useNavigation<NativeStackNavigationProp<AppScreensParamList>>();
  const params = useRoute<RouteProp<AppScreensParamList>>()
    .params as AppScreensParamList[Routes.TASK_EDITOR];
  const id = params?.id;
  const {
    data: roomsData,
    loading: loadingRooms,
    error: errorRooms,
  } = useQuery(GetRoomsDocument);
  const rooms: RoomFilterDto[] = roomsData?.getRooms || [];
  const roomsOptions: ItemType<string>[] = rooms.map(room => ({
    label: room.name,
    value: room.id,
  }));

  const {
    data: existingTaskDetailsData,
    loading: loadingExistingTask,
    error: errorExistingTask,
  } = useQuery(GetTaskDetailsDocument, {
    variables: {id: id as string},
    skip: !id || !roomsOptions.length,
  });
  const [createTask, {loading: submittingTaskCreation}] =
    useMutation(CreateTaskDocument);
  const [updateTask, {loading: submittingTaskUpdate}] =
    useMutation(UpdateTaskDocument);

  const existingTaskDetails: TaskDto | undefined =
    existingTaskDetailsData?.getTaskDetails;

  const [openRoomSelector, setOpenRoomSelector] = useState(false);
  const [openScheduleTypeSelector, setOpenScheduleTypeSelector] =
    useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [randomlyAssigned, setRandomlyAssigned] = useState(false);
  const [assignedTo, setAssignedTo] = useState<any[]>([]);
  const [scheduleType, setScheduleType] = useState<TaskSchedule | null>(null);
  const [roomSelected, setRoomSelected] = useState<string | null>(null);

  useEffect(() => {
    if (existingTaskDetails) {
      setTitle(existingTaskDetails.title);
      if (existingTaskDetails.description)
        setDescription(existingTaskDetails.description);
      setRandomlyAssigned(existingTaskDetails.randomlyAssigned);
      if (existingTaskDetails.assignedTo)
        setAssignedTo(existingTaskDetails.assignedTo);
      setScheduleType(existingTaskDetails.scheduleType);
      setRoomSelected(existingTaskDetails.room.id);
    }
  }, [existingTaskDetails]);

  useMemo(
    () =>
      navigation.setOptions({
        headerTitle: params?.id ? 'Edit Room' : 'New Room',
      }),
    [params?.id],
  );

  const saveTask = async () => {
    try {
      if (id) {
        await updateTask({
          variables: {
            id,
            assignedTo: ['qBfdOe5ho8VfZbBpwVeB0YSu1Ar1'],
            room: roomSelected!,
            scheduleDay: '2024-05-01',
            scheduleInterval: 0,
            scheduleType: scheduleType!,
            title,
            description,
            randomlyAssign: randomlyAssigned,
          },
          refetchQueries: [GetTasksDocument],
        });
      } else {
        await createTask({
          variables: {
            assignedTo: ['qBfdOe5ho8VfZbBpwVeB0YSu1Ar1'],
            room: roomSelected!,
            scheduleDay: '2024-05-01',
            scheduleInterval: 0,
            scheduleType: scheduleType!,
            title,
            description,
            randomlyAssign: randomlyAssigned,
          },
          refetchQueries: [GetTasksDocument],
        });
      }
      navigation.goBack();
    } catch (error: any) {
      console.error('Error', error.message);
    }
  };

  const isSavingButtonDisabled = !title || !roomSelected || !scheduleType;
  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollviewContainer}>
        <View>
          <TextInput
            value={title}
            title="Title"
            placeholder="Title"
            onChangeText={setTitle}
          />
          <TextInput
            value={description}
            title="Description"
            placeholder="Description"
            onChangeText={setDescription}
            multiline
          />
          <DropDownPicker
            open={openRoomSelector}
            value={roomSelected}
            items={roomsOptions}
            setOpen={setOpenRoomSelector}
            setValue={setRoomSelected}
            itemKey="label"
            placeholder="Choose a room"
          />
          <DropDownPicker
            open={openScheduleTypeSelector}
            value={scheduleType}
            items={scheduleTypeOptions}
            setOpen={setOpenScheduleTypeSelector}
            setValue={setScheduleType}
            itemKey="label"
            placeholder="How often this should take place"
          />
        </View>
        <Button
          loading={submittingTaskCreation}
          disabled={isSavingButtonDisabled}
          onPress={saveTask}
          title="Save"
          fullWidth
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default TaskEditorScreen;

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollviewContainer: {
      padding: theme.spacing * 2,
      flex: 1,
      justifyContent: 'space-between',
    },
  });
