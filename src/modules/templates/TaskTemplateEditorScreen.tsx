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
  GetGroupMembersDocument,
  GetRoomsDocument,
  GetTaskTemplateDetailsDocument,
  GetTaskTemplatesDocument,
  GetTasksDocument,
  GroupMemberFragment,
  GroupStatus,
  TaskSchedule,
  UpdateTaskTemplateDocument,
} from '../../graphql/generated';
import {RoomFilterDto} from '../../shared/models/RoomFilterDto';
import {firebase} from '@react-native-firebase/auth';
import {FilterOption, FilterType} from './components/RoomPicker';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import {formatDateTime} from '../../shared/utils/Date.utils';
import Pill from '../../shared/components/Pill';

interface GroupMember {
  __typename?: 'GroupMember' | undefined;
  status: GroupStatus;
  user: {
    __typename?: 'User' | undefined;
    id: string;
    name?: string | null | undefined;
    profilePhoto?: string | null | undefined;
  };
}

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
    data: membersData,
    loading: loadingMembers,
    error: errorMembers,
  } = useQuery(GetGroupMembersDocument);
  const members: GroupMember[] = membersData?.getGroupMembers || [];
  const membersOptions: FilterOption<RoomFilterDto>[] = members.map(member => ({
    label: member.user.name,
    image: {uri: member.user.profilePhoto},
    value: member.user.id,
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
  const [openEndingDateTimePicker, setOpenEndingDateTimePicker] =
    useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [randomlyAssigned, setRandomlyAssigned] = useState(false);
  const [assignedTo, setAssignedTo] = useState<any[]>([]);
  const [dateSelected, setDateTime] = useState<Date>(new Date());
  const [endingDateSelected, setEndingDateTime] = useState<Date>();
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

  const showEndingDateTimePicker = () => setOpenEndingDateTimePicker(true);

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
            endingDate: endingDateSelected?.toISOString(),
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
            endingDate: endingDateSelected?.toISOString(),
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

  const navigateToAssignedPeopleFilter = () =>
    navigation.navigate(Routes.OPTION_PICKER, {
      label: 'Select people assigned to this task',
      type: FilterType.MultipleOption,
      options: membersOptions,
      ctaLabel: 'Use this selection',
      selected: assignedTo,
      onOptionSelected: selected => setAssignedTo(selected as GroupMember[]),
    });

  const onDateConfirmed = (date: Date) => {
    setOpenDateTimePicker(false);
    setDateTime(date);
  };

  const onDateCancel = () => setOpenDateTimePicker(false);

  const onEndingDateConfirmed = (date: Date) => {
    setOpenEndingDateTimePicker(false);
    setEndingDateTime(date);
  };

  const onEndingDateCancel = () => setOpenEndingDateTimePicker(false);

  const selectedScheduleOption = scheduleTypeOptions.find(
    option => option.value === scheduleType,
  );
  const isSavingButtonDisabled =
    !title ||
    !roomSelected ||
    !scheduleType ||
    !dateSelected ||
    !selectedScheduleOption;

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
            value={formatDateTime(moment(dateSelected))}
            title="Date"
            placeholder="Date and time this task should start"
            editable={false}
            onPressIn={showTimePicker}
            titleProps={{skeletonProps: {width: 100}}}
          />
          {Boolean(scheduleType) && scheduleType !== TaskSchedule.Once && (
            <TextInput
              containerStyle={styles.inputContainer}
              value={
                endingDateSelected
                  ? formatDateTime(moment(endingDateSelected))
                  : ''
              }
              title="Ending Date"
              placeholder="Date and time this task should end"
              editable={false}
              onPressIn={showEndingDateTimePicker}
              titleProps={{skeletonProps: {width: 100}}}
            />
          )}
          <Button
            onPress={navigateToAssignedPeopleFilter}
            title="Pick assigned people"
            fullWidth
          />
          <Pill
            title="test"
            image={{
              uri: 'https://cdn.pixabay.com/photo/2014/06/03/19/38/road-sign-361514_640.png',
              cache: 'web',
            }}
          />
          <DatePicker
            modal
            minuteInterval={15}
            date={dateSelected}
            onConfirm={onDateConfirmed}
            open={openDateTimePicker}
            onCancel={onDateCancel}
          />
          <DatePicker
            modal
            minuteInterval={15}
            date={endingDateSelected || new Date()}
            onConfirm={onEndingDateConfirmed}
            open={openEndingDateTimePicker}
            onCancel={onEndingDateCancel}
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