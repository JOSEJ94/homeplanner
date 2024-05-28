import {Pressable, ScrollView, StyleSheet, View} from 'react-native';
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
import FontistoIcon from 'react-native-vector-icons/Fontisto';
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
  GroupStatus,
  TaskSchedule,
  UpdateTaskTemplateDocument,
} from '../../graphql/generated';
import {RoomFilterDto} from '../../shared/models/RoomFilterDto';
import {firebase} from '@react-native-firebase/auth';
import {FilterType} from '../../shared/components/filter/Filter';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import {formatDateTime} from '../../shared/utils/Date.utils';
import Typography from '../../shared/components/Typography';
import RoundedImage from '../../shared/components/RoundedImage';
import {getStaticImageName} from '../../shared/utils/Image.utils';
import PillInput from '../../shared/components/PillInput';

const ICON_SIZE = 12;

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

interface TaskScheduleOption {
  label: string;
  value: TaskSchedule;
}

const scheduleTypeOptions: TaskScheduleOption[] = [
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
  const groupId = params.groupId;
  // FIXME: It's only using local user for the moment
  const userId = firebase.auth().currentUser?.uid;
  const {
    data: roomsData,
    loading: loadingRooms,
    error: errorRooms,
  } = useQuery(GetRoomsDocument);
  const rooms: RoomFilterDto[] = roomsData?.getRooms || [];
  const {
    data: membersData,
    loading: loadingMembers,
    error: errorMembers,
  } = useQuery(GetGroupMembersDocument, {variables: {fromGroup: groupId}});
  const members: GroupMember[] = membersData?.getGroupMembers || [];

  const {
    data: existingTaskTemplateDetailsData,
    loading: loadingExistingTask,
    error: errorExistingTask,
  } = useQuery(GetTaskTemplateDetailsDocument, {
    variables: {id: id as string},
    skip: !id || !rooms.length,
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
  const [assignedTo, setAssignedTo] = useState<GroupMember[]>([]);
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

  useEffect(() => {
    let error = errorExistingTask;
    if (!error) {
      error = errorMembers;
    }
    if (!error) {
      error = errorRooms;
    }
    if (!error) return;

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
  }, [errorExistingTask, errorMembers, errorRooms]);

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

  const renderRoomOption = (
    selected: RoomFilterDto,
    onPress: any,
    item: RoomFilterDto,
  ) => {
    const isSelected = selected?.id === item.id;
    return (
      <Pressable
        onPress={onPress}
        style={[styles.roomContainer, !isSelected && styles.unselected]}>
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

  const renderFrequencyOption = (
    selected: TaskScheduleOption,
    onPress: any,
    item: TaskScheduleOption,
  ) => {
    const isSelected = selected?.value === item.value;
    return (
      <Pressable
        onPress={onPress}
        style={[styles.roomContainer, !isSelected && styles.unselected]}>
        <View style={styles.iconContainer}>
          {isSelected && (
            <FontistoIcon
              name="record"
              color={theme.colors.primary}
              size={ICON_SIZE}
            />
          )}
        </View>
        <Typography>{item.label}</Typography>
      </Pressable>
    );
  };

  const renderMemberOption = (
    selected: GroupMember[],
    onPress: any,
    item: GroupMember,
  ) => {
    const isSelected = Boolean(selected?.find(e => e.user.id === item.user.id));
    const sourceUri = item.user.profilePhoto;
    return (
      <Pressable
        onPress={onPress}
        style={[styles.roomContainer, !isSelected && styles.unselected]}>
        <RoundedImage
          sourceUri={sourceUri}
          placeholderUri={getStaticImageName('default-user.png')}
          imageStyle={styles.userImg}
          style={styles.userImgContainer}
        />
        <Typography>{item.user.name}</Typography>
      </Pressable>
    );
  };

  const navigateToRoomFilter = () =>
    navigation.navigate(Routes.OPTION_PICKER, {
      label: 'Rooms',
      type: FilterType.SingleOption,
      options: rooms,
      ctaLabel: 'Select room',
      selected: roomSelected,
      onOptionSelected: selected => setRoomSelected(selected as RoomFilterDto),
      renderItem: (selected, onPress, item) =>
        renderRoomOption(
          selected as RoomFilterDto,
          onPress,
          item.item as RoomFilterDto,
        ),
    });

  const navigateToFrequencyFilter = () =>
    navigation.navigate(Routes.OPTION_PICKER, {
      label: 'How often should this take place',
      type: FilterType.SingleOption,
      options: scheduleTypeOptions,
      ctaLabel: 'Use this selection',
      selected: scheduleType,
      onOptionSelected: (selected: TaskScheduleOption) =>
        setScheduleType(selected.value),
      renderItem: (selected, onPress, item) =>
        renderFrequencyOption(
          selected,
          onPress,
          item.item as TaskScheduleOption,
        ),
    });

  const navigateToAssignedPeopleFilter = () =>
    navigation.navigate(Routes.OPTION_PICKER, {
      label: 'Select people assigned to this task',
      type: FilterType.MultipleOption,
      options: members,
      ctaLabel: 'Use this selection',
      selected: assignedTo,
      onOptionSelected: selected => setAssignedTo(selected as GroupMember[]),
      renderItem: (selected, onPress, item) =>
        renderMemberOption(selected, onPress, item.item as GroupMember),
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
          <PillInput
            title="Assigned to"
            data={assignedTo}
            extractLabel={item => item.user.name!}
            extractImage={item => item.user.profilePhoto}
            placeholderText="Who is going to work on this task?"
            placeholderImage={getStaticImageName('default-user.png')}
            onPress={navigateToAssignedPeopleFilter}
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
    roomContainer: {
      marginVertical: theme.spacing,
      marginHorizontal: theme.spacing * 2,
      flexDirection: 'row',
      alignItems: 'center',
    },
    userImgContainer: {
      width: 50,
      height: 50,
      marginRight: theme.spacing,
    },
    userImg: {
      width: 50,
      height: 50,
    },
    unselected: {
      opacity: 0.5,
    },
    iconContainer: {
      minWidth: 25,
      height: 20,
      justifyContent: 'center',
    },
  });
