import React from 'react';

import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Dashboard from '../../screens/Dashboard/dashboard.screen';
import {PaperProvider} from 'react-native-paper';
import ArrivedDelivery from '../../screens/ArrivedDelivery/arrivedDelivery.screen';
const Stack = createStackNavigator();

export const HomeNavigator = () => {
  return (
    <PaperProvider>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Dashboard">
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="ArrivedDelivery" component={ArrivedDelivery} />
      </Stack.Navigator>
    </PaperProvider>
  );
};
