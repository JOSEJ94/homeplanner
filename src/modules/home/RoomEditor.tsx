import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {AppTheme} from '../../shared/themes/Theme';
import {
  RouteProp,
  useNavigation,
  useRoute,
  useTheme,
} from '@react-navigation/native';
import {AppScreensParamList, Routes} from '../../routes/RoutesParams';
import Typography from '../../shared/components/Typography';
import TextInput from '../../shared/components/TextInput';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Button, {ButtonVariant} from '../../shared/components/Button';
import RoomCard from './components/RoomCard';
import {Icon} from '../../shared/modules/IconPicker';
import {GetRoomDetailsDocument, IconType} from '../../graphql/generated';
import {useQuery} from '@apollo/client';

const DEFAULT_ICON: Icon = {
  name: 'home',
  type: IconType.Fontawesome,
};

const RoomEditor = () => {
  const theme = useTheme() as AppTheme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const navigation =
    useNavigation<NativeStackNavigationProp<AppScreensParamList>>();
  const route = useRoute<RouteProp<AppScreensParamList>>();
  const params = route.params as AppScreensParamList[Routes.ROOM_EDITOR];
  const id = params?.id || '';
  const {data, loading, error} = useQuery(GetRoomDetailsDocument, {
    variables: {id},
    skip: !id,
  });
  const existingRoomDetails = data?.getRoomDetails;
  const [saving, setSaving] = useState(false);
  const [selectedRoomName, setSelectedRoomName] = useState('');
  const [selectedRoomIcon, setSelectedRoomIcon] = useState<Icon>(DEFAULT_ICON);
  const [selectedRoomColor, setSelectedRoomColor] = useState('#FF0000');

  useEffect(() => {
    if (existingRoomDetails) {
      setSelectedRoomName(existingRoomDetails.name);
      setSelectedRoomIcon({
        name: existingRoomDetails.iconName,
        type: existingRoomDetails.iconType,
      });
      setSelectedRoomName(existingRoomDetails.name);
      setSelectedRoomColor(existingRoomDetails.color);
    }
  }, [existingRoomDetails]);

  useMemo(
    () =>
      navigation.setOptions({
        headerTitle: id ? 'Edit Room' : 'New Room',
      }),
    [id],
  );

  const pickAColor = () =>
    navigation.navigate(Routes.COLOR_PICKER, {
      currentColor: selectedRoomColor,
      onColorSelected: setSelectedRoomColor,
    });

  const pickAnIcon = () =>
    navigation.navigate(Routes.ICON_PICKER, {
      currentIcon: selectedRoomIcon,
      onIconSelected: setSelectedRoomIcon,
    });

  const isSavingButtonDisabled =
    !selectedRoomName || !selectedRoomColor || !selectedRoomIcon;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Typography>Preview</Typography>
        <RoomCard
          style={styles.roomPreviewCard}
          room={{
            name: selectedRoomName || 'Enter name',
            color: selectedRoomColor,
            iconName: selectedRoomIcon?.name,
            iconType: selectedRoomIcon?.type,
            id,
          }}
        />
        <TextInput
          containerStyle={styles.roomNameInput}
          title="Room name"
          placeholder="Enter a name"
          onChangeText={setSelectedRoomName}
        />
        <View style={styles.buttonContainer}>
          <Button
            onPress={pickAColor}
            title="Pick Color"
            variant={ButtonVariant.SECONDARY}
          />
          <Button
            onPress={pickAnIcon}
            title="Pick Icon"
            variant={ButtonVariant.SECONDARY}
          />
        </View>
      </View>
      <Button
        loading={saving}
        disabled={isSavingButtonDisabled}
        onPress={navigation.goBack}
        title="Save"
        fullWidth
      />
    </ScrollView>
  );
};

export default RoomEditor;

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      padding: theme.spacing * 2,
      flex: 1,
      justifyContent: 'space-between',
    },
    roomPreviewCard: {
      alignSelf: 'center',
      width: Dimensions.get('screen').width / 2 - theme.spacing * 2,
    },
    roomNameInput: {
      marginBottom: theme.spacing * 3,
    },
    buttonContainer: {
      marginHorizontal: theme.spacing,
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
  });
