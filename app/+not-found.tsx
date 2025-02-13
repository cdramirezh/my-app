import { Link, Stack } from "expo-router";
import { Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Uy, no encontrada" }} />
      <View>
        <Text>Not Found</Text>
        <Link href="/" style={{ fontSize: 20, textDecorationLine: 'underline' }}>
          Go back to Home screen!
        </Link>
      </View>
    </>
  );
}