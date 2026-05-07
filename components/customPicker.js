import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

/**
 * Custom Picker Component
 * A simple picker implementation using TouchableOpacity for item selection
 * Note: For production, consider using @react-native-picker/picker
 */
const CustomPicker = ({ label, selectedValue, onValueChange, items, error }) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.pickerContainer, error && styles.pickerError]}>
        {items.map((item) => (
          <TouchableOpacity
            key={item.value}
            style={[
              styles.pickerItem,
              selectedValue === item.value && styles.pickerItemSelected,
            ]}
            onPress={() => onValueChange(item.value)}
          >
            <Text
              style={[
                styles.pickerItemText,
                selectedValue === item.value && styles.pickerItemTextSelected,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

CustomPicker.propTypes = {
  label: PropTypes.string,
  selectedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onValueChange: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })
  ).isRequired,
  error: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  pickerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderWidth: 1,
    borderColor: '#bdc3c7',
    borderRadius: 8,
    padding: 8,
    backgroundColor: '#fff',
  },
  pickerError: {
    borderColor: '#e74c3c',
    borderWidth: 2,
  },
  pickerItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    margin: 4,
    borderRadius: 6,
    backgroundColor: '#ecf0f1',
  },
  pickerItemSelected: {
    backgroundColor: '#3498db',
  },
  pickerItemText: {
    fontSize: 14,
    color: '#2c3e50',
  },
  pickerItemTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 12,
    marginTop: 5,
  },
});

export default CustomPicker;
