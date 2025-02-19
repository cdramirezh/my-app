import React, { useState } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

const FilePickerComponent = () => {
  const [fileUri, setFileUri] = useState("");
  const [fileContent, setFileContent] = useState("");

  const handleFilePick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({});
      console.log(result)
      if (result.assets?.length && result.canceled === false) {
        setFileUri(result.assets[0].uri);
        console.log('File URI: ', result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking file: ', error);
    }
  };

  const handleFileUpload = async () => {
    if (fileUri) {
      const fileBase64 = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      try {
        console.log(fileBase64)
      } catch (error) {
        console.error('Error uploading file: ', error);
      }
    } else {
      console.log('No file selected');
    }
  };

  const handleFileDownload = async () => {
    try {
      const downloadUri = FileSystem.documentDirectory + 'downloadedFile.txt';
      const downloadResumable = FileSystem.createDownloadResumable(
        'https://sample-files.com/downloads/documents/txt/simple.txt',
        downloadUri,
        {},
        (downloadProgress) => {
          const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
          console.log(`Download progress: ${progress * 100}%`);
        }
      );

      const { uri } = await downloadResumable.downloadAsync();
      console.log('Downloaded file URI: ', uri);

      const content = await FileSystem.readAsStringAsync(uri);
      setFileContent(content);
      console.log('Downloaded file content: ', content);
    } catch (error) {
      console.error('Error downloading file: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick File" onPress={handleFilePick} />
      <Text>File URI: {fileUri}</Text>
      <Button title="Upload File" onPress={handleFileUpload} />
      <Button title="Download File" onPress={handleFileDownload} />
      {fileContent && <Text>Downloaded File Content: {fileContent}</Text>}
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

export default FilePickerComponent;
