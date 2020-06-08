/* eslint-disable prettier/prettier */
import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';

const MovieDetailScreen = (props) => {
  const {route} = props; //route object is passed via props
  const {movie} = route.params; // get movie object from route parameters.
  let IMAGEPATH = 'http://image.tmdb.org/t/p/w500';
  let imageurl = IMAGEPATH + movie.backdrop_path;

  return (
      <View style={styles.container}>
        <Image source={{ uri: imageurl }} style={styles.image} />
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.text}>{movie.release_date}</Text>
        <Text />
        <Text style={styles.text}>{movie.overview}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e4f1f5',
    marginTop: 5,
  },
  image: {
    aspectRatio: 690/420,
  },
  title:{
    fontWeight: 'bold',
    fontSize: 18,
  },
  text:{
    fontSize: 16,
    flexWrap:'wrap',
    fontFamily: 'Lucida grande - verdana',
    color: '#666',
    fontWeight:'bold',
  }
});

export default MovieDetailScreen;
