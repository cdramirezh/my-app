import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, DataTable, Icon, Modal, Portal, TextInput } from 'react-native-paper';

const initialItems = [
  {
    key: 1,
    name: 'Cupcake',
    syncked: false,
  },
  {
    key: 2,
    name: 'Eclair',
    syncked: false,
  },
  {
    key: 3,
    name: 'Frozen yogurt',
    syncked: true,
  },
  {
    key: 4,
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

  const [items, setItems] = useState(initialItems);

  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const onAddItem = ({ name }: { name: string }) => {
    const newKey = items.length + 1;
    setItems([{ key: newKey, name, syncked: false }, ...items]);
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
    </View>
  );
} 