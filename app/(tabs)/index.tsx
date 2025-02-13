import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Textosaurio</Text>
      <Link href="/about" style={styles.button}>Ir a About</Link>
      {/* <Link href="/error" style={styles.button}>Ir a 404</Link> */}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
  },
});