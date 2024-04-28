import {View, StyleSheet, ScrollView} from 'react-native';
import React, {useMemo, useState} from 'react';
import Typography, {
  TypographyVariant,
} from '../../shared/components/Typography';
import TextInput from '../../shared/components/TextInput';
import {
  RouteProp,
  useNavigation,
  useRoute,
  useTheme,
} from '@react-navigation/native';
import {AppTheme} from '../../shared/themes/Theme';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppScreensParamList, Routes} from '../../routes/RoutesParams';
import Button from '../../shared/components/Button';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useMutation} from '@apollo/client';
import {AddMemberDocument, GroupFragmentDoc} from '../../graphql/generated';

const InviteFamilyMember = () => {
  const theme = useTheme() as AppTheme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const navigation =
    useNavigation<NativeStackNavigationProp<AppScreensParamList>>();
  const route = useRoute<RouteProp<AppScreensParamList>>();
  const params =
    route.params as AppScreensParamList[Routes.INVITE_FAMILY_MEMBER];
  const [email, setEmail] = useState('');
  const [addMember, {loading: submitting}] = useMutation(AddMemberDocument, {
    update: (cache, {data: invitedMember}) => {
      cache.modify({
        broadcast: true,
        fields: {
          getGroups(existingGroups = []) {
            const group = cache.readFragment({
              id: existingGroups[0].__ref,
              fragmentName: 'group',
              fragment: GroupFragmentDoc,
            });
            const members = [...group!.members];
            members.push(invitedMember!.addMember);
            return [{...group, members}];
          },
        },
      });
    },
  });

  const onInviteMemberPress = async () => {
    try {
      const invitedMember = await addMember({
        variables: {userEmail: email, groupId: params.groupId},
      });
      navigation.goBack();
    } catch (error: any) {
      console.error(`Error`, error);
    }
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <Typography variant={TypographyVariant.HEADING}>
            Invite family
          </Typography>
          <Typography style={styles.descriptionTxt}>
            Enter your family member email below to send an invitation
          </Typography>
          <TextInput
            value={email}
            autoCapitalize="none"
            onChangeText={setEmail}
            placeholder="Email"
          />
        </View>
        <Button
          loading={submitting}
          disabled={!email}
          onPress={onInviteMemberPress}
          title="Send Invite"
          fullWidth
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default InviteFamilyMember;

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
    },
    container: {
      paddingHorizontal: theme.spacing * 2,
      paddingBottom: theme.spacing,
      flex: 1,
      justifyContent: 'space-between',
    },
    descriptionTxt: {
      marginVertical: theme.spacing,
    },
  });
