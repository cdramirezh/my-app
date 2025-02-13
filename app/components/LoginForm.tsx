import { TextInput, Button, Text, View } from "react-native";

export default function LoginForm() {
  return (
    <View>
      <Text>Inicio de sesión</Text>
      <TextInput placeholder="Usuario" />
      <TextInput placeholder="Password" />
      <Button title="Iniciar sesión" onPress={() => {console.log('enviado')}} />
    </View>
  );
}
