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
import {AppScreensParamList, Routes} from '../../routes/RoutesParams';
import {SafeAreaView} from 'react-native-safe-area-context';
import TextInput from '../../shared/components/TextInput';
import Button from '../../shared/components/Button';
import {ApolloError, useMutation, useQuery} from '@apollo/client';
import {
  CreateTaskTemplateDocument,
  GetRoomsDocument,
  GetTaskTemplateDetailsDocument,
  GetTaskTemplatesDocument,
  GetTasksDocument,
  TaskSchedule,
  UpdateTaskTemplateDocument,
} from '../../graphql/generated';
import {RoomFilterDto} from '../../shared/models/RoomFilterDto';
import {firebase} from '@react-native-firebase/auth';
import {FilterOption, FilterType} from './components/RoomPicker';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

const scheduleTypeOptions: FilterOption<TaskSchedule>[] = [
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
  const roomsOptions: FilterOption<RoomFilterDto>[] = rooms.map(room => ({
    label: room.name,
    value: room,
  }));

  const {
    data: existingTaskTemplateDetailsData,
    loading: loadingExistingTask,
    error: errorExistingTask,
  } = useQuery(GetTaskTemplateDetailsDocument, {
    variables: {id: id as string},
    skip: !id || !roomsOptions.length,
  });
  const [createTaskTemplate, {loading: submittingTaskTemplateCreation}] =
    useMutation(CreateTaskTemplateDocument);
  const [updateTaskTemplate, {loading: submittingTaskTemplateUpdate}] =
    useMutation(UpdateTaskTemplateDocument);

  const existingTaskTemplateDetails =
    existingTaskTemplateDetailsData?.getTaskTemplateDetails;

  const [openDateTimePicker, setOpenDateTimePicker] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [randomlyAssigned, setRandomlyAssigned] = useState(false);
  const [assignedTo, setAssignedTo] = useState<any[]>([]);
  const [dateSelected, setDateTime] = useState<Date>(new Date());
  const [scheduleType, setScheduleType] = useState<TaskSchedule | null>(null);
  const [roomSelected, setRoomSelected] = useState<RoomFilterDto | null>(null);

  useEffect(() => {
    if (existingTaskTemplateDetails) {
      setTitle(existingTaskTemplateDetails.title);
      if (existingTaskTemplateDetails.description)
        setDescription(existingTaskTemplateDetails.description);
      setRandomlyAssigned(existingTaskTemplateDetails.randomlyAssigned);
      if (existingTaskTemplateDetails.assignedTo)
        setAssignedTo(existingTaskTemplateDetails.assignedTo);
      setScheduleType(existingTaskTemplateDetails.scheduleType);
      setRoomSelected(existingTaskTemplateDetails.room);
      setDateTime(moment(existingTaskTemplateDetails.startingDate).toDate());
    }
  }, [existingTaskTemplateDetails]);

  const showTimePicker = () => setOpenDateTimePicker(true);

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
        await updateTaskTemplate({
          variables: {
            id,
            assignedTo: [userId!],
            room: roomSelected!.id,
            startingDate: dateSelected.toISOString(),
            endingDate: '2024-06-03T04:11:38.671Z',
            scheduleInterval: 1,
            scheduleType: scheduleType!,
            title,
            description,
            randomlyAssign: randomlyAssigned,
          },
          refetchQueries: [GetTaskTemplatesDocument, GetTasksDocument],
        });
      } else {
        await createTaskTemplate({
          variables: {
            assignedTo: [userId!],
            room: roomSelected!.id,
            startingDate: dateSelected.toISOString(),
            scheduleInterval: 1,
            scheduleType: scheduleType!,
            title,
            description,
            randomlyAssign: randomlyAssigned,
          },
          refetchQueries: [GetTaskTemplatesDocument, GetTasksDocument],
        });
      }
      navigation.goBack();
    } catch (error: any) {
      console.error('Error', JSON.stringify(error));
      if (error instanceof ApolloError) {
        const message = JSON.stringify(error);
        navigation.navigate(Routes.ERROR_MODAL, {
          title: __DEV__
            ? 'Development error'
            : `Oops! You just experienced an error`,
          message: __DEV__
            ? message
            : `We couldn't save this information, please try again!`,
        });
      }
    }
  };

  const navigateToRoomFilter = () =>
    navigation.navigate(Routes.OPTION_PICKER, {
      label: 'Rooms',
      type: FilterType.SingleOption,
      options: roomsOptions,
      ctaLabel: 'Select room',
      selected: roomSelected,
      onOptionSelected: selected => setRoomSelected(selected as RoomFilterDto),
    });

  const navigateToFrequencyFilter = () =>
    navigation.navigate(Routes.OPTION_PICKER, {
      label: 'How often should this take place',
      type: FilterType.SingleOption,
      options: scheduleTypeOptions,
      ctaLabel: 'Use this selection',
      selected: scheduleType,
      onOptionSelected: selected => setScheduleType(selected as TaskSchedule),
    });

  const isSavingButtonDisabled = !title || !roomSelected || !scheduleType;
  const selectedScheduleOption = scheduleTypeOptions.find(
    option => option.value === scheduleType,
  );
  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollviewContainer}>
        <View>
          <TextInput
            value={title}
            title="Title"
            placeholder="Title"
            onChangeText={setTitle}
            titleProps={{skeletonProps: {width: 100}}}
          />
          <TextInput
            containerStyle={styles.inputContainer}
            value={description}
            title="Description"
            placeholder="Description"
            onChangeText={setDescription}
            titleProps={{skeletonProps: {width: 100}}}
            multiline
          />
          <TextInput
            containerStyle={styles.inputContainer}
            value={roomSelected?.name}
            title="Room"
            placeholder="Pick room"
            editable={false}
            onPressIn={navigateToRoomFilter}
            titleProps={{skeletonProps: {width: 100}}}
          />
          <TextInput
            containerStyle={styles.inputContainer}
            value={selectedScheduleOption?.label}
            title="Frequency"
            placeholder="How often should this repeat?"
            editable={false}
            onPressIn={navigateToFrequencyFilter}
            titleProps={{skeletonProps: {width: 100}}}
          />
          <TextInput
            containerStyle={styles.inputContainer}
            value={dateSelected.toISOString()}
            title="Date"
            placeholder="Time this task should take place on"
            editable={false}
            onPressIn={showTimePicker}
            titleProps={{skeletonProps: {width: 100}}}
          />
          <DatePicker
            modal
            mode="datetime"
            minuteInterval={15}
            date={dateSelected}
            onConfirm={date => {
              setOpenDateTimePicker(false);
              setDateTime(date);
            }}
            open={openDateTimePicker}
            onCancel={() => setOpenDateTimePicker(false)}
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
    inputContainer: {
      marginVertical: theme.spacing,
    },
  });
