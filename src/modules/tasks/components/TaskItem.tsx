import {View, StyleSheet, ColorValue, Pressable} from 'react-native';
import React, {useMemo} from 'react';
import Typography, {
  TypographyVariant,
} from '../../../shared/components/Typography';
import {AppTheme} from '../../../shared/themes/Theme';
import {useNavigation, useTheme} from '@react-navigation/native';
import {Task} from '../../../graphql/generated';
import RoomIcon from '../../../shared/components/RoomIcon';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppScreensParamList, Routes} from '../../../routes/RoutesParams';

interface TaskItemProps {
  task: Task;
}

const TaskItem = ({task}: TaskItemProps) => {
  const theme = useTheme() as AppTheme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const navigation =
    useNavigation<NativeStackNavigationProp<AppScreensParamList>>();

  const seeDetails = () =>
    navigation.navigate(Routes.TASK_EDITOR, {
      id: task.id,
    });

  return (
    <Pressable style={styles.container} onPress={seeDetails}>
      <RoomIcon room={task.room} />
      <View style={styles.informationContainer}>
        <Typography variant={TypographyVariant.CAPTION} style={styles.titleTxt}>
          {task.title}
        </Typography>
        <Typography numberOfLines={1} variant={TypographyVariant.BODY}>
          {task.description}
        </Typography>
        <View style={styles.subInformationContainer}>
          <Typography style={styles.categoryTxt}>{task.room.name}</Typography>
          <Typography style={styles.scheduleTypeTxt}>
            {task.scheduleType}
          </Typography>
        </View>
      </View>
    </Pressable>
  );
};

export default TaskItem;

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: theme.white as ColorValue,
      paddingHorizontal: theme.spacing * 2,
      paddingVertical: theme.spacing,
      borderBottomColor: theme.colors.border,
      borderBottomWidth: 1,
    },
    informationContainer: {
      flex: 1,
      justifyContent: 'space-between',
      marginLeft: 8,
    },
    subInformationContainer: {
      marginTop: theme.spacing / 2,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    titleTxt: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.colors.text,
    },
    categoryTxt: {
      color: theme.faded as ColorValue,
      alignSelf: 'flex-end',
      fontSize: 14,
    },
    scheduleTypeTxt: {
      color: theme.colors.primary,
      fontSize: 14,
      alignSelf: 'flex-end',
      textTransform: 'capitalize',
    },
  });
