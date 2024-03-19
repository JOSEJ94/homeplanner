import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import LoginScreen from './src/modules/authentication/LoginScreen';
import {Routes} from './src/shared/constants/Routes';
import {lightTheme} from './src/shared/themes/Theme';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer theme={lightTheme}>
      <Stack.Navigator>
        <Stack.Screen name={Routes.LOGIN} component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
