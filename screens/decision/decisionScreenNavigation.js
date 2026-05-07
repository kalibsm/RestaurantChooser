import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DecisionTimeScreen from './decisionScreen';
import WhosGoingScreen from './whosGoingScreen';
import PreFiltersScreen from './preFiltersScreen';
import ChoiceScreen from './choiceScreen';
import PostChoiceScreen from './postChoiceScreen';

const Stack = createNativeStackNavigator();

const DecisionScreenNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="DecisionTimeScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="DecisionTimeScreen" component={DecisionTimeScreen} />
      <Stack.Screen name="WhosGoingScreen" component={WhosGoingScreen} />
      <Stack.Screen name="PreFiltersScreen" component={PreFiltersScreen} />
      <Stack.Screen name="ChoiceScreen" component={ChoiceScreen} />
      <Stack.Screen name="PostChoiceScreen" component={PostChoiceScreen} />
    </Stack.Navigator>
  );
};

export default DecisionScreenNavigation;
