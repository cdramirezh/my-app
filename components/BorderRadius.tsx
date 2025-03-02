import { View } from "react-native";

const RoundedView = () => (
  <View style={{
    width: 200,
    height: 100,
    backgroundColor: 'blue',
    borderRadius: 20  // Applies uniform rounded corners
  }} />
);

export const SpecificRoundedView = () => (
  <View style={{
    width: 200,
    height: 100,
    backgroundColor: 'green',
    borderTopLeftRadius: 20,     // Top-left corner
    borderBottomRightRadius: 20  // Bottom-right corner
  }} />
);

export default RoundedView;