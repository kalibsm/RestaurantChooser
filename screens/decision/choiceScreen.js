import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Modal,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import CustomButton from '../../components/customButton';

const getRandom = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const ChoiceScreen = ({ navigation }) => {
  const route = useRoute();
  const [participants, setParticipants] = useState(route.params.participants);
  const [restaurants, setRestaurants] = useState(route.params.restaurants);
  const [chosenRestaurant, setChosenRestaurant] = useState(null);
  const [selectedVisible, setSelectedVisible] = useState(false);
  const [vetoVisible, setVetoVisible] = useState(false);
  const [vetoText, setVetoText] = useState('Veto');
  const [vetoDisabled, setVetoDisabled] = useState(false);

  const selectRandomRestaurant = () => {
    if (restaurants.length === 0) {
      Alert.alert('No restaurants', 'No restaurants left to choose from.');
      return;
    }
    const pick = restaurants[getRandom(0, restaurants.length - 1)];
    setChosenRestaurant(pick);
    setSelectedVisible(true);
  };

  const handleAccept = () => {
    setSelectedVisible(false);
    navigation.navigate('PostChoiceScreen', { chosenRestaurant });
  };

  const handleVetoPress = () => {
    setSelectedVisible(false);
    setVetoVisible(true);
  };

  const handleVetoBy = (person) => {
    const updatedParticipants = participants.map((p) =>
      p.key === person.key ? { ...p, vetoed: 'yes' } : p
    );
    const updatedRestaurants = restaurants.filter(
      (r) => r && r.key !== chosenRestaurant.key
    );

    setParticipants(updatedParticipants);
    setRestaurants(updatedRestaurants);
    setVetoVisible(false);

    const stillCanVeto = updatedParticipants.some((p) => p.vetoed === 'no');
    if (!stillCanVeto) {
      setVetoText('No vetoes left');
      setVetoDisabled(true);
    }

    if (updatedRestaurants.length === 0) {
      Alert.alert('Game over', 'No restaurants left.', [
        { text: 'OK', onPress: () => navigation.navigate('DecisionTimeScreen') },
      ]);
    } else if (updatedRestaurants.length === 1) {
      navigation.navigate('PostChoiceScreen', { chosenRestaurant: updatedRestaurants[0] });
    }
    // else: user taps "Randomly Choose" again
  };

  const renderParticipant = ({ item }) => (
    <View style={styles.participantRow}>
      <Text style={styles.participantName}>
        {item.firstName} {item.lastName} ({item.relationship})
      </Text>
      <Text style={[styles.vetoStatus, item.vetoed === 'yes' && styles.vetoed]}>
        Vetoed: {item.vetoed}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Who's Going</Text>

      <FlatList
        data={participants}
        renderItem={renderParticipant}
        keyExtractor={(item) => item.key}
        style={styles.list}
      />

      <CustomButton
        text="Randomly Choose"
        onPress={selectRandomRestaurant}
        buttonStyle={styles.chooseBtn}
      />

      {/* ── Modal 1: show the pick ── */}
      <Modal visible={selectedVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.restaurantName}>{chosenRestaurant?.name}</Text>

            <Text style={styles.detail}>
              {'★'.repeat(Number(chosenRestaurant?.rating) || 0)} rating
            </Text>
            <Text style={styles.detail}>
              {chosenRestaurant?.cuisine} restaurant
            </Text>
            <Text style={styles.detail}>
              {'$'.repeat(Number(chosenRestaurant?.price) || 0)}
            </Text>
            <Text style={styles.detail}>
              {chosenRestaurant?.delivery === 'Yes' ? 'DOES' : 'DOES NOT'} deliver
            </Text>

            <CustomButton
              text="Accept"
              onPress={handleAccept}
              buttonStyle={styles.acceptBtn}
            />
            <CustomButton
              text={vetoText}
              onPress={handleVetoPress}
              disabled={vetoDisabled}
              buttonStyle={styles.vetoBtn}
            />
          </View>
        </View>
      </Modal>

      {/* ── Modal 2: who is vetoing? ── */}
      <Modal visible={vetoVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Who is vetoing?</Text>
            <ScrollView>
              {participants
                .filter((p) => p.vetoed === 'no')
                .map((person) => (
                  <TouchableOpacity
                    key={person.key}
                    style={styles.vetoPersonRow}
                    onPress={() => handleVetoBy(person)}
                  >
                    <Text style={styles.vetoPersonName}>
                      {person.firstName} {person.lastName}
                    </Text>
                  </TouchableOpacity>
                ))}
            </ScrollView>
            <CustomButton
              text="Never Mind"
              onPress={() => {
                setVetoVisible(false);
                setSelectedVisible(true);
              }}
              buttonStyle={styles.neverMindBtn}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#ecf0f1' },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#2c3e50',
  },
  list: { flex: 1 },
  participantRow: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 14,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  participantName: { fontSize: 15, color: '#2c3e50', flex: 1 },
  vetoStatus: { fontSize: 13, color: '#27ae60' },
  vetoed: { color: '#e74c3c' },
  chooseBtn: { width: '94%', alignSelf: 'center', marginTop: 10 },

  // Modals
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    width: '88%',
    maxHeight: '80%',
  },
  restaurantName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 12,
    textAlign: 'center',
  },
  detail: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 6,
    textAlign: 'center',
  },
  acceptBtn: { backgroundColor: '#28a745', marginTop: 16 },
  vetoBtn: { backgroundColor: '#e74c3c', marginTop: 8 },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 16,
    textAlign: 'center',
  },
  vetoPersonRow: {
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  vetoPersonName: { fontSize: 17, color: '#2c3e50' },
  neverMindBtn: { backgroundColor: '#6c757d', marginTop: 14 },
});

export default ChoiceScreen;
