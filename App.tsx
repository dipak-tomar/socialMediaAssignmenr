import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FeedScreen from './src/screens/FeedScreen';
import AppNavigator from './src/Navigators/Application';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './src/Navigators/utils';

const App = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <AppNavigator />
    </NavigationContainer>
  ); 
};

export default App;
