import { Text } from "react-native";

interface SaludarProps {
  firstName: string;
  lastName?: string;
};

export default function Saludar({ firstName = "Mundo", lastName }: SaludarProps) {
  return <Text>Hola, {firstName} {lastName}</Text>;
}
