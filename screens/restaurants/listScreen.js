import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import CustomButton from '../../components/customButton';

const ListScreen = ({ navigation }) => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    loadRestaurants();
    const unsubscribe = navigation.addListener('focus', loadRestaurants);
    return unsubscribe;
  }, [navigation]);

  const loadRestaurants = async () => {
    try {
      const stored = await AsyncStorage.getItem('restaurants');
      if (stored) setRestaurants(JSON.parse(stored));
    } catch (e) {
      console.error('Error loading restaurants:', e);
    }
  };

  const deleteRestaurant = (key) => {
    Alert.alert('Delete Restaurant', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: async () => {
          try {
            const updated = restaurants.filter((r) => r.key !== key);
            await AsyncStorage.setItem('restaurants', JSON.stringify(updated));
            setRestaurants(updated);
            Toast.show({
              type: 'error',
              text1: 'Restaurant deleted',
              visibilityTime: 2000,
            });
          } catch (e) {
            console.error('Error deleting restaurant:', e);
          }
        },
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.name}>{item.name}</Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteRestaurant(item.key)}
      >
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <CustomButton
        text="Add Restaurant"
        onPress={() => navigation.navigate('RestaurantsAdd')}
      />
      <FlatList
        data={restaurants}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#ecf0f1' },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  name: { fontSize: 16, fontWeight: 'bold', color: '#2c3e50', flex: 1 },
  deleteButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  deleteText: { color: '#fff', fontWeight: 'bold' },
});

export default ListScreen;
