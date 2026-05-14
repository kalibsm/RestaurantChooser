import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  BackHandler,
} from 'react-native';
import Checkbox from 'expo-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import CustomButton from '../../components/customButton';

const WhosGoingScreen = ({ navigation }) => {
  const [people, setPeople] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const loadPeople = async () => {
      try {
        const raw = await AsyncStorage.getItem('people');
        const list = raw ? JSON.parse(raw) : [];
        setPeople(list);
        setSelected(Array(list.length).fill(false));
      } catch (e) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Could not load people. Please try again.',
          visibilityTime: 3000,
        });
      }
    };
    loadPeople();
  }, []);

  useEffect(() => {
    const onBackPress = () => {
      Alert.alert('Leave?', 'Are you sure you want to leave?', [
        { text: 'Cancel', style: 'cancel', onPress: () => {} },
        { text: 'Yes', onPress: () => navigation.goBack() },
      ]);
      return true;
    };
    const sub = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => sub.remove();
  }, [navigation]);

  const toggleSelection = (index) => {
    const updatedSelected = [...selected];
    updatedSelected[index] = !updatedSelected[index];
    setSelected(updatedSelected);
  };

  const handleNext = () => {
    const selectedParticipants = people
      .map((person, index) => (selected[index] ? { ...person, vetoed: 'no' } : null))
      .filter(Boolean);

    if (selectedParticipants.length === 0) {
      Toast.show({
        type: 'error',
        text1: 'No one selected',
        text2: 'Tap at least one person before continuing.',
        visibilityTime: 3000,
      });
      return;
    }

    Toast.show({
      type: 'success',
      text1: `${selectedParticipants.length} ${selectedParticipants.length === 1 ? 'person' : 'people'} selected`,
      text2: 'Now set your filters!',
      visibilityTime: 1500,
    });

    navigation.navigate('PreFiltersScreen', { participants: selectedParticipants });
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity style={styles.row} onPress={() => toggleSelection(index)}>
      <Checkbox
        value={selected[index] || false}
        onValueChange={() => toggleSelection(index)}
        color={selected[index] ? '#007bff' : undefined}
        style={styles.checkbox}
      />
      <Text style={styles.name}>
        {item.firstName} {item.lastName}
      </Text>
      <Text style={styles.relationship}>{item.relationship}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Who's Going?</Text>
      <FlatList
        data={people}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        style={styles.list}
      />
      <CustomButton text="Next" onPress={handleNext} buttonStyle={styles.nextBtn} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ecf0f1', padding: 15 },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#2c3e50',
  },
  list: { flex: 1 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  checkbox: { marginRight: 14 },
  name: { fontSize: 16, fontWeight: 'bold', color: '#2c3e50', flex: 1 },
  relationship: { fontSize: 13, color: '#7f8c8d' },
  nextBtn: { marginTop: 10 },
});

export default WhosGoingScreen;
