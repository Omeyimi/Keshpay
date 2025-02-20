import React, {useMemo, useEffect, useReducer, useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Dashboard from '../../screens/Dashboard/dashboard.screen';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Dashboard" component={Dashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
