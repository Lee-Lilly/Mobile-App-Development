import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  StatusBar,
  TouchableHighlight,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const MovieListScreen: () => React$Node = ({navigation}) => {
  const [movieList, setMovieList] = React.useState([]);

  React.useEffect(() => {
    fetch(
      'https://api.themoviedb.org/3/movie/now_playing?api_key=ae454b977e0adf6356e6103a6b713f6a',
    )
      .then(response => response.json())
      .then(responseData => {
        setMovieList(responseData.results);
      });
  }, []);

  const movieItems = movieList.map((movie, index) => {
    let IMAGEPATH = 'http://image.tmdb.org/t/p/w500';
    let imageurl = IMAGEPATH + movie.poster_path;
    return (
      //pass the detail to navigation target screen with an object as parameter
      <TouchableHighlight
        onPress={() => navigation.navigate('MovieDetails', {movie})}>
        <View style={styles.movieRow}>
          <View>
            <Image source={{uri: imageurl}} style={styles.movieItemImage} />
          </View>
          <View style={styles.movieItem}>
            <Text style={styles.movieItemTitle}>{movie.title}</Text>
            <Text style={styles.movieItemText}>{movie.release_date}</Text>
            <Text
              numberOfLines={6}
              ellipssizeMode="tail"
              style={styles.movieItemText}>
              {movie.overview}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  });

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          {movieItems}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  movieRow: {
    margin: 5,
    flex: 1,
    flexDirection: 'row',
  },
  movieItem: {
    flex: 1,
    backgroundColor: '#e4f1f5',
    margin: 5,
  },
  movieItemImage: {
    marginRight: 5,
    width: 99,
    height: 146,
  },
  movieItemTitle: {
    fontWeight: 'bold',
  },
  movieItemText: {
    flexWrap: 'wrap',
  },
});

export default MovieListScreen;
