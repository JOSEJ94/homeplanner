import {
  Animated,
  FlatList,
  ListRenderItemInfo,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import BottomModal from '../BottomModal';
import Typography from '../Typography';
import {AppTheme} from '../../themes/Theme';
import {
  RouteProp,
  useNavigation,
  useRoute,
  useTheme,
} from '@react-navigation/native';
import {AppScreensParamList, Routes} from '../../../routes/RoutesParams';
import Button from '../Button';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export enum FilterType {
  SingleOption,
  MultipleOption,
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const RoomPicker = () => {
  const theme = useTheme() as AppTheme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const navigation =
    useNavigation<
      NativeStackNavigationProp<AppScreensParamList, Routes.OPTION_PICKER>
    >();
  const route =
    useRoute<RouteProp<AppScreensParamList, Routes.OPTION_PICKER>>();
  const {
    label,
    options,
    type,
    onOptionSelected,
    selected,
    ctaLabel = 'Save',
    renderItem,
    identityComparator = (a, b) => a === b,
  } = route.params;

  const fadeAnimation = new Animated.Value(0);
  useEffect(() => {
    Animated.timing(fadeAnimation, {
      toValue: 0.5,
      duration: 500,
      useNativeDriver: false,
      delay: 250,
    }).start();
  }, []);

  const [selectedOption, setSelectedOption] = useState<
    unknown | unknown[] | null
  >(selected);

  const fadeOutEffect: () => void = () =>
    Animated.timing(fadeAnimation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start(navigation.goBack);

  const onLocalPress = (newSelected: unknown) => {
    if (type === FilterType.SingleOption) {
      setSelectedOption(newSelected);
    }
    if (type === FilterType.MultipleOption) {
      const selectedArray = selectedOption as unknown[];
      const newArray = selectedArray.filter(
        e => !identityComparator(e, newSelected),
      );
      if (newArray.length < selectedArray.length) {
        setSelectedOption(newArray);
      } else {
        setSelectedOption([...selectedArray, newSelected]);
      }
    }
  };

  const onLocalSave = () => {
    if (onOptionSelected) {
      onOptionSelected(selectedOption);
    }
    fadeOutEffect();
  };

  const localRenderInfo = (info: ListRenderItemInfo<unknown>) => {
    return renderItem(selectedOption, () => onLocalPress(info.item), info.item);
  };

  const footer = (
    <Button
      title={ctaLabel}
      fullWidth
      style={styles.saveBtn}
      onPress={onLocalSave}
    />
  );

  const header = (
    <View style={styles.titleContainer}>
      <Typography>{label}</Typography>
    </View>
  );

  return (
    <>
      <AnimatedPressable
        onPress={fadeOutEffect}
        style={[
          styles.overlay,
          {
            opacity: fadeAnimation,
          },
        ]}
      />
      <BottomModal>
        <FlatList
          ListHeaderComponent={header}
          ListFooterComponent={footer}
          data={options}
          renderItem={localRenderInfo}
        />
      </BottomModal>
    </>
  );
};

export default RoomPicker;

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    titleContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      paddingBottom: 12,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: theme.background.card,
    },
    saveBtn: {
      marginHorizontal: theme.spacing * 4,
      marginVertical: theme.spacing,
    },
  });
