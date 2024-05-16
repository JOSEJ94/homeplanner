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
import TextInput from '../../shared/components/TextInput';
import Button from '../../shared/components/Button';
import {useMutation, useQuery} from '@apollo/client';
import {
  CreateTaskTemplateDocument,
  GetRoomsDocument,
  GetTaskTemplateDetailsDocument,
  GetTaskTemplatesDocument,
  TaskSchedule,
  UpdateTaskTemplateDocument,
} from '../../graphql/generated';
import {RoomFilterDto} from '../../shared/models/RoomFilterDto';
import {firebase} from '@react-native-firebase/auth';

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

const TaskTemplateEditorScreen = () => {
  const theme = useTheme() as AppTheme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const navigation =
    useNavigation<NativeStackNavigationProp<AppScreensParamList>>();
  const params =
    useRoute<RouteProp<AppScreensParamList, Routes.TASK_EDITOR>>().params;
  const id = params?.id;
  // FIXME: It's only using local user for the moment
  const userId = firebase.auth().currentUser?.uid;
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
    data: existingTaskTemplateDetailsData,
    loading: loadingExistingTask,
    error: errorExistingTask,
  } = useQuery(GetTaskTemplateDetailsDocument, {
    variables: {id: id as string},
    skip: !id || !roomsOptions.length,
  });
  const [createTask, {loading: submittingTaskTemplateCreation}] = useMutation(
    CreateTaskTemplateDocument,
  );
  const [updateTask, {loading: submittingTaskTemplateUpdate}] = useMutation(
    UpdateTaskTemplateDocument,
  );

  const existingTaskTemplateDetails =
    existingTaskTemplateDetailsData?.getTaskTemplateDetails;

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
    if (existingTaskTemplateDetails) {
      setTitle(existingTaskTemplateDetails.title);
      if (existingTaskTemplateDetails.description)
        setDescription(existingTaskTemplateDetails.description);
      setRandomlyAssigned(existingTaskTemplateDetails.randomlyAssigned);
      if (existingTaskTemplateDetails.assignedTo)
        setAssignedTo(existingTaskTemplateDetails.assignedTo);
      setScheduleType(existingTaskTemplateDetails.scheduleType);
      setRoomSelected(existingTaskTemplateDetails.room.id);
    }
  }, [existingTaskTemplateDetails]);

  useMemo(
    () =>
      navigation.setOptions({
        headerTitle: params?.id ? 'Edit Task Template' : 'New Task Template',
      }),
    [params?.id],
  );

  const saveTask = async () => {
    try {
      if (id) {
        await updateTask({
          variables: {
            id,
            assignedTo: [userId!],
            room: roomSelected!,
            startingDate: '2024-05-01',
            endingDate: '2024-05-01',
            scheduleInterval: 0,
            scheduleType: scheduleType!,
            title,
            description,
            randomlyAssign: randomlyAssigned,
          },
          refetchQueries: [GetTaskTemplatesDocument],
        });
      } else {
        await createTask({
          variables: {
            assignedTo: [userId!],
            room: roomSelected!,
            startingDate: '2024-05-01',
            scheduleInterval: 0,
            scheduleType: scheduleType!,
            title,
            description,
            randomlyAssign: randomlyAssigned,
          },
          refetchQueries: [GetTaskTemplatesDocument],
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
          loading={submittingTaskTemplateCreation}
          disabled={isSavingButtonDisabled}
          onPress={saveTask}
          title="Save"
          fullWidth
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default TaskTemplateEditorScreen;

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
