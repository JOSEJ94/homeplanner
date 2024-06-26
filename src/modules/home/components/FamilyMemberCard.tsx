import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import React, {useMemo} from 'react';
import RoundedImage from '../../../shared/components/RoundedImage';
import Typography from '../../../shared/components/Typography';
import {AppTheme} from '../../../shared/themes/Theme';
import {useTheme} from '@react-navigation/native';
import {GroupMemberFragment, GroupStatus} from '../../../graphql/generated';
import {firebase} from '@react-native-firebase/auth';
import {getStaticImageName} from '../../../shared/utils/Image.utils';
import {GROUP_ROLE_LABELS} from '../../../shared/utils/GroupRole.utils';
import Spacer from '../../../shared/components/Spacer';

interface FamilyMemberCardProps extends PressableProps {
  member: GroupMemberFragment;
  style?: StyleProp<ViewStyle>;
}

const FamilyMemberCard = ({member, style, ...rest}: FamilyMemberCardProps) => {
  const theme = useTheme() as AppTheme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const currentUser = firebase.auth().currentUser?.uid === member.user.id;

  return (
    <Pressable {...rest} style={[styles.container, style]}>
      <RoundedImage
        sourceUri={member.user.profilePhoto}
        placeholderUri={getStaticImageName('default-user.png')}
      />
      <Spacer style={styles.horizontalSpacer} />
      <View>
        <Typography>
          {member.user.name}
          {currentUser && (
            <Typography style={styles.roleTxt}> (You)</Typography>
          )}{' '}
          {member.status === GroupStatus.Invited && (
            <Typography style={styles.invitedTxt}>(Invited)</Typography>
          )}
        </Typography>
        <Spacer style={styles.spacer} />
        <Typography style={styles.roleTxt}>
          {GROUP_ROLE_LABELS[member.role]}
        </Typography>
      </View>
    </Pressable>
  );
};

export default FamilyMemberCard;

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      padding: theme.spacing,
      alignItems: 'center',
    },
    spacer: {
      height: theme.spacing,
    },
    horizontalSpacer: {
      width: theme.spacing,
    },
    invitedTxt: {
      color: theme.colors.primary,
    },
    roleTxt: {
      fontSize: 14,
      color: theme.text.subtle,
    },
  });
