import {View, Text, ScrollView, Pressable, StyleSheet} from 'react-native';
import React, {useMemo, useState} from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {
  RouteProp,
  useNavigation,
  useRoute,
  useTheme,
} from '@react-navigation/native';
import {AppTheme} from '../themes/Theme';
import Button from '../components/Button';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppScreensParamList, Routes} from '../../routes/RoutesParams';

export enum IconType {
  FontAwesome,
  AntDesign,
}

export interface Icon {
  name: string;
  type: IconType;
}

const icons: Icon[] = [
  {name: 'glass', type: IconType.FontAwesome},
  {name: 'suitcase', type: IconType.FontAwesome},
  {name: 'heart', type: IconType.FontAwesome},
  {name: 'music', type: IconType.FontAwesome},
  {name: 'star', type: IconType.FontAwesome},
  {name: 'home', type: IconType.FontAwesome},
  {name: 'gear', type: IconType.FontAwesome},
  {name: 'leaf', type: IconType.FontAwesome},
  {name: 'shopping-cart', type: IconType.FontAwesome},
  {name: 'folder', type: IconType.FontAwesome},
  {name: 'coffee', type: IconType.FontAwesome},
  {name: 'cutlery', type: IconType.FontAwesome},
  {name: 'bank', type: IconType.FontAwesome},
  {name: 'automobile', type: IconType.FontAwesome},
  {name: 'motorcycle', type: IconType.FontAwesome},
  {name: 'bed', type: IconType.FontAwesome},
  {name: 'bath', type: IconType.FontAwesome},
];

const getIcon = (icon: IconType) => {
  switch (icon) {
    case IconType.FontAwesome:
      return FontAwesomeIcon;
    default:
      return FontAwesomeIcon;
  }
};

const IconPicker = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppScreensParamList>>();
  const route = useRoute<RouteProp<AppScreensParamList>>();
  const params = route.params as AppScreensParamList[Routes.ICON_PICKER];
  const theme = useTheme() as AppTheme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [selectedIcon, setselectedIcon] = useState<Icon | undefined>(
    params.currentIcon,
  );

  const renderIcon = (icon: Icon) => {
    const IconComponent = getIcon(icon.type);
    const onIconPresed = () => setselectedIcon(icon);

    return (
      <Pressable
        onPress={onIconPresed}
        style={[
          styles.iconContainer,
          selectedIcon === icon && styles.iconSelected,
        ]}>
        <IconComponent
          name={icon.name}
          color={theme.colors.primary}
          size={40}
        />
      </Pressable>
    );
  };

  const onPickIconPressed = () => {
    const {onIconSelected} = params;
    if (!selectedIcon) return;
    onIconSelected(selectedIcon);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollviewContainer}>
        {icons.map(renderIcon)}
      </ScrollView>
      <Button onPress={onPickIconPressed} title="Use this icon" fullWidth />
    </View>
  );
};

export default IconPicker;

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: theme.spacing * 2,
    },
    scrollviewContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    iconSelected: {
      opacity: 1,
    },
    iconContainer: {
      opacity: 0.4,
      width: 55,
      margin: theme.spacing,
    },
  });
