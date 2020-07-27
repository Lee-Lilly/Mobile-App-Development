import React from 'react';
import { View, StyleSheet, Dimensions, Text, Button } from 'react-native';
import { Header } from 'react-native-elements';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Icon } from 'react-native-vector-icons';
import Dialog from "react-native-dialog";

const App: () => React$Node = () => {
  const initialLayout = { width: Dimensions.get('window').width };
  const [routes] = React.useState([
    { key: 'first', title: 'Game' },
    { key: 'second', title: 'Highscores' },
  ]);
  const [index, setIndex] = React.useState(0);

  const FirstRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#673ab7' }]} >
      <Text style={styles.text}>Double tap the circle as fast as you can!</Text>
      <View style={styles.circle} onTouchStart={circlePressed} />
      <Text style={styles.text}>Time: {score}</Text>
      <View style={styles.row}>
        <View style={styles.button}>
          <Button title="Add highscores" onPress={() => setAddDialogVisible(true)} />
        </View>
        <View style={styles.button}>
          <Button title="Reset time" onPress={() => setScore(0)} />
        </View>
      </View>
    </View>
  );

  const SecondRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#ff4081' }]} />
  );
   
  // click circle and counting for score
  const [timeOne, setTimeOne] = React.useState(0);
  const [score, setScore] = React.useState(0);

  const circlePressed = () => {
    // get start time - first press
    if (timeOne === 0) {
      const date = new Date();
      setTimeOne(date.getTime());
      setScore(0);
      // second press, calc time and store
    } else {
      const date = new Date();
      setScore(date.getTime() - timeOne);
    }
  }

  // add a hook for dialog and player name
  const [addDialogVisible, setAddDialogVisible] = React.useState(false);
  const [name, setName] = React.useState("");

  const okClicked = () => {
    setAddDialogVisible(false);
    // add highscore
  }
  
  return (
    <>
      <Header
        leftComponent={{ icon: 'menu', style: { color: '#fff' } }}
        centerComponent={{ text: 'SPEED GAME', style: { color: '#fff' } }}
      />
     <TabView
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={SceneMap({
          first: FirstRoute,
          second: SecondRoute,
        })}
      />
      <Dialog.Container visible={addDialogVisible}>
        <Dialog.Title>Add a new highscore</Dialog.Title>
        <Dialog.Input label="Name" placeholder="Click and type your name here" onChangeText={text => setName(text)} />
        <Dialog.Button label="Ok" onPress={okClicked} />
      </Dialog.Container>
    </>
  );
};

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  circle: {
    backgroundColor: '#ff4081',
    borderColor: '#ff4081',
    borderWidth: 1,
    height: 200,
    width: 200,
    borderRadius: 100,
    alignSelf: "center",
    marginTop: 100
  },
  text: {
    marginTop: 50,
    alignSelf: "center"
  },
  button: {
    marginRight: 20,
    marginTop: 50,
    alignSelf: "center",
    width: 150
  },
  row: {
    flexDirection: 'row',
    alignSelf: "center"
  },
});

export default App;
