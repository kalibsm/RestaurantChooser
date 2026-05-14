import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import CustomButton from '../../components/customButton';
import CustomTextInput from '../../components/customTextInput';
import { validateFirstName, validateLastName } from './validators';

const AddScreen = ({ navigation }) => {
  const [fields, setFields] = useState({
    firstName: '',
    lastName: '',
    relationship: '',
    key: `p_${Date.now()}`,
    errors: {},
  });

  const setField = (field, value) => {
    setFields((prev) => ({
      ...prev,
      [field]: value,
      errors: { ...prev.errors, [field]: null },
    }));
  };

  const validateAllFields = () => {
    const errors = {};
    const firstErr = validateFirstName(fields.firstName);
    if (firstErr) errors.firstName = firstErr;
    const lastErr = validateLastName(fields.lastName);
    if (lastErr) errors.lastName = lastErr;
    if (!fields.relationship) errors.relationship = 'Please select a relationship';
    setFields((prev) => ({ ...prev, errors }));
    return Object.keys(errors).length === 0;
  };

  const savePerson = async () => {
    if (!validateAllFields()) {
      const firstError = Object.values(fields.errors)[0];
      Toast.show({ type: 'error', text1: firstError || 'Please fix errors' });
      return;
    }
    try {
      const stored = await AsyncStorage.getItem('people');
      const list = stored ? JSON.parse(stored) : [];
      const { errors: _errors, ...person } = fields;
      list.push(person);
      await AsyncStorage.setItem('people', JSON.stringify(list));
      Toast.show({ type: 'success', text1: `${fields.firstName} added!` });
      navigation.goBack();
    } catch (e) {
      Toast.show({ type: 'error', text1: 'Failed to save person' });
    }
  };

  const pickerStyle = Platform.select({
    ios: styles.pickerIOS,
    android: styles.pickerAndroid,
    default: styles.pickerAndroid,
  });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add Person</Text>

      <CustomTextInput
        label="First Name"
        value={fields.firstName}
        onChangeText={(v) => setField('firstName', v.replace(/[^a-zA-Z\s'-]/g, ''))}
        maxLength={50}
        error={fields.errors.firstName}
      />

      <CustomTextInput
        label="Last Name"
        value={fields.lastName}
        onChangeText={(v) => setField('lastName', v.replace(/[^a-zA-Z\s'-]/g, ''))}
        maxLength={50}
        error={fields.errors.lastName}
      />

      <Text style={styles.label}>Relationship</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={fields.relationship}
          onValueChange={(v) => setField('relationship', v)}
          style={pickerStyle}
        >
          <Picker.Item label="-- Select --" value="" />
          <Picker.Item label="Me" value="Me" />
          <Picker.Item label="Family" value="Family" />
          <Picker.Item label="Friend" value="Friend" />
          <Picker.Item label="Coworker" value="Coworker" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>
      {fields.errors.relationship ? (
        <Text style={styles.error}>{fields.errors.relationship}</Text>
      ) : null}

      <View style={styles.buttons}>
        <CustomButton
          text="Cancel"
          onPress={() => navigation.goBack()}
          buttonStyle={styles.cancelBtn}
        />
        <CustomButton text="Save" onPress={savePerson} buttonStyle={styles.saveBtn} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#ecf0f1' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: '#2c3e50' },
  label: { fontSize: 14, fontWeight: '600', color: '#2c3e50', marginBottom: 4 },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#bdc3c7',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 6,
  },
  pickerIOS: { height: 180 },
  pickerAndroid: { height: 50, color: '#2c3e50' },
  error: { color: '#e74c3c', fontSize: 12, marginBottom: 10 },
  buttons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, marginBottom: 40 },
  cancelBtn: { backgroundColor: '#6c757d', flex: 1, marginRight: 8 },
  saveBtn: { backgroundColor: '#28a745', flex: 1, marginLeft: 8 },
});

export default AddScreen;
