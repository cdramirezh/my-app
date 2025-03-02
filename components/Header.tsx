import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar, Avatar } from 'react-native-paper';
import { useTheme } from 'react-native-paper';

const Header = (props: any) => {
  const theme = useTheme();

  const title = props.route.name.charAt(0).toUpperCase() + props.route.name.slice(1);

  return (
    <Appbar.Header style={{ backgroundColor: theme.colors.primary }}>
      <Appbar.BackAction onPress={() => { }} color="white" />
      <Appbar.Content title={title} titleStyle={styles.content} />
      <Avatar.Image size={36} source={require('../assets/logos/Logosímbolo.png')} style={styles.brand} />
    </Appbar.Header >
  );
}

const styles = StyleSheet.create({
  brand: {
    marginRight: 10,
  },
  content: {
    color: 'white',
  }
})

export default Header;