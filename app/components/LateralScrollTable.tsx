import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

const LateralTable = () => {
  const tableData = [
    ['Header 1', 'Header 2', 'Header 3', 'Header 4', 'Header 5'],
    ['Row 1 Col 1', 'Row 1 Col 2', 'Row 1 Col 3', 'Row 1 Col 4', 'Row 1 Col 5'],
    ['Row 2 Col 1', 'Row 2 Col 2', 'Row 2 Col 3', 'Row 2 Col 4', 'Row 2 Col 5'],
    ['Row 3 Col 1', 'Row 3 Col 2', 'Row 3 Col 3', 'Row 3 Col 4', 'Row 3 Col 5'],
    // Add more rows as needed
  ];

  return (
    <ScrollView horizontal={true} style={styles.scrollView}>
      {tableData.map((rowData, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {rowData.map((cellData, cellIndex) => (
            <View key={cellIndex} style={styles.cell}>
              <Text>{cellData}</Text>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexDirection: 'row',
  },
  row: {
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: '#000',
  },
  cell: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#000',
  },
});

export default LateralTable;
