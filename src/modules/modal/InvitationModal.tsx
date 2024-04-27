import {StyleSheet, Text, View} from 'react-native';
import React, {useMemo} from 'react';
import {AppTheme} from '../../shared/themes/Theme';
import {useTheme} from '@react-navigation/native';
import {useQuery} from '@apollo/client';
import {GetInvitationsDocument} from '../../graphql/generated';

const InvitationModal = () => {
  const theme = useTheme() as AppTheme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  useQuery(GetInvitationsDocument);

  return (
    <View>
      <Text>InvitationModal</Text>
    </View>
  );
};

export default InvitationModal;

const createStyles = (theme: AppTheme) => StyleSheet.create({});
