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
import {FamilyMemberDto} from '../../../shared/models/FamilyMemberDto';

interface FamilyMemberCardProps extends PressableProps {
  familyMember: FamilyMemberDto;
  style?: StyleProp<ViewStyle>;
}

const FamilyMemberCard = ({
  familyMember,
  style,
  ...rest
}: FamilyMemberCardProps) => {
  const theme = useTheme() as AppTheme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <Pressable {...rest} style={[styles.container, style]}>
      <RoundedImage
        source={{
          uri: familyMember.photo,
        }}
      />
      <Typography>{familyMember.name}</Typography>
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
