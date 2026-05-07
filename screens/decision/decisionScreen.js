import React from 'react';
import { View, Text, Image, Platform, StyleSheet } from 'react-native';

const decisionImage = Platform.select({
  android: require('../../assets/its-decision-time.android.png'),
  ios: require('../../assets/its-decision-time.ios.png'),
});

const DecisionScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={decisionImage} style={styles.image} resizeMode="contain" />
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
  image: {
    width: 280,
    height: 180,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DecisionScreen;
