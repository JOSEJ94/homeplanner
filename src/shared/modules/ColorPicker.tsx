import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {RGBPicker} from 'react-native-light-color-picker';
import Button from '../components/Button';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {AppScreensParamList, Routes} from '../../routes/RoutesParams';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const ColorPicker = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppScreensParamList>>();
  const route = useRoute<RouteProp<AppScreensParamList>>();
  const params = route.params as AppScreensParamList[Routes.COLOR_PICKER];
  const [selectedColor, setSelectedColor] = useState(
    params.currentColor ?? '#FF0000',
  );

  const pickAColor = () => {
    const {onColorSelected} = params;
    onColorSelected(selectedColor);
    navigation.goBack();
  };

  return (
    <View>
      <RGBPicker
        value={selectedColor}
        onChangeComplete={console.log}
        onChange={setSelectedColor}
      />
      <Button onPress={pickAColor} title="Pick color" fullWidth />
    </View>
  );
};

export default ColorPicker;

const styles = StyleSheet.create({});
