import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const CustomButton = ({ text, onPress, buttonStyle, textStyle, width, disabled }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        width ? { width } : null,
        disabled ? styles.disabled : styles.enabled,
        buttonStyle,
      ]}
      onPress={disabled ? null : onPress}
      activeOpacity={disabled ? 1 : 0.7}
    >
      <Text style={[styles.buttonText, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

CustomButton.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  buttonStyle: PropTypes.object,
  textStyle: PropTypes.object,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
};

CustomButton.defaultProps = {
  disabled: false,
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  enabled: {
    backgroundColor: '#007bff',
  },
  disabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomButton;
