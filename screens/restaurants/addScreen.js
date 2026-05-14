import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import CustomButton from '../../components/customButton';
import CustomTextInput from '../../components/customTextInput';
import { validateName, validatePhone, validateAddress, validateWebsite } from './validators';
import { COUNTRY_CODES } from '../../utils/countryCodes';

const AddScreen = ({ navigation }) => {
  const [fields, setFields] = useState({
    name: '',
    cuisine: '',
    price: '',
    rating: '',
    phone: '',
    countryCode: 'US',
    address: '',
    website: '',
    delivery: '',
    key: `r_${Date.now()}`,
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
    const nameErr = validateName(fields.name);
    if (nameErr) errors.name = nameErr;
    if (!fields.cuisine) errors.cuisine = 'Please select a cuisine';
    if (!fields.price) errors.price = 'Please select a price';
    if (!fields.rating) errors.rating = 'Please select a rating';
    const country = COUNTRY_CODES.find((c) => c.code === fields.countryCode) || COUNTRY_CODES[0];
    const phoneErr = validatePhone(fields.phone, country.digits);
    if (phoneErr) errors.phone = phoneErr;
    const addressErr = validateAddress(fields.address);
    if (addressErr) errors.address = addressErr;
    const websiteErr = validateWebsite(fields.website);
    if (websiteErr) errors.website = websiteErr;
    if (!fields.delivery) errors.delivery = 'Please select delivery option';
    setFields((prev) => ({ ...prev, errors }));
    return Object.keys(errors).length === 0;
  };

  const saveRestaurant = async () => {
    if (!validateAllFields()) {
      const firstError = Object.values(fields.errors)[0];
      Toast.show({ type: 'error', text1: firstError || 'Please fix errors' });
      return;
    }
    try {
      const stored = await AsyncStorage.getItem('restaurants');
      const list = stored ? JSON.parse(stored) : [];
      const { errors: _errors, countryCode, phone: localPhone, ...restaurant } = fields;
      const country = COUNTRY_CODES.find((c) => c.code === countryCode) || COUNTRY_CODES[0];
      restaurant.phone = `${country.dial} ${localPhone}`;
      list.push(restaurant);
      await AsyncStorage.setItem('restaurants', JSON.stringify(list));
      Toast.show({ type: 'success', text1: `${fields.name} added!` });
      navigation.goBack();
    } catch (e) {
      Toast.show({ type: 'error', text1: 'Failed to save restaurant' });
    }
  };

  const applyMask = (digits, format) => {
    let result = '';
    let di = 0;
    for (let i = 0; i < format.length; i++) {
      if (format[i] === 'X') {
        if (di < digits.length) result += digits[di++];
        else break;
      } else if (di < digits.length) {
        result += format[i];
      }
    }
    return result;
  };

  const formatPhone = (value, country) => {
    const digits = value.replace(/\D/g, '').slice(0, country.digits);
    return applyMask(digits, country.format);
  };

  const handleCountryChange = (code) => {
    setFields((prev) => ({ ...prev, countryCode: code, phone: '', errors: { ...prev.errors, phone: null } }));
  };

  const pickerStyle = Platform.select({
    ios: styles.pickerIOS,
    android: styles.pickerAndroid,
    default: styles.pickerAndroid,
  });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add Restaurant</Text>

      <CustomTextInput
        label="Name"
        value={fields.name}
        onChangeText={(v) => setField('name', v)}
        maxLength={50}
        error={fields.errors.name}
      />

      <Text style={styles.label}>Cuisine</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={fields.cuisine}
          onValueChange={(v) => setField('cuisine', v)}
          style={pickerStyle}
        >
          <Picker.Item label="-- Select --" value="" />
          <Picker.Item label="American" value="American" />
          <Picker.Item label="Chinese" value="Chinese" />
          <Picker.Item label="Italian" value="Italian" />
          <Picker.Item label="Mexican" value="Mexican" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>
      {fields.errors.cuisine ? (
        <Text style={styles.error}>{fields.errors.cuisine}</Text>
      ) : null}

      <Text style={styles.label}>Price</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={fields.price}
          onValueChange={(v) => setField('price', v)}
          style={pickerStyle}
        >
          <Picker.Item label="-- Select --" value="" />
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
          <Picker.Item label="3" value="3" />
          <Picker.Item label="4" value="4" />
          <Picker.Item label="5" value="5" />
        </Picker>
      </View>
      {fields.errors.price ? (
        <Text style={styles.error}>{fields.errors.price}</Text>
      ) : null}

      <Text style={styles.label}>Rating</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={fields.rating}
          onValueChange={(v) => setField('rating', v)}
          style={pickerStyle}
        >
          <Picker.Item label="-- Select --" value="" />
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
          <Picker.Item label="3" value="3" />
          <Picker.Item label="4" value="4" />
          <Picker.Item label="5" value="5" />
        </Picker>
      </View>
      {fields.errors.rating ? (
        <Text style={styles.error}>{fields.errors.rating}</Text>
      ) : null}

      {(() => {
        const country = COUNTRY_CODES.find((c) => c.code === fields.countryCode) || COUNTRY_CODES[0];
        return (
          <View style={styles.phoneBlock}>
            <Text style={styles.label}>Phone</Text>
            <View style={styles.phoneRow}>
              <View style={styles.countryPickerWrapper}>
                <Picker
                  selectedValue={fields.countryCode}
                  onValueChange={handleCountryChange}
                  style={styles.countryPicker}
                >
                  {COUNTRY_CODES.map((c) => (
                    <Picker.Item key={c.code} label={`${c.dial} (${c.code})`} value={c.code} />
                  ))}
                </Picker>
              </View>
              <View style={[styles.phoneInputWrapper, fields.errors.phone ? styles.phoneInputError : null]}>
                <TextInput
                  style={styles.phoneTextInput}
                  value={fields.phone}
                  onChangeText={(v) => setField('phone', formatPhone(v, country))}
                  maxLength={country.format.length}
                  keyboardType="phone-pad"
                  placeholder={country.format.replace(/X/g, '0')}
                  placeholderTextColor="#95a5a6"
                />
              </View>
            </View>
            {fields.errors.phone ? <Text style={styles.error}>{fields.errors.phone}</Text> : null}
          </View>
        );
      })()}

      <CustomTextInput
        label="Address"
        value={fields.address}
        onChangeText={(v) => setField('address', v)}
        maxLength={50}
        error={fields.errors.address}
      />

      <CustomTextInput
        label="Website"
        value={fields.website}
        onChangeText={(v) => setField('website', v)}
        maxLength={50}
        keyboardType="url"
        autoCapitalize="none"
        error={fields.errors.website}
      />

      <Text style={styles.label}>Delivery</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={fields.delivery}
          onValueChange={(v) => setField('delivery', v)}
          style={pickerStyle}
        >
          <Picker.Item label="-- Select --" value="" />
          <Picker.Item label="Yes" value="Yes" />
          <Picker.Item label="No" value="No" />
        </Picker>
      </View>
      {fields.errors.delivery ? (
        <Text style={styles.error}>{fields.errors.delivery}</Text>
      ) : null}

      <View style={styles.buttons}>
        <CustomButton
          text="Cancel"
          onPress={() => navigation.goBack()}
          buttonStyle={styles.cancelBtn}
        />
        <CustomButton text="Save" onPress={saveRestaurant} buttonStyle={styles.saveBtn} />
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
  phoneBlock: { marginBottom: 15 },
  phoneRow: { flexDirection: 'row' },
  countryPickerWrapper: {
    width: 130,
    borderWidth: 1,
    borderColor: '#bdc3c7',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginRight: 8,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  countryPicker: { height: 50, color: '#2c3e50' },
  phoneInputWrapper: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#bdc3c7',
    borderRadius: 8,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  phoneInputError: { borderColor: '#e74c3c', borderWidth: 2 },
  phoneTextInput: { padding: 12, fontSize: 16, color: '#2c3e50' },
});

export default AddScreen;
