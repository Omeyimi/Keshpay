import React from 'react';

import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Dashboard from '../../screens/Dashboard/dashboard.screen';
import {PaperProvider} from 'react-native-paper';
const Stack = createStackNavigator();

export const HomeNavigator = () => {
  return (
    <PaperProvider>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Dashboard">
        <Stack.Screen name="Dashboard" component={Dashboard} />
       
      </Stack.Navigator>
    </PaperProvider>
  );
};
