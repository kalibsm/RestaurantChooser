import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * Decision Screen - Placeholder for Week 5-6
 * This will be expanded in Part 2 to include:
 * - Who's Going selection
 * - Restaurant filtering
 * - Random selection
 * - Veto system
 */
const DecisionScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🎯 Decision Time</Text>
        <Text style={styles.headerSubtitle}>Coming Soon in Part 2</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Decision Feature</Text>
        <Text style={styles.description}>
          This screen will help you decide where to eat!
        </Text>
        
        <View style={styles.featureBox}>
          <Text style={styles.featureTitle}>Features Coming Soon:</Text>
          <Text style={styles.featureItem}>• Select who's going to eat</Text>
          <Text style={styles.featureItem}>• Filter restaurants by preferences</Text>
          <Text style={styles.featureItem}>• Randomly choose a restaurant</Text>
          <Text style={styles.featureItem}>• Veto system for disagreements</Text>
          <Text style={styles.featureItem}>• Final decision display</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            For now, please add restaurants and people using the tabs above.
          </Text>
          <Text style={styles.infoText}>
            The decision-making feature will be implemented in Part 2 (Week 5-6).
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  header: {
    backgroundColor: '#9b59b6',
    padding: 30,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#fff',
    marginTop: 5,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 30,
  },
  featureBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  featureItem: {
    fontSize: 14,
    color: '#34495e',
    marginBottom: 8,
    lineHeight: 22,
  },
  infoBox: {
    backgroundColor: '#fff3cd',
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#f39c12',
  },
  infoText: {
    fontSize: 14,
    color: '#856404',
    marginBottom: 8,
    lineHeight: 20,
  },
});

export default DecisionScreen;
