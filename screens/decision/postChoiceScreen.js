import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import CustomButton from '../../components/customButton';

const PostChoiceScreen = ({ navigation }) => {
  const route = useRoute();
  const { chosenRestaurant } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headline}>Enjoy your meal!</Text>

      <View style={styles.detailsBox}>
        <Row label="Name"     value={chosenRestaurant.name} />
        <Row label="Cuisine"  value={chosenRestaurant.cuisine} />
        <Row label="Price"    value={'$'.repeat(Number(chosenRestaurant.price))} />
        <Row label="Rating"   value={'★'.repeat(Number(chosenRestaurant.rating))} />
        <Row label="Phone"    value={chosenRestaurant.phone} />
        <Row label="Address"  value={chosenRestaurant.address} />
        <Row label="Website"  value={chosenRestaurant.website} />
        <Row label="Delivery" value={chosenRestaurant.delivery} />
      </View>

      <CustomButton
        text="All Done"
        onPress={() => navigation.navigate('DecisionTimeScreen')}
        buttonStyle={styles.doneBtn}
      />
    </ScrollView>
  );
};

const Row = ({ label, value }) => (
  <View style={styles.row}>
    <Text style={styles.rowLabel}>{label}:</Text>
    <Text style={styles.rowValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#ecf0f1' },
  headline: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: 24,
  },
  detailsBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#bdc3c7',
    padding: 16,
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  rowLabel: {
    fontWeight: 'bold',
    color: '#2c3e50',
    width: 80,
    fontSize: 15,
  },
  rowValue: {
    flex: 1,
    color: '#34495e',
    fontSize: 15,
  },
  doneBtn: { marginBottom: 40 },
});

export default PostChoiceScreen;
