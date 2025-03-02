import { Stack } from "expo-router";
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';

export default function RootLayout() {

  const colors = {
    primary: {
      red: '#c00000',
      black: '#000000',
    },
    secondary: {
      red: '#930f1e',
      green1: '#80bc3f',
      green2: '#018046',
      green3: '#a8c88e',
      green4: '#58bb80',
      green5: '#003529',
      orange1: '#f49569',
      orange2: '#9d4020',
      orange3: '#ffcdb5',
      orange4: '#d04600',
      orange5: '#dd783f',
      blue1: '#99d2d3',
      blue2: '#55bcbc',
      blue3: '#17979c',
    }
  }

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: colors.primary.red,
      secondary: colors.secondary.green1,
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