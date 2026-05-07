import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RestaurantListScreen from './listScreen';
import RestaurantAddScreen from './addScreen';

const Stack = createNativeStackNavigator();

const RestaurantsScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="RestaurantsList" component={RestaurantListScreen} />
      <Stack.Screen name="RestaurantsAdd" component={RestaurantAddScreen} />
    </Stack.Navigator>
  );
};

export default RestaurantsScreen;
