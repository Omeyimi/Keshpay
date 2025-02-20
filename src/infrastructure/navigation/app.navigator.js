import React, {useMemo, useEffect, useReducer, useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Text, View} from 'react-native';
// import SplashScreen from "../../features/Authentication/Splash/splash.screen";
import {MainNavigator} from './main.navigator';

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
};
