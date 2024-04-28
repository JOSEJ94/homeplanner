import {Animated, Pressable, StyleSheet, View} from 'react-native';
import React, {useEffect, useMemo} from 'react';
import {AppTheme} from '../../shared/themes/Theme';
import {useNavigation, useTheme} from '@react-navigation/native';
import {useMutation, useQuery} from '@apollo/client';
import {
  GetInvitationsDocument,
  GroupStatus,
  UpdateInviteStatusDocument,
} from '../../graphql/generated';
import Typography, {
  TypographyVariant,
} from '../../shared/components/Typography';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppScreensParamList} from '../../routes/RoutesParams';
import Button, {ButtonVariant} from '../../shared/components/Button';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const InvitationModal = () => {
  const theme = useTheme() as AppTheme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const navigation =
    useNavigation<NativeStackNavigationProp<AppScreensParamList>>();
  const {
    data: invitationsData,
    loading: loadingInvitations,
    error: errorInvitations,
  } = useQuery(GetInvitationsDocument);
  const [updateInvitationStatus, {loading: loadingUpdateInvitation}] =
    useMutation(UpdateInviteStatusDocument);
  // FIXME: At this moment we're only working with 1st invitation received. Ideally, we should handle all
  const invitation = invitationsData?.getInvitations[0]!;

  const respondInvitation = (newStatus: GroupStatus) => async () => {
    try {
      await updateInvitationStatus({
        variables: {groupId: invitation.group.id, newStatus},
      });
      navigation.goBack();
    } catch (error) {
      console.error('Error', error);
    }
  };

  const groupName = invitation.group.name;
  const isLoading = loadingInvitations || loadingUpdateInvitation;

  const fadeAnimation = new Animated.Value(0);
  useEffect(() => {
    Animated.timing(fadeAnimation, {
      toValue: 0.5,
      duration: 500,
      useNativeDriver: false,
      delay: 250,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <AnimatedPressable
        onPress={navigation.goBack}
        style={[
          styles.overlay,
          {
            opacity: fadeAnimation,
          },
        ]}
      />
      <View style={styles.windowContainer}>
        <Typography variant={TypographyVariant.CAPTION}>
          Invitation Received!
        </Typography>
        <Typography variant={TypographyVariant.BODY} style={styles.contentTxt}>
          You've been invite to join {groupName} group
        </Typography>
        <View style={styles.buttonContainer}>
          <Button
            loading={isLoading}
            onPress={respondInvitation(GroupStatus.Rejected)}
            title="Reject"
            variant={ButtonVariant.SECONDARY}
          />
          <Button
            loading={isLoading}
            onPress={respondInvitation(GroupStatus.Accepted)}
            title={`Join ${groupName}`}
          />
        </View>
      </View>
    </View>
  );
};

export default InvitationModal;

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: theme.background.card,
    },
    windowContainer: {
      maxWidth: '80%',
      backgroundColor: theme.colors.card,
      borderRadius: 15,
      padding: theme.spacing * 2,
    },
    buttonContainer: {
      marginTop: theme.spacing * 2,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    contentTxt: {
      marginTop: theme.spacing,
    },
  });
