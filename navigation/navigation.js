import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaView, StyleSheet } from 'react-native';
import RestaurantsScreen from '../screens/restaurants/restaurantsScreen';
import DecisionScreen from '../screens/decisionScreen';
import PeopleScreen from '../screens/people/peopleScreen';

const Tab = createMaterialTopTabNavigator();

const Navigation = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Tab.Navigator
        initialRouteName="Decision"
        screenOptions={{
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#bdc3c7',
          tabBarStyle: {
            backgroundColor: '#2c3e50',
          },
          tabBarIndicatorStyle: {
            backgroundColor: '#3498db',
            height: 3,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: 'bold',
          },
          tabBarPressColor: '#34495e',
        }}
      >
        <Tab.Screen
          name="Restaurants"
          component={RestaurantsScreen}
          options={{
            tabBarLabel: '🍴 Restaurants',
          }}
        />
        <Tab.Screen
          name="Decision"
          component={DecisionScreen}
          options={{
            tabBarLabel: '🎯 Decision',
          }}
        />
        <Tab.Screen
          name="People"
          component={PeopleScreen}
          options={{
            tabBarLabel: '👥 People',
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
  },
});

export default Navigation;
