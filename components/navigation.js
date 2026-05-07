import React from 'react';
import { Image, Platform, SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import RestaurantsScreen from '../screens/restaurants/restaurantsScreen';
import DecisionScreenNavigation from '../screens/decision/decisionScreenNavigation';
import PeopleScreen from '../screens/people/peopleScreen';

const Tab = createMaterialTopTabNavigator();

const restaurantsIcon = require('../assets/icon-restaurants.png');
const decisionIcon = require('../assets/icon-decision.png');
const peopleIcon = require('../assets/icon-people.png');

const Navigation = () => {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <Tab.Navigator
          initialRouteName="Restaurants"
          screenOptions={({ route }) => ({
            animationEnabled: true,
            swipeEnabled: true,
            lazy: true,
            tabBarActiveTintColor: 'red',
            tabBarStyle: Platform.select({
              ios: { paddingTop: Constants.statusBarHeight },
              android: {},
            }),
            tabBarIcon: ({ color }) => {
              let icon;
              if (route.name === 'Restaurants') icon = restaurantsIcon;
              else if (route.name === 'Decision') icon = decisionIcon;
              else icon = peopleIcon;
              return (
                <Image
                  source={icon}
                  style={[styles.icon, { tintColor: color }]}
                />
              );
            },
            tabBarShowIcon: true,
          })}
        >
          <Tab.Screen name="Restaurants" component={RestaurantsScreen} />
          <Tab.Screen name="Decision" component={DecisionScreenNavigation} />
          <Tab.Screen name="People" component={PeopleScreen} />
        </Tab.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    width: 20,
    height: 20,
  },
});

export default Navigation;
