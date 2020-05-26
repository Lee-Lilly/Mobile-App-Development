import React from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';

export default function App() {
  const [count, setCount] = React.useState(0);
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        VALUE is {count}
      </Text>
      <Button onPress={() => setCount(count + 1)} title="INCREASE VALUE" />
      <Text>{"\n"}</Text>
      <Button onPress={() => setCount(count - 1)} title="DECREASE VALUE" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: "Cochin"
  },
});
