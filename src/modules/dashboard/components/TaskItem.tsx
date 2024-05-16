import {View, StyleSheet, ColorValue} from 'react-native';
import React, {useMemo} from 'react';
import Typography, {
  TypographyVariant,
} from '../../../shared/components/Typography';
import {AppTheme} from '../../../shared/themes/Theme';
import {useTheme} from '@react-navigation/native';
import {TaskFragment} from '../../../graphql/generated';
import moment from 'moment';
import {formatTime} from '../../../shared/utils/Date.utils';

interface TaskItemProps {
  task: TaskFragment;
}

const TaskItem = ({task}: TaskItemProps) => {
  const theme = useTheme() as AppTheme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const time = formatTime(moment(task.scheduleDay));

  return (
    <View style={styles.container}>
      <Typography variant={TypographyVariant.CAPTION} style={styles.timeTxt}>
        {time}
      </Typography>
      <View style={{flex: 1, marginLeft: 8}}>
        <Typography variant={TypographyVariant.CAPTION} style={styles.titleTxt}>
          {task.title}
        </Typography>
        <View style={styles.subInformationContainer}>
          <Typography style={styles.categoryTxt}>{task.room.name}</Typography>
          <Typography style={styles.scheduleTypeTxt}>
            {task.scheduleType}
          </Typography>
        </View>
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
      flexDirection: 'row',
      alignItems: 'center',
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
    timeTxt: {
      fontSize: 18,
    },
    scheduleTypeTxt: {
      color: theme.colors.primary,
      fontSize: 14,
      alignSelf: 'flex-end',
      textTransform: 'capitalize',
    },
  });
