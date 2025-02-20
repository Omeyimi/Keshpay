import React from 'react';
import {AppNavigator} from './app.navigator';
import {SafeAreaView, ScrollView, StatusBar} from 'react-native';
import {SafeArea} from '../../components/utility/safe-area.component';

export const Navigation = () => {
  return (
    <SafeArea>
      <StatusBar />
      <AppNavigator />
    </SafeArea>
  );
};
