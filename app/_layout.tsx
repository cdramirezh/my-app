import { Stack } from "expo-router";
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';

export default function RootLayout() {

  // el tema debería ir en un proveedor de tema y no en el layout
  // los colores deberían ir en /globals/colors.ts
  const colors = {
    primary: {
      red: 'rgb(192,0,0)',
      black: 'rgb(0,0,0)',
    },
    secondary: {
      red: 'rgb(147,15,30)',
      green1: 'rgb(128, 188, 63)',
      green2: 'rgb(1, 128, 70)',
      green3: 'rgb(168, 200, 142)',
      green4: 'rgb(88, 187, 128)',
      green5: 'rgb(0, 53, 41)',
      orange1: 'rgb(244, 149, 105)',
      orange2: 'rgb(157, 64, 32)',
      orange3: 'rgb(255, 205, 181)',
      orange4: 'rgb(208, 70, 0)',
      orange5: 'rgb(221, 120, 63)',
      blue1: 'rgb(153, 210, 211)',
      blue2: 'rgb(85, 188, 188)',
      blue3: 'rgb(23, 151, 156)',
    }
  }

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: colors.primary.red,
      secondary: colors.secondary.green1,
      tertiary: colors.secondary.orange1,
    },
  };

  return (
    <PaperProvider theme={theme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </PaperProvider >
  );
}