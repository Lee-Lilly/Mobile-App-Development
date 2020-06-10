import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from 'react-native';

const MovieDetailScreen = props => {
  const {route} = props; //route object is passed via props
  const {movie} = route.params; // get movie object from route parameters.

  let movieId = movie.id;
  let IMAGEPATH = 'http://image.tmdb.org/t/p/w500';
  let imageurl = IMAGEPATH + movie.backdrop_path;

  const [detail, setDetail] = React.useState({
    runtime: '',
    homepage: '',
    genres: [],
    videos: [],
  });

  fetch(
    'https://api.themoviedb.org/3/movie/' +
      movieId +
      '?api_key=ae454b977e0adf6356e6103a6b713f6a&append_to_response=videos',
  )
    .then(response => response.json())
    .then(responseData => {
      setDetail({
        runtime: responseData.runtime,
        homepage: responseData.homepage,
        genres: responseData.genres,
        videos: responseData.videos.results,
      });
    });

  const genreItems = detail.genres.map((genre, index) => {
    return genre.name + '  ';
  });

  const trailers = detail.videos.map((video, index) => {
    let title = video.name;
    let url = 'https://youtu.be/' + video.key;
    return (
      <TouchableOpacity>
        <Text style={styles.link} onPress={() => Linking.openURL(url)}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  });

  return (
    <View style={styles.container}>
      <Image source={{uri: imageurl}} style={styles.image} />
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.text}>{movie.release_date}</Text>
      <Text />
      <Text style={styles.text}>{movie.overview}</Text>
      <Text />
      <Text style={styles.infoItem}>
        Genres: <Text style={styles.item}>{genreItems}</Text>
      </Text>
      <Text />
      <Text style={styles.infoItem}>
        Runtime: <Text style={styles.item}>{detail.runtime}</Text>
      </Text>
      <Text />
      <Text style={styles.infoItem}>Homepage: </Text>
      <TouchableOpacity onPress={() => Linking.openURL(detail.homepage)}>
        <Text style={styles.link}>{detail.homepage}</Text>
      </TouchableOpacity>
      <Text />
      <Text style={styles.infoItem}>Trailers: </Text>
      <View style={styles.list}>{trailers}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e4f1f5',
    marginTop: 0,
    marginLeft: 5,
    marginRight: 5,
  },
  image: {
    aspectRatio: 620 / 360,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  text: {
    fontSize: 14,
    flexWrap: 'wrap',
    fontFamily: 'Lucida grande - verdana',
    color: '#666',
    fontWeight: 'bold',
  },
  item: {
    fontStyle: 'italic',
    fontWeight: 'normal',
    fontSize: 13,
  },
  infoItem: {
    color: 'black',
    fontWeight: 'bold',
  },
  link: {
    color: 'blue',
    fontStyle: 'italic',
  },
  list: {
    marginTop: 0,
  },
});

export default MovieDetailScreen;
