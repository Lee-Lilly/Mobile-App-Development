import React from 'react';
import { View, StyleSheet, Dimensions, Text, Button, ScrollView, Alert } from 'react-native';
import { Header } from 'react-native-elements';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Icon } from 'react-native-vector-icons';
import Dialog from "react-native-dialog";

const Realm = require('realm');

// Player schema
const Player = {
  name: 'Player',
  properties: {
    name: 'string',
    score: { type: 'int', default: 0 },
  },
};
// connection to database
const realm = new Realm({ schema: [Player] });

const App: () => React$Node = () => {
  const initialLayout = { width: Dimensions.get('window').width };
  const [routes] = React.useState([
    { key: 'first', title: 'Game' },
    { key: 'second', title: 'Highscores' },
  ]);
 
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
    <View style={[styles.scene, { backgroundColor: '#ff4081' }]}>
      <ScrollView>
        {players.map((player, index) => {
          return (
            <View key={index} style={styles.highscore}>
              <Text style={styles.highscoreName}>{player.name}</Text>
              <Text style={styles.highscoreScore}>{player.score}</Text>
            </View>
          )
        })}
      </ScrollView>
    </View>
  );
  
  const [players, setPlayers] = React.useState([]);
  const [index, setIndex] = React.useState(0);

  // read when tab is changed to hs
  const indexChange = (index) => {
    setIndex(index);

    if (index === 1) {
      // load highscores
      let players = realm.objects('Player').sorted('score');
      let playersArray = Array.from(players);
      setPlayers(playersArray);
    }
  }

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
    // add highscore, write to database
    realm.write(() => {
      const player = realm.create('Player', {
        name: name,
        score: score,
      });
    });
  }
  //alet
  const showMenu = () =>
    Alert.alert(
      "Info",
      "A simple game with registration",
      [ 
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );

  return (
    <>
      <Header
        leftComponent={{ icon: 'menu', style: { color: '#fff' } }}
        centerComponent={{ text: 'SPEED GAME', style: { color: '#fff', fontSize: 18 } }}
      />
     <TabView
        navigationState={{ index, routes }}
        onIndexChange={indexChange}
        renderScene={SceneMap({
          first: FirstRoute,
          second: SecondRoute,
        })}
      />
      <Dialog.Container visible={addDialogVisible}>
        <Dialog.Title>Add a new highscore</Dialog.Title>
        <Dialog.Input label="Name" placeholder="Click and type your name here" onChangeText={text => setName(text)} />
        <Dialog.Button label="Cancel" onPress={() => setAddDialogVisible(false)} />
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
  highscore: {
    flexDirection: 'row',
    margin: 10,
  },
  highscoreName: {
    fontSize: 20,
    color: 'black',
    width: '50%',
    textAlign: 'right',
    marginRight: 5
  },
  highscoreScore: {
    fontSize: 20,
    color: 'gray',
    width: '50%',
    marginLeft: 5
  }
});

export default App;
