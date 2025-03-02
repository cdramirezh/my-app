import * as React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

export default function PaymentScreen() {
  const theme = useTheme();

  return <View style={{ backgroundColor: theme.colors.primary }} >
    <Text>Payment Screen</Text>
  </View>;
}