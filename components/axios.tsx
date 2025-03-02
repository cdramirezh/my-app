import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const ButtonAxios = () => {
  const handleButtonPress = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer your-token-here',
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Fetch with Axios" onPress={handleButtonPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ButtonAxios;
