import {StyleSheet, View} from 'react-native';
import React, {useMemo, useState} from 'react';
import {RGBPicker} from 'react-native-light-color-picker';
import Button from '../components/Button';
import {
  RouteProp,
  useNavigation,
  useRoute,
  useTheme,
} from '@react-navigation/native';
import {AppScreensParamList, Routes} from '../../routes/RoutesParams';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppTheme} from '../themes/Theme';

const ColorPicker = () => {
  const theme = useTheme() as AppTheme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const navigation =
    useNavigation<NativeStackNavigationProp<AppScreensParamList>>();
  const route = useRoute<RouteProp<AppScreensParamList, Routes.COLOR_PICKER>>();
  const params = route.params;
  const [selectedColor, setSelectedColor] = useState(
    params.currentColor ?? '#FF0000',
  );

  const pickAColor = () => {
    const {onColorSelected} = params;
    onColorSelected(selectedColor);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <RGBPicker value={selectedColor} onChange={setSelectedColor} />
      <Button
        style={styles.saveBtn}
        onPress={pickAColor}
        title="Pick color"
        fullWidth
      />
    </View>
  );
};

export default ColorPicker;

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      paddingVertical: theme.spacing,
    },
    saveBtn: {
      marginHorizontal: theme.spacing * 2,
      marginBottom: theme.spacing,
    },
  });
