The solution involves ensuring that each item in the FlatList data array has a unique key.  The key should ideally be a stable identifier from your data source (e.g., a unique ID from your API). This enables React Native's diffing algorithm to efficiently update the list and prevents unnecessary re-renders.

```javascript
// FlatListBugSolution.js
import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const DATA = Array.from({ length: 1000 }, (_, i) => ({ id: i, title: `Item ${i}` }));

const App = () => {
  const [data, setData] = useState(DATA);

  useEffect(() => {
    // Simulate data updates
    const intervalId = setInterval(() => {
      setData([...data].sort(() => Math.random() - 0.5)); // Shuffle data
    }, 3000);
    return () => clearInterval(intervalId);
  }, [data]);

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <Text>{item.title}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default App;
```