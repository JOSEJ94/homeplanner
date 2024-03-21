import {View, Text} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import Button from '../../shared/components/Button';

const DashboardScreen = () => {
  const logout = async () => {
    try {
      auth().signOut();
    } catch (error) {}
  };

  return (
    <View>
      <Text>DashboardScreen</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
};

export default DashboardScreen;
