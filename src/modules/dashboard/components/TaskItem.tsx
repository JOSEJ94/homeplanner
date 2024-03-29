import {View, StyleSheet, ColorValue} from 'react-native';
import React, {useMemo} from 'react';
import Typography, {
  TypographyVariant,
} from '../../../shared/components/Typography';
import {TaskDto} from '../../../shared/models/TaskDto';
import {AppTheme} from '../../../shared/themes/Theme';
import {useTheme} from '@react-navigation/native';

interface TaskItemProps {
  task: TaskDto;
}

const TaskItem = ({task}: TaskItemProps) => {
  const theme = useTheme() as AppTheme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <Typography variant={TypographyVariant.CAPTION} style={styles.titleTxt}>
        {task.title}
      </Typography>
      <View style={styles.subInformationContainer}>
        <Typography style={styles.categoryTxt}>{task.category}</Typography>
        <Typography style={styles.scheduleTypeTxt}>
          {task.schedule.type}
        </Typography>
      </View>
    </View>
  );
};

export default TaskItem;

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.white as ColorValue,
      paddingHorizontal: theme.spacing * 2,
      paddingVertical: theme.spacing,
      borderBottomColor: theme.colors.border,
      borderBottomWidth: 1,
    },
    subInformationContainer: {
      marginTop: theme.spacing / 2,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    titleTxt: {
      fontSize: 16,
      fontWeight: '400',
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
