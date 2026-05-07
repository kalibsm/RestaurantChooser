import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DecisionScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Decision Screen - Placeholder</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DecisionScreen;
