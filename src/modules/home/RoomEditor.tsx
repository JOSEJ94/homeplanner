import {ScrollView, StyleSheet, View} from 'react-native';
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
import {
  CreateRoomDocument,
  GetRoomDetailsDocument,
  IconType,
  UpdateRoomDocument,
} from '../../graphql/generated';
import {useMutation, useQuery} from '@apollo/client';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Skeleton} from 'moti/skeleton';

const DEFAULT_ICON: Icon = {
  name: 'home',
  type: IconType.Fontawesome,
};

const RoomEditor = () => {
  const theme = useTheme() as AppTheme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const navigation =
    useNavigation<NativeStackNavigationProp<AppScreensParamList>>();
  const route = useRoute<RouteProp<AppScreensParamList, Routes.ROOM_EDITOR>>();
  const params = route.params;
  const id = params?.id || '';
  const groupId = params?.groupId;
  const {data, loading, error} = useQuery(GetRoomDetailsDocument, {
    variables: {id},
    skip: !id,
  });

  const [createRoom, {loading: submittingRoomCreation}] =
    useMutation(CreateRoomDocument);
  const [updateRoom, {loading: submittingRoomUpdate}] =
    useMutation(UpdateRoomDocument);
  const existingRoomDetails = data?.getRoomDetails;
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

  const onSavePress = async () => {
    try {
      if (id) {
        await updateRoom({
          variables: {
            id,
            color: selectedRoomColor,
            iconName: selectedRoomIcon.name,
            iconType: selectedRoomIcon.type,
            name: selectedRoomName,
          },
        });
      } else {
        await createRoom({
          variables: {
            color: selectedRoomColor,
            iconName: selectedRoomIcon.name,
            iconType: selectedRoomIcon.type,
            name: selectedRoomName,
            groupId: groupId!,
          },
        });
      }
      navigation.goBack();
    } catch (error: any) {
      console.error('Error', error.message);
    }
  };

  const isSavingButtonDisabled =
    !selectedRoomName || !selectedRoomColor || !selectedRoomIcon;
  return (
    <SafeAreaView edges={['bottom']} style={styles.safeAreaContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <Skeleton.Group show={loading}>
          <View>
            <Typography skeletonProps={{width: 60}}>Preview</Typography>
            <RoomCard
              style={styles.roomPreviewCard}
              groupId=""
              room={{
                name: selectedRoomName || 'Enter name',
                color: selectedRoomColor,
                iconName: selectedRoomIcon?.name,
                iconType: selectedRoomIcon?.type,
                id,
              }}
            />
            <TextInput
              maxLength={25}
              value={selectedRoomName}
              containerStyle={styles.roomNameInput}
              titleProps={{skeletonProps: {width: 90}}}
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
            loading={submittingRoomCreation || submittingRoomUpdate}
            disabled={isSavingButtonDisabled}
            onPress={onSavePress}
            title="Save"
            fullWidth
          />
        </Skeleton.Group>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RoomEditor;

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    safeAreaContainer: {
      flex: 1,
    },
    container: {
      padding: theme.spacing * 2,
      flexGrow: 1,
      justifyContent: 'space-between',
    },
    roomPreviewCard: {
      alignSelf: 'center',
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
