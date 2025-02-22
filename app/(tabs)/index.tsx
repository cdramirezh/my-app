import { StyleSheet, View } from "react-native";

export default function Index() {

  return (
    <View style={styles.container}>
      <View style={[styles.box1]} />
      <View style={[styles.box2]} />
      <View style={[styles.box3]} />
    </View>
  );
}

const box = {
  with: 75,
  height: 75,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box1: {
    ...box,
    backgroundColor: "salmon",
  },
  box2: {
    ...box,
    backgroundColor: "darkorange",
  },
  box3: {
    ...box,
    backgroundColor: "green",
  },
});
