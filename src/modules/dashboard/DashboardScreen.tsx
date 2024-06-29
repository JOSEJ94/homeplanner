import React, {useMemo, useState} from 'react';
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context';
import Typography, {
  TypographyVariant,
} from '../../shared/components/Typography';
import {
  ColorValue,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  View,
} from 'react-native';
import TaskItem from './components/TaskItem';
import {AppTheme} from '../../shared/themes/Theme';
import {useTheme} from '@react-navigation/native';
import {useQuery} from '@apollo/client';
import {GetTasksDocument, TaskFragment} from '../../graphql/generated';
import moment from 'moment';
import {formatDate} from '../../shared/utils/Date.utils';

const DashboardScreen = () => {
  const theme = useTheme() as AppTheme;
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => createStyles(theme, insets), [theme, insets]);
  const [dateSelected, setDateSelected] = useState(moment());
  const [refreshing, setRefreshing] = useState(false);
  const {
    data: taskData,
    loading,
    error,
    refetch: reloadTaskList,
  } = useQuery(GetTasksDocument, {
    variables: {fromRooms: []},
  });
  const tasks: TaskFragment[] = taskData?.getTasks || [];
  const dateSelectedLocalizedString = formatDate(dateSelected);

  const refreshTasks = async () => {
    setRefreshing(true);
    try {
      await reloadTaskList();
    } catch (error: any) {
      console.error(error);
    } finally {
      setRefreshing(false);
    }
  };

  const header = (
    <View style={styles.headerContainer}>
      <Typography
        style={styles.headerDateTxt}
        variant={TypographyVariant.CAPTION}>
        {dateSelectedLocalizedString}
      </Typography>
      <Typography variant={TypographyVariant.HEADING}>Today</Typography>
    </View>
  );

  const renderTaskItem = (rowData: ListRenderItemInfo<TaskFragment>) => (
    <TaskItem task={rowData.item} />
  );

  return (
    <FlatList
      refreshing={refreshing}
      onRefresh={refreshTasks}
      style={styles.container}
      ListHeaderComponent={header}
      data={tasks}
      renderItem={renderTaskItem}
    />
  );
};

export default DashboardScreen;

const createStyles = (theme: AppTheme, insets: EdgeInsets) =>
  StyleSheet.create({
    container: {
      paddingTop: insets.top,
    },
    headerContainer: {
      paddingHorizontal: theme.spacing * 2,
    },
    headerDateTxt: {
      fontSize: 14,
      textTransform: 'uppercase',
      color: theme.text.subtle,
    },
    buttonContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    completeBtn: {
      alignSelf: 'flex-end',
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing,
      backgroundColor: theme.success as ColorValue,
      height: '100%',
      width: 50,
    },
    deleteBtn: {
      alignSelf: 'flex-end',
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing,
      backgroundColor: theme.error as ColorValue,
      height: '100%',
      width: 50,
    },
    deleteTxt: {},
  });
