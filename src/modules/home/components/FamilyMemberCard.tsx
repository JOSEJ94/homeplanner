import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import React, {useMemo} from 'react';
import RoundedImage from '../../../shared/components/RoundedImage';
import Typography from '../../../shared/components/Typography';
import {AppTheme} from '../../../shared/themes/Theme';
import {useTheme} from '@react-navigation/native';
import {GroupMemberFragment} from '../../../graphql/generated';
import {firebase} from '@react-native-firebase/auth';
import {getStaticImageName} from '../../../shared/utils/Image.utils';

interface FamilyMemberCardProps extends PressableProps {
  member: GroupMemberFragment;
  style?: StyleProp<ViewStyle>;
}

const FamilyMemberCard = ({member, style, ...rest}: FamilyMemberCardProps) => {
  const theme = useTheme() as AppTheme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const currentUser = firebase.auth().currentUser?.uid === member.user.id;
  const imageSource =
    member.user.profilePhoto || getStaticImageName('default-user.png');

  return (
    <Pressable {...rest} style={[styles.container, style]}>
      <RoundedImage
        source={{
          uri: imageSource,
        }}
      />
      <Typography>
        {member.user.name} {currentUser && '(You)'}
      </Typography>
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
  });
