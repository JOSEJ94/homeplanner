import {ScrollView, StyleSheet} from 'react-native';
import React, {useMemo, useState} from 'react';
import Typography, {
  TypographyVariant,
} from '../../shared/components/Typography';
import Checkbox from '../../shared/components/Checkbox';
import {AppTheme} from '../../shared/themes/Theme';
import {useTheme} from '@react-navigation/native';

const CommunicationSettingsScreen = () => {
  const theme = useTheme() as AppTheme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  // Push Notifications
  const [pushAppUpdates, setPushAppUpdates] = useState(false);
  const [pushTasksCompleted, setPushTasksCompleted] = useState(false);
  // Email Notifications
  const [emailAppUpdates, setEmailAppUpdates] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <Typography variant={TypographyVariant.HEADING}>Communication</Typography>
      <Typography
        style={styles.sectionTitle}
        variant={TypographyVariant.SUB_HEADING}>
        Push Notifications
      </Typography>
      <Checkbox
        title="App updates & news"
        hint="Updates about new features & interesting news"
        selected={pushAppUpdates}
        onPress={() => setPushAppUpdates(!pushAppUpdates)}
        containerStyle={styles.checkbox}
      />
      <Checkbox
        title="Tasks completed"
        hint="Get notified when all chores are completed"
        selected={pushTasksCompleted}
        onPress={() => setPushTasksCompleted(!pushTasksCompleted)}
      />
      <Typography
        style={styles.sectionTitle}
        variant={TypographyVariant.SUB_HEADING}>
        Emails
      </Typography>
      <Checkbox
        title="App updates & news"
        hint="Updates about new features & interesting news"
        selected={emailAppUpdates}
        onPress={() => setEmailAppUpdates(!emailAppUpdates)}
      />
    </ScrollView>
  );
};

export default CommunicationSettingsScreen;

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      marginHorizontal: theme.spacing * 2,
    },
    sectionTitle: {
      marginTop: theme.spacing * 2,
      marginBottom: theme.spacing / 2,
    },
    checkbox: {
      marginVertical: theme.spacing / 2,
    },
  });
