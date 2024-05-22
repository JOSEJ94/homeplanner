import {Animated, Pressable, StyleSheet, View} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import BottomModal from '../../../shared/components/BottomModal';
import Typography from '../../../shared/components/Typography';
import {AppTheme} from '../../../shared/themes/Theme';
import {
  RouteProp,
  useNavigation,
  useRoute,
  useTheme,
} from '@react-navigation/native';
import ListFilter from '../../../shared/components/filter/ListFilter';
import {AppScreensParamList, Routes} from '../../../routes/RoutesParams';
import Button from '../../../shared/components/Button';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export enum FilterType {
  SingleOption,
}

export interface FilterOption<T> {
  label: string;
  value: T;
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

  const [selectedOption, setSelectedOption] = useState<unknown | null>(
    selected,
  );

  const fadeOutEffect = () =>
    Animated.timing(fadeAnimation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start(navigation.goBack);

  const onLocalPress = (selected: unknown) => {
    setSelectedOption(selected);
  };

  const onLocalSave = () => {
    if (onOptionSelected) {
      onOptionSelected(selectedOption);
    }
    fadeOutEffect();
  };

  const footer = (
    <Button
      title={ctaLabel}
      fullWidth
      style={styles.saveBtn}
      onPress={onLocalSave}
    />
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
        <ListFilter
          ListHeaderComponent={
            <View style={styles.titleContainer}>
              <Typography>{label}</Typography>
            </View>
          }
          selected={options.find(option => option.value === selectedOption)}
          options={options}
          ListFooterComponent={footer}
          onPress={onLocalPress}
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
