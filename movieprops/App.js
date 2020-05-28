import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import Moment from 'moment-timezone';

const Movie = (props) => {
  return (
      <View style={styles.banner}>
        <Text style={styles.title}>{props.title}</Text>
        <Text> {props.theatre}</Text>
        <Text> {props.date} </Text>
      </View>
  );
};

export default function App() {
  return (
    <View style={styles.container}>
      <Movie title="Ella Bella Bingo" theatre="Finkino Sali 5, Turku" date="2020-02-13 18:15:00" />
      <Movie title="Joker" theatre="Finkino Sali 9, Turku" date="2020-02-13 20:00:00"/>
      <Movie title="Frozen 2" theatre="Finkino Sali Scape, Turku" date="2020-02-13 10:30:00"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#e4f1f5',
    padding: 8,
  },
  banner: {
    marginTop: 12,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#b8e6f5',
  },
  title:{
    color: '#666',
    fontWeight: 'bold'
  }
});
