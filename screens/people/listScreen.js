import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import CustomButton from '../../components/customButton';

const ListScreen = ({ navigation }) => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    loadPeople();
    const unsubscribe = navigation.addListener('focus', loadPeople);
    return unsubscribe;
  }, [navigation]);

  const loadPeople = async () => {
    try {
      const stored = await AsyncStorage.getItem('people');
      if (stored) setPeople(JSON.parse(stored));
    } catch (e) {
      console.error('Error loading people:', e);
    }
  };

  const performDelete = async (key) => {
    try {
      const updated = people.filter((p) => p.key !== key);
      await AsyncStorage.setItem('people', JSON.stringify(updated));
      setPeople(updated);
      Toast.show({ type: 'error', text1: 'Person deleted', visibilityTime: 2000 });
    } catch (e) {
      console.error('Error deleting person:', e);
    }
  };

  const deletePerson = (key) => {
    if (Platform.OS === 'web') {
      if (window.confirm('Delete Person — Are you sure?')) {
        performDelete(key);
      }
    } else {
      Alert.alert('Delete Person', 'Are you sure?', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Yes', style: 'destructive', onPress: () => performDelete(key) },
      ]);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.name}>
        {item.firstName} {item.lastName}
      </Text>
      <Text style={styles.relationship}>{item.relationship}</Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deletePerson(item.key)}
      >
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <CustomButton
        text="Add Person"
        onPress={() => navigation.navigate('PeopleAdd')}
      />
      <FlatList
        data={people}
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
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  name: { fontSize: 16, fontWeight: 'bold', color: '#2c3e50', flex: 1 },
  relationship: { fontSize: 13, color: '#7f8c8d', marginRight: 10 },
  deleteButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  deleteText: { color: '#fff', fontWeight: 'bold' },
});

export default ListScreen;
