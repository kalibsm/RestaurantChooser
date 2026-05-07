import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PeopleListScreen from './listScreen';
import PeopleAddScreen from './addScreen';

const Stack = createNativeStackNavigator();

const PeopleScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="PeopleList" component={PeopleListScreen} />
      <Stack.Screen name="PeopleAdd" component={PeopleAddScreen} />
    </Stack.Navigator>
  );
};

export default PeopleScreen;
