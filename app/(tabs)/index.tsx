import { StyleSheet, Text, View } from "react-native";

export default function Index() {

  return (
    <View style={styles.container}>
      <Text style={styles.red}>red</Text>
      <Text style={styles.bigBlue}>bigBlue</Text>
      <Text style={[styles.bigBlue, styles.red]}>bigBlue, the red</Text>
      <Text style={[styles.red, styles.bigBlue]}>red, the bigBlue</Text>
      <View style={styles.box1} />
      <View style={styles.box2} />
      <View style={styles.box3} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    marginTop: 50,
  },
  bigBlue: {
    color: "blue",
    fontWeight: "bold",
    fontSize: 30,
  },
  red: {
    color: "red",
  },
  box1: {
    width: 50,
    height: 50,
    backgroundColor: "powderblue",
  },
  box2: {
    width: 100,
    height: 100,
    backgroundColor: "skyblue",
  },
  box3: {
    width: 150,
    height: 150,
    backgroundColor: "steelblue",
  },
});