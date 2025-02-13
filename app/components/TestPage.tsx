import { View } from "react-native";
import LoginForm from "./LoginForm";
import Saludar from "./Saludar";
export default function TestPage() {

  return (<View>
    <LoginForm />
    <Saludar firstName="mundo" />
    <Saludar firstName="Agustín" lastName="Navarro Galdón" />
    <Saludar firstName="Juan" lastName="Ramírez" />
  </View>)
}