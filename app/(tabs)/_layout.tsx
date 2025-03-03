import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header';
import { useTheme } from 'react-native-paper';

export default function TabLayout() {

  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.secondary,
        tabBarStyle: {
          backgroundColor: 'mintcream',
        },
        header: (props) => <Header {...props} />,
      }}
    >
      <Tabs.Screen name="index" options={{
        title: 'Home', tabBarIcon: ({ color, focused }) => (
          <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
        )
      }} />
      <Tabs.Screen name="about" options={{
        title: 'About', tabBarIcon: ({ color, focused }) => (
          <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color={color} size={24} />
        )
      }} />
      <Tabs.Screen name='offline' options={{
        title: 'Offline Demo', tabBarIcon: ({ color, focused }) => (
          <Ionicons name={focused ? 'cloud-offline' : 'cloud-offline-outline'} color={color} size={24} />
        )
      }} />
    </Tabs>
  );
}
