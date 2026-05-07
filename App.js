import React from 'react';
import 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import Navigation from './components/navigation';

export default function App() {
  return (
    <>
      <Navigation />
      <Toast />
    </>
  );
}
