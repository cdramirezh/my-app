import { Button, Text, View } from "react-native";
import * as LocalAuthentication from 'expo-local-authentication';
import { useState } from "react";

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
    </View>
  );
}
