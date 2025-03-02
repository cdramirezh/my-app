import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ActivityIndicator, Avatar, Button, Card, Checkbox, Divider, RadioButton, Searchbar, Switch, Text, TextInput, useTheme } from "react-native-paper";
import DataTableExample from "./DataTable";
import AccordionExample from "./Accordion";
const Showcase = () => {

  const theme = useTheme();

  const LeftContent = (props: any) => <Avatar.Icon {...props} icon="folder" />
  const [checked, setChecked] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [text, setText] = useState("");

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      <TextInput label="Email"
        value={text}
        onChangeText={text => setText(text)} />
      <View style={styles.row}>
        <ActivityIndicator animating={true} color={theme.colors.primary} size="large" />
        <ActivityIndicator animating={true} color={theme.colors.secondary} size="large" />
        <ActivityIndicator animating={true} color={theme.colors.tertiary} size="large" />
      </View>
      <View style={styles.row}>
        <Avatar.Icon size={24} icon="folder" />
        <Avatar.Image size={24} source={require('../assets/logos/Logosímbolo.png')} />
        <Avatar.Text size={24} label="RC" />
      </View>
      <ScrollView horizontal contentContainerStyle={styles.lateralScrollView}>
        <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
          Containded
        </Button>
        <Button icon="camera" mode="outlined" onPress={() => console.log('Pressed')}>
          Outlined
        </Button>
        <Button icon="camera" mode="text" onPress={() => console.log('Pressed')}>
          Text
        </Button>
        <Button icon="camera" mode="elevated" onPress={() => console.log('Pressed')}>
          Elevated
        </Button>
        <Button icon="camera" mode="contained-tonal" onPress={() => console.log('Pressed')}>
          Contained-tonal
        </Button>
      </ScrollView>
      <Divider />
      <Card>
        <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />
        <Card.Content>
          <Text variant="titleLarge">Card title</Text>
          <Text variant="bodyMedium">Card content</Text>
        </Card.Content>
        <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
        <Card.Actions>
          <Button>Cancel</Button>
          <Button>Ok</Button>
        </Card.Actions>
      </Card>
      <Divider />
      <View style={styles.row}>
        <Checkbox
          status={'checked'}
        />
        <Checkbox
          status={checked ? 'checked' : 'unchecked'}
          onPress={() => {
            setChecked(!checked);
          }}
        />
        <Checkbox
          disabled
          status={checked ? 'checked' : 'unchecked'}
          onPress={() => {
            setChecked(!checked);
          }}
        />
      </View>
      <View style={styles.row}>
        <RadioButton
          value="first"
          status={'checked'}
        />
        <RadioButton
          value="second"
          status={'unchecked'}
        />
      </View>
      <View style={styles.row}>
        <Switch value={true} onValueChange={() => { }} />
        <Switch value={false} onValueChange={() => { }} />
        <Switch value={true} disabled onValueChange={() => { }} />
      </View>
      <Divider />
      <DataTableExample />
      <Divider />
      <AccordionExample />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  lateralScrollView: {
    flexDirection: 'row',
    padding: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginTop: 12,
  },
})

export default Showcase;