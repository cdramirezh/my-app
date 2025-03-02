import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { useTheme } from 'react-native-paper';

const Header = () => {
  const theme = useTheme();

  return (

    <Appbar.Header style={{ backgroundColor: theme.colors.secondary }}>
      <Appbar.BackAction onPress={() => { }} />
      <Appbar.Content title="Title" />
      <Appbar.Action icon="calendar" onPress={() => { }} />
      <Appbar.Action icon="magnify" onPress={() => { }} />
    </Appbar.Header >
  );
}

export default Header;