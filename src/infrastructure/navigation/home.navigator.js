import React from 'react';

import {
  createStackNavigator,
  TransitionPresets,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Dashboard from '../../screens/Dashboard/dashboard.screen';
import {PaperProvider} from 'react-native-paper';
import Search from '../../screens/Search/search.screen';
import Recent from '../../screens/recent/recent.screen';
import CalculateTransaction from '../../screens/calculateTransaction/calculateTransaction.component';
import TransferScreen from '../../screens/test.screen';
const Stack = createStackNavigator();

export const HomeNavigator = () => {
  return (
    <PaperProvider>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="CalculateTransaction">
        <Stack.Group>
          <Stack.Screen name="Dashboard" component={Dashboard} />
        </Stack.Group>

        <Stack.Group
          screenOptions={{
            presentation: 'transparentModal', // Show as a modal
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
            cardStyle: {backgroundColor: 'rgba(0, 0, 0, 0.5)'},
            gestureEnabled: true,
            // gestureResponseDistance: {vertical: 300, horizontal: 200}, // Custom swipe distances
          }}>
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="Recent" component={Recent} />
          <Stack.Screen
            name="CalculateTransaction"
            component={CalculateTransaction}
          />
          <Stack.Screen name="TransferScreen" component={TransferScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </PaperProvider>
  );
};
