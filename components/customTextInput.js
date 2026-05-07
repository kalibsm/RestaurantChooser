import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const CustomTextInput = ({
  label,
  labelStyle,
  maxLength,
  textInputStyle,
  stateHolder,
  stateFieldName,
  value,
  onChangeText,
  error,
  keyboardType,
  autoCapitalize,
}) => {
  // Support both direct value/onChangeText and stateHolder/stateFieldName patterns
  const resolvedValue =
    value !== undefined ? value : stateHolder?.state?.[stateFieldName] ?? '';

  const resolvedOnChange = onChangeText
    ? onChangeText
    : (text) => {
        if (stateHolder && stateFieldName) {
          stateHolder.setState({ [stateFieldName]: text });
        }
      };

  return (
    <View style={styles.container}>
      {label ? <Text style={[styles.label, labelStyle]}>{label}</Text> : null}
      <TextInput
        style={[styles.input, error ? styles.inputError : null, textInputStyle]}
        value={resolvedValue}
        onChangeText={resolvedOnChange}
        maxLength={maxLength}
        keyboardType={keyboardType || 'default'}
        autoCapitalize={autoCapitalize || 'sentences'}
        placeholderTextColor="#95a5a6"
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

CustomTextInput.propTypes = {
  label: PropTypes.string,
  labelStyle: PropTypes.object,
  maxLength: PropTypes.number,
  textInputStyle: PropTypes.object,
  stateHolder: PropTypes.object,
  stateFieldName: PropTypes.string,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  error: PropTypes.string,
  keyboardType: PropTypes.string,
  autoCapitalize: PropTypes.string,
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
  input: {
    borderWidth: 1,
    borderColor: '#bdc3c7',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#2c3e50',
  },
  inputError: {
    borderColor: '#e74c3c',
    borderWidth: 2,
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 12,
    marginTop: 5,
  },
});

export default CustomTextInput;
