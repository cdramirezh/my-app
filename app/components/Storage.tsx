import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';

const storeStringData = async (value: string) => {
  try {
    await AsyncStorage.setItem('my-key', value);
  } catch (e) {
    // saving error
  }
};

const storeData = async (value: Object) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('my-key', jsonValue);
  } catch (e) {
    // saving error
  }
};

const getStringData = async () => {
  try {
    const value = await AsyncStorage.getItem('my-key');
    if (value !== null) {
      return value
    }
    return "Vacío"
  } catch (e) {
    return "Error"
  }
};

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('my-key');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};



const StorageComponent = () => {
  const [value, setValue] = useState("")
  const [data, setData] = useState("")

  const handleData = async () => {
    const dataInStorage = await getStringData()
    setData(dataInStorage)
  }
  return (
    <View>
      <TextInput placeholder="Valor" value={value} onChangeText={setValue} />
      <Button title="Guardar valor" onPress={() => { storeStringData(value) }} />
      <Button title="Get data" onPress={handleData} />
      <Text>{data}</Text>
    </View>
  )
}

export default StorageComponent