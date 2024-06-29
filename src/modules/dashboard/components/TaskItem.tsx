import React, {useState} from 'react';
import {View, StyleSheet, Text, ColorValue, Pressable} from 'react-native';
import {useTheme} from '@react-navigation/native';
import moment from 'moment';
import {formatTime} from '../../../shared/utils/Date.utils';
import {AppTheme} from '../../../shared/themes/Theme';
import {TaskFragment} from '../../../graphql/generated';
import CompletionCheckbox from '../../../shared/components/CompletionCheckbox';

const CHECKBOX_SIZE = 28;

interface TaskItemProps {
  task: TaskFragment;
  onPress?: () => void;
}

const TaskItem = ({task, onPress}: TaskItemProps) => {
  const theme = useTheme() as AppTheme;
  const [isCompleted, setIsCompleted] = useState(Boolean(task.completionDate));
  const styles = createStyles(theme);
  const time = formatTime(moment(task.scheduleDay));

  const onCompleteCheckboxPress = () => setIsCompleted(!isCompleted);

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.leftContainer}>
        <CompletionCheckbox
          size={CHECKBOX_SIZE}
          hitSlop={theme.hitSlop}
          color={theme.success as ColorValue}
          unselectedColor={theme.faded as ColorValue}
          containerStyle={styles.checkBox}
          selected={isCompleted}
          onPress={onCompleteCheckboxPress}
        />
      </View>
      <View style={styles.rightContainer}>
        <View style={styles.taskInfo}>
          <Text style={styles.titleTxt}>{task.title}</Text>
          <View style={styles.timeContainer}>
            <Text style={styles.timeTxt}>{time}</Text>
            <View
              style={[styles.typeBullet, {backgroundColor: task.room.color}]}
            />
          </View>
        </View>
        <Text style={styles.descriptionTxt} numberOfLines={2}>
          {task.description}
        </Text>
      </View>
    </Pressable>
  );
};

export default TaskItem;

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.white as ColorValue,
      marginHorizontal: theme.spacing * 2,
      marginVertical: theme.spacing,
      paddingHorizontal: theme.spacing * 1.5,
      paddingVertical: theme.spacing * 1.5,
      borderStartWidth: 1,
      borderTopWidth: 1,
      borderEndWidth: 1,
      borderStartColor: theme.disabled as ColorValue,
      borderEndColor: theme.disabled as ColorValue,
      borderTopColor: theme.disabled as ColorValue,
      borderRadius: 8,
      elevation: 3,
      shadowRadius: 4,
      shadowColor: '#000',
      shadowOpacity: 0.3,
      shadowOffset: {width: 0, height: 8},
      flexDirection: 'row',
    },
    leftContainer: {
      alignSelf: 'flex-start',
    },
    leftText: {
      color: 'white',
      fontWeight: 'bold',
    },
    rightContainer: {
      flex: 1,
      marginLeft: 16,
    },
    taskInfo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    titleTxt: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#000',
      flex: 1,
    },
    descriptionTxt: {
      color: theme.faded as ColorValue,
      fontSize: 14,
      marginTop: 4,
      flexShrink: 1,
    },
    checkBox: {
      alignItems: 'flex-start',
    },
    timeContainer: {
      flexDirection: 'row',
    },
    timeTxt: {
      marginLeft: theme.spacing / 2,
      fontSize: 18,
      color: '#000',
    },
    typeBullet: {
      marginLeft: 4,
      width: 8,
      height: 8,
      borderRadius: 4,
      alignSelf: 'center',
    },
  });
