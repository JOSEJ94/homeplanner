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

const InviteFamilyMember = () => {
  const theme = useTheme() as AppTheme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const navigation =
    useNavigation<NativeStackNavigationProp<AppScreensParamList>>();
  const route = useRoute<RouteProp<AppScreensParamList>>();
  const params =
    route.params as AppScreensParamList[Routes.INVITE_FAMILY_MEMBER];
  const [email, setEmail] = useState(params?.email);
  const [submitting, setSubmitting] = useState(false);

  const onInviteMemberPress = () => {
    try {
      setSubmitting(true);
      navigation.goBack();
    } catch (error) {
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Typography variant={TypographyVariant.HEADING}>
          Invite family
        </Typography>
        <Typography style={styles.descriptionTxt}>
          Enter your family member email below to send an invitation
        </Typography>
        <TextInput value={email} onChangeText={setEmail} placeholder="Email" />
      </View>
      <Button
        loading={submitting}
        disabled={!email}
        onPress={onInviteMemberPress}
        title="Send Invite"
        fullWidth
      />
    </ScrollView>
  );
};

export default InviteFamilyMember;

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
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
