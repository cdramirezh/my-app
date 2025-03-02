import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import PaymentScreen from '../components/PaymentScreen';

const App = () => {

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'tomato',
      secondary: 'yellow',
    },
  };

  return (
    <PaperProvider theme={theme}>
      <PaymentScreen />
    </PaperProvider>
  )
};

export default App;