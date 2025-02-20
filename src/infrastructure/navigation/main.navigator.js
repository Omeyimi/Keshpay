import React from 'react';

import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import { HomeNavigator } from './home.navigator';

const Stack = createStackNavigator();

export const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="HomeNavigator">
      <Stack.Screen name="HomeNavigator" component={HomeNavigator} />
    </Stack.Navigator>
  );
};
