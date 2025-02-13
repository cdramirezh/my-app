import { Button, Text, View, Alert } from "react-native";
import * as LocalAuthentication from 'expo-local-authentication';
import { useState } from "react";
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'

export default function Index() {

  const [isBiometricAvailable, setIsBiometricAvailable] = useState(false);
  const [count, setCount] = useState(0);

  const countUp = () => setCount(count => count + 1);

  const checkBiometric = async () => {
    const isBiometricAvailable = await LocalAuthentication.hasHardwareAsync();
    setIsBiometricAvailable(isBiometricAvailable);
  }

  const authenticate = async () => {
    const isBiometricAvailable = await LocalAuthentication.hasHardwareAsync();
    if (isBiometricAvailable) {
      const isBiometricEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (isBiometricEnrolled) {
        const result = await LocalAuthentication.authenticateAsync();
        if (result.success) {
          alert('Autenticación exitosa');
        } else {
          alert('Autenticación fallida');
        }
      } else {
        alert('No hay biometricos registrados');
      }
    } else {
      alert('No hay biometricos disponibles');
    }
  }

  const handleBiometricAuth = async () => {
    try {
      const rnBiometrics = new ReactNativeBiometrics();
      const a = Object.getPrototypeOf(rnBiometrics)
      const b = await a.isSensorAvailable()
      const { available, biometryType } = await rnBiometrics.isSensorAvailable();

      if (available && biometryType === BiometryTypes.Biometrics) {
        Alert.alert('Biometric sensor is available and supports Face ID or fingerprint');
      } else {
        Alert.alert('Biometric authentication not supported on this device');
        return;
      }

      const result = await rnBiometrics.simplePrompt({
        promptMessage: 'Authenticate using Face ID or Fingerprint',
        fallbackPromptMessage: 'Use Passcode',
      });

      if (result.success) {
        Alert.alert('Authentication successful');
      } else {
        Alert.alert('Authentication failed', result.error);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('Error', 'An unknown error occurred');
      }
    }
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Contador</Text>
      <Text>{count}</Text>
      <Button title="Contar pa'rriba" onPress={countUp}></Button>
      <Text>{isBiometricAvailable ? 'Biometrico disponible' : 'Biometrico no disponible'}</Text>
      <Button title="Verificar biométrico" onPress={checkBiometric}></Button>
      <Button title="Autenticar" onPress={authenticate}></Button>
      <Text>React Native Biometrics</Text>
      <Button title="Authenticate with Face ID" onPress={handleBiometricAuth} />
    </View>
  );
}
