import { StyleSheet, Text } from "react-native";

const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Cochin',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'blue'
  },
  bodyText: {
    fontSize: 16,
    color: 'black'
  }
});

export const BasicTextStyling = () => (
  <Text style={styles.baseText}>
    <Text style={styles.titleText}>Welcome</Text>
    <Text style={styles.bodyText}>to React Native!</Text>
  </Text>
);

