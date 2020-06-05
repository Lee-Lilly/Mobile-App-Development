import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, ActivityIndicator } from 'react-native';

export default function App() {
  const [movieList, setMovieList] = React.useState([]);

  React.useEffect(() => {
    fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=ae454b977e0adf6356e6103a6b713f6a')
      .then(response => response.json())
      .then(responseData => {
        setMovieList(responseData.results);
      })
  }, [])

  const movieItems = movieList.map((movie, index) => {
    let IMAGEPATH = 'http://image.tmdb.org/t/p/w500';
    let imageurl = IMAGEPATH + movie.poster_path;
    return (
      <View style={styles.movieRow}>
        <View style={styles.movieItemImage}>
          <Image source={{ uri: imageurl }}
            style={{ width: 99, height: 146 }}
            PlaceholderContent={<ActivityIndicator />} />
        </View>
        <View style={styles.movieItem}>
          <Text style={styles.movieItemTitle}>{movie.title}</Text>
          <Text style={styles.movieItemText}>{movie.release_date}</Text>
          <Text style={styles.movieItemText}>{movie.overview}</Text>
        </View>
      </View>
    );
  })

  return (
    <View style={styles.container}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        {movieItems}
      </ScrollView>
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
  movieRow: {
    margin: 5,
    flex: 1,
    flexDirection: 'row'
  },
  movieItem: {
    flex: 1,
    backgroundColor: '#e4f1f5',
    margin: 5
  },
  movieItemImage: {
    marginRight: 5
  },
  movieItemTitle: {
    fontWeight: 'bold',
  },
  movieItemText: {
    flexWrap: 'wrap'
  }
});
