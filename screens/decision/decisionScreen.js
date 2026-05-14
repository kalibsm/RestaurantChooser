import React from 'react';
import { TouchableOpacity, Image, Platform, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const foodImage = Platform.select({
  android: require('../../assets/its-decision-time.android.png'),
  ios: require('../../assets/its-decision-time.ios.png'),
  default: require('../../assets/its-decision-time.android.png'),
});

const DecisionTimeScreen = ({ navigation }) => {
  const handlePress = async () => {
    try {
      const peopleRaw = await AsyncStorage.getItem('people');
      const restaurantsRaw = await AsyncStorage.getItem('restaurants');

      const people = peopleRaw ? JSON.parse(peopleRaw) : [];
      const restaurants = restaurantsRaw ? JSON.parse(restaurantsRaw) : [];

      if (people.length === 0) {
        Toast.show({
          type: 'error',
          text1: 'No people yet!',
          text2: 'Go to the People tab and add someone first.',
          visibilityTime: 3000,
        });
        return;
      }
      if (restaurants.length === 0) {
        Toast.show({
          type: 'error',
          text1: 'No restaurants yet!',
          text2: 'Go to the Restaurants tab and add one first.',
          visibilityTime: 3000,
        });
        return;
      }

      navigation.navigate('WhosGoingScreen');
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
        text2: 'Could not load data. Please try again.',
        visibilityTime: 3000,
      });
    }
  };

  // TouchableOpacity is the flex container — gives Image a real parent size
  // so percentage width/height calculations resolve correctly
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <Image source={foodImage} style={styles.image} resizeMode="contain" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: '90%',
    height: '60%',
  },
});

export default DecisionTimeScreen;
