import {StatusBar} from 'react-native';
import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FeedScreen from '../screens/FeedScreen';
import CreatePost from '../screens/CreatePostScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <>
      <StatusBar barStyle={'dark-content'} backgroundColor={'blue'} />
      <Stack.Navigator
        initialRouteName={'FeedScreen'}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="FeedScreen" component={FeedScreen} />

        <Stack.Screen name="CreatePostScreen" component={CreatePost} />

        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      </Stack.Navigator>
    </>
  );
};

export default AppNavigator;
