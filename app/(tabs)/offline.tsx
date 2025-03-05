import { useEffect, useState } from "react";
import { View, Text, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, DataTable, Icon, Modal, Portal, TextInput } from 'react-native-paper';
import axios from "axios";

const url = 'https://web-production-36cd.up.railway.app/api/v1/categories/'

const getItems = async () => {
  const items = await axios.get(url)
  return items.data
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
    const response = await axios.post(url, item)
    return response.data
  } catch (err) {
    if (!isObjectEmpty(err)) return { error: err }
  }
}

type item = {
  key: number,
  name: string,
  syncked: boolean,
}

const initialItems = [
  {
    key: 2,
    name: 'Cupcake',
    syncked: false,
  },
  {
    key: 1,
    name: 'Gingerbread',
    syncked: true,
  },
];

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

  const handleGetItems = async () => {
    const items = await getItems()
    console.log(items)
    Alert.alert(JSON.stringify(items))
  }

  const handlePostItem = async () => {
    const testDummyItem = {
      name: 'category3',
      image: "https://placekitten.com/100/100",
    }
    const res = await postItem(testDummyItem)
  }

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const storedItems = await AsyncStorage.getItem('@items');
        if (storedItems) {
          setItems(JSON.parse(storedItems));
        } else {
          setItems(initialItems);
        }
      } catch (error) {
        console.error('Error fetching items from Async Storage', error);
      }
    };

    fetchItems();
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

  const onAddItem = ({ name }: { name: string }) => {
    const newKey = items.length + 1;
    const newItems = [{ key: newKey, name, syncked: false }, ...items];
    setItems(newItems);
    saveItems(newItems);
    hideModal();
  }

  return (
    <View>
      <Button mode="outlined" onPress={showModal}>Add new</Button>
      <Button>Sync</Button>
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
          <DataTable.Row key={item.key}>
            <DataTable.Cell>{item.key}</DataTable.Cell>
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
      <Button mode="elevated" onPress={handleGetItems}>Get items</Button>
      <Button mode="elevated" onPress={handlePostItem}>Post Item</Button>
    </View>
  );
}
