import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Platform, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../../components/customButton';

const PreFiltersScreen = ({ navigation }) => {
  const route = useRoute();
  const { participants } = route.params;

  const [cuisine, setCuisine] = useState('');
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState('');
  const [delivery, setDelivery] = useState('');

  const handleNext = async () => {
    try {
      const raw = await AsyncStorage.getItem('restaurants');
      const parsedRestaurants = raw ? JSON.parse(raw) : [];

      const filteredRestaurants = parsedRestaurants.filter((restaurant) => {
        const matchesCuisine  = !cuisine  || restaurant.cuisine  === cuisine;
        const matchesPrice    = !price    || Number(restaurant.price)  <= Number(price);
        const matchesRating   = !rating   || Number(restaurant.rating) >= Number(rating);
        const matchesDelivery = !delivery || restaurant.delivery === delivery;
        return matchesCuisine && matchesPrice && matchesRating && matchesDelivery;
      });

      if (filteredRestaurants.length === 0) {
        Alert.alert('No matches', 'No restaurants match the selected criteria.');
        return;
      }

      navigation.navigate('ChoiceScreen', { participants, restaurants: filteredRestaurants });
    } catch (e) {
      Alert.alert('Error', 'Could not load restaurants.');
    }
  };

  const pickerStyle = Platform.select({
    ios: styles.pickerIOS,
    android: styles.pickerAndroid,
    default: styles.pickerAndroid,
  });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Pre-Filters</Text>

      <Text style={styles.label}>Cuisine</Text>
      <View style={styles.pickerWrapper}>
        <Picker selectedValue={cuisine} onValueChange={setCuisine} style={pickerStyle}>
          <Picker.Item label="Any" value="" />
          <Picker.Item label="Italian"  value="Italian" />
          <Picker.Item label="Chinese"  value="Chinese" />
          <Picker.Item label="Indian"   value="Indian" />
          <Picker.Item label="Mexican"  value="Mexican" />
          <Picker.Item label="Other"    value="Other" />
        </Picker>
      </View>

      <Text style={styles.label}>Max Price</Text>
      <View style={styles.pickerWrapper}>
        <Picker selectedValue={price} onValueChange={setPrice} style={pickerStyle}>
          <Picker.Item label="Any"  value="" />
          <Picker.Item label="$"    value="1" />
          <Picker.Item label="$$"   value="2" />
          <Picker.Item label="$$$"  value="3" />
          <Picker.Item label="$$$$" value="4" />
        </Picker>
      </View>

      <Text style={styles.label}>Min Rating</Text>
      <View style={styles.pickerWrapper}>
        <Picker selectedValue={rating} onValueChange={setRating} style={pickerStyle}>
          <Picker.Item label="Any"     value="" />
          <Picker.Item label="1 Star"  value="1" />
          <Picker.Item label="2 Stars" value="2" />
          <Picker.Item label="3 Stars" value="3" />
          <Picker.Item label="4 Stars" value="4" />
          <Picker.Item label="5 Stars" value="5" />
        </Picker>
      </View>

      <Text style={styles.label}>Delivery</Text>
      <View style={styles.pickerWrapper}>
        <Picker selectedValue={delivery} onValueChange={setDelivery} style={pickerStyle}>
          <Picker.Item label="Any" value="" />
          <Picker.Item label="Yes" value="Yes" />
          <Picker.Item label="No"  value="No" />
        </Picker>
      </View>

      <CustomButton
        text="Next"
        onPress={handleNext}
        buttonStyle={styles.nextBtn}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#ecf0f1' },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
    color: '#2c3e50',
  },
  label: { fontSize: 14, fontWeight: '600', color: '#2c3e50', marginBottom: 4 },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#bdc3c7',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  pickerIOS: { height: 180 },
  pickerAndroid: { height: 50, color: '#2c3e50' },
  nextBtn: { marginTop: 10, marginBottom: 40 },
});

export default PreFiltersScreen;
