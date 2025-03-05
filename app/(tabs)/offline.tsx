import { useEffect, useState } from "react";
import { View, Text, Alert } from "react-native";
import * as Network from 'expo-network';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, DataTable, Icon, Modal, Portal, TextInput } from 'react-native-paper';
import axios from "axios";

const url = 'https://web-production-36cd.up.railway.app/api/v1/categories/'

const getItems = async () => {
  const items = await axios.get(url);
  return items.data;
}

type dummyItem = {
  name: string
  image: string
}

const postItem = async (item: dummyItem) => {

  const isObjectEmpty = (obj: any) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  };

  try {
    const response = await axios.post(url, item);
    return response.data;
  } catch (err) {
    if (!isObjectEmpty(err)) return { error: err };
  }
}

type item = {
  id: number,
  name: string,
  image: string,
  createdAt: string,
  syncked: boolean,
}

const EditButton = () => {
  return (
    <Button mode="outlined">✏️</Button>
  )
}

const SyncStatus = ({ syncked }: { syncked: boolean }) => {
  return <Icon
    source={syncked ? "check" : "close"}
    color={syncked ? 'green' : "red"}
    size={20}
  />
}

const AddModal = ({ visible, onDismiss, onAddItem }: { visible: boolean, onDismiss: () => void, onAddItem: ({ name }: { name: string }) => void }) => {
  const [name, setName] = useState('');

  const containerStyle = { backgroundColor: 'white', padding: 20 };

  return (
    <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={containerStyle}>
      <TextInput
        label="Name"
        value={name}
        onChangeText={text => setName(text)}
      />
      <Button mode="contained" onPress={() => onAddItem({ name })}>Add</Button>
    </Modal>
  )
}

export default function OfflineScreen() {

  const [items, setItems] = useState([] as item[]);
  const [visible, setVisible] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const fetchItems = async () => {
    try {
      const apiItems = await getItems();
      const itemsWithSyncProp = apiItems.map((item: item) => ({ ...item, syncked: true }))
      await AsyncStorage.setItem('@items', JSON.stringify(itemsWithSyncProp));
      setItems(itemsWithSyncProp);
    } catch (error) {
      console.error('Error fetching items from API', error);
    }
  };

  const checkConnection = async () => {
    const networkState = await Network.getNetworkStateAsync();
    setIsConnected(!!networkState.isConnected);
  };

  useEffect(() => {
    fetchItems();
    checkConnection();
  }, []);

  const saveItems = async (newItems: item[]) => {
    try {
      await AsyncStorage.setItem('@items', JSON.stringify(newItems));
    } catch (error) {
      console.error('Error saving items to Async Storage', error);
    }
  };

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const onAddItem = async ({ name }: { name: string }) => {
    const newItem = {
      name,
      image: "https://placekitten.com/100/100",
    };
    const response = await postItem(newItem);
    if (response && !response.error) {
      const newItems = [response, ...items];
      setItems(newItems);
      saveItems(newItems);
    } else {
      Alert.alert('Error adding item', response.error.toString());
    }
    hideModal();
  }

  return (
    <View>
      <Text>
        {isConnected ? 'ONLINE!' : 'SIN CONEXIÓN!'}
      </Text>
      <Button mode="outlined" onPress={showModal}>Add new</Button>
      <Button mode="contained" onPress={fetchItems}>Sync</Button>
      <Portal>
        <AddModal visible={visible} onDismiss={hideModal} onAddItem={onAddItem} />
      </Portal>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>ID</DataTable.Title>
          <DataTable.Title>Data</DataTable.Title>
          <DataTable.Title>Edit</DataTable.Title>
          <DataTable.Title>Syncked</DataTable.Title>
        </DataTable.Header>

        {items.map((item) => (
          <DataTable.Row key={item.id}>
            <DataTable.Cell>{item.id}</DataTable.Cell>
            <DataTable.Cell>{item.name}</DataTable.Cell>
            <DataTable.Cell>
              <EditButton />
            </DataTable.Cell>
            <DataTable.Cell>
              <SyncStatus syncked={item.syncked} />
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
      <Button onPress={async () => {
        await AsyncStorage.setItem('@items', JSON.stringify([]));
        setItems([]);
      }}>Clear</Button>
      <Button onPress={checkConnection}>Check connection</Button>
    </View>
  );
}
