import React, {useMemo} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Typography, {
  TypographyVariant,
} from '../../shared/components/Typography';
import {
  ColorValue,
  ListRenderItemInfo,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import {TaskDto} from '../../shared/models/TaskDto';
import TaskItem from './components/TaskItem';
import {AppTheme} from '../../shared/themes/Theme';
import {useTheme} from '@react-navigation/native';
import {RowMap, SwipeListView} from 'react-native-swipe-list-view';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

const tasks: TaskDto[] = [
  {
    id: '2',
    category: 'Home',
    categoryId: '1',
    randomlyAssigned: false,
    schedule: {
      type: 'daily',
    },
    title: 'Clean the house and all its furniture',
  },
  {
    id: '25',
    category: 'Bedroom',
    categoryId: '2',
    randomlyAssigned: false,
    schedule: {
      type: 'monthly',
    },
    title: 'Take out the paper trashcan',
  },
  {
    id: '23',
    category: 'Home',
    categoryId: '1',
    randomlyAssigned: false,
    schedule: {
      type: 'weekly',
    },
    title:
      'Extremely long text with no sense at all so I can see how text wrapping works',
  },
];

const DashboardScreen = () => {
  const theme = useTheme() as AppTheme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const header = (
    <View style={styles.headerContainer}>
      <Typography variant={TypographyVariant.HEADING}>Today</Typography>
    </View>
  );

  const renderTaskItem = (
    rowData: ListRenderItemInfo<TaskDto>,
    rowMap: RowMap<TaskDto>,
  ) => <TaskItem task={rowData.item} />;

  return (
    <SafeAreaView edges={['top']} style={{flex: 1}}>
      <SwipeListView
        ListHeaderComponent={header}
        data={tasks}
        renderItem={renderTaskItem}
        renderHiddenItem={() => (
          <View style={styles.buttonContainer}>
            <Pressable style={styles.completeBtn}>
              <AntDesignIcon
                name="check"
                size={25}
                color={theme.white as ColorValue}
              />
            </Pressable>
            <Pressable style={styles.deleteBtn}>
              <AntDesignIcon
                name="delete"
                size={25}
                color={theme.white as ColorValue}
              />
            </Pressable>
          </View>
        )}
        leftOpenValue={styles.completeBtn.width}
        rightOpenValue={-styles.deleteBtn.width}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

export default DashboardScreen;

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {},
    headerContainer: {
      paddingHorizontal: theme.spacing * 2,
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
