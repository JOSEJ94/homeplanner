import {View, ScrollView, Pressable, StyleSheet} from 'react-native';
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
import {IconType} from '../../graphql/generated';

export interface Icon {
  name: string;
  type: IconType;
}

const icons: Icon[] = [
  {name: 'glass', type: IconType.Fontawesome},
  {name: 'suitcase', type: IconType.Fontawesome},
  {name: 'heart', type: IconType.Fontawesome},
  {name: 'music', type: IconType.Fontawesome},
  {name: 'star', type: IconType.Fontawesome},
  {name: 'home', type: IconType.Fontawesome},
  {name: 'gear', type: IconType.Fontawesome},
  {name: 'leaf', type: IconType.Fontawesome},
  {name: 'shopping-cart', type: IconType.Fontawesome},
  {name: 'folder', type: IconType.Fontawesome},
  {name: 'coffee', type: IconType.Fontawesome},
  {name: 'cutlery', type: IconType.Fontawesome},
  {name: 'bank', type: IconType.Fontawesome},
  {name: 'automobile', type: IconType.Fontawesome},
  {name: 'motorcycle', type: IconType.Fontawesome},
  {name: 'bed', type: IconType.Fontawesome},
  {name: 'bath', type: IconType.Fontawesome},
];

const getIcon = (icon: IconType) => {
  switch (icon) {
    case IconType.Fontawesome:
      return FontAwesomeIcon;
    default:
      return FontAwesomeIcon;
  }
};

const IconPicker = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppScreensParamList>>();
  const route = useRoute<RouteProp<AppScreensParamList, Routes.ICON_PICKER>>();
  const params = route.params;
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
