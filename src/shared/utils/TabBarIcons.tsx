import {GestureResponderEvent} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export const renderTabBarIcon =
  (
    name: string,
    size = 20,
    onPress?: ((event: GestureResponderEvent) => void) | undefined,
  ) =>
  (props: {focused: boolean; color: string; size: number}) =>
    <Icon name={name} color={props.color} size={size} onPress={onPress} />;
