import { StyleSheet, View } from "react-native";

export default function Index() {

  return (
    <View style={styles.container}>
      <View style={[styles.box, styles.box1]} />
      <View style={[styles.box, styles.box2]} />
      <View style={[styles.box, styles.box3]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  box: {
    flex: 1,
  },
  box1: {
    backgroundColor: "powderblue",
  },
  box2: {
    backgroundColor: "skyblue",
  },
  box3: {
    backgroundColor: "steelblue",
  },
});