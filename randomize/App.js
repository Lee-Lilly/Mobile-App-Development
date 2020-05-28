import * as React from 'react';
import { Text, View, StyleSheet,Button,  ScrollView} from 'react-native';
import Constants from 'expo-constants';

export default function App() {
  const [randomNumberList, setRandomNumberList] = React.useState([]);
  const listItems = randomNumberList.map((number) =>  <Text>{number}</Text>);
  return (
    <View style={styles.container}>
      <Button 
      onPress = {() => 
                  {
                    const newList = randomNumberList.concat(Math.random());
                    setRandomNumberList(newList); 
                  }
                } 
      title ="RANDOMIZE"/>
      <ScrollView>
        {listItems}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});
